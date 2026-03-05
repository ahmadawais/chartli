#!/usr/bin/env bash
set -euo pipefail

printf '=== ASCII Line ===\n'
bash ex/scripts/ascii-line.sh
printf '\n=== Sparklines ===\n'
bash ex/scripts/sparklines.sh
printf '\n=== Horizontal Bars ===\n'
bash ex/scripts/horizontal-bars.sh
printf '\n=== Columns ===\n'
bash ex/scripts/columns.sh
printf '\n=== Heatmap ===\n'
bash ex/scripts/heatmap.sh
printf '\n=== Unicode Bars ===\n'
bash ex/scripts/unicode-bars.sh
printf '\n=== Braille ===\n'
bash ex/scripts/braille.sh
printf '\n=== SVG ===\n'
bash ex/scripts/svg.sh
