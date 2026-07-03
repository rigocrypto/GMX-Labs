import { useEffect, useMemo, useRef, useState } from "react";
import {
  REPO_INSPECTION_API_URL,
  STRIPE_BUY_BUTTON_ID,
  STRIPE_BUY_BUTTON_SCRIPT,
  STRIPE_PUBLISHABLE_KEY,
  isValidEmail,
  isValidRepoUrl,
  type RepoInspectionLead,
} from "../lib/repoInspection";
import "./RepoInspection.css";

// ── Form shape ────────────────────────────────────────────────────────────────

type RepoForm = {
  name: string;
  company: string;
  email: string;
  phone: string;
  repoUrl: string;
  message: string;
  urgency: "Standard" | "Priority";
  consent: boolean;
};

const initialForm: RepoForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  repoUrl: "",
  message: "",
  urgency: "Standard",
  consent: false,
};

// Deliverables listed inside the modal so recruiters know exactly what they get.
const DELIVERABLES = [
  "Risk rating: Low / Medium / High / Critical",
  "Suspicious package scripts",
  "Remote execution patterns",
  "Exposed secrets",
  "Frontend / backend concerns",
  "Safe next-step recommendation",
];

// ── Stripe Buy Button (web component) ──────────────────────────────────────────
// The Buy Button is a custom element loaded from Stripe's hosted script. We build
// it imperatively via a ref so we can (a) conditionally attach the
// `client-reference-id` / `customer-email` attributes and (b) avoid declaring a
// custom JSX intrinsic element. Only PUBLIC Stripe values touch the DOM here.

function StripeBuyButton({
  clientReferenceId,
  customerEmail,
}: {
  clientReferenceId?: string;
  customerEmail?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  // Load Stripe's Buy Button script once (idempotent).
  useEffect(() => {
    if (document.querySelector(`script[src="${STRIPE_BUY_BUTTON_SCRIPT}"]`)) return;
    const script = document.createElement("script");
    script.src = STRIPE_BUY_BUTTON_SCRIPT;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.innerHTML = "";
    const el = document.createElement("stripe-buy-button");
    el.setAttribute("buy-button-id", STRIPE_BUY_BUTTON_ID);
    el.setAttribute("publishable-key", STRIPE_PUBLISHABLE_KEY);
    if (clientReferenceId) el.setAttribute("client-reference-id", clientReferenceId);
    if (customerEmail) el.setAttribute("customer-email", customerEmail);
    host.appendChild(el);

    return () => {
      host.innerHTML = "";
    };
  }, [clientReferenceId, customerEmail]);

  return <div ref={hostRef} className="repo-buy-button" />;
}

// ── Component ─────────────────────────────────────────────────────────────────

type RepoInspectionModalProps = {
  onClose: () => void;
};

type PayStage =
  | "form" // collecting details
  | "lead-ready" // lead stored, leadId attached to Stripe
  | "frontend-only"; // backend unavailable — Stripe works, WhatsApp alert won't

export default function RepoInspectionModal({ onClose }: RepoInspectionModalProps) {
  const [form, setForm] = useState<RepoForm>(initialForm);
  const [touched, setTouched] = useState<Partial<Record<keyof RepoForm, boolean>>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stage, setStage] = useState<PayStage>("form");
  const [leadId, setLeadId] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  // ── Per-field validation ───────────────────────────────────────────────────
  const errors = useMemo(() => {
    const e: Partial<Record<keyof RepoForm, string>> = {};
    if (!form.name.trim()) e.name = "Please enter your full name.";
    if (!form.email.trim()) e.email = "Please enter your work email.";
    else if (!isValidEmail(form.email)) e.email = "That doesn't look like a valid email.";
    if (!form.repoUrl.trim()) e.repoUrl = "Please add the repository URL to inspect.";
    else if (!isValidRepoUrl(form.repoUrl))
      e.repoUrl = "Enter a valid HTTPS repo URL (GitHub, GitLab, Bitbucket, …).";
    if (!form.consent) e.consent = "Please confirm you're authorized to submit this repo.";
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  // ── Focus trap + ESC close ──────────────────────────────────────────────────
  // The modal is mounted only while open (see App.tsx), so it always starts with
  // fresh state — no reset effect needed.
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusables = () =>
      modal.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input, select, textarea, [href], [tabindex]:not([tabindex="-1"])'
      );
    focusables()[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const nextValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
  };

  // Reveal a field's validation message once the user has left it (on blur),
  // so friendly errors appear while the payment button stays gated (disabled).
  const markTouched = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const submitLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) {
      setShowErrors(true);
      return;
    }

    const payload: RepoInspectionLead = {
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      repoUrl: form.repoUrl.trim(),
      message: form.message.trim(),
      urgency: form.urgency,
      consent: form.consent,
      submittedAt: new Date().toISOString(),
      sourcePage: window.location.href,
    };

    // No backend configured yet → frontend-only mode. Payment still works; the
    // automatic WhatsApp alert simply isn't wired up until the webhook ships.
    if (!REPO_INSPECTION_API_URL) {
      setStage("frontend-only");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(REPO_INSPECTION_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Lead endpoint responded ${res.status}`);

      const data = (await res.json()) as { leadId?: string };
      if (!data.leadId) throw new Error("Lead endpoint did not return a leadId.");

      setLeadId(data.leadId);
      setStage("lead-ready");
    } catch {
      // Degrade gracefully — never block the sale over a backend hiccup.
      setStage("frontend-only");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldError = (key: keyof RepoForm) =>
    touched[key] || showErrors ? errors[key] : undefined;
  const showPayment = stage === "lead-ready" || stage === "frontend-only";

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      className="repo-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="repo-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="repo-modal" ref={modalRef}>
        <button
          type="button"
          className="repo-modal-close"
          onClick={onClose}
          aria-label="Close repository inspection dialog"
        >
          ×
        </button>

        <h2 id="repo-modal-title" className="repo-modal-title">
          Request a Repository Security Checkup
        </h2>
        <p className="repo-modal-desc">
          Submit the assessment repo details below. After payment, GMX-Labs will
          review the repository statically and provide a clear security report
          before your candidates are asked to clone, install, or run the code.
        </p>

        <div className="repo-deliverables" aria-label="What you receive">
          <p className="repo-deliverables-label">Your report includes</p>
          <ul>
            {DELIVERABLES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <form className="repo-form" onSubmit={submitLead} noValidate>
          <div className="repo-grid">
            <label>
              Recruiter full name *
              <input
                name="name"
                value={form.name}
                onChange={updateField}
                onBlur={markTouched}
                autoComplete="name"
                placeholder="Your name"
                aria-invalid={fieldError("name") ? "true" : undefined}
              />
              {fieldError("name") && <span className="repo-field-error">{errors.name}</span>}
            </label>

            <label>
              Company or agency name
              <input
                name="company"
                value={form.company}
                onChange={updateField}
                autoComplete="organization"
                placeholder="Company / agency"
              />
            </label>

            <label>
              Work email *
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                onBlur={markTouched}
                autoComplete="email"
                placeholder="you@company.com"
                aria-invalid={fieldError("email") ? "true" : undefined}
              />
              {fieldError("email") && <span className="repo-field-error">{errors.email}</span>}
            </label>

            <label>
              WhatsApp or phone number
              <input
                name="phone"
                value={form.phone}
                onChange={updateField}
                autoComplete="tel"
                placeholder="+1 000 000 0000"
              />
            </label>
          </div>

          <label>
            Repository URL to inspect *
            <input
              name="repoUrl"
              value={form.repoUrl}
              onChange={updateField}
              onBlur={markTouched}
              inputMode="url"
              placeholder="https://github.com/org/assessment-repo"
              aria-invalid={fieldError("repoUrl") ? "true" : undefined}
            />
            {fieldError("repoUrl") && <span className="repo-field-error">{errors.repoUrl}</span>}
            <span className="repo-field-hint">
              GitHub, GitLab, Bitbucket, or any HTTPS repository URL.
            </span>
          </label>

          <div className="repo-grid">
            <label>
              Urgency
              <select name="urgency" value={form.urgency} onChange={updateField}>
                <option value="Standard">Standard</option>
                <option value="Priority">Priority</option>
              </select>
            </label>
          </div>

          <label>
            Assessment context / short message
            <textarea
              name="message"
              value={form.message}
              onChange={updateField}
              rows={4}
              placeholder="What role is this for? Anything specific you want us to check?"
            />
          </label>

          <label className="repo-consent">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={updateField}
              onBlur={markTouched}
              aria-invalid={fieldError("consent") ? "true" : undefined}
            />
            <span>
              I confirm I am authorized to submit this repository for security
              inspection and I will not submit production secrets, private keys,
              seed phrases, or confidential customer data.
            </span>
          </label>
          {fieldError("consent") && <span className="repo-field-error">{errors.consent}</span>}

          <p className="repo-security-note">
            <strong>Security note:</strong> Do not submit private keys, seed
            phrases, production secrets, customer data, or confidential
            credentials.
          </p>

          {!showPayment && (
            <div className="repo-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Preparing payment…" : "Continue to Payment"}
              </button>
            </div>
          )}
        </form>

        {showPayment && (
          <div className="repo-payment">
            {stage === "frontend-only" && (
              <p className="repo-payment-note">
                Payment is available, but automatic WhatsApp notification requires
                backend webhook deployment. Running in <strong>frontend-only mode</strong>
                &nbsp;— your details were captured client-side; GMX-Labs will follow up
                after payment.
              </p>
            )}
            {stage === "lead-ready" && (
              <p className="repo-payment-note repo-payment-ok">
                Details received (lead <code>{leadId}</code>). Complete payment
                below to schedule your inspection.
              </p>
            )}

            <StripeBuyButton
              clientReferenceId={leadId ?? undefined}
              customerEmail={form.email.trim() || undefined}
            />

            <button type="button" className="btn btn-secondary repo-payment-back" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
