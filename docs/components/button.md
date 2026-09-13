# Button

> Buttons allow users to perform an action or make a decision.

Buttons provide a clear visual hierarchy between actions while maintaining
consistency across **variant, size, typography, spacing, iconography, radius, and
interaction states**.

---

## Overview

The Button system is structured around three independent properties:

| Property | Defines |
| --- | --- |
| **Variant** | The visual emphasis and importance of an action |
| **Size** | The physical size and density of the control |
| **State** | The current interaction condition |

This separation keeps the component predictable and prevents unnecessary component variations.

```
Button
├── Variant
├── Size
└── State
```

---

# 1. Anatomy

A Button can contain the following elements:

- **Label** — communicates the action.
- **Leading icon** — supports the meaning of the action.
- **Trailing icon** — provides additional context or indicates a next step.
- **Container** — defines the Button's size, shape, background, and border.
- **Focus indicator** — communicates keyboard focus.

### Standard Button

```
┌─────────────────────────────┐
│  [Icon]   Button   [Icon]  │
└─────────────────────────────┘
   ↑          ↑         ↑
 Leading    Label    Trailing
  icon                 icon
```

### Icon-only Button

```
┌──────────────┐
│     Icon     │
└──────────────┘
```

Icon-only Buttons should only be used when the icon's meaning is sufficiently recognizable or an accessible label is provided.

---

# 2. Variants

Variants define the **visual emphasis of an action**.

The Button system has five variants:

1. **Primary**
2. **Secondary**
3. **Secondary Neutral**
4. **Tertiary**
5. **Icon Only**

> **Variant defines emphasis. It does not define size.**

### Color tokens (variant × state)

Every value is a **semantic token** — no raw primitives. Fill = background,
Border = 1px, Text/Icon share one color.

| Variant | State | Fill | Border | Text / Icon |
| --- | --- | --- | --- | --- |
| **Primary** | Default | `action.primary` | `action.primary` | `text.inverse` |
| | Hover | `action.primary-hover` | `action.primary-hover` | `text.inverse` |
| | Focus | Default | Default | Default |
| | Pressed | `action.primary` | `action.primary` | `text.inverse` *(+ shadow-inner)* |
| | Disabled | `action.primary-soft` | `action.primary-soft` | `text.inverse` |
| **Secondary** | Default | — | `action.primary` | `action.primary` |
| | Hover | `action.primary-soft` | `action.primary` | `action.primary` |
| | Focus | Default | Default | Default |
| | Pressed | Hover | Hover | Hover *(+ shadow-inner)* |
| | Disabled | — | `text.disabled` | `text.disabled` |
| **Secondary Neutral** | Default | — | `border.strong` | `text.primary` |
| | Hover | `background.light` | `border.strong` | `text.primary` |
| | Focus | Default | Default | Default |
| | Pressed | Hover | Hover | Hover *(+ shadow-inner)* |
| | Disabled | — | `text.disabled` | `text.disabled` |
| **Tertiary** | Default | `background.muted` | — | `text.primary` |
| | Hover | `background.light` | `background.light` | `text.primary` |
| | Focus | Default | Default | Default |
| | Pressed | Hover | Hover | Hover *(+ shadow-inner)* |
| | Disabled | — | — | `text.disabled` |
| **Icon Only** | — | *same as Primary* | | |

**Focus** (all variants) keeps the default styling and adds a ring:
**`indigo-600`, 2px, 4px offset**. The pressed / clicked state is handled on `:active`
with **`shadow-inner`** (see the Pressed section) — there is no loading state.

**Elevation** (not shown in the table above, since it is a `box-shadow`, not a fill):
at rest the Button is raised — **`shadow-sm`** on Primary, **`shadow-xs`** on the others.
On press that outer shadow is replaced by **`shadow-inner`**; Disabled clears all shadow.

**Dark mode — Primary hover:** `action.primary-hover` resolves **slightly darker**
than Primary (`sky-600` under `sky-500`), so hover deepens the color instead of
lightening it. Light mode is unchanged (`sky-600` → `sky-700`).

Flattened to CSS variables in `src/index.css`: `--action-primary`,
`--action-primary-hover`, `--action-primary-soft`, `--text-inverse`,
`--text-primary`, `--text-secondary`, `--text-disabled`, `--border-strong`,
`--background-muted`, `--background-light`, `--indigo-600`, and the elevation
shadows `--shadow-sm` / `--shadow-xs` (rest) and `--shadow-inner` (press).

---

## Primary

Primary is used for the **main action** within a context.

It receives the strongest visual emphasis.

### Use for

- Create
- Save
- Submit
- Continue
- Confirm
- Get started

### Hierarchy

```
Primary
████████████████
```

There should generally be **one clearly dominant Primary action** within a component or section.

### Semantic tokens

The Primary Button consumes:

```
Default → action.primary
Hover   → action.primary-hover
```

---

## Secondary

Secondary is used for **important alternative actions** that should have less emphasis than Primary.

```
Primary
████████████

Secondary
┌────────────┐
```

### Use for

- Cancel
- Back
- Secondary actions
- Alternative actions alongside a Primary Button

Secondary should remain clearly interactive without competing with the Primary action.

### Hover

On hover, Secondary gains a soft **`action.primary-soft`** fill — its border and
text/icon stay `action.primary`. (This replaces an earlier `action.primary-hover`
border/text treatment.)

---

## Secondary Neutral

Secondary Neutral provides a **neutral alternative** to the standard Secondary treatment.

Its purpose is to communicate an action without introducing the same visual emphasis or brand/action treatment as Secondary.

```
Primary
████████████

Secondary
┌────────────┐

Secondary Neutral
┌────────────┐
```

### Use when

An action is useful or important but should remain visually neutral within the interface.

> **Rule:** Secondary Neutral should have a clearly defined semantic purpose. It should not simply become another gray Button.

### Hover

On hover, a soft **`background.light`** fill appears inside the button; the
**`border.strong`** border and the **`text.primary`** text/icon are retained
(the text does not dim to `text.secondary`).

---

## Tertiary

Tertiary is the **lowest-emphasis text-based Button treatment**.

It keeps an action available without competing visually with higher-priority actions.

```
Primary
████████████

Secondary
┌────────────┐

Tertiary
   Cancel
```

### Use for

- Low-emphasis actions
- Supporting actions
- Dismiss
- Cancel
- Optional actions

At rest, Tertiary carries a very light **`background.muted`** (gray-50) fill with a
transparent border — enough to read as a target without competing with higher-priority
actions. On hover it deepens to a neutral **`background.light`** (gray-100) fill with a
matching **`background.light`** border (fill and stroke are the same color); the text/icon
stays **`text.primary`**. Both fills are neutral grays — no color tint — so Tertiary
never competes with the primary (sky) actions.

---

## Icon Only

Icon Only is used when an action can be communicated through an icon without a visible label.

It is treated as a separate Button variant because its structure differs from text Buttons.

See [Icon Only](#7-icon-only) for sizing and usage.

---

# 3. Size

Button sizes define the **physical size and density** of the control.

The system has three sizes:

| Size | Height | Horizontal padding | Typography | Icon |
| --- | --- | --- | --- | --- |
| **Small** | 32px | 12px | 14/16 Medium | 16px |
| **Medium** | 40px | 16px | 14/16 Medium | 16px |
| **Large** | 48px | 20px | 16/18 Medium | 20px |

### Size progression

```
Small   → 32px
Medium  → 40px
Large   → 48px
```

### Density

- **Small** — compact interfaces
- **Medium** — standard/default UI
- **Large** — prominent actions and spacious layouts

> **Medium is the default Button size** unless the surrounding interface requires another density.

---

# 4. Typography

Buttons use the existing typography system rather than introducing a separate Button type scale.

## Small & Medium

```
Font:        Inter
Size:        14px
Line-height: 16px
Weight:      Medium
```

This corresponds to **Paragraph / SM — 14/16**.

## Large

```
Font:        Inter
Size:        16px
Line-height: 18px
Weight:      Medium
```

This corresponds to **Paragraph / MD — 16/18**.

### Why Medium?

Button text represents an **action**. Medium provides enough visual emphasis to distinguish the action from surrounding content while avoiding the excessive weight of Bold.

> Do not use Paragraph / LG `20/22` for standard Buttons. Paragraph / LG is intended for lead and introductory content.

---

# 5. Spacing

Button spacing follows predictable relationships rather than arbitrary values.

## Horizontal Padding

| Size | Padding |
| --- | --- |
| **Small** | 12px |
| **Medium** | 16px |
| **Large** | 20px |

```
Small
[  12px  Label  12px  ]

Medium
[    16px  Label  16px    ]

Large
[      20px  Label  20px      ]
```

Horizontal padding allows the Button to grow naturally with its content while maintaining consistent visual breathing room.

---

## Icon-to-label Gap

| Size | Gap |
| --- | --- |
| **Small** | 6px |
| **Medium** | 8px |
| **Large** | 8px |

```
[ Icon  8px  Label ]
```

The internal icon gap should remain visually smaller than the Button's external horizontal padding.

Example:

```
[ 16px | Icon | 8px | Label | 16px ]
```

---

# 6. Icon Sizing

Icons scale according to the Button size.

| Button size | Icon size |
| --- | --- |
| **Small** | 16 × 16px |
| **Medium** | 16 × 16px |
| **Large** | 20 × 20px |

### Rule

Icon sizing is controlled by the **Button size**, not globally by the icon component.

```
Button / Small
    → 16px icon

Button / Medium
    → 16px icon

Button / Large
    → 20px icon
```

This prevents changing an icon within one Button size from unintentionally changing the source icon component.

---

# 7. Icon Only

Icon Only Buttons are square controls intended for actions represented by an icon.

| Size | Button | Icon |
| --- | --- | --- |
| **Small** | 32 × 32px | 16px |
| **Medium** | 40 × 40px | 16px |
| **Large** | 48 × 48px | 20px |

Unlike text Buttons, Icon Only Buttons do not use horizontal text padding.

```
Small
┌────────┐
│   +    │
└────────┘
  32×32

Medium
┌──────────┐
│    +     │
└──────────┘
   40×40

Large
┌────────────┐
│     +      │
└────────────┘
    48×48
```

### Accessibility

An accessible name should always be provided for an Icon Only action.

---

# 8. Border

The standard Button border is:

```
1px
```

Border treatment depends on the Button variant.

Outlined variants should consume semantic border tokens rather than directly referencing primitive color values.

### Available semantic border roles

```
border.subtle
border.default
border.emphasis
border.strong
```

> Components consume **semantic tokens**, not raw primitive colors.

---

# 9. Border Radius

Buttons consistently use the **LG radius token** across all Button sizes.

## Radius Scale

| Token | Value |
| --- | --- |
| **SM** | 2px |
| **MD** | 4px |
| **LG** | 8px |

## Button Radius

```
Small   → LG → 8px
Medium  → LG → 8px
Large   → LG → 8px
```

The Button radius remains consistent across sizes.

> **Button radius = LG = 8px**

Do not define separate horizontal and vertical radius values for standard rounded Buttons.

---

# 10. States

States communicate the Button's current interaction condition.

The current Button states are:

```
Default
Hover
Focus
Pressed
Disabled
```

> **Pressed** is applied on `:active`. Every variant gets **`shadow-inner`** — the button
> recesses into the surface on click instead of scaling. **Primary** additionally reverts
> its fill/border from `action.primary-hover` back to **`action.primary`** (base), so the
> press visibly lifts off the hover colour. The other variants keep their hover appearance
> under the shadow.

---

## Default

The normal interactive state.

```
┌──────────────────┐
│      Button      │
└──────────────────┘
```

The Button should clearly communicate that it is actionable.

---

## Hover

Hover provides feedback when a pointer is positioned over the Button.

For Primary:

```
Default → action.primary
Hover   → action.primary-hover
```

The hover state should provide a noticeable but controlled visual change.

---

## Focus

Focus communicates keyboard interaction.

The focus treatment should remain visible and distinct from the Button's normal border.

```
     ┌─────────────────────┐
     │ ┌─────────────────┐ │
     │ │     Button      │ │
     │ └─────────────────┘ │
     └─────────────────────┘
             ↑
         Focus ring
```

Focus should not depend exclusively on color differences.

---

## Pressed

Pressed communicates the moment of interaction — while the pointer (or key) is held down.

```
Rest (raised)      Pressed (dropped + recessed)
┌──────────────┐   ┌──────────────┐
│    Button    │   │▓░  Button  ░▓│
└──────────────┘   └──────────────┘
   ⌄ shadow-sm         recessed (shadow-inner) — outer shadow removed
```

**Depth comes from an elevation change, not the inner shadow alone.** At rest the Button
is *raised* off the surface with an outer shadow — **`shadow-sm`** on Primary, **`shadow-xs`**
on the others. On `:active`, **`shadow-inner`** (`inset 0 2px 10px gray-950 / 18%`)
**replaces** that outer shadow (it is the same `box-shadow` property), so the Button
simultaneously *drops to the surface* and *recesses in*. That drop-and-recess is what makes
the press feel physical — an inner shadow added to a flat button has nothing to fall from.
It replaces any scale/transform effect and clears automatically on release and when disabled.

- **Primary** additionally changes colour on press: because the pointer is over the
  Button, hover has already shifted it to `action.primary-hover`; on `:active` it reverts
  to **`action.primary`** (base). So the press reads as the fill *lifting* off the hover
  colour while the inner shadow presses it in.
- **Secondary, Secondary Neutral, Tertiary** keep their **hover** fill/border/text during
  the press — only the inner shadow is added.
- Pressed is a **state, not a variant** — it reuses `action.primary`; no new tokens.

### Motion

Colour changes (`color`, `background-color`, `border-color`) animate over **150 ms** with
**`cubic-bezier(0.4, 0, 0.2, 1)`** (the same timing Care UI uses). The Button also sets
`touch-action: manipulation` and `-webkit-tap-highlight-color: transparent` so fast /
repeated clicks feel crisp — no tap delay and no grey flash on touch.

> **Touch note.** iOS Safari only applies `:active` (the pressed recess) on tap when the
> page has a touch listener registered — otherwise a tap shows no press feedback. Register
> a no-op once at the app root: `document.addEventListener("touchstart", () => {}, { passive: true })`.
> Also prefer neutralising `:hover` under `@media (hover: none)` so a tap doesn't leave the
> button stuck in its hover colour. (Tailwind's `hover:` variant already gates on hover
> support; the hand-written showcase does this explicitly.)

> **`box-shadow` is deliberately NOT transitioned.** The rest→press swap goes from an
> *outer* shadow to an *inset* one, and browsers cannot interpolate between inset and
> non-inset shadows — a transitioned `box-shadow` applies the change *discretely* (only
> after ~half the duration), so on a fast click you release before the recess ever appears
> (the "inner shadow not working" symptom). Excluding `box-shadow` from the transition makes
> the inner shadow apply **instantly** on press — correct, and the crisp feedback you want.
> The colour/border eases; the depth is immediate.

---

## Disabled

Disabled communicates that an action is currently unavailable.

```
Default
██████████

Disabled
░░░░░░░░░░
```

Disabled Buttons should:

- Have reduced visual emphasis.
- Not respond as an active control.
- Clearly communicate their unavailable state.

> **Disabled is a state, not a variant.**

---

# 11. Button Hierarchy

When multiple actions appear together, variants establish their relative importance.

```
HIGH EMPHASIS
      ↓
   Primary
      ↓
  Secondary
      ↓
Secondary Neutral
      ↓
  Tertiary
      ↓
LOW EMPHASIS
```

The hierarchy should make the intended primary action obvious without requiring the user to evaluate every available action.

---

# 12. Variant × Size

Variant and Size are independent properties.

```
Button
│
├── Variant
│   ├── Primary
│   ├── Secondary
│   ├── Secondary Neutral
│   ├── Tertiary
│   └── Icon Only
│
├── Size
│   ├── Small
│   ├── Medium
│   └── Large
│
└── State
    ├── Default
    ├── Hover
    ├── Focus
    └── Disabled
```

This allows the Button to scale through component properties rather than separate components.

### Examples

```
Primary / Small
Primary / Medium
Primary / Large

Secondary / Small
Secondary / Medium
Secondary / Large

Tertiary / Small
Tertiary / Medium
Tertiary / Large
```

---

# 13. Button Specifications

## Small

```
Height:             32px
Typography:         14 / 16
Weight:             Medium
Horizontal padding: 12px
Icon:               16px
Icon gap:           6px
Border:             1px
Radius:             LG → 8px
```

## Medium

```
Height:             40px
Typography:         14 / 16
Weight:             Medium
Horizontal padding: 16px
Icon:               16px
Icon gap:           8px
Border:             1px
Radius:             LG → 8px
```

## Large

```
Height:             48px
Typography:         16 / 18
Weight:             Medium
Horizontal padding: 20px
Icon:               20px
Icon gap:           8px
Border:             1px
Radius:             LG → 8px
```

---

# 14. Usage Guidelines

## Do

- Use Primary for the main action.
- Use Secondary for important alternatives.
- Use Tertiary for low-emphasis actions.
- Use Medium as the default Button size.
- Use existing typography styles.
- Use semantic color and border tokens.
- Maintain consistent radius across Button sizes.
- Provide accessible names for Icon Only Buttons.
- Use Button size to determine icon size.

## Don't

- Make every action Primary.
- Use Button size to communicate action importance.
- Create arbitrary font sizes.
- Create unnecessary Button variants.
- Use raw primitive colors inside the component.
- Change the source icon size globally for a Button-specific requirement.
- Use SMX or very small text for standard Button labels.
- Treat Disabled (or Pressed) as a separate variant — they are states.
- Replace the Pressed `shadow-inner` recess with a scale/transform effect.

---

# 15. Figma Component Structure

The Button should be maintained as **one component set** using component properties.

```
Button
│
├── Variant
│   ├── Primary
│   ├── Secondary
│   ├── Secondary Neutral
│   ├── Tertiary
│   └── Icon Only
│
├── Size
│   ├── Small
│   ├── Medium
│   └── Large
│
└── State
    ├── Default
    ├── Hover
    ├── Focus
    └── Disabled
```

### Icon behavior

```
Small  → 16px
Medium → 16px
Large  → 20px
```

The Button controls its nested icon size according to the selected Button size.

---

# 16. Quick Reference

## Size

| Property | Small | Medium | Large |
| --- | --- | --- | --- |
| Height | 32px | **40px** | 48px |
| Font size | 14px | **14px** | 16px |
| Line height | 16px | **16px** | 18px |
| Weight | Medium | **Medium** | Medium |
| Horizontal padding | 12px | **16px** | 20px |
| Icon | 16px | **16px** | 20px |
| Icon gap | 6px | **8px** | 8px |
| Border | 1px | **1px** | 1px |
| Radius | **LG / 8px** | **LG / 8px** | **LG / 8px** |

## Variants

| Variant | Purpose |
| --- | --- |
| **Primary** | Main action |
| **Secondary** | Important alternative action |
| **Secondary Neutral** | Neutral alternative action |
| **Tertiary** | Low-emphasis action |
| **Icon Only** | Icon-based action without a visible label |

## States

| State | Purpose |
| --- | --- |
| **Default** | Normal interactive state |
| **Hover** | Pointer interaction feedback |
| **Focus** | Keyboard/input focus |
| **Disabled** | Action unavailable |

---

# 17. Design System Principles

### One action should be visually dominant

Use Primary for the main action rather than making every action Primary.

### Size communicates density, not importance

```
Size     = Physical size / density
Variant  = Action emphasis
State    = Interaction condition
```

### Keep spacing predictable

Use established spacing relationships:

```
Horizontal padding
12 → 16 → 20

Icon gap
6 → 8 → 8
```

### Reuse the typography system

Button typography should consume the existing typography system instead of creating an independent Button type scale.

### Use semantic tokens

Components should consume semantic roles such as:

```
action.*
text.*
border.*
```

rather than directly referencing primitive color values.

### Keep properties independent

Variant, Size, and State should remain separate so that the component remains flexible and easy to maintain.

---

# Component Summary

The Button system is intentionally built around a **small, predictable set of choices**.

```
Variant
   ↓
What kind of action is this?

Size
   ↓
How much space and density does it need?

State
   ↓
What is happening to the Button?

Tokens
   ↓
What values define its visual appearance?
```

The goal is not to maximize the number of Button combinations.

The goal is to make the **correct Button easy to choose, easy to build, and consistent across the product**.
