---
name: model-selection
description: "Choose a model and reasoning effort using the DeepSWE and personal-experience scorecard. Use for model recommendations, delegated work, evaluators, or model routing."
---

# Model selection

Use the scorecard below as the primary basis for open model and reasoning-effort choices. The ratings are based on DeepSWE and the user's personal experience. Keep each model and effort pair together; a score of 10 is best in every column.

## Scorecard

| Model          | Effort | Intelligence | Cost | Tokens | Steps | Taste |
| -------------- | ------ | -----------: | ---: | -----: | ----: | ----: |
| GPT Astra      | max    |            9 |    4 |      6 |     9 |     9 |
| GPT Astra      | xhigh  |           10 |    6 |      8 |     9 |     9 |
| GPT Astra      | high   |            9 |    6 |      8 |     9 |     9 |
| GPT Astra      | medium |            9 |    7 |      9 |     9 |     9 |
| GPT Astra      | low    |            4 |    9 |     10 |    10 |     9 |
| GPT Sol        | xhigh  |            8 |    8 |      7 |     7 |     8 |
| GPT Sol        | high   |            6 |    8 |      8 |     8 |     8 |
| GPT Luna       | max    |            4 |   10 |      5 |     1 |     3 |
| Claude Fable 5 | max    |            7 |    1 |      1 |     3 |    10 |
| Claude Fable 5 | xhigh  |            7 |    3 |      4 |     5 |    10 |
| Claude Fable 5 | high   |            6 |    5 |      6 |     6 |    10 |
| Claude Opus 5  | max    |           10 |    4 |      1 |     2 |     9 |
| Claude Opus 5  | xhigh  |            9 |    5 |      3 |     3 |     9 |
| Claude Opus 5  | high   |            9 |    6 |      6 |     4 |     9 |

The columns mean:

- Intelligence: ability to solve complex tasks.
- Cost: cost-effectiveness.
- Tokens: restraint in token use.
- Steps: speed in reaching a solution.
- Taste: quality on creative work.

## Make the choice

Respect a model or effort fixed by the user or higher-level instructions. Keep inherited settings when no selection is needed. For an open choice:

1. Use the active runtime catalog to identify supported model and effort pairs and required tool capabilities. Resolve the table's display labels to exact supported identifiers; never invent an identifier or effort level.
2. Identify the task's relevant scorecard columns and minimum requirements. Difficult debugging may make Intelligence decisive; visual or writing work may make Taste decisive. Do not average all five scores by default.
3. Compare eligible rows using those requirements. Prefer a row that is no worse on every relevant dimension and better on at least one. When otherwise equivalent, prefer higher Cost, then higher Tokens, then higher Steps.
4. Choose the best eligible tradeoff and briefly state the model, effort, decisive scores, and any availability constraint. If no supported row meets a necessary requirement, explain the gap and qualify the fallback rather than silently lowering the requirement.

The runtime catalog establishes availability; the scorecard guides the tradeoff. For an available model absent from the table, use relevant evidence and mark the comparison as provisional without inventing scores. Revise ratings when the user supplies new DeepSWE results or experience; do not silently replace the scorecard with generic model rankings.
