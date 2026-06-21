# GMX-LABS 🚀

### Web2 • Web3 • AI • Blockchain • DApps • Mobile Apps • Websites

![CodeQL](https://github.com/rigocrypto/GMX-Labs/actions/workflows/codeql.yml/badge.svg)

**Live Site:** [https://rigocrypto.github.io/GMX-Labs/](https://rigocrypto.github.io/GMX-Labs/)

---

## What is GMX-LABS?

GMX-LABS is a multi-service digital agency landing page and portfolio that bridges **Web2 and Web3** with **AI automation**, helping startups, creators, and businesses turn ideas into launch-ready digital products.

We specialize in:
- **Web Development**: Responsive landing pages, corporate sites, and SEO-optimized experiences
- **Web3 & Blockchain**: DApps, smart contract integration, wallet connectivity, and on-chain UX
- **AI Automation**: Intelligent workflows, chatbots, and AI-powered business systems
- **Mobile-First Experiences**: App-like web experiences and progressive web apps (PWA)
- **Payment & Booking Integration**: Stripe checkout flows and Calendly scheduling
- **Launch Support**: Pre-production QA, checklist validation, and go-live readiness

---

## Services Included

| Service | Description |
|---------|-------------|
| **Web Development** | Modern landing pages and corporate websites optimized for desktop, mobile, SEO, and conversion |
| **Web3 & Blockchain Development** | DApps, smart contract integration, wallet flows, and decentralized application interfaces |
| **AI Automation** | Intelligent workflow agents, chatbots, and AI-powered business process automation |
| **Mobile & App Web** | Mobile-first responsive design, PWA experiences, and app-like web interfaces |
| **Payment & Booking Integration** | Stripe checkout configuration and Calendly scheduling integration |
| **Technical Launch Support** | SEO validation, smoke testing, QA review, and production readiness verification |

---

## Key Features

✅ **Multi-Language UI** — Support for English, Spanish, French, and Portuguese
✅ **Stripe Integration** — Secure payment links for digital product purchases
✅ **Calendly Integration** — Consultation booking and scheduling
✅ **SEO & Social Metadata** — JSON-LD schema, Open Graph tags, and social previews
✅ **Mobile Responsive** — Mobile-first design with touch-optimized interactions
✅ **Lighthouse Optimized** — Performance, accessibility, and best practices ready
✅ **GitHub Pages Deployment** — Fast, zero-cost hosting with automatic CI/CD

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19.2.5** | Component-based UI framework |
| **TypeScript 6.0.2** | Type-safe JavaScript with compile-time checks |
| **Vite 8.0.10** | Fast build tool and development server |
| **ESLint** | Code quality and style enforcement |
| **Stripe** | Secure payment processing (`https://buy.stripe.com/7sY7sL0BdakRcERa7SgnK02`) |
| **Calendly** | Appointment scheduling (`https://calendly.com/rigocrypto`) |
| **GitHub Pages** | Free static hosting with `/GMX-Labs/` base path |

---

## Project Structure

```
rigocrypto/
├── src/
│   ├── App.tsx              # Main landing page component
│   ├── App.css              # Core styles and responsive layout
│   ├── i18n.ts              # Multi-language translations (EN, ES, FR, PT)
│   ├── main.tsx             # React entry point
│   ├── index.css             # Global styles
│   ├── components/
│   │   ├── BiometricLogin.tsx   # (Optional) Login component
│   │   ├── Dashboard.tsx        # (Optional) Dashboard stub
│   │   ├── LanguageSwitcher.tsx # Language selection UI
│   │   └── Logo.tsx             # GMX-LABS logo component
│   ├── hooks/
│   │   └── useLanguage.ts       # Language state and localStorage
│   └── assets/
├── public/
│   ├── robots.txt           # Search engine crawler rules
│   └── sitemap.xml          # SEO sitemap for discoverability
├── index.html               # HTML entry with JSON-LD schema and metadata
├── vite.config.ts           # Build configuration with `/GMX-Labs/` base
├── tsconfig.json            # TypeScript configuration
├── eslint.config.js         # Linting rules
├── package.json             # Dependencies and scripts
├── README.md                # This file
├── LAUNCH_CHECKLIST.md      # Pre-launch governance and QA
├── QA_REPORT.md             # Production smoke-test results
└── DEPLOYMENT_NOTES.md      # Deployment history and notes
```

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/rigocrypto/GMX-Labs.git
cd rigocrypto

# Install dependencies
npm install
```

### Development

```bash
# Start local dev server (http://localhost:5173)
npm run dev

# Watch and rebuild on file changes
npm run build -- --watch
```

### Production Build

```bash
# Build for production
npm run build

# Output: ./dist/ directory with optimized assets
```

### Linting

```bash
# Check code quality
npm run lint
```

---

## Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| **dev** | `vite` | Start local dev server with HMR |
| **build** | `tsc && vite build` | Compile TypeScript and build optimized assets |
| **preview** | `vite preview` | Preview production build locally |
| **lint** | `eslint .` | Check code style and quality |

---

## SEO & Discoverability

- ✅ **JSON-LD Schema**: ProfessionalService schema in `index.html` for rich search results
- ✅ **Open Graph Tags**: Social media preview images and descriptions
- ✅ **Sitemap & Robots**: `robots.txt` and `sitemap.xml` configured
- ✅ **Canonical URLs**: Self-referential links to prevent duplicate indexing
- ✅ **Mobile Meta Tags**: Viewport, apple-touch-icon, and mobile optimization
- ✅ **Metadata Validation**: All section eyebrows, titles, and descriptions included

---

## Security & Launch Readiness

- ✅ **Dependency Hygiene**: ESLint and TypeScript for code safety
- ✅ **No External CDNs**: All assets self-hosted or via trusted providers
- ✅ **HTTPS-Ready**: GitHub Pages auto-enforces HTTPS
- ✅ **External Link Audit**: Stripe, Calendly, and contact email verified
- ✅ **Placeholder Scan**: No TODO, EXAMPLE, or hardcoded test data in production
- ✅ **Pre-Launch Checklist**: [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md) documents all verification steps
- ✅ **Dependabot**: Active — alerts on newly discovered CVEs
- ✅ **npm audit**: Clean — 0 known vulnerabilities
- ✅ **CodeQL**: Scanning JavaScript/TypeScript and GitHub Actions on every push, PR, and weekly schedule

---

## Security

GMX-Labs uses Dependabot, npm audit, and CodeQL code scanning to monitor dependency and source-level security risks. Please report vulnerabilities through the process described in [SECURITY.md](./SECURITY.md).

---

## Payment & Booking Links

| Integration | Link | Purpose |
|-------------|------|---------|
| **Stripe** | [`https://buy.stripe.com/7sY7sL0BdakRcERa7SgnK02`](https://buy.stripe.com/7sY7sL0BdakRcERa7SgnK02) | Secure payment entry point for digital services |
| **Calendly** | [`https://calendly.com/rigocrypto`](https://calendly.com/rigocrypto) | Book consultation and strategy call |
| **Email** | `rigovivas71@gmail.com` | Direct contact for custom project inquiries |

---

## Deployment

Deployed on **GitHub Pages** with automatic CI/CD:

- **Repository**: `rigocrypto/GMX-Labs`
- **Branch**: `main`
- **URL**: `https://rigocrypto.github.io/GMX-Labs/`
- **Base Path**: `/GMX-Labs/` (configured in `vite.config.ts`)
- **Auto-Deploy**: Push to `main` → GitHub Actions → Live in ~2 minutes

### Deploy Steps

1. **Build locally**: `npm run build`
2. **Test**: `npm run preview` → http://localhost:4173/GMX-Labs/
3. **Commit & push**: `git push origin main`
4. **Wait for GitHub Pages action** to complete (watch Actions tab)
5. **Verify live**: https://rigocrypto.github.io/GMX-Labs/

---

## Project Status

| Aspect | Status |
|--------|--------|
| **Build** | ✅ Clean (tsc + vite build) |
| **Linting** | ✅ Passing (ESLint) |
| **Security** | ✅ No placeholders, external links verified |
| **SEO** | ✅ Metadata complete, JSON-LD schema present |
| **Smoke Test** | ✅ Passed on production URL (see [QA_REPORT.md](QA_REPORT.md)) |
| **Release Phase** | 🔄 **Release Candidate** — Pre-launch QA complete |
| **Launch Status** | 🛑 **Soft No-Go** — Awaiting stakeholder sign-off |

**Note**: This project is not yet "production ready" for public announcement. Launch decision pending stakeholder review of QA report and final checklist validation.

---

## Contact & Inquiries

**Email**: [rigovivas71@gmail.com](mailto:rigovivas71@gmail.com?subject=Project%20Estimate%20Request)
**Calendly**: [https://calendly.com/rigocrypto](https://calendly.com/rigocrypto)
**Stripe Link**: [https://buy.stripe.com/7sY7sL0BdakRcERa7SgnK02](https://buy.stripe.com/7sY7sL0BdakRcERa7SgnK02)

---

## Vision

GMX-LABS exists to bridge the gap between traditional digital experiences (Web2) and the next generation of blockchain, AI, and decentralized technologies (Web3+AI). We help teams move from idea to launch-ready product in weeks, not months, with clear delivery, transparent scoping, and production-quality execution.

Our commitment: **Build faster. Launch smarter. Scale globally.**

---

**Last Updated**: 2025 | **Maintained by**: [@rigocrypto](https://github.com/rigocrypto)
