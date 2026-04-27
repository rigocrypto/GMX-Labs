# GMX Labs Launch Checklist

Use this checklist for final pre-launch QA and repeatable handoff.

## 1. Replace Placeholder Values
Update all placeholder values before production deploy:
- Site URL: `https://www.gmxlabs.example/`
- OG image URL: `https://www.gmxlabs.example/og/gmx-labs-preview.jpg`
- Contact email: `hello@gmxlabs.example`
- Phone: `+1-000-000-0000`
- Social links in JSON-LD (`sameAs`)
- Twitter handle in metadata (`twitter:site`)
- Calendly placeholder links in page CTAs

## 2. OG Preview Asset
- Create: `public/og/gmx-labs-preview.jpg`
- Confirm dimensions: `1200 x 630`
- Confirm file opens at production URL after deploy

## 3. Domain + Metadata Validation
Check in deployed HTML source:
- `<title>` is final and branded
- `<meta name="description">` is final
- `<link rel="canonical">` matches live domain
- `og:url` matches canonical URL
- `og:image` points to existing asset
- `twitter:image` points to existing asset

## 4. robots + Sitemap Validation
- Verify `/robots.txt` returns `200`
- Verify `/sitemap.xml` returns `200`
- Confirm `robots.txt` includes correct sitemap URL
- Confirm sitemap `loc` uses final domain

## 5. Functional QA
- Test all nav anchor links
- Test CTA buttons (email, Calendly, purchase links)
- Test footer links
- Confirm no broken routes/assets in browser devtools network tab

## 6. Mobile + Browser QA
- Validate key breakpoints (mobile/tablet/desktop)
- Check typography and button readability on mobile
- Check sticky header behavior on mobile
- Test at least one Chromium browser + one WebKit browser

## 7. Accessibility + SEO QA
- One H1 on page
- Logical H2/H3 hierarchy
- Meaningful alt text for major images/logo
- Keyboard focus visible for links/buttons
- Language and viewport tags present

## 8. Performance QA
Run Lighthouse on production URL and target:
- Performance: `90+`
- SEO: `95+`
- Accessibility: `90+`
- Best Practices: `90+`

If scores are low:
- Compress large images
- Convert heavy PNG/JPG assets to WebP when appropriate
- Reduce unused font weights

## 9. Search Engine Submission
After deploy:
- Add property in Google Search Console
- Add property in Bing Webmaster Tools
- Submit sitemap URL in both tools

## 10. Post-Launch Distribution
Within 24 hours of launch:
- Publish at least 1 LinkedIn post
- Publish at least 1 X post
- Share landing page with targeted founder/operator contacts
- Monitor click-through and CTA conversion behavior
