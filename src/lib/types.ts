import type { ComponentType } from "react";

/** A shadcn registry item type. Mirrors the registry-item schema. */
export type RegistryType =
  | "registry:ui"
  | "registry:block"
  | "registry:hook"
  | "registry:lib"
  | "registry:theme";

/** One code example / variant shown in the docs. */
export interface ComponentExample {
  /** Short title, e.g. "Default", "With icon", "Destructive". */
  title: string;
  /** One-line description of what this example demonstrates. */
  description?: string;
  /** The source snippet shown to the user. */
  code: string;
  /** Optional live preview element for the docs site. */
  preview?: ComponentType;
}

/** How a user installs the item. */
export interface Installation {
  /** shadcn CLI command, e.g. `npx shadcn add <url>/button.json`. */
  cli: string;
  /** Manual steps: files to copy + dependencies to install. */
  manual: {
    dependencies?: string[];
    files: { path: string; description?: string }[];
  };
}

/**
 * ComponentDoc — the documentation metadata for one registry item.
 * The docs site renders this; `scripts/generate-registry.ts` cross-checks it
 * against the JSDoc header in the component source.
 */
export interface ComponentDoc {
  /** Stable id / slug, matches the file name (e.g. "button"). */
  id: string;
  /** Display name (e.g. "Button"). */
  name: string;
  /** One-sentence description. */
  description: string;
  /** Registry classification. */
  type: RegistryType;
  installation: Installation;
  /** Minimal usage snippet. */
  usage: string;
  /** Optional default live preview. */
  preview?: ComponentType;
  /** Variants / examples shown in the docs. */
  examples?: ComponentExample[];
}
