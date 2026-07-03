import type { LeadRecord } from "./leads";

// Twilio WhatsApp notification — strictly server-side. Credentials come from
// Worker secrets and are never exposed to the browser.

export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  from: string; // e.g. "whatsapp:+14155238886"
  to: string; // e.g. "whatsapp:+16892165223"
}

/** Formats the alert body exactly as GMX-Labs expects to receive it. */
export function buildWhatsAppMessage(lead: LeadRecord): string {
  return [
    "New Repo Security Inspection Paid",
    "",
    `Name: ${lead.name}`,
    `Company: ${lead.company || "-"}`,
    `Email: ${lead.email}`,
    `Phone/WhatsApp: ${lead.phone || "-"}`,
    `Repo URL: ${lead.repoUrl}`,
    `Urgency: ${lead.urgency}`,
    `Message: ${lead.message || "-"}`,
    "",
    `Lead ID: ${lead.leadId}`,
    `Stripe Session ID: ${lead.stripeSessionId ?? "-"}`,
    "Payment Status: paid",
    `Submitted At: ${lead.createdAt}`,
    `Paid At: ${lead.paidAt ?? "-"}`,
  ].join("\n");
}

export type SendResult = { ok: true; sid?: string } | { ok: false; error: string };

/**
 * Sends the WhatsApp message via Twilio's REST API. Single attempt — the caller
 * records any failure on the lead for manual follow-up rather than retrying
 * (Stripe would otherwise redeliver the whole webhook and duplicate alerts).
 */
export async function sendWhatsApp(
  config: TwilioConfig,
  body: string,
  fetchImpl: typeof fetch = fetch
): Promise<SendResult> {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Messages.json`;
  const form = new URLSearchParams({ From: config.from, To: config.to, Body: body });
  const auth = btoa(`${config.accountSid}:${config.authToken}`);

  try {
    const res = await fetchImpl(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });

    if (!res.ok) {
      // Surface Twilio's error code/message, but never the auth header/token.
      let detail = `HTTP ${res.status}`;
      try {
        const data = (await res.json()) as { message?: string; code?: number };
        if (data.message) detail = `${detail} — ${data.message}${data.code ? ` (${data.code})` : ""}`;
      } catch {
        /* non-JSON error body — keep the status code */
      }
      return { ok: false, error: detail };
    }

    const data = (await res.json().catch(() => ({}))) as { sid?: string };
    return { ok: true, sid: data.sid };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "network error" };
  }
}
