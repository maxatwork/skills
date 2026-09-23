---
name: model-selection
description: "Choose a model and reasoning effort using the DeepSWE and personal-experience scorecard. Use for model recommendations, delegated work, evaluators, or model routing."
---

# Model selection

Use the scorecard below as the primary basis for open model and reasoning-effort choices. The ratings are based on DeepSWE and the user's personal experience. Keep each model and effort pair together; a score of 10 is best in every column.

## Scorecard

| Model            | Effort | Intelligence | Cost | Tokens | Steps | Taste |
| ---------------- | ------ | -----------: | ---: | -----: | ----: | ----: |
| GPT-6 Astra      | max    |            9 |    4 |      6 |     9 |     8 |
| GPT-6 Astra      | xhigh  |           10 |    6 |      8 |     9 |     8 |
| GPT-6 Astra      | high   |            9 |    6 |      8 |     9 |     8 |
| GPT-6 Astra      | medium |            9 |    7 |      9 |     9 |     8 |
| GPT-6 Astra      | low    |            7 |    9 |     10 |    10 |     8 |
| GPT-6 Sol        | max    |            8 |    8 |      6 |     7 |     7 |
| GPT-6 Sol        | xhigh  |            8 |    9 |      7 |     7 |     7 |
| GPT-6 Sol        | high   |            7 |    9 |      8 |     8 |     7 |
| GPT-6 Sol        | medium |            6 |   10 |      9 |     9 |     7 |
| GPT-6 Luna       | max    |            6 |   10 |      4 |     2 |     3 |
| GPT-6 Luna       | xhigh  |            5 |   10 |      6 |     3 |     3 |
| GPT-6 Luna       | high   |            4 |   10 |      7 |     5 |     3 |
| GPT-5.6 Sol      | max    |            8 |    6 |      5 |     6 |     7 |
| GPT-5.6 Sol      | xhigh  |            8 |    7 |      7 |     7 |     7 |
| GPT-5.6 Sol      | high   |            7 |    7 |      8 |     8 |     7 |
| GPT-5.6 Sol      | medium |            6 |    8 |      9 |     9 |     7 |
| GPT-5.6 Luna     | max    |            6 |    9 |      5 |     1 |     3 |
| GPT-5.6 Luna     | xhigh  |            5 |    8 |      7 |     3 |     3 |
| Claude Fable 5   | max    |            8 |    1 |      1 |     3 |    10 |
| Claude Fable 5   | xhigh  |            8 |    2 |      4 |     5 |    10 |
| Claude Fable 5   | high   |            7 |    3 |      6 |     6 |    10 |
| Claude Fable 5.1 | max    |            9 |    2 |      1 |     4 |    10 |
| Claude Fable 5.1 | xhigh  |            9 |    3 |      3 |     5 |    10 |
| Claude Fable 5.1 | high   |            8 |    5 |      5 |     6 |    10 |
| Claude Opus 5.5  | max    |           10 |    4 |      1 |     6 |     9 |
| Claude Opus 5.5  | xhigh  |           10 |    6 |      3 |     7 |     9 |
| Claude Opus 5.5  | high   |            9 |    7 |      5 |     8 |     9 |
| Claude Opus 5.5  | medium |            9 |    8 |      7 |     8 |     9 |

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
