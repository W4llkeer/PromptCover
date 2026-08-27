# PromptCover

PromptCover is a capitalized mutual that turns authenticated prompt-injection losses into enforceable GEN reserves and claimant payouts.

Live app: https://w4llkeer.github.io/PromptCover/

## Mutual balance sheet

Sponsor capital, underwriting tranches, and premiums are payable writes. Each declared amount must exactly match the attached GEN value, so the balance sheet tracks assets actually held by the contract.

## Loss account

A manager first registers an evidence authority and its allowed HTTPS host. A policy holder then submits the authority ID, source URL, and exact SHA-256. Validators fetch the source, verify the digest and host binding, and agree on cause, severity, coverage, and the deterministic severity payout tier. Reused evidence, concurrent claims, claims above the remaining limit, and more than three claims per policy are rejected.

An approved reserve remains part of contract custody until `credit_claimant_account` transfers the GEN to the claimant. Accounting and claim state change only after the transfer call succeeds; the final state is `PAID` and the receipt records `transfer_completed: true`.

The mutual exposes **13 public methods: 10 writes and 3 reads**, including the repository-visible evidence-authority registration path.

## Vault runway

The VaultShield landing at `/` and the operational mutual at `/app` share the same identity, palette, and physical-security language. The app organizes capital, exposure, loss evidence, reserve, and credit controls as a single vault workflow. The logo returns to the landing page; no `/contract` route or mode copy exists.

## Capital proof

The StudioNet validation flow covers authority registration, payable capitalization, payable tranche funding, policy binding, payable premium intake, claim submission, countertrace, validator classification, reserve, and payout. Transaction-level evidence is kept outside the public repository.

Run the vault suite:

```powershell
npm install
npm run typecheck
npm test
npm run build
npm run dev
```

## Policy seal

- GenLayer Studionet contract: `0xa01599559B1E3a0498205706197624D110E06407`
- Source SHA-256: `76e106cf7c20a787d07dd3537fab2a1cfef6eb6c3013594a54855b0e738fc0b6`
- Chain ID: `61999`
- Deployment status: verified on StudioNet
