## Feature-specific checks

- **IDs and block interaction:** Plate's node IDs are used by features such as
  block selection, block menus, drag-and-drop, tables, TOC, and toggles. Do not
  disable node IDs while using those features without replacing the identity
  contract.
- **Drag and drop:** Use the documented `DndPlugin`/`BlockDraggable` wiring and
  its provider, not only a visual grip. Keep drag identity stable for the
  runtime and resolve the live path at drag start/drop. Reproduce insertion and
  reload before trusting handle tests. See [Drag & Drop](../docs/dnd.md).
- **Tables:** Treat table, row, and cell nodes as a structured system. Resolve
  the active cell/table immediately before a mutation, gate contextual UI on
  the right table focus, and test the destination affordance as well as the
  final cell values. See [Table](../docs/table.md).
- **Collaboration:** Keep document identity, Yjs state, providers, awareness,
  lifecycle, and persistence responsibilities explicit. Integrate
  `YjsPlugin` at the existing editor seam; do not serialize raw Yjs state as the
  product document or assume local convergence proves a two-client flow. Test
  convergence, teardown/reconnect, reload, and saved-state behavior. A second
  page in the same browser context proves replication only; presence,
  authorization, and revocation claims require independently authenticated
  contexts. See [Collaboration](../docs/yjs.md).
- **Input rules and commands:** Prefer feature-owned input rules or the
  documented autoformat/rule factories for Markdown shortcuts and text
  substitutions. Test both keyboard and click paths for slash/combobox menus.
  See [Plugin Input Rules](../docs/plugin-input-rules.md),
  [Autoformat](../docs/autoformat.md), and [Slash Command](../docs/slash-command.md).
- **Performance:** Keep the editor instance stable, subscribe to the smallest
  needed store slice, memoize expensive node UI, and compare large-document or
  many-editor behavior only when the change affects it. See
  [Performance](../docs/performance.md) and the local examples.
