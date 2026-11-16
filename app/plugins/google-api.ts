/**
 * Provides `$api`, the `$fetch` instance for the app's own `/api` routes (see ADR-0003).
 *
 * On any 401 the session is gone (Google grant revoked, or signed out elsewhere):
 * clear the client state and send the student to sign in.
 */

export default defineNuxtPlugin((nuxtApp) => {
  // During SSR the request comes from the server, not the browser: forward the student's cookie.
  const headers = useRequestHeaders(['cookie'])
  // `$fetch.create()` inherits Nuxt's default `baseURL` (the app's own base), so only a different one is rejected.
  const appBaseURL = useRuntimeConfig().app.baseURL
  const api = $fetch.create({
    headers,
    // The server already decided the outcome; a client retry would call Google again.
    retry: 0,
    async onResponseError({ response }) {
      if (response.status === 401) {
        // Composables lose the Nuxt context inside fetch hooks.
        await nuxtApp.runWithContext(async () => useUserSession().clear())
        await nuxtApp.runWithContext(async () => navigateTo('/login?error=session'))
      }
    },
    onRequest({ request, options }) {
      // The forwarded session cookie must only reach the app's own API.
      if (
        typeof request !== 'string' ||
        !request.startsWith('/api/') ||
        (options.baseURL && options.baseURL !== appBaseURL)
      ) {
        throw new Error("$api only calls the app's own /api routes")
      }
    },
  })

  return { provide: { api } }
})
