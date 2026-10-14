/**
 * Maps Google's OAuth responses onto the internal models used by the app.
 *
 * Google is an untrusted boundary: the raw payloads are validated here so that
 * provider-specific shapes never reach session, application or UI code.
 */

/** A student identity, as resolved from Google's OpenID userinfo endpoint. */
export interface GoogleAccount {
  /** Stable Google account identifier (`sub`). Never the email, which can be reassigned. */
  id: string
  email: string
  name: string
  picture?: string
  /** Google Workspace domain the account belongs to, absent for consumer accounts. */
  hostedDomain?: string
}

/** The access granted by the student during the OAuth consent step. */
export interface GoogleGrant {
  accessToken: string
  /** Only returned when the grant was requested with `access_type=offline`. */
  refreshToken?: string
  /** Absolute expiry of the access token, as a Unix timestamp in milliseconds. */
  expiresAt: number
  /** Scopes the student actually approved, which may be fewer than those requested. */
  scopes: string[]
}

function asRecord(value: unknown, source: string): Record<string, unknown> {
  if (typeof value !== 'object' || value === null) {
    throw createError({ statusCode: 502, statusMessage: `Unexpected ${source} payload` })
  }

  return value as Record<string, unknown>
}

function readString(payload: Record<string, unknown>, key: string, source: string): string {
  const value = payload[key]

  if (typeof value !== 'string' || value.length === 0) {
    throw createError({ statusCode: 502, statusMessage: `Missing "${key}" in ${source} payload` })
  }

  return value
}

function readOptionalString(payload: Record<string, unknown>, key: string): string | undefined {
  const value = payload[key]

  return typeof value === 'string' && value.length > 0 ? value : undefined
}

export function toGoogleAccount(user: unknown): GoogleAccount {
  const payload = asRecord(user, 'Google userinfo')

  return {
    id: readString(payload, 'sub', 'Google userinfo'),
    email: readString(payload, 'email', 'Google userinfo'),
    name: readString(payload, 'name', 'Google userinfo'),
    picture: readOptionalString(payload, 'picture'),
    hostedDomain: readOptionalString(payload, 'hd'),
  }
}

export function toGoogleGrant(tokens: unknown): GoogleGrant {
  const payload = asRecord(tokens, 'Google token')
  const expiresIn = payload.expires_in

  if (typeof expiresIn !== 'number') {
    throw createError({
      statusCode: 502,
      statusMessage: 'Missing "expires_in" in Google token payload',
    })
  }

  return {
    accessToken: readString(payload, 'access_token', 'Google token'),
    refreshToken: readOptionalString(payload, 'refresh_token'),
    expiresAt: Date.now() + expiresIn * 1000,
    scopes: readString(payload, 'scope', 'Google token').split(' '),
  }
}
