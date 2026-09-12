---
name: prototype
description: "Build a throwaway prototype to answer a design question about logic, state, behavior, or UI appearance."
---

# Prototype

Build a runnable exploration that answers the user's design question. The question determines the artifact and fidelity.

## Pick a branch

- For logic, state transitions, or data shape, read [LOGIC.md](LOGIC.md). A self-contained interactive HTML file is useful when a person needs to drive the model; a smaller executable example may answer a purely technical question.
- For appearance or interaction alternatives, read [UI.md](UI.md). Compare distinct options in the real page context when that helps the user choose.

Infer the question from the request and relevant code. Ask only when a missing choice materially changes the experiment. State assumptions and continue independent work.

## Shared boundaries

- Mark the artifact as a prototype and use the requested location or the repository's scratch convention. Follow existing routing conventions for temporary UI routes.
- Make the experiment easy to run. Keep state isolated; use an explicit scratch database only when persistence is part of the question. Keep real user data and production mutations outside the experiment.
- Build only the fidelity needed to learn. Add checks or error handling when the experiment needs them for a trustworthy result, without imposing production infrastructure.
- Expose relevant state and observable outcomes so the user can inspect what each action does.

## Complete the exploration

Deliver the artifact or URL, run instructions, what it establishes, and the remaining question or uncertainty. Record a user decision when one is supplied; do not select a visual winner on the user's behalf when the purpose is to obtain their reaction.

Promote a result into production only when implementation is included in the user's request. Then adapt it to production contracts and verification rather than copying prototype shortcuts. A throwaway branch and issue pointer are optional capture mechanisms when the project uses them; a prototype request alone does not require commits, issue updates, or production changes.
