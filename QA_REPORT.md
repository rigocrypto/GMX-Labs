# QA Report - GMX Labs Landing Page Release

## Release info
| Field | Value |
|-------|-------|
| URL | https://rigocrypto.github.io/GMX-Labs/ |
| Date | 2026-05-01 |
| Commit | 135128df204328f705acffdd333fe742d646232b |
| Tester | Copilot automated audit + production smoke-test pass (2026-05-01) |

---

## Automated audit evidence
| Check | Status | Notes |
|-------|--------|-------|
| npm run build | Pass | Passed locally |
| npm run lint | Pass | Passed locally |
| Runtime placeholder sweep | Pass | No unresolved launch placeholders in runtime source/public files |
| OG asset exists locally | Pass | public/og/gmx-labs-preview.jpg present |
| robots.txt exists locally | Pass | public/robots.txt present |
| sitemap.xml exists locally | Pass | public/sitemap.xml present |
| Metadata present in source | Pass | canonical, og, twitter, JSON-LD present in index.html |
| Calendly links present in source | Pass | https://calendly.com/rigocrypto — Hero, Contact, Footer |
| Stripe links present in source | Pass | https://buy.stripe.com/7sY7sL0BdakRcERa7SgnK02 — Hero, Pricing, Contact, Footer |
| Email link present in source | Pass | mailto:rigovivas71@gmail.com — Contact, Footer |

---

## Production smoke-test evidence (2026-05-01)
| Check | Status | Notes |
|-------|--------|-------|
| Homepage HTTP 200 | Pass | https://rigocrypto.github.io/GMX-Labs/ loads and renders all sections |
| robots.txt HTTP 200 | Pass | https://rigocrypto.github.io/GMX-Labs/robots.txt returns correct content with sitemap ref |
| sitemap.xml HTTP 200 | Pass | https://rigocrypto.github.io/GMX-Labs/sitemap.xml returns valid XML, loc matches live domain |
| OG image HTTP 200 | Pass | https://rigocrypto.github.io/GMX-Labs/og/gmx-labs-preview.jpg accessible |
| Canonical URL live match | Pass | og:url and canonical both match https://rigocrypto.github.io/GMX-Labs/ |
| og:title present | Pass | "GMX Labs \| DeFi and Web3 Development Company" |
| og:description present | Pass | Populated with service-focused copy |
| og:image deployed | Pass | Correct absolute URL confirmed accessible |
| twitter:card present | Pass | summary_large_image |
| twitter:site set | Pass | @rigo_crypto |
| JSON-LD present | Pass | ProfessionalService schema present in source |
| Robots meta | Pass | index, follow |
| Language switcher renders | Pass | EN/ES/FR/PT selector visible in live nav |
| Calendly CTA links live | Pass | All href values confirmed in rendered page (click-through: manual validation needed) |
| Stripe CTA links live | Pass | All href values confirmed in rendered page (checkout flow: manual validation needed) |
| Email CTA links live | Pass | All href values confirmed in rendered page |
| All major sections rendered | Pass | Hero, Services, Readiness, Process, Why, Tech, Industries, Portfolio, FAQ, Pricing, Contact, Footer all present |
| Page-level runtime errors | Pass | No render failure detected; full content loaded |

---

## Manual validation status
| Category | Status | Notes |
|----------|--------|-------|
| Desktop QA | Blocked | Manual browser pass not yet executed |
| Tablet QA | Blocked | Manual browser pass not yet executed |
| Mobile QA | Blocked | Manual device pass not yet executed |
| Language switching functionality | Blocked | Switcher renders; actual EN→ES→FR→PT switching requires manual browser test |
| CTA click-through QA | Blocked | Links confirmed present; live redirect/checkout flow requires manual test |
| Stripe checkout end-to-end | Blocked | Stripe link confirmed present; full payment flow requires manual test |
| Lighthouse Performance | Blocked | Production Lighthouse scores not yet captured |
| Lighthouse SEO | Blocked | Production Lighthouse scores not yet captured |
| Lighthouse Accessibility | Blocked | Production Lighthouse scores not yet captured |
| OG image dimensions | Blocked | File accessible; 1200x630 dimensions not yet confirmed |
| Keyboard accessibility | Blocked | Focus visibility not yet manually verified |
| Console error check | Blocked | Devtools network/console check not yet executed |

---

## Checklist status summary
| Item | Status |
|------|--------|
| Build and lint readiness | Pass |
| Placeholder readiness (runtime) | Pass |
| SEO file presence readiness | Pass |
| Live page load and structure | Pass |
| robots.txt and sitemap.xml live | Pass |
| Metadata and OG live | Pass |
| CTA links live (href confirmed) | Pass |
| Functional click-through sign-off | Blocked |
| Cross-device sign-off | Blocked |
| Performance/Lighthouse sign-off | Blocked |
| Final launch governance sign-off | Blocked |

---

## Final release decision
Decision: Soft No-Go

Reason:
- Live page loads correctly and all automated checks pass.
- CTA links (Calendly, Stripe, Email) confirmed present in deployed page.
- robots.txt, sitemap.xml, OG image, and metadata all confirmed live.
- Remaining blockers: Lighthouse scores, mobile layout, language switching functionality, CTA click-through flow, and Stripe checkout end-to-end are not yet manually validated.

Required before changing to Go:
1. Execute manual desktop/tablet/mobile QA in browser and record evidence.
2. Verify language switching (EN/ES/FR/PT) works correctly in live browser.
3. Click-test all CTAs (Calendly booking page loads, Stripe checkout opens, email client opens).
4. Capture Lighthouse scores on production URL and confirm targets met (Perf 90+, SEO 95+, A11y 90+, BP 90+).
5. Confirm OG image is 1200x630.
6. Update this report and LAUNCH_CHECKLIST.md with completed sign-off.
