/**
 * Provides a valid Google access token for server-side API calls, refreshing it with
 * the stored refresh token when it is about to expire (see ADR-0003).
 *
 * Tokens stay in the `secure` part of the session and must never be logged.
 */
import type { H3Event } from 'h3'

const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token'
/** Refresh slightly early so the token does not expire on its way to Google. */
const REFRESH_MARGIN_MS = 60_000
export const GOOGLE_TIMEOUT_MS = 10_000

/** One refresh per request, even if a handler calls Google several times. */
const pending = new WeakMap<H3Event, Promise<string>>()

/**
 * Ends the session and fails with `ReauthRequired`; the client sends the student to `/login`.
 * `reason` is logged, so it must be a short description, never a token or Google payload.
 */
export async function requireReauth(event: H3Event, reason: string): Promise<never> {
  console.warn(`[google] Re-authentication required: ${reason}`)
  await clearUserSession(event)
  throw createError({
    statusCode: 401,
    statusMessage: 'Google sign-in required',
    data: {
      code: GoogleErrorCode.ReauthRequired,
    },
  })
}

/**
 * Returns an access token valid for at least `REFRESH_MARGIN_MS`.
 *
 * Concurrent requests may each refresh with the same refresh token. That is harmless:
 * Google keeps earlier access tokens valid, and the last written cookie wins.
 */
export function getGoogleAccessToken(event: H3Event): Promise<string> {
  let token = pending.get(event)
  if (!token) {
    token = resolveAccessToken(event)
    pending.set(event, token)
  }

  return token
}

async function resolveAccessToken(event: H3Event): Promise<string> {
  const session = await requireUserSession(event)
  if (!session.secure) {
    return requireReauth(event, 'no Google grant in session')
  }

  if (session.secure.expiresAt - Date.now() > REFRESH_MARGIN_MS) {
    return session.secure.accessToken
  }

  if (!session.secure.refreshToken) {
    return requireReauth(event, 'no refresh token')
  }

  const refreshed = await requestRefresh(event, session.secure.refreshToken)

  // Not setUserSession: it merges with defu, which concatenates arrays and would duplicate `scopes`.
  await replaceUserSession(event, {
    user: session.user,
    secure: {
      ...session.secure,
      accessToken: refreshed.accessToken,
      expiresAt: refreshed.expiresAt,
      // Google rarely rotates the refresh token; keep the stored one when it does not.
      refreshToken: refreshed.refreshToken ?? session.secure.refreshToken,
    },
  })

  return refreshed.accessToken
}

async function requestRefresh(event: H3Event, refreshToken: string): Promise<GoogleRefreshedToken> {
  const { clientId, clientSecret } = useRuntimeConfig(event).oauth.google
  let response: unknown

  try {
    response = await $fetch<unknown>(TOKEN_ENDPOINT, {
      method: 'POST',
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
      timeout: GOOGLE_TIMEOUT_MS,
    })
  } catch (e) {
    const code = readOAuthError(e)
    // Revoked access, an expired refresh token, or a deleted account: only sign-in can fix it.
    if (code === 'invalid_grant') {
      return requireReauth(event, 'invalid_grant')
    }

    // Only the OAuth error code: the error object holds the request body with the refresh token and client secret.
    console.error('[google] Token refresh failed:', code ?? 'network error')
    throw createError({
      statusCode: 502,
      statusMessage: 'Google is unavailable',
      data: {
        code: GoogleErrorCode.Unavailable,
      },
    })
  }

  try {
    return toGoogleRefreshedToken(response)
  } catch {
    console.error('[google] Token refresh failed: malformed response')
    throw createError({
      statusCode: 502,
      statusMessage: 'Google is unavailable',
      data: { code: GoogleErrorCode.Unavailable },
    })
  }
}

/** Reads `error` from Google's OAuth error body, e.g. `invalid_grant`. */
function readOAuthError(error: unknown): string | undefined {
  if (typeof error !== 'object' || error === null || !('data' in error)) {
    return undefined
  }

  const data = error.data

  if (typeof data !== 'object' || data === null || !('error' in data)) {
    return undefined
  }

  return typeof data.error === 'string' ? data.error : undefined
}
