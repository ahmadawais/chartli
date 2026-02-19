// Normalizes data columns to [0, 1] range, with scaling based on delta
// Based on the guff plot device algorithm

export interface NormalizeResult {
	readonly data: ReadonlyArray<ReadonlyArray<number>>;
	readonly min: ReadonlyArray<number>;
	readonly max: ReadonlyArray<number>;
}

export function parseData(input: string): ReadonlyArray<ReadonlyArray<number>> {
	const lines = input
		.trim()
		.split('\n')
		.filter((line) => line.trim() !== '');

	// Check if first line is a header (contains non-numeric values)
	const firstLine = lines[0] ?? '';
	const isHeader = firstLine.split(/\s+/).some((val) => /[^-0-9.]/.test(val));

	const dataLines = isHeader ? lines.slice(1) : lines;

	return dataLines.map((line) => line.trim().split(/\s+/).map(Number));
}

export function normalizeData(
	rawRows: ReadonlyArray<ReadonlyArray<number>>,
): NormalizeResult {
	if (rawRows.length === 0) return { data: [], min: [], max: [] };

	const numCols = rawRows[0]?.length ?? 0;

	// Transpose rows to columns
	const columns: number[][] = Array.from({ length: numCols }, (_, colIdx) =>
		rawRows.map((row) => row[colIdx] ?? 0),
	);

	const minVals = columns.map((col) => Math.min(...col));
	const maxVals = columns.map((col) => Math.max(...col));
	const deltas = columns.map((_, i) => (maxVals[i] ?? 0) - (minVals[i] ?? 0));

	// Normalize each column
	const normalizedCols = columns.map((col, i) => {
		const delta = deltas[i] ?? 0;
		const minV = minVals[i] ?? 0;
		return col.map((v) => (delta === 0 ? 0 : (v - minV) / delta));
	});

	// Apply scale squishing based on sorted deltas (descending)
	const sortedDeltas = [...deltas]
		.map((d, i) => ({ delta: d, colIdx: i }))
		.sort((a, b) => b.delta - a.delta);

	const scaledCols = normalizedCols.map((col) => [...col]);
	let k = 0;
	let prevDelta = -1;

	for (const { delta, colIdx } of sortedDeltas) {
		if (prevDelta !== -1 && prevDelta.toFixed(3) !== delta.toFixed(3)) {
			k++;
		}
		const scale = (numCols + 2 - k) / (numCols + 2);
		if (scale !== 1) {
			const col = scaledCols[colIdx];
			if (col) {
				for (let j = 0; j < col.length; j++) {
					col[j] = (col[j] ?? 0) * scale;
				}
			}
		}
		prevDelta = delta;
	}

	// Transpose back to rows
	const numRows = rawRows.length;
	const data = Array.from({ length: numRows }, (_, rowIdx) =>
		Array.from(
			{ length: numCols },
			(__, colIdx) => scaledCols[colIdx]?.[rowIdx] ?? 0,
		),
	);

	return { data, min: minVals, max: maxVals };
}
