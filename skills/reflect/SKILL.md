---
name: reflect
description: Use ONLY when the user explicitly says reflect. Review the active transcript through three lenses, surface durable learnings, and route each to a concrete edit on an existing skill.
disable-model-invocation: true
metadata:
  opencode/autoinvoke: "false"
---

# Reflect

Mine the current conversation for durable learnings, then route them into skill edits.

## When to invoke

- The user says "reflect" or invokes the harness's reflect command.
- A complex task (5+ tool calls) just landed cleanly and the recipe is worth keeping.
- The agent hit dead ends, found the working path, and the path generalizes.
- The user corrected the agent's approach mid-task.
- A non-trivial workflow emerged that isn't captured anywhere.

Skip when the conversation is trivial, off-topic, or already covered by an existing skill the parent followed correctly. One-offs are not learnings.

## Process

### 1. Locate the active transcript

The parent locates the current run's transcript, event log, or digest before
fanning out. Use a path supplied by the runtime when available. Otherwise use
the runtime's scoped session-inspection facility. Do not search another
harness's private storage or unrelated workspaces. If no scoped record
resolves, write a tight digest of the session and pass that instead.

When several records exist, match the workspace and opening user message, or a
thread/session identifier supplied by the runtime, before reading one.

### 2. Spawn three reviewers in parallel

Before fan-out, inspect the callable worker or parallel-review tools and their
supported model IDs and effort levels. Then load and follow the
`model-selection` skill against the active harness catalog. Use it to choose a
supported model/effort pair for
each reviewer and the synthesizer based on the capability requirements of its
role. Preserve any model or effort fixed by the user or runtime. State each
chosen pair, its decisive capability comparison, and any availability-constrained
fallback before invoking the panel. Never invent a model identifier or effort.

Use the model-selection result for each lens, even when multiple lenses receive
the same model family; do not add an independent diversity fallback.
Use the current runtime's parallel worker tool;
if no subagent tool is callable, run the three lenses sequentially and report
that limitation instead of inventing a tool or model.

Make three parallel calls when the runtime supports them. Set an explicit model
and effort only when the runtime supports the selected pair.
Reviewers need access to any connected lookup tools referenced in the
transcript. The prompt forbids file writes; the parent applies edits.

| Lens      | Model assignment                                                       | Prompt template                    |
| --------- | ---------------------------------------------------------------------- | ---------------------------------- |
| Judgment  | model/effort pair selected with model-selection for the judgment lens  | `references/judgment-reviewer.md`  |
| Tooling   | model/effort pair selected with model-selection for the tooling lens   | `references/tooling-reviewer.md`   |
| Divergent | model/effort pair selected with model-selection for the divergent lens | `references/divergent-reviewer.md` |

Pass each template verbatim, substituting the transcript path or digest where
marked. Reviewers return findings in the subagent response body.

### 3. Synthesize

Use one synthesis worker with the model/effort pair selected with
model-selection for synthesis. If the runtime has no worker, synthesize inline.
Spot-verify citations with the lookup tools available in the current
environment. Use `references/synthesizer.md` verbatim, with each reviewer's
full output inlined where marked. The synthesizer returns a structured Accepted
/ Rejected / Backlog list.

### 4. Structural enforcement check

Sanity-check the synthesizer's Accepted list. For any item that would be enforced more reliably by a lint rule, script, metadata flag, or runtime check, move it from Accepted to Backlog. The synthesizer already applies this criterion; this is a final pass before edits land. See the **encode-lessons-in-structure** principle skill.

### 5. Apply

Before applying any Accepted edit, present the synthesizer's full Accepted/Rejected/Backlog output to the user and wait for explicit approval. The user picks which subset to apply and may redirect routings. Skill changes affect every future agent in the org; do not auto-apply.

When a devex or backlog tracker is configured, record Backlog items there.
Otherwise report them without attempting an unconfigured submission. Those are
tracker submissions, not skill edits. Only the Accepted list waits for approval.

For each approved Accepted item, follow the Routing field exactly:

- Trivial existing-skill edit (a one-line bullet, a tightened sentence, a stale fact corrected): parent does directly.
- Substantive existing-skill edit (a new section, a new pattern table, more than ~10 lines): use the current harness's skill-authoring workflow when one exists, and run its draft / test / iterate loop.
- `tune description: <skill path>` (the skill exists but didn't trigger when it should have): use the current harness's description-optimization workflow when one exists.
- `new skill via skill-authoring workflow: <kebab-name>`: use the current harness's skill-authoring workflow. Do not invent the shape ad hoc.

If your environment ships a SKILL.md validator, run it on every touched skill before declaring done. Skip this step if it doesn't.

### 6. Summarize for the user

Short list, no preamble:

- Edits applied: `<skill path>`. What changed, one line each.
- New skills created: `<skill path>`. One line each (rare).
- Backlog filed to the devex tracker: `<issue title>` (`<tags>`). One line each.
- Dropped: one line per rejected finding + reason from the synthesizer.
