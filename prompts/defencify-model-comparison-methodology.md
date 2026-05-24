# Defencify Model Comparison Prompt Methodology

Use this prompt methodology for every model-comparison output. The goal is not to make three unrelated assets. The goal is to run the same Defencify-approved creative brief through each model so the page can show where each model is strongest, where it falls short, and which work should route to which CLI.

## Source Of Truth

- Primary design source: `/Users/mr.gardner/Downloads/Defencify Design System (1).html`
- Brandbook source: `/Users/mr.gardner/Downloads/Brandbook_Defencify 2026.pdf`
- Live brandbook reference: `https://defencify-brandbook-fixed.vercel.app/`
- Approved icon reference image: `assets/pdf/icons-grid.png`
- Approved web design tokens: `assets/colors_and_type.css`
- Defencify image-generation substrate: `/Users/mr.gardner/.silvershore/defencify/brand-context.md`

## Exact Brand Tokens

- Yellow 500: `#FCAF32`
- Yellow 100: `#FFF3DD`
- Yellow 700: `#C77C00`
- Grey 200: `#E2E5E7`
- Grey 400: `#B2B2B5`
- Grey 700: `#4F575C`
- Charcoal: `#2C2F31`
- Blue 500: `#2B439B`
- Blue 900: `#0E1940`
- White: `#FFFFFF`

## Typography And Logo Rules

- Display font: `Barlow`
- Body font: `Noto Sans`
- Image text, when requested: `Barlow Bold UPPERCASE`, clean spacing, legible at small size.
- Approved campaign headline lockup: two stacked uppercase lines in `Barlow Black` or `Barlow 900`; tracking `0`; line height `0.92` to `0.96`; first line Grey 700 `#4F575C`; second line Yellow 500 `#FCAF32`. Example: `TRAIN EVERY GUARD.` over `SET THE STANDARD.`
- Do not generate a fake Defencify wordmark.
- Do not invent badges, slogans, icons, seals, or fake brand marks.
- If a logo is needed, use abstract hex and chevron geometry rather than fake text.

## Photoreal Security Scene Brief

Generate a photorealistic commercial security training image for Defencify.

- Subject: one approachable professional security officer in a modern dark navy uniform, mid-shift, checking a visitor credential at a clean commercial lobby security desk.
- Environment: modern commercial lobby, glass facade, neutral palette, polished floor, indoor plant, soft monitor bank out of focus.
- Lighting: natural daylight through office windows, soft realistic shadows, no studio flash.
- Composition: landscape 16:9, subject in the right third, generous negative space on the left for a Defencify course or campaign headline.
- Brand accents: subtle `#FCAF32` yellow accent on a small lanyard tag, folder tab, or environmental sign shape. Supporting neutrals should stay near `#E2E5E7`, `#B2B2B5`, `#4F575C`, and white.
- Quality bar: real commercial photography, natural skin texture, current-decade uniform, credible workplace posture.
- Rejections: NOT military-aggressive, NOT tactical-gear-overload, NOT sci-fi, NOT holograms, NOT studio glamour, NOT stock-photo thumbs-up, NOT plastic skin, NOT distorted hands, NOT fake readable logo text.

## Icon Brief

Generate one custom Defencify brand-system icon for an access-control checkpoint.

- Subject: controlled lobby access point with doorway, credential checkpoint, and one directional chevron.
- Icon system: 24x24 design grid, 1.5px to 2px stroke weight, outline only, no fills, no shadows, no gradients.
- Color: Grey 400 `#B2B2B5` for structure and Yellow 500 `#FCAF32` for the action accent.
- Background: pure white or transparent.
- Composition: single centered icon only.
- Rejections: no text, no labels, no fake logo, no extra decorative objects, no 3D, no photorealism, no cartoon mascot styling.

## Model Routing Notes

- GPT Image 2 via `chatgpt-image2`: strongest for versatile campaign graphics, embedded type, and mixed design/photoreal tasks. Use when text-bearing visuals or highly controlled commercial compositions are needed.
- Nano Banana Pro via `dgen-gemini --model gemini-3-pro-image-preview`: strongest for photorealistic editorial/security scenes, real light, real space, and natural depth of field.
- Nano Banana standard via `dgen-gemini --model gemini-2.5-flash-image`: strongest for cheap flat-vector batches and simple icon trials. Do not use as the primary photoreal security photo model.

## Required Evaluation Lens

Evaluate each output on:

- Brand fidelity: palette, tone, Defencify methodology.
- Photorealism: natural light, skin, hands, environment, realism.
- Icon discipline: 24x24 grid feeling, two-color restraint, no clutter.
- Production readiness: whether the asset could appear in a client-facing course, campaign, or internal document without obvious AI artifacts.
