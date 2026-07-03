import { describe, expect, it, vi } from "vitest";
import type { LeadRecord } from "../src/leads";
import { buildWhatsAppMessage, sendWhatsApp, type TwilioConfig } from "../src/whatsapp";

const lead: LeadRecord = {
  leadId: "lead-123",
  name: "Jane Recruiter",
  company: "Acme Talent",
  email: "jane@acme.com",
  phone: "+1 555 010 2020",
  repoUrl: "https://github.com/acme/assessment-repo",
  message: "Backend role",
  urgency: "Priority",
  consent: true,
  source: "gmx-labs-repo-inspection",
  createdAt: "2026-07-03T18:00:00.000Z",
  paidAt: "2026-07-03T18:05:00.000Z",
  stripeSessionId: "cs_test_999",
  status: "paid",
  paymentStatus: "paid",
};

const twilio: TwilioConfig = {
  accountSid: "ACtest",
  authToken: "token_test",
  from: "whatsapp:+14155238886",
  to: "whatsapp:+16892165223",
};

describe("buildWhatsAppMessage", () => {
  it("formats the alert with all fields in order", () => {
    const msg = buildWhatsAppMessage(lead);
    expect(msg).toContain("New Repo Security Inspection Paid");
    expect(msg).toContain("Name: Jane Recruiter");
    expect(msg).toContain("Email: jane@acme.com");
    expect(msg).toContain("Repo URL: https://github.com/acme/assessment-repo");
    expect(msg).toContain("Urgency: Priority");
    expect(msg).toContain("Lead ID: lead-123");
    expect(msg).toContain("Stripe Session ID: cs_test_999");
    expect(msg).toContain("Payment Status: paid");
    expect(msg).toContain("Paid At: 2026-07-03T18:05:00.000Z");
  });

  it("uses dashes for empty optional fields", () => {
    const msg = buildWhatsAppMessage({ ...lead, company: "", phone: "", message: "" });
    expect(msg).toContain("Company: -");
    expect(msg).toContain("Phone/WhatsApp: -");
    expect(msg).toContain("Message: -");
  });
});

describe("sendWhatsApp", () => {
  it("POSTs a Basic-auth form payload to Twilio and returns the sid", async () => {
    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify({ sid: "SM123" }), { status: 201 })
    );
    const res = await sendWhatsApp(twilio, "hello", fetchMock as unknown as typeof fetch);

    expect(res).toEqual({ ok: true, sid: "SM123" });
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.twilio.com/2010-04-01/Accounts/ACtest/Messages.json");
    const headers = init.headers as Record<string, string>;
    expect(headers.Authorization).toBe(`Basic ${btoa("ACtest:token_test")}`);
    const body = new URLSearchParams(init.body as string);
    expect(body.get("From")).toBe("whatsapp:+14155238886");
    expect(body.get("To")).toBe("whatsapp:+16892165223");
    expect(body.get("Body")).toBe("hello");
  });

  it("returns an error (never throws) when Twilio responds non-2xx", async () => {
    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify({ message: "bad number", code: 21211 }), { status: 400 })
    );
    const res = await sendWhatsApp(twilio, "hi", fetchMock as unknown as typeof fetch);
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error).toContain("bad number");
  });
});
