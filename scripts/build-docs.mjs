// build-docs.mjs — build a predictable documentation manifest.
//
// Scans every .mdx doc, extracts its frontmatter and its section outline (## / ###
// headings), and writes a flat manifest. This is the deterministic structure a future
// RAG pipeline chunks and embeds — it does not render or transform the prose.
//
// Reads:  docs/**/*.mdx, components/*/*.mdx
// Emits:  dist/docs-manifest.json
//
// Run: node scripts/build-docs.mjs  (or: npm run docs)

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const p = (...s) => join(ROOT, ...s);

function walk(relDir, out = []) {
  if (!existsSync(p(relDir))) return out;
  for (const e of readdirSync(p(relDir))) {
    const rp = join(relDir, e);
    if (statSync(p(rp)).isDirectory()) walk(rp, out);
    else if (e.endsWith(".mdx")) out.push(rp);
  }
  return out;
}

function parse(mdxRel) {
  const src = readFileSync(p(mdxRel), "utf8");
  const fm = {};
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  let body = src;
  if (m) {
    for (const line of m[1].split("\n")) {
      const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
      if (kv) fm[kv[1]] = kv[2].trim();
    }
    body = src.slice(m[0].length);
  }
  const sections = [...body.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((h) => ({
    level: h[1].length,
    heading: h[2].replace(/`/g, "").trim(),
  }));
  return { path: mdxRel, ...fm, sections };
}

const files = [...walk("docs"), ...walk("components")].sort();
const manifest = {
  generated: true,
  description: "Documentation manifest — frontmatter + section outline per .mdx, for future RAG chunking.",
  count: files.length,
  docs: files.map(parse),
};

mkdirSync(p("dist"), { recursive: true });
writeFileSync(p("dist/docs-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`✓ dist/docs-manifest.json — ${files.length} doc(s), ${manifest.docs.reduce((n, d) => n + d.sections.length, 0)} section(s)`);
