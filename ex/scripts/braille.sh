#!/usr/bin/env bash
set -euo pipefail

npx chartli ex/data.txt -t braille -w 16 -h 6
