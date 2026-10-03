import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Page, Section, Swatch, Grid } from "./tokens-ui";
import colors from "../tokens/primitives/color.json";
import textRoles from "../tokens/semantic/text.json";
import bgRoles from "../tokens/semantic/background.json";
import borderRoles from "../tokens/semantic/border.json";
import actionRoles from "../tokens/semantic/action.json";

// color.json is the Figma-style export: colors[ramp][step].$value.hex
const ramps = Object.keys(colors as any).filter((k) => !k.startsWith("$"));
const stepsOf = (ramp: string) => {
  const r = (colors as any)[ramp];
  if (r && r.$value) return null; // single colour (black/white/transparent)
  return Object.keys(r);
};
const hex = (ramp: string, step?: string) => {
  const node = step ? (colors as any)[ramp][step] : (colors as any)[ramp];
  return node?.$value?.hex ?? node?.$value?.hex ?? "";
};

const Primitives = () => (
  <>
    {ramps.map((ramp) => {
      const steps = stepsOf(ramp);
      if (!steps) return null;
      return (
        <div key={ramp} style={{ marginBottom: 22 }}>
          <div style={{ font: "600 13px var(--sans)", textTransform: "capitalize", marginBottom: 10 }}>{ramp}</div>
          <Grid min={78}>
            {steps.map((s) => (
              <Swatch key={s} value={`var(--${ramp}-${s})`} name={`${ramp}-${s}`} sub={hex(ramp, s)} />
            ))}
          </Grid>
        </div>
      );
    })}
  </>
);

const roleGroup = (group: string, roles: { name: string }[]) => (
  <Grid min={120} key={group}>
    {roles.map((r) => (
      <Swatch key={r.name} value={`var(--${group}-${r.name})`} name={`${group}.${r.name}`} />
    ))}
  </Grid>
);

const meta: Meta = {
  title: "Tokens/Colors",
  parameters: { layout: "fullscreen", options: { showPanel: false } },
};
export default meta;
type Story = StoryObj;

export const Colors: Story = {
  render: () => (
    <div style={{ padding: 32 }}>
      <Page
        title="Colors"
        intro="Two tiers: primitive ramps (the raw palette) and semantic roles that reference them. Components consume only semantic roles. Swatches reflect the current theme."
      >
        <Section title="Semantic — text">{roleGroup("text", (textRoles as any).text)}</Section>
        <Section title="Semantic — background">{roleGroup("background", (bgRoles as any).background)}</Section>
        <Section title="Semantic — border">{roleGroup("border", (borderRoles as any).border)}</Section>
        <Section title="Semantic — action">{roleGroup("action", (actionRoles as any).action)}</Section>
        <Section title="Primitives" desc="The raw ramps semantic roles are built from.">
          <Primitives />
        </Section>
      </Page>
    </div>
  ),
};
