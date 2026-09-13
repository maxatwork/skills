# Proof substrates

Use this declaration only when completing a ticket requires evidence owned by
the environment rather than the implementation: an external database, provider
credentials or configuration, platform capability, hardware, or a comparable
dependency. Tickets without one keep the lightweight template unchanged.

Add a `## Proof substrates` section containing one JSON array. Each entry uses a
stable kebab-case `name`, classifies the proof as `required` or `deferred`,
records current `availability` as `available`, `unavailable`, or `unknown`, and
names a safe detection method. Link deferred proof to its still-unchecked
acceptance criterion with `criterion`.

````markdown
## Proof substrates

```json
[
  {
    "name": "postgresql-independent-connections",
    "classification": "required",
    "availability": "unavailable",
    "detection": {
      "kind": "environment-variable",
      "name": "TEST_POSTGRES_URL"
    },
    "criterion": "Independent PostgreSQL connections prove the claim."
  },
  {
    "name": "provider-configuration",
    "classification": "deferred",
    "availability": "unknown",
    "detection": {
      "kind": "configuration-file",
      "path": ".local/provider-configurations.json"
    },
    "criterion": "Every supported provider adapter passes the real-provider matrix."
  }
]
```
````

Detection supports only these command-free forms:

- `environment-variable` with its variable `name`; probing checks presence but
  never prints or stores the value.
- `configuration-file` with its `path`; probing checks readability but never
  reads or prints the file.
- `capability` with a stable `name` for a platform, service, or hardware fact
  that must be established outside the validator.

Do not put tokens, connection strings, file contents, provider-private data, or
shell commands in a declaration. A required substrate that is unavailable or
unknown blocks `ready-for-agent`. A deferred substrate may leave the ticket
ready, but its named criterion must stay present and unchecked.

Validate a local draft before marking it ready:

```bash
node scripts/validate-proof-substrates.mjs --file <ticket.md> --probe
```

For tracker publication, validate the issue body with the intended label as an
explicit status because tracker bodies do not carry the local status line:

```bash
node scripts/validate-proof-substrates.mjs --file <issue-body.md> --status ready-for-agent --probe
```

The validator reports substrate names and availability only. It validates and
probes declared capability presence; it does not provision services, install
providers, or weaken acceptance criteria.
