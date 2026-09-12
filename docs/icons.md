# Icons

**System uses the [Lucide](https://lucide.dev) icon set** — the open-source
(ISC-licensed) icon library — consumed through the installed **`lucide-react`**
package. We don't ship our own icons; we standardize the **sizes** and the
**stroke weight** at which Lucide icons are used.

Source of truth: [`tokens/icons.json`](../tokens/icons.json) → size + stroke
tokens in [`src/index.css`](../src/index.css).

## Size & stroke scale

Icons render on a 24px grid. **Stroke weight scales with size** — thinner at
small sizes, heavier at large ones — so icons stay optically balanced.

| Size | Stroke width | Size token | Stroke token |
| --- | --- | --- | --- |
| 16 px | 0.75 | `--icon-size-16` | `--icon-stroke-16` |
| 20 px | 1.5 | `--icon-size-20` | `--icon-stroke-20` |
| 24 px | 2.0 | `--icon-size-24` | `--icon-stroke-24` |
| 32 px | 2.5 | `--icon-size-32` | `--icon-stroke-32` |
| 40 px | 2.75 | `--icon-size-40` | `--icon-stroke-40` |
| 48 px | 3.0 | `--icon-size-48` | `--icon-stroke-48` |

Endpoints: **16 px → 0.75** stroke, up to **48 px → 3.0** stroke.

**24 px / 2.0** is the default UI size.

## Usage

Import any icon from `lucide-react` and set `size` + `strokeWidth` from the scale:

```tsx
import { Search, Bell, Check } from "lucide-react";

<Search size={16} strokeWidth={0.75} />   // small / inline
<Bell   size={24} strokeWidth={2} />       // default UI
<Check  size={48} strokeWidth={3} />       // large / feature
```

The full icon catalog lives at **[lucide.dev/icons](https://lucide.dev/icons)**.

Icons inherit color from `currentColor` — pair them with the semantic
[icon color tokens](semantic-tokens.md#3-icon) (`--icon-primary`,
`--icon-muted`, …) rather than hard-coded colors.

_Source: `tokens/icons.json` · rebuild tokens with `npm run tokens`._
