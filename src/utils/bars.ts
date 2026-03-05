import { type NormalizeResult } from './normalize.js';

export interface BarsOptions {
	readonly width?: number;
}

const BAR_CHARS = ['█', '▓', '▒', '░', '■', '□'] as const;

export function renderBars({
	normalized,
	options,
}: {
	normalized: NormalizeResult;
	options?: BarsOptions;
}): string {
	const width = options?.width ?? 28;
	const { data } = normalized;
	const numCols = data[0]?.length ?? 0;
	const lastRow = data[data.length - 1] ?? [];

	if (numCols === 0) return '';

	return Array.from({ length: numCols }, (_, colIdx) => {
		const value = Math.max(0, Math.min(1, lastRow[colIdx] ?? 0));
		const units = Math.round(value * width);
		const char = BAR_CHARS[colIdx % BAR_CHARS.length] ?? '█';
		const bar = char.repeat(units).padEnd(width, ' ');
		return `S${colIdx + 1} |${bar}| ${value.toFixed(2)}`;
	}).join('\n');
}
