// ─────────────────────────────────────────────────────────────────────────────
// GMX-Labs Repository Security Checkup — backend Worker
// ─────────────────────────────────────────────────────────────────────────────
//
// TRUST BOUNDARIES (why each layer is or isn't trusted):
//
//   [Browser modal] --POST /repo-inspection-leads-->  [Worker]
//        Untrusted input. Validated + secret-scanned before storage. CORS is
//        locked to the GMX-Labs origin. We only STORE data here; we never act on
//        payment and never touch the repository.
//
//   [Worker] --put--> [KV]
//        KV holds lead records keyed by leadId. leadId is returned to the browser
//        and forwarded by the Stripe Buy Button as `client_reference_id`.
//
//   [Stripe] --POST /stripe-webhook-->  [Worker]
//        Untrusted until the Stripe-Signature HMAC is verified with
//        STRIPE_WEBHOOK_SECRET over the RAW body. Only after verification do we
//        trust `checkout.session.completed` and mark the lead paid.
//
//   [Worker] --Twilio REST--> [WhatsApp]
//        Server-side only. Twilio credentials live in Worker secrets. The alert
//        fires strictly AFTER a signature-verified paid event.
//
// This backend NEVER clones, installs, or executes a submitted repository. It
// only stores lead details and sends a notification once Stripe confirms payment.
// ─────────────────────────────────────────────────────────────────────────────

import { corsHeaders, jsonResponse } from "./cors";
import type { Env } from "./env";
import { getLead, newLeadRecord, putLead } from "./leads";
import { parseStripeEvent, verifyStripeSignature } from "./stripe";
import { validateLeadInput } from "./validation";
import { buildWhatsAppMessage, sendWhatsApp, type TwilioConfig } from "./whatsapp";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method.toUpperCase();

    // CORS preflight for the browser-facing endpoint.
    if (method === "OPTIONS" && pathname === "/repo-inspection-leads") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(env, request.headers.get("Origin")),
      });
    }

    if (method === "GET" && pathname === "/health") {
      return jsonResponse(
        { ok: true, service: "gmx-labs-repo-inspection-backend" },
        200,
        corsHeaders(env, request.headers.get("Origin"))
      );
    }

    if (method === "POST" && pathname === "/repo-inspection-leads") {
      return handleLead(request, env);
    }

    if (method === "POST" && pathname === "/stripe-webhook") {
      return handleWebhook(request, env);
    }

    return jsonResponse({ error: "Not found." }, 404, corsHeaders(env, request.headers.get("Origin")));
  },
};

// ── POST /repo-inspection-leads ──────────────────────────────────────────────

export async function handleLead(request: Request, env: Env): Promise<Response> {
  const cors = corsHeaders(env, request.headers.get("Origin"));

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400, cors);
  }

  const result = validateLeadInput(body);
  if (!result.ok) {
    return jsonResponse({ error: result.error, field: result.field }, 400, cors);
  }

  const lead = newLeadRecord(result.value);
  try {
    await putLead(env.REPO_INSPECTION_LEADS, lead);
  } catch (err) {
    // Never leak internals to the client.
    console.error("lead-store-failed", { leadId: lead.leadId, error: String(err) });
    return jsonResponse({ error: "Could not store the lead. Please try again." }, 500, cors);
  }

  return jsonResponse({ leadId: lead.leadId }, 200, cors);
}

// ── POST /stripe-webhook ─────────────────────────────────────────────────────

export async function handleWebhook(request: Request, env: Env): Promise<Response> {
  // Raw body is required for signature verification — do not parse before this.
  const rawBody = await request.text();
  const signature = request.headers.get("Stripe-Signature");

  const verified = await verifyStripeSignature(rawBody, signature, env.STRIPE_WEBHOOK_SECRET);
  if (!verified.ok) {
    console.warn("webhook-signature-rejected", { reason: verified.reason });
    return new Response(JSON.stringify({ error: "Invalid signature." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const event = parseStripeEvent(rawBody);
  if (!event) {
    return new Response(JSON.stringify({ error: "Invalid event body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // We only act on completed checkouts; acknowledge everything else with 200 so
  // Stripe doesn't retry events we intentionally ignore.
  if (event.type !== "checkout.session.completed") {
    return new Response(JSON.stringify({ received: true, ignored: event.type }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const session = event.data?.object ?? {};
  const leadId = typeof session.client_reference_id === "string" ? session.client_reference_id : "";
  const stripeSessionId = typeof session.id === "string" ? session.id : "";

  if (!leadId) {
    // Payment happened but we can't correlate it — log for manual reconciliation.
    console.warn("webhook-missing-client-reference-id", { stripeSessionId });
    return ackOk({ received: true, note: "no client_reference_id" });
  }

  const lead = await getLead(env.REPO_INSPECTION_LEADS, leadId);
  if (!lead) {
    console.warn("webhook-lead-not-found", { leadId, stripeSessionId });
    return ackOk({ received: true, note: "lead not found" });
  }

  // Idempotency: if we've already processed this paid event, don't re-alert.
  if (lead.paymentStatus === "paid") {
    return ackOk({ received: true, note: "already processed" });
  }

  lead.status = "paid";
  lead.paymentStatus = "paid";
  lead.stripeSessionId = stripeSessionId;
  lead.paidAt = new Date().toISOString();

  // Send the WhatsApp alert (single attempt). Record the outcome on the lead.
  const twilio: TwilioConfig = {
    accountSid: env.TWILIO_ACCOUNT_SID,
    authToken: env.TWILIO_AUTH_TOKEN,
    from: env.TWILIO_WHATSAPP_FROM,
    to: env.GMX_LABS_WHATSAPP_TO,
  };
  const sent = await sendWhatsApp(twilio, buildWhatsAppMessage(lead));
  if (sent.ok) {
    lead.whatsappSentAt = new Date().toISOString();
  } else {
    lead.whatsappError = sent.error;
    console.error("whatsapp-send-failed", { leadId, error: sent.error });
  }

  try {
    await putLead(env.REPO_INSPECTION_LEADS, lead);
  } catch (err) {
    console.error("lead-update-failed", { leadId, error: String(err) });
    // The payment is still valid; returning 200 avoids infinite Stripe retries.
  }

  // 200 even if WhatsApp failed — the failure is stored for manual follow-up,
  // and we don't want Stripe to redeliver and duplicate the alert.
  return ackOk({ received: true, leadId, whatsapp: sent.ok ? "sent" : "failed" });
}

function ackOk(payload: Record<string, unknown>): Response {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
