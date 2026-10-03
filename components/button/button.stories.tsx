import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Button } from "./button";

/**
 * Stories for the EXISTING Button component. Every story renders the real
 * `components/button/button.tsx` — no state-specific or Storybook-specific
 * reimplementation. Interaction states that are CSS pseudo-classes (hover,
 * focus, pressed) are demonstrated with storybook-addon-pseudo-states.
 */
const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Performs an action. Four variants (primary, secondary, neutral, tertiary), three sizes, and an icon-only mode. Colour, typography, radius, elevation and focus ring all consume design-system tokens.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "neutral", "tertiary"],
      description: "Visual style and emphasis.",
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      description: "Control height / padding / type scale.",
      table: { defaultValue: { summary: "md" } },
    },
    iconOnly: {
      control: "boolean",
      description: "Square button sized for a single icon.",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: { control: "boolean", description: "Non-interactive state." },
    children: { control: "text", description: "Button label / content." },
    onClick: { action: "clicked" },
  },
  args: {
    variant: "primary",
    size: "md",
    iconOnly: false,
    disabled: false,
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Interactive — change any prop from the Controls panel. */
export const Playground: Story = {};

/* ----------------------------------------------------------------- Variants */

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Neutral: Story = { args: { variant: "neutral" } };
export const Tertiary: Story = { args: { variant: "tertiary" } };

/** All four variants side by side. */
export const Variants: Story = {
  parameters: { controls: { include: ["size", "disabled"] } },
  render: ({ children, ...args }) => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="neutral">Neutral</Button>
      <Button {...args} variant="tertiary">Tertiary</Button>
    </div>
  ),
};

/* -------------------------------------------------------------------- Sizes */

export const Sizes: Story = {
  parameters: { controls: { include: ["variant", "disabled"] } },
  render: ({ children, ...args }) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};

/* ------------------------------------------------------------------- States */
// hover / focus / pressed are pseudo-classes — forced here via `parameters.pseudo`.

export const Default: Story = {};
export const Hover: Story = { parameters: { pseudo: { hover: true } } };
export const Focus: Story = { parameters: { pseudo: { focusVisible: true } } };
export const Pressed: Story = { parameters: { pseudo: { active: true } } };
export const Disabled: Story = { args: { disabled: true } };

/** Every interaction state at a glance (states targeted by id via pseudo-states). */
export const States: Story = {
  parameters: {
    controls: { include: ["variant", "size"] },
    pseudo: {
      hover: ["#state-hover"],
      focusVisible: ["#state-focus"],
      active: ["#state-pressed"],
    },
  },
  render: ({ children, ...args }) => {
    const cell: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      font: "500 12px system-ui, sans-serif",
      color: "var(--text-muted)",
    };
    return (
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={cell}><Button {...args}>Default</Button><span>Default</span></div>
        <div style={cell}><Button id="state-hover" {...args}>Hover</Button><span>Hover</span></div>
        <div style={cell}><Button id="state-focus" {...args}>Focus</Button><span>Focus</span></div>
        <div style={cell}><Button id="state-pressed" {...args}>Pressed</Button><span>Pressed</span></div>
        <div style={cell}><Button {...args} disabled>Disabled</Button><span>Disabled</span></div>
      </div>
    );
  },
};

/* ----------------------------------------------------------------- Icon only */

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconOnly: Story = {
  args: { iconOnly: true, "aria-label": "Add" },
  parameters: { controls: { include: ["variant", "size", "disabled"] } },
  render: ({ children, ...args }) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Button {...args} size="sm" aria-label="Add"><PlusIcon /></Button>
      <Button {...args} size="md" aria-label="Add"><PlusIcon /></Button>
      <Button {...args} size="lg" aria-label="Add"><PlusIcon /></Button>
    </div>
  ),
};
