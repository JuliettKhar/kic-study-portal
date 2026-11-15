/**
 * Development-only manual check for the Google API client (#37); 404 in any other build.
 * It rewrites the caller's own session, which has no place in production.
 *
 *   ?expire=1      mark the access token as expired → forces a refresh
 *   ?dropScope=1   remove the Calendar scope from the session → requireGoogleScope must fail
 *   ?scope=1       call requireGoogleScope(Calendar) before the request
 */
export default defineEventHandler(async (event) => {
  // Statically false in production builds, so the rest of the handler is dropped.
  if (!import.meta.dev) {
    throw createError({ statusCode: 404 })
  }

  const query = getQuery(event)
  const session = await requireUserSession(event)

  if (session.secure && (query.expire || query.dropScope)) {
    await replaceUserSession(event, {
      user: session.user,
      secure: {
        ...session.secure,
        expiresAt: query.expire ? 0 : session.secure.expiresAt,
        scopes: query.dropScope
          ? session.secure.scopes.filter((s) => s !== GoogleScope.Calendar)
          : session.secure.scopes,
      },
    })
  }

  const before = (await getUserSession(event)).secure?.expiresAt

  if (query.scope) {
    await requireGoogleScope(event, GoogleScope.Calendar)
  }

  const raw = await googleFetch(event, 'https://openidconnect.googleapis.com/v1/userinfo')
  const after = (await getUserSession(event)).secure?.expiresAt

  return {
    ok: true,
    email: typeof raw === 'object' && raw !== null && 'email' in raw ? raw.email : null,
    refreshed: before !== after,
    expiresInMin: after ? Math.round((after - Date.now()) / 60000) : null,
  }
})
