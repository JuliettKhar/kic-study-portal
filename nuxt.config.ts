// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    'nuxt-auth-utils',
    [
      '@nuxt/icon',
      {
        mode: 'svg',
        serverBundle: 'local',
        // Ship used icons with the client and never call the public Iconify API (see ADR-0002).
        clientBundle: { scan: true },
        fallbackToApi: false,
      },
    ],
  ],
  css: ['~/assets/styles/main.scss'],
  runtimeConfig: {
    auth: {
      // Google Workspace domain allowed to sign in, override with NUXT_AUTH_ALLOWED_DOMAIN.
      allowedDomain: 'st.kic.ac.jp',
    },
  },
  fonts: {
    // Weights used by the typography scale in docs/design/design.md; the module loads only 400 by default.
    defaults: {
      weights: [400, 500, 600, 700],
    },
  },
})
