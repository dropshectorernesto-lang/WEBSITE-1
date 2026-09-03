# Website Template Knowledge

## Purpose
This repository is a reusable website template intended to be duplicated and customized for multiple service-business customers.

## Current design language
The current demo is a premium dog-grooming website with:
- warm cream/beige backgrounds
- dark green primary CTA color
- pink accent color
- condensed bold uppercase display typography
- editorial image-led hero
- three service cards
- experience/about band
- Instagram/gallery strip
- final CTA

The current customer/demo is `grüm`. Future customer sites may use the same underlying architecture with different business sectors, copy, colors and imagery.

## File responsibilities

### `site.config.js`
This is the preferred file for per-customer edits. It contains:
- `business`
- `theme`
- `layout.sectionOrder`
- `navigation`
- `hero`
- `services`
- `experience`
- `gallery`
- `finalCta`
- `booking`

### `index.html`
Contains the reusable modular HTML windows. Main sections use `data-section` attributes and are designed to be individually copied, hidden or reordered.

### `script.js`
Reads `window.SITE_CONFIG`, applies text/image bindings, builds service cards and gallery items, manages section order, booking interactions and desktop reference scaling.

### `styles.css`
Contains the measured layout geometry, desktop composition, component styling, responsive layouts and modal styling.

### `reference.css`
Contains appearance/font overrides to bring the coded layout closer to the approved visual reference.

### `/assets`
Contains images such as hero, service cards, experience, gallery, phone mockup and bottom CTA image. Keeping filenames consistent can make customer replacement faster.

## Default modular section order
`hero → services → experience → gallery → final-cta`

It can be changed in `site.config.js`:

```js
layout: {
  sectionOrder: ["hero", "services", "experience", "gallery", "final-cta"]
}
```

Removing a name hides that section. Reordering names changes the page sequence.

## Service cards
Services are generated from `services.cards` in `site.config.js`. A card can contain:

```js
{
  number: "01",
  title: "SERVICE NAME",
  descriptionHtml: "Description",
  image: "assets/service-image.jpg",
  imageAlt: "Accessible image description",
  style: "green",
  featured: false
}
```

Supported current visual styles include green, black and orange. If a different palette is required, extend the theme/styles without destroying the existing schema.

## Customer duplication checklist
For a new customer, obtain:
- company/business name
- industry
- city/service area
- primary CTA
- services
- short company/about text
- contact information
- logo or wordmark preference
- primary/secondary/accent colors
- hero image
- service images
- gallery/social images
- social profile link
- any booking link
- required legal pages/content for the target market

Then:
1. Duplicate repo.
2. Replace assets.
3. Edit `site.config.js`.
4. Render and visually QA.
5. Test buttons/forms/navigation.
6. Deploy only after approval.

## Visual QA expectations
A finished customer site should be checked for:
- correct business information
- correct images and crops
- no placeholder copy
- no demo brand remnants
- desktop reference composition
- responsive behavior
- functioning CTAs
- correct external links
- no missing assets
- no console errors
- no broken section ordering
- appropriate metadata/title/description

## Important historical lesson
A previous approach used the approved mockup itself as a flattened image with transparent clickable hit areas. That achieved exact visual similarity but made the website unsuitable as a reusable editable template. Do not return to that architecture unless the user explicitly requests a non-editable prototype. The production template must remain composed of real editable sections, text, images and controls.

## Deployment
The repository has been used with Netlify and is intended to remain simple enough for static deployment. GitHub is the source of truth for code changes. Verify the deployment is actually connected to the correct repository and branch before assuming a push is live.
