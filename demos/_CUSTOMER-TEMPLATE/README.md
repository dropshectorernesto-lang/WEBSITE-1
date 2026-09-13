# FUTURE CUSTOMER DEMO TEMPLATE

This folder is the safe source for every new customer demo.

## Use it like this
1. Copy the entire `demos/_CUSTOMER-TEMPLATE/` folder.
2. Rename the copy to the customer's URL slug, for example `happy-dog-barcelona`.
3. Edit **only** `profile.js` and `LIVE-DEMO.md` unless you have a verified reason to change something else.
4. Add the customer to `demos/README.md` and `demos/index.html` for quick access.
5. Push and verify Mobile, Web/Desktop and WEB IPAD after GitHub Pages deploys.

## Do NOT edit these when making a normal customer demo
- root website files
- `/mobile/` files
- shared service-card/service-window images
- shared CSS or animation source files
- `demo-global.js`
- `customer-profile.js`

## Permanent rules
- **Service-window/service-card pictures are OFF LIMITS. Never change them.**
- Carousel/gallery photos may only be changed when they are verified customer photos from the customer's Maps/Facebook/Instagram/site or supplied directly by the customer.
- If phone, email, social, hours, rating, reviews, or other data cannot be verified, leave that item untouched rather than inventing it.
- Customer-facing changes must exist in **EN / DE / ES / CA**.
- **SEO must always be personalized to the actual customer.** Every language needs a factual client-specific title and meta description based only on verified business information. Never leave generic Grüm/customer SEO in a finished demo.
- Review copy must be a faithful paraphrase of public reviews; do not invent testimonials or quote text you cannot verify.
- Keep the existing layout and behavior intact.

## What the template already protects
- Mobile is capped at 430px so the approved mobile animation/layout remains active on iPad.
- Web/Desktop uses the current root desktop site.
- WEB IPAD uses the full desktop layout but disables only `.hero-dog-eye` cursor-following overlays.
- `demo-global.js` automatically provides the Blog preview EN/DE/ES/CA localization fix.
- `demo-global.js` automatically provides colored review-card backgrounds/readability.
- The iframe does not start until the customer/global hooks are attached, reducing race-condition bugs.
- Every wrapper is `noindex,nofollow`.
- Customer `seo` data in `profile.js` updates the demo title and description in EN/DE/ES/CA without changing the shared root site or `/mobile/` source.

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
- `seo.en`, `seo.de`, `seo.es`, `seo.ca`
- `copy.en`, `copy.de`, `copy.es`, `copy.ca`

Optional fields:
- `email`: use `null` if unverified
- `social`: use `null` if unverified

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
- Mobile dog animation still works.
- WEB IPAD has static eyes; Web/Desktop keeps normal cursor-following eyes.
- Service-window/service-card pictures are unchanged.
- Carousel/gallery images are unchanged unless verified customer media was intentionally added.
- Git diff contains only the intended customer folder/menu changes.
- GitHub Pages deployment succeeded.

See `COPY-PASTE-PROMPT.md` for the exact prompt to reuse with ChatGPT.