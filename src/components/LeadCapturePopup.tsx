import { useEffect, useRef, useState } from "react";
import { STORAGE_BUCKET, supabase } from "../lib/supabaseClient";
import "./LeadCapturePopup.css";

// ── Constants ─────────────────────────────────────────────────────────────────

const CLOSED_KEY = "gmxLeadPopupClosedAt";
const SUBMITTED_KEY = "gmxLeadSubmitted";
const SESSION_KEY = "gmxLeadAttribution";
const DAY_MS = 24 * 60 * 60 * 1000;
const SCROLL_TRIGGER_PCT = 0.3;

// Baked into the bundle at build time — not a secret; visible in source.
// Set VITE_FORMSPREE_ENDPOINT in .env.local for local builds, or as a
// GitHub Actions Variable (not Secret) for CI/CD builds.
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

// ── File validation ───────────────────────────────────────────────────────────

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_FILE_COUNT = 5;

function validateFiles(fileList: FileList): string | null {
  if (fileList.length > MAX_FILE_COUNT) {
    return `Too many files — maximum ${MAX_FILE_COUNT} allowed.`;
  }
  for (const file of Array.from(fileList)) {
    if (!ALLOWED_MIME.has(file.type)) {
      return `"${file.name}" is not an allowed file type. Use JPG, PNG, WebP, or PDF.`;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `"${file.name}" exceeds the 10 MB limit (${(file.size / 1024 / 1024).toFixed(1)} MB).`;
    }
  }
  return null;
}

// ── Supabase upload ───────────────────────────────────────────────────────────

function sanitizeFileName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

async function uploadToSupabase(
  client: NonNullable<typeof supabase>,
  fileList: FileList
): Promise<{ paths: string[]; error: string | null }> {
  const paths: string[] = [];
  const timestamp = Date.now();
  // Random suffix prevents collisions when two sessions upload at the same ms.
  const rand = Math.random().toString(36).slice(2, 7);

  for (const file of Array.from(fileList)) {
    const safeName = sanitizeFileName(file.name);
    const path = `gmx-leads/${timestamp}-${rand}-${safeName}`;

    const { error } = await client.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { upsert: false });

    if (error) {
      return { paths, error: `Upload failed for "${file.name}": ${error.message}` };
    }
    paths.push(path);
  }

  return { paths, error: null };
}

// ── Attribution helpers ───────────────────────────────────────────────────────
// UTMs are read from the *initial* page URL on first mount and stored in
// sessionStorage. This preserves campaign params even if the user clicks
// hash-nav links or a SPA router updates window.location before they submit.

type Attribution = {
  sourcePage: string;
  referrer: string;
  userAgent: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  leadSource: string;
};

function buildAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  return {
    sourcePage: window.location.href,
    referrer: document.referrer || "direct",
    userAgent: navigator.userAgent,
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    leadSource: "GMX Labs Website",
  };
}

function getAttribution(): Attribution {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) return JSON.parse(stored) as Attribution;
  } catch { /* ignore — sessionStorage may be blocked */ }
  const fresh = buildAttribution();
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(fresh)); } catch { /* ignore */ }
  return fresh;
}

// ── Form shape ────────────────────────────────────────────────────────────────

type LeadForm = {
  name: string;
  email: string;
  phone: string;
  projectName: string;
  website: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
};

const initialForm: LeadForm = {
  name: "",
  email: "",
  phone: "",
  projectName: "",
  website: "",
  projectType: "",
  budget: "",
  timeline: "",
  description: "",
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function LeadCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [files, setFiles] = useState<FileList | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "uploading" | "sending">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successNote, setSuccessNote] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const floatingBtnRef = useRef<HTMLButtonElement>(null);

  // Capture UTMs on first mount so they survive any subsequent URL changes.
  useEffect(() => { getAttribution(); }, []);

  // ── Auto-trigger on scroll depth ──────────────────────────────────────────
  // Fires once when the user scrolls past 30% of the page — less intrusive
  // than hijacking the first click, but still catches engaged visitors.
  // Does NOT fire if the user already submitted (ever) or closed within 24 h.
  useEffect(() => {
    const alreadySubmitted = localStorage.getItem(SUBMITTED_KEY) === "true";
    const closedAt = Number(localStorage.getItem(CLOSED_KEY) || 0);
    const recentlyClosed = closedAt && Date.now() - closedAt < DAY_MS;

    if (alreadySubmitted || recentlyClosed || hasAutoTriggered) return;

    const handleScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total >= SCROLL_TRIGGER_PCT) {
        setIsOpen(true);
        setHasAutoTriggered(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAutoTriggered]);

  // ── Focus trap + ESC close ────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, input, select, textarea, [href], [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closePopup(); return; }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const closePopup = () => {
    localStorage.setItem(CLOSED_KEY, String(Date.now()));
    setIsOpen(false);
    // Return focus to the floating button so keyboard users aren't stranded.
    requestAnimationFrame(() => floatingBtnRef.current?.focus());
  };

  // IMPORTANT: openManually intentionally skips all localStorage suppression
  // checks. A returning client who already submitted once must still be able
  // to start a second project via the floating button.
  const openManually = () => {
    setForm(initialForm);
    setFiles(null);
    setSubmitted(false);
    setSubmitError(null);
    setSubmitStatus("idle");
    setSuccessNote(null);
    setIsOpen(true);
  };

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!FORMSPREE_ENDPOINT) {
      setSubmitError("Form endpoint is not configured. Please contact us at rigovivas71@gmail.com.");
      return;
    }

    setIsSubmitting(true);

    // ── Step 1: validate + upload files ──────────────────────────────────────
    let uploadedAssetLinks = "(none)";

    if (files && files.length > 0) {
      // Client-side validation — type, size, count.
      const validationError = validateFiles(files);
      if (validationError) {
        setSubmitError(validationError);
        setIsSubmitting(false);
        return;
      }

      const fileNames = Array.from(files).map((f) => f.name).join(", ");

      if (!supabase) {
        // Supabase not configured — capture file names and proceed with the lead.
        uploadedAssetLinks = `(Supabase not configured — names only): ${fileNames}`;
      } else {
        setSubmitStatus("uploading");
        const { paths, error: uploadError } = await uploadToSupabase(supabase, files);

        if (uploadError) {
          // Upload failed — degrade gracefully: capture file names, flag the failure,
          // and still submit the lead. Losing a qualified lead over a transient
          // network blip is a worse outcome than chasing the files in follow-up.
          uploadedAssetLinks = `(upload failed — names only): ${fileNames}`;
          // successNote is set after the Formspree POST succeeds (see below).
        } else {
          uploadedAssetLinks = paths.join(", ");
        }
      }
    }

    // ── Step 2: submit lead to Formspree ─────────────────────────────────────
    setSubmitStatus("sending");
    const attribution = getAttribution();
    const assetUploadFailed = uploadedAssetLinks.startsWith("(upload failed");

    const payload = {
      ...form,
      uploadedAssetLinks,
      assetUploadFailed,
      // Attribution — captured on first mount to preserve initial UTMs.
      sourcePage: attribution.sourcePage,
      referrer: attribution.referrer,
      userAgent: attribution.userAgent,
      utmSource: attribution.utmSource,
      utmMedium: attribution.utmMedium,
      utmCampaign: attribution.utmCampaign,
      leadSource: attribution.leadSource,
      submittedAt: new Date().toISOString(),
      // Formspree honeypot — bots fill this; real browsers leave it blank.
      _gotcha: "",
    };

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        errors?: { message: string }[];
      };

      if (!res.ok) {
        const msg =
          data.errors?.[0]?.message ??
          data.error ??
          `Submission failed (${res.status}). Please try again.`;
        setSubmitError(msg);
        return;
      }

      localStorage.setItem(SUBMITTED_KEY, "true");

      if (assetUploadFailed) {
        setSuccessNote(
          "We couldn't attach your files this time — GMX Labs will follow up to collect them."
        );
      } else if (files && files.length > 0) {
        setSuccessNote("Your project assets were securely attached to your request.");
      }

      setSubmitted(true);
    } catch {
      setSubmitError(
        "Network error — please check your connection and try again, or email us at rigovivas71@gmail.com."
      );
    } finally {
      setIsSubmitting(false);
      setSubmitStatus("idle");
    }
  };

  const submitLabel =
    submitStatus === "uploading" ? "Uploading files…" :
    submitStatus === "sending"   ? "Sending…" :
                                   "Start My Project";

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <button
        ref={floatingBtnRef}
        type="button"
        className="gmx-floating-cta"
        onClick={openManually}
        aria-label="Open project intake form"
      >
        Start Project
      </button>

      {isOpen && (
        <div
          className="gmx-popup-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gmx-popup-title"
          onClick={(e) => { if (e.target === e.currentTarget) closePopup(); }}
        >
          <div className="gmx-popup" ref={modalRef}>
            <button type="button" className="gmx-popup-close" onClick={closePopup} aria-label="Close popup">
              ×
            </button>

            {submitted ? (
              <div className="gmx-success">
                <h2 id="gmx-popup-title">Thank you.</h2>
                <p>
                  Your project request was received. GMX Labs will review your details
                  and follow up soon.
                </p>
                {successNote && (
                  <p className="gmx-success-note">{successNote}</p>
                )}
                <button type="button" className="gmx-primary-btn" onClick={() => setIsOpen(false)}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 id="gmx-popup-title">Build Your Web3 or AI Project With GMX Labs</h2>
                <p className="gmx-popup-subtitle">
                  Tell us about your idea, upload your assets, and share your project goals.
                  We'll review your request and follow up with the best development path.
                </p>

                <form className="gmx-lead-form" onSubmit={submitForm} noValidate>
                  <div className="gmx-grid">
                    <label>
                      Full Name *
                      <input
                        name="name"
                        value={form.name}
                        onChange={updateField}
                        required
                        placeholder="Your name"
                        autoComplete="name"
                      />
                    </label>

                    <label>
                      Email *
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={updateField}
                        required
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </label>

                    <label>
                      Phone / WhatsApp
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={updateField}
                        placeholder="+1 000 000 0000"
                        autoComplete="tel"
                      />
                    </label>

                    <label>
                      Company / Project Name
                      <input
                        name="projectName"
                        value={form.projectName}
                        onChange={updateField}
                        placeholder="Project or company name"
                        autoComplete="organization"
                      />
                    </label>

                    <label>
                      Website / Social Link
                      <input
                        name="website"
                        value={form.website}
                        onChange={updateField}
                        placeholder="https://"
                        autoComplete="url"
                      />
                    </label>

                    <label>
                      Project Type *
                      <select
                        name="projectType"
                        value={form.projectType}
                        onChange={updateField}
                        required
                      >
                        <option value="">Select one</option>
                        <option value="Web3 DApp">Web3 DApp</option>
                        <option value="Token Launch">Token Launch</option>
                        <option value="NFT / Marketplace">NFT / Marketplace</option>
                        <option value="DeFi Protocol">DeFi Protocol</option>
                        <option value="AI Automation">AI Automation</option>
                        <option value="Landing Page">Landing Page</option>
                        <option value="Smart Contract">Smart Contract</option>
                        <option value="Security Audit">Security Audit</option>
                        <option value="Other">Other</option>
                      </select>
                    </label>

                    <label>
                      Budget
                      <select name="budget" value={form.budget} onChange={updateField}>
                        <option value="">Select budget</option>
                        <option value="Under $1,000">Under $1,000</option>
                        <option value="$1,000 - $5,000">$1,000 – $5,000</option>
                        <option value="$5,000 - $15,000">$5,000 – $15,000</option>
                        <option value="$15,000+">$15,000+</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </label>

                    <label>
                      Timeline
                      <select name="timeline" value={form.timeline} onChange={updateField}>
                        <option value="">Select timeline</option>
                        <option value="ASAP">ASAP</option>
                        <option value="2-4 weeks">2–4 weeks</option>
                        <option value="1-3 months">1–3 months</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </label>
                  </div>

                  <label>
                    Project Description *
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={updateField}
                      required
                      rows={5}
                      placeholder="Tell us what you want to build, your goals, and any important project details."
                    />
                  </label>

                  <label>
                    Upload Assets
                    <input
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png,.webp,.pdf"
                      onChange={(e) => setFiles(e.target.files)}
                    />
                    <span className="gmx-file-note">
                      Max 5 files · JPG, PNG, WebP, or PDF only · 10 MB max per file.
                      Logos, screenshots, whitepapers, pitch decks, or brand assets.
                    </span>
                  </label>

                  {submitError && (
                    <p className="gmx-submit-error" role="alert">
                      {submitError}
                    </p>
                  )}

                  <p className="gmx-privacy-note">
                    By submitting, you agree that GMX Labs may use your contact details,
                    project information, uploaded assets, and basic visit information
                    (page URL, referrer, browser type) to follow up on your request.
                    We do not sell your data.
                  </p>

                  <div className="gmx-actions">
                    <button
                      type="button"
                      className="gmx-secondary-btn"
                      onClick={closePopup}
                      disabled={isSubmitting}
                    >
                      Maybe Later
                    </button>
                    <button
                      type="submit"
                      className="gmx-primary-btn"
                      disabled={isSubmitting}
                    >
                      {submitLabel}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
