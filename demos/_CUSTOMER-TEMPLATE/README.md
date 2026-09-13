# FUTURE CUSTOMER DEMO TEMPLATE

This folder is the safe source for every new customer demo.

## Use it like this
1. Copy the entire `demos/_CUSTOMER-TEMPLATE/` folder.
2. Rename the copy to the customer's URL slug, for example `happy-dog-barcelona`.
3. Edit **only** `profile.js` and `LIVE-DEMO.md` unless you have a verified reason to change something else.
4. Set `booking.tier` in `profile.js`; Tier 1 is the default product.
5. Add the customer to `demos/README.md` and `demos/index.html` for quick access.
6. Push and verify Mobile, Web/Desktop and WEB IPAD after GitHub Pages deploys.

## Do NOT edit these for normal customer customization
- root website files
- `/mobile/` files
- shared service-card/service-window images
- shared CSS or animation source files
- `demo-global.js`
- `demo-system.js`
- `booking-system.js`
- `customer-profile.js`

## Permanent rules
- **Service-window/service-card pictures are OFF LIMITS. Never change them.**
- Carousel/gallery photos may only be changed when they are verified customer photos from the customer's Maps/Facebook/Instagram/site or supplied directly by the customer.
- If phone, email, social, hours, rating, reviews, or other data cannot be verified, leave that item untouched rather than inventing it.
- Customer-facing changes must exist in **EN / DE / ES / CA**.
- **SEO must always be personalized to the actual customer.** Every language needs a factual client-specific title and meta description based only on verified business information. Never leave generic Grüm/customer SEO in a finished demo.
- Review copy must be a faithful paraphrase of public reviews; do not invent testimonials or quote text you cannot verify.
- Keep the existing layout and behavior intact.
- **Shared system changes are retroactive + future by default.** Any fix intended for all customers must be implemented in the shared demo layer so existing demos and future demos inherit it automatically. Only customer-specific changes belong in an individual demo folder.
- Never put Zapier webhook URLs, Google credentials or admin tokens in a customer profile or browser JavaScript.

## Shared inheritance architecture
- `demo-global.js` is the shared entry point loaded by every demo.
- It provides Blog preview EN/DE/ES/CA localization and review-card visibility/readability fixes.
- It loads `demo-system.js`, the compatibility layer that keeps personalized metadata/SEO and WEB IPAD static-eye behavior consistent across legacy, current and future demos.
- It also loads `booking-system.js`, the shared Tier 1/2/3 booking layer.
- Older profile-based demos can derive SEO from their already verified localized customer copy.
- New profiles can provide explicit `seo.en`, `seo.de`, `seo.es`, `seo.ca`; explicit customer SEO always wins.
- Legacy custom demos use a factual compatibility entry rather than generic Grüm metadata.
- Legacy/current demos without an explicit booking block inherit Tier 1 booking behavior.
- Do not fork or duplicate a shared fix inside a single new customer folder.

## Booking tiers
Tier 1:
- Date-based booking request only; customer does not choose an exact hour.
- Secure backend forwards to Zapier.
- Zapier can notify the salon and create an all-day Google Calendar event.

Tier 2:
- Adds customer email support and secure status actions (`confirm`, `reschedule`, `cancel`, `complete`).
- Zapier can send customer confirmations/reminders or WhatsApp/email flows.
- Salon still controls the exact appointment time.

Tier 3:
- Adds live available-time selection through `/api/availability`.
- Intended for real-time scheduling, staff/service duration logic and blocked slots.

A customer upgrade is primarily `booking.tier: 1` → `2` or `3`. The backend tier environment variable must be upgraded to match. See `../../BOOKING-SYSTEM.md`.

## What the template already protects
- Mobile is capped at 430px so the approved mobile animation/layout remains active on iPad.
- Web/Desktop uses the current root desktop site.
- WEB IPAD uses the full desktop layout but disables only `.hero-dog-eye` cursor-following overlays.
- Shared Blog preview EN/DE/ES/CA localization is inherited.
- Shared colored/readable review cards are inherited.
- Shared client-specific title/meta description behavior is inherited.
- Shared Tier 1/2/3 booking behavior is inherited.
- The iframe does not start until the customer/global hooks are attached, reducing race-condition bugs.
- Every wrapper is `noindex,nofollow`.
- Customer SEO/booking configuration does not modify the shared root site or `/mobile/` source.

## `profile.js` parameters
Keep every key present. Replace placeholder values only.

Required core fields:
- `name`
- `phoneDisplay`
- `phoneHref`
- `addressLine1`
- `addressLine2`
- `mapsUrl`
- `mapEmbed`
- `rating`
- `reviewCount`
- `booking.tier`
- `booking.enabled`
- `booking.apiBase`
- `seo.en`, `seo.de`, `seo.es`, `seo.ca`
- `copy.en`, `copy.de`, `copy.es`, `copy.ca`

Optional fields:
- `email`: use `null` if unverified
- `social`: use `null` if unverified

Booking rules:
- Keep `booking.enabled: false` in demos until a secure server endpoint is actually deployed and connected.
- `booking.apiBase` may contain only the public server API origin; never a Zapier hook or secret.
- Server-side tier and profile tier must match.

Each language requires:
- a client-specific SEO `title`
- a client-specific SEO `description`
- `hours`
- `aboutHero`
- `story1`
- `story2`
- exactly four `values` pairs `[heading, text]`
- at least three `reviews` pairs `[reviewer name, paraphrased review]`

## URL pattern
For a slug called `happy-dog-barcelona`:
- Mobile: `https://dropshectorernesto-lang.github.io/WEBSITE-1/demos/happy-dog-barcelona/`
- Web/Desktop: `https://dropshectorernesto-lang.github.io/WEBSITE-1/demos/happy-dog-barcelona/web/`
- WEB IPAD: `https://dropshectorernesto-lang.github.io/WEBSITE-1/demos/happy-dog-barcelona/web-ipad/`

## Final QA before calling a demo finished
- Business name is correct everywhere; no accidental `Grüm` remains where customer branding should appear.
- Maps opens the correct business/location.
- Phone/email/social are verified and clickable when supplied.
- Hours are correct in all four languages.
- Rating/review count are current enough for a demo and not fabricated.
- SEO title and description are factual, customer-specific and switch correctly in EN/DE/ES/CA.
- Review cards have colored backgrounds and readable white text.
- Blog card category/title/preview change with EN/DE/ES/CA.
- Booking form is date-based in Tier 1, Tier 2 adds email/status support, and Tier 3 shows live-time selection only when its backend is configured.
- Booking copy works in EN/DE/ES/CA.
- Mobile dog animation still works.
- WEB IPAD has static eyes; Web/Desktop keeps normal cursor-following eyes.
- Service-window/service-card pictures are unchanged.
- Carousel/gallery images are unchanged unless verified customer media was intentionally added.
- Shared fixes were made in the shared layer if they are intended for all customers.
- Git diff contains only intended demo-system/customer/docs changes and no protected files.
- GitHub Pages deployment succeeded.

See `COPY-PASTE-PROMPT.md` for the exact prompt to reuse with ChatGPT.