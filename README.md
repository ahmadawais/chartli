![npx chartli](https://raw.githubusercontent.com/ahmadawais/chartli/main/.github/chartli.jpg)

# chartli

Tiny terminal charting CLI.

You feed it plain numeric text. It gives you readable charts in your terminal (and SVG when you want pixels).

Quick example:

```bash
printf '10\n20\n15\n30\n25\n40\n' | npx chartli -t ascii -w 24 -h 8
```

## Command

```bash
pnpm chartli [file] [options]
```

Arguments:

- `file`: input text file (if omitted, reads from stdin)

Options:

- `-t, --type <type>`: `ascii`, `spark`, `bars`, `columns`, `heatmap`, `unicode`, `braille`, `svg`
- `-w, --width <number>`: width for `ascii`, `bars`, `braille`, `svg`
- `-h, --height <number>`: height for `ascii`, `columns`, `braille`, `svg`
- `-m, --mode <mode>`: SVG mode: `circles` or `lines`

## Input format

- Whitespace-separated numeric columns
- Optional header row (auto-ignored when first row has non-numeric tokens)

Example:

```txt
day sales costs profit
1 10 8 2
2 14 9 5
3 12 11 3
4 18 10 8
5 16 13 3
6 20 12 8
```

## Chart gallery (real CLI output)

### `ascii`

```bash
pnpm chartli examples/single-series.txt -t ascii -w 24 -h 8
```

```text
  1.00 │                       ○
       │                       ●
       │             ○    ●
  0.50 │             ●    ○
       │    ○    ●
       │    ●    ○
  0.00 │○
       └────────────────────────
```

### `spark`

```bash
pnpm chartli examples/multi-series.txt -t spark
```

```text
S1 ▁▂▃▄▅▆
S2 ▁▄▂▇▅█
S3 ▁▂▄▃▆▅
S4 ▁▄▂▇▂▇
```

### `bars`

```bash
pnpm chartli examples/multi-series.txt -t bars -w 28
```

```text
S1 |███████████████████         | 0.67
S2 |▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓| 1.00
S3 |▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒             | 0.53
S4 |░░░░░░░░░░░░░░░░░░░░░░░     | 0.83
```

### `columns`

```bash
pnpm chartli examples/multi-series.txt -t columns -h 8
```

```text
  ▓
  ▓   ░
█ ▓   ░
█ ▓ ▒ ░
█ ▓ ▒ ░
───────
1 2 3 4
```

### `heatmap`

```bash
pnpm chartli examples/multi-series.txt -t heatmap
```

```text
    C1 C2 C3 C4
R01
R02 ░ ▒ ░ ▒
R03 ░ ░ ▒ ░
R04 ▒ ▓ ░ ▓
R05 ▒ ▒ ▓ ░
R06 ▓ █ ▒ ▓
```

### `unicode`

```bash
pnpm chartli examples/multi-series.txt -t unicode
```

```text
             █
           ▃ █             ▅ ▅
     ▃     █ █      ▃      █ █
    ▂█     █▆█      █▂     █ █
   ▂██   ▂ ███    ▂ ██   ▃ █ █
  ▁███   █ ███    █▁██   █ █ █
 ▁████   █▅███   ▁████   █▁█▁█
 █████   █████   █████   █████
```

### `braille`

```bash
pnpm chartli examples/single-series.txt -t braille -w 16 -h 6
```

```text
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
```

### `svg`

```bash
pnpm chartli examples/multi-series.txt -t svg -m lines -w 320 -h 120 > chart.svg
```

## One-file-per-type examples

- `examples/scripts/ascii.sh`
- `examples/scripts/spark.sh`
- `examples/scripts/bars.sh`
- `examples/scripts/columns.sh`
- `examples/scripts/heatmap.sh`
- `examples/scripts/unicode.sh`
- `examples/scripts/braille.sh`
- `examples/scripts/svg.sh`

Kitchen sink (run everything):

- `examples/scripts/kitchen-sink.sh`

Commands:

```bash
pnpm run example:ascii
pnpm run example:spark
pnpm run example:bars
pnpm run example:columns
pnpm run example:heatmap
pnpm run example:unicode
pnpm run example:braille
pnpm run example:svg
pnpm run example:kitchen-sink
pnpm run examples
```

## Under the hood (for nerds)

This CLI does a small but important sequence:

1. Parse rows and columns from whitespace text.
2. Detect/skip a header row automatically.
3. Normalize each column independently to `[0, 1]`.
4. Apply a delta-based “squish” per column so huge-variance series do not visually crush small-variance series.
5. Render normalized values into chart-specific glyph spaces.

Renderer mapping:

- `spark`: 8-level mini bars (`▁..█`) per series.
- `bars`: final value of each series mapped to horizontal bar width.
- `columns`: final value of each series mapped to vertical levels.
- `heatmap`: each cell mapped to shade levels (` `, `░`, `▒`, `▓`, `█`).
- `ascii` / `unicode` / `braille`: path-like visualizations with different terminal glyph densities.
- `svg`: vector output with optional `circles` or `lines` mode.

Complexity profile (roughly):

- Parse/normalize: `O(rows * cols)`
- Most terminal renderers: `O(rows * cols)` to `O(width * height * cols)` depending on mode
- SVG: linear in rendered points

## Development

```bash
pnpm build
pnpm test
pnpm lint
pnpm format
```
