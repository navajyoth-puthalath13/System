# Design System

A **token-first** design system, distributed as a **shadcn registry**. It follows
the shadcn registry setup so you can install it into any React app — but it ships
**no components yet**, only colors. Components come later; this is the foundation
they'll sit on. Zero dependencies (Node for the build, Python 3 for the preview).

## Two layers

| Layer          | Source                          | What it is                                              |
| -------------- | ------------------------------- | ------------------------------------------------------- |
| **Primitives** | `tokens/primitives.tokens.json` | Raw palette — 13 scales (gray, red, sky, …), 50→950.    |
| **Semantic**   | `tokens/semantic.tokens.json`   | Roles that reference primitives: text, background, border, action, status. |

Semantic tokens never hard-code a hex — they point at a primitive
(`--action-primary: var(--sky-600)`), so re-theming means re-pointing.
Your primary is **`action-primary` → `sky-600` (#0084D1)**.

## Layout

```
tokens/                  # SOURCE OF TRUTH — your two Figma token files
registry.json            # shadcn registry manifest (lists the "tokens" item)
scripts/build.mjs        # resolves semantic -> primitive, emits everything below
dist/
  variables.css          # all CSS custom properties  ← import directly if not using shadcn
  tokens.resolved.json   # flat, resolved values
public/                  # the served site (docs page + installable registry)
  index.html             # color documentation page
  data.js                # generated
  r/tokens.json          # THE INSTALLABLE ITEM — a shadcn registry item (cssVars)
  r/registry.json        # the registry index
```

## Build & preview

```bash
npm run build            # regenerate everything from tokens/
npm run serve            # build, then serve public/ at http://localhost:5178
```

The page has the browsable palette (click a swatch to copy its CSS variable) and
the install command.

## Install into a React app (shadcn registry)

Your registry serves a real shadcn item at `/r/tokens.json`, so any shadcn project
can pull the tokens:

```bash
npx shadcn@latest add http://localhost:5178/r/tokens.json
```

That drops all the color CSS variables into the app's theme. Then build components
against them: `background: var(--action-primary)`, `color: var(--text-dark-950)`, etc.

To install by name, register the namespace in the consuming app's `components.json`:

```json
{ "registries": { "@ds": "http://localhost:5178/r/{name}.json" } }
```
```bash
npx shadcn@latest add @ds/tokens
```

> Not using shadcn? Skip all of the above and `@import "./dist/variables.css";` —
> same variables, no tooling.

## Update the colors

1. Edit in Figma → re-export → replace the files in `tokens/`.
2. `npm run build`. The registry item, the stylesheet, and the docs all regenerate.

## Adding components later

When you're ready, add component items to `registry.json` (`type: registry:ui`),
point them at source files under a `registry/` folder, and extend `scripts/build.mjs`
to copy those files into `public/r/<name>.json`. The color foundation stays as-is.
