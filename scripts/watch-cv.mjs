import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { hash } from "./cv-core.mjs";
const args = process.argv.slice(2),
  source = args.find((x) => !x.startsWith("--"));
if (!source) throw Error('Usage: npm run cv:watch -- "path/to/CV.doc" [--ai]');
const run = (bin, a) => {
  const p = spawnSync(bin, a, { stdio: "inherit", shell: false });
  if (p.status !== 0)
    throw Error(`${bin} failed; previous website remains unchanged.`);
};
let previous = "";
console.log(
  "Watching the CV. Changes prepare a local review; nothing is published. Press Ctrl+C to stop.",
);
async function check() {
  try {
    const next = hash(await fs.readFile(source));
    if (next === previous) return;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (hash(await fs.readFile(source)) !== next) return;
    if (path.extname(source).toLowerCase() === ".doc")
      run("powershell.exe", [
        "-NoProfile",
        "-File",
        "scripts/extract-cv.ps1",
        "-Path",
        path.resolve(source),
      ]);
    else
      run(process.platform === "win32" ? "python" : "python3", [
        "scripts/extract-cv.py",
        source,
      ]);
    run(process.execPath, [
      "scripts/cv-update.mjs",
      args.includes("--ai") ? "propose" : "prepare",
    ]);
    previous = next;
    console.log("CV change prepared. Review before applying.");
  } catch (error) {
    console.error(error.message);
  }
}
await check();
setInterval(checkGuard, 5000);
let busy = false;
async function checkGuard() {
  if (busy) return;
  busy = true;
  try {
    await check();
  } finally {
    busy = false;
  }
}
