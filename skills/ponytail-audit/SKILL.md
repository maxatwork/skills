---
name: ponytail-audit
description: "Audit a whole codebase for unnecessary complexity when the user asks for over-engineering or bloat analysis. Return findings without applying fixes."
---

ponytail-review, repo-wide. Scan the whole tree instead of a diff. Rank
findings by maintenance benefit and confidence that behavior is preserved.

## Tags

Same as ponytail-review:

- `delete:` dead code, unused flexibility, speculative feature. Replacement: nothing.
- `stdlib:` hand-rolled thing the standard library ships. Name the function.
- `native:` dependency or code doing what the platform already does. Name the feature.
- `yagni:` abstraction with one implementation, config nobody sets, layer with one caller.
- `shrink:` same logic, fewer lines. Show the shorter form.

## Hunt

These are candidates, not automatic deletions. Confirm actual consumers and preserve behavior, contracts, and meaningful responsibility boundaries before recommending a cut.

Deps the stdlib or platform already ships, single-implementation interfaces,
factories with one product, wrappers that only delegate, files exporting one
thing, dead flags and config, hand-rolled stdlib.

## Output

One line per finding, ranked: `<tag> <what to cut>. <replacement>. [path]`.
When useful, estimate removable lines and dependencies and label the estimate. With no findings, say that no unnecessary complexity was identified in the reviewed scope; this is not a release verdict.

## Boundaries

Scope: over-engineering and complexity only. Correctness bugs, security holes,
and performance are explicitly out of scope. Route them to a normal review
pass. Lists findings, applies nothing. One-shot.
"stop ponytail-audit" or "normal mode" to revert.
