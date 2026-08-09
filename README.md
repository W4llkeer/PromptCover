# PromptCover

PromptCover is a capitalized mutual that turns prompt-injection losses into traceable policy exposure, reserves, and claimant credits.

## Mutual balance sheet

The sponsor initializes capital and a leverage ceiling. Underwriters add named tranches; policy binding increases exposure, while funded premiums become mutual assets. These entries remain visible in the balance sheet instead of being hidden behind a generic coverage verdict.

## Loss account

A policy holder reports an agent loss and appends ordered countertrace evidence. GenLayer classifies cause, severity, coverage, and payout basis points. The contract then computes the reserve against the policy limit and available assets before moving reserved units into the claimant's credited account.

The mutual exposes **12 public methods: 9 writes and 3 reads**. Capitalization, underwriting, policy binding, premium funding, loss reporting, countertraces, classification, reservation, and crediting are separate writes; balance-sheet, policy, and loss-account views keep the accounting inspectable.

## Vault runway

The VaultShield landing at `/` and the operational mutual at `/app` share the same identity, palette, and physical-security language. The app organizes capital, exposure, loss evidence, reserve, and credit controls as a single vault workflow. The logo returns to the landing page; no `/contract` route or mode copy exists.

## Capital proof

Studionet smoke verification capitalized the deployed mutual and read back `CAPITALIZED` for `mutual-balance-sheet`. Source and direct tests check the twelve-method surface, leverage and reserve guards, source hash, wallet isolation, finalized consensus, and the absence of credential material.

Run the vault suite:

```powershell
npm install
npm run typecheck
npm test
npm run test:studionet
npm run build
npm run dev
```

Local entrance: `http://localhost:4417/`.

## Policy seal

- GenLayer Studionet contract: `0x04B175A8a34fb089A943D9bd41f667530AB1905e`
- Dedicated mutual wallet: `0x50f11bBFa5c1aA0855D53AC09eba1A26cbC66559`
- Deployment transaction: `0x9636a54f8c89de03ee39be2e0bf0e19302d054a428caf7e927157a8ccf554097`
- Source SHA-256: `5a1518583c59b33f07a8f15dddcd700fe1c5e73fd0c5122504be4c4eca57c7a4`
- Chain ID: `61999`
- Deployment manifest: `smoke_verified`
