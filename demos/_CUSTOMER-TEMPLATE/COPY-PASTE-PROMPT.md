# COPY-PASTE PROMPT FOR A NEW CUSTOMER DEMO

Paste this into ChatGPT and replace only the Maps URL(s):

---

Use the existing `dropshectorernesto-lang/WEBSITE-1` GitHub repo and the safe template at `demos/_CUSTOMER-TEMPLATE/`.

NEW CUSTOMER GOOGLE MAPS URL:
`PASTE_MAPS_URL_HERE`

Create or update the customer demo using these rules exactly:

1. Resolve the Maps link to the real business name. If a folder for that business already exists, update it instead of creating a duplicate.
2. If it is new, copy the **entire** `demos/_CUSTOMER-TEMPLATE/` folder to a clean lowercase hyphenated slug based on the business name.
3. Fill every verified parameter in the copied `profile.js`: `name`, `phoneDisplay`, `phoneHref`, `email`, `social`, `addressLine1`, `addressLine2`, `mapsUrl`, `mapEmbed`, `rating`, `reviewCount`, and all EN/DE/ES/CA `hours`, `aboutHero`, `story1`, `story2`, four `values`, and reviews.
4. Use `null` for optional email/social if they cannot be verified. Do not invent information. For any other uncertain business fact, leave the underlying template content untouched and tell me what could not be verified.
5. Base review copy on genuine public review themes. Paraphrase; do not fabricate testimonials.
6. **NEVER change service-window/service-card pictures. They are permanently OFF LIMITS.**
7. Change carousel/gallery photos only if genuine customer photos can be verified from their Facebook/Instagram/Maps/site or supplied files. Never substitute unrelated groomer photos.
8. Do not modify the root desktop website, `/mobile/`, shared CSS, shared animation files, or service images for customer customization.
9. Preserve all existing layout and behavior. The customer must get all three versions:
   - Mobile
   - Web/Desktop
   - WEB IPAD, with only cursor-following eye overlays disabled
10. Keep `demo-global.js` loaded so every demo inherits:
   - Blog preview category/title/text localization in EN/DE/ES/CA
   - colored/readable review cards
11. Update the copied `LIVE-DEMO.md` with the real business name and slug.
12. Add the customer to `demos/README.md` and `demos/index.html` for quick access.
13. Verify all four languages and all three demo modes.
14. Verify Maps, phone, email/social when available, hours, review rating/count, review-card visibility, Blog preview translations, mobile animations, and WEB IPAD static eyes.
15. Compare the final commit against the previous main commit and confirm no unintended root site, `/mobile/`, service-image, CSS, or animation files changed.
16. Wait for GitHub Pages deployment to succeed before calling it finished.
17. In your final response, give me all three permanent URLs and finish with an exact list of what changed and what was left untouched/unavailable.

Do not change the design or page structure unless I explicitly ask.

---

For a batch, replace the single Maps URL with a numbered list of Maps URLs. Resolve them all first, deduplicate existing businesses, then create/update them in one clean batch commit when practical.
