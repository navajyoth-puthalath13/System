// Build the token layer from the semantic model (v2, purpose-driven names).
// Reads:  tokens/primitives.tokens.json  +  tokens/semantic.json
// Emits:  src/index.css   (tier 1 primitives + tier 2 semantic + derived dark + @theme)
//         public/data.js  (window.DS for the docs page swatches)
//
// Run: npm run tokens   (or: node scripts/build-tokens.mjs)

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(readFileSync(join(root, p), "utf8"));

const primDoc = read("tokens/primitives.tokens.json");
const semantic = read("tokens/semantic.json").groups;

const slug = (ref) => ref.replace(/\./g, "-").toLowerCase();

// ---- flatten primitives -> hex map + ordered scales -----------------------
const primHex = {};
const scales = [];   // { family, steps:[{step,var,hex}] }
const singles = [];  // white/black/transparent
for (const [family, node] of Object.entries(primDoc)) {
  if (family.startsWith("$")) continue;
  if (node.$value && typeof node.$value === "object" && node.$value.hex !== undefined) {
    const hex = node.$value.alpha === 0 ? "transparent" : node.$value.hex;
    primHex[family] = hex;
    singles.push({ var: slug(family), hex });
    continue;
  }
  const steps = [];
  for (const [step, leaf] of Object.entries(node)) {
    if (step.startsWith("$") || !leaf.$value?.hex) continue;
    primHex[`${family}.${step}`] = leaf.$value.hex;
    steps.push({ step, var: slug(`${family}.${step}`), hex: leaf.$value.hex });
  }
  if (steps.length) scales.push({ family, steps });
}

// ---- resolve semantic tokens ---------------------------------------------
const groups = []; // { group, tokens:[{name, var, ref, refVar, hex, dark, darkVar, darkHex, purpose}] }
for (const [group, tokens] of Object.entries(semantic)) {
  const resolved = tokens.map((t) => ({
    name: t.name,
    var: `${group}-${t.name}`,
    ref: t.ref,
    refVar: slug(t.ref),
    hex: primHex[t.ref] ?? "",
    dark: t.dark,
    darkVar: slug(t.dark),
    darkHex: primHex[t.dark] ?? "",
    purpose: t.purpose ?? "",
  }));
  groups.push({ group, tokens: resolved });
}

// ---- emit src/index.css ---------------------------------------------------
let css = `/* ============================================================================
   Design System — token layer (Tailwind v4, CSS-first). GENERATED — do not edit.
   Source of truth: tokens/primitives.tokens.json + tokens/semantic.json
   Tier 1 = primitives (raw palette). Tier 2 = semantic roles (purpose-driven).
   Components must consume ONLY tier-2 semantic tokens, never a raw primitive.
   Dark values are derived (single-mode Figma export) — refine on real dark export.
   ========================================================================== */

@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

/* ---------------------------------------------------------------- Tier 1 */
:root {
`;
for (const s of scales) {
  css += `  /* ${s.family} */\n`;
  for (const st of s.steps) css += `  --${st.var}: ${st.hex};\n`;
}
for (const s of singles) css += `  --${s.var}: ${s.hex};\n`;

css += `\n  /* ------------------------------------------------------ Tier 2 (light) */\n`;
for (const g of groups) {
  css += `  /* ${g.group} */\n`;
  for (const t of g.tokens) css += `  --${t.var}: var(--${t.refVar});\n`;
}
css += `  --radius: 0.625rem;\n}\n`;

css += `\n/* ------------------------------------------------- Tier 2 (dark, derived) */\n.dark {\n`;
for (const g of groups) {
  const diffs = g.tokens.filter((t) => t.darkVar && t.darkVar !== t.refVar);
  if (!diffs.length) continue;
  css += `  /* ${g.group} */\n`;
  for (const t of diffs) css += `  --${t.var}: var(--${t.darkVar});\n`;
}
css += `}\n`;

css += `\n/* ----------------------------------- semantic tokens as Tailwind utilities */\n@theme inline {\n`;
for (const g of groups) for (const t of g.tokens) css += `  --color-${t.var}: var(--${t.var});\n`;
css += `  --radius-sm: calc(var(--radius) - 4px);\n  --radius-md: calc(var(--radius) - 2px);\n  --radius-lg: var(--radius);\n  --radius-xl: calc(var(--radius) + 4px);\n}\n`;

// ---- Typography (single unified scale) -----------------------------------
const type = read("tokens/typography.json");
const wVal = Object.fromEntries(type.weights.map((w) => [w.key, w.value]));

css += `\n/* ============================================================================\n   Typography — one unified scale. Tokens are the source of truth; the .type-*\n   presets derive from them (never hard-coded). Sizes/line-heights: Figma export.\n   ========================================================================== */\n`;
css += `:root {\n  --font-sans: ${type.fontFamily};\n`;
for (const w of type.weights) css += `  --fw-${w.key}: ${w.value};\n`;
css += `\n  /* per-level tokens (size / line-height / weight) */\n`;
for (const h of type.headings) css += `  --text-${h.key}-size: ${h.size}px;   --text-${h.key}-line: ${h.line}px;   --text-${h.key}-weight: var(--fw-${h.weight});\n`;
for (const p of type.paragraphs) css += `  --text-paragraph-${p.key}-size: ${p.size}px;   --text-paragraph-${p.key}-line: ${p.line}px;\n`;
css += `}\n`;

css += `\n/* text-style presets (derive from the tokens above) */\n`;
for (const h of type.headings) css += `.type-${h.key} { font-family: var(--font-sans); font-size: var(--text-${h.key}-size); line-height: var(--text-${h.key}-line); font-weight: var(--text-${h.key}-weight); }\n`;
for (const p of type.paragraphs) css += `.type-paragraph-${p.key} { font-family: var(--font-sans); font-size: var(--text-paragraph-${p.key}-size); line-height: var(--text-paragraph-${p.key}-line); font-weight: var(--fw-regular); }\n`;
css += `\n/* weight utilities — combine with a paragraph preset (e.g. .type-paragraph-lg.fw-medium) */\n`;
for (const w of type.weights) css += `.fw-${w.key} { font-weight: var(--fw-${w.key}); }\n`;

css += `\n/* typography as Tailwind v4 utilities (text-h1, text-paragraph-md, font-sans) */\n@theme inline {\n  --font-sans: ${type.fontFamily};\n`;
for (const h of type.headings) css += `  --text-${h.key}: var(--text-${h.key}-size);\n  --text-${h.key}--line-height: var(--text-${h.key}-line);\n  --text-${h.key}--font-weight: var(--text-${h.key}-weight);\n`;
for (const p of type.paragraphs) css += `  --text-paragraph-${p.key}: var(--text-paragraph-${p.key}-size);\n  --text-paragraph-${p.key}--line-height: var(--text-paragraph-${p.key}-line);\n`;
css += `}\n`;

// ---- Icons (Lucide) — size tokens ----------------------------------------
const iconsCfg = read("tokens/icons.json");
css += `\n/* icon sizes + per-size stroke width (Lucide set) */\n:root {\n`;
for (const s of iconsCfg.sizes) css += `  --icon-size-${s.size}: ${s.size}px;   --icon-stroke-${s.size}: ${s.stroke};\n`;
css += `}\n`;

// ---- Shadows (elevation) -------------------------------------------------
const shadowsCfg = read("tokens/shadows.json");
const shadowValue = (s) =>
  `${s.inset ? "inset " : ""}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px rgba(${s.color ?? shadowsCfg.color}, ${s.opacity})`;
css += `\n/* elevation shadows (black + opacity) */\n:root {\n`;
for (const s of shadowsCfg.shadows) css += `  --shadow-${s.name}: ${shadowValue(s)};\n`;
css += `}\n@theme inline {\n`;
for (const s of shadowsCfg.shadows) css += `  --shadow-${s.name}: var(--shadow-${s.name});\n`;
css += `}\n`;

// ---- Spacing (base unit) -------------------------------------------------
// Tailwind v4 already defines --spacing: 0.25rem. We re-declare it explicitly so the
// base unit lives in the token layer (visible + versioned), and document the used steps.
const spacingCfg = read("tokens/spacing.json");
css += `\n/* spacing — base unit (Tailwind v4 default, declared explicitly for the token layer).\n   Every p-*, m-*, gap-*, space-* utility is a multiple of --spacing. Steps used:\n`;
for (const s of spacingCfg.steps) css += `     ${s.step.padEnd(4)} = ${String(s.px).padStart(2)}px  (${s.classes})\n`;
css += `*/\n:root {\n  --spacing: ${spacingCfg.base};   /* ${spacingCfg.basePx}px base */\n}\n@theme inline {\n  --spacing: var(--spacing);\n}\n`;

mkdirSync(join(root, "src"), { recursive: true });
writeFileSync(join(root, "src/index.css"), css);

// ---- emit public/data.js (for the docs page swatches) --------------------
const pageData = {
  semanticGroups: groups.map((g) => ({
    group: g.group,
    tokens: g.tokens.map(({ name, var: v, refVar, hex, darkHex, purpose }) => ({
      name, var: v, refVar, hex, dark: darkHex, purpose,
    })),
  })),
  primitiveScales: scales.map((s) => ({ family: s.family, steps: s.steps })),
};
mkdirSync(join(root, "public"), { recursive: true });
writeFileSync(join(root, "public/data.js"), "window.DS = " + JSON.stringify(pageData, null, 2) + ";\n");

// ---- emit public/type.js (for the docs typography showcase) --------------
const typeData = {
  fontFamily: type.fontFamily,
  fontFamilyName: type.fontFamilyName,
  weights: type.weights,
  headings: type.headings.map((h) => ({ ...h, weightValue: wVal[h.weight] })),
  paragraphs: type.paragraphs.map((p) => ({
    name: p.name, key: p.key, size: p.size, line: p.line,
    role: p.role, use: p.use, for: p.for,
    weights: p.weights.map((k) => type.weights.find((w) => w.key === k)),
  })),
};
writeFileSync(join(root, "public/type.js"), "window.TYPE = " + JSON.stringify(typeData, null, 2) + ";\n");

// ---- emit public/shadow.js (for the docs shadow showcase) ----------------
const shadowData = {
  color: shadowsCfg.color,
  shadows: shadowsCfg.shadows.map((s) => ({ ...s, value: shadowValue(s) })),
};
writeFileSync(join(root, "public/shadow.js"), "window.SHADOWS = " + JSON.stringify(shadowData) + ";\n");

// ---- emit public/spacing.js (for the docs foundation showcase) -----------
writeFileSync(join(root, "public/spacing.js"), "window.SPACING = " + JSON.stringify({ base: spacingCfg.base, basePx: spacingCfg.basePx, steps: spacingCfg.steps }) + ";\n");

const semCount = groups.reduce((n, g) => n + g.tokens.length, 0);
const typeCount = type.headings.length + type.paragraphs.length;
console.log(`✓ src/index.css   ${scales.length} scales + ${singles.length} tones, ${semCount} semantic tokens, ${typeCount} type levels`);
console.log(`✓ public/data.js  ${groups.length} groups`);
console.log(`✓ public/type.js  ${type.headings.length} headings + ${type.paragraphs.length} paragraph sizes × ${type.weights.length} weights`);
console.log(`✓ icon tokens     sizes ${iconsCfg.sizes.map((s) => s.size).join("/")} (stroke ${iconsCfg.sizes[0].stroke}→${iconsCfg.sizes[iconsCfg.sizes.length - 1].stroke})`);
console.log(`✓ public/shadow.js ${shadowsCfg.shadows.length} shadows (${shadowsCfg.shadows.filter((s) => !s.inset).length} outer + ${shadowsCfg.shadows.filter((s) => s.inset).length} inset)`);
console.log(`✓ public/spacing.js ${spacingCfg.steps.length} steps (base ${spacingCfg.base} = ${spacingCfg.basePx}px)`);
