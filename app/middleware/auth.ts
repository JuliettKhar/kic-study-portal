/** Sends visitors without a session to the login page. Opt in per page via `definePageMeta`. */
export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession()

  if (!loggedIn.value) {
    return navigateTo('/login')
  }
})
