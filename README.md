# WEBSITE-1

Grüm pet spa website build based on the approved visual reference.

## Status
- Responsive static frontend
- Desktop/mobile layouts
- Booking modal and interactions
- Image assets included
- Centralized SEO metadata in `seo.config.json`
- SEO build generates canonicals, localized browser metadata, sitemap and image-alt coverage

## SEO build
Run `node scripts/build-seo.mjs` to create the deployable `_site/` directory.

The build:
- applies page titles and meta descriptions from `seo.config.json`
- keeps EN / DE / ES / CA title and description content available to the existing language switcher
- adds canonical URLs to public pages
- marks `/mobile/` copies `noindex,follow` and canonicalizes them to the matching public page
- preserves customer demo wrappers as `noindex,nofollow`
- ensures every deployed HTML `<img>` has an `alt` attribute without changing image sources
- generates `sitemap.xml` and `robots.txt`

## Redirects
`_redirects` and `netlify.toml` contain real HTTP 301 aliases for Netlify and Cloudflare Pages. GitHub Pages does not support configurable HTTP 301 responses, so those rules become active when the main site is hosted on a platform that supports server-side/static-host redirects.

## Hosting
GitHub Pages deploys the SEO-built `_site/` output from `main` for previews/demos. The repo is also ready for commercial-friendly static hosting such as Netlify or Cloudflare Pages.
