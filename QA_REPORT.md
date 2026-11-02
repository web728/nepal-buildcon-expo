# Nepal Buildcon QA report

Final verification date: 8 October 2026

## Automated checks

- `pnpm install --frozen-lockfile`: passed
- `pnpm run lint`: passed with zero errors and zero warnings
- `pnpm run typecheck`: passed
- `pnpm run build`: passed on Next.js 16.3.1; all 40 generated pages completed
- Playwright desktop Chromium: 19 passed, 2 expected skips
- Playwright mobile Chromium: 18 passed, 3 expected skips

Expected skips cover the empty CMS exhibitor directory, the desktop-only navigation test on mobile, and a localhost form-success test blocked by the production-domain reCAPTCHA key.

## Nepal brochure palette revision

- Replaced the template's former blue/green identity with the official Nepal brochure palette: deep brick red, charcoal, warm white, brochure teal/mint and muted coral.
- Recoloured shared design tokens, hero and page-hero artwork, SVG accents, CTA states, cards, forms, navigation, footer, loaders, error states and email-template brand accents without changing the Buildcon layout or component architecture.
- Rechecked the homepage visually at 1440px and on a Pixel 7 mobile viewport, including hero contrast, light and dark sections, card readability, gradients, CTA hierarchy and footer presentation.
- Re-ran `pnpm run lint`, `pnpm run typecheck` and `pnpm run build`; all passed after the palette revision.
- Re-tested the mobile drawer's nested Exhibitor Directory navigation after making its internal links resilient to client-router timing; the focused Chromium journey passed.

## Coverage

- All public routes returned a response below HTTP 400.
- Every internal link surfaced on the homepage resolved successfully.
- The homepage was checked for horizontal overflow at 320, 375, 390, 414, 768, 1024, 1280, 1440 and 1920 pixels.
- Mobile drawer navigation, desktop dropdown navigation, reduced-motion rendering, 404 handling and unauthenticated admin redirection passed.
- Public pages were checked for one primary heading, image alternative text and empty links.
- Canonical, Open Graph, JSON-LD, robots and sitemap output passed.
- Empty form payloads were rejected before persistence; exhibitor, visitor and contact client validation passed.
- Browser-error monitoring passed across the home, exhibitor, visitor, partner and organiser journeys.
- Visual checks were completed at 390px and 1440px for the homepage, mobile menu, exhibitor form, exhibitor journey, visitor journey and partner journey.

## Content and link audit

The final source audit found no legacy event-name, venue, domain, route, phone-prefix or old-date references. Universal country selectors still include all countries by design.

## Deployment-dependent verification

Live MongoDB writes, Google Sheets appends and email delivery were not triggered during local QA because they would write to external services. After the deployment owner supplies the Nepal production credentials and allows the production domain in reCAPTCHA, submit one test record through each public form and verify:

1. the record exists in the Nepal MongoDB database;
2. the matching row exists in the configured Google Sheet;
3. both organiser notification inboxes received the submission;
4. the submitting user received the acknowledgement email;
5. sync and email status fields are marked successful in the admin area.
