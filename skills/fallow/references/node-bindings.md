# Node.js Bindings

When embedding fallow inside a Node.js process (editor extensions, long-running servers, custom tooling), prefer the NAPI bindings over spawning the CLI. Same analysis engine, same JSON envelopes, no subprocess or JSON parsing overhead.

```bash
npm install @fallow-cli/fallow-node
```

```ts
import { detectDeadCode, detectDuplication, computeHealth } from '@fallow-cli/fallow-node';

const deadCode = await detectDeadCode({ root: process.cwd(), explain: true });
const dupes = await detectDuplication({ root: process.cwd(), mode: 'mild', minTokens: 30 });
const health = await computeHealth({ root: process.cwd(), score: true, ownershipEmails: 'handle' });
```

Seven async functions: `detectDeadCode`, `detectCircularDependencies`, `detectBoundaryViolations`, `detectDuplication`, `detectFeatureFlags`, `computeComplexity`, `computeHealth`. Each returns the same JSON envelope the CLI emits for `--format json`. Rejected promises throw a `FallowNodeError` with `message`, `exitCode`, and optional `code`, `help`, `context` fields that mirror the CLI's structured error surface.

Enum-like fields take lowercase CLI-style literals (`"mild"`, `"cyclomatic"`, `"handle"`, `"low"`). Write-path commands (`fix`, `init`, `hooks install`, `hooks uninstall`, `license activate`, `coverage setup`) are not exposed; use the CLI for those.

See <https://docs.fallow.tools/integrations/node-bindings> for the full field reference.

## Consuming CLI JSON in TypeScript

When the project has `fallow` installed as a dependency, use its installed type contract:

```ts
import type {
  CheckOutput, HealthOutput, DupesOutput, AuditOutput, FallowJsonOutput,
} from 'fallow/types';
```

Inspect the envelope's `kind`, `schema_version`, completeness, and omissions before interpreting it. Each envelope has its own schema-derived version type. The legacy `SchemaVersion` alias describes the dead-code/check version; new consumers should use the relevant envelope's field or version alias. Verify exports against the installed package when versions differ from this reference.
