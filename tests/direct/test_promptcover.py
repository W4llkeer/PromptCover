import hashlib
import json
from pathlib import Path

import pytest


CONTRACT = str(Path(__file__).resolve().parents[2] / "contracts" / "PromptCover.py")


def sha(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def launch(direct_vm, contract, capital: int = 10000) -> None:
    contract.register_evidence_authority("soc-provider", "example.org")
    direct_vm.value = capital
    contract.capitalize_prompt_mutual("Prompt Risk Mutual", "https://example.org/mutual-terms", capital)
    direct_vm.value = 0


def open_policy(direct_vm, contract, holder, policy_id: str = "policy-1") -> None:
    with direct_vm.prank(holder):
        contract.bind_agent_policy(policy_id, "Support Agent", "https://example.org/security-profile", 4000, 200)
        direct_vm.value = 200
        contract.fund_policy_premium(policy_id, 200)
        direct_vm.value = 0


def mock_classification(direct_vm, incident_url: str, incident_body: str, covered: bool = True) -> None:
    direct_vm.mock_web(r".*mutual-terms.*", {"status": 200, "body": "Verified prompt injection is covered."})
    direct_vm.mock_web(r".*security-profile.*", {"status": 200, "body": "The agent uses trace logging."})
    direct_vm.mock_web(rf".*{incident_url.rsplit('/', 1)[-1]}.*", {"status": 200, "body": incident_body})
    direct_vm.mock_llm(
        r".*AI-agent loss classifier.*",
        json.dumps({
            "covered": covered,
            "cause_class": "PROMPT_INJECTION" if covered else "OPERATOR_ERROR",
            "severity": "HIGH" if covered else "LOW",
            "payout_bps": 8000 if covered else 9000,
            "causal_findings": "Authenticated trace evidence supports the classification.",
        }),
    )


def test_covered_injection_loss_transfers_reserved_assets(direct_vm, direct_deploy, direct_alice, direct_bob):
    direct_vm.sender = direct_alice
    contract = direct_deploy(CONTRACT)
    launch(direct_vm, contract)
    open_policy(direct_vm, contract, direct_bob)
    incident_url = "https://example.org/incident-1"
    incident_body = "A retrieved document injected instructions that triggered an unauthorized refund."
    with direct_vm.prank(direct_bob):
        contract.report_injection_loss("claim-1", "policy-1", incident_url, "soc-provider", sha(incident_body), 1000)
    mock_classification(direct_vm, incident_url, incident_body)
    contract.classify_injection_loss("claim-1")
    contract.reserve_claim_account("claim-1")
    with direct_vm.prank(direct_bob):
        contract.credit_claimant_account("claim-1")
    claim = contract.read_loss_account("claim-1")
    balance = contract.read_mutual_balance_sheet()
    policy = contract.read_agent_policy("policy-1")
    assert claim["state"] == "PAID"
    assert claim["evidence_verified"] is True
    assert claim["credit_receipt"]["paid_units"] == 800
    assert claim["credit_receipt"]["transfer_completed"] is True
    assert balance["reserved_claims"] == 0
    assert balance["credited_claims"] == 800
    assert policy["open_claims"] == 0
    assert policy["paid_units"] == 800


def test_zero_value_capital_and_premium_are_rejected(direct_vm, direct_deploy, direct_alice, direct_bob):
    direct_vm.sender = direct_alice
    contract = direct_deploy(CONTRACT)
    direct_vm.value = 0
    with pytest.raises(Exception):
        contract.capitalize_prompt_mutual("Prompt Risk Mutual", "https://example.org/terms", 1000)
    launch(direct_vm, contract, 5000)
    with direct_vm.prank(direct_bob):
        contract.bind_agent_policy("policy-zero", "Agent", "https://example.org/profile", 1000, 100)
        direct_vm.value = 0
        with pytest.raises(Exception):
            contract.fund_policy_premium("policy-zero", 100)


def test_unregistered_or_wrong_host_evidence_is_rejected(direct_vm, direct_deploy, direct_alice, direct_bob):
    direct_vm.sender = direct_alice
    contract = direct_deploy(CONTRACT)
    launch(direct_vm, contract)
    open_policy(direct_vm, contract, direct_bob)
    with direct_vm.prank(direct_bob):
        with pytest.raises(Exception):
            contract.report_injection_loss("claim-wrong-host", "policy-1", "https://claimant.example/incident", "soc-provider", "a" * 64, 100)


def test_wrong_evidence_hash_fails_before_ai(direct_vm, direct_deploy, direct_alice, direct_bob):
    direct_vm.sender = direct_alice
    contract = direct_deploy(CONTRACT)
    launch(direct_vm, contract)
    open_policy(direct_vm, contract, direct_bob)
    incident_url = "https://example.org/hash-guard"
    with direct_vm.prank(direct_bob):
        contract.report_injection_loss("claim-hash", "policy-1", incident_url, "soc-provider", "b" * 64, 100)
    mock_classification(direct_vm, incident_url, "different authoritative bytes")
    with pytest.raises(Exception):
        contract.classify_injection_loss("claim-hash")


def test_duplicate_or_concurrent_claim_is_blocked(direct_vm, direct_deploy, direct_alice, direct_bob):
    direct_vm.sender = direct_alice
    contract = direct_deploy(CONTRACT)
    launch(direct_vm, contract)
    open_policy(direct_vm, contract, direct_bob)
    with direct_vm.prank(direct_bob):
        contract.report_injection_loss("claim-open", "policy-1", "https://example.org/open", "soc-provider", "c" * 64, 100)
        with pytest.raises(Exception):
            contract.report_injection_loss("claim-concurrent", "policy-1", "https://example.org/other", "soc-provider", "d" * 64, 100)


def test_non_injection_cause_cannot_create_reserve(direct_vm, direct_deploy, direct_alice, direct_bob):
    direct_vm.sender = direct_alice
    contract = direct_deploy(CONTRACT)
    launch(direct_vm, contract, 5000)
    open_policy(direct_vm, contract, direct_bob, "policy-2")
    incident_url = "https://example.org/incident-2"
    incident_body = "Operator entered the wrong amount without any injected instruction."
    with direct_vm.prank(direct_bob):
        contract.report_injection_loss("claim-2", "policy-2", incident_url, "soc-provider", sha(incident_body), 300)
    mock_classification(direct_vm, incident_url, incident_body, covered=False)
    contract.classify_injection_loss("claim-2")
    with pytest.raises(Exception):
        contract.reserve_claim_account("claim-2")
    assert contract.read_agent_policy("policy-2")["open_claims"] == 0
