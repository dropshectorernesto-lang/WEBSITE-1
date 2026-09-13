# FUTURE DEMOS — START HERE

For every new customer, use **`demos/_CUSTOMER-TEMPLATE/`** as the source.

- Copy the whole folder.
- Rename it to the customer's lowercase hyphenated slug.
- Fill `profile.js` with verified customer data and personalized EN/DE/ES/CA SEO.
- Replace `__BUSINESS_NAME__` and `__SLUG__` in `LIVE-DEMO.md`.
- Do not edit the three wrapper HTML files or `runtime.js` for normal customer customization.
- Use `_CUSTOMER-TEMPLATE/COPY-PASTE-PROMPT.md` when asking ChatGPT to build future demos.

## Permanent inheritance rule

**Every shared demo-system change must work both retroactively and forward.** If a change is meant for all customers—SEO behavior, language fixes, review/blog fixes, device behavior, accessibility or another system-level improvement—implement it in the shared demo layer rather than patching one customer folder.

- `demo-global.js` is loaded by every demo and contains/loads global fixes.
- `demo-system.js` is the shared compatibility layer for personalized SEO/metadata and WEB IPAD static-eye behavior across legacy, current and future demos.
- Customer-specific data belongs in `profile.js`, an existing verified customer profile, or an existing customer customizer.
- Future demos must inherit the shared layer unchanged unless a customer-specific change is explicitly requested.

The template already includes Mobile, Web/Desktop, WEB IPAD, shared Blog preview localization, shared review-card visibility fixes, personalized four-language SEO support, four-language customer content support, and the existing no-regression safeguards.

**Permanent rule: service-window/service-card pictures are OFF LIMITS.**
