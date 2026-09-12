---
name: writing-for-agents
description: "Write or revise skills, AGENTS.md, and other agent instructions with precise triggers, useful constraints, and progressive disclosure."
---

# Writing for agents

Write instructions that improve decisions and observable outcomes. Preserve the user's scope and let the agent choose its process when several approaches are reasonable. Use fixed sequences for concrete dependencies or fragile operations, not as a general measure of thoroughness.

For skill frontmatter, invocation policy, and routing, read [SKILL-MECHANICS.md](SKILL-MECHANICS.md).

## Context pointers

A context pointer names material outside the current context and states when to read it. A skill description, a link in AGENTS.md, and a reference inside a skill all serve this purpose.

State the capability and the decision or workflow that needs it. Front-load discriminating language. Collapse synonyms that describe the same trigger. A database migration skill should trigger for migrations, not every database query.

If a needed reference is missed, check its trigger and placement. If a skill is loaded for unrelated work, narrow its trigger. Avoid catchalls such as applying a full workflow to every source read.

## Progressive disclosure

Keep purpose, shared constraints, and useful routing in the entrypoint. Move details needed by only some tasks behind a reference with a clear read condition. Keep a short self-contained skill in one file when a router would add no useful choice.

Group a concept's definition, rule, and relevant caveat together. Keep one authoritative copy instead of repeating instructions across the entrypoint and references. Examples should explain a decision that prose alone leaves ambiguous.

Names and descriptions spend context before invocation. Body text spends context when loaded. References spend context only when followed. Reduce each cost where it does not buy useful guidance; a shorter file is not better if it loses an operational invariant.

## Completion and boundaries

Describe what must be true when the requested work is complete and what evidence establishes it. Match verification to the claim. Avoid quotas for hypotheses, tests, passes, workers, or documents unless the task or a measured operational limit requires them.

Continue authorized work through implementation and relevant correction. Preserve planning-only, review-only, or prototype-only scope when requested. Ask for a missing consequential decision or authorization, not routine choices the code or existing instructions can settle. Prepare a concrete result before asking for approval of a final external action, and reuse approval already provided.

State when to stop an unproductive loop: no new evidence, a repeated failure with no available alternative, an unmet external prerequisite, or a user-defined limit. A preferred process should not declare success while known acceptance failures remain.

## Pruning and validation

- Keep non-obvious context, local conventions, and reasons that a cheap environment lookup cannot recover. Prefer manifests, configuration, and tool help for facts they already own.
- Remove generic advice the model already follows, repeated meanings, stale examples, and branches that no longer apply.
- Use familiar terms when precise; define specialized vocabulary where it changes a decision. Stronger adjectives do not fix an unnecessary instruction.
- State the desired behavior directly. Keep prohibitions when they express a real boundary and pair them with the permitted path.
- Preserve explicit user choices and invocation policy. Explain which rules are requirements and which are defaults.
- Check links, metadata, and meaningful scenarios after changing routing or boundaries. Use realistic outcomes to judge a revision; exact wording matches do not establish better behavior.

Revise from demonstrated failures or requirements. Prefer one focused correction over a new universal rule for every past incident.
