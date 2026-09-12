/**
 * validate-registry-dependencies.ts — ensure every npm dependency auto-detected
 * from a registry source is actually declared in package.json, and every
 * registryDependency resolves to a known item. Fails (exit 1) otherwise.
 *
 * Run: npm run registry:validate
 */
import fg from "fast-glob";
import { readFileSync } from "node:fs";
import { basename, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { detectDeps } from "./generate-registry.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const declared = new Set([
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.devDependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
]);

const idOf = (f: string) => basename(f).replace(/\.(tsx?|jsx?)$/, "");
const ui = fg.sync("src/components/ui/*.tsx", { cwd: ROOT, absolute: true });
const hooks = fg.sync("src/hooks/*.ts", { cwd: ROOT, absolute: true });
const knownItems = new Set<string>([...ui, ...hooks].map(idOf).concat("utils", "tokens"));

const errors: string[] = [];
for (const f of [...ui, ...hooks]) {
  const src = readFileSync(f, "utf8");
  const { npm, registry } = detectDeps(src);
  const rel = f.slice(ROOT.length + 1);
  for (const dep of npm) if (!declared.has(dep)) errors.push(`${rel}: npm dependency "${dep}" not in package.json`);
  for (const dep of registry) if (!knownItems.has(dep)) errors.push(`${rel}: registry dependency "${dep}" has no matching item`);
}

const total = ui.length + hooks.length;
if (errors.length) {
  console.error(`✗ dependency validation failed (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ dependency validation — ${total} source(s), all deps resolve${total === 0 ? " (none yet)" : ""}`);
