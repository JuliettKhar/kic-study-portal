// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    'nuxt-auth-utils',
    '@nuxtjs/i18n',
    [
      '@nuxt/icon',
      {
        mode: 'svg',
        serverBundle: 'local',
        // Ship used icons with the client and never call the public Iconify API (see ADR-0002).
        // Scanning .ts too: nav icon names live in `app/utils`.
        clientBundle: { scan: { globInclude: ['**/*.{vue,ts}'] } },
        fallbackToApi: false,
      },
    ],
  ],
  css: ['~/assets/styles/main.scss'],
  i18n: {
    // See ADR-0004. Message files live in `i18n/locales/<code>/`, one per feature area.
    defaultLocale: 'ja',
    strategy: 'no_prefix',
    locales: [
      {
        code: 'ja',
        language: 'ja-JP',
        files: ['ja/common.json', 'ja/nav.json', 'ja/auth.json', 'ja/dashboard.json'],
      },
      {
        code: 'en',
        language: 'en-US',
        files: ['en/common.json', 'en/nav.json', 'en/auth.json', 'en/dashboard.json'],
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
    },
  },
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
