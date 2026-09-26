---
name: forgejo-cli
description: Use when need to work with Forgejo repository tasks, including pull requests, issues, releases, and Actions.
---

# Forgejo CLI

Prefer `fj` for Forgejo operations when `command -v fj` succeeds. Use `fj --help` and subcommand `--help` to discover commands and flags.

Determine the target host and repository from the task context or Git remotes. Use `git` for ordinary version-control operations. If `fj` is unavailable or lacks the needed operation, use an available Forgejo API or browser tool.
