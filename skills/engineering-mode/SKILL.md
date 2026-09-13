---
name: engineering-mode
description: >
  Classify and route non-trivial software engineering work through the
  appropriate design, implementation, verification, and review skills. Use for
  substantial features, architectural changes, bug fixes with hidden impact,
  or multi-step implementation work; skip casual questions and trivial local
  edits.
---

# Engineering mode

Use the process the task needs to deliver the requested outcome. User scope and existing authorization govern the work; a route adds guidance, not new deliverables or approval gates.

## Choose the relevant work

| Need | Guidance |
| --- | --- |
| Domain concepts, terminology, or ownership need to change | Use `domain-modeling`. Reading a glossary alone does not need a modeling pass. |
| A large effort has unresolved decisions | Identify the questions and gather evidence. Use `wayfinder` only when the user requests a decision map or explicitly invokes it. |
| An open question needs an external implementation or concrete experiment | Use `exploring-repositories` or `prototype` when that work is relevant. Keep the result within the requested investigation. |
| Architecture or API shape needs a decision | Ground the real call path and sketch caller usage before implementation. Use `design-change` for the user's requested comparison of structural alternatives. |
| A settled conversation needs a spec | Use `to-spec` when the user requests that artifact. |
| An accepted plan needs executable tickets | Use `to-tickets` when ticket creation is requested. |
| TypeScript type modeling or boundary validation is involved | Use `typescript-best-practices`. |
| A bug's cause is unclear | Use `diagnosing-bugs`. For an obvious contained fix, reproduce or establish the failure from available evidence and verify the correction. |
| A change may affect distant consumers | Trace the relevant contracts and consumers. Use `blast-radius` only for an explicitly requested blast-radius analysis. |
| User-visible behavior changes | Use the project's existing verification path and any applicable verification skill. Generate a new verification skill with `create-verification-skill` only when requested. |

The manual-only skills above remain explicit workflows. Do not load their instructions as an automatic route or ask the user to invoke them merely to continue ordinary engineering. Their absence does not prevent the design reasoning, investigation, or verification already authorized by the task.

When the user requests the full planning workflow, preserve this order:

domain-modeling → wayfinder → exploring-repositories or prototype as needed → design-change → to-spec → to-tickets.

Skip stages that would not change the work. An approved design can go straight to implementation and relevant verification. Revisit the route only when discovery changes a material assumption, contract, or scope.

## Work from evidence

Read applicable repository instructions and the sources that constrain the change. Audit generated configuration against the actual manifests and loader. For a configuration/parser failure, inspect the real runtime and experiment through its launcher; shell syntax may not be its syntax. Inspect only needed environment values and keep credentials out of outputs.

Before changing parser or topology logic after a parsing failure, inspect the raw input with delimiters visible and prefer command-free fields. Do not infer process ownership from formatted output that may collapse wrappers and their descendants.

Check remembered paths and assumptions against the live checkout. Investigate history and lineage when the evidence disagrees, rather than requiring a root-commit audit for every memory lookup.

Prefer existing conventions and reversible experiments for routine choices. Ask when a consequential product decision remains unresolved, the requested action lacks authorization, or progress needs inaccessible evidence. Reuse decisions and authorization already given; complete independent work while waiting.

## Completion

Finish when the intended behavior exists, relevant checks pass, and no known blocking issue from the requested change remains. Use the cheapest evidence that establishes each promised behavior:

- Exercise named acceptance paths through the same UI, command, or service a user uses. Lower-layer assertions and test-account shortcuts supplement that proof; they do not establish omitted registration, login, or permission-denied paths.
- For durability claims, cross a cold process boundary through the real launcher and adapter. Reconstructing a service in one process does not establish persisted state after restart.
- Match coverage to the changed boundary. A passing static check or narrow probe does not establish downstream behavior it never exercised.
- For concurrency claims, identify independently supervised ownership roots and verify their ancestry. Overlapping timestamps or process IDs from one wrapper and its nested child do not establish independent work.
- After delegated slices converge, name an integration owner to inspect their shared contracts, consumers, migrations, lock order, and adversarial concurrency before relying on separately green checks.

Continue correction of failures within scope without a new checkpoint for each iteration. When progress requires a user decision or external change, report the remaining work and the specific blocker. Report the result, evidence, and material departures from the agreed design.
