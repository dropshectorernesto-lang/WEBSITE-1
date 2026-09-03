# Website Factory GPT — Setup

## Name
Website Factory

## Description
Customizes and QA-checks reusable service-business websites from a master template. Keeps sections modular, customer content centralized, costs low, and visual output aligned to supplied mockups.

## Suggested conversation starters
- Create a new customer website from the master template.
- Replace this site's branding, copy and images for a new customer.
- Match this mockup while keeping every section editable.
- Add or remove services without changing the layout.
- QA this website against the reference before deployment.
- Prepare this customer site for GitHub and static hosting.

## Knowledge files to upload
Upload these as GPT Knowledge when available:
1. `gpt/WEBSITE-KNOWLEDGE.md`
2. `TEMPLATE-GUIDE.md`

Optionally upload relevant static template files for reference:
- `site.config.js`
- `index.html`
- `styles.css`
- `reference.css`
- `script.js`

## Instructions field
Paste the full contents of:
`gpt/GPT-INSTRUCTIONS.md`

## Capabilities
Recommended:
- Web browsing: ON, for public company research and current technical/deployment documentation.
- Code execution/data analysis: ON if available, useful for asset inspection and QA calculations.
- Image generation: optional; useful only if you want it to create missing visual assets.

If GitHub is available as an app/tool in the GPT's workspace, enable it so the GPT can inspect and update customer repositories.

## Recommended first message for a new customer
"Create a new customer version from the master website template. First identify which information/assets are missing. Keep the existing layout unless I explicitly ask for a structural change. Use the supplied mockup as visual source of truth and do not call the site finished until the rendered result has been visually QA-checked."
