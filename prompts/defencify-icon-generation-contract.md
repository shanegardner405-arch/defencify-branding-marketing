# Defencify Icon Generation Contract

Use this block verbatim inside every icon-generation CLI prompt. The model must receive the brandbook context directly, not as a vague style reference.

## Source Of Truth

- Primary design source: `/Users/mr.gardner/Downloads/Defencify Design System (1).html`
- Brandbook source: `/Users/mr.gardner/Downloads/Brandbook_Defencify 2026.pdf`
- Live brandbook reference: `https://defencify-brandbook-fixed.vercel.app/`
- Approved icon reference image: `assets/pdf/icons-grid.png`
- Approved web design tokens: `assets/colors_and_type.css`

## Exact Brand Tokens

- Yellow 500: `#FCAF32`
- Yellow 100: `#FFF3DD`
- Yellow 700: `#C77C00`
- Grey 200: `#E2E5E7`
- Grey 400: `#B2B2B5`
- Grey 700: `#3A3F45`
- Blue 500: `#2B439B`
- Blue 900: `#0E1940`
- White: `#FFFFFF`

## Typography Context

- Display font: `Barlow`
- Body font: `Noto Sans`
- Headlines and labels: Barlow Bold, uppercase, tracking `0`
- Body/supporting text: Noto Sans regular
- Icon images must not contain text, letters, words, numbers, fake labels, or fake logos.

## Approved Icon Methodology

- Two icon systems exist:
  - Lucide for dense functional UI icons.
  - Custom brand set for marketing, decks, course landings, and section openers.
- Custom brand set rules:
  - Geometric, two-tone, expressive.
  - Yellow 500 `#FCAF32` carries the action or verb.
  - Grey 400 `#B2B2B5` holds the structure.
  - No rounded-corner cartoon styling.
  - No fills unless directly matching the approved brandbook variation system.
  - No shadows.
  - No gradients.
  - No 3D.
  - No photorealism.
  - No decorative clutter.
- Functional UI icon rules:
  - Lucide-style.
  - 24x24 design grid.
  - 1.5px to 2px stroke.
  - Outline only.
  - No fill.
  - Color follows surrounding text or uses Yellow 500 as an accent.

## Approved Brand Icon Reference Subjects

Use these as the visual grammar reference, not as a requirement to copy literally:

- Chevrons
- Swap arrows
- Check and X
- Message bubble
- Lock
- Shield user
- Shield check
- Target
- Devices
- Graduation cap
- Cloud upload
- Certificate
- Strategy
- Eye scan
- Hand block
- Document

## Logo And Shape Grammar

- Defencify identity is built from a yellow hex mark, two chevrons, and the Defencify wordmark.
- For generated icons, do not generate the Defencify wordmark or fake logo text.
- Use hex and chevron geometry only as abstract structure when useful.
- Keep the output consistent with the approved `assets/pdf/icons-grid.png` reference.

## Required Prompt Tail

The icon must look like a polished corporate brand-system icon, not a generic AI illustration. It should be usable at page scale in the Defencify brandbook next to the approved icon grid.
