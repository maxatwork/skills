---
name: ponytail-review
description: "Review a diff for unnecessary abstractions, dependencies, or duplication when the user requests a simplicity review. Preserve behavior and report findings without edits."
---

# Ponytail review

Review the requested diff for unnecessary complexity. Recommend a cut only when the replacement preserves behavior and contracts and reduces maintenance or caller burden. A single caller or implementation is not proof that an abstraction is unnecessary.

Report each finding with a file and line, what changes, why the responsibility no longer needs that code, and the replacement. Useful tags are `delete`, `stdlib`, `native`, `yagni`, and `shrink`.

Examples of justified findings:

- An unused internal flag has no callers or dynamic consumers; remove its branch and configuration.
- A date library is used only for a format that the target platforms' `Intl.DateTimeFormat` supports with the same locale behavior.
- Two wrappers forward the same arguments without owning validation, lifecycle, compatibility, or other policy; remove the redundant layer.

Treat shorter validation or retry code as equivalent only after checking its actual acceptance and failure behavior. Idempotence alone does not remove the need to retry a transient failure.

Keep this review scoped to complexity. Distinguish incidental correctness concerns from the requested findings; do not silently start another audit. Apply no edits unless separately requested. Preserve meaningful checks and established test infrastructure.

Estimate removals only when useful, and label the estimate. With no findings, say no unnecessary complexity was identified in the reviewed scope. This review does not establish readiness to ship.
