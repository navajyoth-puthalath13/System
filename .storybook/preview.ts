import type { Preview } from "@storybook/react-vite";
import React from "react";

// The existing design-system stylesheet: Tailwind v4 + all primitive and
// semantic tokens (light + dark). This is the single source of truth — no
// Storybook-specific colors, spacing, or typography are defined anywhere.
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    // Accessibility panel inspects the rendered component; left as "todo" so it
    // reports issues without failing a test run.
    a11y: { test: "todo" },
    // We theme with the design-system tokens (decorator below), not Storybook's
    // own backgrounds, so they stay out of the way.
    backgrounds: { disable: true },
    layout: "centered",
  },

  // Reuse the existing light/dark behavior: the `.dark` class flips the token
  // values (see src/index.css), and components read `dark:` variants from it.
  globalTypes: {
    theme: {
      description: "Design-system theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const dark = context.globals.theme === "dark";
      return React.createElement(
        "div",
        {
          className: dark ? "dark" : undefined,
          style: {
            background: "var(--background-default)",
            color: "var(--text-primary)",
            // enough room to show the raised shadow + focus ring (4px offset)
            padding: "48px",
            borderRadius: "12px",
          },
        },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;
