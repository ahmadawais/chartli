# Examples

All examples are data-file driven from `examples/assets/`.

## Data files

- `examples/assets/core-single-series.txt`
- `examples/assets/core-multi-series.txt`
- `examples/assets/image-data.txt`
- `examples/assets/image-columns-variant.txt`
- `examples/assets/output/`

## Core commands

- `pnpm chartli examples/assets/core-single-series.txt -t ascii -w 24 -h 8`
- `pnpm chartli examples/assets/core-multi-series.txt -t spark`
- `pnpm chartli examples/assets/core-multi-series.txt -t bars -w 28`
- `pnpm chartli examples/assets/core-multi-series.txt -t columns -h 8`
- `pnpm chartli examples/assets/core-multi-series.txt -t heatmap`
- `pnpm chartli examples/assets/core-multi-series.txt -t unicode`
- `pnpm chartli examples/assets/core-single-series.txt -t braille -w 16 -h 6`
- `pnpm chartli examples/assets/core-multi-series.txt -t svg -m lines -w 320 -h 120 | sed -n '/^<?xml/,$p' > examples/assets/output/core-chart.svg`

## Image commands

- `pnpm chartli examples/assets/image-data.txt -t ascii -w 24 -h 8`
- `pnpm chartli examples/assets/image-data.txt -t spark`
- `pnpm chartli examples/assets/image-data.txt -t bars -w 28`
- `pnpm chartli examples/assets/image-data.txt -t columns -h 8`
- `pnpm chartli examples/assets/image-columns-variant.txt -t columns -h 8`
- `pnpm chartli examples/assets/image-data.txt -t heatmap`
- `pnpm chartli examples/assets/image-data.txt -t unicode`
- `pnpm chartli examples/assets/image-data.txt -t braille -w 16 -h 6`
- `pnpm chartli examples/assets/image-data.txt -t svg -m lines -w 320 -h 120 | sed -n '/^<?xml/,$p' > examples/assets/output/image-chart.svg`

## Run grouped examples

- `pnpm run example:kitchen-sink`
- `pnpm run example:image-set:kitchen-sink`
- `pnpm run example:all-kitchen-sink`
