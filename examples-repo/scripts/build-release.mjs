// Fabrique dist/<id>.zip pour chaque exemple du catalogue et copie catalog.json.
// Usage : node scripts/build-release.mjs
import { readFileSync, existsSync, mkdirSync, rmSync, copyFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const catalog = JSON.parse(readFileSync(join(root, "catalog.json"), "utf8"));
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

let errors = 0;
for (const ex of catalog.examples) {
  const dir = join(root, "examples", ex.id);
  if (!/^[a-z0-9-]+$/.test(ex.id)) { console.error(`✗ identifiant invalide : ${ex.id}`); errors++; continue; }
  if (!existsSync(dir) || readdirSync(dir).length === 0) { console.error(`✗ dossier manquant ou vide : examples/${ex.id}`); errors++; continue; }
  const out = join(dist, ex.asset || `${ex.id}.zip`);
  const r = process.platform === "win32"
    ? spawnSync("powershell", ["-NoProfile", "-Command", `Compress-Archive -Path '${dir}\\*' -DestinationPath '${out}'`], { stdio: "inherit" })
    : spawnSync("zip", ["-qr", out, "."], { cwd: dir, stdio: "inherit" });
  if (r.status !== 0) { console.error(`✗ échec de l'archive pour ${ex.id}`); errors++; } else console.log(`✔ ${ex.id}.zip`);
}
copyFileSync(join(root, "catalog.json"), join(dist, "catalog.json"));
if (errors) { console.error(`${errors} erreur(s).`); process.exit(1); }
console.log(`\n${catalog.examples.length} exemple(s) prêts dans dist/`);
