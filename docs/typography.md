# Typography

The type system for **System** — one **unified scale** (not separate web/mobile
modes). It's designed to work across contexts, not to be "responsive."

This file matches what ships: the source of truth is
[`tokens/typography.json`](../tokens/typography.json), which generates the
typography tokens + presets in [`src/index.css`](../src/index.css) (embedded in
the registry theme item) and the docs showcase.

- **Font family:** Inter (`--font-sans`). The numeric Figma export named no
  family; Inter matches the existing system and the rendered styles.
- **Sizes / line-heights:** taken verbatim from the Figma variable export.
- **Values below read as `size / line-height`** (px).

---

## Weights

| Weight | Value | CSS |
| --- | --- | --- |
| Light | 300 | `--fw-light` |
| Regular | 400 | `--fw-regular` |
| Medium | 500 | `--fw-medium` |
| Semi-bold | 600 | `--fw-semibold` |
| Bold | 700 | `--fw-bold` |

Headings use **Bold**. Paragraphs are **Regular** by default and can take any of
the five weights (combine a paragraph preset with a `.fw-*` utility).

## CSS naming

Each level exposes size / line-height (and weight, for headings) as tokens; the
`.type-*` presets derive from them — never hard-coded.

| Level | Size token | Line token | Weight token | Preset | Tailwind |
| --- | --- | --- | --- | --- | --- |
| H1 | `--text-h1-size` | `--text-h1-line` | `--text-h1-weight` | `.type-h1` | `text-h1` |
| … | `--text-h{n}-size` | `--text-h{n}-line` | `--text-h{n}-weight` | `.type-h{n}` | `text-h{n}` |
| Paragraph LG | `--text-paragraph-lg-size` | `--text-paragraph-lg-line` | — | `.type-paragraph-lg` | `text-paragraph-lg` |
| … | `--text-paragraph-{k}-size` | `--text-paragraph-{k}-line` | — | `.type-paragraph-{k}` | `text-paragraph-{k}` |

---

## Headings

All headings are **Bold (700)**.

| Token | Size / Line | Preset | Role — when to use |
| --- | --- | --- | --- |
| `H1` | 48 / 52 | `.type-h1` | **Page / hero title** — the primary heading of a page or major experience. |
| `H2` | 40 / 44 | `.type-h2` | **Major section heading** — major sections within a page. |
| `H3` | 32 / 36 | `.type-h3` | **Section / subsection heading** — subsections and prominent component headings. |
| `H4` | 28 / 32 | `.type-h4` | **Component / group heading** — smaller sections and component-level headings. |
| `H5` | 24 / 28 | `.type-h5` | **Smaller component heading** — where H4 is too prominent. |
| `H6` | 20 / 22 | `.type-h6` | **Compact heading** — the smallest semantic heading. |

**Examples**

- **H1** — Dashboard title · Product page title · Landing-page hero · Main screen title.
  _Don't use for card titles or normal section headings._
- **H2** — Your projects · Features · How it works · Major content sections.
- **H3** — Card groups · Large cards · Important subsections · Dialog titles.
- **H4** — Card headings · Form sections · Panel headings.
- **H5** — Small cards · List-group headings · Supporting sections.
- **H6** — Compact panels · Dense UI sections · Small grouped content.

## Paragraph

Each size supports all five weights (Light → Bold); Regular is the default.

| Token | Size / Line | Preset | Role — when to use |
| --- | --- | --- | --- |
| `Paragraph LG` | 20 / 22 | `.type-paragraph-lg` | **Intro / lead text** — lead or introductory content that needs more prominence than body copy. |
| `Paragraph MD` | 16 / 18 | `.type-paragraph-md` | **Default body text** — your default; use this when in doubt. |
| `Paragraph SM` | 14 / 16 | `.type-paragraph-sm` | **Supporting body text** — supporting or secondary information. |
| `Paragraph SMX` | 12 / 16 | `.type-paragraph-smx` | **Metadata / captions** — captions, metadata, and helper text. |

**Examples**

- **LG** — Hero subtitles · Intro paragraphs · Lead text.
- **MD** — Descriptions · Normal paragraphs · Form descriptions · General UI content.
- **SM** — Secondary descriptions · Compact UI · Table content · Secondary labels.
- **SMX** — Captions · Metadata · Timestamps · Helper text.

---

## Using it

Apply a preset (plain CSS / HTML):

```html
<h1 class="type-h1">Page title</h1>
<p class="type-paragraph-md">Default body copy.</p>
<p class="type-paragraph-sm fw-medium">Supporting text, medium weight.</p>
```

Or the Tailwind v4 utilities (registered via `@theme`):

```html
<h2 class="text-h2 font-sans">Section</h2>
<p class="text-paragraph-md">Body</p>
```

Or reference the tokens directly:

```css
.custom-lead {
  font-family: var(--font-sans);
  font-size: var(--text-paragraph-lg-size);
  line-height: var(--text-paragraph-lg-line);
  font-weight: var(--fw-medium);
}
```

_Generated model — edit `tokens/typography.json`, then run `npm run tokens`._
