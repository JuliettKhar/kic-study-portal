---
name: implement-task
description: Implement a scoped engineering task safely in the existing KIC Study Portal codebase.
---

# Implement Task

Implement the requested change using the smallest correct modification
consistent with the existing architecture.

Do not start coding immediately.

## 1. Understand the task

Before changing files, determine:

- What behavior is requested?
- What is explicitly out of scope?
- What are the acceptance criteria?
- Which parts of the system are likely affected?
- Is any requirement ambiguous in a way that could change behavior,
  architecture, security, or data ownership?

Do not invent missing product requirements.

If an important ambiguity cannot be resolved from the repository,
ask for clarification before implementing.

Minor implementation details may be decided independently when they do
not change externally observable behavior or architecture.

## 2. Read project instructions

Before implementation, read:

- `AGENTS.md`;
- relevant architecture documentation;
- relevant ADRs;
- documentation for the affected module.

Follow repository-specific instructions over generic preferences.

## 3. Inspect before modifying

Inspect the existing implementation before proposing a solution.

Find:

- the entry point for the affected behavior;
- related components, API handlers, services, repositories, and integrations;
- existing types and validation;
- existing utilities that may already solve part of the problem;
- existing patterns used for similar functionality.

Do not create a parallel implementation of functionality that already
exists.

For a behavioral change, trace the relevant flow when possible:

    UI
      ↓
    API
      ↓
    application logic
      ↓
    repository / provider
      ↓
    database / external system

Only inspect layers relevant to the task.

## 4. Plan the smallest correct change

Before editing, create a short implementation plan.

The plan should identify:

- files or modules likely to change;
- behavior being added or modified;
- existing interfaces that will be reused;
- verification required.

Prefer extending existing architecture over introducing a new pattern.

Do not introduce abstractions for hypothetical future requirements.

If the task requires a significant architectural change, stop and
explain the proposed change before implementing it.

Examples include:

- introducing a new architectural layer;
- changing module boundaries;
- replacing a core library;
- changing data ownership;
- changing authentication strategy;
- introducing a new external service;
- making a significant database model change.

### Before implementation

Before making changes:

1. Inspect the relevant parts of the existing codebase first:
   - related components/modules;
   - existing patterns and abstractions;
   - naming and file structure;
   - tests for similar behavior.

2. Understand the impact of the requested change:
   - what existing behavior may be affected;
   - which callers/components depend on the changed code;
   - whether tests, types, documentation, or configuration need updates.

3. Prefer the smallest change that solves the task correctly.

4. Follow the existing project's coding style and patterns. Do not introduce new abstractions, helpers, dependencies, or architectural patterns unless they are necessary for the task.

5. Do not generate boilerplate or speculative code "just in case". Every change should have a clear reason tied to the task or an identified impact.

6. If the existing implementation conflicts with the task or a larger refactor appears necessary, explain the issue before proceeding rather than silently redesigning the surrounding code.

## 5. Implement

Make the smallest coherent change that satisfies the task.

### General rules

- Keep changes scoped to the task.
- Preserve existing behavior unless explicitly requested otherwise.
- Reuse existing project patterns where appropriate.
- Prefer clear code over clever code.
- Avoid unrelated refactoring.
- Avoid speculative abstractions.
- Do not add dependencies without a concrete need.

### TypeScript

- Preserve type safety.
- Do not use `any` as an escape hatch.
- Do not use `@ts-ignore` to bypass a problem.
- Avoid unsafe type assertions unless the invariant is established.
- Model meaningful boundaries with explicit types.

### Nuxt / Vue

- Keep business logic out of Vue components.
- Keep API handlers thin.
- Keep server-only code under `server/`.
- Never expose server secrets to client code.
- Do not access external service SDKs directly from UI components.

### External systems

Treat external systems as untrusted boundaries.

Do not allow provider-specific models to leak unnecessarily into
application or UI code.

Prefer:

    external response
        ↓
    provider / adapter
        ↓
    internal model

over:

    external SDK object
        ↓
    entire application

Do not assume undocumented external API behavior.

### Error handling

Handle failures at the layer that has enough context to make a useful
decision.

Do not:

- silently swallow errors;
- add broad fallback behavior without product justification;
- catch errors only to hide them;
- convert every failure into a generic success response.

Preserve useful error context without exposing sensitive information.

## 6. Review your own diff

After implementation, inspect the complete diff.

Check for:

- accidental unrelated changes;
- duplicated code;
- dead code;
- debug output;
- temporary files;
- commented-out code;
- unnecessary dependencies;
- accidental secrets;
- unsafe type assertions;
- stale comments;
- behavior not required by the task.

Ask:

> If I saw this change in a pull request, would every changed line have
> a clear reason to exist?

Remove changes that do not.

## 7. Verify

Run the repository's required deterministic checks:

    npm run check
    npm run build

If relevant tests exist for the affected code, run them as well.

For UI changes, verify the affected interaction manually when execution
or browser access is available.

Never claim that a command or test passed unless it was actually run.

If verification cannot be performed, state exactly what was not
verified and why.

Do not hide failing checks.

## 8. Prepare reviewer handoff

Before considering the task complete, provide a concise implementation
summary for independent review.

Include:

### Changed

What behavior was implemented.

### Key decisions

Only decisions that materially affect the implementation.

### Files

Important files changed.

### Verification

Commands/tests actually executed and their results.

### Known limitations

Anything intentionally left unresolved or outside the task scope.

### Review focus

Any area where the reviewer should pay particular attention.

Do not describe expected behavior as verified behavior.

## Definition of Done

A task is complete only when:

- requested behavior is implemented;
- the change is scoped to the task;
- existing architecture is respected;
- no known relevant errors are hidden;
- the complete diff has been reviewed;
- required checks have been executed successfully, or failures are
  explicitly reported;
- the change is ready for independent review.

After implementation, hand the change to the reviewer workflow.

Update `MEMORY.md` only if the task reveals or changes cross-task context
that is likely to affect future implementation.

Do not record routine implementation details, completed work that is obvious
from the codebase, or information already documented elsewhere.
