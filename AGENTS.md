# KIC Study Portal — Engineering Guide

## Project

KIC Study Portal is a Nuxt 4 application that provides students with
a unified view of course schedules, course information, assignments,
and announcements.

The project is currently in an early MVP stage.

## Tech Stack

- Nuxt 4
- Vue 3
- TypeScript
- Nitro
- PostgreSQL (planned)
- npm
- ESLint
- Prettier

## Engineering Principles

- Keep the architecture as simple as possible while preserving clear boundaries.
- Prefer explicit code over unnecessary abstractions.
- Introduce complexity only when there is a concrete requirement for it.
- Keep external integrations behind application boundaries.
- Do not couple UI components directly to Google, Moodle, or other external APIs.
- Do not let provider-specific models become application-wide domain models.
- Do not introduce new dependencies unless they provide clear value.
- Do not change architecture as part of an unrelated task.
- Preserve existing behavior unless the task explicitly requires changing it.

## Change Scope

Every change must have a clear reason related to the requested task.

Avoid:

- unrelated refactoring;
- speculative abstractions;
- premature generalization;
- duplicate implementations;
- silent changes to public interfaces;
- large rewrites when a smaller modification is sufficient.

If a task requires a significant architectural, security, authentication,
data ownership, or external integration decision, surface that decision
explicitly before implementing it.

## TypeScript

- Maintain type safety.
- Do not use `any` as an escape hatch.
- Do not suppress errors with `@ts-ignore`.
- Avoid unsafe type assertions unless the invariant is established.
- Use explicit types at important application and system boundaries.
- Treat external data as untrusted.

## Vue / Nuxt

- Use Composition API and `<script setup lang="ts">`.
- Keep pages focused on routing and composition.
- Extract reusable UI into components when there is meaningful reuse.
- Keep business logic out of Vue components.
- Keep API handlers thin.
- Server-only code belongs under `server/`.
- Never expose server secrets to client code.

## External Integrations

Google, Moodle, and other external services are infrastructure boundaries.

Prefer:

    external API
        ↓
    client / provider
        ↓
    mapper / validation
        ↓
    internal model

Application and UI code should not depend directly on external SDK models
unless there is a deliberate architectural reason.

Do not assume undocumented external API behavior.

## Security

- Never commit secrets or `.env` files.
- Never expose client secrets, refresh tokens, database credentials,
  or other server-side secrets to browser code.
- Validate untrusted input at system boundaries.
- Do not weaken authentication or authorization for convenience.
- Avoid logging sensitive information.

## AI-Assisted Development

AI-generated changes are treated like changes written by any other contributor.

AI output is not considered correct until verified.

For implementation work, follow:

    .agents/skills/implement-task/SKILL.md

Implementation should normally follow this flow:

    understand
        ↓
    inspect existing code
        ↓
    plan smallest change
        ↓
    implement
        ↓
    self-review diff
        ↓
    deterministic checks
        ↓
    independent review

Do not begin implementation without first inspecting the relevant existing code.

Do not invent missing product requirements.

If an ambiguity materially affects behavior, architecture, security,
or data ownership, ask for clarification.

## Independent Review

Non-trivial changes must receive an independent AI review before human review.

Ask the coding agent:

    Use the `code-review` skill and the reviewer role to independently review
    the current diff against the task, `AGENTS.md`, and relevant architecture docs.

Reviewer instructions:

    .agents/agents/reviewer.md

Review procedure:

    .agents/skills/code-review/SKILL.md

## Verification

The canonical local quality check is:

    npm run check

Before a change is considered ready for merge, also run:

    npm run build

Relevant tests must also be run when they exist.

Never claim that a command, test, or build passed unless it was actually executed.

If verification cannot be performed, state exactly what remains unverified.

## CI

GitHub Actions is the deterministic merge gate.

At minimum CI verifies:

- linting;
- formatting;
- TypeScript / Nuxt type checking;
- production build.

Tests will be added to the CI gate when the project has automated tests.

Do not bypass failing CI without understanding and documenting the reason.

## Architecture Decisions

Significant architectural decisions should be recorded under:

    docs/architecture/adr/

Use an ADR when a decision materially affects areas such as:

- module boundaries;
- persistence strategy;
- authentication;
- external integrations;
- data ownership;
- deployment architecture;
- major dependencies.

Do not create ADRs for routine implementation details.

## Documentation

Update documentation when a change affects:

- project setup;
- environment variables;
- architecture;
- external integrations;
- public API contracts;
- development workflow.

Documentation must reflect actual project behavior.

## Git

- Work on focused branches.
- Keep commits scoped and understandable.
- Use descriptive commit messages.
- Do not commit generated files, secrets, IDE configuration,
  or temporary agent artifacts.
- Changes should normally reach `main` through a pull request.

## Definition of Merge-Ready

A change is merge-ready when:

- requested behavior is implemented;
- scope is controlled;
- architecture rules are respected;
- relevant verification has passed;
- the diff contains no accidental changes;
- independent review has been completed for non-trivial changes;
- CI passes;
- documentation is updated when required.

## UI implementation

Before implementing or modifying UI:

- Read `docs/design/design.md` for the visual design specification.
- Read `docs/architecture/adr/0001-frontend-styling.md` for styling architecture.
