import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const contract = read("contracts/PromptCover.py");
const experience = read("src/components/vault-experience.tsx");
const landing = read("src/components/promptcover-landing.tsx");
const live = read("src/lib/live-contract.ts");
const spec = read("src/lib/domain-spec.ts");
const deploymentSource = read("src/lib/deployment.ts");

test("the V2 contract surface is fully represented", () => {
  const publicNames = [...contract.matchAll(/@gl\.public\.(?:write(?:\.payable)?|view)\s+def ([a-z0-9_]+)\(/g)].map((match) => match[1]);
  assert.equal(publicNames.length, 13);
  for (const name of publicNames) assert.match(spec, new RegExp(`["']${name}["']`));
  assert.match(deploymentSource, /currentContractSourceHash = "76e106cf7c20a787d07dd3537fab2a1cfef6eb6c3013594a54855b0e738fc0b6"/);
  assert.match(deploymentSource, /contractAddress = "0x[a-fA-F0-9]{40}"/);
});

test("the app is one complete English route", () => {
  const appRoot = path.join(root, "src", "app");
  const pages = [];
  const visit = (directory) => { for (const entry of fs.readdirSync(directory, { withFileTypes: true })) { const target = path.join(directory, entry.name); if (entry.isDirectory()) visit(target); else if (entry.name === "page.tsx") pages.push(target); } };
  visit(appRoot);
  assert.deepEqual(
    pages.map((page) => path.relative(appRoot, page)).sort(),
    [path.join("app", "page.tsx"), "page.tsx"],
  );
  assert.doesNotMatch(experience, /["'`]\/contract["'`]/);
  assert.doesNotMatch(experience, /\?mode=/);
  assert.match(experience, /className="[^"]*brand" href="(?:\.\.\/|\.\/|\/)"/);
  assert.doesNotMatch(experience, /aria-label="Primary navigation"/);
  assert.doesNotMatch(experience, /href=["'`]#/);
  assert.doesNotMatch(landing, /<nav/);
});

test("wallet, source reference, and finality are explicit", () => {
  assert.match(experience, /ConnectButton/);
  assert.ok((experience + "\n" + spec).includes("VaultShield security system"));
  assert.match(live, /TransactionStatus\.FINALIZED/);
  assert.match(live, /MAJORITY_AGREE/);
  assert.doesNotMatch(`${experience}\n${live}`, new RegExp(["private" + "Key", "mne" + "monic", "seed" + "Phrase"].join("|")));
});
