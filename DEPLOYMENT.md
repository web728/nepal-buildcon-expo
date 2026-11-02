# Deployment guide

1. Configure every required value from `.env.example` in the hosting environment.
2. Set the production domain to `nepalbuildcon.com.np` and redirect the `www` host consistently.
3. Use a Nepal-specific MongoDB database and Google Sheet.
4. Confirm both organiser notification recipients.
5. Run lint, type checking, the production build and Playwright tests.
6. Verify `/robots.txt`, `/sitemap.xml`, canonical tags, Open Graph images and structured data on the production host.
7. Submit test forms only after confirming they point to the Nepal database, sheet and email recipients.

The app degrades gracefully when data services are absent, but form submissions require MongoDB and production verification requires all configured downstream services.
