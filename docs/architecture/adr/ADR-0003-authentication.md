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

Requested at consent, and the fields they make available:

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

## Consequences

- Dependent integration issues can rely on a server-resolved student identity and a Google access token in `secure` session data.
- Consent is per-scope: a student may approve Calendar and decline Classroom. The scopes actually granted are stored in the session, and features must check them rather than assume access.
- Adding a scope later requires every student to pass through consent again.
- Sessions cannot be revoked server-side, and the cookie must stay under roughly 4KB. Both become relevant once a database exists; moving the session into it would affect only the session layer, not the routes.
- Nothing refreshes the access token yet. The first feature that calls a Google API will need to handle an expired token using the stored refresh token.
- `NUXT_SESSION_PASSWORD` is a secret: rotating it invalidates every active session.
