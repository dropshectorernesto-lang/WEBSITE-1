# FUTURE DEMOS — START HERE

For every new customer, use **`demos/_CUSTOMER-TEMPLATE/`** as the source.

- Copy the whole folder.
- Rename it to the customer's lowercase hyphenated slug.
- Fill `profile.js` with verified customer data and personalized EN/DE/ES/CA SEO.
- Set the customer's booking tier in `profile.js`; Tier 1 is the default.
- Replace `__BUSINESS_NAME__` and `__SLUG__` in `LIVE-DEMO.md`.
- Do not edit the three wrapper HTML files or `runtime.js` for normal customer customization.
- Use `_CUSTOMER-TEMPLATE/COPY-PASTE-PROMPT.md` when asking ChatGPT to build future demos.

## Permanent inheritance rule

**Every shared demo-system change must work both retroactively and forward.** If a change is meant for all customers—SEO behavior, language fixes, review/blog fixes, device behavior, accessibility, booking behavior or another system-level improvement—implement it in the shared demo layer rather than patching one customer folder.

- `demo-global.js` is loaded by every demo and contains/loads global fixes.
- `demo-system.js` is the shared compatibility layer for personalized SEO/metadata and WEB IPAD static-eye behavior across legacy, current and future demos.
- `booking-system.js` is the shared Tier 1/2/3 booking layer across legacy, current and future demos.
- Customer-specific data belongs in `profile.js`, an existing verified customer profile, or an existing customer customizer.
- Customer booking secrets never belong in `profile.js`; Zapier URLs, calendar credentials and admin tokens stay server-side.
- Future demos must inherit the shared layer unchanged unless a customer-specific change is explicitly requested.

The template already includes Mobile, Web/Desktop, WEB IPAD, shared Blog preview localization, shared review-card visibility fixes, personalized four-language SEO support, four-language customer content support, Tier 1 booking defaults with Tier 2/3 upgrade switches, and the existing no-regression safeguards.

See `../BOOKING-SYSTEM.md` for the tier matrix and secure backend setup.

**Permanent rule: service-window/service-card pictures are OFF LIMITS.**