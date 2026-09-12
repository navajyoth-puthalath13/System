# Spacing

Part of the **Foundation** layer (alongside [Shadow](./shadows.md), with corner radius
and more to follow).

The system uses **Tailwind v4's default spacing unit** — `--spacing: 0.25rem` (**4px**) —
and does **not** override it. Every `p-*`, `m-*`, `gap-*`, and `space-*` utility is a
multiple of that base, so spacing stays on a single, predictable rhythm.

Source of truth: [`tokens/spacing.json`](../tokens/spacing.json) → `src/index.css`
(the base unit is re-declared explicitly in the token layer, with the used steps documented
as a comment) + `public/spacing.js` (showcase data). The value matches Tailwind's default —
declaring it keeps the base unit visible and versioned alongside the other tokens.

## Scale

These are the steps actually used across the system. Any `*-<step>` utility resolves to
`step × 4px`.

| Step | rem | px | Common classes | Usage |
| --- | --- | --- | --- | --- |
| `0` | 0 | 0 | `p-0 / m-0 / gap-0` | Reset — remove spacing. |
| `0.5` | 0.125 | 2 | `p-0.5 / gap-0.5` | Hairline insets, dense icon padding. |
| `1` | 0.25 | 4 | `p-1 / gap-1` | Tight icon gaps, chip padding. |
| `1.5` | 0.375 | 6 | `p-1.5 / gap-1.5` | Compact control gaps, small-button icon gap. |
| `2` | 0.5 | 8 | `p-2 / gap-2` | Button icon gap, list-item gaps, badge padding. |
| `2.5` | 0.625 | 10 | `px-2.5` | Small button horizontal padding. |
| `3` | 0.75 | 12 | `px-3 / gap-3` | Button / input horizontal padding, form-field gaps. |
| `4` | 1 | 16 | `p-4 / gap-4 / mt-4` | Card body padding (compact), section internals. |
| `6` | 1.5 | 24 | `p-6 / my-6` | Card / panel / dialog body padding, prose rhythm. |
| `8` | 2 | 32 | `p-8 / mt-8` | Page padding, h3 top margin. |
| `10` | 2.5 | 40 | `mt-10` | h2 top margin — major section break. |
| `12` | 3 | 48 | `h-12` | Large control height. |
| `16` | 4 | 64 | `space-y-16` | Between-section spacing on docs pages. |

## Principles

- **One base unit.** Do not introduce arbitrary pixel values — pick the nearest step so
  everything stays on the 4px grid.
- **Multiples, not magic numbers.** `gap-2` (8px) and `gap-3` (12px) read as intentional;
  `gap-[9px]` does not.
- **Steps, not a token per value.** Because the scale is Tailwind's default, there is no
  `--space-*` token to maintain — the utility name *is* the token.
- **Vertical rhythm.** Headings and section breaks use the larger steps (`mt-8`, `mt-10`,
  `space-y-16`) so structure is legible at a glance.

_The base unit is Tailwind's default; the documented steps live in `tokens/spacing.json`.
Run `npm run tokens` to refresh the showcase data._
