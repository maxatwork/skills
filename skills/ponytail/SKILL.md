---
name: ponytail
description: "Simplify implementations and avoid speculative abstractions or dependencies while preserving requested behavior. Use for implementation tradeoffs or explicit simplicity reviews."
license: MIT
---

# Ponytail

Choose the simplest implementation that satisfies the full requested behavior, existing contracts, and repository conventions. Simplification reduces unnecessary work; it does not replace the user's task with a smaller deliverable.

## Find the smallest useful solution

Understand the relevant callers and data flow, then prefer:

1. Existing code that already provides the behavior.
2. Standard-library or native-platform facilities.
3. An installed dependency that fits the need.
4. Small new code with clear ownership.

Question speculative requirements, but preserve explicit requirements. If a request contains a material contradiction or unresolved product choice, explain it; otherwise make routine choices and complete the work.

For bug fixes, trace the affected callers and put the correction at the owner of the invariant. A smaller diff in the wrong location leaves the bug behind.

## Judge complexity by its cost

- Add an abstraction when it hides a real responsibility, invariant, or variation. A component with one caller or an interface with one implementation can still earn its place.
- Keep related code together, and split where ownership or comprehension improves. File count and line count are evidence, not objectives.
- Prefer a known-correct algorithm over a shorter one that changes edge-case behavior.
- Retain trust-boundary validation, protection against data loss, accessibility, and required operational controls. Hardware calibration is a real constraint when the device needs it.
- Mark a deliberate shortcut with a known ceiling using a `ponytail:` comment naming the ceiling and when to revisit it. Do not annotate ordinary simple code as debt.

## Verify and report

Use the repository's established checks, frameworks, and fixtures when they provide meaningful evidence. Add a focused check when new logic or a regression warrants it; reuse an adequate existing check. A trivial reversible edit needs no invented test suite.

Finish the requested behavior and fix failures caused by the change. Explain the outcome, relevant verification, and any material limit. Match the user's requested level of detail rather than imposing an output quota.

## Explicit modes

Automatic invocation applies these principles only to the relevant task. When the user explicitly selects `lite`, `full`, or `ultra`, read [mode guidance](references/modes.md). Preserve that choice for its requested scope; `stop ponytail` or `normal mode` ends it.
