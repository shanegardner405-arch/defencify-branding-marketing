#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$ROOT/assets/growth/generated-icons-pro"
PROMPT_CONTRACT="$(cat "$ROOT/prompts/defencify-icon-generation-contract.md")"
CLI="/Users/mr.gardner/.silvershore/defencify/bin/dgen-gemini"

mkdir -p "$OUT_DIR"

generate_icon() {
  local slug="$1"
  local subject="$2"
  "$CLI" \
    --model gemini-3-pro-image-preview \
    --out "$OUT_DIR/${slug}.png" \
    "${PROMPT_CONTRACT}

Specific icon request:
Generate one Defencify custom brand-set icon for: ${subject}.

Hard output constraints:
- Single centered icon only.
- Pure white or transparent background.
- Grey 400 #B2B2B5 structural stroke.
- Yellow 500 #FCAF32 single action accent.
- No text, no labels, no fake logo, no extra symbols.
- Match the approved custom brand-set methodology from the source files above."
}

generate_icon "access-point" "controlled lobby access point with doorway and checkpoint indicator"
generate_icon "camera-review" "security camera review monitor with one simple lens indicator"
generate_icon "report-writing" "incident report document with clean checklist lines and one completion check"
generate_icon "radio-check" "handheld security radio with a minimal signal mark"
generate_icon "de-escalation" "de-escalation and conflict resolution using two opposing chevrons forming a calm exchange"
generate_icon "post-orders" "post-orders clipboard or binder with simple page structure"
generate_icon "compliance" "compliance shield with a simple verification check"
generate_icon "first-aid" "first aid cross built from geometric outline strokes"
generate_icon "evacuation" "exit doorway with directional movement chevron"
generate_icon "course-module" "course module tile with a simple graduation cap shape"
generate_icon "lms-asset" "screen tile for LMS course content"
generate_icon "audit-trail" "document stack with a small verification mark for audit trail"
