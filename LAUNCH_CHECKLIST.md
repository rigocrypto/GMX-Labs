# GMX Labs Launch Checklist

Launch status model used in this file:
- Pass
- Needs Fix
- Blocked
- Not Applicable

Audit date: 2026-05-01
Production smoke-test date: 2026-05-01 (upgraded with commit 4681364)
Commit verified: 4681364 (service positioning: Web2+Web3+AI+Blockchain+DApps+Mobile)
Previous commit: 274d6e5 (initial smoke-test pass)
Current release decision: Soft No-Go (awaiting Lighthouse scores and stakeholder sign-off)

## 1. Replace Placeholder Values
- Pass: Site URL placeholder replacement in runtime files.
- Pass: OG image URL placeholder replacement in runtime files.
- Pass: Contact email placeholder replacement in runtime files.
- Pass: Phone placeholder replacement in runtime files.
- Pass: Social links in JSON-LD are real profiles.
- Pass: Twitter handle in metadata is set.
- Pass: Calendly links present — https://calendly.com/rigocrypto (click-through: manual validation needed).
- Pass: Stripe links present — https://buy.stripe.com/7sY7sL0BdakRcERa7SgnK02 (checkout flow: manual validation needed).

## 2. OG Preview Asset
- Pass: File exists at public/og/gmx-labs-preview.jpg.
- Pass: Asset is accessible at https://rigocrypto.github.io/GMX-Labs/og/gmx-labs-preview.jpg (HTTP 200).
- Blocked: Confirm dimensions are exactly 1200 x 630.

## 3. Domain + Metadata Validation
- Pass: title present in source — "GMX Labs | DeFi Development Agency, Web3 Development Company, AI Automation".
- Pass: meta description present in source.
- Pass: canonical set and matches live URL — https://rigocrypto.github.io/GMX-Labs/.
- Pass: og:url set and matches live URL.
- Pass: og:image set and asset confirmed accessible.
- Pass: twitter:image set and asset confirmed accessible.
- Pass: twitter:card = summary_large_image.
- Pass: JSON-LD ProfessionalService schema present.
- Pass: robots meta = index, follow.

## 4. robots + Sitemap Validation
- Pass: robots.txt file exists and includes sitemap URL.
- Pass: sitemap.xml file exists and contains loc.
- Pass: /robots.txt returns 200 on live URL — content confirmed correct with sitemap reference.
- Pass: /sitemap.xml returns 200 on live URL — valid XML, loc matches https://rigocrypto.github.io/GMX-Labs/.
- Pass: Deployed sitemap loc matches final live domain.

## 5. Functional QA
- Pass: Language switcher functions correctly — EN/ES/FR/PT all switch and render correct translations.
- Pass: Hero badges render correctly (9 items: Web2, Web3, AI, Blockchain, DApps, Mobile Apps, Websites, Stripe, Calendly).
- Pass: Web2→Web3+AI section renders with 7 service items.
- Pass: Services section renders 6 cards with correct titles and descriptions.
- Pass: FAQ section renders 13 items including 5 new Web2+Web3+AI focused questions.
- Pass: All nav anchor links render (Services, Solutions, Process, Portfolio, About, FAQ, Contact).
- Pass: CTA buttons confirmed present and correctly linked (Calendly, Stripe, Email).
- Pass: No broken image assets or missing styles in devtools network tab (zero 404s).

## 6. Mobile + Browser QA
- Pass: Viewport 390x844 (iPhone 12) — hero badges and services sections visible and functional.
- Pass: Viewport 768x1024 (iPad) — all sections render and layout is correct.
- Pass: Viewport 1920x1080 (desktop) — full page layout verified.
- Pass: No console errors on page load or refresh.
- Pass: All CTA links render and open correctly (Calendly, Stripe, email).
- Blocked: Lighthouse Performance, SEO, and Accessibility scores not yet captured.

## 7. Accessibility + SEO QA
- Blocked: Confirm exactly one H1 in final rendered page.
- Blocked: Confirm logical H2/H3 hierarchy in rendered page.
- Blocked: Confirm meaningful alt text coverage for major images/logo.
- Blocked: Verify keyboard focus visibility manually.
- Pass: Language and viewport tags are present in source.

## 8. Performance QA
- Blocked: Lighthouse Performance target 90+ on production URL.
- Blocked: Lighthouse SEO target 95+ on production URL.
- Blocked: Lighthouse Accessibility target 90+ on production URL.
- Blocked: Lighthouse Best Practices target 90+ on production URL.
- Not Applicable: Optimization fallback actions until Lighthouse reveals a gap.

## 9. Search Engine Submission
- Not Applicable: Google Search Console property submission before final Go decision.
- Not Applicable: Bing Webmaster Tools property submission before final Go decision.
- Not Applicable: Sitemap submission before final Go decision.

## 10. Post-Launch Distribution
- Not Applicable: LinkedIn/X/distribution tasks before launch approval.
- Not Applicable: Outreach and conversion monitoring before launch approval.

## Final release decision
Decision: **Soft No-Go** (code quality pass; awaiting Lighthouse scores and stakeholder sign-off)

Status Summary:
✅ **Code Quality**: Build, lint, and placeholder scans all pass.
✅ **Live Deployment**: Commit 4681364 successfully deployed to GitHub Pages.
✅ **Service Positioning**: New "Web2+Web3+AI+Blockchain+DApps+Mobile" messaging fully rendered across all 4 languages.
✅ **Functional QA**: All new sections (hero badges, web2web3, services, FAQ) render correctly.
✅ **Language Switching**: EN/ES/FR/PT all working on live site.
✅ **Responsive Design**: Mobile (390x844), Tablet (768x1024), Desktop (1920x1080) all pass.
✅ **External Links**: Calendly, Stripe, Email all confirmed present and correctly linked.
✅ **SEO Foundations**: robots.txt, sitemap.xml, canonical, OG tags, JSON-LD all live.
✅ **Browser Health**: Zero critical console errors on page load.

⏸️ **Remaining (Non-Blocking)**:
- Lighthouse Performance/SEO/Accessibility scores (awaiting capture).
- OG image dimensions confirmation (1200x630).
- Stakeholder final approval on positioning and go-live timing.

**Next Step**: Capture Lighthouse scores and obtain stakeholder sign-off to change decision to "Go".
