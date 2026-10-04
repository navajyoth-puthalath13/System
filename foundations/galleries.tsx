/**
 * Token gallery components, rendered from the token JSON (source of truth) with
 * the live CSS variables from src/index.css. Imported by the Tokens/*.mdx
 * documentation pages. Not stories — these produce doc content, not canvases.
 */
import * as React from "react";
import { Page, Section, Swatch, Grid } from "./tokens-ui";
import colors from "../tokens/primitives/color.json";
import textRoles from "../tokens/semantic/text.json";
import bgRoles from "../tokens/semantic/background.json";
import borderRoles from "../tokens/semantic/border.json";
import actionRoles from "../tokens/semantic/action.json";
import typeTokens from "../tokens/primitives/typography.json";
import spacingTokens from "../tokens/primitives/spacing.json";
import shadowTokens from "../tokens/primitives/shadow.json";

/* ------------------------------------------------------------------ Colors */

const ramps = Object.keys(colors as any).filter((k) => !k.startsWith("$"));
const rampSteps = (ramp: string) => {
  const r = (colors as any)[ramp];
  return r && r.$value ? null : Object.keys(r);
};
const rampHex = (ramp: string, step: string) => (colors as any)[ramp][step]?.$value?.hex ?? "";
const roleGroup = (group: string, roles: { name: string }[]) => (
  <Grid min={120}>
    {roles.map((r) => (
      <Swatch key={r.name} value={`var(--${group}-${r.name})`} name={`${group}.${r.name}`} />
    ))}
  </Grid>
);

export const ColorsGallery = () => (
  <Page
    title="Colors"
    intro="Two tiers: primitive ramps (the raw palette) and semantic roles that reference them. Components consume only semantic roles. Swatches reflect the current theme."
  >
    <Section title="Semantic — text">{roleGroup("text", (textRoles as any).text)}</Section>
    <Section title="Semantic — background">{roleGroup("background", (bgRoles as any).background)}</Section>
    <Section title="Semantic — border">{roleGroup("border", (borderRoles as any).border)}</Section>
    <Section title="Semantic — action">{roleGroup("action", (actionRoles as any).action)}</Section>
    <Section title="Primitives" desc="The raw ramps semantic roles are built from.">
      {ramps.map((ramp) => {
        const steps = rampSteps(ramp);
        if (!steps) return null;
        return (
          <div key={ramp} style={{ marginBottom: 22 }}>
            <div style={{ font: "600 13px var(--sans)", textTransform: "capitalize", marginBottom: 10 }}>{ramp}</div>
            <Grid min={78}>
              {steps.map((s) => (
                <Swatch key={s} value={`var(--${ramp}-${s})`} name={`${ramp}-${s}`} sub={rampHex(ramp, s)} />
              ))}
            </Grid>
          </div>
        );
      })}
    </Section>
  </Page>
);

/* -------------------------------------------------------------- Typography */

const t = typeTokens as any;
const weightVal: Record<string, number> = Object.fromEntries(t.weights.map((w: any) => [w.key, w.value]));
const Specimen = ({ label, size, line, weight, sample }: { label: string; size: number; line: number; weight: number; sample: string }) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: 24, padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
    <div style={{ width: 150, flex: "none", fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--mono, monospace)" }}>
      {label}<br />{size}/{line} · {weight}
    </div>
    <div style={{ fontFamily: t.fontFamily, fontSize: size, lineHeight: `${line}px`, fontWeight: weight, color: "var(--text-primary)", overflow: "hidden" }}>{sample}</div>
  </div>
);

export const TypographyGallery = () => (
  <Page title="Typography" intro={`A single unified scale on ${t.fontFamilyName}. Sizes and line-heights come straight from the token export.`}>
    <Section title="Headings">
      {t.headings.map((h: any) => (
        <Specimen key={h.key} label={h.name} size={h.size} line={h.line} weight={weightVal[h.weight] ?? 700} sample={h.role} />
      ))}
    </Section>
    <Section title="Paragraphs">
      {t.paragraphs.map((p: any) => (
        <Specimen key={p.key} label={p.name} size={p.size} line={p.line} weight={weightVal.regular ?? 400} sample={p.role} />
      ))}
    </Section>
    <Section title="Weights">
      <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
        {t.weights.map((w: any) => (
          <div key={w.key} style={{ fontSize: 28, fontWeight: w.value, fontFamily: t.fontFamily }}>
            {w.name}
            <div style={{ fontSize: 11, fontWeight: 400, color: "var(--text-muted)", fontFamily: "var(--mono, monospace)" }}>{w.value}</div>
          </div>
        ))}
      </div>
    </Section>
  </Page>
);

/* ----------------------------------------------------------------- Spacing */

const sp = spacingTokens as any;
export const SpacingGallery = () => (
  <Page title="Spacing" intro={`A ${sp.basePx}px base (--spacing: ${sp.base}). Every p-*, m-*, gap-* utility is a multiple of it.`}>
    <Section title="Scale">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sp.steps.map((s: any) => (
          <div key={s.step} style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 48, flex: "none", fontSize: 13, fontWeight: 500 }}>{s.step}</div>
            <div style={{ width: 64, flex: "none", fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--mono, monospace)" }}>{s.px}px</div>
            <div style={{ height: 16, width: Math.max(s.px, 1), background: "var(--action-primary)", borderRadius: 3 }} />
            <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--mono, monospace)" }}>{s.classes}</div>
          </div>
        ))}
      </div>
    </Section>
  </Page>
);

/* --------------------------------------------------------------- Elevation */

const sh = shadowTokens as any;
export const ElevationGallery = () => (
  <Page title="Elevation" intro="Shadow ladder — five outer levels (xs→xl) plus one inset. A single near-black ink (gray-950) at controlled opacity.">
    <Section title="Shadows">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 28 }}>
        {sh.shadows.map((s: any) => (
          <div key={s.name} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ height: 88, borderRadius: 12, background: "var(--background-default)", border: "1px solid var(--border)", boxShadow: `var(--shadow-${s.name})` }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>shadow-{s.name}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{s.purpose}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  </Page>
);

/* ------------------------------------------------------------------ Border */

const bRoles = (borderRoles as any).border as { name: string; purpose: string }[];
const BorderChip = ({ name, purpose }: { name: string; purpose: string }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <div style={{ height: 64, borderRadius: 10, background: "var(--background-default)", border: `2px solid var(--border-${name})` }} />
    <div>
      <div style={{ fontSize: 13, fontWeight: 600 }}>border.{name}</div>
      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{purpose}</div>
    </div>
  </div>
);
const BorderGrid = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 22 }}>{children}</div>
);

export const BorderGallery = () => (
  <Page title="Border" intro="Semantic border roles — neutral boundaries plus status tints. Shown as applied strokes; values react to the theme.">
    <Section title="Neutral">
      <BorderGrid>
        {bRoles.filter((r) => !/(warning|negative|positive)/.test(r.name)).map((r) => (
          <BorderChip key={r.name} name={r.name} purpose={r.purpose} />
        ))}
      </BorderGrid>
    </Section>
    <Section title="Status">
      <BorderGrid>
        {bRoles.filter((r) => /(warning|negative|positive)/.test(r.name)).map((r) => (
          <BorderChip key={r.name} name={r.name} purpose={r.purpose} />
        ))}
      </BorderGrid>
    </Section>
  </Page>
);
