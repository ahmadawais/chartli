---
name: chartli
description: Install and use chartli to render terminal charts from numeric text files or stdin.
---

# chartli Skill

Use this skill when an agent needs to visualize numeric data in the terminal as ASCII/Unicode/SVG charts.

## Install

```sh
npx skills add ahmadawais/chartli
```

For omp, the native project skill at `.omp/skills/chartli/SKILL.md` is discovered automatically when this repository is open. To use it in another omp project, copy or symlink `skills/chartli` into that project's `.omp/skills/` directory. Invoke it with `/skill:chartli` or read it through `skill://chartli`.

## CLI install/use

Instant use:

```sh
npx chartli --help
```

Global install:

```sh
npm i -g chartli
```

## What chartli can do

- Render chart types: `ascii`, `spark`, `bars`, `columns`, `heatmap`, `unicode`, `braille`, `svg`
- Read from file path input
- Read from stdin when no file is passed
- Control output dimensions with `--width` and `--height`
- Render SVG with `--mode circles|lines`
- Add `x` and `y` axis titles with `--x-axis-label` and `--y-axis-label`
- Add custom tick/category labels with `--x-labels` and `--series-labels`
- Show raw values on the plotted data with `--data-labels`
- Promote the first numeric column into x-axis labels with `--first-column-x`

## Command templates

From file:

```sh
npx chartli <file> -t <type> [--width N] [--height N] [--mode circles|lines] [--x-axis-label LABEL] [--y-axis-label LABEL] [--x-labels a,b,c] [--series-labels foo,bar] [--data-labels] [--first-column-x]
```

From stdin:

```sh
printf 'x y\n1 10\n2 20\n3 15\n' | npx chartli -t ascii -w 24 -h 8
```

Labeled two-column chart:

```sh
printf 'day value\n1 10\n2 20\n3 15\n' | npx chartli -t ascii -w 24 -h 8 --first-column-x --data-labels
```

Per-type examples:

```sh
npx chartli data.txt -t ascii -w 24 -h 8
npx chartli data.txt -t spark
npx chartli data.txt -t bars -w 28
npx chartli data.txt -t columns -h 8
npx chartli data.txt -t heatmap
npx chartli data.txt -t unicode
npx chartli data.txt -t braille -w 16 -h 6
npx chartli data.txt -t svg -m lines -w 320 -h 120
```

## Input format

Whitespace-separated numeric rows; optional header row is allowed.

```text
day sales costs profit
1 10 8 2
2 14 9 5
3 12 11 3
```

When `--first-column-x` is set, the first numeric column becomes the x-axis labels. If a header row exists, chartli uses the first header cell as the x-axis title and the remaining headers as series labels. For common two-column input, the second header cell becomes the y-axis title.

## Repository example assets

- `examples/assets/core-single-series.txt`
- `examples/assets/core-multi-series.txt`
- `examples/assets/image-data.txt`
- `examples/assets/image-columns-variant.txt`
