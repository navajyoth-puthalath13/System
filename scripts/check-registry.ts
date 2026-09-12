/**
 * check-registry.ts — verify every registry source has valid metadata BEFORE
 * generating. Fails (exit 1) if a component/hook is missing a JSDoc @name,
 * @description or a valid @type.
 *
 * Run: npm run registry:check
 */
import fg from "fast-glob";
import { readFileSync } from "node:fs";
import { basename, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseJsdoc } from "./generate-registry.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const VALID_TYPES = new Set(["registry:ui", "registry:hook", "registry:lib", "registry:block", "registry:theme"]);

const errors: string[] = [];

function check(file: string, expected: string) {
  const meta = parseJsdoc(readFileSync(file, "utf8"));
  const rel = file.slice(ROOT.length + 1);
  if (!meta.name) errors.push(`${rel}: missing @name`);
  if (!meta.description) errors.push(`${rel}: missing @description`);
  if (meta.type && !VALID_TYPES.has(meta.type)) errors.push(`${rel}: invalid @type "${meta.type}"`);
  if (!meta.type) errors.push(`${rel}: missing @type (expected ${expected})`);
}

const ui = fg.sync("src/components/ui/*.tsx", { cwd: ROOT, absolute: true });
const hooks = fg.sync("src/hooks/*.ts", { cwd: ROOT, absolute: true });
for (const f of ui) check(f, "registry:ui");
for (const f of hooks) check(f, "registry:hook");

const total = ui.length + hooks.length;
if (errors.length) {
  console.error(`✗ registry check failed (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ registry check — ${total} source(s) have valid metadata${total === 0 ? " (none yet)" : ""}`);
