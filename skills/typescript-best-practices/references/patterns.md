# TypeScript patterns

Examples for the decisions in [SKILL.md](../SKILL.md). Load the relevant example rather than treating every pattern as mandatory.

## Branded types

Brand primitives so they can't be mixed up. Validate once at creation; downstream code trusts the type.

```ts
type AgentId = string & { readonly __brand: "AgentId" };

function parseAgentId(input: string): AgentId {
  if (!isUUID(input)) throw new Error(`Invalid agent id: ${input}`);
  return input as AgentId;
}

function focusAgent(id: AgentId): void {
  /* input is trusted */
}
```

Use the repository's existing branding convention; this intersection is one example.

## Discriminated unions

If a bug forces the question "wait, can this combination actually happen?", the type is too loose. Model variants with a literal discriminant: every variant shares the field name and each variant's value is unique, so impossible combos can't be represented.

```ts
// Don't. Boolean + optionals lets contradictory states exist.
type DiffState = { loading: boolean; diff?: GitDiff; error?: string };

// Do. Only valid states exist.
type DiffState =
  | { kind: "loading" }
  | { kind: "ready"; diff: GitDiff }
  | { kind: "error"; error: string };
```

Pick one discriminant name (`kind`, `type`, `tag`) and stick to it.

### Dependent unions from a runtime rule registry

When one choice constrains another, do not model them as independent unions. Keep the allowed combinations in one runtime registry, check the registry with `satisfies`, and derive both the dependent union and its boundary schema from it.

```ts
interface RuntimeSchema<Output> {
  parse(input: unknown): Output;
}

type InferSchema<Schema> =
  Schema extends RuntimeSchema<infer Output> ? Output : never;

type RuleRegistry = Record<
  string,
  {
    readonly subject: RuntimeSchema<unknown>;
    readonly target: RuntimeSchema<unknown>;
  }
>;

type RelationFromRules<Rules extends RuleRegistry> = {
  [Kind in keyof Rules]: {
    kind: Kind;
    subject: InferSchema<Rules[Kind]["subject"]>;
    target: InferSchema<Rules[Kind]["target"]>;
  };
}[keyof Rules];

declare function relationSchemaFromRules<const Rules extends RuleRegistry>(
  rules: Rules,
): RuntimeSchema<RelationFromRules<Rules>>;

type CodeAnchor = { repository: string; path: string; line: number };
type ArtifactRevisionRef = { artifactId: string; revisionId: string };

declare const codeAnchorSchema: RuntimeSchema<CodeAnchor>;
declare const artifactRevisionSchema: RuntimeSchema<ArtifactRevisionRef>;

const traceRules = {
  implements: {
    subject: codeAnchorSchema,
    target: artifactRevisionSchema,
  },
  derivedFrom: {
    subject: artifactRevisionSchema,
    target: artifactRevisionSchema,
  },
} as const satisfies RuleRegistry;

const traceLinkSchema = relationSchemaFromRules(traceRules);
type TraceLink = InferSchema<typeof traceLinkSchema>;

const validTrace: TraceLink = {
  kind: "implements",
  subject: { repository: "example-app", path: "src/rule.ts", line: 12 },
  target: { artifactId: "artifact-1", revisionId: "revision-3" },
};

const invalidTrace: TraceLink = {
  kind: "implements",
  // @ts-expect-error implements requires a CodeAnchor subject
  subject: { artifactId: "artifact-1", revisionId: "revision-2" },
  target: { artifactId: "artifact-1", revisionId: "revision-3" },
};
```

`relationSchemaFromRules` is a small adapter for the project's schema library. It adds each registry key as the discriminant and builds the runtime union without a second hand-written kind list. Test that adapter once; consumers should use the resulting schema and inferred type.

## Constructive modeling

Build the type from parts that are all legal instead of restricting a loose type with runtime checks. Adding is easier than subtracting.

Non-empty, via a variadic tuple:

```ts
type NonEmpty<T> = [T, ...T[]];

// Don't: T[] plus a length check every caller must repeat
function pickWinner(entries: string[]): string {
  if (entries.length === 0) throw new Error("no entries");
  return entries[Math.floor(Math.random() * entries.length)];
}

// Do: an empty value of the type can't exist
function pickWinner(entries: NonEmpty<string>): string {
  return entries[Math.floor(Math.random() * entries.length)];
}
```

Where a plain `T[]` arrives, narrow once with a guard. The fact then travels in the type:

```ts
const isNonEmpty = <T>(arr: T[]): arr is NonEmpty<T> => arr.length > 0;
```

Even length, as pairs. TypeScript has no refinement types (no `arr.length % 2 === 0` at the type level); you don't need one:

```ts
type Pairs<T> = [T, T][];
```

A time range, as start plus duration:

```ts
// Don't: a comment holds the invariant
type TimeRange = { start: Date; end: Date }; // start <= end

// Alternative: keep one duration to validate; derive end when needed
type TimeRange = { start: Date; durationMs: number };
```

A plain `number` still permits negative or non-finite durations. Validate the required duration invariant at construction; use a validated type when callers need that guarantee. Brand it (per Branded types) only if a raw number could be passed where a duration is expected, not by reflex. A `Pairs<T>` is an even-length list under the interpretation you give it, the same way `{ start, durationMs }` is a range. Choose the representation and boundary validation that establish the required invariant, then expose the reading you need on top (`pairs.flat()`, a `rangeEnd()` helper).

## Simplest total type

Don't strengthen everything. Keep `T[]` when every operation on it is total:

```ts
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0); // [] is 0, fine
```

Strengthen when the loose type forces a lie at a use site. The tells are `!`, `arr[0] as T`, and a "should never happen" throw:

```ts
// Don't: partiality smuggled past the compiler
function newestSession(sessions: Session[]): Session {
  return sessions.at(0)!;
}

// Do: strengthen the input; the assertion disappears
function newestSession(sessions: NonEmpty<Session>): Session {
  return sessions[0];
}
```

Weakening the result to `Session | undefined` is the other total signature. Either way the empty case lands at the call site, the one place that knows what empty means.

## `unknown` over `any`

`any` disables type checking for everything it touches. External data is always `unknown`. Narrow before use.

```ts
// Don't
function handle(input: any) {
  return input.foo.bar;
}

// Do
function handle(input: unknown) {
  if (typeof input === "object" && input !== null && "foo" in input) {
    // narrowed; compiler verifies access
  }
}
```

External sources include RPC payloads, `JSON.parse`, `postMessage`, IPC, file contents, environment variables, database results.

## Justified assertions

Prefer inference and narrowing. Use an assertion only when validation or an established invariant supplies evidence the compiler cannot express. `as const` preserves literal information; it does not claim that external data was validated.

```ts
// Don't
const user = data as User;

// Do. Earn the cast at the boundary.
function parseUser(data: unknown): User {
  if (typeof data !== "object" || data === null) {
    throw new Error("expected object");
  }
  if (!("id" in data) || typeof (data as Record<string, unknown>).id !== "string") {
    throw new Error("expected id");
  }
  // ... validate all fields
  return data as User; // OK, earned cast after full validation
}
```

When refactoring an `as` out of existing code, identify why TypeScript can't infer:

- Missing discriminant: add one, switch to a discriminated union.
- Overly wide source type (e.g. `Record<string, unknown>`): narrow it.
- Untyped boundary: add a parse function or schema.
- Genuinely inexpressible: keep a narrow assertion with its supporting invariant, or redesign the boundary when that improves the contract. `satisfies` checks an assignable expression; it cannot prove a missing runtime fact.

## Narrowing hierarchy

From best to last-resort:

1. **Discriminated union switch / if.** Compiler narrows automatically.
2. **`in` operator.** `"key" in obj` narrows to variants containing that key.
3. **`typeof` / `instanceof`.** For primitives and class instances.
4. **User-defined type guard.** When the above aren't enough.
5. **`as` assertion.** Only with validation or another established invariant the compiler cannot express.

```ts
function area(s: Shape): number {
  if ("radius" in s) return Math.PI * s.radius ** 2; // narrowed to circle
  return s.width * s.height; // narrowed to rect
}
```

## Type guards

A guard must actually verify the claim. A lying guard is worse than `as` because the bug hides behind a name that says it's safe.

```ts
function isCircle(s: Shape): s is Shape & { kind: "circle" } {
  return s.kind === "circle";
}
```

Prefer discriminant narrowing when possible. The guard adds a layer the reader has to follow.

## Exhaustiveness

In default arms, assign the discriminant to a `never`-typed local. The compiler errors if a new variant is added without handling.

```ts
// Value-returning switch
function area(s: Shape): number {
  switch (s.kind) {
    case "circle":
      return Math.PI * s.radius ** 2;
    case "rect":
      return s.width * s.height;
    default: {
      const _exhaustive: never = s;
      return _exhaustive;
    }
  }
}

// Void switch
function handle(s: Shape): void {
  switch (s.kind) {
    case "circle":
      drawCircle(s);
      break;
    case "rect":
      drawRect(s);
      break;
    default: {
      const _exhaustive: never = s;
      void _exhaustive;
    }
  }
}
```

Return-style in value-returning switches; void-style in statement switches.

## `satisfies` over `as`

`satisfies` validates without widening literal types.

```ts
// Don't. Widens, loses literal types.
const config = { theme: "dark", cols: 3 } as Config;

// Do. Validates AND preserves literal types.
const config = { theme: "dark", cols: 3 } satisfies Config;
// config.theme is "dark" (literal), not string
```

## Boundary validation

Validate once where untrusted data crosses into the domain; trust the established types inside.

- **Wire formats** (proto, JSON-RPC): follow the actual protocol's unknown-field and versioning rules; do not impose one parser option on every protocol.
- **Outgoing requests:** derive input types from the operation contract. A typed object before serialization is not necessarily the wire payload: JSON may omit `undefined` properties or transform values. If outgoing payload validation is needed, validate the serialized representation against the wire contract.
- **Persisted JSON:** versioned blob with a try/catch around the parse.
- **Don't re-validate** deep in call chains.

## Schema-derived types

When a `.proto`, OpenAPI spec, GraphQL schema, or database migration already defines a shape, derive from the generated types instead of duplicating them.

```ts
// Don't. Duplicate shape, drifts when the schema changes.
type CheckSummary = {
  totalCount: number;
  checks: { name: string; status: string }[];
};
function renderChecks(s: CheckSummary) {
  /* ... */
}

// Do. Derive from the generated schema type.
import type { ChecksMessage } from "<generated module>";
function renderChecks(s: Pick<ChecksMessage, "totalCount" | "checks">) {
  /* ... */
}
```

Reach for `Pick`, `Omit`, `Parameters`, `ReturnType`, `Awaited`, `typeof` before writing a new interface.

## Object args

Use named objects when positional fields would be ambiguous. Preserve clear existing signatures; this is an example, not a requirement to migrate every call.

```ts
// Don't. Swap two args, still compiles.
openFile(uri, {
  startLineNumber: 10,
  startColumn: 1,
  endLineNumber: 10,
  endColumn: 1,
});

// Do. Order-independent, self-documenting.
openFile({
  uri,
  selection: {
    startLineNumber: 10,
    startColumn: 1,
    endLineNumber: 10,
    endColumn: 1,
  },
});
```

Skip on hot paths: per-frame render, tokenizers, parsers, anything in a tight loop where the allocation cost matters.

## Focused compiler probes

Use a disposable compiler probe when a type-level relationship is subtle enough that visual inspection is not proof. Keep the probe in the repository's gitignored `.tmp/` directory and include both a valid assignment and an invalid assignment guarded by `@ts-expect-error`.

For TypeScript versions that support `--ignoreConfig`, run the installed compiler directly so unrelated project configuration and ambient types do not obscure the result:

```sh
./node_modules/.bin/tsc --ignoreConfig --noEmit --strict --skipLibCheck .tmp/type-probe.ts
```

A successful probe exits zero because the valid case compiles and the negative case fails exactly where `@ts-expect-error` expects it. If the invalid case becomes legal, TypeScript reports the now-unused directive. Remove the probe after recording the result. This is focused evidence for the type relationship, not a replacement for the repository's normal typecheck.
