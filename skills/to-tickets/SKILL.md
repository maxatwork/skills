---
name: to-tickets
description: "Use ONLY when the user asks to create tickets. Split an accepted plan into verifiable slices and dependency edges, using the requested destination."
disable-model-invocation: true
metadata:
  opencode/autoinvoke: "false"
---

# To Tickets

Break a plan, spec, or conversation into a set of **tickets** — tracer-bullet vertical slices, each declaring the tickets that **block** it.

An explicit user destination or repository-local ticket convention is sufficient
configuration. Otherwise, use the issue tracker and triage label vocabulary
provided by the repository or user. If neither exists, finish the ticket drafts, then ask for the destination before publishing externally. A requested local draft can use the Markdown fallback below.

## Process

### 1. Gather context

Work from whatever is already in the conversation context. If the user passes a reference (a spec path, an issue number or URL) as an argument, fetch it and read its full body and comments.

Before asking for tracker setup, read repository instructions and inspect the
source spec's directory for plan or ticket placement conventions. An explicit
user destination or repository convention overrides the default local path.

### 2. Explore the codebase (optional)

If you have not already explored the codebase, do so to understand the current state of the code. Ticket titles and descriptions should use the project's domain glossary vocabulary, and respect ADRs in the area you're touching.

Look for opportunities to prefactor the code to make the implementation easier. "Make the change easy, then make the easy change."

### 3. Draft vertical slices

Break the work into **tracer bullet** tickets.

<vertical-slice-rules>

- Each slice cuts a narrow but COMPLETE path through every layer (schema, API, UI, tests) — vertical, NOT a horizontal slice of one layer
- A completed slice is demoable or verifiable on its own
- Each slice is sized to fit in a single fresh context window
- Any prefactoring should be done first

</vertical-slice-rules>

Give each ticket its **blocking edges** — the other tickets that must complete before it can start. A ticket with no blockers can start immediately.

Before publishing, check every executable ticket against the one-context rule.
Split any ticket that combines unrelated proof boundaries or cannot reach done
without crossing an unfinished blocker. An umbrella release or verification
item may remain only as a non-executable rollup over smaller tickets, not as a
`ready-for-agent` ticket.

When completion evidence depends on an external database, provider credentials
or configuration, platform capability, hardware, or another environment-owned
dependency, read [proof substrates](references/proof-substrates.md). Declare and
validate that substrate before assigning `ready-for-agent`; do not provision it
or weaken an acceptance criterion as part of ticket writing.

**Wide refactors are the exception to vertical slicing.** A **wide refactor** is one mechanical change — rename a column, retype a shared symbol — whose **blast radius** fans across the whole codebase, so a single edit breaks thousands of call sites at once and no vertical slice can land green. Don't force it into a tracer bullet; sequence it as **expand–contract**. First expand: add the new form beside the old so nothing breaks. Then migrate the call sites over in batches sized by blast radius (per package, per directory), each batch its own ticket blocked by the expand, keeping CI green batch to batch because the old form still exists. Finally contract: delete the old form once no caller remains, in a ticket blocked by every migrate batch. When even the batches can't stay green alone, keep the sequence but let them share an integration branch that all block a final integrate-and-verify ticket — green is promised only there.

### 4. Resolve material decisions

Check that each ticket has observable acceptance criteria and only genuine blockers. Reuse a breakdown the user already accepted. For a new breakdown, make routine granularity choices and show the complete drafts; ask only if a material scope or dependency choice remains unresolved or the user requested a checkpoint. Do not require a second approval for an already authorized ticket-creation request.

### 5. Publish the tickets to the configured tracker

Publish the approved tickets. Before publication, run the proof-substrate
validator for every ticket that declares one. For tracker issues, pass the
intended status or label to the validator before applying `ready-for-agent`.
**How** depends on the configured tracker — the tickets are the same either
way, only the shape of the blocking edges changes:

- **Local files** → use the user- or repository-specified location. If neither exists, write one file per ticket under `.scratch/<feature-slug>/issues/<NN>-<slug>.md`. Number tickets from `01` in dependency order (blockers first). Each file's "Blocked by" lists the numbers/titles it depends on. Use the per-ticket file template below — one ticket per file, never a single combined file.
- **A real issue tracker (GitHub, Linear, …)** → publish one issue per ticket in dependency order (blockers first) so each ticket's blocking edges can reference real identifiers. Use the platform's native blocking / sub-issue relationship where it has one; otherwise set each ticket's "Blocked by" to the blocking issues. Apply the `ready-for-agent` triage label unless instructed otherwise — the tickets are agent-grabbable by construction.

When implementation is also requested, work the **frontier**: tickets whose blockers are done. Ticket creation alone finishes with the tickets and does not start their implementation.

Do NOT close or modify any parent issue.

<local-ticket-template>

# <NN> — <Ticket title>

**What to build:** the end-to-end behaviour this ticket makes work, from the user's perspective — not a layer-by-layer implementation list.

**Blocked by:** the numbers/titles of the tickets that gate this one, or "None — can start immediately".

**Status:** ready-for-agent

- [ ] Acceptance criterion 1
- [ ] Acceptance criterion 2

</local-ticket-template>

<issue-template>

## Parent

A reference to the parent issue on the tracker (if the source was an existing issue, otherwise omit this section).

## What to build

The end-to-end behaviour this ticket makes work, from the user's perspective — not layer-by-layer implementation.

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2

## Blocked by

- A reference to each blocking ticket, or "None — can start immediately".

</issue-template>

For either template, insert the optional `## Proof substrates` declaration
before the acceptance criteria only when the linked proof-substrate guidance
applies. Keep it out of tickets whose completion evidence is repository-local.

In either form, avoid specific file paths or code snippets — they go stale fast. Exception: if a prototype produced a snippet that encodes a decision more precisely than prose can (state machine, reducer, schema, type shape), inline it and note briefly that it came from a prototype. Trim to the decision-rich parts — not a working demo, just the important bits.
