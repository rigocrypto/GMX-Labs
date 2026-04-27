# OG Image Guide

This folder is for social preview assets used by Open Graph and Twitter cards.

## Required Asset
- File name: `gmx-labs-preview.jpg`
- Recommended location: `public/og/gmx-labs-preview.jpg`
- Recommended dimensions: `1200 x 630`
- Aspect ratio: `1.91:1`
- Recommended format: `JPG` (or `WebP` if your platform/social tooling supports it reliably)
- Recommended max file size: `<= 300 KB` (hard cap: `<= 500 KB`)

## Design Guidance
Use a clean, high-contrast composition that stays readable at small sizes.

Suggested visual direction:
- Dark background aligned with GMX Labs brand
- GMX Labs logo present and clear
- Short, high-contrast headline (no paragraph text)
- Purple/blue/cyan accent glow to match site style
- Keep text minimal and centered around one clear message

## Recommended Headline
- "Digital Solutions for Web2, Web3 and AI"

## Readability Checklist
- Text remains readable on mobile feed thumbnails
- No tiny text under ~48 px equivalent headline scale
- Strong contrast between text and background
- Avoid visual clutter and dense icon stacks

## Usage Notes
- Open Graph and Twitter can share one image file.
- Keep this path consistent with metadata in `index.html`:
  - `https://www.gmxlabs.example/og/gmx-labs-preview.jpg`

## Optional Future Variants
If needed later, you can add campaign-specific versions:
- `gmx-labs-preview-defi.jpg`
- `gmx-labs-preview-audit.jpg`
- `gmx-labs-preview-ai.jpg`
