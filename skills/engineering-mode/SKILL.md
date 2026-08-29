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

Use only the process the task earns. Classify the work, call the skills that help,
and get back to building.

## Core rules

1. Learn the domain before inventing abstractions.
2. Decide important boundaries before filling in implementation.
3. Read applicable repository instructions and manifests before accepting generated configuration; audit generated output against those constraints.
4. Identify the real parser/runtime, then inspect it and run experiments through the exact launcher before guessing; configuration files follow their loader's semantics, not necessarily shell semantics. Enumerate environment variable names first, read only values the experiment needs, and do not print values by default. Redacting secret-shaped names is insufficient because credentials can live in URIs or under unexpected names.
5. Leave enough proof for another agent to verify the result.
6. Keep each implementation task small enough for one fresh agent context.
7. For unattended work, record decisions and the evidence behind them.
8. Answer cheap questions yourself. Check the code, documentation, experiments,
   or runtime behavior before asking the human.
9. Before using repository-specific memory, establish the live checkout's
   lineage. Find its root commit, verify remembered paths against Git history,
   and discard evidence that predates that root or belongs to a different
   lineage.

## Route the task

For non-trivial work, put a short route manifest in the first plan or working
note: the task classification, the skills or workflows selected, and a one-line
reason for skipping any route whose trigger plainly matches. Keep it
proportional to the task; routes that do not apply need no inventory.

Reclassify after discovery and before implementation. If a contained change now
alters a shared contract, authentication behavior, or a product decision,
activate the newly matching routes and update the plan before continuing.

### The domain or terminology is unclear

Use `domain-modeling` when:

- two concepts mean almost the same thing;
- the work adds an entity or lifecycle;
- product language and code use different names;
- ownership is unclear.

Settle the model before designing APIs around it.

### The problem is large and key questions remain unanswered

Use `wayfinder`. Work through decision tickets until the major unknowns have
evidence behind them. Do not write a detailed implementation plan while basic
questions are still open.

### An open question needs external evidence or a concrete reaction

Use `exploring-repositories` when inspecting or comparing an external repository
can resolve the question. Use `prototype` when a throwaway artifact can test a
state model, behavior, or interface. Bring the evidence back to the current
decision, then continue through `wayfinder` until the route is clear.

### The architecture or API shape needs a decision

Use `design-change` before committing to:

- a new module or service;
- a public interface;
- state ownership or concurrency boundaries;
- a protocol or storage format;
- code that crosses an important module boundary.

Ground the current call path, write caller usage first, and compare two designs
that differ in structure. If `wayfinder` was needed, start `design-change` only
after the major unknowns have evidence behind them. Skip it for a trivial local
change.

### The design is settled

Use `to-spec`. The spec should state:

- the problem and desired behavior;
- the domain concepts that matter;
- decisions that implementation can rely on;
- boundaries and contracts;
- how the result will be verified;
- what is out of scope.

Leave out implementation details likely to change during the work. If agents
will execute the spec in parallel, continue with `to-tickets`.

### The work needs to be split across agents

Use `to-tickets`. Prefer vertical slices that deliver a narrow behavior end to
end. Each ticket must show observable progress, have its own verification, fit
inside one fresh agent context, and name any real blocking dependency.

Avoid plans that build every database change, then every API change, then every
UI change. Use that split only when the work cannot be delivered vertically.

### The implementation uses TypeScript

Use `typescript-best-practices`.

- Model variants explicitly.
- Make impossible states hard to represent.
- Validate external data at its boundary.
- Avoid `any` and casts that lack evidence.
- Derive types instead of copying schemas.

### The behavior is visible to a user

Use the project's verification skill before calling the task done. If the
project has no reliable verification path and the work is substantial, consider
`create-verification-skill`.

A successful compile does not prove that the UI, command, or service works for a
user.

Map every named acceptance path to evidence through the same production path a
user takes. Test-account shortcuts and lower-layer assertions may supplement
that evidence, but they do not replace registration, login, permission-denied,
or other explicitly requested paths.

### The task is a bug fix

Reproduce the bug first. Then shrink the failing case when practical, find the
root cause, make the smallest correct fix, add regression coverage, and exercise
the affected UI, command, or service.

Also use `blast-radius` when a small fix could affect distant code.

### A small change may have distant consequences

Use `blast-radius`. State the assumption that makes the change safe, then prove
it by running real code when possible. A page of hypothetical risks is weaker
evidence than one well-chosen execution.

## Common workflows

For a large idea with no settled architecture:

domain-modeling
→ wayfinder
→ exploring-repositories or prototype as needed
→ design-change
→ to-spec
→ to-tickets

For a substantial feature whose major questions are already answered:

domain-modeling when the model changes
→ design-change
→ to-spec
→ to-tickets
→ project verification

Skip any stage that would not change the work.

For a contained change:

implement
→ verify

Add `blast-radius` if the change crosses a hidden boundary. Do not turn a
two-line fix into a ceremony.

## When to ask the human

Within the user's stated scope, proceed without asking when the repository can
answer the question, a cheap experiment can settle it, the action is reversible,
or project conventions leave no real choice.

Ask when the answer is a product preference, the decision changes product
meaning, valid options have different costs or behavior, or the next step makes
an irreversible external change.

## Finish condition

"Done" means:

1. The intended behavior exists.
2. Relevant automated checks pass.
3. Someone exercised the affected UI, command, or service when practical.
4. No known blocking review issue remains.
5. You report important departures from the original design.
6. A durability claim has crossed a cold process boundary when relevant. Restart
   through the repository launcher and real adapter before claiming that a
   database, encrypted state, Session, or generated secret survives restart;
   reconstructing the service inside one process is not enough.
7. Every named acceptance path has production-path evidence. Bypasses and
   lower-layer tests are reported as narrower proof, not as substitutes.

For scoped changes, run the cheapest relevant proof for the changed boundary,
state what was and was not exercised, and do not imply that a narrow probe
proves downstream consumer behavior.

Code written is an intermediate state, not done.
