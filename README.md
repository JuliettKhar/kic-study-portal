# KIC Study Portal

KIC Study Portal is a student project that provides a unified view of course schedules, course information, assignments, and announcements.

The project is built with **Nuxt 4**, **Vue 3**, and **TypeScript**.

---

## Getting Started

### Requirements

Before starting, make sure you have:

- **Node.js 22**
- **npm**
- **Git**

Check that they are installed:

```bash
node --version
npm --version
git --version
```

The Node.js version should start with:

```text
v22.
```

The required Node.js version is also defined in `.nvmrc`.

### If Node.js is not installed

Follow the official installation instructions for your operating system:

- [Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Node.js downloads](https://nodejs.org/en/download)

Using a Node.js version manager is recommended.

### If Git is not installed

Follow the official Git installation instructions for your operating system:

- [Install Git](https://git-scm.com/install/)

After installation, run the version commands above again.

---

## Setup

### 1. Clone the repository

```bash
git clone git@github.com:JuliettKhar/kic-study-portal.git
cd kic-study-portal
```

### 2. Install dependencies

This project uses **npm**.

```bash
npm install
```

Do not use Yarn, pnpm, or Bun for this repository.

### 3. Start the development server

```bash
npm run dev
```

The application will be available at:

[http://localhost:3000](http://localhost:3000)

---

## Development Workflow

All development should be done on a separate branch.

Do not work directly on `main`.

### 1. Update your local `main`

Before starting a new task:

```bash
git switch main
git pull
```

### 2. Create a branch

Create a short, descriptive branch for your task:

```bash
git switch -c feature/course-list
```

Examples:

```text
feature/course-list
fix/mobile-navigation
chore/update-ci
docs/update-readme
```

### 3. Understand the task before coding

Before making changes:

- read the task or issue;
- inspect the relevant existing code;
- read relevant documentation if the task affects architecture or integrations.

If you are using an AI coding agent, ask it to use the `implement-task` skill:

```text
Use the `implement-task` skill to implement this task.
```

The agent should inspect the existing implementation before changing code.

Do not accept AI-generated code without reviewing it.

### 4. Implement and verify

During development, supported lint issues can be fixed automatically with:

```bash
npm run lint:fix
```

Format the code with:

```bash
npm run format
```

Before considering the implementation complete, run:

```bash
npm run check
npm run build
```

`npm run check` verifies:

- ESLint;
- Prettier formatting;
- TypeScript / Nuxt type checking.

Do not ignore failing checks.

### 5. Self-review your changes

Before creating a Pull Request, inspect your changes:

```bash
git status
git diff
```

Check that:

- only task-related files were changed;
- there is no debug or temporary code;
- no secrets or `.env` files were added;
- unrelated code was not refactored;
- no unnecessary dependencies were introduced;
- the requested behavior actually works.

### 6. Run AI code review

For non-trivial changes, ask your coding agent to perform an independent review:

```text
Use the `code-review` skill and the reviewer role to independently review
```

Resolve all `BLOCKER` and `MAJOR` findings before requesting human review, or explicitly document why a finding was not resolved.

AI review does **not** replace human review.

### 7. Commit your changes

```bash
git add .
git commit -m "feat: add course list"
```

Keep commits focused on the task.

Common commit prefixes:

| Prefix | Use for |
| --- | --- |
| `feat:` | New functionality |
| `fix:` | Bug fixes |
| `refactor:` | Internal code changes without behavior changes |
| `docs:` | Documentation |
| `chore:` | Tooling and project maintenance |

### 8. Push your branch

```bash
git push -u origin feature/course-list
```

### 9. Create a Pull Request

Open a Pull Request into `main`.

Complete the Pull Request template, including:

- what changed;
- why it was changed;
- verification;
- self-review;
- AI review result;
- screenshots for UI changes when relevant.

GitHub Actions will automatically run the project quality checks.

Do not merge a Pull Request while required CI checks are failing.

### 10. Human review and merge

Another team member reviews the Pull Request before it is merged.

The normal development flow is:

```text
Task
  ↓
Feature branch
  ↓
Implementation
  ↓
Self-review
  ↓
npm run check + npm run build
  ↓
AI code review
  ↓
Pull Request
  ↓
GitHub Actions
  ↓
Human review
  ↓
Merge to main
```

`main` is protected and should always remain in a working state.

---

## Available Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Automatically fix supported lint issues |
| `npm run format` | Format files with Prettier |
| `npm run format:check` | Check formatting |
| `npm run typecheck` | Run Nuxt / TypeScript type checking |
| `npm run check` | Run lint, formatting, and type checks |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |

---

## Architecture

Architecture documentation is stored under:

```text
docs/architecture/
```

Architecture Decision Records (ADRs) are stored under:

```text
docs/architecture/adr/
```

Significant architecture decisions should be discussed before implementation.

Do not introduce new architectural patterns, external services, major dependencies, or changes to data ownership as part of an unrelated task.

---

## Environment Variables

Local environment variables belong in:

```text
.env
```

Files containing local environment values or secrets must never be committed.

When new environment variables are introduced, document their names in:

```text
.env.example
```

Never put real credentials or secrets in `.env.example`.

---

## Pull Requests and CI

Changes to `main` should go through a Pull Request.

GitHub Actions automatically verifies:

```text
lint
formatting
typecheck
production build
```

All required checks must pass before merge.

The Pull Request author is also expected to complete the self-review and AI review sections in the Pull Request template.

---

## Production Build

Build the application locally with:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Documentation

- [Nuxt Documentation](https://nuxt.com/docs)
- [Vue Documentation](https://vuejs.org/guide/introduction.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/latest-v22.x/api/)
- [Git Documentation](https://git-scm.com/doc)