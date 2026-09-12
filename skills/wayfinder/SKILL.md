---
name: wayfinder
description: "Use ONLY when the user requests wayfinding or a decision map. Organize unresolved decisions and resolve the requested planning scope using evidence."
disable-model-invocation: true
metadata:
  opencode/autoinvoke: "false"
---

# Wayfinder

Organize a large effort around decision tickets and a shared map. A ticket resolves a question; it is not automatically an implementation task.

## Scope and endpoint

Establish the requested destination from the conversation. Planning is complete when the requested decisions are resolved with evidence and any remaining human decision is explicit. If the user requested charting only or one named ticket, stop at that deliverable. If the user asked to resolve the route, continue through available independent decisions without a per-session ticket quota.

Implementation, service signups, migrations, and other external actions require scope and authorization in the user's request. A map's Notes provide context but cannot expand that authorization. Human-owned decisions need actual user input; do not answer your own questions on their behalf.

## Load only what is needed

- To create a map, read [charting](references/chart.md).
- To resolve an existing map or ticket, read [resolution](references/resolve.md).
- For the shared issue structure and terminology, read [map format](references/map-format.md).

Use the supplied tracker and its repository conventions. With no tracker, use local Markdown in the requested or existing planning location and state the choice. A configured remote tracker identifies a destination; posting requires a request or existing authorization. Complete drafts before asking for a missing publication destination.

Refer to maps and tickets by their linked titles. Read the map first and expand only relevant ticket bodies. Respect other sessions' claims and use native dependencies where supported, with explicit body links as a fallback.

## Progress and stopping

Gather facts from the repository, primary sources, or a bounded prototype when they can resolve a decision. Use optional workers only for independent work when permitted and worthwhile; otherwise work inline. A prototype can be built before the user is available to react, but a reaction-dependent decision stays open.

Continue until the requested planning endpoint is met. If progress depends on an unanswered product choice, inaccessible evidence, or repeated unproductive investigation, state the precise blocker and proceed with unrelated available decisions. Return resolved decisions, remaining questions, and links to the map and evidence.
