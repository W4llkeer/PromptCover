export type FieldType = "str" | "u256" | "bool";
export type FieldSpec = { name: string; label: string; type: FieldType };
export type WriteAction = { name: string; label: string; description: string; fields: readonly FieldSpec[]; payableValueField?: string };
export type ReadAction = { name: string; label: string; fields: readonly FieldSpec[] };

export const appSpec = {
  "brand": "PromptCover",
  "kicker": "AI security risk mutual",
  "headline": "Coverage for the trust boundary.",
  "description": "Capitalize a mutual, bind agent policies, preserve incident countertraces, and let GenLayer classify prompt-injection losses before reserves or claimant credits move.",
  "workspace": "Mutual vault",
  "workspaceCopy": "A secured claim path from underwriting capital to policy, incident, evidence, classification, reserve, and credit.",
  "primary": "Unlock mutual vault",
  "reference": "VaultShield security system",
  "design": "physical security runway",
  "mediaType": "video",
  "media": "/reference/vaultshield.mp4",
  "mediaAlt": "Animated security vault mechanism",
  "steps": [
    [
      "CAPITAL",
      "Fund the mutual",
      "Publish terms and pledge ranked underwriting tranches."
    ],
    [
      "POLICY",
      "Bind the agent",
      "Set security profile, limit, premium, and payment."
    ],
    [
      "CLAIM",
      "Classify the loss",
      "Build a countertrace before reserve and claimant credit."
    ]
  ],
  "stats": [
    [
      "9",
      "vault controls"
    ],
    [
      "Ranked",
      "underwriter tranches"
    ],
    [
      "AI",
      "loss classification"
    ]
  ]
} as const;

export const writeActions = [
  {
    "name": "register_evidence_authority",
    "label": "Register evidence authority",
    "description": "Manager-register the authoritative incident evidence host.",
    "fields": [
      { "name": "authority_id", "label": "Authority ID", "type": "str" },
      { "name": "allowed_host", "label": "Allowed HTTPS host", "type": "str" }
    ]
  },
  {
    "name": "capitalize_prompt_mutual",
    "label": "Capitalize mutual",
    "description": "Launch the security mutual with sponsor capital.",
    "fields": [
      {
        "name": "mutual_name",
        "label": "Mutual name",
        "type": "str"
      },
      {
        "name": "terms_url",
        "label": "Terms URL",
        "type": "str"
      },
      {
        "name": "sponsor_units",
        "label": "Sponsor units",
        "type": "u256"
      }
    ],
    "payableValueField": "sponsor_units"
  },
  {
    "name": "pledge_underwriter_tranche",
    "label": "Pledge tranche",
    "description": "Add a ranked underwriter capital tranche.",
    "fields": [
      {
        "name": "tranche_id",
        "label": "Tranche ID",
        "type": "str"
      },
      {
        "name": "units",
        "label": "Capital units",
        "type": "u256"
      },
      {
        "name": "loss_rank",
        "label": "Loss rank",
        "type": "u256"
      }
    ],
    "payableValueField": "units"
  },
  {
    "name": "bind_agent_policy",
    "label": "Bind policy",
    "description": "Issue coverage for an AI agent profile.",
    "fields": [
      {
        "name": "policy_id",
        "label": "Policy ID",
        "type": "str"
      },
      {
        "name": "agent_name",
        "label": "Agent name",
        "type": "str"
      },
      {
        "name": "security_profile_url",
        "label": "Security profile URL",
        "type": "str"
      },
      {
        "name": "coverage_limit",
        "label": "Coverage limit",
        "type": "u256"
      },
      {
        "name": "premium_units",
        "label": "Premium units",
        "type": "u256"
      }
    ]
  },
  {
    "name": "fund_policy_premium",
    "label": "Fund premium",
    "description": "Deposit the policy premium as real GEN value.",
    "fields": [
      {
        "name": "policy_id",
        "label": "Policy ID",
        "type": "str"
      },
      {
        "name": "paid_units",
        "label": "Paid units",
        "type": "u256"
      }
    ],
    "payableValueField": "paid_units"
  },
  {
    "name": "report_injection_loss",
    "label": "Report loss",
    "description": "Open a prompt-injection loss account.",
    "fields": [
      {
        "name": "claim_id",
        "label": "Claim ID",
        "type": "str"
      },
      {
        "name": "policy_id",
        "label": "Policy ID",
        "type": "str"
      },
      {
        "name": "incident_url",
        "label": "Incident URL",
        "type": "str"
      },
      {
        "name": "evidence_authority",
        "label": "Evidence authority ID",
        "type": "str"
      },
      {
        "name": "evidence_sha256",
        "label": "Incident SHA-256",
        "type": "str"
      },
      {
        "name": "claimed_loss_units",
        "label": "Claimed loss units",
        "type": "u256"
      }
    ]
  },
  {
    "name": "append_countertrace",
    "label": "Append countertrace",
    "description": "Add independent evidence to the claim trace.",
    "fields": [
      {
        "name": "claim_id",
        "label": "Claim ID",
        "type": "str"
      },
      {
        "name": "countertrace_url",
        "label": "Countertrace URL",
        "type": "str"
      }
    ]
  },
  {
    "name": "classify_injection_loss",
    "label": "Classify loss",
    "description": "Ask validators to determine whether the loss is covered.",
    "fields": [
      {
        "name": "claim_id",
        "label": "Claim ID",
        "type": "str"
      }
    ]
  },
  {
    "name": "reserve_claim_account",
    "label": "Reserve claim",
    "description": "Allocate mutual capital to an approved claim.",
    "fields": [
      {
        "name": "claim_id",
        "label": "Claim ID",
        "type": "str"
      }
    ]
  },
  {
    "name": "credit_claimant_account",
    "label": "Pay claimant",
    "description": "Transfer the reserved GEN payout before clearing accounting.",
    "fields": [
      {
        "name": "claim_id",
        "label": "Claim ID",
        "type": "str"
      }
    ]
  }
] as const satisfies readonly WriteAction[];
export const readActions = [
  {
    "name": "read_mutual_balance_sheet",
    "label": "Mutual balance sheet",
    "fields": []
  },
  {
    "name": "read_agent_policy",
    "label": "Agent policy",
    "fields": [
      {
        "name": "policy_id",
        "label": "Policy ID",
        "type": "str"
      }
    ]
  },
  {
    "name": "read_loss_account",
    "label": "Loss account",
    "fields": [
      {
        "name": "claim_id",
        "label": "Claim ID",
        "type": "str"
      }
    ]
  }
] as const satisfies readonly ReadAction[];
