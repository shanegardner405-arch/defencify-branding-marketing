#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$ROOT/assets/growth/model-comparison"
PROMPT_METHODOLOGY="$(cat "$ROOT/prompts/defencify-model-comparison-methodology.md")"
OPENAI_CLI="chatgpt-image2"
GEMINI_CLI="/Users/mr.gardner/.silvershore/defencify/bin/dgen-gemini"
RUN_LOG="$OUT_DIR/model-comparison-run.log"

mkdir -p "$OUT_DIR"
: > "$RUN_LOG"

run_step() {
  local label="$1"
  shift
  echo "RUN $label" | tee -a "$RUN_LOG"
  if "$@" 2>&1 | tee -a "$RUN_LOG"; then
    echo "PASS $label" | tee -a "$RUN_LOG"
  else
    local code=$?
    echo "FAIL $label exit=$code" | tee -a "$RUN_LOG"
  fi
}

PHOTOREAL_REQUEST="${PROMPT_METHODOLOGY}

Run the Photoreal Security Scene Brief exactly. Return one final image only."

ICON_REQUEST="${PROMPT_METHODOLOGY}

Run the Icon Brief exactly. Return one final image only."

run_gpt_image_2() {
  local kind="$1"
  local prompt="$2"
  local out="$OUT_DIR/gpt-image-2-${kind}.png"
  local size="1536x1024"
  local background="opaque"
  if [[ "$kind" == *"icon"* ]]; then
    size="1024x1024"
    background="opaque"
  fi
  "$OPENAI_CLI" \
    --model gpt-image-2 \
    --size "$size" \
    --quality high \
    --format png \
    --background "$background" \
    --out "$out" \
    "$prompt"
}

run_nano_pro() {
  local kind="$1"
  local prompt="$2"
  "$GEMINI_CLI" \
    --model gemini-3-pro-image-preview \
    --out "$OUT_DIR/nano-banana-pro-${kind}.png" \
    "$prompt"
}

run_nano_standard() {
  local kind="$1"
  local prompt="$2"
  "$GEMINI_CLI" \
    --model gemini-2.5-flash-image \
    --out "$OUT_DIR/nano-banana-standard-${kind}.png" \
    "$prompt"
}

run_step "gpt-image-2 photoreal-security-lobby" run_gpt_image_2 "photoreal-security-lobby" "$PHOTOREAL_REQUEST"
run_step "nano-banana-pro photoreal-security-lobby" run_nano_pro "photoreal-security-lobby" "$PHOTOREAL_REQUEST"
run_step "nano-banana-standard photoreal-security-lobby" run_nano_standard "photoreal-security-lobby" "$PHOTOREAL_REQUEST"

run_step "gpt-image-2 access-control-icon" run_gpt_image_2 "access-control-icon" "$ICON_REQUEST"
run_step "nano-banana-pro access-control-icon" run_nano_pro "access-control-icon" "$ICON_REQUEST"
run_step "nano-banana-standard access-control-icon" run_nano_standard "access-control-icon" "$ICON_REQUEST"
