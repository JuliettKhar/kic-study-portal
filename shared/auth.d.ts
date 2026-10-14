/**
 * Shapes the session data provided by `nuxt-auth-utils` (see ADR-0003).
 *
 * `User` is readable on the client; `SecureSessionData` stays server-side.
 */
declare module '#auth-utils' {
  interface User {
    /** Stable Google account identifier (`sub`). */
    id: string
    email: string
    name: string
    picture?: string
  }

  interface SecureSessionData {
    accessToken: string
    refreshToken?: string
    /** Absolute expiry of the access token, as a Unix timestamp in milliseconds. */
    expiresAt: number
    /** Scopes the student approved, which may be fewer than those requested. */
    scopes: string[]
  }
}

export {}
