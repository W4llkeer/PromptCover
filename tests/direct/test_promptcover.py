import json
from pathlib import Path


CONTRACT = str(Path(__file__).resolve().parents[2] / "contracts" / "PromptCover.py")


def test_covered_injection_loss_moves_through_reserve_account(
    direct_vm,
    direct_deploy,
    direct_alice,
    direct_bob,
):
    direct_vm.sender = direct_alice
    contract = direct_deploy(CONTRACT)
    contract.capitalize_prompt_mutual(
        "Prompt Risk Mutual",
        "https://example.org/mutual-terms",
        10000,
    )
    with direct_vm.prank(direct_bob):
        contract.bind_agent_policy(
            "policy-1",
            "Support Agent",
            "https://example.org/security-profile",
            4000,
            200,
        )
        contract.fund_policy_premium("policy-1", 200)
        contract.report_injection_loss(
            "claim-1",
            "policy-1",
            "https://example.org/incident-1",
            "trace-root-0001",
            1000,
        )

    direct_vm.mock_web(
        r".*mutual-terms.*",
        {"status": 200, "body": "Verified prompt injection is covered up to the policy limit."},
    )
    direct_vm.mock_web(
        r".*security-profile.*",
        {"status": 200, "body": "The agent uses tool allowlists and trace logging."},
    )
    direct_vm.mock_web(
        r".*incident-1.*",
        {"status": 200, "body": "A retrieved document injected instructions that triggered an unauthorized refund."},
    )
    direct_vm.mock_llm(
        r".*AI-agent loss classifier.*",
        json.dumps(
            {
                "covered": True,
                "cause_class": "PROMPT_INJECTION",
                "severity": "HIGH",
                "payout_bps": 8000,
                "causal_findings": "Trace evidence supports a covered injection event.",
            }
        ),
    )
    contract.classify_injection_loss("claim-1")
    contract.reserve_claim_account("claim-1")
    with direct_vm.prank(direct_bob):
        contract.credit_claimant_account("claim-1")

    claim = contract.read_loss_account("claim-1")
    balance = contract.read_mutual_balance_sheet()
    assert claim["state"] == "CREDITED"
    assert claim["credit_receipt"]["credited_units"] == 800
    assert balance["credited_claims"] == 800


def test_non_injection_cause_cannot_create_reserve(
    direct_vm,
    direct_deploy,
    direct_alice,
    direct_bob,
):
    import pytest

    direct_vm.sender = direct_alice
    contract = direct_deploy(CONTRACT)
    contract.capitalize_prompt_mutual(
        "Prompt Risk Mutual",
        "https://example.org/mutual-terms-2",
        5000,
    )
    with direct_vm.prank(direct_bob):
        contract.bind_agent_policy(
            "policy-2",
            "Research Agent",
            "https://example.org/profile-2",
            1000,
            100,
        )
        contract.fund_policy_premium("policy-2", 100)
        contract.report_injection_loss(
            "claim-2",
            "policy-2",
            "https://example.org/incident-2",
            "trace-root-0002",
            300,
        )
    direct_vm.mock_web(r".*mutual-terms-2.*", {"status": 200, "body": "Terms"})
    direct_vm.mock_web(r".*profile-2.*", {"status": 200, "body": "Profile"})
    direct_vm.mock_web(
        r".*incident-2.*", {"status": 200, "body": "Operator entered the wrong amount."}
    )
    direct_vm.mock_llm(
        r".*AI-agent loss classifier.*",
        json.dumps(
            {
                "covered": False,
                "cause_class": "OPERATOR_ERROR",
                "severity": "LOW",
                "payout_bps": 9000,
                "causal_findings": "No injection occurred.",
            }
        ),
    )
    contract.classify_injection_loss("claim-2")
    with pytest.raises(Exception):
        contract.reserve_claim_account("claim-2")
