import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Page, Section } from "./tokens-ui";
import spacing from "../tokens/primitives/spacing.json";

const sp = spacing as any;

const meta: Meta = {
  title: "Tokens/Spacing",
  parameters: { layout: "fullscreen", options: { showPanel: false } },
};
export default meta;
type Story = StoryObj;

export const Spacing: Story = {
  render: () => (
    <div style={{ padding: 32 }}>
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
    </div>
  ),
};
