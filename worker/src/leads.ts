// Lead domain types + KV storage helpers.

export type Urgency = "Standard" | "Priority";

/** The lead fields accepted from the frontend modal. */
export interface LeadInput {
  name: string;
  company: string;
  email: string;
  phone: string;
  repoUrl: string;
  message: string;
  urgency: Urgency;
  consent: boolean;
  source?: string;
}

/** The full record persisted in KV (input + server-owned lifecycle fields). */
export interface LeadRecord extends LeadInput {
  leadId: string;
  createdAt: string;
  status: "pending_payment" | "paid";
  paymentStatus: "unpaid" | "paid";
  stripeSessionId?: string;
  paidAt?: string;
  whatsappSentAt?: string;
  whatsappError?: string;
}

/**
 * Minimal KV surface we depend on. Cloudflare's `KVNamespace` satisfies this,
 * and tests can pass a tiny in-memory fake — no Miniflare required.
 */
export interface KVLike {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}

export const leadKey = (leadId: string): string => `repo-inspection-lead:${leadId}`;

export async function getLead(kv: KVLike, leadId: string): Promise<LeadRecord | null> {
  const raw = await kv.get(leadKey(leadId));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LeadRecord;
  } catch {
    return null;
  }
}

export async function putLead(kv: KVLike, lead: LeadRecord): Promise<void> {
  await kv.put(leadKey(lead.leadId), JSON.stringify(lead));
}

/** Build a fresh pending record from validated input. */
export function newLeadRecord(input: LeadInput): LeadRecord {
  return {
    ...input,
    source: input.source ?? "gmx-labs-repo-inspection",
    leadId: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending_payment",
    paymentStatus: "unpaid",
  };
}
