#!/usr/bin/env bash
set -euo pipefail

mkdir -p ex/output
npx chartli ex/data.txt -t svg -m lines -w 320 -h 120 > ex/output/chart.svg
printf 'Wrote ex/output/chart.svg\n'
