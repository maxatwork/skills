# Bold

Source: https://platejs.org/docs/bold

## Registry URLs

- Components index: https://platejs.org/r/registry.json
- Docs index: https://platejs.org/r/registry-docs.json
- Component content: https://platejs.org/r/{name}

Any `<ComponentSource name="..." />` or `<ComponentPreview name="..." />` in this page can be resolved at `https://platejs.org/r/{name}`.

---

---
title: Bold
description: Add strong inline text formatting.
docs:
  - route: /docs/basic-marks
    title: Basic Marks
  - route: /docs/components/mark-toolbar-button
    title: Mark Toolbar Button
  - route: /docs/plugin-shortcuts
    title: Plugin Shortcuts
---

Bold applies the `bold` leaf mark to selected text. `BoldPlugin` owns the mark key, shortcut, HTML parsing, render tag, and toggle transform.

[basic-marks-demo registry content](https://platejs.org/r/basic-marks-demo)

<PackageInfo>

## Features

- `KEYS.bold` leaf mark.
- Default `⌘B` / `Ctrl+B` shortcut.
- HTML deserialization from `strong`, `b`, and bold font weight.
- `<strong>` rendering by default.
- Optional Markdown-style input rules through `BoldRules`.
- Toolbar support through `MarkToolbarButton`.

</PackageInfo>

## Kit Usage

<Steps>

### Add Basic Marks

`BasicMarksKit` includes `BoldPlugin`, bold input rules, and the standard toolbar buttons that use `KEYS.bold`.

[basic-marks-kit registry content](https://platejs.org/r/basic-marks-kit)

```tsx
import { createPlateEditor } from 'platejs/react';

import { BasicMarksKit } from '@/components/editor/plugins/basic-marks-kit';

export const editor = createPlateEditor({
  plugins: [...BasicMarksKit],
});
```

### Add A Toolbar Button

Use `MarkToolbarButton` with `KEYS.bold`.

```tsx
import { BoldIcon } from 'lucide-react';
import { KEYS } from 'platejs';

import { MarkToolbarButton } from '@/components/ui/mark-toolbar-button';

export function BoldToolbarButton() {
  return (
    <MarkToolbarButton nodeType={KEYS.bold} tooltip="Bold (⌘+B)">
      <BoldIcon />
    </MarkToolbarButton>
  );
}
```

</Steps>

## Manual Usage

Install the mark package.

```bash
npm install @platejs/basic-nodes
```

Add `BoldPlugin` directly when you do not want the whole kit.

```tsx
import { BoldPlugin } from '@platejs/basic-nodes/react';
import { createPlateEditor } from 'platejs/react';

export const editor = createPlateEditor({
  plugins: [BoldPlugin],
});
```

Register Markdown-style input rules when users should type bold delimiters.

```tsx
import { BoldRules } from '@platejs/basic-nodes';
import { BoldPlugin } from '@platejs/basic-nodes/react';

export const boldPlugin = BoldPlugin.configure({
  inputRules: [
    BoldRules.markdown({ variant: '*' }),
    BoldRules.markdown({ variant: '_' }),
  ],
});
```

## Ownership

| Surface | Owner | What It Does |
|---------|-------|--------------|
| `BaseBoldPlugin` | `@platejs/basic-nodes` | Headless bold mark, HTML parser, render tag, and `toggle` transform. |
| `BoldPlugin` | `@platejs/basic-nodes/react` | React wrapper with default `mod+b` shortcut. |
| `BoldRules.markdown` | `@platejs/basic-nodes` | Optional mark input rule factory. |
| `BasicMarksKit` | Registry | Adds `BoldPlugin` with `*` and `_` Markdown-style input rules. |
| `MarkToolbarButton` | Registry UI | Reads active mark state and calls the mark toggle hook. |

The package owns the mark. The registry owns toolbar placement and icon choice.

## Behavior

| Behavior | Source |
|----------|--------|
| Mark key | `KEYS.bold` |
| Leaf behavior | `node.isLeaf: true` |
| Toggle transform | `editor.tf.bold.toggle()` calls `editor.tf.toggleMark(type)`. |
| Shortcut | `BoldPlugin` registers `mod+b`. |
| HTML tags | `strong`, `b` |
| HTML styles | `font-weight: 600`, `700`, or `bold` |
| HTML guard | Ignores descendants where `fontWeight` is `normal`. |
| Render output | `strong` |

## API Reference

| API | Package | Use |
|-----|---------|-----|
| `BaseBoldPlugin` | `@platejs/basic-nodes` | Headless bold plugin. |
| `BoldPlugin` | `@platejs/basic-nodes/react` | React bold plugin with shortcut defaults. |
| `BoldRules.markdown(options)` | `@platejs/basic-nodes` | Creates a bold mark input rule. |
| `tf.bold.toggle()` | `@platejs/basic-nodes` | Toggles the bold mark at the selection. |

