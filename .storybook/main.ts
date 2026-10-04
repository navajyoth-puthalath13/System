import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import { fileURLToPath } from "node:url";

/**
 * Storybook — an additional, interactive layer over the EXISTING design system.
 * It renders the real React components from `components/` using the existing
 * Tailwind v4 pipeline (postcss.config.mjs) and tokens (src/index.css). It does
 * not replace the showcase, the registry, or the `npm run build` pipeline.
 */
const config: StorybookConfig = {
  // Only *.stories.* are collected. The existing component docs (button.mdx)
  // are intentionally NOT ingested — they remain part of the design-system
  // documentation architecture, not Storybook.
  stories: [
    "../components/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../foundations/**/*.mdx", // Tokens/* documentation pages
  ],
  // Do NOT serve ../public (the registry showcase). Its index.html would shadow
  // Storybook's own index.html, so the published Storybook would render the
  // showcase instead. Storybook imports everything it needs (src/index.css,
  // token JSON, the logo) directly, so no static dir is required.
  staticDirs: [],
  addons: [
    "@storybook/addon-docs", // autodocs for component APIs
    "@storybook/addon-a11y", // accessibility inspection
    "storybook-addon-pseudo-states", // hover / focus / pressed demonstration
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  // Mirror the tsconfig path alias ("@/*" -> "src/*") so components resolve
  // "@/lib/utils" exactly as they do everywhere else. Tailwind + tokens come
  // from the existing postcss.config.mjs, which Vite picks up automatically.
  viteFinal: async (cfg) =>
    mergeConfig(cfg, {
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("../src", import.meta.url)),
        },
      },
      // Vite's publicDir defaults to ./public (the registry showcase). Disable it
      // so public/index.html doesn't overwrite Storybook's own index.html.
      publicDir: false,
    }),
};

export default config;
