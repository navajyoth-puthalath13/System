# Shadow

Part of the **Foundation** layer (alongside [Spacing](./spacing.md), with corner radius
and more to follow).

The Shadow system defines a controlled set of **elevation** and **inset** effects
used to communicate depth, separation, and interaction states across the interface.

Shadows are used intentionally — they are not decoration. They help users
understand the relationship between surfaces and which elements are raised,
floating, or pressed into a surface. The system uses **`gray-950` (`#030712`, a
near-black) with controlled opacity** as the single foundational shadow color,
rather than a separate grayscale palette.

Source of truth: [`tokens/shadows.json`](../tokens/shadows.json) → `--shadow-*`
variables in [`src/index.css`](../src/index.css) (also Tailwind `shadow-*` utilities).

## Shadow scale

Five outer levels + one inset:

| Token | X | Y | Blur | Spread | Color | Opacity | Primary purpose |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `shadow-xs` | 0 | 1 | 2 | 0 | gray-950 | 10% | Very subtle separation |
| `shadow-sm` | 0 | 2 | 4 | −1 | gray-950 | 8% | Raised surfaces and cards |
| `shadow-md` | 0 | 4 | 8 | −2 | gray-950 | 10% | Floating controls and menus |
| `shadow-lg` | 0 | 8 | 16 | −4 | gray-950 | 12% | Popovers and elevated overlays |
| `shadow-xl` | 0 | 16 | 24 | −6 | gray-950 | 14% | Dialogs and high-elevation overlays |
| `shadow-inner` | 0 | 2 | 10 | 0 | gray-950 | 18% | Pressed / recessed states |

---

## 1. Shadow properties

Every shadow is made from five properties.

- **X — horizontal offset.** Kept at `0` so shadows stay centered beneath the
  element, supporting a consistent light-source model. Keep X at 0 unless a
  specific effect requires directional lighting.
- **Y — vertical offset.** Progressive scale `1 → 2 → 4 → 8 → 16`. Positive Y
  moves the shadow down, communicating the element is above the surface.
- **Blur — softness.** `2 → 4 → 8 → 16 → 24`. Increases with elevation so higher
  surfaces feel softer and more distant. Increase blur together with Y.
- **Spread — footprint.** `0 → -1 → -2 → -4 → -6`. Increasingly negative to keep
  larger shadows controlled instead of a hazy halo.
- **Color & opacity.** `gray-950` (`#030712`) with opacity `10% → 8% → 10% → 12% → 14%`
  (inset `18%`). The small variation is intentional — strength is judged visually, not forced into a
  formula. Do not create `shadow-gray-*` tokens.

## 2. The elevation scale

The scale represents **elevation, not component size.** A larger component does
not require a larger shadow — choose the token by how far the element appears to
sit above its surface.

```
Surface                     → shadow-xs
Raised surface / Card       → shadow-sm
Floating control / Dropdown → shadow-md
Popover / Overlay           → shadow-lg
Dialog / Modal              → shadow-xl
```

## 3. Why values increase progressively

Progression, not equal increments — Y `1→2→4→8→16`, Blur `2→4→8→16→24`,
Spread `0→-1→-2→-4→-6`. This is a consistent starting structure, tuned for visual
perception. **The principle:** as perceived elevation increases, the shadow
becomes more displaced and softer, while spread is controlled to prevent an
oversized halo.

## 4. Tokens and intended use

- **`shadow-xs`** — minimal separation: subtle raised surfaces, inputs, low
  containers where a border alone isn't enough. Avoid when an element must clearly float.
- **`shadow-sm`** — a clearly raised surface: cards, tiles, lightweight panels.
  Should feel close to the surrounding surface.
- **`shadow-md`** — a floating element: dropdowns, floating/contextual menus.
- **`shadow-lg`** — a higher floating surface: popovers, floating panels,
  overlays. Noticeably above cards.
- **`shadow-xl`** — highest elevation: dialogs, modals, major overlays. Use
  sparingly — if everything is XL, hierarchy loses meaning.

## 5. `shadow-inner`

Different from the outer scale — it communicates a **pressed, recessed, or inset**
interaction, appearing *inside* the component boundary.

```
X 0 · Y 2 · Blur 10 · Spread 0 · gray-950 · 18%
```

Use for pressed buttons/controls, recessed surfaces, inset fields or wells.
**`shadow-inner` is not another elevation level.**

```
Outer shadow → element appears above the surface
Inner shadow → element appears pressed into the surface
```

Like every level, the inset uses **`gray-950`** (`#030712`) — here at a stronger **18%**
so the recess reads clearly on pressed components. Validate on real components; if a particular surface needs a
stronger or tighter recess, adjust the color, `Y`, or `blur`.

## 6. Shadow vs. focus ring

Focus is **separate** from elevation. A focus ring communicates interaction and
accessibility state, not depth. Do not use an elevation shadow as the primary
focus indicator — a focus ring should use the semantic focus color and stay
visually distinct from normal elevation.

## 7. Color strategy

Every shadow uses **`gray-950`** (`#030712`) with opacity (e.g. `gray-950 / 10%`) rather
than `gray-100/200/300` shadows. A single near-black ink works across surfaces, keeps the
shadow system independent of the color palette, controls strength through opacity, and
avoids extra primitive tokens. White shadows can be useful for highlight effects in
dark/layered styles, but not as a default elevation shadow.

The inset **`shadow-inner`** uses the same `gray-950`, just at a stronger **18%** so the
recess reads. One ink at controlled opacity — not a grayscale shadow ramp.

## 8. Light and dark environments

The *semantic purpose* of an elevation token stays the same across themes, but the
visual treatment may differ. In light environments the gray-950 ink creates good contrast;
in dark environments it becomes less visible, so elevation may be
communicated through a combination of subtle shadow, surface/background contrast,
border, and tonal changes between layers. **Do not** inflate shadow opacity just
to force visibility — elevation is a relationship between surfaces, not only a shadow.

## 9. Usage principles

- Use shadows to answer: *"Is this element above or below the surrounding surface?"*
- Don't put a shadow on everything — it flattens the hierarchy.
- Prefer the **lowest effective elevation**.
- Choose by **elevation, not component size**.
- Keep the light direction consistent (`X = 0`, positive Y = downward shadow).
- Avoid decorative shadows — they should support structure or interaction.

## 10. Token architecture

Shadows live in a dedicated **Shadow** collection (a visual foundation, not
component-specific meaning):

```
Shadow
├── shadow-xs
├── shadow-sm
├── shadow-md
├── shadow-lg
├── shadow-xl
└── shadow-inner
```

If stronger abstraction is later needed, semantic elevation tokens can reference
these primitives (`surface`, `raised`, `overlay`, `popover`, `modal`). For the
current system the primitive scale is sufficient.

## 11. Quick reference

| Token | Use |
| --- | --- |
| `shadow-xs` | subtle separation |
| `shadow-sm` | raised surface / card |
| `shadow-md` | floating control / dropdown |
| `shadow-lg` | popover / overlay |
| `shadow-xl` | dialog / modal |
| `shadow-inner` | pressed / recessed state |

**System principle:** XS → XL is increasing elevation, Inner is inset interaction,
Focus is separate.

_Generated model — edit `tokens/shadows.json`, then run `npm run tokens`._
