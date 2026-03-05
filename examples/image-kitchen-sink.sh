#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

pnpm run build >/dev/null
export CHARTLI_SKIP_BUILD=1

printf '=== ASCII Line ===\n'
bash examples/image-ascii-line.sh
printf '\n=== Sparklines ===\n'
bash examples/image-sparklines.sh
printf '\n=== Horizontal Bars ===\n'
bash examples/image-horizontal-bars.sh
printf '\n=== Columns ===\n'
bash examples/image-columns.sh
printf '\n=== Heatmap ===\n'
bash examples/image-heatmap.sh
printf '\n=== Unicode Bars ===\n'
bash examples/image-unicode-bars.sh
printf '\n=== Braille ===\n'
bash examples/image-braille.sh
printf '\n=== SVG ===\n'
bash examples/image-svg.sh
