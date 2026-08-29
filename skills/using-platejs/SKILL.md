---
name: using-platejs
description: Implement or change React editor functionality built with Plate.js, including plugins, node and leaf components, editor behavior, serialization, Plate UI, collaboration, and editor-specific tests. Use for Plate/Slate integration work, not generic rich-text work unrelated to Plate.
---

# Using Plate.js

Use this skill when a change crosses `platejs`, `@platejs/*`, Plate UI, Slate
nodes or selections, editor plugins, or the browser editor surface.

## Start from the repository

Before changing code, inspect the repository's instructions, package manifests,
exact `platejs` and `@platejs/*` versions, editor factory or kit, plugin list,
component registration, custom `Value` and node types, SSR/RSC boundaries,
styles, and focused tests. Find the current editor seam and extend it. Do not
replace an existing integration wholesale with a playground copy without
first proving that the existing seam is the problem.

Use this order when sources disagree:

1. The repository's installed versions, local types, and existing composition.
2. The matching topic in [`docs/`](docs/README.md), the local Plate docs mirror
   included with this skill.
3. The official [Plate docs](https://platejs.org/docs) and API pages.
4. The [playground template](https://github.com/udecode/plate-playground-template)
   and [Plate Pro playground docs](https://pro.platejs.org/docs/templates/playground)
   plus the [Plate Pro examples](https://pro.platejs.org/docs/examples) as
   interaction and composition references.

Treat examples as versioned reference implementations, not drop-in code. Check
their package versions and adapt the smallest relevant part to the project.

## Editor composition

For an interactive React editor, keep one stable editor instance per editor
surface and use the repository's existing shell. The common shape is:

```tsx
const editor = usePlateEditor({ plugins, value });

return (
  <Plate editor={editor} onValueChange={handleValueChange}>
    <EditorContainer>
      <Editor />
    </EditorContainer>
  </Plate>
);
```

Use `createPlateEditor` or the project-equivalent factory when the editor is
created outside React. For server or RSC read-only output, use a server-safe
editor and `PlateStatic`; do not import browser-only `/react` components into a
server path. Read [Editor Configuration](docs/editor.md),
[Static Rendering](docs/static.md), and the relevant installation guide when
the boundary is unclear.

Plate core owns the runtime, React bindings, plugins, transforms, and APIs.
Plate UI is copied app-local code: use an existing registry component or
feature kit as the baseline, then make product-specific changes in the copied
component and its styles. Keep the package/plugin owner separate from the UI
owner.

## Plugin and node design

- Prefer an existing plugin's `.configure()` or `.withComponent()` when the
  feature already exists. Create a plugin with `createPlatePlugin` only for a
  genuinely new node, mark, behavior, parser, or app-owned integration.
- Give every plugin a stable unique `key`. Declare dependencies and options in
  the plugin; match the project's plugin order and kit conventions.
- Model nodes deliberately: element vs. leaf, block vs. inline, void vs.
  editable, and the exact `children` shape. Add typed custom element/text
  unions instead of broad casts. Keep external JSON unknown until it has been
  validated into the editor's `Value` type.
- Put ordinary Enter, delete, merge, normalize, selection, and break behavior
  in plugin `rules`. Use plugin `handlers` for user events. Use
  `overrideEditor` only for a deliberate cross-cutting change that delegates to
  the original method; reserve `extendEditor` for integrations that truly need
  to extend the editor object or legacy Slate plugins.
- Expose feature actions through the plugin's typed APIs and transforms. Do not
  mutate `editor.children` directly. Do not retain a `Path` across an insertion,
  reload, remote operation, or async boundary; resolve the current node/path at
  the moment of the action.

Read [Plugin Configuration](docs/plugin.md),
[Plugin Rules](docs/plugin-rules.md),
[Plugin Components](docs/plugin-components.md), and the
[core plugin API](docs/api/core/plate-plugin.md) for exact signatures.

## Components and interaction

Use the narrowest component registration that fits: `.withComponent()` for a
simple plugin component, `node.component` when configuration and rendering are
owned together, the editor `components` map for a local replacement map, or
`render.as` when only the HTML tag changes.

Custom element and leaf components should use `PlateElement` and `PlateLeaf`,
forward Slate/Plate attributes and refs, and always render `children`. A void
node may render custom controls, but its Slate child still needs to be mounted;
keep visible controls non-editable when appropriate. For contextual toolbars,
menus, handles, popovers, and overlays, derive visibility from the live
selection, focused editor, and current node—not from a stale `useSelected` or
last-focused snapshot alone.

Keep editor behavior observable through the same user paths the product uses:
typing, paste, keyboard shortcuts, selection, focus changes, Enter/Backspace,
toolbar actions, block insertion, drag targets, and reload. A DOM-looking
button is not proof that the associated Plate transform, selection, or drop
behavior works.

## Value ownership and conversion

Plate is not a normal controlled text input. Do not mirror `editor.children` to
React state and feed it back on every keystroke. Use `value` for initialization,
`onValueChange` or `onChange` for persistence/observation, and
`editor.tf.setValue()` or `editor.tf.reset()` for explicit external replacement
or reset. For delayed loading, use the documented initialization path rather
than recreating the editor on every fetch.

For a cancelable editor draft, keep the draft in local component state until
the explicit commit action. Publishing each keystroke to shared state makes
Escape unable to cancel and turns an interaction promise into a remote write.
Commit once, then update the collaborative value through the existing editor
seam.

For Markdown, HTML, DOCX, or another exchange format, include the plugins that
own every node the format can produce, then test semantic round trips. Use the
documented parser/serializer APIs and custom rules at the conversion boundary;
do not silently drop custom node data. Read [Markdown](docs/markdown.md),
[HTML](docs/html.md), [DOCX I/O](docs/docx-io.md), or [Static Rendering](docs/static.md)
as needed. A custom node that must render outside the editor needs a compatible
static component and serializer/deserializer behavior too.

## Feature-specific checks

- **IDs and block interaction:** Plate's node IDs are used by features such as
  block selection, block menus, drag-and-drop, tables, TOC, and toggles. Do not
  disable node IDs while using those features without replacing the identity
  contract.
- **Drag and drop:** Use the documented `DndPlugin`/`BlockDraggable` wiring and
  its provider, not only a visual grip. Keep drag identity stable for the
  runtime and resolve the live path at drag start/drop. Reproduce insertion and
  reload before trusting handle tests. See [Drag & Drop](docs/dnd.md).
- **Tables:** Treat table, row, and cell nodes as a structured system. Resolve
  the active cell/table immediately before a mutation, gate contextual UI on
  the right table focus, and test the destination affordance as well as the
  final cell values. See [Table](docs/table.md).
- **Collaboration:** Keep document identity, Yjs state, providers, awareness,
  lifecycle, and persistence responsibilities explicit. Integrate
  `YjsPlugin` at the existing editor seam; do not serialize raw Yjs state as the
  product document or assume local convergence proves a two-client flow. Test
  convergence, teardown/reconnect, reload, and saved-state behavior. A second
  page in the same browser context proves replication only; presence,
  authorization, and revocation claims require independently authenticated
  contexts. See [Collaboration](docs/yjs.md).
- **Input rules and commands:** Prefer feature-owned input rules or the
  documented autoformat/rule factories for Markdown shortcuts and text
  substitutions. Test both keyboard and click paths for slash/combobox menus.
  See [Plugin Input Rules](docs/plugin-input-rules.md),
  [Autoformat](docs/autoformat.md), and [Slash Command](docs/slash-command.md).
- **Performance:** Keep the editor instance stable, subscribe to the smallest
  needed store slice, memoize expensive node UI, and compare large-document or
  many-editor behavior only when the change affects it. See
  [Performance](docs/performance.md) and the local examples.

## Verification

Choose proof that matches the change:

- For transforms, normalization, selection, and plugin options, use
  `@platejs/test-utils` input/output values, including cursor or range state
  when relevant. See [Unit Testing](docs/unit-testing.md).
- For rendered behavior, use the repository's browser harness and exercise the
  user path. Assert visible semantics, selection/focus, persisted value, and
  meaningful DOM state rather than private implementation details. The
  [Playwright guide](docs/playwright.md) explains the optional Plate adapter;
  do not import application transforms into the test process when a real
  browser interaction can prove the behavior.
- Run the repository's targeted formatter/lint, typecheck, unit/browser tests,
  and build gates for the changed surface. Report each result separately; a
  static check or partial test run is not browser proof.

When behavior is unclear, enable the documented debug facilities, reduce the
plugin set to a minimal reproduction, and compare the smallest matching
playground component. Read [Debugging](docs/debugging.md) and
[Troubleshooting](docs/troubleshooting.md) before adding speculative
workarounds.

## Topic map

The local mirror is intentionally kept as the detailed reference set. Start
with the smallest matching file:

| Need | Read |
| --- | --- |
| Install, editor setup, kits, plugin model | `docs/installation*.md`, `docs/editor.md`, `docs/feature-kits.md`, `docs/plugin.md` |
| Components, blocks, marks, menus, toolbars | `docs/plugin-components.md`, `docs/basic-blocks.md`, `docs/toolbar.md`, `docs/block-menu.md` |
| Keyboard/input behavior | `docs/plugin-rules.md`, `docs/plugin-input-rules.md`, `docs/autoformat.md`, `docs/exit-break.md` |
| Tables, lists, code, media, custom nodes | `docs/table.md`, `docs/list*.md`, `docs/code*.md`, `docs/media.md`, `docs/mention.md`, `docs/column.md` |
| Markdown, HTML, DOCX, static output | `docs/markdown.md`, `docs/html.md`, `docs/docx*.md`, `docs/static.md` |
| Yjs, comments, suggestions, AI | `docs/yjs.md`, `docs/comment.md`, `docs/suggestion.md`, `docs/discussion.md`, `docs/ai.md`, `docs/copilot.md` |
| Exact APIs and Slate primitives | `docs/api/` |
| Tests and regressions | `docs/unit-testing.md`, `docs/playwright.md`, `docs/debugging.md`, `docs/troubleshooting.md` |

The mirror's route provenance and refresh timestamp are in
[`docs/_manifest.json`](docs/_manifest.json). Re-check the live official docs
when the project uses a newer version or the local mirror conflicts with the
installed types.
