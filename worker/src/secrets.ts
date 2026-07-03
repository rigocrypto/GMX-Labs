// Defensive scan that rejects lead submissions containing obvious secrets.
//
// Rationale: this service inspects repositories, so recruiters are primed to
// paste credentials. We refuse to *store* anything that looks like a secret —
// it keeps sensitive material out of our KV and out of the WhatsApp alert.
// This is a best-effort guard, not a guarantee; it errs toward blocking.

const SECRET_PATTERNS: { label: string; re: RegExp }[] = [
  { label: "PEM private key", re: /-----BEGIN[ A-Z]*PRIVATE KEY-----/ },
  { label: "Stripe secret key", re: /\bsk_(live|test)_[A-Za-z0-9]{16,}/ },
  { label: "Stripe webhook secret", re: /\bwhsec_[A-Za-z0-9]{16,}/ },
  { label: "AWS access key id", re: /\bAKIA[0-9A-Z]{16}\b/ },
  { label: "GitHub token", re: /\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}/ },
  { label: "Slack token", re: /\bxox[baprs]-[A-Za-z0-9-]{10,}/ },
  { label: "Google API key", re: /\bAIza[0-9A-Za-z_-]{30,}/ },
  { label: "Private key hex", re: /\b(0x)?[0-9a-fA-F]{64}\b/ },
];

// A 12/15/18/21/24-word run of lowercase alpha words looks like a BIP39 seed.
const SEED_PHRASE_RE = /\b([a-z]{3,8}\s+){11,23}[a-z]{3,8}\b/;

/** Returns a human-readable label if `text` looks like it contains a secret. */
export function detectSecret(text: string): string | null {
  if (!text) return null;
  for (const { label, re } of SECRET_PATTERNS) {
    if (re.test(text)) return label;
  }
  if (SEED_PHRASE_RE.test(text)) return "seed phrase";
  return null;
}

/** Scans multiple named fields; returns the first offending field label pair. */
export function scanFieldsForSecrets(
  fields: Record<string, string>
): { field: string; kind: string } | null {
  for (const [field, value] of Object.entries(fields)) {
    const kind = detectSecret(value);
    if (kind) return { field, kind };
  }
  return null;
}
