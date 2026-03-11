![npx chartli](https://raw.githubusercontent.com/ahmadawais/chartli/main/.github/chartli.jpg)

# chartli

CLI for rendering charts in terminals from numeric text data. `chartli` turns plain numbers into terminal charts. ascii, spark, bars, columns, heatmap, unicode, braille, svg.


## Install

Run instantly:

```sh
npx chartli --help
```

Or install globally:

```sh
npm i -g chartli
```

## Agent skill install

Install the repository skill for agents:

```sh
npx skills add ahmadawais/chartli
```

Quick start:

```sh
npx chartli
npx chartli --help
```

## Usage

```sh
npx chartli [file] [options]
```

```text
Usage: chartli [options] [file]

Render terminal charts from numeric data

Arguments:
  file                   Input file (reads from stdin if not provided)

Options:
  -v, --version          Output the version number
  -t, --type <type>      Chart type: svg, ascii, unicode, braille, spark, bars,
                         columns, heatmap (default: "ascii")
  -w, --width <number>   Chart width
  -h, --height <number>  Chart height
  -m, --mode <mode>      SVG mode: circles or lines (default: "circles")
  --x-axis-label <label> Title to render for the x-axis
  --y-axis-label <label> Title to render for the y-axis
  --x-labels <labels>    Comma-separated labels for x-axis ticks or row labels
  --series-labels <labels>
                         Comma-separated labels for plotted series or categories
  --data-labels          Show raw values near plotted data when supported
  --first-column-x       Treat the first numeric column as x labels instead of a
                         plotted series
  --help                 Display help for command
```

## Labels and metadata

- Use `--x-axis-label` and `--y-axis-label` to add axis titles.
- Use `--x-labels` for explicit tick labels.
- Use `--series-labels` to replace generic labels like `S1` and `C1`.
- Use `--data-labels` to print raw values on or near the plotted data where the renderer supports it.
- Use `--first-column-x` when the first numeric column is a domain like `day`, `month`, or `year`.

With `--first-column-x`, chartli will:

- use the first numeric column as x-axis labels
- use the first header cell as the x-axis title when a header row exists
- use the remaining header cells as series labels
- use the second header cell as the y-axis title for common two-column data

Example:

```sh
pnpm chartli examples/assets/core-single-series.txt -t ascii -w 24 -h 8 --first-column-x --data-labels
```

```sh
pnpm chartli examples/assets/core-multi-series.txt -t columns -h 8 --first-column-x --series-labels sales,costs,profit --x-axis-label Metrics --y-axis-label Value --data-labels
```

## Labeled chart examples

### ASCII line with inferred axis labels and data labels

```sh
pnpm chartli examples/assets/weekly-signups.txt -t ascii -w 28 -h 8 --first-column-x --data-labels
```

```text
        signups
    91 │                      ●   87
       │                     91    ●
       │            73
       │             ●   68
  66.5 │   58             ●
       │    ●   49
       │42       ●
    42 │●
       └────────────────────────────
        1   2    3   4    5   6    7
                    day
```

### Columns with explicit axis titles and inferred series names

```sh
pnpm chartli examples/assets/weekly-metrics.txt -t columns -h 8 --first-column-x --x-axis-label Metrics --y-axis-label Count --data-labels
```

```text
Count
 176     29     10


  █
  █
  █
  █
  █      ▓      ▒
  █      ▓      ▒
────────────────────
visits trials  paid
      Metrics
```

### SVG with axes, x labels, and point labels

```sh
pnpm chartli examples/assets/weekly-signups.txt -t svg -m lines -w 320 -h 120 --first-column-x --data-labels | sed -n '/^<?xml/,$p' > examples/assets/output/weekly-signups-chart.svg
```

This writes `examples/assets/output/weekly-signups-chart.svg`.

## Types

- `ascii`
- `spark`
- `bars`
- `columns`
- `heatmap`
- `unicode`
- `braille`
- `svg`

## Example data files

- `examples/assets/core-single-series.txt`
- `examples/assets/core-multi-series.txt`
- `examples/assets/image-data.txt`
- `examples/assets/image-single-series.txt`
- `examples/assets/image-columns-variant.txt`
- `examples/assets/weekly-signups.txt`
- `examples/assets/weekly-metrics.txt`

## Image chart set (text diagrams)

### ASCII Line

```sh
pnpm chartli examples/assets/image-data.txt -t ascii -w 24 -h 8
```

```text
      day=●  sales=○  costs=◆  profit=◇
1.00 │                       ○
     │
     │             ◇         ◇
     │                  ◆    ●
0.50 │                  ●    ◆
     │    ◇    ◆   ●
     │         ○   ◆
0.00 │◇   ◆    ◇        ◇
     └────────────────────────
```

### Sparklines

```sh
pnpm chartli examples/assets/image-data.txt -t spark
```

```text
day    ▁▂▃▄▅▆
sales  ▁▄▂▇▅█
costs  ▁▂▄▃▆▅
profit ▁▄▂▇▂▇
```

### Horizontal Bars

```sh
pnpm chartli examples/assets/image-data.txt -t bars -w 28
```

```text
day    |███████████████████         | 0.67
sales  |▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓| 1.00
costs  |▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒             | 0.53
profit |░░░░░░░░░░░░░░░░░░░░░░░     | 0.83
```

### Columns

```sh
pnpm chartli examples/assets/image-data.txt -t columns -h 8
```

```text
         ▓
         ▓             ░
         ▓             ░
  █      ▓             ░
  █      ▓      ▒      ░
  █      ▓      ▒      ░
  █      ▓      ▒      ░
  █      ▓      ▒      ░
───────────────────────────
 day   sales  costs  profit
```

### Columns (Variant)

```sh
pnpm chartli examples/assets/image-columns-variant.txt -t columns -h 8
```

```text

         ▓             ░
  █      ▓             ░
  █      ▓             ░
  █      ▓      ▒      ░
  █      ▓      ▒      ░
  █      ▓      ▒      ░
───────────────────────────
 day   sales  costs  profit
```

### Heatmap

```sh
pnpm chartli examples/assets/image-data.txt -t heatmap
```

```text
    day sales costs profit
R01
R02 ░ ▒ ░ ▒
R03 ░ ░ ▒ ░
R04 ▒ ▓ ░ ▓
R05 ▒ ▒ ▓ ░
R06 ▓ █ ▒ ▓
```

### Unicode Bars

```sh
pnpm chartli examples/assets/image-data.txt -t unicode
```

```text
 day    sales   costs   profit
             █
           ▃ █             ▅ ▅
     ▃     █ █      ▃      █ █
    ▂█     █▆█      █▂     █ █
   ▂██   ▂ ███    ▂ ██   ▃ █ █
  ▁███   █ ███    █▁██   █ █ █
 ▁████   █▅███   ▁████   █▁█▁█
 █████   █████   █████   █████
```

### Braille

```sh
pnpm chartli examples/assets/image-data.txt -t braille -w 16 -h 6
```

```text
profit

⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠈
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠁⠀⠀⠀
```

### SVG Chart

```sh
pnpm chartli examples/assets/image-data.txt -t svg -m lines -w 320 -h 120 | sed -n '/^<?xml/,$p' > examples/assets/output/image-chart.svg
```

```text
<?xml version='1.0'?>
<svg xmlns='http://www.w3.org/2000/svg' width='650' height='120' version='1.1'>
  <polyline ... />
  <polyline ... />
  <polyline ... />
  <polyline ... />
</svg>
```

![svg](examples/assets/output/image-chart.svg)

# Examples

All examples are data-file driven from `examples/assets/`.

## Data files

- `examples/assets/core-single-series.txt`
- `examples/assets/core-multi-series.txt`
- `examples/assets/image-data.txt`
- `examples/assets/image-single-series.txt`
- `examples/assets/image-columns-variant.txt`
- `examples/assets/weekly-signups.txt`
- `examples/assets/weekly-metrics.txt`
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

## Labeled commands

- `pnpm chartli examples/assets/weekly-signups.txt -t ascii -w 28 -h 8 --first-column-x --data-labels`
- `pnpm chartli examples/assets/weekly-metrics.txt -t columns -h 8 --first-column-x --x-axis-label Metrics --y-axis-label Count --data-labels`
- `pnpm chartli examples/assets/weekly-signups.txt -t svg -m lines -w 320 -h 120 --first-column-x --data-labels | sed -n '/^<?xml/,$p' > examples/assets/output/weekly-signups-chart.svg`

## Run grouped examples

- `pnpm run example:kitchen-sink`
- `pnpm run example:image-set:kitchen-sink`
- `pnpm run example:labeled:kitchen-sink`
- `pnpm run example:all-kitchen-sink`

## Run all examples

Image-set chart run:

```sh
pnpm run example:image-set:kitchen-sink
```

Core + image run:

```sh
pnpm run example:all-kitchen-sink
```

## License

Apache-2.0 by [Ahmad Awais](https://x.com/MrAhmadAwais) built with [Command Code](https://commandcode.ai).
