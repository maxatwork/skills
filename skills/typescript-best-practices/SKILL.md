---
name: typescript-best-practices
description: "Apply TypeScript type-modeling and boundary-validation conventions when implementing or reviewing TypeScript code. Simple source lookup does not need this workflow."
---

# TypeScript best practices

Use these conventions where they improve the changed interface or invariant. Follow the repository's established types and test setup; this skill has no prerequisite skill.

| Decision | Guidance |
| --- | --- |
| State variants | Use discriminated unions when optional fields would admit invalid combinations. Keep ordinary optional properties when they represent actual optional data. |
| Semantic identifiers | Brand primitives where mixing identifiers is a real error and the project can preserve the brand through its lifecycle. |
| Total operations | Keep a plain array when its operations handle emptiness. Strengthen to a non-empty shape where an operation requires it. |
| External data | Receive untrusted values as `unknown`, parse at the boundary, and trust validated domain types inside. Derive from authoritative schemas. |
| Assertions | Prefer inferred types, narrowing, and `satisfies`. Use an assertion only with evidence the compiler cannot express, such as a validated boundary or constrained interoperability; keep it narrow and explain the invariant when non-obvious. `as const` is not a runtime validation claim. |
| Type guards | Verify the full claim and name guards `isX` or `hasX`. |
| Exhaustiveness | Use a `never` check when every variant must be handled so new variants produce a compiler error. |
| Derived types | Prefer an existing type or `Pick`, `Omit`, `Parameters`, `ReturnType`, `Awaited`, or `typeof` over a duplicate declaration when it expresses the same contract. |
| Temporal values | Order timestamp strings only when one schema guarantees identical canonical formatting. Otherwise compare epochs, dates, or database temporal values. |
| Arguments | Use object arguments when named fields prevent ambiguity or support a cohesive options object. Keep clear positional signatures and established APIs when they serve callers. |
| Verification | Use the repository's real test primitives and local services where appropriate. Check changed UI behavior in the running application; mocks belong at meaningful external boundaries. |
| Diagnostics | Use the project's logging conventions with enough context to diagnose the operation, without exposing secrets. |

Read [patterns](references/patterns.md) only for examples relevant to the current change.
