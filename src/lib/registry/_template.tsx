import type { ComponentDoc } from "@/lib/types";

/**
 * Docs template — copy this file to `<component-id>.tsx` in this folder when you
 * document a new component, then fill in every field. One template only; no
 * real docs live here yet.
 *
 * Registered lazily in `./index.ts`.
 */
const doc: ComponentDoc = {
  id: "component-id",
  name: "Component Name",
  description: "One sentence describing what this component is for.",
  type: "registry:ui",
  installation: {
    cli: "npx shadcn@latest add http://localhost:5178/registry/component-id.json",
    manual: {
      dependencies: [],
      files: [
        { path: "src/components/ui/component-id.tsx", description: "The component source." },
      ],
    },
  },
  usage: [
    'import { ComponentName } from "@/components/ui/component-id";',
    "",
    "export function Example() {",
    "  return <ComponentName />;",
    "}",
  ].join("\n"),
  // preview: ComponentNamePreview,
  examples: [
    {
      title: "Default",
      description: "The default appearance.",
      code: "<ComponentName />",
      // preview: ComponentNameDefault,
    },
  ],
};

export default doc;
