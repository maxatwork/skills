---
name: design-change
description: "Use ONLY when the user requests a caller-first design and implementation pass comparing two structural alternatives."
disable-model-invocation: true
metadata:
  opencode/autoinvoke: "false"
---

# Design change

Design the change far enough to choose a coherent interface, then implement it. Default to one uninterrupted run. Pause after the choice only when the user asks for a checkpoint.

Keep sketches in the conversation or scratch space. Add a design document or a design-only commit only when the user asks for one or the repository already requires one.

## Vocabulary

- A **module** owns behavior and presents one **interface** to callers and tests.
- The **interface** is everything a caller must know, including types, invariants, ordering, errors, configuration, and performance constraints.
- A **seam** is where behavior can vary without changing its caller. An **adapter** supplies one concrete behavior at that seam.
- **Ownership** names the module responsible for a state transition, policy, or invariant. Put each decision under one owner.
- Prefer a deep module. Its small interface hides enough policy and coordination to spare callers from recreating them.

## Workflow

### 1. Ground the existing architecture

Read repository instructions and the domain docs, architecture decisions, manifests, or nearby code that constrain the requested change. Trace at least one real call from its caller through the current interface and implementation to persistence or another side effect, then trace the result back. Inspect the relevant tests and nearby precedent.

Record the evidence that constrains the design:

- current caller behavior and compatibility requirements;
- owners of state, policy, validation, and side effects;
- authoritative schemas and types;
- dependency direction and external systems;
- failure, lifecycle, concurrency, and migration constraints.

Treat the current architecture as evidence, not proof that its shape is correct. Grounding is complete when every module and type likely to change is accounted for and the current path is traceable end to end.

### 2. Write caller usage first

Before sketching types or modules, write the target usage from the caller's view. Show the import or entry point, the call, its result, and the failures or lifecycle rules the caller must handle. Use two or three realistic call sites when different callers or outcomes put different pressure on the interface.

Use the project's domain language. Keep storage, transport, framework, and orchestration details out of the usage unless the caller genuinely owns them. This usage is the shared specification for both candidate designs.

Usage is complete when a caller can perform the requested behavior without knowing how the module implements it.

### 3. Sketch two structural alternatives

Derive two solutions from the caller usage. For each candidate, show:

1. the interface types and signatures, including invariants, errors, and ordering rules;
2. the module map and the owner of each state, policy, and side effect;
3. seam placement, adapters, and dependency direction;
4. where untrusted data becomes domain data;
5. how tests exercise observable behavior through the interface;
6. the caller migration and obsolete path it replaces.

Make the candidates structurally different. Change seam placement, ownership, state model, or dependency direction. Renamed methods, split files, and different class syntax are the same design.

Use pseudocode or `not implemented` bodies in scratch material. Keep incomplete bodies out of production files.

### 4. Compare and choose

Compare the candidates directly on:

- caller burden and interface depth;
- seam placement and dependency direction;
- type strength and boundary parsing;
- ownership and locality of change;
- state, concurrency, lifecycle, and error handling;
- migration cost, test quality, and failure risk.

Prefer the design that gives callers the requested behavior through the smaller coherent interface and puts each invariant under one owner. Add a seam only when behavior really varies across it. A production adapter plus a realistic local or test adapter can make that variation real.

Choose one design. State why it wins, why the other loses, and which tradeoffs the choice accepts. Combine parts only when they preserve one coherent seam and ownership model.

The choice is complete when its caller usage, types, ownership, dependency direction, migration, and tests agree with one another.

### 5. Implement the chosen design

Implement the interface, implementation, callers, and behavior-level tests as one coherent change. Parse external data at the seam and trust domain types inside. Derive types from authoritative schemas when one exists. Model meaningful state variants so invalid combinations do not compile.

Migrate real callers before removing the old path. Remove superseded code and tests once nothing uses them. Keep a compatibility layer only for a confirmed consumer.

Treat implementation friction as design evidence. Re-ground and redesign when the same deviation appears more than once, such as repeated casts, extra parameters, pass-through methods, optional fields that are always required, or callers that must know internal rules. Absorb isolated local details without restarting the design.

### 6. Verify and report

Run the repository's relevant format, lint, type, test, and build gates. Inspect the final diff against the chosen caller usage and confirm:

- the promised usage is real;
- each invariant and state transition has one owner;
- transport, persistence, and framework types stay behind their seams;
- callers do not coordinate internal stages;
- all intended callers migrated and obsolete paths are gone.

Report the chosen shape, what changed, any justified deviation from the sketch, and the exact verification results. Distinguish static, test, and runtime evidence.
