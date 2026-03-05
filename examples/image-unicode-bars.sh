#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ "${CHARTLI_SKIP_BUILD:-0}" != "1" ]; then
	pnpm run build >/dev/null
fi

pnpm chartli examples/assets/image-data.txt -t unicode
