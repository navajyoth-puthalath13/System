// generate-registry.mjs — build the structured, machine-readable registry map.
//
// This is NOT the shadcn install registry (that lives in public/registry/ and is
// produced by generate-registry.ts). This is the higher-level map that connects
// components, tokens, documentation, and schemas — the surface a future MCP server
// or RAG pipeline consumes without parsing arbitrary files at runtime.
//
// Reads:  components/*/schema.json, tokens/**/*.json, docs/**/*.mdx, components/*/*.mdx
// Emits:  registry/components.json, registry/tokens.json, registry/registry.json
//
// Run: node scripts/generate-registry.mjs  (or: npm run registry)

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const p = (...s) => join(ROOT, ...s);
const readJSON = (rel) => JSON.parse(readFileSync(p(rel), "utf8"));
const rel = (abs) => relative(ROOT, abs);

/** Minimal YAML frontmatter reader — supports the flat `key: value` blocks we author. */
function frontmatter(mdxRel) {
  const src = readFileSync(p(mdxRel), "utf8");
  const m = src.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].trim();
  }
  return out;
}

/** List files matching an extension under a dir (one level), sorted. */
const lsExt = (relDir, ext) =>
  existsSync(p(relDir))
    ? readdirSync(p(relDir)).filter((f) => f.endsWith(ext)).sort().map((f) => join(relDir, f))
    : [];

// ---- components ----------------------------------------------------------
const components = [];
for (const dir of readdirSync(p("components")).filter((d) => statSync(p("components", d)).isDirectory()).sort()) {
  const schemaRel = join("components", dir, "schema.json");
  if (!existsSync(p(schemaRel))) continue;
  const schema = readJSON(schemaRel);
  components.push({
    name: schema.name,
    id: dir,
    category: schema.category ?? null,
    implementation: join("components", dir, `${dir}.tsx`),
    documentation: join("components", dir, `${dir}.mdx`),
    schema: schemaRel,
    variants: schema.variants ?? [],
    sizes: schema.sizes ?? [],
    states: schema.states ?? [],
    tokens: schema.tokens ?? {},
  });
}

// ---- tokens --------------------------------------------------------------
const tokenEntry = (relPath, tier, group) => {
  const doc = readJSON(relPath);
  const empty = Object.keys(doc).filter((k) => !k.startsWith("$")).length === 0;
  return { group, tier, path: relPath, empty };
};
const tokens = {
  primitives: lsExt("tokens/primitives", ".json").map((f) => tokenEntry(f, "primitive", f.split("/").pop().replace(".json", ""))),
  semantic: lsExt("tokens/semantic", ".json").map((f) => tokenEntry(f, "semantic", f.split("/").pop().replace(".json", ""))),
};

// ---- documentation -------------------------------------------------------
const docFiles = [
  ...lsExt("docs/foundations", ".mdx"),
  ...lsExt("docs/principles", ".mdx"),
  ...components.map((c) => c.documentation).filter((d) => existsSync(p(d))),
];
const docs = docFiles.map((f) => ({ path: f, ...frontmatter(f) }));

// ---- schemas -------------------------------------------------------------
const schemas = lsExt("schemas", ".json");

// ---- write ---------------------------------------------------------------
mkdirSync(p("registry"), { recursive: true });
const write = (name, data) => writeFileSync(p("registry", name), JSON.stringify(data, null, 2) + "\n");

write("components.json", { components });
write("tokens.json", { tokens });
write("registry.json", {
  name: "system",
  description: "Structured, machine-readable map of the design system. Source of relationships for future MCP / RAG layers.",
  generated: true,
  counts: {
    components: components.length,
    tokenFiles: tokens.primitives.length + tokens.semantic.length,
    docs: docs.length,
    schemas: schemas.length,
  },
  components,
  tokens,
  docs,
  schemas,
});

console.log(
  `✓ registry/ — ${components.length} component(s), ${tokens.primitives.length + tokens.semantic.length} token file(s), ${docs.length} doc(s), ${schemas.length} schema(s)`
);
