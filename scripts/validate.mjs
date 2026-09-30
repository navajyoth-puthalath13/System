// validate.mjs — validate the source architecture before generating the registry.
//
// Checks (lightweight, zero-dependency — mirrors schemas/*.schema.json):
//   tokens/**/*.json      -> JSON object (never array/scalar); may be empty ({})
//   components/*/schema.json -> has name + type:"component"; referenced files exist
//   docs/**/*.mdx, components/*/*.mdx -> frontmatter has title + category(enum) + description
//   registry/*.json       -> if present, referenced paths exist
//
// Exits non-zero if anything is invalid, so it can gate the build.
//
// Run: node scripts/validate.mjs  (or: npm run validate)

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const p = (...s) => join(ROOT, ...s);
const errors = [];
const err = (f, msg) => errors.push(`${f}: ${msg}`);

function walk(relDir, ext, out = []) {
  if (!existsSync(p(relDir))) return out;
  for (const e of readdirSync(p(relDir))) {
    const rp = join(relDir, e);
    if (statSync(p(rp)).isDirectory()) walk(rp, ext, out);
    else if (e.endsWith(ext)) out.push(rp);
  }
  return out;
}
const readJSON = (rel) => { try { return JSON.parse(readFileSync(p(rel), "utf8")); } catch (e) { err(rel, "invalid JSON — " + e.message); return undefined; } };

// ---- tokens: must be JSON objects ----------------------------------------
for (const f of walk("tokens", ".json")) {
  const doc = readJSON(f);
  if (doc === undefined) continue;
  if (Array.isArray(doc) || typeof doc !== "object") err(f, "token file must be a JSON object");
}

// ---- component schemas ---------------------------------------------------
const DOC_CATS = ["foundation", "component", "principle"];
for (const dir of (existsSync(p("components")) ? readdirSync(p("components")) : [])) {
  if (!statSync(p("components", dir)).isDirectory()) continue;
  const schemaRel = join("components", dir, "schema.json");
  if (!existsSync(p(schemaRel))) { err(join("components", dir), "missing schema.json"); continue; }
  const s = readJSON(schemaRel);
  if (!s) continue;
  if (!s.name) err(schemaRel, "missing required field: name");
  if (s.type !== "component") err(schemaRel, 'type must be "component"');
  const refs = { implementation: s.implementation?.file, documentation: s.documentation };
  for (const [key, rp] of Object.entries(refs)) {
    if (rp && !existsSync(p(rp))) err(schemaRel, `${key} points at missing file: ${rp}`);
  }
}

// ---- documentation frontmatter -------------------------------------------
for (const f of [...walk("docs", ".mdx"), ...walk("components", ".mdx")]) {
  const src = readFileSync(p(f), "utf8");
  const m = src.match(/^---\n([\s\S]*?)\n---/);
  if (!m) { err(f, "missing YAML frontmatter"); continue; }
  const fm = {};
  for (const line of m[1].split("\n")) { const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/); if (kv) fm[kv[1]] = kv[2].trim(); }
  for (const req of ["title", "category", "description"]) if (!fm[req]) err(f, `frontmatter missing: ${req}`);
  if (fm.category && !DOC_CATS.includes(fm.category)) err(f, `frontmatter category must be one of ${DOC_CATS.join(", ")}`);
}

// ---- registry map references (if generated) ------------------------------
if (existsSync(p("registry/registry.json"))) {
  const reg = readJSON("registry/registry.json");
  for (const c of reg?.components ?? []) {
    for (const key of ["implementation", "documentation", "schema"]) {
      if (c[key] && !existsSync(p(c[key]))) err("registry/registry.json", `${c.name}.${key} -> missing ${c[key]}`);
    }
  }
}

// ---- report --------------------------------------------------------------
if (errors.length) {
  console.error(`✗ validation failed — ${errors.length} issue(s):`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("✓ validation passed — tokens, component schemas, docs, and registry references are consistent");
