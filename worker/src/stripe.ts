// Stripe webhook signature verification using Web Crypto (SubtleCrypto).
//
// We verify the `Stripe-Signature` header ourselves rather than pulling in the
// Stripe Node SDK — the SDK's sync `constructEvent` relies on Node's crypto,
// which isn't available on Workers. This implementation matches Stripe's scheme:
//   signed_payload = `${timestamp}.${rawBody}`
//   expected       = HMAC-SHA256(signed_payload, webhook_secret)  (hex)
// The header carries `t=<unix ts>` and one or more `v1=<hex>` signatures.
//
// TRUST BOUNDARY: nothing in the webhook body is trusted until this passes. The
// raw, unparsed request body MUST be used — re-serializing JSON would change
// bytes and break the signature.

const DEFAULT_TOLERANCE_SECONDS = 300; // reject events older/newer than 5 min

async function hmacSha256Hex(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Length-safe, constant-time string comparison. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

export type SignatureResult = { ok: true } | { ok: false; reason: string };

export async function verifyStripeSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
  nowSeconds: number = Math.floor(Date.now() / 1000),
  toleranceSeconds: number = DEFAULT_TOLERANCE_SECONDS
): Promise<SignatureResult> {
  if (!secret) return { ok: false, reason: "webhook secret not configured" };
  if (!signatureHeader) return { ok: false, reason: "missing Stripe-Signature header" };

  let timestamp: string | undefined;
  const v1: string[] = [];
  for (const part of signatureHeader.split(",")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const scheme = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (scheme === "t") timestamp = value;
    else if (scheme === "v1") v1.push(value);
  }

  if (!timestamp || v1.length === 0) {
    return { ok: false, reason: "malformed signature header" };
  }

  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) return { ok: false, reason: "invalid timestamp" };

  const expected = await hmacSha256Hex(secret, `${timestamp}.${rawBody}`);
  const matches = v1.some((candidate) => timingSafeEqual(candidate, expected));
  if (!matches) return { ok: false, reason: "signature mismatch" };

  if (Math.abs(nowSeconds - ts) > toleranceSeconds) {
    return { ok: false, reason: "timestamp outside tolerance" };
  }

  return { ok: true };
}

// ── Minimal typing for the event shape we consume ─────────────────────────────

export interface CheckoutSessionCompleted {
  type: "checkout.session.completed";
  data: {
    object: {
      id: string;
      client_reference_id: string | null;
      payment_status?: string;
      customer_email?: string | null;
    };
  };
}

export interface StripeEventEnvelope {
  type: string;
  data?: { object?: Record<string, unknown> };
}

export function parseStripeEvent(rawBody: string): StripeEventEnvelope | null {
  try {
    return JSON.parse(rawBody) as StripeEventEnvelope;
  } catch {
    return null;
  }
}
