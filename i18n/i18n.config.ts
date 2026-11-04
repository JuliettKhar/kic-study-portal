// A key missing in the active locale falls back to English (ADR-0004).
export default defineI18nConfig(() => ({
  fallbackLocale: 'en',
}))
