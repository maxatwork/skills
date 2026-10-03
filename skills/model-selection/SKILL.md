---
name: model-selection
description: "Choose the cheapest sufficient model and effort for coding, reasoning, taste, and throughput needs. Use for model recommendations, delegated work, evaluators, or model routing, including a dispatch whose model a handoff or plan already names."
---

# Model selection

Use this scorecard as the primary guide for an open model and effort choice. The runtime catalog determines which exact identifiers, efforts, harnesses, and modalities can run. Keep each model and effort pair together.

## Scorecard

Ratings are the user's supplied research snapshot dated **2026-10-03**. Intelligence and Coding are separate dimensions; DeepSWE is one component of Coding, not the whole scoreboard. Scores are relative to this compared set, not universal capability guarantees.

- **Intelligence:** general reasoning, planning, architecture, and synthesis. The supplied research normalizes the Artificial Analysis (AA) Intelligence Index v4.3.2 from raw 22–58 to 0–10.
- **Coding:** end-to-end model + native harness performance. AA Coding Agent Index v1.5 combines DeepSWE v1.1, Terminal-Bench 4.0, and SWE-Atlas-QnA. A different harness makes transfer of these scores provisional.
- **Taste:** subjective visual and prose quality, informed by WhichAI samples and qualitative rankings. Sol 6 is a proxy for 6.1 Sol; Luna and Gemini 4 taste are provisional. Apply a Taste floor to creative decisions, not ordinary UI behavior.
- **Intelligence $/task** and **Coding $/task:** average USD per task in different benchmark workloads. Compare within the relevant column; neither is a quote for the actual task. `~$` is an extrapolated budgeting estimate. `—` means unknown, never free.
- **Speed:** log-normalized output throughput, 0–10. Higher is faster; 0 means slowest in this set. It does not measure reasoning delay or total completion time.

`*` marks an estimate. Estimated Coding scores interpolate from a same-family run using the Intelligence delta; estimated Speed scores are provisional. Unmarked Coding scores are reported as directly measured in the supplied research. Keep these distinctions when recommending a row.

| Model | Effort | Intelligence | Coding | Taste | Intelligence $/task | Coding $/task | Speed | Notes |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Claude Opus 5.5 | low | 6 | 6* | 9 | $0.55 | ~$1.20 | 3 | |
| Claude Opus 5.5 | medium | 8 | 8* | 9 | $1.34 | ~$2.92 | 3 | |
| Claude Opus 5.5 | high | 9 | 9* | 9 | $1.82 | ~$3.97 | 3 | |
| Claude Opus 5.5 | xhigh | 9 | 9* | 9 | $3.46 | ~$7.54 | 4 | |
| Claude Opus 5.5 | max | 10 | 10 | 9 | $5.98 | $13.04 | 4 | Exception only; highest Intelligence |
| Claude Sonnet 5.5 | low | 4 | 4 | 9 | $0.42 | $0.48 | 4 | |
| Claude Sonnet 5.5 | medium | 5 | 5 | 9 | $0.59 | $0.62 | 5 | |
| Claude Sonnet 5.5 | high | 7 | 7 | 9 | $1.12 | $1.24 | 5 | |
| Claude Sonnet 5.5 | xhigh | 8 | 9 | 9 | $2.75 | $3.33 | 5 | Strong alternative coding route |
| Claude Sonnet 5.5 | max | 9 | 10 | 9 | $7.67 | $14.19 | 7 | Exception only; highest measured raw Coding index |
| Claude Fable 5.1 | low | 7 | 7* | 10 | $2.37 | ~$3.85 | 1 | |
| Claude Fable 5.1 | medium | 8 | 8* | 10 | $2.98 | ~$4.84 | 1 | |
| Claude Fable 5.1 | high | 8 | 8* | 10 | $3.91 | ~$6.35 | 1 | |
| Claude Fable 5.1 | xhigh | 9 | 9* | 10 | $5.98 | ~$9.71 | 2 | Taste specialist; preferred over max |
| Claude Fable 5.1 | max | 9 | 9 | 10 | $7.63 | $12.39 | 2 | Little general-quality gain over xhigh |
| GPT-6 Astra | low | 7 | 7* | 8 | $0.82 | ~$1.88 | 0 | |
| GPT-6 Astra | medium | 8 | 8* | 8 | $1.54 | ~$3.53 | 0 | |
| GPT-6 Astra | high | 8 | 8* | 8 | $1.73 | ~$3.96 | 0 | |
| GPT-6 Astra | xhigh | 8 | 8* | 8 | $2.31 | ~$5.29 | 1 | |
| GPT-6 Astra | max | 9 | 9 | 8 | $3.26 | $7.47 | 1 | Exception only; slow output |
| GPT-6.1 Sol | low | 6 | 7 | 8 | $0.13 | $0.50 | 0 | |
| GPT-6.1 Sol | medium | 7 | 8 | 8 | $0.21 | $0.70 | 0 | Normal coding default |
| GPT-6.1 Sol | high | 8 | 8 | 8 | $0.32 | $0.89 | 1 | |
| GPT-6.1 Sol | xhigh | 8 | 9 | 8 | $0.39 | $1.04 | 1 | Best measured Sol coding setting |
| GPT-6.1 Sol | max | 8 | 8 | 8 | $0.72 | $1.55 | 1 | Coding regresses versus xhigh |
| GPT-6 Luna | low | 0 | 0* | 6 | $0.0045 | ~$0.01 | 6 | Simple availability/auth probe |
| GPT-6 Luna | medium | 2 | 2* | 6 | $0.02 | ~$0.05 | 6* | |
| GPT-6 Luna | high | 3 | 3* | 6 | $0.03 | ~$0.08 | 7 | |
| GPT-6 Luna | xhigh | 4 | 3* | 6 | $0.04 | ~$0.10 | 7 | |
| GPT-6 Luna | max | 4 | 4 | 6 | $0.07 | $0.18 | 6 | Cheap bounded coding worker |
| Gemini 4 Argon | high | 9 | 9 | 7 | $1.99 | $5.84 | 5* | Access, speed, and taste need confirmation |
| Gemini 3.8 Flash | low | 3 | 2* | 6 | — | — | 10* | Unknown cost |
| Gemini 3.8 Flash | medium | 5 | 4* | 6 | $0.93 | ~$1.85 | 10* | |
| Gemini 3.8 Flash | high | 5 | 4 | 6 | $1.24 | $2.47 | 10 | Throughput and multimodal specialist |
| Grok 4.7 | low | 6 | 6* | 7 | $1.25 | ~$2.95 | 3 | |
| Grok 4.7 | high | 7 | 7* | 7 | $2.73 | ~$6.44 | 3 | Divergent ideation option |
| Grok 4.7 | xhigh | 7 | 7 | 7 | $3.74 | $8.82 | 3 | Weak coding economics |

The supplied raw Coding index preserves differences lost in rounded ratings: Sonnet max 68, Opus max 66, Argon high 64, and Sol xhigh / Sonnet xhigh 63. Sol medium → high → xhigh → max scores 61 → 60 → 63 → 60. Effort is not a monotonic quality ladder.

Sources for the supplied snapshot: [AA Intelligence methodology and Sonnet data](https://artificialanalysis.ai/models/releases/claude-sonnet-5-5), [AA coding-agent leaderboard](https://artificialanalysis.ai/agents/coding-agents), [WhichAI taste rankings](https://www.whichai.dev/rankings), [Argon data](https://artificialanalysis.ai/models/gemini-4-argon/), and [Flash data](https://artificialanalysis.ai/models/releases/gemini-3-8-flash). Keep the snapshot date and provenance when updating; change ratings from new user-supplied research or experience, not from an unscored catalog entry.

## Make the choice

Respect a model or effort fixed in the user's own words or in system or AGENTS.md instructions. Keep inherited settings when no selection is needed. A user correcting a model identifier fixes the identifier, not the model for later work.

A model or effort written into a handoff, plan, ticket, or status note by an agent is not fixed. Choose again for each dispatch, keeping the note's constraints, such as identifier pitfalls and provider outages. Record such constraints with a timestamp instead of prescribing a model for later dispatches.

1. **Check the current runtime catalog in the same turn as the choice.** Use the runtime's listing command or exposed tool catalog; in pi, use `pi --list-models`. Pass its exact identifier and a supported effort. In pi, use the listed `provider/modelId`; its spawn `model` argument is fuzzy, and `opus` previously selected Opus 5 instead of 5.5. Different providers for the same model are separate availability choices. Never infer supported identifiers, efforts, or access from the scorecard.

2. **Set the task's requirements before comparing costs.** Use Coding for implementation and code review, Intelligence for reasoning and synthesis, and both when the task needs both. Add Taste for visual or creative prose decisions. Treat speed, modality, context, harness, and independent-review diversity as requirements only when the task needs them; otherwise they are preferences. A large ticket or a UI surface alone does not raise a quality floor.

3. **Choose the cheapest eligible supported row meeting those requirements.** Apply the max exception rule below before comparing rows. Use Coding $/task for coding work and Intelligence $/task for reasoning, design, or extraction. For a mixed task, state which workload dominates the choice; do not add or average the two benchmark costs. A requirement for directly measured Coding excludes `*` rows; otherwise disclose their estimates. Missing costs do not qualify as the cheapest. If costs tie, prefer stronger relevant measured evidence, then the higher relevant quality score.

4. **Resolve availability without silently weakening requirements.** Check a previously unavailable provider again before skipping it. Choose the cheapest currently runnable eligible row meeting the same requirements. Preserve the floors, cost basis, and max exception rule through fallback; a provider outage does not justify max. If none qualifies, state the gap and label any lower-scoring alternative as a tradeoff. Avoid repeating a failed probe without new evidence; proceed with a qualifying available alternative.

5. **State the decision.** Give the exact model/provider identifier, effort, relevant floors or constraints, applicable $/task column, estimate/harness caveats, and any availability constraint. A concise sentence is enough. Do not change a floor to justify a preferred model.

## Max exceptions

For an open choice, exclude **Opus, Sonnet, Astra, and Sol max** from default routes. Choose the cheapest sufficient effort at or below xhigh. Max strongly biases toward more reasoning, so cost and latency can rise sharply for a small quality gain; output Speed does not capture that reasoning delay. Explicit model/effort instructions still take precedence.

Use max for these families only when all of the following hold:

- The task is extreme enough that a non-max attempt carries a substantial failure risk. Ordinary hard coding, architecture, review, a large ticket, or a previous failure alone does not establish this.
- Relevant benchmarks show a measurable benefit over **the same model at xhigh**. An interpolated `*` score, a higher effort label, or a rounded quality floor alone is insufficient evidence.
- A task-grounded estimate shows that the expected avoidable cost of a failed xhigh attempt and retry exceeds the incremental cost of max up front, and the additional latency is acceptable. Include likely retry work and delay; do not invent failure probabilities or treat the full cost of any possible failure as an expected saving.

State the extreme-task reason, measured xhigh→max improvement, incremental cost, and expected retry/latency tradeoff when choosing max. If that evidence is missing, keep max ineligible. If a real floor then has no eligible row, report the gap rather than selecting max automatically or lowering the floor.

For example, the supplied Sonnet coding results improve from 63 at xhigh to 68 at max, while benchmark cost rises from $3.33 to $14.19: an extra $10.86 per task. That establishes a measured gain, not the task's failure economics. Sol coding falls from 63 to 60 while cost rises from $1.04 to $1.55, so this snapshot does not justify Sol max for coding. Opus and Astra xhigh Coding scores are estimated and cannot establish the required measured coding gain.

This exception targets those four families. Retain Luna max for bounded workers and the separate Fable taste rules below.

## Task defaults

These are starting points for unspecified needs, not fixed assignments. Lower a default when the task is clearly bounded; raise it for demonstrated ambiguity, reasoning demands, or a higher required coding ceiling. Keep real user requirements intact.

| Task | Starting requirements and route |
| --- | --- |
| Mechanical coding edits or test scaffolding against stated cases | Coding 4: Luna max. Luna is not the default for architecture or verification of existing work. |
| Bounded file search, extraction, classification, or a short turn following a skill | Set the lowest sufficient Intelligence floor and choose the cheapest Luna effort. Retain Luna max as the existing instruction-following preference for skill-following turns; state that preference when it rules out a cheaper effort. |
| Normal coding worker, including integration and ordinary UI behavior | Coding 8: Sol medium. Escalate a task that needs stronger coding to Coding 9: Sol xhigh. Sonnet high (Coding 7) fits a lower floor; Sonnet xhigh is the directly measured alternative at Coding 9. |
| Ambiguous bugs or substantive verification of existing code | Start at Intelligence 8 and Coding 9: Sol xhigh. Reassess against the actual reasoning and review needs rather than assigning Luna because the edit looks small. |
| Hard autonomous coding | Coding 9: Sol xhigh, with Sonnet xhigh as a directly measured alternative. Sonnet max is reserved for extreme tasks passing every max exception condition, not a default for correctness-sensitive work. |
| Hard planning, orchestration, architecture, ambiguous requirements, or research synthesis | Intelligence 9: Opus 5.5 high. Argon high is a non-max alternative. A real Intelligence 10 requirement needs an eligible max exception; otherwise report the gap. A difficult plan does not put its implementation workers on the same model. |
| Open visual/product design, creative copy, naming, or interaction concepts | Intelligence 9 and Taste 10: Fable xhigh. For bounded design/prose, use the cheapest Fable effort meeting the lower Intelligence floor; every Fable row has Taste 10. Max is not justified by taste alone. An eligible Astra effort is a Taste 8 alternative only when its Intelligence and that taste tradeoff suffice. Grok high is an option for deliberately divergent ideation, not an equivalent taste fallback. |
| High-volume extraction, summarization, or multimodal preprocessing with a throughput priority | Flash high has measured Speed 10 and text/image/speech/video coverage; verify runtime modalities. Flash medium has estimated Speed 10. Luna high/xhigh is a cheaper alternative only when its quality, modalities, and slower throughput suffice. Output speed alone does not prove faster end-to-end completion. |
| Long-horizon coding with required multimodal capabilities | Consider Argon high where access and the required modalities are confirmed. Its Intelligence 9 / Coding 9 do not justify replacing cheaper Sol for ordinary coding. It is not a mandatory production dependency; Speed 5* is provisional. |
| 3D work | Retain the Astra preference and choose its cheapest effort meeting the task's Intelligence floor. This is a workflow preference; the aggregate Coding benchmark does not establish 3D capability. |
| Auth or availability probe | Luna low for a simple no-reasoning probe. |

For **independent review already requested or authorized**, prefer a different model creator from the author when a qualifying option exists. Routing the same Claude model through another host is not model diversity. Difficult reasoning review after Sol/Astra can use Opus high; after Claude, consider Argon high or the cheapest sufficient non-max Astra effort. Reassess the review's relevant floors and cost column; routine review can use a cheaper qualifying model from another creator. If diversity cannot be met, report that limit. This preference does not authorize extra workers or reviews.

Keep reasoning, coding, taste, and throughput routes separate. A model's highest benchmark result does not make its highest effort the default. Fable and Astra higher efforts often add cost without raising the relevant score; use them only for a stated need beyond the cheaper row's evidence, with the max exception rule applying to Astra.

For a model missing from the scorecard, compare only with evidence available, mark it provisional, and do not invent scores. Prefer a scored row meeting the requirements. Older Sol/Opus versions do not inherit the new versions' ratings. GPT-5-mini remains excluded; an included or $0 flag is not benchmark task cost. Use a sufficient Luna row instead.
