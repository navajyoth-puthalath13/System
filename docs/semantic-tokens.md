# Semantic Color Tokens

The semantic color system for **System**. Names describe a token's **role** — its
purpose, meaning, or state — not the shade it happens to hold today.

This file matches what ships in the registry: the source of truth is
[`tokens/semantic.json`](../tokens/semantic.json) (+ [`tokens/primitives.tokens.json`](../tokens/primitives.tokens.json)),
which generates [`src/index.css`](../src/index.css) and the installable theme item
`public/registry/tokens.json`.

---

## 1. Architecture

```
PRIMITIVE  →  SEMANTIC  →  COMPONENT
```

- **Primitive** — *what the value is.* `gray/950`, `blue/500`, `sky/600`.
- **Semantic** — *what it means / where it's used.* `text.primary`, `information.icon`.
- **Component** — consumes the **semantic** token only, never a raw primitive.

> **Primitive = what the value is · Semantic = what it means.**

A semantic token stays meaningful even if its primitive changes
(`text.primary → gray/950` today, `→ gray/900` tomorrow). The component keeps
using `text.primary` and never needs to know.

### CSS variable naming

Dots flatten to dashes in CSS and the registry:

| Model | CSS variable |
| --- | --- |
| `text.primary` | `--text-primary` |
| `information.icon` | `--information-icon` |
| `warning.border-strong` | `--warning-border-strong` |
| `action.primary-hover` | `--action-primary-hover` |

### Dark mode

Every token carries a light **and** a dark primitive. The Figma export is
single-mode, so **dark values are currently derived** (mirrored down the neutral
ramp / lightened for status hues) and marked as placeholder in `src/index.css` —
replace them when a real dark mode is exported from Figma.

---

## 2. Text

Emphasis and availability of text. A semantic hierarchy, not a shade scale.

| Token | CSS variable | Light | Dark | Purpose |
| --- | --- | --- | --- | --- |
| `text.primary` | `--text-primary` | `gray/950` | `gray/50` | Main, highest-emphasis text — headings, primary labels |
| `text.secondary` | `--text-secondary` | `gray/700` | `gray/300` | Supporting text, lower emphasis than primary |
| `text.muted` | `--text-muted` | `gray/600` | `gray/400` | Low-emphasis text — metadata, timestamps, hints |
| `text.disabled` | `--text-disabled` | `gray/400` | `gray/600` | Text for unavailable / disabled UI |
| `text.inverse` | `--text-inverse` | `white` | `gray/950` | Text on dark / inverse surfaces |

Hierarchy: `primary → secondary → muted → disabled`.

## 3. Icon

Mirrors Text. Icons and text may share a primitive but stay separate roles.

| Token | CSS variable | Light | Dark | Purpose |
| --- | --- | --- | --- | --- |
| `icon.primary` | `--icon-primary` | `gray/950` | `gray/50` | Main / high-emphasis icon |
| `icon.secondary` | `--icon-secondary` | `gray/700` | `gray/300` | Supporting icon |
| `icon.muted` | `--icon-muted` | `gray/600` | `gray/400` | Low-emphasis icon |
| `icon.disabled` | `--icon-disabled` | `gray/400` | `gray/600` | Disabled icon |
| `icon.inverse` | `--icon-inverse` | `white` | `gray/950` | Icon on dark / inverse surface |

## 4. Background

Surface **purpose**, not shade.

| Token | CSS variable | Light | Dark | Purpose |
| --- | --- | --- | --- | --- |
| `background.default` | `--background-default` | `white` | `gray/950` | Default surface |
| `background.muted` | `--background-muted` | `gray/50` | `gray/900` | Very subtle surface |
| `background.light` | `--background-light` | `gray/100` | `gray/900` | Light surface |
| `background.subtle` | `--background-subtle` | `gray/200` | `gray/800` | Subtle surface |
| `background.strong` | `--background-strong` | `gray/800` | `gray/200` | Strong dark surface |
| `background.inverse` | `--background-inverse` | `gray/950` | `gray/50` | Dark / inverse surface |

## 5. Border

**All** borders live here — neutral boundaries plus the warning / negative /
positive tints — so every boundary color is in one place.

### Neutral

| Token | CSS variable | Light | Dark | Purpose |
| --- | --- | --- | --- | --- |
| `border.subtle` | `--border-subtle` | `gray/100` | `gray/800` | Low-emphasis separation |
| `border.default` | `--border-default` | `gray/200` | `gray/800` | Standard component boundary |
| `border.emphasis` | `--border-emphasis` | `gray/300` | `gray/700` | More visible boundary |
| `border.strong` | `--border-strong` | `gray/400` | `gray/600` | Strong boundary |
| `border.inverse` | `--border-inverse` | `white` | `gray/800` | Border on dark / inverse surfaces |

### Status

| Token | CSS variable | Light | Dark | Purpose |
| --- | --- | --- | --- | --- |
| `border.warning-subtle` | `--border-warning-subtle` | `amber/100` | `amber/900` | Warning boundary, subtle |
| `border.warning` | `--border-warning` | `amber/200` | `amber/800` | Warning boundary (default) |
| `border.warning-strong` | `--border-warning-strong` | `amber/300` | `amber/700` | Warning boundary, strong |
| `border.negative-subtle` | `--border-negative-subtle` | `red/100` | `red/900` | Error boundary, subtle |
| `border.negative` | `--border-negative` | `red/200` | `red/800` | Error boundary (default) |
| `border.negative-strong` | `--border-negative-strong` | `red/300` | `red/700` | Error boundary, strong |
| `border.positive-subtle` | `--border-positive-subtle` | `green/100` | `green/900` | Positive boundary, subtle |
| `border.positive` | `--border-positive` | `green/200` | `green/800` | Positive boundary (default) |
| `border.positive-strong` | `--border-positive-strong` | `green/300` | `green/700` | Positive boundary, strong |

## 6. Action

Interaction and state. `primary` is the action; `-hover` is state; `-soft` is a
treatment.

| Token | CSS variable | Light | Dark | Purpose |
| --- | --- | --- | --- | --- |
| `action.primary` | `--action-primary` | `sky/600` | `sky/500` | Main CTA / action (default) |
| `action.primary-hover` | `--action-primary-hover` | `sky/700` | `sky/400` | Hover feedback |
| `action.primary-clicked` | `--action-primary-clicked` | `sky/800` | `sky/300` | Pressed / clicked feedback |
| `action.primary-soft` | `--action-primary-soft` | `sky/100` | `sky/950` | Lower-emphasis primary treatment |

> ⚠️ `action.primary-clicked` uses a **placeholder** value (`sky/800` — one step
> past hover). Replace it with the real pressed-state primitive from your
> interaction design. Also note: an on-primary text color (label/icon *on* the
> action) is still undefined — add it before shipping a Button.

State vs treatment are different concepts: `primary` = the action, `-hover` /
`-clicked` = interaction **states**, `-soft` = a lower-emphasis **treatment**.

## 7. Information

Informational meaning (blue — distinct from the sky-based brand action).

| Token | CSS variable | Light | Dark | Purpose |
| --- | --- | --- | --- | --- |
| `information.text` | `--information-text` | `blue/900` | `blue/300` | Information text |
| `information.icon` | `--information-icon` | `blue/500` | `blue/400` | Information indicator |
| `information.border` | `--information-border` | `blue/200` | `blue/800` | Information boundary |
| `information.surface` | `--information-surface` | `blue/100` | `blue/950` | Light information surface |
| `information.background` | `--information-background` | `blue/50` | `blue/950` | Subtle information background |

## 8. Warning

| Token | CSS variable | Light | Dark | Purpose |
| --- | --- | --- | --- | --- |
| `warning.text` | `--warning-text` | `amber/900` | `amber/300` | Warning message / content |
| `warning.icon` | `--warning-icon` | `amber/500` | `amber/400` | Warning indicator |
| `warning.surface` | `--warning-surface` | `amber/100` | `amber/950` | Light warning surface |
| `warning.background` | `--warning-background` | `amber/50` | `amber/950` | Subtle warning background |

## 9. Negative

Errors and destructive conditions. The category is `negative` — **do not** rename
it to `danger`.

| Token | CSS variable | Light | Dark | Purpose |
| --- | --- | --- | --- | --- |
| `negative.text` | `--negative-text` | `red/900` | `red/300` | Error / destructive text |
| `negative.icon` | `--negative-icon` | `red/500` | `red/400` | Error / destructive indicator |
| `negative.surface` | `--negative-surface` | `red/100` | `red/950` | Light negative surface |
| `negative.background` | `--negative-background` | `red/50` | `red/950` | Subtle negative background |

## 10. Positive

| Token | CSS variable | Light | Dark | Purpose |
| --- | --- | --- | --- | --- |
| `positive.text` | `--positive-text` | `green/900` | `green/300` | Positive / success text |
| `positive.icon` | `--positive-icon` | `green/500` | `green/400` | Positive indicator |
| `positive.surface` | `--positive-surface` | `green/100` | `green/950` | Light positive surface |
| `positive.background` | `--positive-background` | `green/50` | `green/950` | Subtle positive background |

---

## 11. Choosing a token

Don't start with *"which shade?"* Start with *"what is this color doing?"*

| Designing… | Ask… | Reach for |
| --- | --- | --- |
| Text | How important is this content? | `text.*` |
| Icon | How important is this icon? | `icon.*` |
| Surface | What kind of surface is this? | `background.*` |
| Interactive control | What action / state is occurring? | `action.*` |
| Boundary | What does the boundary separate? | `border.*` |
| Success / warning / error / info feedback | What is it communicating? | `positive` · `warning` · `negative` · `information` |

## 12. When to add a new token

- [ ] It represents a real UI role.
- [ ] It communicates meaning, emphasis, purpose, or state.
- [ ] Its purpose can be explained without a hex value.
- [ ] The name stays meaningful if the primitive changes.
- [ ] The interface actually needs it.
- [ ] You're defining a role — not reproducing the palette.

**Avoid** minting `information/50…950` just because those shades exist.
**Prefer** `information.text`, `information.icon`, `information.border` — the
semantic layer is purpose-driven, not scale-driven.

## 13. Primitive vs semantic

| Primitive — *what value is this?* | Semantic — *why am I using it here?* |
| --- | --- |
| `gray/950` | `text.primary` |
| `blue/500` | `information.icon` |
| `green/200` | `positive.border` |
| `sky/600` | `action.primary` |
| `white` | `text.inverse` |

## 14. Naming dimensions

A name can encode up to four things — read it as `context.role`, sometimes with
emphasis or state:

- **Context** — where it's used: `text`, `icon`, `background`, `border`, `action`
- **Meaning** — what it communicates: `information`, `warning`, `negative`, `positive`
- **Emphasis** — how strongly: `primary`, `secondary`, `muted`, `disabled`
- **State** — what's happening: `hover`, `clicked`, `disabled`

---

## 15. Consuming in a component

```css
.heading { color: var(--text-primary); }
.card    { background: var(--background-default); border: 1px solid var(--border-default); }
.cta     { background: var(--action-primary); }
.cta:hover { background: var(--action-primary-hover); }
.alert-error { color: var(--negative-text); background: var(--negative-surface); border-color: var(--negative-border); }
```

Install the tokens into a project via the registry:

```bash
npx shadcn@latest add http://localhost:5178/registry/tokens.json
```

_Generated model — edit `tokens/semantic.json`, then run `npm run tokens`._
