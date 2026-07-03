import { afterEach, describe, expect, it, vi } from "vitest";
import worker, { handleLead, handleWebhook } from "../src/index";
import { getLead, newLeadRecord, putLead, type LeadRecord } from "../src/leads";
import { ALLOWED_ORIGIN, FakeKV, makeEnv, signStripe, validLeadBody } from "./helpers";

function req(path: string, init: RequestInit = {}): Request {
  return new Request(`https://worker.example${path}`, init);
}

afterEach(() => vi.unstubAllGlobals());

describe("GET /health", () => {
  it("returns ok + service name", async () => {
    const res = await worker.fetch(req("/health"), makeEnv(new FakeKV()));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, service: "gmx-labs-repo-inspection-backend" });
  });
});

describe("CORS", () => {
  it("answers preflight for the allowed origin with a matching Allow-Origin", async () => {
    const res = await worker.fetch(
      req("/repo-inspection-leads", { method: "OPTIONS", headers: { Origin: ALLOWED_ORIGIN } }),
      makeEnv(new FakeKV())
    );
    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe(ALLOWED_ORIGIN);
    expect(res.headers.get("Access-Control-Allow-Methods")).toContain("POST");
  });

  it("does NOT reflect a disallowed origin (no wildcard)", async () => {
    const res = await worker.fetch(
      req("/repo-inspection-leads", { method: "OPTIONS", headers: { Origin: "https://evil.example" } }),
      makeEnv(new FakeKV())
    );
    expect(res.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });
});

describe("POST /repo-inspection-leads", () => {
  it("validates, stores, and returns a leadId", async () => {
    const kv = new FakeKV();
    const res = await handleLead(
      req("/repo-inspection-leads", {
        method: "POST",
        headers: { Origin: ALLOWED_ORIGIN, "Content-Type": "application/json" },
        body: JSON.stringify(validLeadBody),
      }),
      makeEnv(kv)
    );
    expect(res.status).toBe(200);
    const { leadId } = (await res.json()) as { leadId: string };
    expect(leadId).toBeTruthy();

    const stored = await getLead(kv, leadId);
    expect(stored?.status).toBe("pending_payment");
    expect(stored?.paymentStatus).toBe("unpaid");
    expect(stored?.email).toBe("jane@acme.com");
  });

  it("rejects invalid input with 400 + field", async () => {
    const res = await handleLead(
      req("/repo-inspection-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validLeadBody, email: "bad" }),
      }),
      makeEnv(new FakeKV())
    );
    expect(res.status).toBe(400);
    expect((await res.json() as { field: string }).field).toBe("email");
  });

  it("returns 400 on invalid JSON", async () => {
    const res = await handleLead(
      req("/repo-inspection-leads", { method: "POST", body: "{not json" }),
      makeEnv(new FakeKV())
    );
    expect(res.status).toBe(400);
  });
});

describe("POST /stripe-webhook", () => {
  const seedLead = async (kv: FakeKV): Promise<LeadRecord> => {
    const lead = newLeadRecord(validLeadBody);
    await putLead(kv, lead);
    return lead;
  };

  it("rejects an invalid signature with 400", async () => {
    const res = await handleWebhook(
      req("/stripe-webhook", { method: "POST", headers: { "Stripe-Signature": "t=1,v1=deadbeef" }, body: "{}" }),
      makeEnv(new FakeKV())
    );
    expect(res.status).toBe(400);
  });

  it("marks the lead paid and sends WhatsApp on a verified completed payment", async () => {
    const kv = new FakeKV();
    const lead = await seedLead(kv);

    const twilioMock = vi.fn(async () => new Response(JSON.stringify({ sid: "SM1" }), { status: 201 }));
    vi.stubGlobal("fetch", twilioMock);

    const eventBody = JSON.stringify({
      id: "evt_1",
      type: "checkout.session.completed",
      data: { object: { id: "cs_test_1", client_reference_id: lead.leadId, payment_status: "paid" } },
    });
    const signature = await signStripe(eventBody);

    const res = await handleWebhook(
      req("/stripe-webhook", { method: "POST", headers: { "Stripe-Signature": signature }, body: eventBody }),
      makeEnv(kv)
    );

    expect(res.status).toBe(200);
    expect(twilioMock).toHaveBeenCalledOnce();
    const [, init] = twilioMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(init.body as string).toContain("New+Repo+Security+Inspection+Paid");

    const updated = await getLead(kv, lead.leadId);
    expect(updated?.status).toBe("paid");
    expect(updated?.paymentStatus).toBe("paid");
    expect(updated?.stripeSessionId).toBe("cs_test_1");
    expect(updated?.whatsappSentAt).toBeTruthy();
  });

  it("returns 200 (no alert) when the leadId is unknown", async () => {
    const twilioMock = vi.fn();
    vi.stubGlobal("fetch", twilioMock);
    const eventBody = JSON.stringify({
      type: "checkout.session.completed",
      data: { object: { id: "cs_x", client_reference_id: "missing-lead" } },
    });
    const res = await handleWebhook(
      req("/stripe-webhook", { method: "POST", headers: { "Stripe-Signature": await signStripe(eventBody) }, body: eventBody }),
      makeEnv(new FakeKV())
    );
    expect(res.status).toBe(200);
    expect(twilioMock).not.toHaveBeenCalled();
  });

  it("stores whatsappError and still returns 200 when Twilio fails", async () => {
    const kv = new FakeKV();
    const lead = await seedLead(kv);
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ message: "nope" }), { status: 400 })));

    const eventBody = JSON.stringify({
      type: "checkout.session.completed",
      data: { object: { id: "cs_2", client_reference_id: lead.leadId } },
    });
    const res = await handleWebhook(
      req("/stripe-webhook", { method: "POST", headers: { "Stripe-Signature": await signStripe(eventBody) }, body: eventBody }),
      makeEnv(kv)
    );
    expect(res.status).toBe(200);
    const updated = await getLead(kv, lead.leadId);
    expect(updated?.paymentStatus).toBe("paid");
    expect(updated?.whatsappError).toContain("nope");
  });

  it("is idempotent — a second delivery does not re-alert", async () => {
    const kv = new FakeKV();
    const lead = await seedLead(kv);
    const twilioMock = vi.fn(async () => new Response(JSON.stringify({ sid: "SM1" }), { status: 201 }));
    vi.stubGlobal("fetch", twilioMock);

    const eventBody = JSON.stringify({
      type: "checkout.session.completed",
      data: { object: { id: "cs_3", client_reference_id: lead.leadId } },
    });
    const signature = await signStripe(eventBody);
    const call = () =>
      handleWebhook(
        req("/stripe-webhook", { method: "POST", headers: { "Stripe-Signature": signature }, body: eventBody }),
        makeEnv(kv)
      );
    await call();
    await call();
    expect(twilioMock).toHaveBeenCalledOnce();
  });
});
