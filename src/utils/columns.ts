import { type NormalizeResult } from './normalize.js';

export interface ColumnsOptions {
	readonly height?: number;
}

const COLUMN_CHARS = ['█', '▓', '▒', '░', '■', '□'] as const;

export function renderColumns({
	normalized,
	options,
}: {
	normalized: NormalizeResult;
	options?: ColumnsOptions;
}): string {
	const height = options?.height ?? 8;
	const { data } = normalized;
	const numCols = data[0]?.length ?? 0;
	const lastRow = data[data.length - 1] ?? [];

	if (numCols === 0) return '';

	const lines: string[] = [];
	for (let level = height; level >= 1; level--) {
		let row = '';
		for (let colIdx = 0; colIdx < numCols; colIdx++) {
			const value = Math.max(0, Math.min(1, lastRow[colIdx] ?? 0));
			const filled = Math.round(value * height) >= level;
			row += `${filled ? (COLUMN_CHARS[colIdx % COLUMN_CHARS.length] ?? '█') : ' '} `;
		}
		lines.push(row.trimEnd());
	}

	lines.push('─'.repeat(Math.max(1, numCols * 2 - 1)));
	lines.push(
		Array.from({ length: numCols }, (_, i) => `${i + 1}`).join(' '),
	);

	return lines.join('\n');
}
