# Defencify Brandbook V1 — Component Extraction Index

**Canonical location:** `/Users/mr.gardner/Desktop/Claude Code/SilverShore Partners/_clients/Defencify/specs/brandbook-v3-web-edition/`
**Live URL (always in sync via `sync.sh`):** https://defencify-brandbook-fixed.vercel.app
**Source of truth:** Clementina Villarroel · Kajae · `Brandbook_Defencify 2026.pdf` (May 21 2026)
**Web edition author:** Shane Gardner · SilverShore · Defencify Design System
**Version:** V1 · May 22, 2026

---

## Purpose

This file is the **extraction manifest** for Dexter (any future Claude Code session). When generating any Defencify digital asset (email, slide, banner, landing page, social post, course UI), do NOT re-derive brand elements. Pull directly from the paths below.

If a needed component is missing from this list, extract it once from the canonical PDF (`~/Downloads/Brandbook_Defencify 2026.pdf`) using the `extract.py` recipe in this directory and add it to the index before using.

---

## 1. Logos — `assets/pdf/`

| File | Use | Width × Height |
|---|---|---|
| `defencify-logo.png` | Primary lockup (full color, with TRAINING band). Default for any Defencify-branded asset. | 277 × 68 |
| `defencify-mark.jpeg` | Hex + chevron mark only (no wordmark). For favicons, badges, avatars. | 200 × 200 |
| `pdf/logo-plain.png` | DEFENCIFY (clean, no TRAINING band). Use when "Defencify" wordmark stands alone. | 1240 × 440 |
| `pdf/logo-security-jobs.png` | DEFENCIFY SECURITY JOBS sub-mark | 1240 × 440 |
| `pdf/logo-advanced-competencies.png` | DEFENCIFY ADVANCED COMPETENCIES sub-mark | 1240 × 440 |
| `pdf/logo-academy.png` | DEFENCIFY ACADEMY sub-mark (with ELITE GUARD TRAINING band) | 1240 × 440 |

**Logo rules** (from Brandbook p7):
- Use on white surfaces (primary)
- On grey/dark navy: put colored logo on a white inset card (do NOT invert)
- Never use on yellow background
- Never distort, disassemble, warp, or rotate
- Minimum size: 100px wide
- Clear space: 1× hex height on all sides

---

## 2. Icons — `assets/pdf/icons-grid.png` (composite) + `assets/icons/` (Lucide stand-ins, deprecated)

**Canonical:** the 16 custom icons designed by Kajae for Defencify (Brandbook p15). Extract as a single composite reference image: `assets/pdf/icons-grid.png` (1900 × 1650). For per-icon use, crop from the composite or re-extract from PDF p15 grid coordinates.

**Icon grid contents** (left-to-right, top-to-bottom):

| Row | Cell 1 | Cell 2 | Cell 3 | Cell 4 |
|---|---|---|---|---|
| 1 | Chevron arrow | Swap arrows | Check + X | Message bubble |
| 2 | Lock | Shield + user | Shield + check | Target + arrow |
| 3 | Devices | Graduation cap | Cloud upload | Certificate |
| 4 | Strategy (xs/arrows/o) | Eye scan (corners) | Hand-block + X | Document |

**Color variations** (3 treatments, from Brandbook p15, extracted to `assets/pdf/icons-color-variations.png`):
- Outline on white: grey stroke + yellow inner accents
- Reverse on Yellow 500: white stroke on yellow circle
- Reverse on Grey 700: white stroke on dark grey circle

**Lucide fallback** (`assets/icons/*.svg`): kept ONLY as a placeholder library. **Do not use in net-new assets.** Replace any Lucide reference with the Kajae custom icon set above.

**Specs:**
- 24×24px grid
- 1.5–2px stroke weight
- Color: surrounding text color OR Yellow 500 accent
- Never inline-edit a Kajae icon to add brand color

### 2a. Defencify training module icons (extension set, AI-generated 2026-05-23)

8 additional single-subject icons extending Kajae's 16-icon library with security-training-specific marks. Same brand spec (24x24, 2px stroke, outline only, Yellow 500, white background). Pull directly when needed.

| File | Subject | Use |
|---|---|---|
| `assets/cli-tests/icon-radio.png` | Two-way radio / walkie-talkie | Communication module |
| `assets/cli-tests/icon-flashlight.png` | Tactical flashlight with beam | Patrol equipment |
| `assets/cli-tests/icon-firstaid.png` | First aid kit with cross | Emergency response |
| `assets/cli-tests/icon-fire-extinguisher.png` | Fire extinguisher | Fire safety |
| `assets/cli-tests/icon-cctv-camera.png` | Dome CCTV camera | Surveillance training |
| `assets/cli-tests/icon-patrol-vehicle.png` | Security SUV side profile with light bar | Mobile security |
| `assets/cli-tests/icon-keys.png` | Keyring with two keys | Access control |
| `assets/cli-tests/icon-warning-triangle.png` | Hazard triangle with exclamation | Hazard awareness |

Reproduction method: brandbook chapter 07 prompting framework + the explicit icon-spec line ("24x24 design grid, 2px stroke, outline only, no fills, no shadows, no gradients, pure white background, yellow #FCAF32"). Any of the 3 documented tools (ChatGPT, Nano Banana standard, Nano Banana Pro) produces visually-compatible output.

---

## 3. Colors — defined in `assets/brandbook.css` `:root` + `assets/pdf-shell.css`

### Yellow scale
| Token | Hex | RGB | CMYK | PMS | Use |
|---|---|---|---|---|---|
| Yellow 100 (tint) | `#FFF3DD` | 255/243/222 | 0/3/13/0 | P 1-3 C | Accent panels, header backgrounds, highlighted course blocks |
| **Yellow 500 (base)** | `#FCAF32` | 252/175/50 | 0/35/91/0 | P 14-7 C | Primary brand yellow. Interface focal points, category badges, primary layout blocks |
| Yellow 700 (shade) | `#C77C00` | 199/123/0 | 20/56/100/4 | P 24-16 C | Active states for yellow components, heavy illustration borders |

### Grey scale
| Token | Hex | Use |
|---|---|---|
| Grey 200 (tint) `#E2E5E7` | Structural dividers, card borders |
| Grey 400 (base) `#B2B2B5` | Disabled, secondary divider |
| **Grey 700 (base) `#4F575C`** | Core dark grey. Body copy, captions, headings on white (per PDF p3, p6, p9 — all chapter h1s use Grey 700, NOT Blue 900) |

### Blue scale (accent only, never primary)
| Token | Hex | Use |
|---|---|---|
| Blue 100 (tint) `#E8EDFB` | Informational alerts, hover states |
| Blue 500 (base) `#2B439B` | Inline hyperlinks, success indicators |
| Blue 900 (shade) `#0E1940` | Deep contrast nav, high-priority action text. Register Now button background. Never the default heading color. |

### White / Black
- White: `#FFFFFF`
- Charcoal (for h1 headings on white): `#2C2F31` (defined in `pdf-shell.css` as `--pdf-charcoal`)

### Surface tokens (web edition only, in `pdf-shell.css`)
- `--pdf-bg`: white page background
- `--pdf-ink`: `#4F575C` body color
- `--pdf-charcoal`: `#2C2F31` headlines
- `--pdf-yellow`: `#FCAF32`
- `--pdf-grey-page`: `#4F575C` (Contents page dark background)
- `--pdf-navy`: `#0E1940` (Register Now button)

---

## 4. Typography

### Fonts (Google Fonts)
- **Barlow** — Display (headlines, subheads, buttons, numerals). Weights: Light 300, Bold 700.
- **Noto Sans** — Body copy. Weights: Light 300, Bold 700.

### Hierarchy (from Brandbook p13)
| Role | Size | Family | Weight | Transform |
|---|---|---|---|---|
| H1 Headline | 72px | Barlow Bold | 700 | UPPERCASE |
| H2 Section | 35px | Barlow Bold | 700 | UPPERCASE |
| P. Large (lede) | 24px | Noto Sans Light | 300 | Sentence case |
| Paragraph (body) | 16px / 1.7 leading | Noto Sans | 400 | Sentence case |
| Legal / Footer | 13px | Noto Sans | 400 | Sentence case |
| Buttons | 25px hero / 14px UI | Barlow Bold | 700 | UPPERCASE |

### Color rules
- All h1/h2 on white: **Grey 700 (`#4F575C`) or Charcoal (`#2C2F31`)** — NOT Blue 900.
- Word-accent emphasis in h1 ("ABOUT **US**", "THE **MISSION**"): emphasized word in Yellow 500.

---

## 5. Buttons (Brandbook p13)

| Variant | Class | Background | Text | Border | Use |
|---|---|---|---|---|---|
| Primary | `.bb-button.bb-button--primary` | Yellow 500 | Charcoal | Yellow 500 | Default CTA ("Begin") |
| **Navy** | `.bb-button.bb-button--navy` | Blue 900 | White | Blue 900 | Strong CTA ("Register Now") |
| Ghost | `.bb-button.bb-button--ghost` | Transparent | Blue 900 | Blue 900 1.5px | Secondary ("Sign In") |
| Large | add `.bb-button--lg` | (size modifier) | | | Increases padding |

All buttons: pill-shape (border-radius: 999px), Barlow Bold UPPERCASE.

---

## 6. Supporting element — Chevron geometry (Brandbook p16, NEW v3)

The chevron from the Defencify mark is the canonical supporting graphic. Two applications:

1. **Layout framing arrow** — `assets/pdf/chevron-layout-framing.png`
   - Used at 100% opacity as sharp accent edge, bullet point, or section divider
   - Inline implementations: `.bb-chev`, `.bb-chev-bullet` (in `brandbook.css`)
   - Asset: `assets/chevron-amber.svg` (single chevron, yellow fill)

2. **Asymmetric framing** — `assets/pdf/chevron-asymmetric-framing.png`
   - Yellow chevrons slice into dark navy field to frame focal copy
   - Used for slide section openers, mission statement plates, business card mockups

---

## 7. Imagery — `assets/pdf/imagery-*.jpeg` (8 photos)

| File | Subject | Aspect |
|---|---|---|
| `imagery-officer-radio.jpeg` | On-duty officer with radio (golden hour) | 4:5 portrait |
| `imagery-officer-square.jpeg` | Officer back, SECURITY jacket | Square |
| `imagery-officer-portrait.jpeg` | Headshot, uniform detail | Portrait |
| `imagery-officer-tall.jpeg` | Full-body portrait | 2:3 tall |
| `imagery-team.jpeg` | Team of officers | Landscape |
| `imagery-team-2.jpeg` | Team alternate | Landscape |
| `imagery-training-group.jpeg` | Classroom training scene | Landscape |
| `imagery-uniform-detail.jpeg` | Uniform/badge close-up | Portrait |

**Selection rules** (per Brandbook p18):
- Real officers, real environments. No studio glamour.
- Natural light, mid-shift moments.
- No AI-generated imagery.
- Avoid stock cliches and anything that softens the security context.

---

## 8. Page templates (web edition rhythm — mirrors PDF page types)

Three layout shells defined in `assets/pdf-shell.css`:

| Template | Class | Use |
|---|---|---|
| **Yellow opener** | `.pdf-divider` | Full-bleed Yellow 500 page with section number + name flush bottom-right ("01. LOGO", "02. COLOR", etc.). Used between chapters. |
| **Dark grey divider** | `.pdf-contents` | Full-bleed Grey 700 page. Currently used only for Contents page (huge white "CONTENTS" left + yellow-underlined section list right). |
| **White chapter** | `.bb-block.pdf-chapter` | Default content page. Charcoal Barlow Bold top-left title + Yellow 500 number top-right + full-width yellow hairline rule + body content. |

Chapter head wrapper: `.pdf-chapter-head` (grid: title left, number right, yellow rule bottom).

---

## 9. Quick extraction recipes

### Pull just the primary logo for an email signature
```html
<img src="https://defencify-brandbook-fixed.vercel.app/assets/defencify-logo.png" alt="Defencify Training" width="160" />
```
Or local file: `assets/defencify-logo.png`

### Pull a color palette block for a slide
```css
:root {
  --df-yellow: #FCAF32;
  --df-grey-ink: #4F575C;
  --df-charcoal: #2C2F31;
  --df-navy: #0E1940;
}
```

### Pull a Primary CTA button
```html
<button style="background:#FCAF32;color:#2C2F31;font-family:Barlow,sans-serif;font-weight:700;text-transform:uppercase;padding:14px 28px;border-radius:999px;border:none;cursor:pointer">Begin</button>
```

### Pull a Navy "Register Now" button (Defencify p13 spec)
```html
<button style="background:#0E1940;color:#fff;font-family:Barlow,sans-serif;font-weight:700;text-transform:uppercase;padding:14px 28px;border-radius:999px;border:none;cursor:pointer">Register Now</button>
```

### Pull a section opener (yellow page) for a slide deck
```html
<section style="background:#FCAF32;min-height:100vh;display:flex;align-items:flex-end;justify-content:flex-end;padding:80px">
  <div style="font-family:Barlow,sans-serif;font-weight:800;font-size:96px;text-transform:uppercase;text-align:right">
    <span style="color:#2C2F31">01.</span>
    <span style="color:#fff">LOGO</span>
  </div>
</section>
```

---

## 10. Sync workflow

**Local files are the canonical source.** Vercel deploy mirrors local. Use `sync.sh` in this directory to push local changes to prod.

```bash
cd "/Users/mr.gardner/Desktop/Claude Code/SilverShore Partners/_clients/Defencify/specs/brandbook-v3-web-edition"
./sync.sh
```

The script: hydrates iCloud stubs via `brctl download`, mirrors local→`/tmp/defencify-brandbook-shell`, runs `vercel --prod --yes` against the linked `defencify-brandbook-fixed` project. Result: deployed URL matches local within ~60s.

**Sync check:**
```bash
shasum -a 256 index.html | cut -c1-12
curl -s https://defencify-brandbook-fixed.vercel.app/ | shasum -a 256 | cut -c1-12
```
Hashes match → in sync. Drift → re-run `./sync.sh`.

---

## 11. Dexter usage protocol

Whenever a Defencify deliverable is being generated (email, doc, slide, landing page, social asset, course UI mock):

1. **Read this file first.** Do not re-derive brand assets from memory.
2. **Pull from `assets/`** by local path or live URL. Never hand-trace logos, icons, or chevrons.
3. **Respect logo rules** (no inversion, no rotation, no yellow-bg use, 100px minimum, 1× hex clear space).
4. **Use Grey 700 / Charcoal for headings on white** — never Blue 900 (Blue 900 is reserved for "Register Now" CTA + deep contrast nav).
5. **Use Yellow word-accent emphasis** for paired words in h1s ("ABOUT **US**", "TRAIN EVERY GUARD. **SET THE STANDARD.**").
6. **Iconography**: pull from `assets/pdf/icons-grid.png` (Kajae custom set). Lucide is deprecated and present only as fallback in `assets/icons/`.
7. **If you create a new reusable component** (button variant, badge style, icon variant), add it to this file AND to `assets/pdf-shell.css` so it's permanently available to future sessions.

---

## 12. File manifest snapshot

Run from this directory:
```bash
find assets -type f \( -name '*.png' -o -name '*.jpeg' -o -name '*.svg' -o -name '*.css' \) | sort
```

Current count: 54 files (21 PDF extracts, 24 Lucide icons, 4 standalone logos, 4 CSS files, 1 hexagon SVG).
