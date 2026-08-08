import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const deployment = JSON.parse(fs.readFileSync(path.join(root, "deployment.json"), "utf8"));

test("PromptCover V2 schema is available on Studionet", async () => {
  const response = await fetch(deployment.rpcUrl, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "gen_getContractSchema", params: [deployment.contractAddress] }) });
  assert.equal(response.ok, true);
  const payload = await response.json();
  assert.equal(payload.error, undefined);
  const text = JSON.stringify(payload.result);
  assert.match(text, /capitalize_prompt_mutual/);
  assert.match(text, /pledge_underwriter_tranche/);
  assert.match(text, /bind_agent_policy/);
  assert.match(text, /fund_policy_premium/);
  assert.match(text, /report_injection_loss/);
  assert.match(text, /append_countertrace/);
  assert.match(text, /classify_injection_loss/);
  assert.match(text, /reserve_claim_account/);
  assert.match(text, /credit_claimant_account/);
  assert.match(text, /read_mutual_balance_sheet/);
  assert.match(text, /read_agent_policy/);
  assert.match(text, /read_loss_account/);
});
