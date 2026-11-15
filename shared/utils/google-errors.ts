/**
 * Codes for Google API failures, sent in `error.data.code` so the client can react
 * without parsing messages. Shared by server and client (see issue #37).
 */
export const GoogleErrorCode = {
  /** Refresh failed or the token was rejected; the session is cleared, sign in again. */
  ReauthRequired: 'google_reauth_required',
  /** The student did not grant the scope this feature needs; recoverable, show "access not granted". */
  ScopeMissing: 'google_scope_missing',
  /** Google returned 429. */
  RateLimited: 'google_rate_limited',
  /** Google returned 5xx or could not be reached. */
  Unavailable: 'google_unavailable',
  /** Google refused the request for a reason other than a missing scope. */
  Forbidden: 'google_forbidden',
} as const

export type GoogleErrorCode = (typeof GoogleErrorCode)[keyof typeof GoogleErrorCode]
