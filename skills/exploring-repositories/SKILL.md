---
name: exploring-repositories
description: Use when a user asks to inspect, check, compare, reference, or borrow ideas from an external repository by clone URL, GitHub URL, owner/repo, or project name.
---

# Exploring Repositories

## Overview

Use a durable reference clone instead of the current thread workspace. Resolve the requested project, clone or safely refresh it under `${XDG_DATA_HOME:-$HOME/.local/share}/skillbox/explore`, then report the absolute local path so the thread can reuse it.

## Workflow

1. Resolve the target:
   - Clone URL: use it directly.
   - GitHub page, blob, tree, issue, or PR URL: extract `owner/repo` and use `https://github.com/owner/repo.git`.
   - `owner/repo`: use GitHub HTTPS clone URL.
   - Project name: use GitHub search, then ask only if the best match is not credible or the result is ambiguous for the user's request.
2. Run the bundled helper from this skill directory:

```bash
node scripts/explore-repo.mjs "<clone-url-or-github-url-or-project-name>"
```

3. If the helper reports `action: fetched-only`, use the path but do not force-reset, stash, clean, checkout, or overwrite local work unless the user explicitly asks.
4. Copy the exact `path:` line from the helper output into follow-up commands; do not assume the default path when `XDG_DATA_HOME` may be set.
5. Continue the user's actual repository inspection from the reported `path`.
6. In the response, include:
   - `Local repo: /absolute/path`
   - `Clone URL: ...`
   - refresh state: cloned, refreshed, or fetched-only with the reason

## Quick Reference

| Need | Command |
|---|---|
| GitHub URL or blob URL | `node scripts/explore-repo.mjs "https://github.com/antirez/kilo/blob/master/kilo.c"` |
| Owner/repo | `node scripts/explore-repo.mjs "vitejs/vite"` |
| Project name | `node scripts/explore-repo.mjs "difftastic"` |
| Custom clone URL | `node scripts/explore-repo.mjs "https://gitlab.com/group/project.git"` |

The helper stores repositories under a host path such as:

```text
${XDG_DATA_HOME:-$HOME/.local/share}/skillbox/explore/github.com/owner/repo
```

## Safety Rules

- Never clone reference repositories into the current thread's `work/` directory unless the user explicitly requests a throwaway clone.
- Never run destructive refresh commands such as `reset --hard`, `clean`, or forced checkout for this workflow.
- If an existing clone has local edits, untracked files, local-only commits, no upstream, or a detached HEAD, fetch remote refs only and report why the worktree was not changed.
- If the target path exists but is not a Git repo, or its `origin` points to a different repository, stop and report the conflict.
- Prefer absolute paths in follow-up commands and final responses.

## Common Mistakes

| Mistake | Fix |
|---|---|
| Using a transient path like `work/repos/<name>` | Use `${XDG_DATA_HOME:-$HOME/.local/share}/skillbox/explore/...` |
| Treating a GitHub blob URL as the clone URL | Extract only `owner/repo`, then clone the repository |
| Pulling over local notes or edits | Fetch only, preserve the worktree, and report `fetched-only` |
| Returning only the GitHub URL | Include the absolute local repo path in the response |
