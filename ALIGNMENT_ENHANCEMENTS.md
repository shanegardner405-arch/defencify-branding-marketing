# Defencify Two-Page Alignment And Demonstration Enhancements

## Current Alignment State

The canonical brandbook project now has two aligned pages:

- Brand Guidelines at `/`
- Growth Asset System at `/growth-asset-system`

Both pages share the same navigation shell, left table of contents, Defencify logo assets, brand CSS, growth CSS, deployment project binding, and source-resource contract.

## Alignment Enhancements To Add Next

1. Add a shared `brandbook-manifest.json`.
   This should list every canonical token, logo, source file, prompt contract, model asset, and generated-output family. Both pages should reference this manifest so future audits can compare a single machine-readable source of truth.

2. Add a predeploy command.
   Vercel should not deploy unless `node scripts/verify-brandbook-page-alignment.mjs` and `node scripts/compare-vercel-alignment.mjs` pass locally. The current static project has no build step, so the best next step is a `package.json` with `verify`, `audit:live`, and `deploy:verified` scripts.

3. Add a source-trace drawer on both pages.
   The Brand Guidelines page should show which source assets define identity. The Growth Asset System page should show which prompt contract and model CLI generated each output. This makes provenance visible to a client instead of hidden in local folders.

4. Add page-level resource parity indicators.
   Each page should show a compact "Using same source system" panel that confirms: logo, type, palette, icon rules, imagery rules, and prompt methodology.

## Richer Digital Asset Demonstrations To Add

1. Component-to-output production matrix.
   Show how one approved design-system component turns into a course hero, LinkedIn post, LMS card, SOP header, sales one-sheet block, and email banner. This would demonstrate consistency across output types, not just image quality.

2. Before and after stock-photo replacement.
   Show a generic stock-photo placeholder beside GPT Image 2 and Nano Banana Pro outputs generated from the brandbook prompt. Include the reason each generated image is safer, more customizable, and more brand-aligned.

3. Prompt-to-page trace.
   Add a visual prompt card under each generated asset showing the exact tokens and constraints that shaped the output: `#FCAF32`, `#B2B2B5`, Barlow, Noto Sans, no fake wordmark, no tactical tone, natural light, and approved icon grammar.

4. Multi-channel campaign kit.
   Use the same source prompt to generate and display: LinkedIn feed post, Instagram carousel cover, LMS module tile, email banner, PDF cover, internal SOP header, and sales enablement card. This will make the scalability argument much stronger.

5. QA scorecards for model routing.
   Each model output should get a compact scorecard: brand fidelity, photorealism, prompt compliance, text reliability, icon discipline, and production readiness. This would make the routing logic objective.

6. Approved versus candidate icon system.
   Show the brandbook icon grid, generated candidates, rejected candidates, and cleaned final vector candidates. This demonstrates that generation is the exploration layer, while the brandbook remains the approval layer.

7. Downloadable asset family.
   Add a small section that packages a generated campaign family as usable outputs: square, landscape, story, LMS card, and doc header. This demonstrates productivity and scale more concretely than isolated examples.

## Recommended Next Build

Build a new section after `Model output comparison` called `Production system demonstration`.

It should use one Defencify source brief and show seven aligned outputs:

- Course module hero
- LMS tile
- LinkedIn post
- Instagram carousel cover
- Sales one-sheet header
- Internal SOP header
- Email banner

Each output should carry visible source trace: token set, component pattern, model used, and QA status.
