---
name: model-selection
description: "Choose the cheapest sufficient model from the DeepSWE and personal-experience scorecard. Use for model recommendations, delegated work, evaluators, or model routing, including a dispatch whose model a handoff or plan already names."
---

# Model selection

Use the scorecard for an open model and effort choice. Ratings are the user's benchmarks and experience. Keep each model and effort pair together. Rows are ordered by intelligence, not by preference.

| Model             | Effort | Intelligence |   Cost | Taste | Notes                                                          |
| ----------------- | ------ | -----------: | -----: | ----: | -------------------------------------------------------------- |
| Claude Sonnet 5.5 | max    |           10 |   7.60 |     7 | Opus 5.5 xhigh is cheaper at the same intelligence             |
| Claude Opus 5.5   | max    |           10 |   5.89 |     9 | Same intelligence as xhigh, higher cost                        |
| Claude Opus 5.5   | xhigh  |           10 |   3.46 |     9 |                                                                |
| Claude Fable 5.1  | max    |            9 |   7.63 |    10 |                                                                |
| Claude Fable 5.1  | xhigh  |            9 |   5.98 |    10 |                                                                |
| GPT-6 Astra       | max    |            9 |   3.26 |     8 |                                                                |
| Claude Sonnet 5.5 | xhigh  |            9 |   2.74 |     7 |                                                                |
| GPT-6 Astra       | xhigh  |            9 |   2.31 |     8 |                                                                |
| Claude Opus 5.5   | high   |            9 |   1.82 |     9 |                                                                |
| Claude Fable 5.1  | high   |            8 |   3.91 |    10 |                                                                |
| GPT-6 Astra       | high   |            8 |   1.73 |     8 |                                                                |
| Claude Opus 5.5   | medium |            8 |   1.34 |     9 |                                                                |
| Claude Fable 5.1  | medium |            7 |   2.98 |    10 |                                                                |
| GPT-6 Astra       | medium |            7 |   1.54 |     8 |                                                                |
| GPT-6 Sol         | max    |            7 |   1.06 |     7 |                                                                |
| Grok 4.7          | xhigh  |            6 |   3.74 |     6 |                                                                |
| Grok 4.7          | high   |            6 |   2.73 |     6 |                                                                |
| Claude Fable 5.1  | low    |            6 |   2.37 |    10 |                                                                |
| Claude Sonnet 5.5 | high   |            6 |   1.08 |     7 |                                                                |
| GPT-6 Astra       | low    |            6 |   0.82 |     8 |                                                                |
| GPT-6 Sol         | xhigh  |            6 |   0.53 |     7 |                                                                |
| Gemini 3.8 Flash  | high   |            5 |   1.24 |     4 |                                                                |
| Claude Sonnet 5.5 | medium |            5 |   0.59 |     7 |                                                                |
| GPT-6 Sol         | high   |            5 |   0.37 |     7 |                                                                |
| Gemini 3.8 Flash  | medium |            4 |   0.93 |     4 |                                                                |
| GPT-6 Luna        | max    |            4 |   0.07 |     4 |                                                                |
| GPT-6 Luna        | xhigh  |            3 |   0.07 |     4 |                                                                |
| GPT-6 Luna        | high   |            2 |   0.03 |     4 |                                                                |
| GPT-6 Luna        | medium |          1.5 |   0.02 |     4 |                                                                |
| GPT-6 Luna        | low    |            1 | 0.0045 |     4 |                                                                |
| GPT-5-mini        | high   |            0 |   0.05 |     1 | Not a candidate. An included or $0 flag is not Cost. Use Luna. |

The columns mean:

- Intelligence: ability to solve complex tasks, 0-10. Higher is better. A low score is not useless. Luna max (4) can write code against a stated spec, and is the wrong row when the work is verification of existing work or architecture judgment. Sol xhigh (6) is enough for most code.
- Cost: average USD per task. Lower is better.
- Taste: visual and prose quality, 10 is best. Use it for visual design or prose, not for ordinary UI behavior.

## Make the choice

Respect a model or effort fixed in the user's own words or in system or AGENTS.md instructions. Keep inherited settings when no selection is needed. A user correcting a model identifier fixes the identifier, not the model for later work.

A model or effort written into a handoff, plan, ticket, or status note by an agent is not fixed. Choose again for each dispatch, and keep only the note's constraints, such as identifier pitfalls and provider outages. When you write such a note, record those constraints with a timestamp instead of a model or effort.

For an open choice, set the minimum the task needs, then take the cheapest supported row that meets it. Do not maximize intelligence or taste. Do not prefer a higher cost. A higher score is not a requirement. Tokens and Steps are not columns. If two qualifying rows cost the same, prefer higher Intelligence.

1. List models from the runtime in the same turn as the choice. In pi, that list is `pi --list-models`. Pass that listing's exact `provider/modelId`. The spawn `model` argument is a fuzzy search: `opus` selected Opus 5 when Opus 5.5 was available. `opus-5` and `opus-5-5` are different models. The same id on two providers is two choices. Never invent an identifier or effort.

2. Set the lowest Intelligence the task needs. Set a Taste minimum only for visual design or prose.

   Unless the task clearly needs more:
   - Specified implementation, including a CSS fix, a frontmatter parse, or a ticket that already states its tests: Intelligence 4. Use Luna max. Use Sol only for verification of existing work, architecture judgment, or an unclear bug, and do not go past Sol xhigh for most code. Astra and Opus are not implementation defaults. A large ticket, a UI surface, or a higher score is not a reason to raise the floor.
   - Planning, orchestration, and synthesis: Opus 5.5 or Astra. Opus 5 and any older Opus do not count. Pass a catalog id for 5.5, such as `claude-opus-5-5`, never `opus` or `claude-opus-5`. Astra means `gpt-6-astra`. Among those rows, take the cheapest effort that meets the floor. Use max only when the floor is 10. A plan that will be implemented by other agents does not put those agents on Opus or Astra.
   - Visual UX/UI: Taste 10. Every Fable row already has it. Pick the cheapest Fable effort that also meets the intelligence floor. Do not pick Fable max for taste alone.
   - 3D: an Astra row, then the cheapest effort that meets the floor. Do not use Astra for backend, infra, or ordinary UI.
   - A short turn that must follow a skill: Luna max, not the GPT-5-mini row.
   - An auth or availability probe: Luna low.

3. If that row's provider cannot run, take the cheapest row that meets the same minimum on the providers that can run now, even if that row is Opus or Astra. Do not wait, do not inherit the session model, and do not raise the floor or the effort because a provider is down. An outage recorded in a handoff or an earlier turn may have ended, so check the provider again before skipping it.

4. State the model, effort, the floor, the cost, and any availability constraint. If nothing meets a real floor, say so. Do not change the floor to justify a preferred model.

The catalog establishes availability. The scorecard guides the tradeoff. For a model missing from the table, compare only with evidence you have, mark it provisional, and do not invent scores. Prefer a scored row that meets the floor. Change ratings only when the user supplies new DeepSWE results or experience.
