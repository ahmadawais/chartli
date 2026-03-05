#!/usr/bin/env bash
set -euo pipefail

printf '=== Core Example Set ===\n'
bash examples/kitchen-sink.sh

printf '\n=== Image-Matched Example Set ===\n'
bash examples/image-kitchen-sink.sh
