![npx chartli](https://raw.githubusercontent.com/ahmadawais/chartli/main/.github/chartli.jpg)

# chartli

Tiny terminal charting CLI.

## Quick start (no clone required)

```sh
npx chartli --help
```

```sh
npx chartli -t spark <<< $'day sales costs profit\n1 10 8 2\n2 14 9 5\n3 12 11 3\n4 18 10 8\n5 16 13 3\n6 20 12 8\n'
```

## Command

```sh
npx chartli [file] [options]
```

Arguments:

- `file`: input text file (if omitted, reads from stdin)

Options:

- `-t, --type <type>`: `ascii`, `spark`, `bars`, `columns`, `heatmap`, `unicode`, `braille`, `svg`
- `-w, --width <number>`: width for `ascii`, `bars`, `braille`, `svg`
- `-h, --height <number>`: height for `ascii`, `columns`, `braille`, `svg`
- `-m, --mode <mode>`: SVG mode: `circles` or `lines`

## Image examples (one-liner, copy/paste)

These use `npx chartli` first with inline data via here-string (works in zsh).

### ASCII Line

```sh
npx chartli -t ascii -w 24 -h 8 <<< $'day sales costs profit\n1 10 8 2\n2 14 9 5\n3 12 11 3\n4 18 10 8\n5 16 13 3\n6 20 12 8\n'
```

```text
  1.00 │                 ○   ●
       │             ○   ●
       │         ○   ●
  0.50 │     ○   ●       ○
       │ ○   ●
       │ ●               ○
  0.00 │○
       └────────────────────────
```

### Sparklines

```sh
npx chartli -t spark <<< $'day sales costs profit\n1 10 8 2\n2 14 9 5\n3 12 11 3\n4 18 10 8\n5 16 13 3\n6 20 12 8\n'
```

```text
S1 ▁▂▃▄▅▆
S2 ▁▄▂▇▅█
S3 ▁▂▄▃▆▅
S4 ▁▄▂▇▂▇
```

### Horizontal Bars

```sh
npx chartli -t bars -w 28 <<< $'day sales costs profit\n1 10 8 2\n2 14 9 5\n3 12 11 3\n4 18 10 8\n5 16 13 3\n6 20 12 8\n'
```

```text
S1 |███████████████████         | 0.67
S2 |▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓| 1.00
S3 |▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒             | 0.53
S4 |░░░░░░░░░░░░░░░░░░░░░░░     | 0.83
```

### Columns

```sh
npx chartli -t columns -h 8 <<< $'day sales costs profit\n1 10 8 2\n2 14 9 5\n3 12 11 3\n4 18 10 8\n5 16 13 3\n6 20 12 8\n'
```

```text
  ▓
  ▓   ░
  ▓   ░
█ ▓   ░
█ ▓ ▒ ░
█ ▓ ▒ ░
█ ▓ ▒ ░
█ ▓ ▒ ░
───────
1 2 3 4
```

### Heatmap

```sh
npx chartli -t heatmap <<< $'day sales costs profit\n1 10 8 2\n2 14 9 5\n3 12 11 3\n4 18 10 8\n5 16 13 3\n6 20 12 8\n'
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

```sh
npx chartli -t unicode <<< $'day sales costs profit\n1 10 8 2\n2 14 9 5\n3 12 11 3\n4 18 10 8\n5 16 13 3\n6 20 12 8\n'
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

```sh
npx chartli -t braille -w 16 -h 6 <<< $'day sales costs profit\n1 10 8 2\n2 14 9 5\n3 12 11 3\n4 18 10 8\n5 16 13 3\n6 20 12 8\n'
```

```text
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
```

### SVG

```sh
npx chartli -t svg -m lines -w 320 -h 120 <<< $'day sales costs profit\n1 10 8 2\n2 14 9 5\n3 12 11 3\n4 18 10 8\n5 16 13 3\n6 20 12 8\n' | sed -n '/^<?xml/,$p' > chart.svg
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

## Run all examples in one go (no clone)

```sh
npx chartli -t ascii -w 24 -h 8 <<< $'day sales costs profit\n1 10 8 2\n2 14 9 5\n3 12 11 3\n4 18 10 8\n5 16 13 3\n6 20 12 8\n'; npx chartli -t spark <<< $'day sales costs profit\n1 10 8 2\n2 14 9 5\n3 12 11 3\n4 18 10 8\n5 16 13 3\n6 20 12 8\n'; npx chartli -t bars -w 28 <<< $'day sales costs profit\n1 10 8 2\n2 14 9 5\n3 12 11 3\n4 18 10 8\n5 16 13 3\n6 20 12 8\n'; npx chartli -t columns -h 8 <<< $'day sales costs profit\n1 10 8 2\n2 14 9 5\n3 12 11 3\n4 18 10 8\n5 16 13 3\n6 20 12 8\n'; npx chartli -t heatmap <<< $'day sales costs profit\n1 10 8 2\n2 14 9 5\n3 12 11 3\n4 18 10 8\n5 16 13 3\n6 20 12 8\n'; npx chartli -t unicode <<< $'day sales costs profit\n1 10 8 2\n2 14 9 5\n3 12 11 3\n4 18 10 8\n5 16 13 3\n6 20 12 8\n'; npx chartli -t braille -w 16 -h 6 <<< $'day sales costs profit\n1 10 8 2\n2 14 9 5\n3 12 11 3\n4 18 10 8\n5 16 13 3\n6 20 12 8\n'; npx chartli -t svg -m lines -w 320 -h 120 <<< $'day sales costs profit\n1 10 8 2\n2 14 9 5\n3 12 11 3\n4 18 10 8\n5 16 13 3\n6 20 12 8\n' | sed -n '/^<?xml/,$p' > chart.svg
```

## Repo kitchen sink (if cloned)

If you cloned this repo, all example scripts are flat in `examples/` (data/output are in `examples/assets/`):

- `examples/ascii.sh`
- `examples/spark.sh`
- `examples/bars.sh`
- `examples/columns.sh`
- `examples/heatmap.sh`
- `examples/unicode.sh`
- `examples/braille.sh`
- `examples/svg.sh`
- `examples/kitchen-sink.sh`
- `examples/image-ascii-line.sh`
- `examples/image-sparklines.sh`
- `examples/image-horizontal-bars.sh`
- `examples/image-columns.sh`
- `examples/image-heatmap.sh`
- `examples/image-unicode-bars.sh`
- `examples/image-braille.sh`
- `examples/image-svg.sh`
- `examples/image-kitchen-sink.sh`
- `examples/all-kitchen-sink.sh`

Run core set:

```sh
pnpm run example:kitchen-sink
```

Run image-matched set:

```sh
pnpm run example:image-set:kitchen-sink
```

Run both sets together:

```sh
pnpm run example:all-kitchen-sink
```

## Technical depth

Data path is simple and intentional:

1. Parse whitespace rows into a numeric matrix.
2. Auto-detect and skip a header row.
3. Normalize each column to `[0, 1]`.
4. Apply delta-aware scaling so high-variance series do not flatten lower-variance series.
5. Project normalized values into renderer-specific glyph spaces.

That gives you chart outputs that are tiny, fast, and legible in plain terminal text.

## License

Apache-2.0 by [Ahmad Awais](https://x.com/MrAhmadAwais) built with [Command Code](https://commandcode.ai).
