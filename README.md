# Defencify Branding and Marketing

Public static brandbook, growth asset system, and AI-generation prompt methodology for Defencify marketing and training assets.

## Pages

- `index.html` - Defencify brand guidelines, logo, color, typography, iconography, imagery, applications, and AI imagery guidance.
- `growth-asset-system.html` - Growth asset system showing model comparison, production use cases, custom iconography, and reusable output patterns.
- `b2b-website-wireframes.html` - First-pass B2B website wireframes for John review, using the approved brand system and photorealistic security imagery.

## Local Verification

```bash
npm run verify
```

The verifier checks both pages, shared navigation, the left table of contents, required image assets, model comparison cards, production output examples, and the approved campaign headline lockup.

## Local Preview

```bash
npm run serve
```

Open `http://127.0.0.1:4182/`.

## GitHub Pages

The repository deploys through `.github/workflows/pages.yml`. The workflow runs `npm run verify`, uploads the static site, and publishes the Pages artifact.

Expected GitHub Pages URL:

`https://shanegardner405-arch.github.io/defencify-branding-marketing/`

## Source Discipline

This repo is a public-safe static publication copy. Do not commit API keys, `.vercel/`, generated JSON metadata, local QA screenshots, or private client notes.
