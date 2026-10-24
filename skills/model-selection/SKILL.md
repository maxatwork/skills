---
name: model-selection
description: "Choose the cheapest sufficient model and effort for coding, reasoning, taste, and throughput needs. Use for model recommendations, delegated work, evaluators, or model routing, including a dispatch whose model a handoff or plan already names."
---

# Model selection

Use this scorecard as the primary guide for an open model and effort choice. The runtime catalog determines which exact identifiers, efforts, harnesses, and modalities can run. Keep each model and effort pair together.

## Scorecard

Ratings come from the user's supplied **AI Model Benchmark — 24 October 2026**. Scores are relative to this compared set, not universal capability guarantees.

- **Intelligence:** general reasoning, planning, architecture, and synthesis. The research normalizes the Artificial Analysis (AA) Intelligence Index v4.3.2 from raw 22–58 to integers 0–10.
- **Coding:** end-to-end model + harness performance. AA Coding Agent Index **v2.0** combines 290 tasks across equally weighted FrontierCode v1.1, Terminal-Bench 4.0, and SWE-Atlas-QnA-AA. The research normalizes raw 18–62 to integers 0–10. FrontierCode replaces DeepSWE, and Q&A grading changed. Do not interpret differences between v1.5 and v2.0 scores as model improvements or regressions. Transfer to another harness is provisional.
- **Taste:** every score is an editorial estimate informed by WhichAI examples, not an objective numerical benchmark. Kimi's `8*` is especially provisional. Small differences such as 8 versus 9 are weak evidence. Apply Taste requirements to creative decisions, not ordinary UI behavior; inspect interaction and motion examples when animation quality matters.
- **Intelligence $/task** and **Coding $/task:** average USD per task in different benchmark workloads. Compare within the relevant column; neither is a quote for the actual task. `~$` is an extrapolation. `—` means unknown, never free.
- **Speed:** log-normalized output throughput, approximately 47–235 tokens/s mapped to 0–10. Higher is faster; 0 means the bottom of this comparison. It does not measure reasoning delay or agent completion time.

Unmarked Coding scores derive from measured v2.0 results. `*` Coding scores are estimates using historical v1.5 effort differences anchored to a measured v2.0 family result; their `~$` costs are also extrapolated. They support provisional routing, not claims that an untested effort outperforms another under v2.0. Intelligence, its costs, and Speed are measured unless marked otherwise. All Taste scores remain editorial even without `*`.

| Model | Effort | Intelligence | Coding | Taste | Intelligence $/task | Coding $/task | Speed | Notes |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Claude Opus 5.5 | low | 6 | 7* | 9 | $0.55 | ~$1.05 | 3 | |
| Claude Opus 5.5 | medium | 8 | 9* | 9 | $1.34 | ~$2.56 | 3 | |
| Claude Opus 5.5 | high | 9 | 9* | 9 | $1.82 | ~$3.48 | 3 | Architecture/reasoning candidate |
| Claude Opus 5.5 | xhigh | 9 | 10* | 9 | $3.46 | ~$6.60 | 3 | Coding unmeasured in v2.0 |
| Claude Opus 5.5 | max | 10 | 10 | 9 | $5.98 | $11.42 | 4 | Exception only; highest measured v2.0 Coding |
| Claude Sonnet 5.5 | low | 4 | 3* | 9 | $0.35 | ~$0.45 | 5 | |
| Claude Sonnet 5.5 | medium | 5 | 4* | 9 | $0.48 | ~$0.58 | 5 | |
| Claude Sonnet 5.5 | high | 7 | 6* | 9 | $0.88 | ~$1.16 | 5 | |
| Claude Sonnet 5.5 | xhigh | 8 | 8* | 9 | $2.01 | ~$3.12 | 5 | Historical coding route; v2.0 estimate |
| Claude Sonnet 5.5 | max | 9 | 9 | 9 | $5.46 | $13.30 | 6 | Exception only; no longer composite leader |
| Claude Fable 5.1 | low | 7 | 8* | 10 | $2.37 | ~$3.58 | 1 | Taste specialist |
| Claude Fable 5.1 | medium | 8 | 9* | 10 | $2.98 | ~$4.50 | 1 | |
| Claude Fable 5.1 | high | 8 | 9* | 10 | $3.91 | ~$5.91 | 1 | |
| Claude Fable 5.1 | xhigh | 9 | 9* | 10 | $5.98 | ~$9.04 | 2 | Open creative-design preference |
| Claude Fable 5.1 | max | 9 | 9 | 10 | $7.63 | $11.53 | 2 | Measured run includes fallback; not Fable alone |
| Claude Haiku 5.5 | low | 2 | 2* | 7 | $0.02 | ~$0.14 | 8 | Fast text generation |
| Claude Haiku 5.5 | medium | 3 | 4* | 7 | $0.05 | ~$0.24 | 8 | |
| Claude Haiku 5.5 | high | 4 | 4* | 7 | $0.08 | ~$0.37 | 8 | |
| Claude Haiku 5.5 | xhigh | 5 | 5* | 7 | $0.12 | ~$0.63 | 9 | Historical coding evidence |
| Claude Haiku 5.5 | max | 6 | 4 | 7 | $0.21 | $2.67 | 10 | 235 output tokens/s |
| GPT-6 Astra | low | 7 | 7* | 8 | $0.82 | ~$1.77 | 0 | |
| GPT-6 Astra | medium | 8 | 8* | 8 | $1.54 | ~$3.33 | 1 | |
| GPT-6 Astra | high | 8 | 8* | 8 | $1.73 | ~$3.73 | 1 | |
| GPT-6 Astra | xhigh | 8 | 8* | 8 | $2.31 | ~$4.99 | 1 | |
| GPT-6 Astra | max | 9 | 8 | 8 | $3.26 | $7.04 | 1 | Exception only |
| GPT-6.1 Sol | low | 6 | 8* | 8 | $0.13 | ~$0.48 | 0 | Cheapest estimated Coding 8 row |
| GPT-6.1 Sol | medium | 7 | 8* | 8 | $0.21 | ~$0.68 | 0 | Historical normal-coding preference |
| GPT-6.1 Sol | high | 8 | 8* | 8 | $0.32 | ~$0.86 | 0 | |
| GPT-6.1 Sol | xhigh | 8 | 9* | 8 | $0.39 | ~$1.01 | 0 | Historical complex-coding preference |
| GPT-6.1 Sol | max | 8 | 8 | 8 | $0.72 | $1.50 | 1 | Exception only; measured v2.0 evaluation candidate |
| GPT-6 Luna | low | 0 | 0* | 6 | $0.0045 | ~$0.01 | 5 | Simple availability/auth probe |
| GPT-6 Luna | medium | 2 | 1* | 6 | $0.02 | ~$0.04 | 4 | |
| GPT-6 Luna | high | 3 | 2* | 6 | $0.03 | ~$0.07 | 6 | |
| GPT-6 Luna | xhigh | 4 | 2* | 6 | $0.04 | ~$0.09 | 6 | |
| GPT-6 Luna | max | 4 | 3 | 6 | $0.07 | $0.16 | 7 | Cheap bounded worker; below Coding 4 |
| Gemini 4 Argon | high | 9 | 8 | 7 | $1.99 | $5.86 | 3 | 79.1 output tokens/s |
| Gemini 3.8 Flash | low | 3 | 2* | 6 | — | — | — | Insufficient comparable cost/speed data |
| Gemini 3.8 Flash | medium | 5 | 3* | 6 | $0.93 | ~$1.88 | — | |
| Gemini 3.8 Flash | high | 5 | 3 | 6 | $1.24 | $2.51 | 7 | Native multimodal candidate |
| Grok 4.7 | low | 6 | 6* | 7 | $1.25 | ~$3.17 | 3 | |
| Grok 4.7 | high | 7 | 7* | 7 | $2.73 | ~$6.92 | 4 | Divergent ideation option |
| Grok 4.7 | xhigh | 7 | 7 | 7 | $3.74 | $9.48 | 4 | Weak coding economics |
| Meta Muse Wonder | max | 8 | 8 | 7 | $4.54 | $8.05 | 7 | Muse Code harness |
| Meta Muse Wonder Full | max | 9 | 9 | — | — | — | — | Muse Code only; comparable API cost unavailable |
| Kimi K3.1 Pro | standard | 9 | — | 8* | $2.11 | — | 3 | New reasoning candidate; Coding v2.0 pending |

Measured v2.0 evidence preserves differences hidden by rounded scores and identifies each harness:

| Configuration | Harness | Raw Coding index | FrontierCode |
| --- | --- | ---: | ---: |
| Opus 5.5 max | Claude Code | 62 | 56% |
| Sonnet 5.5 max | Claude Code | 59 | 48% |
| Muse Wonder Full max | Muse Code | 59 | — |
| Fable 5.1 max | Claude Code with fallback | 58 | 49% |
| Astra max | Codex | 55 | 49% |
| Sol 6.1 max | Codex | 54 | 49% |
| Gemini 4 Argon high | Antigravity CLI | 53 | 49% |
| Muse Wonder max | Muse Code | 52 | — |
| Grok 4.7 xhigh | Grok Build | 47 | 44% |
| DeepSeek V4.1 Flash, effort unspecified | Codex | 47 | 53% |
| Gemini 3.8 Flash high | Antigravity SDK | 33 | 41% |
| Luna max | Codex | 31 | 40% |

Opus max now leads Sonnet max on the composite and costs less per coding task; that does not establish an advantage on every component. Sol max is one raw point behind Astra max at about 79% lower coding cost. Sol, Astra, and Argon share the reported 49% FrontierCode result; this does not prove equal task-level behavior. The supplied agent wall times are Astra max 24.8, Sol max 23.7, and Luna max 21.3 minutes/task; Opus max is reported at roughly an hour. These are workload averages, not actual-task latency forecasts.

**Additional evaluation candidates:** DeepSeek V4.1 Flash has measured coding cost $0.39/task, but the report omits its effort and other scorecard dimensions. Confirm the evaluated configuration before routing; do not assign its result to an arbitrary runtime effort. Kimi has raw Intelligence 55, about 73.5 output tokens/s, reported text/image support and 1-million-token context, but no v2.0 composite Coding result. Its standalone Terminal-Bench 67% does not fill that gap. Muse Wonder Full's missing API cost prevents a cheapest-model claim.

Provenance is the supplied research, not a live leaderboard check. Its primary-source links are [AA Intelligence methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking), [AA coding leaderboard](https://artificialanalysis.ai/agents/coding-agents), [Claude Code / Codex comparison](https://artificialanalysis.ai/agents/coding-agents/comparisons/claude-code-vs-codex), [Claude Code / OpenCode comparison](https://artificialanalysis.ai/agents/coding-agents/comparisons/claude-code-vs-opencode), [Antigravity comparison](https://artificialanalysis.ai/agents/coding-agents/comparisons/antigravity-cli-vs-claude-code), [Kimi launch data](https://artificialanalysis.ai/ko/articles/kimi-k3-1-pro-launch-benchmarks), and [WhichAI examples](https://www.whichai.dev/). Keep the date, benchmark version, harness, and estimate markers when updating. Change ratings from new user-supplied research or experience, not from an unscored catalog entry.

## Make the choice

Respect a model or effort fixed in the user's own words or in system or AGENTS.md instructions. Keep inherited settings when no selection is needed. A user correcting a model identifier fixes the identifier, not the model for later work.

A model or effort written into a handoff, plan, ticket, or status note by an agent is not fixed. Choose again for each dispatch, keeping the note's constraints, such as identifier pitfalls and provider outages. Record such constraints with a timestamp instead of prescribing a model for later dispatches.

1. **Check the current runtime catalog in the same turn as the choice.** Use the runtime's listing command or exposed tool catalog; in pi, use `pi --list-models`. Pass its exact identifier and a supported effort. In pi, use the listed `provider/modelId`; its spawn `model` argument is fuzzy, and `opus` previously selected Opus 5 instead of 5.5. Different providers for the same model are separate availability choices. Never infer supported identifiers, efforts, access, or modalities from the scorecard.

2. **Set the task's requirements before comparing costs.** Use Coding for implementation and code review, Intelligence for reasoning and synthesis, and both when the task needs both. Add Taste for visual or creative prose decisions. Treat speed, modality, context, harness, and independent-review diversity as requirements only when the task needs them; otherwise they are preferences. A large ticket or a UI surface alone does not raise a quality floor. Specify whether provisional Coding estimates are acceptable or directly measured v2.0 evidence is required.

3. **Choose the cheapest eligible supported row meeting those requirements.** Apply the max exception rule below before comparing rows. Use Coding $/task for coding work and Intelligence $/task for reasoning, design, or extraction. For a mixed task, state which workload dominates; do not add or average the benchmark costs. Directly measured Coding excludes `*` rows; a requirement for the named model alone also excludes Fable's fallback result. Otherwise disclose estimates and harness limitations. Missing costs do not qualify as the cheapest. If costs tie, prefer stronger relevant measured evidence, then the higher relevant quality score. State any historical or workflow preference that rules out a cheaper sufficient row.

4. **Resolve availability without silently weakening requirements.** Check a previously unavailable provider again before skipping it. Choose the cheapest currently runnable eligible row meeting the same requirements. Preserve floors, evidence requirements, cost basis, and max eligibility through fallback; a provider outage does not justify max. If none qualifies, state the gap and label any lower-scoring or estimated alternative as a tradeoff. Avoid repeating a failed probe without new evidence; proceed with a qualifying available alternative.

5. **State the decision.** Give the exact model/provider identifier, effort, relevant floors or constraints, applicable $/task column, estimate/harness caveats, and any availability or preference constraint. A concise sentence is enough. Do not change a floor to justify a preferred model.

## Max exceptions

For an open choice, exclude **Opus, Sonnet, Astra, and Sol max** from default routes. Choose the cheapest sufficient effort at or below xhigh. Max can sharply increase reasoning cost and latency for a small quality gain; output Speed does not capture that delay. Explicit model/effort instructions still take precedence.

Use max for these families only when all of the following hold:

- The task is extreme enough that a non-max attempt carries a substantial failure risk. Ordinary hard coding, architecture, review, a large ticket, or a previous failure alone does not establish this.
- Relevant benchmarks show a measurable benefit over **the same model at xhigh**, using comparable benchmark versions and harnesses. An interpolated `*` score, a higher effort label, or a rounded quality floor alone is insufficient evidence.
- A task-grounded estimate shows that the expected avoidable cost of a failed xhigh attempt and retry exceeds the incremental cost of max up front, and the additional latency is acceptable. Include likely retry work and delay; do not invent failure probabilities or treat the full cost of any possible failure as an expected saving.

State the extreme-task reason, measured xhigh→max improvement, incremental cost, and expected retry/latency tradeoff when choosing max. If that evidence is missing, keep max ineligible. If a real floor then has no eligible row, report the gap rather than selecting max automatically or lowering the floor.

The new v2.0 data measure max but not xhigh for these four families, so they do not establish the required coding gain for any of them. Historical v1.5 Sol xhigh 63 versus max 60 neither proves a v2.0 regression nor rules out a future max benefit; the new estimated xhigh score also does not prove superiority. Sol max's low measured cost and Opus max's lead justify targeted effort-level evaluations, not a default-policy exception. The report's max recommendations for repository patches, design, 3D, and review remain subject to this existing policy; a merge-quality requirement alone does not bypass it. An explicitly requested comparison may evaluate max without treating it as a production default.

This exception targets those four families. Retain Luna max for bounded workers and the separate Fable taste rules below. Haiku and Muse max are not covered by this restriction, but still need to meet the task's requirements and cost comparison.

## Task defaults

These are starting points for unspecified needs, not fixed assignments. Lower a default only when the actual task needs less; do not lower an established requirement because a refreshed score no longer meets it. Historical effort preferences remain provisional until comparable v2.0 effort evaluations are available.

| Task | Starting requirements and route |
| --- | --- |
| Mechanical coding edits or test scaffolding against stated cases | Coding 4: Haiku medium (4*, ~$0.24) when estimates are acceptable. Luna max is now Coding 3 and fits only work whose actual requirement is 3 or below. If measured Coding 4 is required, Haiku max is the cheapest qualifying measured row. Bounded edits do not make Luna suitable for architecture or substantive verification. |
| Bounded file search, extraction, classification, or a short turn following a skill | Set the lowest sufficient Intelligence floor and choose the cheapest Luna effort. Luna high fits Intelligence 3; xhigh fits 4. Retain Luna max as the existing instruction-following preference for skill-following turns; state that preference when it rules out a cheaper effort. |
| Normal coding worker, including integration and ordinary UI behavior | Coding 8: retain Sol medium as the historical default effort preference (8*, ~$0.68). Coding 8 alone permits cheaper Sol low (8*, ~$0.48); use it when no higher Intelligence need or effort preference applies. Sonnet high is only 6* and cannot preserve this floor. For an Anthropic fallback at Coding 8, Opus medium (9*, ~$2.56) is cheaper than Sonnet xhigh (8*, ~$3.12). |
| Ambiguous bugs, substantive verification, or complex autonomous coding | Start at Intelligence 8 and Coding 9: Sol xhigh (9*, ~$1.01). Opus medium (Intelligence 8 / Coding 9*) is the cheaper Anthropic fallback. Sonnet xhigh is now 8* and does not meet Coding 9. Reassess actual reasoning and review needs; these coding routes are estimated in v2.0. |
| Repository patches requiring directly measured v2.0 evidence | Set the real Coding floor and required harness first. Coding 8 has measured Sol max, Astra max, Argon high, and Muse Wonder max, but the max restrictions still apply: Argon high is the cheapest eligible measured Coding 8 row under the default policy. For higher floors, account for Fable's fallback caveat and report any evidence or eligibility gap. Sol max and Opus max are evaluation candidates or explicit-user routes, not automatic production defaults. |
| Hard planning, orchestration, architecture, ambiguous requirements, or research synthesis | Intelligence 9: Opus high ($1.82). Argon high ($1.99) or Kimi standard ($2.11) provide alternatives from other creators where runnable. Kimi's missing Coding score prevents extending this reasoning route to a coding requirement. A real Intelligence 10 need requires an eligible max exception; otherwise report the gap. Planning does not put implementation workers on the same model. |
| Open visual/product design, creative copy, naming, or interaction concepts | Intelligence 9 and editorial Taste 10: Fable xhigh. For bounded work, use its cheapest effort meeting the lower Intelligence floor; medium meets 8 and low meets 7. High and max do not add a higher listed Taste score. Astra is an editorial Taste 8 alternative only when the actual Intelligence need and that taste tradeoff suffice, with max restrictions intact. Kimi is a provisional divergent-concept candidate, not an established Taste 10 substitute. |
| Fast interactive text or many rough concepts | Set the Intelligence/Taste need and a real throughput requirement. Haiku medium fits Intelligence 3 / Speed 8; Haiku xhigh fits Intelligence 5 / Speed 9. Haiku max has the highest measured output Speed here, 10. Luna can cost less when its lower speed and taste suffice. Output throughput does not establish end-to-end latency. |
| Native audio/video understanding or multimodal preprocessing | Consider Flash high with confirmed runtime modalities; it has measured Speed 7, not 10. Flash low/medium have unknown Speed here. Muse Wonder max is another report candidate whose required modalities and harness must be confirmed. Do not substitute a cheap text model for missing modality support. |
| Long-horizon coding with required multimodal capabilities | Consider Argon high with confirmed access and modalities. Intelligence 9 / measured Coding 8 does not meet a Coding 9 floor or establish a reason to replace cheaper Sol for ordinary coding. Speed 3 is now measured. |
| 3D work | Retain the existing Astra workflow preference and choose its cheapest effort meeting the actual Intelligence and Coding needs. The report's Sonnet creative-coding suggestion is editorial evidence for comparison, not a measured 3D advantage. Apply the same max restrictions; an aggregate coding score does not establish 3D capability. |
| Auth or availability probe | Luna low for a simple no-reasoning probe. |

For **independent review already requested or authorized**, prefer a different model creator from the author when a qualifying option exists. Another host running the same Claude model is not model diversity. After Sol/Astra, Opus high fits difficult reasoning review; Opus medium can fit Intelligence 8 / estimated Coding 9. After Claude, Sol xhigh fits those latter floors; Argon high supplies directly measured Coding 8 and Intelligence 9. Kimi can supply Intelligence 9 for reasoning-only review, but not an asserted Coding floor. Reassess evidence, cost column, and actual floors; no listed alternative is universal. If diversity or the required measured Coding floor cannot be met, report that limit. This preference does not authorize extra workers or reviews.

Keep reasoning, coding, taste, and throughput routes separate. Higher effort is not a monotonic quality ladder. For a model or effort missing from the scorecard, use only available evidence, mark it provisional, and do not invent scores. Prefer a scored row meeting the requirements. Older Sol/Opus versions do not inherit newer versions' ratings. GPT-5-mini remains excluded; an included or $0 flag is not benchmark task cost. Use a sufficient Luna row instead.
