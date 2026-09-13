# COPY-PASTE PROMPT FOR A NEW CUSTOMER DEMO

Paste this into ChatGPT and replace only the Maps URL(s):

---

Use the existing `dropshectorernesto-lang/WEBSITE-1` GitHub repo and the safe template at `demos/_CUSTOMER-TEMPLATE/`.

NEW CUSTOMER GOOGLE MAPS URL:
`PASTE_MAPS_URL_HERE`

Create or update the customer demo using these rules exactly:

1. Inspect current `main` first. Never revert to an older demo architecture.
2. Resolve the Maps link to the real business name. If a folder for that business already exists, update it instead of creating a duplicate.
3. If it is new, copy the **entire** `demos/_CUSTOMER-TEMPLATE/` folder to a clean lowercase hyphenated slug based on the business name.
4. Fill every verified parameter in the copied `profile.js`: `name`, `phoneDisplay`, `phoneHref`, `email`, `social`, `addressLine1`, `addressLine2`, `mapsUrl`, `mapEmbed`, `rating`, `reviewCount`, all EN/DE/ES/CA client-specific `seo.title` and `seo.description`, plus `hours`, `aboutHero`, `story1`, `story2`, four `values`, and reviews.
5. Keep the customer on **booking Tier 1 by default** unless I explicitly say they bought Tier 2 or Tier 3. Never put Zapier URLs, Google credentials or admin tokens in `profile.js`. Only set `booking.enabled: true` and `booking.apiBase` after a secure backend has actually been deployed and configured.
6. SEO must always fit the actual client. Base titles and meta descriptions only on verified business name, location, category and genuinely verified services/features. Never leave generic Grüm/customer SEO or invent SEO claims.
7. Use `null` for optional email/social if they cannot be verified. Do not invent information. For any other uncertain business fact, leave the underlying template content untouched and tell me what could not be verified.
8. Base review copy on genuine public review themes. Paraphrase; do not fabricate testimonials.
9. **NEVER change service-window/service-card pictures. They are permanently OFF LIMITS.**
10. Change carousel/gallery photos only if genuine customer photos can be verified from their Facebook/Instagram/Maps/site or supplied files. Never substitute unrelated groomer photos.
11. Do not modify the root desktop website, `/mobile/`, shared CSS, shared animation files, or service images for customer customization.
12. Preserve all existing layout and behavior. The customer must get all three versions:
   - Mobile
   - Web/Desktop
   - WEB IPAD, with only cursor-following eye overlays disabled
13. **Shared changes are retroactive and forward-compatible by default.** If a fix or behavior is intended for every customer, implement it in the shared demo layer rather than only in the current customer folder. It must work for existing demos and future demos.
14. Keep `demo-global.js` loaded. It is the shared entry point and automatically loads `demo-system.js` and `booking-system.js`. Together they provide:
   - Blog preview category/title/text localization in EN/DE/ES/CA
   - colored/readable review cards
   - personalized client SEO/metadata synchronization
   - WEB IPAD static-eye behavior
   - shared Tier 1/2/3 booking behavior
15. Booking tiers:
   - Tier 1: date request only; salon notification + all-day Google Calendar event through the secure backend/Zapier.
   - Tier 2: adds customer email/status actions and automation hooks for confirmations/reminders.
   - Tier 3: adds live public time-slot selection through the availability API.
16. Do not create a customer-specific duplicate of a shared fix. Customer-specific facts/content and the chosen booking tier belong in `profile.js`; system behavior belongs in `demo-global.js` / `demo-system.js` / `booking-system.js`.
17. Update the copied `LIVE-DEMO.md` with the real business name and slug.
18. Add the customer to `demos/README.md` and `demos/index.html` for quick access.
19. Verify all four languages and all three demo modes.
20. Verify personalized SEO, Maps, phone, email/social when available, hours, review rating/count, review-card visibility, Blog preview translations, booking tier behavior, mobile animations, and WEB IPAD static eyes.
21. Compare the final commit against the previous main commit and confirm no unintended root site, `/mobile/`, service-image, CSS, or animation files changed.
22. Wait for GitHub Pages deployment to succeed before calling it finished.
23. In the final response, give all three permanent URLs and finish with an exact list of what changed and what was left untouched/unavailable.

Do not change the design or page structure unless explicitly requested.

---

For a batch, replace the single Maps URL with a numbered list of Maps URLs. Resolve them all first, deduplicate existing businesses, then create/update them in one clean batch commit when practical.