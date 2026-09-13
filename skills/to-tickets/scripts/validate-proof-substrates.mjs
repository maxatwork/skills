import { constants } from "node:fs"
import { access, readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

const heading = "## Proof substrates"
const namePattern = /^[a-z][a-z0-9-]*$/u
const environmentNamePattern = /^[A-Z][A-Z0-9_]*$/u

export class ProofSubstrateValidationError extends Error {
  constructor(messages) {
    super(messages.join("\n"))
    this.name = "ProofSubstrateValidationError"
    this.messages = messages
  }
}

function object(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value
    : null
}

function exactKeys(record, keys) {
  return (
    Object.keys(record).length === keys.length &&
    keys.every((key) => Object.hasOwn(record, key))
  )
}

function parseDeclaration(markdown) {
  const start = markdown.indexOf(heading)
  if (start === -1) return []
  if (markdown.indexOf(heading, start + heading.length) !== -1)
    throw new ProofSubstrateValidationError([
      "Proof substrates: duplicate section.",
    ])
  const section = markdown.slice(start + heading.length)
  const match = section.match(/^\s*```json\s*\n([\s\S]*?)\n```/u)
  if (!match)
    throw new ProofSubstrateValidationError([
      "Proof substrates: expected one JSON code block after the heading.",
    ])
  let parsed
  try {
    parsed = JSON.parse(match[1])
  } catch {
    throw new ProofSubstrateValidationError([
      "Proof substrates: declaration is not valid JSON.",
    ])
  }
  if (!Array.isArray(parsed) || parsed.length === 0)
    throw new ProofSubstrateValidationError([
      "Proof substrates: declaration must be a non-empty array.",
    ])
  return parsed
}

function validateDetection(name, value, errors) {
  const detection = object(value)
  if (!detection || typeof detection.kind !== "string") {
    errors.push(`${name}: detection must identify a safe method.`)
    return null
  }
  if (detection.kind === "environment-variable") {
    if (
      !exactKeys(detection, ["kind", "name"]) ||
      typeof detection.name !== "string" ||
      !environmentNamePattern.test(detection.name)
    )
      errors.push(`${name}: environment-variable detection is invalid.`)
    return detection
  }
  if (detection.kind === "configuration-file") {
    if (
      !exactKeys(detection, ["kind", "path"]) ||
      typeof detection.path !== "string" ||
      !detection.path.trim()
    )
      errors.push(`${name}: configuration-file detection is invalid.`)
    return detection
  }
  if (detection.kind === "capability") {
    if (
      !exactKeys(detection, ["kind", "name"]) ||
      typeof detection.name !== "string" ||
      !namePattern.test(detection.name)
    )
      errors.push(`${name}: capability detection is invalid.`)
    return detection
  }
  errors.push(`${name}: detection kind is not supported.`)
  return null
}

function validateEntries(values) {
  const errors = []
  const names = new Set()
  const entries = values.flatMap((value, index) => {
    const record = object(value)
    const fallbackName = `entry-${index + 1}`
    if (!record) {
      errors.push(`${fallbackName}: substrate must be an object.`)
      return []
    }
    const name =
      typeof record.name === "string" ? record.name : fallbackName
    if (
      !exactKeys(record, [
        "name",
        "classification",
        "availability",
        "detection",
        "criterion",
      ])
    )
      errors.push(`${name}: substrate fields are incomplete or unsupported.`)
    if (!namePattern.test(name)) errors.push(`${name}: name is not stable.`)
    if (names.has(name)) errors.push(`${name}: duplicate substrate name.`)
    names.add(name)
    if (record.classification !== "required" && record.classification !== "deferred")
      errors.push(`${name}: classification must be required or deferred.`)
    if (
      record.availability !== "available" &&
      record.availability !== "unavailable" &&
      record.availability !== "unknown"
    )
      errors.push(`${name}: availability is invalid.`)
    if (typeof record.criterion !== "string" || !record.criterion.trim())
      errors.push(`${name}: criterion must name an acceptance criterion.`)
    const detection = validateDetection(name, record.detection, errors)
    return [
      {
        name,
        classification: record.classification,
        availability: record.availability,
        criterion: record.criterion,
        detection,
      },
    ]
  })
  if (errors.length) throw new ProofSubstrateValidationError(errors)
  return entries
}

function localStatus(markdown) {
  return markdown.match(/^\*\*Status:\*\*\s*(\S.*?)\s*$/mu)?.[1]
}

function acceptanceCriteria(markdown) {
  return new Map(
    [...markdown.matchAll(/^- \[([ xX])\] (.+)$/gmu)].map((match) => [
      match[2].trim(),
      match[1].toLowerCase() === "x",
    ])
  )
}

async function probe(entry, environment) {
  if (entry.detection.kind === "environment-variable")
    return environment[entry.detection.name] ? "available" : "unavailable"
  if (entry.detection.kind === "configuration-file") {
    try {
      await access(entry.detection.path, constants.R_OK)
      return "available"
    } catch {
      return "unavailable"
    }
  }
  return entry.availability
}

export async function validateTicketProofSubstrates(markdown, options = {}) {
  const entries = validateEntries(parseDeclaration(markdown))
  if (entries.length === 0) return { status: options.status ?? localStatus(markdown), substrates: [] }
  const criteria = acceptanceCriteria(markdown)
  const status = options.status ?? localStatus(markdown)
  const checked = []
  for (const entry of entries) {
    const availability = options.probe
      ? await probe(entry, options.environment ?? process.env)
      : entry.availability
    checked.push({ ...entry, availability })
  }
  const errors = []
  if (status === "ready-for-agent")
    for (const entry of checked)
      if (entry.classification === "required" && entry.availability !== "available")
        errors.push(
          `${entry.name}: required proof is ${entry.availability}; ready-for-agent is blocked.`
        )
  for (const entry of checked) {
    const criterionState = criteria.get(entry.criterion)
    if (criterionState === undefined)
      errors.push(`${entry.name}: named acceptance criterion is missing.`)
    else if (entry.classification === "deferred" && criterionState)
      errors.push(`${entry.name}: deferred acceptance criterion must remain unchecked.`)
  }
  if (errors.length) throw new ProofSubstrateValidationError(errors)
  return {
    status,
    substrates: checked.map(({ name, classification, availability }) => ({
      name,
      classification,
      availability,
    })),
  }
}

function parseArguments(argv) {
  const values = new Map()
  let probe = false
  for (let index = 0; index < argv.length; index++) {
    const flag = argv[index]
    if (flag === "--probe") {
      if (probe) throw new ProofSubstrateValidationError(["Duplicate --probe argument."])
      probe = true
      continue
    }
    if (flag !== "--file" && flag !== "--status")
      throw new ProofSubstrateValidationError([`Unknown argument ${flag}.`])
    if (values.has(flag))
      throw new ProofSubstrateValidationError([`Duplicate argument ${flag}.`])
    const value = argv[++index]
    if (!value || value.startsWith("--"))
      throw new ProofSubstrateValidationError([`Missing value for ${flag}.`])
    values.set(flag, value)
  }
  if (!values.has("--file"))
    throw new ProofSubstrateValidationError(["Missing --file argument."])
  return { file: values.get("--file"), status: values.get("--status"), probe }
}

async function main() {
  try {
    const options = parseArguments(process.argv.slice(2))
    const result = await validateTicketProofSubstrates(
      await readFile(options.file, "utf8"),
      options
    )
    console.info(JSON.stringify(result, null, 2))
  } catch (error) {
    if (error instanceof ProofSubstrateValidationError)
      for (const message of error.messages) console.error(message)
    else console.error("Ticket proof-substrate validation failed.")
    process.exitCode = 1
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main()
