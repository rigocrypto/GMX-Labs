# GMX Labs Launch Checklist

Launch status model used in this file:
- Pass
- Needs Fix
- Blocked
- Not Applicable

Audit date: 2026-05-01
Production smoke-test date: 2026-05-01
Commit verified: 135128df204328f705acffdd333fe742d646232b
Current release decision: Soft No-Go

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
- Blocked: Test all nav anchor links manually in browser.
- Blocked: Test CTA buttons (Calendly, Stripe checkout, email) in deployed environment — links confirmed present; click-through not yet validated.
- Blocked: Test footer links manually.
- Blocked: Confirm no broken routes/assets via devtools network tab.

## 6. Mobile + Browser QA
- Blocked: Validate key breakpoints (mobile/tablet/desktop).
- Blocked: Check typography and button readability on mobile.
- Blocked: Check sticky header behavior on mobile.
- Blocked: Test at least one Chromium browser and one WebKit browser.

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
Decision: Soft No-Go

Reason:
- Live page loads correctly. All automated and remote smoke-test checks pass.
- CTA links (Calendly, Stripe, Email), robots.txt, sitemap.xml, OG image, and metadata all confirmed live.
- Remaining blockers: Lighthouse scores, mobile/device layout, language switching functionality, CTA click-through flow, and Stripe checkout end-to-end are not yet manually validated.

Exit criteria to change decision to Go:
1. Execute manual functional/mobile/browser smoke test in live environment.
2. Verify language switching works in live browser (EN→ES→FR→PT).
3. Click-test all CTAs: Calendly booking page loads, Stripe checkout opens, email client opens.
4. Run Lighthouse on production URL and confirm all targets met.
5. Confirm OG image is 1200x630.
6. Update this checklist and QA_REPORT.md with completed evidence.
