# Project Memory

This file contains current cross-task project context for coding agents.

It is not a history log.
When information becomes outdated, replace or remove it.

## Current State

- Initial project infrastructure is configured.
- Application feature development has not started yet.
- Automated application tests have not been introduced yet.

## External Systems

### Google Workspace

- Authentication integration: planned.
- Calendar integration: planned.
- Classroom integration: planned.
- Workspace administrator restrictions must still be confirmed.

### Moodle

- Integration is planned.
- Availability of Moodle Web Services has not yet been confirmed.
- Do not assume API access exists.

## Known Constraints

- The portal aggregates information from existing learning systems.
- External systems remain authoritative for data they own.
- Provider-specific data should be normalized before entering application logic.

## Open Questions

- What is the authoritative source for student course enrollment?
- How will courses be mapped across KIC, Google Classroom, Calendar, and Moodle?
- Which Moodle APIs are available to the project?

## Recent Important Discoveries

<!--
Keep only information that is still relevant to future tasks.
Move permanent architectural decisions to ADRs.
Delete obsolete information instead of accumulating history.
-->
