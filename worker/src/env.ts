// Worker environment bindings. Secrets are injected by Cloudflare at runtime
// (via `wrangler secret put` in prod, `.dev.vars` locally) and are NEVER shipped
// to or referenced by the frontend.

export interface Env {
  // KV binding (see wrangler.toml).
  REPO_INSPECTION_LEADS: KVNamespace;

  // Non-secret var.
  ALLOWED_ORIGIN: string;

  // Secrets.
  STRIPE_SECRET_KEY?: string; // reserved for future Stripe API use
  STRIPE_WEBHOOK_SECRET: string;
  TWILIO_ACCOUNT_SID: string;
  TWILIO_AUTH_TOKEN: string;
  TWILIO_WHATSAPP_FROM: string;
  GMX_LABS_WHATSAPP_TO: string;
}
