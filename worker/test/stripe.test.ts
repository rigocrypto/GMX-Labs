import { describe, expect, it } from "vitest";
import { parseStripeEvent, verifyStripeSignature } from "../src/stripe";
import { signStripe, WEBHOOK_SECRET } from "./helpers";

const body = JSON.stringify({ type: "checkout.session.completed", data: { object: { id: "cs_1" } } });

describe("verifyStripeSignature", () => {
  it("accepts a correctly signed payload", async () => {
    const header = await signStripe(body);
    expect((await verifyStripeSignature(body, header, WEBHOOK_SECRET)).ok).toBe(true);
  });

  it("rejects a tampered body", async () => {
    const header = await signStripe(body);
    const r = await verifyStripeSignature(body + "x", header, WEBHOOK_SECRET);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toBe("signature mismatch");
  });

  it("rejects the wrong secret", async () => {
    const header = await signStripe(body, "whsec_other");
    expect((await verifyStripeSignature(body, header, WEBHOOK_SECRET)).ok).toBe(false);
  });

  it("rejects a missing header", async () => {
    expect((await verifyStripeSignature(body, null, WEBHOOK_SECRET)).ok).toBe(false);
  });

  it("rejects a malformed header", async () => {
    expect((await verifyStripeSignature(body, "garbage", WEBHOOK_SECRET)).ok).toBe(false);
  });

  it("rejects a stale timestamp outside tolerance", async () => {
    const staleTs = Math.floor(Date.now() / 1000) - 10_000;
    const header = await signStripe(body, WEBHOOK_SECRET, staleTs);
    const r = await verifyStripeSignature(body, header, WEBHOOK_SECRET);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toBe("timestamp outside tolerance");
  });

  it("parses a valid event and returns null for junk", () => {
    expect(parseStripeEvent(body)?.type).toBe("checkout.session.completed");
    expect(parseStripeEvent("{not json")).toBeNull();
  });
});
