# chartli example pack (`ex/`)

This folder mirrors the example tiles from the project hero image.

## Data

- `ex/data.txt`
- `ex/single-series.txt`

## Image-style examples

### ASCII Line

```bash
npx chartli ex/data.txt -t ascii -w 24 -h 8
```

### Sparklines

```bash
npx chartli ex/data.txt -t spark
```

### Horizontal Bars

```bash
npx chartli ex/data.txt -t bars -w 28
```

### Columns

```bash
npx chartli ex/data.txt -t columns -h 8
```

### Heatmap

```bash
npx chartli ex/data.txt -t heatmap
```

### Unicode Bars

```bash
npx chartli ex/data.txt -t unicode
```

### Braille

```bash
npx chartli ex/data.txt -t braille -w 16 -h 6
```

### SVG

```bash
npx chartli ex/data.txt -t svg -m lines -w 320 -h 120 > ex/output/chart.svg
```

## Scripted runners

- `ex/scripts/ascii-line.sh`
- `ex/scripts/sparklines.sh`
- `ex/scripts/horizontal-bars.sh`
- `ex/scripts/columns.sh`
- `ex/scripts/heatmap.sh`
- `ex/scripts/unicode-bars.sh`
- `ex/scripts/braille.sh`
- `ex/scripts/svg.sh`
- `ex/scripts/kitchen-sink.sh`

Run all in one go:

```bash
bash ex/scripts/kitchen-sink.sh
```
