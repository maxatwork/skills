---
name: to-spec
description: "Use ONLY when the user asks to turn a conversation into a spec. Synthesize settled decisions and acceptance criteria; publish only when requested."
disable-model-invocation: true
metadata:
  opencode/autoinvoke: "false"
---

# To spec

Turn the current conversation into a complete specification of the requested behavior. Synthesize existing decisions; do not restart discovery or ask the user to reconfirm settled testing seams.

Read relevant code or source documents only to resolve gaps that matter to the specification. Use the project's domain language and established spec format. When a consequential decision cannot be inferred, label it as open and ask only if an answer is needed to complete the requested artifact.

## Draft

Use the repository's format, or cover the following in a proportionate document:

- The user's problem and desired behavior.
- Actors and acceptance scenarios sufficient to cover the actual feature.
- Settled domain concepts, contracts, ownership, and implementation decisions.
- How the promised behavior will be verified through existing interfaces, including relevant prior tests.
- Scope exclusions and unresolved decisions.

Prefer existing test seams. Propose a new seam only when it gives the promised behavior a useful interface or makes a required invariant observable. Explain a tradeoff that matters; routine testing choices do not require a separate approval step.

Include paths or code only when they clarify a durable decision or identify a required integration point. A validated prototype snippet can define a state machine, reducer, schema, or type more precisely than prose; trim it to the decision and identify its origin.

## Deliver or publish

A request to write a spec authorizes drafting, not posting to an external tracker. Use a requested local path or repository convention; otherwise return the draft in the conversation.

When publication is requested, use the supplied destination and triage vocabulary. Reuse existing authorization. If the destination is unresolved, complete the draft before asking where to publish it. Apply `ready-for-agent` only when the tracker uses that label and the spec contains no unresolved implementation-blocking decision. Report the saved path or published issue link.
