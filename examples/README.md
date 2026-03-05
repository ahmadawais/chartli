# Examples

All runnable example scripts are flat in this folder.

## Assets

Data and generated files live in `examples/assets/`:

- `examples/assets/core-multi-series.txt`
- `examples/assets/core-single-series.txt`
- `examples/assets/image-data.txt`
- `examples/assets/image-single-series.txt`
- `examples/assets/output/`

## Core examples

- `examples/ascii.sh`
- `examples/spark.sh`
- `examples/bars.sh`
- `examples/columns.sh`
- `examples/heatmap.sh`
- `examples/unicode.sh`
- `examples/braille.sh`
- `examples/svg.sh`
- `examples/kitchen-sink.sh`

## Image-matched examples

- `examples/image-ascii-line.sh`
- `examples/image-sparklines.sh`
- `examples/image-horizontal-bars.sh`
- `examples/image-columns.sh`
- `examples/image-heatmap.sh`
- `examples/image-unicode-bars.sh`
- `examples/image-braille.sh`
- `examples/image-svg.sh`
- `examples/image-kitchen-sink.sh`

## Run commands

Run core set:

```sh
pnpm run example:kitchen-sink
```

Run image set:

```sh
pnpm run example:image-set:kitchen-sink
```

Run both sets:

```sh
pnpm run example:all-kitchen-sink
```
