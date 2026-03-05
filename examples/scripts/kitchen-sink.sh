#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$ROOT_DIR"
pnpm run build >/dev/null
export CHARTLI_SKIP_BUILD=1

printf '=== ASCII ===\n'
bash "$SCRIPT_DIR/ascii.sh"
printf '\n=== Spark ===\n'
bash "$SCRIPT_DIR/spark.sh"
printf '\n=== Bars ===\n'
bash "$SCRIPT_DIR/bars.sh"
printf '\n=== Columns ===\n'
bash "$SCRIPT_DIR/columns.sh"
printf '\n=== Heatmap ===\n'
bash "$SCRIPT_DIR/heatmap.sh"
printf '\n=== Unicode ===\n'
bash "$SCRIPT_DIR/unicode.sh"
printf '\n=== Braille ===\n'
bash "$SCRIPT_DIR/braille.sh"
printf '\n=== SVG ===\n'
bash "$SCRIPT_DIR/svg.sh"
