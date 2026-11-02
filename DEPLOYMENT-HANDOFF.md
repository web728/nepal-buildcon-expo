# Nepal Buildcon deployment handoff

Production target: `https://nepalbuildcon.com.np`

Before launch, the deployment owner must provide or verify:

- Nepal MongoDB connection and database name
- Nepal Google Sheet ID and service-account access
- Gmail/App Password or OAuth credentials
- both organiser notification email addresses
- reCAPTCHA keys for the production domain
- analytics IDs, if used

Run `npm run lint`, `npm run typecheck`, `npm run build` and `npm run test` after environment configuration. Live form testing must verify MongoDB, Google Sheets, both organiser inboxes and the user acknowledgement email.
