import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";
import brandImage from "./assets/logo.png";

// Brand the Storybook sidebar with the design-system logo (shown top-left, like
// Blade). Optimized copy of Storybook.png; the original stays in the repo root.
addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "System — design system",
    brandImage,
    brandUrl: "https://system-three-rouge.vercel.app",
    brandTarget: "_self",
  }),
});
