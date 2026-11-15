# ADR-0003: Authentication

## Status

Accepted

## Context

Students must sign in before the dashboard can show their own schedule, courses and announcements (#3). Every `integration` issue depends on this decision, so it also has to settle which Google scopes are granted and which fields the app can rely on.

The institution runs a Google Workspace organisation on `kic.ac.jp`, and students already have accounts there. No other identity provider is in scope.

Options considered:

- **`@sidebase/nuxt-auth`** — a Nuxt wrapper around Auth.js. Designed for many providers and database adapters; most of it would be unused weight for a single provider.
- **A hand-written OAuth flow on Nitro** — no dependency, but it means writing and maintaining state validation, token exchange and session encryption by hand. Security-critical code the project has no reason to own.
- **`nuxt-auth-utils`** — a small Nuxt module providing a Google OAuth handler, encrypted cookie sessions and server-side session helpers.

## Decision

The project uses [`nuxt-auth-utils`](https://github.com/atinux/nuxt-auth-utils) with the Google provider.

### Session

The session is an encrypted, `httpOnly` cookie sealed with `NUXT_SESSION_PASSWORD`. No database is involved, which suits the current stage: PostgreSQL is planned but not yet part of the stack.

The session is split in two:

- `user` — `id` (Google `sub`), `email`, `name`, `picture`. Readable by client code.
- `secure` — access token, refresh token, expiry and granted scopes. Server-only, never serialised to the client.

The module exposes `GET` and `DELETE /api/_auth/session`, which back `useUserSession()` on the client. No custom session or logout route is needed.

### OAuth application type

The Google Cloud project lives inside the `kic.ac.jp` organisation and the OAuth consent screen is configured as **Internal**. Consequences:

- no Google verification process, even for sensitive scopes;
- no cap on the number of users and no "unverified app" warning;
- refresh tokens do not expire after 7 days, unlike apps in Testing status;
- only accounts in the `kic.ac.jp` organisation can sign in — enforced by Google.

The Cloud project is owned by the institution's organisation, not by a personal account.

### Domain restriction

`server/routes/auth/google.get.ts` additionally checks the `hd` claim against `runtimeConfig.auth.allowedDomain` (`st.kic.ac.jp` by default, overridable with `NUXT_AUTH_ALLOWED_DOMAIN`).

Students hold accounts on the `st.kic.ac.jp` subdomain, so this check is narrower than the Internal app type: Google admits the whole `kic.ac.jp` organisation, while the portal admits students only. Staff accounts on other subdomains are rejected, which matches the product — the dashboard shows a student's own schedule and coursework.

It also guards the weaker case: should the app type ever be widened to External, the server would otherwise silently start accepting consumer Google accounts.

### Scopes

Defined once in `server/utils/google-scopes.ts`: `GoogleScope` lists the API scopes features check, and `SIGN_IN_SCOPES` (identity scopes plus all of `GoogleScope`) is what the sign-in route requests. Requested at consent, and the fields they make available:

| Scope | Classification | What it provides |
| --- | --- | --- |
| `openid`, `email`, `profile` | non-sensitive | `sub`, `email`, `name`, `picture`, `hd` |
| `calendar.readonly` | sensitive | Calendar events, including Google Meet links in `hangoutLink` / `conferenceData` |
| `classroom.courses.readonly` | non-sensitive | The student's course list |
| `classroom.course-work.readonly` | non-sensitive | Assignment definitions and due dates |
| `classroom.student-submissions.me.readonly` | non-sensitive | The student's own submissions and grades |
| `classroom.announcements.readonly` | non-sensitive | Course announcements |
| `classroom.courseworkmaterials.readonly` | non-sensitive | Materials attached to coursework |

Only read access is requested, and only to the signed-in student's own data. Teacher-side scopes (`classroom.rosters`, `classroom.coursework.students`, `classroom.studentSubmissions.students`) are deliberately excluded: they expose other people's data and the dashboard has no use for them.

Meet links come from Calendar events, so no separate Meet scope is required.

The grant is requested with `access_type=offline` and `prompt=consent` so that Google returns a refresh token.

### Google API access

Added in #37. Every call to a Google API goes through the server:

    feature endpoint
        ↓ requireGoogleScope   — server/utils/google-client.ts
        ↓ googleFetch          — server/utils/google-client.ts
        ↓ getGoogleAccessToken — server/utils/google-token.ts
    Google REST API
        ↓ unknown
    feature mapper → internal model

- **Token refresh.** `getGoogleAccessToken` returns the stored access token while it has more than 60 seconds left, and otherwise exchanges the refresh token at Google's token endpoint. The new token and expiry are written back to `secure` with `replaceUserSession`, not `setUserSession`, whose `defu` merge would duplicate the `scopes` array. A refresh token that Google rotates is stored, otherwise the existing one is kept.
- **Concurrent refreshes.** Parallel requests carry the same cookie, so each may refresh independently; there is no lock, since a cookie session has no shared state to lock on. This is harmless: earlier access tokens stay valid and the last `Set-Cookie` wins. Within one request the refresh runs at most once. One accepted race: a refresh still in flight when the student signs out in another tab writes the session back, signing them in again. The window is a single round-trip to Google; closing it needs server-side sessions (see Consequences).
- **Lost access.** `invalid_grant`, a missing refresh token, or a 401 from a Google API clears the session and fails with 401 `google_reauth_required`. A Google 401 is not retried with a fresh token: the token was within its lifetime, so revocation is the likely cause, and the rare early invalidation costs one extra sign-in.
- **Client.** The `$api` instance (`app/plugins/google-api.ts`) is the `$fetch` for the app's own `/api` routes. It forwards the request cookie during SSR, where the call comes from the server rather than the browser, and therefore refuses any URL that is not a relative `/api/` path, as well as a `baseURL` option, so the session cookie cannot reach another host. On any 401 — a lost Google grant or a session ended elsewhere — it clears the client session state and navigates to `/login?error=session`, matching how sign-in errors are handled. Widgets backed by Google data should load through `useFetch` / `useAsyncData` with `server: false` (and `lazy: true`): errors land in `error` instead of failing the page, and the fetch runs in the browser, so a slow Google call delays only its own widget. `lazy` alone is not enough: during SSR the fetch still runs and holds the whole HTML response, up to two timeouts when a refresh is needed. Client-side fetching also lets a refreshed token reach the browser's cookie. The trade-off, no Google data in the server-rendered HTML, does not matter for a signed-in dashboard.
- **Scopes.** Features call `requireGoogleScope` before the API call. A scope the student did not grant fails with 403 `google_scope_missing`, a recoverable state a widget can show as "access not granted" rather than as a failure. A Google 403 reporting an insufficient scope (`ACCESS_TOKEN_SCOPE_INSUFFICIENT` or `insufficientPermissions`) is mapped to the same code; each feature should confirm that its API does not also use these reasons for permission denials.
- **Errors.** Other Google failures map to `GoogleErrorCode` (`shared/utils/google-errors.ts`): 403 → 403 `google_forbidden`, 429 → 503 `google_rate_limited`; every other status (5xx, and 4xx such as 400 or 404) and network errors → 502 `google_unavailable`. A feature that needs to tell a 404 apart adds that mapping when it does. A token refresh that fails for any reason other than `invalid_grant`, including a malformed response, is also 502 `google_unavailable`. Google's status and body are not passed to the client.
- **Retries and timeouts.** Every call to Google, including the token refresh, times out after 10 seconds (`GOOGLE_TIMEOUT_MS`) and then counts as a network error. Failed calls are not retried, neither by `googleFetch` nor by `$api`: `ofetch` would otherwise repeat GETs at once on 429 and 5xx, adding load exactly when Google is limiting or failing, and the two layers together could reach Google four times for one widget load. Retrying with backoff and `Retry-After` is a separate decision if a feature needs it.
- **Boundary.** `googleFetch` returns `unknown` and accepts only `query`, so callers cannot override the `Authorization` header. It rejects any URL that is not `https://*.googleapis.com`, so the bearer token cannot reach another host. Each feature validates the payload in its own mapper; Google response types do not leave the server.
- **No dependency.** The REST APIs are called with Nuxt's `$fetch`. `googleapis` and `google-auth-library` were not added: refresh is a single form POST, the calls are plain authorised GETs, and neither library fits a cookie-held token without extra glue.
- **Logging.** Only the event and a short reason or HTTP status are logged, never tokens, request bodies, URLs or Google payloads.

## Consequences

- Dependent integration issues can rely on a server-resolved student identity and a Google access token in `secure` session data.
- Consent is per-scope: a student may approve Calendar and decline Classroom. The scopes actually granted are stored in the session, and features must check them with `requireGoogleScope` / `hasGoogleScope` rather than assume access.
- Adding a scope later requires every student to pass through consent again.
- Sessions cannot be revoked server-side, and the cookie must stay under roughly 4KB. Both become relevant once a database exists; moving the session into it would affect only the session layer, not the routes.
- The access token is refreshed on demand (see [Google API access](#google-api-access)), so integrations keep working after the first hour without a new sign-in. Students sign in again only when the grant is revoked or the refresh token expires.
- A refresh during server-side rendering cannot update the browser's cookie: the next request refreshes again. Harmless, but it costs an extra call to Google; widgets that fetch with `server: false` avoid it.
- The session cookie has no `maxAge`: it ends with the browser session, although browsers that restore sessions may keep it. Signing in again after that is intended, which suits shared computers.
- `NUXT_SESSION_PASSWORD` is a secret: rotating it invalidates every active session.
