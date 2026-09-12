# Map format

The map is an index of decisions, not a copy of every ticket. Follow the tracker's existing issue, label, and dependency conventions. The default label is `wayfinder:map`; its questions are child issues where supported.

The map records:

- **Destination:** the requested planning outcome and how completion is recognized.
- **Notes:** relevant context and user preferences within the authorized scope.
- **Decisions so far:** a linked ticket title and short summary for each resolved decision.
- **Not yet specified:** in-scope questions that are not yet precise enough to ticket.
- **Out of scope:** excluded work and the reason for its exclusion.

Open tickets are found through the tracker query rather than duplicated in the map. In a local Markdown tracker, keep an index with status and dependency links that serves the same purpose.

## Tickets and frontier

Each ticket states a precise question, the evidence needed, its blockers, and any human-owned decision. Size it for a coherent investigation in the available context rather than a fixed token count. Link generated assets instead of pasting their contents into the ticket.

A ticket is unblocked when its blockers are resolved. The frontier contains open, unblocked, unclaimed tickets. Claim work using the existing tracker convention before starting; use the actual user's or agent's configured identity, not an invented assignee. Recheck status before modifying shared issues.

Use native blocking relationships when available. Otherwise record the blocking issues explicitly in the body. Create issue identifiers before wiring references to them.

Useful ticket types are:

- **Research:** a fact to establish from primary sources or local evidence.
- **Prototype:** an experiment or artifact that makes a design question concrete.
- **Grilling:** a consequential choice requiring the user's judgment.
- **Task:** prerequisite work within the authorized scope that enables a decision.

Identify which steps are agent-runnable and which require a person. Type names do not determine whether the entire ticket must wait; complete independent preparation first.

## Keep the map consistent

Record the answer and evidence in the ticket's resolution comment, then close the resolved issue and link its result from the map. For local Markdown, record the resolution and status in its ticket file.

Create a ticket when its question is precise, even when blocked. Keep vague future questions in Not yet specified until evidence makes them concrete. Scope exclusions belong in Out of scope, not the unresolved queue.

If a ticket proves out of scope, record why and close it using the tracker's convention. If new evidence invalidates a prior decision, record the superseding decision and update dependent work. Preserve history and other sessions' work rather than silently deleting their tickets.
