/**
 * The only path from feature endpoints to Google REST APIs (see ADR-0003).
 *
 * Adds the access token, checks granted scopes and maps Google errors onto
 * `GoogleErrorCode`. Responses are returned as `unknown`: each feature validates
 * them in its own mapper, so Google types never leave the server.
 */
import type { H3Event } from 'h3'
import type { GoogleScope } from './google-scopes'
// Explicit import: auto-imports provide only the value, and the type of the same name is needed too.
import { GoogleErrorCode } from '#imports'
import { GOOGLE_TIMEOUT_MS } from './google-token'

/** Whether the student granted `scope` at consent. */
export async function hasGoogleScope(event: H3Event, scope: GoogleScope): Promise<boolean> {
  const session = await requireUserSession(event)

  if (!session.secure) {
    return requireReauth(event, 'no Google grant in session')
  }

  return session.secure?.scopes.includes(scope) ?? false
}

/** Fails with `ScopeMissing` before calling Google, so a widget can show "access not granted". */
export async function requireGoogleScope(event: H3Event, scope: GoogleScope): Promise<void> {
  if (!(await hasGoogleScope(event, scope))) {
    throw googleError(403, 'Google access not granted', GoogleErrorCode.ScopeMissing)
  }
}

/** Reads `value[key]` when `value` is an object; anything else gives `undefined`. */
function readField(value: unknown, key: string): unknown {
  if (typeof value !== 'object' || value === null) {
    return undefined
  }

  return (value as Record<string, unknown>)[key]
}

/** The bearer token must only ever reach Google's API hosts. */
function assertGoogleApiUrl(url: string): void {
  const parsed = new URL(url)
  if (parsed.protocol !== 'https:' || !parsed.hostname.endsWith('.googleapis.com')) {
    throw createError({ statusCode: 500, statusMessage: 'Invalid Google API URL' })
  }
}

function googleError(statusCode: number, statusMessage: string, code: GoogleErrorCode) {
  return createError({ statusCode, statusMessage, data: { code } })
}

/**
 * Authorised GET to a Google REST endpoint. Read-only by design: options are limited to
 * `query` so callers cannot override the `Authorization` header.
 */
export async function googleFetch(
  event: H3Event,
  url: string,
  options: { query?: Record<string, string | number | boolean | undefined> } = {},
): Promise<unknown> {
  assertGoogleApiUrl(url)
  const accessToken = await getGoogleAccessToken(event)

  try {
    return await $fetch<unknown>(url, {
      query: options.query,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      timeout: GOOGLE_TIMEOUT_MS,
      // A failing Google call is not retried: an immediate retry only adds load during 429/5xx.
      retry: 0,
    })
  } catch (e) {
    return mapGoogleError(event, e)
  }
}

function readStatus(error: unknown): number | undefined {
  const status = readField(error, 'status')

  return typeof status === 'number' ? status : undefined
}

/** Google APIs report a missing scope in either `details[].reason` or the older `errors[].reason`. */
function isScopeError(error: unknown): boolean {
  const body = readField(readField(error, 'data'), 'error')
  const details = readField(body, 'details')
  const errors = readField(body, 'errors')

  return (
    (Array.isArray(details) &&
      details.some((item) => readField(item, 'reason') === 'ACCESS_TOKEN_SCOPE_INSUFFICIENT')) ||
    (Array.isArray(errors) &&
      errors.some((item) => readField(item, 'reason') === 'insufficientPermissions'))
  )
}

/** Maps a failed Google call onto an application error; Google's status and body are not passed on. */
async function mapGoogleError(event: H3Event, e: unknown): Promise<never> {
  const status = readStatus(e)

  // The token was within its lifetime, so a rejection most likely means revoked access.
  // No refresh-and-retry: a rare early invalidation costs one extra sign-in (see ADR-0003).
  if (status === 401) {
    return requireReauth(event, 'Access token rejected')
  }

  if (status === 403 && isScopeError(e)) {
    throw googleError(403, 'Google access not granted', GoogleErrorCode.ScopeMissing)
  }

  // Status only: the error holds the request with the Authorization header.
  console.error('[google] API request failed:', status ?? 'network error')
  if (status === 403) {
    throw googleError(403, 'Access Forbidden', GoogleErrorCode.Forbidden)
  }

  if (status === 429) {
    throw googleError(503, 'Google rate limit reached', GoogleErrorCode.RateLimited)
  }

  throw googleError(502, 'Google is unavailable', GoogleErrorCode.Unavailable)
}
