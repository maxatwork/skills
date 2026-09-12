---
name: blast-radius
description: "Use ONLY when the user requests blast-radius analysis. Trace indirect breakage and verify the assumptions that make a change safe."
disable-model-invocation: true
metadata:
  opencode/autoinvoke: "false"
---

# Blast radius

Find what a change breaks somewhere else, before it ships.

Listing the callers is not the job. The agent can grep those in a second. The job is the breakage grep won't show you.

## Don't trust your own writeup

A blast-radius writeup that sounds right is worthless. It reads as convincing whether or not it's true, and that is the trap you are walking into. So don't hand back the writeup alone. Find the material assumptions the change depends on and prove them by running code. Words are where you start, not what you ship.

### How sure are you

For each fact the change's safety depends on, get it as far down this list as is cheap, and say where it stopped.

1. You said so. Worthless on its own.
2. You pointed at the line. A real `file:line`, or the library's own source.
3. You showed the bad case can't happen. You walked the failure step by step and it doesn't reach.
4. You ran it. A script or test that calls the real code and fails loud if you're wrong.
5. You reproduced it in the running app.

Any safety fact you can't get to step 4, say so out loud. Don't write it up as settled. Step 4 is usually one small script that imports the same library the app ships and calls the exact function you're worried about.

## Steps

1. Read the change. Read the diff, the symbols it adds, changes, and deletes, and what it now does differently, including the part the diff doesn't spell out. For a PR or commit, anchor the review in its exact diff and history. Inspect the PR body and discussion when available. Use `git diff`, `git show`, `git log --follow -p`, `git blame`, and `gh pr view` as the target requires.
2. Find the assumptions that make it safe, such as "this call only drops already-dead cache entries". Trace independent assumptions separately when they protect different contracts. Prioritize those that decide whether the change is safe.
3. Look where grep stops. Read the source of the library you call, and check its pinned version and any local patch. Work out when things run: microtasks, unmount and teardown, framework lifecycle differences. Follow what a symbol search misses: the JSON an API returns, a DB column, a wire format, another language reading the same bytes, a feature flag, code three hops downstream.
4. Be honest about each risk. Give it a real chance of happening and a real cost if it does. Keep the risks you confirmed. List the ones you checked and cleared separately. Cite a real `file:line` or the dependency source. Label inference as inference. A search that finds nothing is still an answer. Never make up a caller, contract, or API.
5. Prove the material assumptions. Write a script or test that imports and runs the real code, run it, and paste the command and result. Make the proof fail loudly if the assumption is false. If you can't prove it cheaply, mark it unproven. Don't round up.

## What to hand back

- **What it does.** What changed, including the part that isn't obvious.
- **Safety assumptions.** For each material assumption, state the confidence step reached and show the proof, or mark it unproven.
- **Risks.** Only the real ones. Each names how it breaks, the `file:line`, how likely and how bad, and how to check. Paste the proof for the ones that matter.
- **Cleared.** What you checked and why it's fine.
- **Before you merge.** The cheapest test or repro that catches the real bug, including the script you wrote.

Strip anything private before the result goes anywhere public.

**Reply:** the writeup above, with each material safety assumption either proven or marked unproven.
