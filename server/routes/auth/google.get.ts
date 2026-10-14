/**
 * Google OAuth entry point and callback (see ADR-0003).
 *
 * The same route serves both steps: without a `code` query parameter it
 * redirects to Google, and Google redirects back here with the code.
 * This path must match the authorised redirect URI in Google Cloud Console.
 */

/** Scopes requested at consent. Keep in sync with the list in ADR-0003. */
const SCOPES = [
  'openid',
  'email',
  'profile',
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/classroom.courses.readonly',
  'https://www.googleapis.com/auth/classroom.course-work.readonly',
  'https://www.googleapis.com/auth/classroom.student-submissions.me.readonly',
  'https://www.googleapis.com/auth/classroom.announcements.readonly',
  'https://www.googleapis.com/auth/classroom.courseworkmaterials.readonly',
]

export default defineOAuthGoogleEventHandler({
  config: {
    scope: SCOPES,
    authorizationParams: {
      // Required for Google to return a refresh token alongside the access token.
      access_type: 'offline',
      // `consent` for the refresh token; `select_account` so a student on a shared
      // computer can pick a different account instead of being signed in silently.
      prompt: 'consent select_account',
    },
  },

  async onSuccess(event, { user, tokens }) {
    let account: GoogleAccount
    let grant: GoogleGrant

    // The library calls onSuccess outside a try/catch, so a malformed payload would
    // otherwise surface as a raw 502 page instead of the login screen.
    try {
      account = toGoogleAccount(user)
      grant = toGoogleGrant(tokens)
    } catch (error) {
      console.error(
        '[auth] Could not read the Google response:',
        error instanceof Error ? error.message : error,
      )

      return sendRedirect(event, '/login?error=auth')
    }

    const { allowedDomain } = useRuntimeConfig(event).auth

    // The Internal app type already restricts sign-in to the Workspace domain.
    // This check keeps that guarantee if the app type is ever widened.
    if (account.hostedDomain !== allowedDomain) {
      // The domain alone is not personal data, and without it a rejection is undiagnosable.
      console.warn(
        `[auth] Rejected sign-in from domain "${account.hostedDomain ?? 'none'}", expected "${allowedDomain}"`,
      )

      // A rejected sign-in must not leave the previous student's session intact on a shared browser.
      await clearUserSession(event)

      return sendRedirect(event, '/login?error=domain')
    }

    await setUserSession(event, {
      user: {
        id: account.id,
        email: account.email,
        name: account.name,
        picture: account.picture,
      },
      secure: {
        accessToken: grant.accessToken,
        refreshToken: grant.refreshToken,
        expiresAt: grant.expiresAt,
        scopes: grant.scopes,
      },
    })

    return sendRedirect(event, '/')
  },

  onError(event, error) {
    // The message is safe to log; tokens and the authorisation code are not.
    console.error('[auth] Google sign-in failed:', error.message)

    return sendRedirect(event, '/login?error=auth')
  },
})
