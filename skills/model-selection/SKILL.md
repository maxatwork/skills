---
name: model-selection
description: "Choose a model and reasoning effort using the DeepSWE and personal-experience scorecard. Use for model recommendations, delegated work, evaluators, or model routing."
---

# Model selection

Use the scorecard below as the primary basis for open model and reasoning-effort choices. The ratings are based on benchmarks and the user's personal experience. Keep each model and effort pair together.

| Model            | Effort | Intelligence |   Cost | Taste | Notes                   |
| ---------------- | ------ | -----------: | -----: | ----: | ----------------------- |
| Claude Opus 5.5  | max    |           10 |   5.89 |     9 |                         |
| Claude Opus 5.5  | xhigh  |            9 |   3.46 |     9 |                         |
| Claude Fable 5.1 | max    |            8 |   7.63 |    10 | Absolute beast in UX/UI |
| Claude Fable 5.1 | xhigh  |            8 |   5.98 |    10 | Absolute beast in UX/UI |
| GPT-6 Astra      | max    |            8 |   3.26 |     8 | Absolute beast in 3D    |
| GPT-6 Astra      | xhigh  |            8 |   2.31 |     8 | Absolute beast in 3D    |
| Claude Opus 5.5  | high   |            8 |   1.82 |     9 |                         |
| Claude Fable 5.1 | high   |            7 |   3.91 |    10 |                         |
| GPT-6 Astra      | high   |            7 |   1.73 |     8 |                         |
| Claude Opus 5.5  | medium |            7 |   1.34 |     9 |                         |
| Claude Fable 5.1 | medium |            6 |   2.98 |    10 |                         |
| GPT-6 Astra      | medium |            6 |   1.54 |     8 |                         |
| GPT-6 Sol        | max    |            6 |   1.06 |     7 |                         |
| Claude Fable 5.1 | medium |            5 |   2.37 |    10 |                         |
| GPT-6 Astra      | low    |            5 |   0.82 |     8 |                         |
| GPT-6 Sol        | high   |            4 |   0.37 |     7 |                         |
| GPT-6 Luna       | max    |            3 |   0.07 |     4 |                         |
| GPT-6 Luna       | xhigh  |            2 |   0.07 |     4 |                         |
| GPT-6 Luna       | high   |            1 |   0.03 |     4 |                         |
| GPT-6 Luna       | medium |          0.5 |   0.02 |     4 |                         |
| GPT-6 Luna       | low    |            0 | 0.0045 |     4 |                         |

The columns mean:

- Intelligence: ability to solve complex tasks, 10 is smartest. 0 doesn't mean useless, e.g. Luna (max) with score 3 is very capable on coding and debugging tasks, where no deep reasoning around architecture needed.
- Cost: avg. cost per task in USD, lower is more cost-effective.
- Taste: quality on creative work, 10 is best.

## Make the choice

Respect a model or effort fixed by the user or higher-level instructions. Keep inherited settings when no selection is needed. For an open choice:

1. Use the active runtime catalog to identify supported model and effort pairs and required tool capabilities. Resolve the table's display labels to exact supported identifiers; never invent an identifier or effort level.
2. Model names may sound similar, e.g. searching for 'opus' may result in 'opus-5' and 'opus-5-5' which are completely different models, choose carefully.
3. Identify the task's relevant scorecard columns and minimum requirements. Difficult debugging may make Intelligence decisive; visual or writing work may make Taste decisive. Do not average all five scores by default.
4. Compare eligible rows using those requirements. Prefer a row that is no worse on every relevant dimension and better on at least one. When otherwise equivalent, prefer higher Cost, then higher Tokens, then higher Steps.
5. Choose the best eligible tradeoff and briefly state the model, effort, decisive scores, and any availability constraint. If no supported row meets a necessary requirement, explain the gap and qualify the fallback rather than silently lowering the requirement.

The runtime catalog establishes availability; the scorecard guides the tradeoff. For an available model absent from the table, use relevant evidence and mark the comparison as provisional without inventing scores. Revise ratings when the user supplies new DeepSWE results or experience; do not silently replace the scorecard with generic model rankings.
