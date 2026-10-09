// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    [
      '@nuxt/icon',
      {
        mode: 'svg',
        serverBundle: 'local',
      },
    ],
  ],
  css: ['~/assets/styles/main.scss'],
  fonts: {
    // Weights used by the typography scale in docs/design/design.md; the module loads only 400 by default.
    defaults: {
      weights: [400, 500, 600, 700],
    },
  },
})
