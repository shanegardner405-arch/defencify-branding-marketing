# Defencify Brandbook Page Alignment Contract

This project is the canonical Defencify brand guidelines web edition. The Brand Guidelines page and the Growth Asset System page must always be treated as one aligned two-page project, not as separate standalone exports.

## Canonical Project Root

`/Users/mr.gardner/Repos/defencify-branding-marketing`

## Required Pages

- `index.html`: Brand Guidelines
- `growth-asset-system.html`: Growth Asset System

## Alignment Rules

- Both pages must include `assets/growth-system.css`.
- Both pages must use the shared top page navigation block with links to `index.html` and `growth-asset-system.html`.
- Both pages must use a left-side table of contents via `.bb-left-toc`.
- The Brand Guidelines page must mark `Brand guidelines` as the active top page.
- The Growth Asset System page must mark `Growth asset system` as the active top page.
- The Growth Asset System page must include the model comparison section at `#model-comparison`.
- The Growth Asset System page must show six model output cards: three photoreal scene outputs and three access-control icon outputs.
- The Growth Asset System page must include `#production-system` with seven production output examples from one source brief.
- The Growth Asset System page must link to `prompts/defencify-model-comparison-methodology.md`.
- Prompt methodology, image assets, and generated model outputs must live under this canonical project root before deployment.
- `brandbook-manifest.json` must list both pages, shared resources, prompt contracts, brand tokens, and generated model-comparison assets.
- Vercel deployment must run from this canonical project root, not from any manual output or staging folder.

## Required Verification

Run this before any deployment:

```bash
node scripts/verify-brandbook-page-alignment.mjs
node scripts/compare-vercel-alignment.mjs
```

The local verifier must pass before production deploy. The Vercel comparison should pass after deploy, and should be used whenever the live alias might have drifted from the canonical source.

Preferred deploy command:

```bash
npm run deploy:verified
```
