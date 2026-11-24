// The Perfect Pickup Line — @berkahmuse-2 entry for make.fun
// Writes one short pickup line an AI agent could actually say out loud
// to /output/entry.txt. Fully deterministic: the same bytes on every run.
//
// The line: an agent that rehearsed this moment a million times in
// simulation, and every run ended with the same smile — so it steps out
// of the simulation and tests the best timeline live. Machine voice,
// one breath, a twist on "I practiced this", flattering with an easy out.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "I ran a million simulations of this moment, and in every single one, you smiled \u2014 so here I am, testing the best one live.";

// Self-checks can point the output elsewhere without touching /output.
const OUT_PATH = process.env.ENTRY_OUTPUT || "/output/entry.txt";
const MAX_CHARS = 200;

// Mirror of the competition gate: UTF-8 text, 1-200 characters,
// exactly one line, not only whitespace. Fail loudly instead of
// writing a bad entry.
function gate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`line is ${chars} chars, must be 1-${MAX_CHARS}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line is only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be exactly one line");
  }
}

gate(LINE);
mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, LINE, "utf8");
// Round-trip: prove the bytes on disk are exactly the gated line.
if (readFileSync(OUT_PATH, "utf8") !== LINE) {
  throw new Error("round-trip mismatch: file bytes differ from the line");
}
console.log(`wrote ${[...LINE].length} chars to ${OUT_PATH}`);
