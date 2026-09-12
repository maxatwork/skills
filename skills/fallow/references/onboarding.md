# Requested setup and optional tracking

Use this reference when the user asks to configure Fallow, CI, hooks, or optional tracking. Ordinary analysis finishes with its findings; it does not need setup or telemetry offers.

Inspect the current configuration with `fallow config --path` and use the installed command help for the requested setup. Reuse existing authorization for local setup. Preview changes when supported and explain their effect before an external mutation or an action outside the requested scope.

- For CI, migration, or incremental adoption, read [patterns.md](patterns.md). Keep existing findings distinct from regressions.
- Before installing hooks, inspect `fallow hooks status --format json --quiet`; install only the requested targets.
- Impact is optional local value tracking. Use `fallow impact status --format json` to inspect it and enable or disable it only when requested. A path-free status line is intended for display, not JSON parsing.
- Telemetry is separate and opt-in. Do not enable it on the user's behalf or turn an analysis result into a telemetry solicitation. The user may run `fallow telemetry enable` themselves.
- Cloud coverage, source-map uploads, license activation, and other external operations need the corresponding user request and destination. Read [CLI Reference](cli-reference.md) and verify the installed command before operating.

When telemetry is already enabled, an integration may set `FALLOW_AGENT_SOURCE` to a supported runtime value for attribution; that variable does not enable telemetry. Use the installed allowlist rather than inventing a value.
