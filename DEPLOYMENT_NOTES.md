# Deployment Notes

This file documents where launch-critical SEO and discoverability configuration lives.

## Project Stack
- Vite + React + TypeScript
- Static marketing landing page

## Core File Locations
- Head metadata and schema: `index.html`
- robots file: `public/robots.txt`
- sitemap file: `public/sitemap.xml`
- OG image guidance: `public/og/README.md`
- Landing page content and structure: `src/App.tsx`
- Landing page styling: `src/App.css`

## What to Update for Production Domain
When moving from placeholder to production domain, update:
- `canonical` in `index.html`
- `og:url` in `index.html`
- `og:image` and `twitter:image` URLs in `index.html`
- JSON-LD fields in `index.html`:
  - `url`
  - `image`
  - `email`
  - `telephone`
  - `sameAs`
- `Sitemap:` line in `public/robots.txt`
- `<loc>` in `public/sitemap.xml`

## What to Update for Social Handle Changes
In `index.html` update:
- `twitter:site`
- JSON-LD `sameAs` links

## What to Update for Contact Changes
In `src/App.tsx` update:
- email links (`mailto:`)
- CTA booking links (Calendly)
- any phone/contact text if added

In `index.html` update:
- JSON-LD `email`
- JSON-LD `telephone`

## Adding New Pages in the Future
If you add routes such as `/about`, `/blog`, `/case-studies`:
- Add each page URL to `public/sitemap.xml`
- Ensure canonical per page is correct
- Add unique title/description metadata per page

## Build + Verify
Before every deploy:
1. `npm run build`
2. Confirm no TypeScript or Vite errors
3. Smoke test local preview/deployment target

## Recommended Deployment Flow
1. Update placeholders
2. Add final OG image file
3. Run build
4. Deploy
5. Validate robots/sitemap/metadata on live URL
6. Submit sitemap in Search Console and Bing Webmaster Tools
