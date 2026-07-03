import type { Env } from "../src/env";
import type { KVLike } from "../src/leads";

/** In-memory KV that satisfies the surface our code depends on. */
export class FakeKV implements KVLike {
  store = new Map<string, string>();
  async get(key: string): Promise<string | null> {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
  async put(key: string, value: string): Promise<void> {
    this.store.set(key, value);
  }
}

export const ALLOWED_ORIGIN = "https://rigocrypto.github.io";
export const WEBHOOK_SECRET = "whsec_test_secret_value";

export function makeEnv(kv: KVLike): Env {
  return {
    REPO_INSPECTION_LEADS: kv as unknown as KVNamespace,
    ALLOWED_ORIGIN,
    STRIPE_SECRET_KEY: "sk_test_dummy",
    STRIPE_WEBHOOK_SECRET: WEBHOOK_SECRET,
    TWILIO_ACCOUNT_SID: "ACtest",
    TWILIO_AUTH_TOKEN: "token_test",
    TWILIO_WHATSAPP_FROM: "whatsapp:+14155238886",
    GMX_LABS_WHATSAPP_TO: "whatsapp:+16892165223",
  };
}

/** Produces a valid `Stripe-Signature` header value for a raw body. */
export async function signStripe(
  rawBody: string,
  secret: string = WEBHOOK_SECRET,
  ts: number = Math.floor(Date.now() / 1000)
): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${ts}.${rawBody}`));
  const hex = [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `t=${ts},v1=${hex}`;
}

export const validLeadBody = {
  name: "Jane Recruiter",
  company: "Acme Talent",
  email: "jane@acme.com",
  phone: "+1 555 010 2020",
  repoUrl: "https://github.com/acme/assessment-repo",
  message: "Backend role, please check the install scripts.",
  urgency: "Priority" as const,
  consent: true,
  source: "gmx-labs-repo-inspection",
};
