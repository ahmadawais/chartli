#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ "${CHARTLI_SKIP_BUILD:-0}" != "1" ]; then
	pnpm run build >/dev/null
fi

mkdir -p examples/assets/output
pnpm chartli examples/assets/core-multi-series.txt -t svg -m lines -w 320 -h 120 \
	| sed -n '/^<?xml/,$p' > examples/assets/output/core-chart.svg
printf 'Wrote examples/assets/output/core-chart.svg\n'
