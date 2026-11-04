# ADR-0004: Internationalisation

## Status

Accepted

## Context

The portal must be usable in Japanese and English (#20). Students are at a Japanese school, so Japanese is the primary language. Every page sits behind Google sign-in (ADR-0003), so there is no public content to index per language.

## Decision

The project uses [`@nuxtjs/i18n`](https://i18n.nuxtjs.org/) 10.x, configured in `nuxt.config.ts`.

- Locales: `ja` (`ja-JP`, default) and `en` (`en-US`).
- URL strategy: `no_prefix`. Routes stay the same for both locales (`/`, `/login`), so the auth middleware, redirects and navigation links need no locale-aware paths. Per-locale URLs would only help SEO, which does not apply to an authenticated portal.
- Locale persistence: the chosen locale is stored in the `i18n_locale` cookie (`detectBrowserLanguage.useCookie`) and restored on the next visit. On a first visit without the cookie the module picks the browser language when it is `ja` or `en`, otherwise `ja`.
- `<html lang>` follows the active locale via `useI18n()` in `app/app.vue` and uses the locale's BCP 47 `language` (`ja-JP` / `en-US`).

### Message files

Messages are split by feature area rather than one flat file per locale:

```
i18n/locales/
  ja/{common,nav,auth,dashboard}.json
  en/{common,nav,auth,dashboard}.json
```

- Each file has a single top-level key matching its name (`nav.json` → `{ "nav": { … } }`), so keys read as `nav.dashboard` and files never collide when merged.
- Both locales keep the same set of keys. A key missing in the active locale falls back to `en` (`fallbackLocale` in `i18n/i18n.config.ts`); a key missing in both renders as the raw key (`dashboard.title`).
- A new feature area adds a file to both locale directories and to the `files` list of each locale in `nuxt.config.ts`.

### Dates and times

Dates and times are always shown in JST (`Asia/Tokyo`) regardless of the locale. The locale only changes the language and format, never the time zone, so formatting code must pass `timeZone: 'Asia/Tokyo'` explicitly.

## Consequences

- Switching the locale does not change the URL, so a shared link opens in the recipient's own locale.
- Strings in components are referenced by key (`$t('nav.dashboard')`); extraction and translations are done in #20.
- Content from Google Classroom is not translated.
