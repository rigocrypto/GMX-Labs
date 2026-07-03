// ─────────────────────────────────────────────────────────────────────────────
// Repository Security Checkup — frontend constants
// ─────────────────────────────────────────────────────────────────────────────
//
// SECURITY BOUNDARY (read before editing):
//
// This is a STATIC GitHub Pages bundle. Every value in this file ships to the
// browser and is visible in page source. Only PUBLIC Stripe values are allowed
// here:
//   • Stripe publishable key  (pk_live_… / pk_test_…)  — safe, public by design
//   • Stripe Buy Button id     (buy_btn_…)             — safe, public by design
//
// NEVER put any of the following in this file (or anywhere in the frontend):
//   • Stripe secret key        (sk_live_… / sk_test_…)
//   • Stripe webhook signing secret (whsec_…)
//   • Twilio Account SID / Auth Token
//   • Meta WhatsApp Cloud API access token
//   • Any private database or provider credential
// Those belong ONLY in backend/serverless environment variables. See the
// "SERVERLESS BACKEND" documentation block at the bottom of this file.

// Public Stripe Buy Button embed values (safe to expose — publishable key and
// buy-button id are public by design). Both can be overridden at build time via
// env vars (VITE_STRIPE_PUBLISHABLE_KEY / VITE_STRIPE_BUY_BUTTON_ID) so you can
// swap test/live values without editing source; they fall back to the current
// live values when the env vars are not set. These are still PUBLIC values —
// never point them at a secret key.
export const STRIPE_BUY_BUTTON_ID =
  (import.meta.env.VITE_STRIPE_BUY_BUTTON_ID as string | undefined) ??
  "buy_btn_1TomV0G8p0q8xBb0ZM53NeUo";
export const STRIPE_PUBLISHABLE_KEY =
  (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined) ??
  "pk_live_51ROyb6G8p0q8xBb0qmifIpGeF2Iz6aNi6OKXq8kBBqRgBrCD8nLjkLMWWYCrDjw8YkAqq4RmYWJZ3xFuAEVA8Wpk00AsVa5lCl";

// Stripe's hosted Buy Button web-component loader.
export const STRIPE_BUY_BUTTON_SCRIPT = "https://js.stripe.com/v3/buy-button.js";

// Optional serverless endpoint that stores the lead and returns a `leadId`.
// Configure it by setting VITE_REPO_INSPECTION_API_URL in .env.local (local) or
// as a GitHub Actions *Variable* (CI/CD). When it is NOT set, the modal runs in
// "frontend-only mode": the Stripe Buy Button still works, but the automatic
// WhatsApp notification (which depends on a Stripe webhook + backend) is skipped.
//
// Documented default once the backend is deployed:
//   POST https://api.gmx-labs.com/repo-inspection-leads
// The endpoint must accept the lead JSON payload and respond with { leadId }.
export const REPO_INSPECTION_API_URL = import.meta.env
  .VITE_REPO_INSPECTION_API_URL as string | undefined;

// ─────────────────────────────────────────────────────────────────────────────
// SERVERLESS BACKEND — required for automatic WhatsApp alerts (NOT yet deployed)
// ─────────────────────────────────────────────────────────────────────────────
//
// GitHub Pages is static hosting and cannot securely react to Stripe payments on
// its own. To turn a successful payment into a WhatsApp alert, deploy a small
// serverless backend (Cloudflare Workers, Vercel/Netlify Functions, Supabase Edge
// Functions, etc.) with the following flow:
//
//   1. POST /repo-inspection-leads
//        • Receives the lead form JSON from this modal.
//        • Stores it in secure backend storage (Cloudflare KV/D1, Supabase,
//          Firebase, Airtable, or a private DB).
//        • Returns { leadId } to the frontend.
//
//   2. Frontend passes that leadId to the Stripe Buy Button as
//      `client-reference-id`, and the work email as `customer-email`.
//
//   3. POST /stripe-webhook  (public HTTPS endpoint registered in Stripe)
//        • Listens for the `checkout.session.completed` event.
//        • MUST verify the Stripe signature (Stripe-Signature header) with the
//          webhook signing secret BEFORE trusting the event.
//        • Reads session.client_reference_id → looks up the stored lead.
//        • Sends a WhatsApp notification to GMX-Labs with the recruiter + repo
//          details (see message template below).
//
//   4. WhatsApp provider: Twilio WhatsApp API, Meta WhatsApp Cloud API, Make.com,
//      or Zapier. Provider credentials live ONLY in backend env vars — never here.
//
//   WhatsApp alert template:
//     New Repo Security Inspection Paid
//     Name:            {name}
//     Company:         {company}
//     Email:           {email}
//     Phone/WhatsApp:  {phone}
//     Repo URL:        {repoUrl}
//     Urgency:         {urgency}
//     Message:         {message}
//     Stripe Session ID: {session.id}
//     Payment Status:  {session.payment_status}
//
// ─────────────────────────────────────────────────────────────────────────────

// Shape of the lead payload sent to the serverless endpoint.
export type RepoInspectionLead = {
  name: string;
  company: string;
  email: string;
  phone: string;
  repoUrl: string;
  message: string;
  urgency: "Standard" | "Priority";
  consent: boolean;
  submittedAt: string;
  sourcePage: string;
};

// ── Validation helpers ────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

// Accepts GitHub / GitLab / Bitbucket repo URLs, and any well-formed HTTPS repo
// URL as a general fallback. Requires https, a real host, and a repo path.
export function isValidRepoUrl(value: string): boolean {
  const trimmed = value.trim();
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:") return false;
    if (!url.hostname.includes(".")) return false;
    // Require at least an org/repo-style path so bare domains are rejected.
    return url.pathname.replace(/^\/+/, "").length > 0;
  } catch {
    return false;
  }
}
