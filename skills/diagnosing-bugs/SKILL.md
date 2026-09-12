---
name: diagnosing-bugs
description: "Diagnose bugs or performance regressions whose cause is unclear using reproduction, targeted evidence, and hypothesis testing."
---

# Diagnosing bugs

Find the cause of the user's exact symptom and verify its correction. Scale the investigation to the uncertainty; an obvious fix does not need a full diagnostic itinerary.

## Establish the failure

Read the relevant code, existing tests, runtime output, and domain context. Source inspection and provisional hypotheses can help construct a reproduction. Label inference and uncertainty so neither is mistaken for an observed failure.

Prefer a repeatable feedback signal that reaches the actual failure path: an existing test, a request against a local server, a CLI fixture, a browser interaction, or a captured trace. Use the cheapest signal that distinguishes the reported bug from nearby failures. For performance, establish a comparable baseline with timings, a profiler, or a query plan.

Keep credentials in environment variables and redact secrets from commands, logs, and captured artifacts before showing them. Quote only the output needed to support the finding.

## Improve the signal where it helps

Make the loop fast and reliable enough for useful iteration. Isolate state, control time or randomness, and minimize inputs when doing so reduces uncertainty. A slow integration reproduction is valid evidence; neither seconds-long execution nor exhaustive minimization is a prerequisite.

For intermittent failures, record attempts and failures, then vary stress or scheduling deliberately to improve the reproduction rate. Keep changes to the reproduction distinguishable from the product fix. A low failure rate calls for more cautious conclusions, not abandonment of the evidence.

If reproduction is unavailable, continue safe source and trace analysis. State what remains unverified and request the specific artifact, access, or decision needed when it actually blocks progress. Use [the human-assisted loop template](scripts/hitl-loop.template.sh) only when a person must perform a step the available tools cannot drive.

## Test explanations

Form hypotheses from the evidence. Compare alternatives when several causes remain plausible; do not invent a quota. For each useful hypothesis, identify an observation or change that would distinguish it from alternatives. Share a meaningful finding or uncertainty without making routine probes wait for a checkpoint.

Use focused debugger inspection, logs, profiling, or bisection. Change variables deliberately so the result has an interpretable cause. Tag temporary instrumentation so it can be removed without touching existing diagnostics.

## Fix and verify

Trace affected callers and contracts before selecting the smallest correct fix. Use the repository's existing test conventions. Add regression coverage when it can exercise the real failure pattern; a shallow test that cannot fail for this bug is not protection. If no suitable seam exists, document that limitation rather than restructuring unrelated code just to add a test.

When practical, observe the reproduction fail before the fix and pass afterward. Recheck the original scenario if investigation minimized or changed it. For a failure that cannot be reproduced locally, distinguish the evidence for the correction from runtime confirmation still needed.

Remove instrumentation and stop processes created for the investigation. Preserve useful evidence and any user-owned scratch work. Finish when the scoped correction is verified to the available evidence standard, or identify the concrete remaining blocker and what would resolve it.
