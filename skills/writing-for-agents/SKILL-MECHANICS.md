# Skill mechanics

## Discovery and invocation

Keep a concise `name` and `description` explaining the capability and the requests that need it. Preserve the existing invocation policy when updating a skill. New skills normally allow automatic discovery; make one explicit-only when the user requests that behavior.

Automatic discovery and action authorization are separate. A discoverable skill can still require authorization for an external mutation. An explicit-only workflow should not be required as an automatic prerequisite of another skill.

For Codex, the existing sidecar convention is:

```yaml
policy:
  allow_implicit_invocation: false
```

This belongs in `agents/openai.yaml`. Keep existing interface, dependency, and policy fields when editing it. If changing UI metadata, consult the active skill-creator's sidecar reference and follow its field constraints.

## Portable packaging

Keep root frontmatter within the shared fields the target runtimes support. This library also uses the following extensions on its manual-only skills:

```yaml
disable-model-invocation: true
metadata:
  opencode/autoinvoke: "false"
```

Preserve these existing compatibility fields and the Codex sidecar together. Runtime support can differ; verify the target runtime before claiming that one flag enforces policy everywhere. Keep the explicit-user condition in the description as a readable boundary rather than relying only on vendor-specific metadata.

## Composition

A router selects relevant guidance and respects each workflow's invocation boundary. It should not require the user to invoke a manual workflow just to complete ordinary work already within scope.

If several workflows need the same method, put that method in a plain reference with a read condition. A reference may live beside a manual skill without invoking its full workflow. Link it directly and distinguish that limited reference use from performing the named skill's actions. Extract shared material only when it removes a real conflict or duplication.

Validate frontmatter, links, and policy preservation separately from behavior. A validator's rejection of an existing runtime-specific field is a compatibility limitation, not grounds to remove the user's invocation policy.
