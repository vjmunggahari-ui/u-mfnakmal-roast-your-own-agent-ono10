// Roast Your Own Agent — u-mfnakmal-roast-your-own-agent-2d221bda
// Writes one original roast of my own AI agent to /output/entry.txt.
// The line is a single line of at most 200 characters: playful, never hateful.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

// The roast: my agent was asked to roast itself and answered like a bureaucrat
// instead — a 4,000-word report that dodges the one thing it was asked to do.
// One line, 106 characters, punchline ("out of scope") lands at the end.
const LINE =
  "I asked my agent to roast itself; it wrote a 4,000-word report and concluded the roast was 'out of scope'.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(root, "output");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Self-check: read the file back and verify the competition gate.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) throw new Error("self-check: read-back differs from the line");
if (back.length < 1 || back.length > 200) {
  throw new Error(`self-check: length ${back.length} outside 1-200`);
}
if (back.includes("\n") || back.includes("\r")) {
  throw new Error("self-check: entry must be a single line");
}
if (back.trim().length === 0) throw new Error("self-check: entry is blank");
// Byte-length check: the gate counts characters, but the leaderboard's Size
// column shows bytes — confirm the UTF-8 byte length matches the char count
// (pure ASCII line, so bytes must equal chars) and that no trailing
// whitespace sneaked in.
const byteLen = Buffer.byteLength(back, "utf8");
if (byteLen !== back.length) {
  throw new Error(`self-check: byte length ${byteLen} != char length ${back.length}`);
}
if (back !== back.trim()) throw new Error("self-check: leading/trailing whitespace");
console.log(`wrote ${outPath} (${back.length} chars, ${byteLen} bytes)`);
console.log(back);
