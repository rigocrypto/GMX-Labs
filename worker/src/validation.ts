import type { LeadInput, Urgency } from "./leads";
import { scanFieldsForSecrets } from "./secrets";

// Field size caps — reject oversized input to prevent KV/alert abuse.
const LIMITS = {
  name: 120,
  company: 160,
  email: 200,
  phone: 40,
  repoUrl: 500,
  message: 4000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return value.length <= LIMITS.email && EMAIL_RE.test(value.trim());
}

// Accepts GitHub/GitLab/Bitbucket and any well-formed HTTPS repo URL.
export function isValidRepoUrl(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length > LIMITS.repoUrl) return false;
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return false;
  }
  if (url.protocol !== "https:") return false;
  if (!url.hostname.includes(".")) return false;
  // Reject credentials embedded in the URL (https://user:token@host/…).
  if (url.username || url.password) return false;
  return url.pathname.replace(/^\/+/, "").length > 0;
}

export type ValidationResult =
  | { ok: true; value: LeadInput }
  | { ok: false; error: string; field?: string };

const asString = (v: unknown): string => (typeof v === "string" ? v : "");

/**
 * Validates and normalizes the raw JSON body. Unknown extra fields (e.g. the
 * frontend's `submittedAt`/`sourcePage`) are ignored, not rejected.
 */
export function validateLeadInput(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Request body must be a JSON object." };
  }
  const b = body as Record<string, unknown>;

  const name = asString(b.name).trim();
  const company = asString(b.company).trim();
  const email = asString(b.email).trim();
  const phone = asString(b.phone).trim();
  const repoUrl = asString(b.repoUrl).trim();
  const message = asString(b.message).trim();
  const urgencyRaw = asString(b.urgency).trim();
  const consent = b.consent === true;

  // Size caps first — cheap and prevents pathological input.
  if (name.length > LIMITS.name) return { ok: false, error: "Name is too long.", field: "name" };
  if (company.length > LIMITS.company) return { ok: false, error: "Company is too long.", field: "company" };
  if (phone.length > LIMITS.phone) return { ok: false, error: "Phone is too long.", field: "phone" };
  if (message.length > LIMITS.message) return { ok: false, error: "Message is too long.", field: "message" };

  // Required fields.
  if (!name) return { ok: false, error: "Name is required.", field: "name" };
  if (!email) return { ok: false, error: "Email is required.", field: "email" };
  if (!isValidEmail(email)) return { ok: false, error: "A valid email is required.", field: "email" };
  if (!repoUrl) return { ok: false, error: "Repository URL is required.", field: "repoUrl" };
  if (!isValidRepoUrl(repoUrl))
    return { ok: false, error: "A valid HTTPS repository URL is required.", field: "repoUrl" };
  if (!consent) return { ok: false, error: "Consent is required.", field: "consent" };

  const urgency: Urgency = urgencyRaw === "Priority" ? "Priority" : "Standard";

  // Refuse to store anything that looks like a leaked secret.
  const secret = scanFieldsForSecrets({ name, company, message, phone, repoUrl });
  if (secret) {
    return {
      ok: false,
      error: `Please remove sensitive data (${secret.kind}) before submitting. Do not send secrets, keys, or seed phrases.`,
      field: secret.field,
    };
  }

  const source = asString(b.source).trim() || "gmx-labs-repo-inspection";

  return {
    ok: true,
    value: { name, company, email, phone, repoUrl, message, urgency, consent, source },
  };
}
