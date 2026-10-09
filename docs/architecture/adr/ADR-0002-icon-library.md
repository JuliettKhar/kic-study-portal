# ADR-0002: Icon Library

## Status

Accepted

## Context

The login page (#22) is the first screen that needs UI icons: the brand tile, the secure-login notice, the capability chips and the decorative background icons. More screens will need icons as the dashboard grows.

Options considered:

- Exporting SVGs from Figma per icon. The exported vectors were inconsistent in stroke and proportions, and every new icon would mean another manual export.
- Hand-written inline SVGs. No dependency, but no shared visual language and repetitive markup.
- An icon component backed by an open icon set.

## Decision

The project uses [`@nuxt/icon`](https://github.com/nuxt/icon) with the [Lucide](https://lucide.dev/icons/) collection (`@iconify-json/lucide`).

Configuration in `nuxt.config.ts`:

```ts
['@nuxt/icon', {
  mode: 'svg',
  serverBundle: 'local',
  clientBundle: { scan: true },
  fallbackToApi: false,
}]
```

- `mode: 'svg'` renders inline `<svg>`, so icons inherit `color` via `currentColor` and are sized with `font-size`.
- `serverBundle: 'local'` serves icons from the locally installed collection.
- `clientBundle: { scan: true }` scans the source for icon names and ships the icons used by the app with the client bundle, so client-side navigation renders them without a request.
- `fallbackToApi: false` keeps the app from calling the public Iconify API (`api.iconify.design`) at runtime in the server build (see Consequences for static/SPA builds).

Usage:

```vue
<Icon name="lucide:shield-check" class="login__notice-icon" />
```

## Rules

- Use Lucide (`lucide:*`) for UI icons. Adding another collection requires a new `@iconify-json/*` package and should be a deliberate decision.
- Write icon names as string literals (`'lucide:bell'`), not built at runtime, so the client bundle scan can find them.
- Size and colour icons through CSS (`font-size`, `color`) with design tokens; do not hard-code colours in markup.
- Icons are decorative by default (`aria-hidden="true"`). When an icon is the only content of an interactive element, give the element an accessible name.
- Brand marks that must keep their official colours (for example the Google "G" in the sign-in button) are stored as SVG assets under `app/assets/images/` and are an explicit exception to the token rule.

## Consequences

- One consistent icon style across the app, with icons recoloured by tokens.
- Only the icons in use reach the browser (8 icons, about 2.5 KB uncompressed at the time of writing).
- The server bundle contains the full Lucide collection (about 600 KB); this affects server bundle size only, not what the browser downloads.
- `clientBundle.scan` is marked experimental in `@nuxt/icon` 2.x. In the current server build (`nuxt build`, where `@nuxt/icon` infers `provider: 'server'`), an icon it misses (for example a name built at runtime) is fetched from the app's own `/api/_nuxt_icon` endpoint, not the public API. A misspelled name renders an empty icon; only an `[Icon] failed to load icon` warning is logged during SSR. To avoid the extra request, list such icons explicitly in `clientBundle.icons`.
- `nuxt generate` or `ssr: false` makes `@nuxt/icon` switch to the `iconify` provider, which fetches missed icons from the public Iconify API regardless of `fallbackToApi`. Revisit this configuration before moving to a static or SPA deployment.
- Lucide icons are outline-only. A filled icon requires another collection and a new decision.
