import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Page, Section } from "./tokens-ui";
import borderRoles from "../tokens/semantic/border.json";

const roles = (borderRoles as any).border as { name: string; purpose: string }[];
const neutral = roles.filter((r) => !/(warning|negative|positive)/.test(r.name));
const status = roles.filter((r) => /(warning|negative|positive)/.test(r.name));

const Chip = ({ name, purpose }: { name: string; purpose: string }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <div
      style={{
        height: 64,
        borderRadius: 10,
        background: "var(--background-default)",
        border: `2px solid var(--border-${name})`,
      }}
    />
    <div>
      <div style={{ fontSize: 13, fontWeight: 600 }}>border.{name}</div>
      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{purpose}</div>
    </div>
  </div>
);

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 22 }}>{children}</div>
);

const meta: Meta = {
  title: "Tokens/Border",
  parameters: { layout: "fullscreen", options: { showPanel: false } },
};
export default meta;
type Story = StoryObj;

export const Border: Story = {
  render: () => (
    <div style={{ padding: 32 }}>
      <Page title="Border" intro="Semantic border roles — neutral boundaries plus status tints. Shown as applied strokes; values react to the theme.">
        <Section title="Neutral">
          <Grid>
            {neutral.map((r) => (
              <Chip key={r.name} name={r.name} purpose={r.purpose} />
            ))}
          </Grid>
        </Section>
        <Section title="Status">
          <Grid>
            {status.map((r) => (
              <Chip key={r.name} name={r.name} purpose={r.purpose} />
            ))}
          </Grid>
        </Section>
      </Page>
    </div>
  ),
};
