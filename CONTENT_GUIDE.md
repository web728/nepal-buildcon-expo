# Nepal Buildcon content guide

## Single source of truth

Use `src/config/event.ts` for event name, dates, venue, domain, organiser contacts, social links and CTA destinations. Do not hardcode these facts in page components.

Use `src/data/marketFacts.ts` for sourced market indicators. Every figure must name its source and verification date. Remove unsupported figures instead of publishing estimates.

Use `src/data/exhibitionProfile.ts` and `src/data/visitorProfile.ts` for product sectors and audience profiles.

## Assets

- `public/logos/` contains the Nepal Buildcon, Futurex and Media Space marks.
- `public/images/gallery/` contains official Nepal Buildcon exhibition photography.
- `public/images/home/` contains the home hero image.
- `public/downloads/` contains the official brochure and post-show report.

Keep meaningful alt text on editorial images. Decorative SVG motifs should remain hidden from assistive technology.

## Dynamic content

Exhibitors, partners, news, gallery entries and downloads can be managed through the existing MongoDB-backed admin area. Do not publish placeholder companies, sponsors or partners as factual listings.

## Review requirements

Confirm event facts and contact changes against an official source before updating production. Legal policies should receive local legal review before launch.
