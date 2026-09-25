---
name: penpot-canvas
description: Create, open, edit, inspect, and preview designs in a user-configured Penpot instance using Codex's built-in browser and the Penpot MCP server. Use for Penpot design work or when a design should serve as a visual spec.
---

# Penpot canvas

Resolve the Penpot URL from a URL supplied for the current task, then `PENPOT_URL`, then `${XDG_CONFIG_HOME:-$HOME/.config}/skillbox/penpot.url`. The config file contains one URL. For the environment variable or file, use an HTTP(S) origin (scheme, host, optional port) without credentials, path, query, or fragment; trim surrounding whitespace and a trailing slash. If none is set, ask the user for the Penpot URL. Use that instance for browser navigation and design links. Configure the Penpot MCP client for the same instance separately; this URL setting controls browser navigation only.

Work in Codex's built-in browser (`iab`), in the background by default. Do not open the user's main browser as a dependency. Show the browser only when the user asks to view or interact with the design; return a direct design URL and a preview when useful.

## Open or create a design

Use the Penpot dashboard in the built-in browser to find a file by name, open a specified file, or create a new one in the appropriate project. Confirm the file name and page before editing. Do not assume a previously focused file is still the intended target.

The browser profile may retain a Penpot login. If it has expired, use the normal Penpot sign-in flow in the built-in browser and its saved credential/autofill if available. Ask the user to sign in there only if needed. Never reveal, extract, copy into a script, or log the password or browser cookie.

## Connect and edit

Use the configured Penpot MCP tools when available. In an open design file, connect Penpot's MCP plugin through **File → MCP Server → Connect** or the equivalent visible control. The MCP server acts on the focused page of the active Penpot tab; a dashboard tab alone is insufficient. If the connection is absent after a browser restart or tab sleep, reopen the design and reconnect on demand. Keep the built-in browser tab for a later turn with `markHandoff()` when continued work is expected.

Before a write, use a read-only MCP call to confirm the connected file and page. Recheck after browser navigation or a page switch. Start with `high_level_overview` when the MCP API has not yet been read in the task, and use `penpot_api_info` for the relevant API surface. Then use `execute_code` for the requested edit. Inspect the changed object or page afterward. When useful, use `export_shape` or a browser screenshot to give the user a visual preview.

If the MCP menu is missing or no file is connected, verify the visible workspace and configured MCP availability. Report the specific failure; do not silently edit a different active file. The official MCP plugin depends on a live open file and cannot stay connected after its browser tab is closed or unloaded.

## Authentication boundaries

The configured MCP `userToken` authenticates the MCP connection. It is **not** a Penpot personal access token for protected backend RPC calls. Use the signed-in browser UI for file discovery and creation. Only use backend RPC when a separately issued Penpot personal access token is available and the deployment has `enable-access-tokens` configured; never reuse the MCP key as an RPC token. Do not put either token in skill files, design URLs, screenshots, or responses.

Penpot references: [MCP workflow](https://help.penpot.app/mcp/), [API tokens and RPC](https://help.penpot.app/technical-guide/integration/), [self-hosted flags](https://help.penpot.app/technical-guide/configuration/).
