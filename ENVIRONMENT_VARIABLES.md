# Environment variables

Use `.env.local` for local development and the hosting provider's encrypted environment settings for production. `.env.example` contains variable names only.

Core groups:

- Site: `NEXT_PUBLIC_SITE_URL`
- Database: `MONGODB_URI`, `MONGODB_DB`
- Google Sheets: `GOOGLE_SHEET_ID`, `GOOGLE_CREDENTIALS_BASE64`
- Email: `MAIL_USER`, `MAIL_APP_PASSWORD` or OAuth credentials, `MAIL_FROM_NAME`, `MAIL_FROM_EMAIL`
- Form recipients: `FORM_NOTIFICATION_EMAIL_1`, `FORM_NOTIFICATION_EMAIL_2`
- Spam protection: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`
- Authentication: `AUTH_SECRET`, `ADMIN_INITIAL_EMAIL`, `ADMIN_INITIAL_PASSWORD`
- Analytics and social: the optional `NEXT_PUBLIC_*` variables shown in `.env.example`

Production defaults:

- `NEXT_PUBLIC_SITE_URL=https://nepalbuildcon.com.np`
- `MONGODB_DB=nepal_buildcon`
- `MAIL_FROM_NAME=Nepal Buildcon`

Google credentials must remain server-side and base64 encoded in `GOOGLE_CREDENTIALS_BASE64`. Never expose database, mail or service-account secrets with a `NEXT_PUBLIC_` prefix.
