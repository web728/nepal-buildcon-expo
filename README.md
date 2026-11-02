# Nepal Buildcon International Expo 2027

Production website for the 12th Nepal Buildcon International Expo, held 25-28 February 2027 at Bhrikuti Mandap, Kathmandu, Nepal.

The project preserves the established Buildcon platform architecture: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Framer Motion, MongoDB, Google Sheets, Nodemailer, Zod validation, reCAPTCHA, an admin area and Playwright tests.

## Local development

1. Copy `.env.example` to `.env.local` and add deployment-specific secrets.
2. Install dependencies with `npm install` (or `pnpm install` when npm is unavailable).
3. Run `npm run dev`.
4. Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run typecheck
npm run build
npm run test
```

## Production domain

The canonical production domain is `https://nepalbuildcon.com.np`.

## Form pipeline

Public forms retain the shared Buildcon flow:

`Client validation -> API route -> server validation -> MongoDB -> Google Sheets -> organiser emails -> user acknowledgement`

Set both `FORM_NOTIFICATION_EMAIL_1` and `FORM_NOTIFICATION_EMAIL_2` in the deployment environment. Never commit credentials.

## Content sources

Event facts, sectors, visitor profiles and market indicators are based on the official 12th-edition brochure and the 11th-edition post-show report supplied with this project. Public gallery photography and brand assets are sourced from the official Nepal Buildcon and Media Space websites.
