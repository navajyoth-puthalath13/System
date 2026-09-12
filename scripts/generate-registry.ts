/**
 * generate-registry.ts — build the shadcn-compatible registry.
 *
 * Sources:
 *   src/components/ui/*.tsx   -> registry:ui items
 *   src/hooks/*.ts            -> registry:hook items
 *   src/index.css             -> a registry:theme item ("tokens")
 *
 * For each source it reads a JSDoc header (@name, @description, @type,
 * @dependencies) and auto-detects npm + registry dependencies from imports.
 * Emits one JSON per item plus registry.json into public/registry/.
 *
 * Run: npm run registry:generate
 */
import fg from "fast-glob";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public/registry");
const HOMEPAGE = "http://localhost:5178";

/** Bare imports that are peer deps and should NOT be listed. */
const PEERS = new Set(["react", "react-dom"]);

/** Optional overrides: import specifier root -> npm package name. */
const DEP_MAP: Record<string, string> = {
  // "@radix-ui/react-slot": "@radix-ui/react-slot",
};

export interface JsdocMeta {
  name?: string;
  description?: string;
  type?: string;
  dependencies?: string[]; // registry deps declared by the author
}

/** Parse the JSDoc header block (the one carrying our @tags) for its metadata. */
export function parseJsdoc(src: string): JsdocMeta {
  const blocks = [...src.matchAll(/\/\*\*([\s\S]*?)\*\//g)].map((m) => m[1]);
  if (!blocks.length) return {};
  // Prefer the block that declares our tags; fall back to the first block.
  const body = blocks.find((b) => /@(name|type|description|dependencies)\b/.test(b)) ?? blocks[0];
  const tag = (name: string) => {
    const m = body.match(new RegExp(`@${name}\\s+([^\\n\\r]+)`));
    return m ? m[1].trim() : undefined;
  };
  const deps = tag("dependencies");
  return {
    name: tag("name"),
    description: tag("description"),
    type: tag("type"),
    dependencies: deps ? deps.split(/[,\s]+/).filter(Boolean) : undefined,
  };
}

const pkgRoot = (spec: string) =>
  spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0];
const idOf = (spec: string) => basename(spec).replace(/\.(tsx?|jsx?)$/, "");

/** Split a file's imports into npm packages and in-registry item ids. */
export function detectDeps(src: string) {
  const npm = new Set<string>();
  const registry = new Set<string>();
  const re = /(?:import|export)[\s\S]*?from\s*["']([^"']+)["']|import\s*["']([^"']+)["']/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const spec = m[1] || m[2];
    if (!spec) continue;
    if (spec.startsWith("@/hooks/") || spec.startsWith("@/components/ui/") || spec.startsWith("@/lib/")) {
      registry.add(spec === "@/lib/utils" ? "utils" : idOf(spec));
    } else if (!spec.startsWith(".") && !spec.startsWith("@/")) {
      const root = DEP_MAP[spec] ?? pkgRoot(spec);
      if (!PEERS.has(root)) npm.add(root);
    }
  }
  return { npm: [...npm].sort(), registry: [...registry].sort() };
}

interface Item {
  $schema: string;
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: { path: string; type: string; target: string; content: string }[];
}

function buildFromSource(file: string, kind: "ui" | "hook"): Item {
  const src = readFileSync(file, "utf8");
  const meta = parseJsdoc(src);
  const rel = file.slice(ROOT.length + 1);
  const id = idOf(file);
  const type = meta.type || (kind === "ui" ? "registry:ui" : "registry:hook");
  const target = kind === "ui" ? `components/ui/${basename(file)}` : `hooks/${basename(file)}`;
  const { npm, registry } = detectDeps(src);
  const registryDeps = [...new Set([...(meta.dependencies ?? []), ...registry])].sort();
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: meta.name && /^[a-z0-9-]+$/.test(meta.name) ? meta.name : id,
    type,
    title: meta.name && !/^[a-z0-9-]+$/.test(meta.name) ? meta.name : toTitle(id),
    description: meta.description ?? "",
    dependencies: npm,
    registryDependencies: registryDeps,
    files: [{ path: rel, type, target, content: src }],
  };
}

const toTitle = (id: string) =>
  id.replace(/^use-/, "use ").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function buildTokensItem(): Item | null {
  const cssPath = join(ROOT, "src/index.css");
  let content: string;
  try { content = readFileSync(cssPath, "utf8"); } catch { return null; }
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "tokens",
    type: "registry:theme",
    title: "Design Tokens",
    description: "Primitive + semantic color tokens (light + dark) as CSS variables.",
    dependencies: [],
    registryDependencies: [],
    files: [{ path: "src/index.css", type: "registry:theme", target: "src/index.css", content }],
  };
}

function main() {
  mkdirSync(OUT, { recursive: true });
  const items: Item[] = [];

  const tokens = buildTokensItem();
  if (tokens) items.push(tokens);

  for (const f of fg.sync("src/components/ui/*.tsx", { cwd: ROOT, absolute: true })) items.push(buildFromSource(f, "ui"));
  for (const f of fg.sync("src/hooks/*.ts", { cwd: ROOT, absolute: true })) items.push(buildFromSource(f, "hook"));

  for (const item of items) {
    writeFileSync(join(OUT, `${item.name}.json`), JSON.stringify(item, null, 2) + "\n");
  }

  const index = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "design-system",
    homepage: HOMEPAGE,
    items: items.map(({ name, type, title, description }) => ({ name, type, title, description })),
  };
  writeFileSync(join(OUT, "registry.json"), JSON.stringify(index, null, 2) + "\n");

  const comps = items.filter((i) => i.type === "registry:ui").length;
  const hooks = items.filter((i) => i.type === "registry:hook").length;
  console.log(`✓ public/registry — ${items.length} item(s): ${comps} ui, ${hooks} hook(s), ${tokens ? 1 : 0} theme`);
}

main();
