---
name: model-selection
description: Choose a model and reasoning effort from the active harness's capability scorecard. Use whenever the runtime selects or recommends a model, including delegated work, evaluators, or model-routing configuration.
---

# Model selection

Use the active harness's model catalog every time the task requires a model or effort choice. The table below is a Codex reference; use it in another harness only when that harness exposes the same model IDs and effort levels. Never invent an identifier. A score of 10 is best in every column. Keep each model and effort pair together.

## Reference scorecard

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

1. Respect any model or effort fixed by the user or higher-level instructions. If the choice remains open, identify which rows in the active harness's catalog are supported. If that catalog does not expose measured scores, compare the available options using the stated capability requirements and mark the comparison as provisional.
2. Decide which capabilities matter for this task and which are minimum requirements. Do not average all five scores by default. A difficult debugging task may make Intelligence decisive, while visual or writing work may make Taste decisive.
3. Compare the eligible rows on those requirements. Eliminate a row when another eligible row is no worse on every relevant capability and better on at least one.
4. If no supported row meets the minimum requirements, do not lower the floor or present a weaker row as an unqualified recommendation. State that no eligible row clears the floor, name the capability gap, and qualify any fallback verdict as provisional. Supplement that fallback with human review or executable evidence targeted at the gap.
5. Otherwise, choose the best remaining tradeoff. When choices are otherwise equivalent for the task, prefer higher Cost, then higher Tokens, then higher Steps.
6. Before invoking or recommending the model, state the chosen model and effort plus the decisive scores and tradeoff in one concise sentence.

Never invent a model identifier or effort that the active tool does not support. If the best-scoring row is unavailable, choose the best eligible row from the active harness's catalog and say that availability constrained the choice.
