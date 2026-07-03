# GMX-Labs Repository Security Checkup — Backend Worker

A Cloudflare Worker that turns a paid Stripe checkout into a WhatsApp alert for
the GMX-Labs "Repository Security Checkup" service.

```
[Browser modal] → POST /repo-inspection-leads → store lead in KV → return { leadId }
        │
        └─ leadId travels as the Stripe Buy Button's client-reference-id
                                   │
        [Stripe checkout paid] → POST /stripe-webhook (signature-verified)
                                   │
        retrieve lead by client_reference_id → mark paid → Twilio WhatsApp alert
```

## Trust boundary

- **Frontend → Worker**: untrusted. Input is validated, size-capped, and
  secret-scanned before anything is stored. CORS is locked to the GMX-Labs
  origin (no wildcard).
- **Worker → KV**: lead records live under `repo-inspection-lead:{leadId}`.
- **Stripe → Worker**: untrusted until the `Stripe-Signature` HMAC is verified
  against the **raw** body with `STRIPE_WEBHOOK_SECRET`. Only then is a payment
  believed.
- **Worker → Twilio/WhatsApp**: server-side only; credentials are Worker secrets.

**This backend never clones, installs, or executes a submitted repository.** It
only stores lead details and notifies after a verified payment.

## Endpoints

| Method | Path                       | Purpose                                             |
| ------ | -------------------------- | --------------------------------------------------- |
| GET    | `/health`                  | `{ "ok": true, "service": "…" }`                    |
| POST   | `/repo-inspection-leads`   | Validate + store a lead, return `{ "leadId": "…" }` |
| POST   | `/stripe-webhook`          | Verify signature, process `checkout.session.completed` |
| OPTIONS| `/repo-inspection-leads`   | CORS preflight (GMX-Labs origin only)               |

### `POST /repo-inspection-leads`

Request body:

```json
{
  "name": "Jane Recruiter",
  "company": "Acme Talent",
  "email": "jane@acme.com",
  "phone": "+1 555 010 2020",
  "repoUrl": "https://github.com/acme/assessment-repo",
  "message": "Backend role — please check install scripts.",
  "urgency": "Priority",
  "consent": true,
  "source": "gmx-labs-repo-inspection"
}
```

- `name`, `email`, `repoUrl` required; `consent` must be `true`.
- `email` must be valid; `repoUrl` must be HTTPS (GitHub/GitLab/Bitbucket or any
  well-formed HTTPS repo; URLs with embedded credentials are rejected).
- Fields containing obvious secrets (PEM keys, `sk_live_…`, GitHub tokens, seed
  phrases, 64-hex private keys, …) are rejected.
- Success → `200 { "leadId": "<uuid>" }`. Invalid → `400 { "error", "field" }`.

## Environment variables

Set **secrets** with `wrangler secret put <NAME>` (prod) or in `.dev.vars`
(local). The non-secret `ALLOWED_ORIGIN` lives in `wrangler.toml [vars]`.

| Variable                | Type   | Notes                                                        |
| ----------------------- | ------ | ------------------------------------------------------------ |
| `STRIPE_SECRET_KEY`     | secret | Reserved for future Stripe API calls; not used by current flow |
| `STRIPE_WEBHOOK_SECRET` | secret | **Required** — verifies webhook signatures (`whsec_…`)       |
| `TWILIO_ACCOUNT_SID`    | secret | Twilio account SID (`AC…`)                                   |
| `TWILIO_AUTH_TOKEN`     | secret | Twilio auth token                                            |
| `TWILIO_WHATSAPP_FROM`  | secret | e.g. `whatsapp:+14155238886`                                 |
| `GMX_LABS_WHATSAPP_TO`  | secret | e.g. `whatsapp:+16892165223`                                 |
| `ALLOWED_ORIGIN`        | var    | `https://rigocrypto.github.io`                               |

None of these are ever exposed to the frontend.

## Configure Cloudflare KV

```bash
# Create the namespaces (run once):
npx wrangler kv namespace create REPO_INSPECTION_LEADS
npx wrangler kv namespace create REPO_INSPECTION_LEADS --preview
```

Paste the returned `id` and `preview_id` into the `[[kv_namespaces]]` block in
`wrangler.toml` (binding stays `REPO_INSPECTION_LEADS`).

## Local development

```bash
npm install
cp .dev.vars.example .dev.vars   # then fill in real values (never commit this)
npm run dev                      # wrangler dev — local KV + secrets from .dev.vars
```

Smoke test:

```bash
curl http://localhost:8787/health
curl -X POST http://localhost:8787/repo-inspection-leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@acme.com","repoUrl":"https://github.com/a/b","consent":true,"urgency":"Standard"}'
# → {"leadId":"…"}
```

## Deploy (manual)

```bash
npm run typecheck
npm test
npx wrangler secret put STRIPE_WEBHOOK_SECRET
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put TWILIO_ACCOUNT_SID
npx wrangler secret put TWILIO_AUTH_TOKEN
npx wrangler secret put TWILIO_WHATSAPP_FROM
npx wrangler secret put GMX_LABS_WHATSAPP_TO
npm run deploy                   # → https://gmx-labs-repo-inspection.<subdomain>.workers.dev
```

## Deploy (CI/CD — GitHub Actions)

Workflow: **`.github/workflows/deploy-repo-inspection-worker.yml`** ("Deploy Repo
Inspection Worker"). It triggers on `workflow_dispatch` and on pushes to `main`
that touch `worker/**` or the workflow file, then: `npm ci` → `npm test` →
`npm run typecheck` → `npm run deploy`.

The deploy step is **gated**: it runs only when both Cloudflare secrets are set;
otherwise it prints a warning and skips (tests + typecheck still run), so the
workflow stays green until you're ready.

**Required GitHub repository secrets** (Settings → Secrets and variables →
Actions → *Secrets*):

| Secret                  | Purpose                                                    |
| ----------------------- | ---------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | Deploy the Worker + manage KV. Minimal scope below.        |
| `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account that owns the Worker.               |

**Minimal Cloudflare API token scope** (Cloudflare dashboard → My Profile → API
Tokens → Create Token → *Edit Cloudflare Workers* template, or custom):

- Account · **Workers Scripts** · Edit
- Account · **Workers KV Storage** · Edit
- Account · **Account Settings** · Read

No Stripe/Twilio/WhatsApp values ever go into GitHub — those are **Cloudflare
Worker secrets** only (see "Environment variables"). The first automated deploy
also requires the KV `id`/`preview_id` to be filled into `wrangler.toml`.

## Deployment order (do these in sequence)

1. `npx wrangler kv namespace create REPO_INSPECTION_LEADS` (+ `--preview`), paste
   ids into `wrangler.toml`.
2. Set the 6 Cloudflare Worker secrets (`wrangler secret put …`) and confirm
   `ALLOWED_ORIGIN=https://rigocrypto.github.io`.
3. Add `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` as GitHub repo secrets.
4. Deploy: run the GitHub Actions workflow (or `npm run deploy`).
5. Verify `GET /health` and CORS (see below).
6. Register the Stripe webhook (see below).
7. **Only then** set the frontend `VITE_REPO_INSPECTION_API_URL` and redeploy Pages.

## Live verification (after deploy)

```bash
# Health
curl https://<your-worker-domain>/health
# → {"ok":true,"service":"gmx-labs-repo-inspection-backend"}

# CORS preflight from the GitHub Pages origin — expect 204 with a matching
# Access-Control-Allow-Origin header:
curl -i -X OPTIONS https://<your-worker-domain>/repo-inspection-leads \
  -H "Origin: https://rigocrypto.github.io" \
  -H "Access-Control-Request-Method: POST"
# → HTTP/2 204
# → access-control-allow-origin: https://rigocrypto.github.io

# A disallowed origin must NOT be reflected:
curl -i -X OPTIONS https://<your-worker-domain>/repo-inspection-leads \
  -H "Origin: https://evil.example" -H "Access-Control-Request-Method: POST"
# → no access-control-allow-origin header
```

## Configure the Stripe webhook

1. Stripe Dashboard → **Developers → Webhooks → Add endpoint**.
2. Endpoint URL: `https://<your-worker-domain>/stripe-webhook`.
3. Events to send: **`checkout.session.completed`**.
4. Copy the **Signing secret** (`whsec_…`) → `wrangler secret put STRIPE_WEBHOOK_SECRET`.
5. Ensure the Buy Button forwards the lead: the frontend sets
   `client-reference-id={leadId}`, which arrives as `session.client_reference_id`.

## Configure Twilio WhatsApp

1. Enable WhatsApp in Twilio (Sandbox for testing, or an approved WhatsApp
   Business sender for production).
2. `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` from the Twilio Console.
3. `TWILIO_WHATSAPP_FROM` = your WhatsApp-enabled Twilio number
   (`whatsapp:+…`). For the sandbox this is `whatsapp:+14155238886` and the
   destination must first join the sandbox.
4. `GMX_LABS_WHATSAPP_TO` = the GMX-Labs number that receives alerts (`whatsapp:+…`).

The alert body:

```
New Repo Security Inspection Paid

Name: {name}
Company: {company}
Email: {email}
Phone/WhatsApp: {phone}
Repo URL: {repoUrl}
Urgency: {urgency}
Message: {message}

Lead ID: {leadId}
Stripe Session ID: {stripeSessionId}
Payment Status: paid
Submitted At: {createdAt}
Paid At: {paidAt}
```

## Connect the frontend (do this LAST — only after `/health` works)

`VITE_REPO_INSPECTION_API_URL` is a **public** endpoint URL, so store it as a
GitHub Actions **Variable** (not a Secret):

1. Repo → Settings → Secrets and variables → Actions → **Variables** → New:
   `VITE_REPO_INSPECTION_API_URL = https://<your-worker-domain>/repo-inspection-leads`
2. Inject it into the Pages build by adding an `env:` to the Build step of
   `.github/workflows/deploy.yml`:

   ```yaml
   - name: Build
     run: npm run build
     env:
       VITE_REPO_INSPECTION_API_URL: ${{ vars.VITE_REPO_INSPECTION_API_URL }}
   ```

3. Re-run the Pages deploy.

Until the Variable is set, the build var is empty and the modal safely stays in
frontend-only mode. Once the endpoint returns `{ leadId }`, the modal leaves
frontend-only mode and forwards the `leadId` as the Buy Button's
`client-reference-id` (with the work email as `customer-email`).

## Testing without a real payment

- **Unit/integration suite** (no network, no live payment):

  ```bash
  npm test
  ```

  Covers valid submission, invalid email, invalid repo URL, missing consent,
  secret rejection, CORS preflight, webhook signature rejection, a verified
  `checkout.session.completed` updating the lead, Twilio payload formatting,
  and idempotency.

- **Stripe CLI** against a locally running `wrangler dev` — no real charge:

  ```bash
  stripe listen --forward-to http://localhost:8787/stripe-webhook
  # use the whsec printed by `stripe listen` as STRIPE_WEBHOOK_SECRET
  stripe trigger checkout.session.completed \
    --add checkout_session:client_reference_id=<a-leadId-you-created>
  ```

- **Stripe test mode** — use a test-mode Buy Button + test card `4242 4242 4242 4242`.

## Security checklist

- No secret keys are committed — only `.dev.vars.example` (placeholders) is tracked;
  `.dev.vars` is git-ignored.
- Secrets are never logged in full and never sent to the frontend.
- Webhook events are rejected (`400`) unless the signature verifies against the
  raw body.
- The Worker never executes, clones, or installs a submitted repository.
