# Replace Before Live

Use this file as a final find/replace checklist before deploying GMX Labs to production.

## 1. Domain / URL placeholders
Replace all occurrences of:

- `https://www.gmxlabs.example/`
- `https://www.gmxlabs.example/og/gmx-labs-preview.jpg`

With your real production values, for example:

- `https://www.gmxlabs.com/`
- `https://www.gmxlabs.com/og/gmx-labs-preview.jpg`

---

## 2. Contact placeholders
Replace:

- `hello@gmxlabs.example`
- `+1-000-000-0000`

With:
- your real support/contact email
- your real phone number if you plan to display one

---

## 3. Social/profile placeholders
Replace:

- `https://x.com/YOUR_HANDLE`
- `https://www.linkedin.com/company/YOUR_COMPANY`
- `https://github.com/YOUR_ORG`
- `@gmxlabs` or any placeholder `twitter:site` value if not final

With:
- your real X profile
- your real LinkedIn company page
- your real GitHub org/profile
- your real Twitter/X handle

---

## 4. Booking / CTA placeholders
Replace any placeholder CTA links such as:

- Calendly booking URLs
- `mailto:` links
- contact form endpoints
- Stripe/payment links if present

Confirm all CTA buttons point to the final destination:
- primary hero CTA
- secondary hero CTA
- service section buttons
- bottom CTA section
- footer links

---

## 5. Brand/content placeholders
Check for and replace any temporary text such as:
- placeholder testimonials
- placeholder metrics/stats
- placeholder company descriptions
- draft labels like “YOUR_*”
- any dummy portfolio links

---

## 6. SEO placeholders
Confirm these values are final in `index.html`:
- `<title>`
- meta description
- canonical URL
- `og:url`
- `og:image`
- `twitter:image`
- JSON-LD `url`
- JSON-LD `image`
- JSON-LD `email`
- JSON-LD `telephone`
- JSON-LD `sameAs`

---

## 7. Sitemap / robots placeholders
Confirm these files use the real production domain:
- `public/robots.txt`
- `public/sitemap.xml`

Specifically check:
- sitemap URL in `robots.txt`
- `<loc>` in `sitemap.xml`

---

## 8. Asset placeholders
Confirm these files exist before launch:
- `public/og/gmx-labs-preview.jpg`
- `public/favicon.svg`
- any other referenced icon/image assets

---

## 9. Quick search terms to run in the repo
Run a global search for these strings before launch:

- `gmxlabs.example`
- `YOUR_`
- `YOUR_HANDLE`
- `YOUR_COMPANY`
- `YOUR_ORG`
- `hello@`
- `000-000-0000`
- `calendly`
- `placeholder`

---

## 10. Final verification
Before pushing live:
1. Run `npm run build`
2. Preview the production build
3. Click every CTA
4. Test mobile layout
5. Check `/robots.txt`
6. Check `/sitemap.xml`
7. Check the live page source for final metadata
8. Test the OG image URL directly in browser
