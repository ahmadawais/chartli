import { type NormalizeResult } from './normalize.js';

export interface AsciiOptions {
	readonly width?: number;
	readonly height?: number;
}

export function renderAscii({
	normalized,
	options,
}: {
	normalized: NormalizeResult;
	options?: AsciiOptions;
}): string {
	const width = options?.width ?? 60;
	const height = options?.height ?? 15;
	const { data } = normalized;
	const numCols = data[0]?.length ?? 0;
	const numRows = data.length;

	// Build a grid for each column
	const grid: string[][] = Array.from({ length: height }, () =>
		Array(width).fill(' ') as string[],
	);

	const colChars = ['●', '○', '◆', '◇', '▲'];

	for (let colIdx = 0; colIdx < numCols; colIdx++) {
		const char = colChars[colIdx % colChars.length] ?? '●';
		for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
			const y = data[rowIdx]?.[colIdx] ?? 0;
			const x = Math.floor(
				(rowIdx / Math.max(numRows - 1, 1)) * (width - 1),
			);
			const yPos = height - 1 - Math.floor(y * (height - 1));
			const safeY = Math.max(0, Math.min(height - 1, yPos));
			const safeX = Math.max(0, Math.min(width - 1, x));
			if (grid[safeY] && grid[safeY][safeX] !== undefined) {
				grid[safeY][safeX] = char;
			}
		}
	}

	const yAxisWidth = 6;
	const lines = grid.map((row, i) => {
		const label =
			i === 0
				? '1.00'
				: i === Math.floor(height / 2)
					? '0.50'
					: i === height - 1
						? '0.00'
						: '    ';
		return `${label.padStart(yAxisWidth)} │${row.join('')}`;
	});

	lines.push(`${' '.repeat(yAxisWidth)} └${'─'.repeat(width)}`);
	return lines.join('\n');
}
