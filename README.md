![npx chartli](https://github.com/ahmadawais/chartli/blob/main/.github/chartli.jpg?raw=true)

# chartli

Tiny terminal charting CLI.

You feed it numeric text. It renders charts directly in your terminal.

## Quick start

```bash
npx chartli --help
```

```bash
npx chartli ex/data.txt -t spark
```

## Command

```bash
npx chartli [file] [options]
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
- Optional header row (auto-skipped when first row has non-numeric tokens)

Example data (`ex/data.txt`):

```txt
day sales costs profit
1 10 8 2
2 14 9 5
3 12 11 3
4 18 10 8
5 16 13 3
6 20 12 8
```

## Gallery (same styles as image)

### ASCII Line

```bash
npx chartli ex/data.txt -t ascii -w 24 -h 8
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

### Sparklines

```bash
npx chartli ex/data.txt -t spark
```

```text
S1 ▁▂▃▄▅▆
S2 ▁▄▂▇▅█
S3 ▁▂▄▃▆▅
S4 ▁▄▂▇▂▇
```

### Horizontal Bars

```bash
npx chartli ex/data.txt -t bars -w 28
```

```text
S1 |███████████████████         | 0.67
S2 |▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓| 1.00
S3 |▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒             | 0.53
S4 |░░░░░░░░░░░░░░░░░░░░░░░     | 0.83
```

### Columns

```bash
npx chartli ex/data.txt -t columns -h 8
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

### Heatmap

```bash
npx chartli ex/data.txt -t heatmap
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

### Unicode Bars

```bash
npx chartli ex/data.txt -t unicode
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

### Braille

```bash
npx chartli ex/data.txt -t braille -w 16 -h 6
```

```text
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
```

### SVG

```bash
npx chartli ex/data.txt -t svg -m lines -w 320 -h 120 > chart.svg
```

## `ex/` folder

Image-style examples are also bundled in `ex/`:

- `ex/data.txt`
- `ex/scripts/ascii-line.sh`
- `ex/scripts/sparklines.sh`
- `ex/scripts/horizontal-bars.sh`
- `ex/scripts/columns.sh`
- `ex/scripts/heatmap.sh`
- `ex/scripts/unicode-bars.sh`
- `ex/scripts/braille.sh`
- `ex/scripts/svg.sh`
- `ex/scripts/kitchen-sink.sh`

Run all `ex` examples in one go:

```bash
bash ex/scripts/kitchen-sink.sh
```

or:

```bash
pnpm run ex:kitchen-sink
```

## Technical depth

Data path is simple and intentional:

1. Parse whitespace rows into a numeric matrix.
2. Auto-detect and skip a header row.
3. Normalize each column to `[0, 1]`.
4. Apply delta-aware scaling so high-variance series do not flatten lower-variance series.
5. Project normalized values into renderer-specific glyph spaces.

That gives you chart outputs that are tiny, fast, and surprisingly legible in plain terminal text.
