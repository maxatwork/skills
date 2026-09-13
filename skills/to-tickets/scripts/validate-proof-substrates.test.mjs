import assert from "node:assert/strict"
import test from "node:test"
import {
  ProofSubstrateValidationError,
  validateTicketProofSubstrates,
} from "./validate-proof-substrates.mjs"

function ticket({ status = "ready-for-agent", substrates, criteria }) {
  return `# Ticket\n\n**Status:** ${status}\n\n## Proof substrates\n\n\`\`\`json\n${JSON.stringify(substrates, null, 2)}\n\`\`\`\n\n${criteria
    .map(({ checked, text }) => `- [${checked ? "x" : " "}] ${text}`)
    .join("\n")}`
}

const postgres = {
  name: "postgresql-independent-connections",
  classification: "required",
  availability: "unavailable",
  detection: {
    kind: "environment-variable",
    name: "TEST_POSTGRES_URL",
  },
  criterion: "Independent PostgreSQL connections prove the claim.",
}

const providerConfig = {
  name: "provider-configuration",
  classification: "deferred",
  availability: "unknown",
  detection: {
    kind: "configuration-file",
    path: ".local/missing-provider-configurations.json",
  },
  criterion: "Every supported provider adapter passes the real-provider matrix.",
}

test("tickets without external proof keep the lightweight workflow", async () => {
  const result = await validateTicketProofSubstrates(
    "# Ticket\n\n**Status:** ready-for-agent\n\n- [ ] Verify locally."
  )
  assert.deepEqual(result.substrates, [])
})

test("unavailable required PostgreSQL proof blocks ready-for-agent", async () => {
  await assert.rejects(
    validateTicketProofSubstrates(
      ticket({
        substrates: [postgres],
        criteria: [{ checked: false, text: postgres.criterion }],
      })
    ),
    (error) => {
      assert.ok(error instanceof ProofSubstrateValidationError)
      assert.match(error.message, /postgresql-independent-connections/u)
      assert.doesNotMatch(error.message, /TEST_POSTGRES_URL/u)
      return true
    }
  )
})

test("tracker status and safe probes cannot promote missing configuration", async () => {
  await assert.rejects(
    validateTicketProofSubstrates(
      ticket({
        status: "draft",
        substrates: [{ ...postgres, availability: "unknown" }],
        criteria: [{ checked: false, text: postgres.criterion }],
      }),
      { status: "ready-for-agent", probe: true, environment: {} }
    ),
    /required proof is unavailable/u
  )
})

test("deferred provider proof stays visible and unchecked", async () => {
  const markdown = ticket({
    substrates: [providerConfig],
    criteria: [{ checked: false, text: providerConfig.criterion }],
  })
  const result = await validateTicketProofSubstrates(markdown, { probe: true })
  assert.deepEqual(result.substrates, [
    {
      name: providerConfig.name,
      classification: "deferred",
      availability: "unavailable",
    },
  ])
  await assert.rejects(
    validateTicketProofSubstrates(
      ticket({
        substrates: [providerConfig],
        criteria: [{ checked: true, text: providerConfig.criterion }],
      })
    ),
    /must remain unchecked/u
  )
})
