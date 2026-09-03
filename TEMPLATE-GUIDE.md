# Reusing this website for a new customer

This repository is now a reusable service-business template. The visual layout lives in `index.html`, `styles.css`, and `reference.css`. Customer-specific content lives in **`site.config.js`**.

## Fastest workflow for Customer B

1. Duplicate/fork this repository.
2. Open `site.config.js`.
3. Change the business name, page title, description and Instagram URL.
4. Change the theme colors under `theme`.
5. Edit the hero text and buttons.
6. Replace the service cards in the `services.cards` array.
7. Replace the About/Experience content.
8. Replace gallery images.
9. Replace final CTA text and image.
10. Replace files inside `/assets` with the new customer's images.

## Whole sections are modular

The page is split into independent windows in `index.html`:

- `data-section="hero"`
- `data-section="services"`
- `data-section="experience"`
- `data-section="gallery"`
- `data-section="final-cta"`

You can copy/paste any whole section block into another template.

### Reorder or hide windows without touching HTML

In `site.config.js`:

```js
layout: {
  sectionOrder: ["hero", "services", "experience", "gallery", "final-cta"]
}
```

Change the order to rearrange the site. Remove a section name to hide that window for a customer.

Example:

```js
layout: {
  sectionOrder: ["hero", "experience", "services", "final-cta"]
}
```

This removes the gallery and places About before Services.

## Service cards

Add, remove or reorder objects inside `services.cards` in `site.config.js`.

Each card supports:

```js
{
  number: "01",
  title: "SERVICE NAME",
  descriptionHtml: "Short description<br>with optional line breaks.",
  image: "assets/service-image.jpg",
  imageAlt: "Description of image",
  style: "green", // green, black or orange
  featured: false
}
```

## Files you usually should NOT need to edit per customer

- `script.js` — template logic and interactions
- `styles.css` — layout geometry
- `reference.css` — visual styling/font overrides
- `netlify.toml` — hosting config

## Recommended customer folder workflow

Keep the same asset filenames when possible. Then you can replace images without changing code at all. For example, replace `assets/hero-dog.jpg` with the new customer's hero image while keeping the filename.
