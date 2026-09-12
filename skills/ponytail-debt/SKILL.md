---
name: ponytail-debt
description: "Inventory ponytail shortcut comments and their limits or upgrade triggers. Use when the user requests a shortcut or debt ledger; changes no code."
---

Every deliberate ponytail shortcut is marked with a `ponytail:` comment naming
its ceiling and upgrade path. This collects them into one ledger so a deferral
can't quietly become permanent.

## Scan

Grep the repo for comment markers, skipping `node_modules`, `.git`, and build
output:

`rg -n --glob '!node_modules/**' --glob '!.git/**' --glob '!dist/**' --glob '!build/**' '(#|//) ?ponytail:' .`

Honor repository ignores and add the stack's other generated-output paths or comment prefixes when needed.

Each hit is one ledger row. The comment prefix keeps prose that merely mentions
the convention out of the ledger.

## Output

One row per marker, grouped by file:

`<file>:<line>, <what was simplified>. ceiling: <the limit named>. upgrade: <the trigger to revisit>.`

The convention is `ponytail: <ceiling>, <upgrade path>`, so pull the ceiling
and the trigger straight from the comment. Want an owner per row too? add
`git blame -L<line>,<line>`.

Flag the rot risk: any `ponytail:` comment that names no upgrade path or
trigger gets a `no-trigger` tag, those are the ones that silently rot.

End with `<N> markers, <M> with no trigger.` Nothing found: `No ponytail: debt. Clean ledger.`

## Boundaries

Read and report without changing source code. If the user requested a saved ledger, write it at the requested path or the repository's report location; otherwise return it inline.
