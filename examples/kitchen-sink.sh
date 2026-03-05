#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

pnpm run build >/dev/null
export CHARTLI_SKIP_BUILD=1

printf '=== ASCII ===\n'
bash examples/ascii.sh
printf '\n=== Spark ===\n'
bash examples/spark.sh
printf '\n=== Bars ===\n'
bash examples/bars.sh
printf '\n=== Columns ===\n'
bash examples/columns.sh
printf '\n=== Heatmap ===\n'
bash examples/heatmap.sh
printf '\n=== Unicode ===\n'
bash examples/unicode.sh
printf '\n=== Braille ===\n'
bash examples/braille.sh
printf '\n=== SVG ===\n'
bash examples/svg.sh
