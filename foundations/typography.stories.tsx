import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Page, Section } from "./tokens-ui";
import type from "../tokens/primitives/typography.json";

const t = type as any;
const weightVal: Record<string, number> = Object.fromEntries(
  t.weights.map((w: any) => [w.key, w.value])
);

const Specimen = ({ label, size, line, weight, sample }: { label: string; size: number; line: number; weight: number; sample: string }) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: 24, padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
    <div style={{ width: 150, flex: "none", fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--mono, monospace)" }}>
      {label}
      <br />
      {size}/{line} · {weight}
    </div>
    <div style={{ fontFamily: t.fontFamily, fontSize: size, lineHeight: `${line}px`, fontWeight: weight, color: "var(--text-primary)", overflow: "hidden" }}>
      {sample}
    </div>
  </div>
);

const meta: Meta = {
  title: "Tokens/Typography",
  parameters: { layout: "fullscreen", options: { showPanel: false } },
};
export default meta;
type Story = StoryObj;

export const Typography: Story = {
  render: () => (
    <div style={{ padding: 32 }}>
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
    </div>
  ),
};
