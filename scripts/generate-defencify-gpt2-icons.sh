#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$ROOT/assets/growth/gpt2-icons"
PROMPT_CONTRACT="$(cat "$ROOT/prompts/defencify-icon-generation-contract.md")"
mkdir -p "$OUT_DIR"

CLI="/Users/mr.gardner/.silvershore/defencify/bin/dgen-openai"

generate_icon() {
  local slug="$1"
  local subject="$2"
  "$CLI" \
    --model gpt-image-2 \
    --size 1024x1024 \
    --quality high \
    --format png \
    --background transparent \
    --out "$OUT_DIR/${slug}.png" \
    "${PROMPT_CONTRACT}

Specific icon request:
Generate one Defencify custom brand-set icon for: ${subject}.

Hard output constraints:
- Single centered icon only.
- Pure transparent background.
- Grey 400 #B2B2B5 structural stroke.
- Yellow 500 #FCAF32 single action accent.
- No text, no labels, no fake logo, no extra symbols.
- Match the approved custom brand-set methodology from the source files above.
- Output must look like a polished corporate SVG icon even though it is generated as PNG."
}

generate_icon "access-point" "controlled lobby access point with a doorway and checkpoint indicator"
generate_icon "camera-review" "security camera review monitor with one simple lens indicator"
generate_icon "report-writing" "incident report document with clean checklist lines and one completion check"
generate_icon "radio-check" "handheld security radio with a minimal signal mark"
generate_icon "de-escalation" "two opposing chevrons forming a calm conversation or conflict resolution mark"
generate_icon "post-orders" "post-orders clipboard or binder with simple page structure"
generate_icon "compliance" "shield check for security training compliance"
generate_icon "first-aid" "first aid cross built from geometric outline strokes"
generate_icon "evacuation" "exit doorway with directional movement chevron"
generate_icon "course-module" "graduation cap or module tile for training content"
generate_icon "lms-asset" "screen tile for LMS course content"
generate_icon "audit-trail" "document stack with a small verification mark"
