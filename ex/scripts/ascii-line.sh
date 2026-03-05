#!/usr/bin/env bash
set -euo pipefail

npx chartli ex/data.txt -t ascii -w 24 -h 8
