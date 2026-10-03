import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Page, Section } from "./tokens-ui";
import shadow from "../tokens/primitives/shadow.json";

const sh = shadow as any;

const meta: Meta = {
  title: "Tokens/Elevation",
  parameters: { layout: "fullscreen", options: { showPanel: false } },
};
export default meta;
type Story = StoryObj;

export const Elevation: Story = {
  render: () => (
    <div style={{ padding: 32 }}>
      <Page title="Elevation" intro="Shadow ladder — five outer levels (xs→xl) plus one inset. A single near-black ink (gray-950) at controlled opacity.">
        <Section title="Shadows">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 28 }}>
            {sh.shadows.map((s: any) => (
              <div key={s.name} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div
                  style={{
                    height: 88,
                    borderRadius: 12,
                    background: "var(--background-default)",
                    border: "1px solid var(--border)",
                    boxShadow: `var(--shadow-${s.name})`,
                  }}
                />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>shadow-{s.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{s.purpose}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </Page>
    </div>
  ),
};
