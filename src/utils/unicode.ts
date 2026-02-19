import { type NormalizeResult } from './normalize.js';

const BLOCKS = [' ', '▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'] as const;

export interface UnicodeOptions {
	readonly width?: number;
}

export function renderUnicode({
	normalized,
	options,
}: {
	normalized: NormalizeResult;
	options?: UnicodeOptions;
}): string {
	const { data } = normalized;
	const numCols = data[0]?.length ?? 0;
	const numRows = data.length;
	const chartHeight = 8;

	const cols: string[][] = [];

	for (let colIdx = 0; colIdx < numCols; colIdx++) {
		const colLines: string[] = [];
		for (let h = chartHeight; h >= 1; h--) {
			let row = '';
			for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
				const y = data[rowIdx]?.[colIdx] ?? 0;
				const filled = y * chartHeight;
				const blockIdx = Math.min(
					8,
					Math.max(0, Math.round((filled - (h - 1)) * 8)),
				);
				row += BLOCKS[blockIdx] ?? ' ';
			}
			colLines.push(row);
		}
		cols.push(colLines);
	}

	// Merge cols side by side
	const mergedLines =
		cols[0]?.map((_, lineIdx) =>
			cols.map((col) => col[lineIdx] ?? '').join('  '),
		) ?? [];

	// options.width is accepted but not used to resize (data drives width)
	void options;

	return mergedLines.join('\n');
}
