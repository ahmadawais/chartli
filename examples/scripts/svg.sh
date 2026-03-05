#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

OUT_FILE="examples/output/chart.svg"

if [ "${CHARTLI_SKIP_BUILD:-0}" != "1" ]; then
	pnpm run build >/dev/null
fi
mkdir -p "$(dirname "$OUT_FILE")"
pnpm chartli examples/multi-series.txt -t svg -m lines -w 320 -h 120 \
	| sed -n '/^<?xml/,$p' >"$OUT_FILE"

printf 'Wrote %s\n' "$OUT_FILE"
