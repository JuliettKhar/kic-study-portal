---
name: code-review
description: Review a code change before merge for correctness, security, architecture, and maintainability.
---

# Code Review

## Inputs

Obtain:

- task or issue;
- changed files / git diff;
- AGENTS.md;
- relevant architecture documentation;
- relevant surrounding code.

Never review only isolated changed lines when surrounding code affects
their behavior.

## Procedure

### 1. Understand the requested behavior

Determine what the change is supposed to accomplish.

Do not infer correctness from the implementation itself.

### 2. Inspect the diff

Identify:

- changed behavior;
- changed interfaces;
- new dependencies;
- persistence changes;
- external integration changes;
- unrelated modifications.

### 3. Trace affected flows

For behavioral changes, follow the relevant execution path end-to-end.

Example:

    UI → API → application logic → repository/provider → external system

Check both success and relevant failure paths.

### 4. Check architectural boundaries

Compare the change with AGENTS.md and existing ADRs.

Do not recommend a new abstraction unless the current change provides
evidence that it is needed.

### 5. Check edge cases

Consider only realistic edge cases relevant to the change.

Pay particular attention to:

- missing or malformed external data;
- authentication/authorization;
- unavailable external services;
- partial failures;
- nullable values;
- duplicate data;
- time/date boundaries.

### 6. Verify

Run the project's required checks when execution is available.

### 7. Report

Report only actionable findings with evidence from the code.

Separate merge-blocking problems from optional improvements.