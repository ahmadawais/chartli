import { type NormalizeResult } from './normalize.js';

const SHADES = [' ', '░', '▒', '▓', '█'] as const;

function toShade(value: number): string {
	const clamped = Math.max(0, Math.min(1, value));
	const idx = Math.round(clamped * (SHADES.length - 1));
	return SHADES[idx] ?? ' ';
}

export function renderHeatmap({
	normalized,
}: {
	normalized: NormalizeResult;
}): string {
	const { data } = normalized;
	const numCols = data[0]?.length ?? 0;

	if (numCols === 0) return '';

	const header = `    ${Array.from({ length: numCols }, (_, i) => `C${i + 1}`).join(' ')}`;
	const rows = data.map((row, rowIdx) => {
		const cells = row.map((v) => toShade(v)).join(' ');
		return `R${String(rowIdx + 1).padStart(2, '0')} ${cells}`;
	});

	return [header, ...rows].join('\n');
}
