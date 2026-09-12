import type { ComponentDoc } from "@/lib/types";

/**
 * Lazy loader for component docs. Each documented component lives in a sibling
 * file (`<id>.tsx`) that default-exports a ComponentDoc. They are loaded on
 * demand so the docs site only pulls the doc it's rendering.
 *
 * `_template.tsx` is intentionally excluded — it's the scaffold, not a real doc.
 *
 * Register new docs by adding an entry to `loaders` below.
 */
type DocLoader = () => Promise<{ default: ComponentDoc }>;

const loaders: Record<string, DocLoader> = {
  // "button": () => import("./button"),
  // "input": () => import("./input"),
};

/** Ids of all documented components. */
export function listDocIds(): string[] {
  return Object.keys(loaders);
}

/** Load one component's doc, or null if it isn't documented. */
export async function loadDoc(id: string): Promise<ComponentDoc | null> {
  const loader = loaders[id];
  if (!loader) return null;
  return (await loader()).default;
}
