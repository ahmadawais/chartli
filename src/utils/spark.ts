import { type NormalizeResult } from './normalize.js';

const BLOCKS = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'] as const;

function toSpark(v: number): string {
	const idx = Math.max(0, Math.min(BLOCKS.length - 1, Math.round(v * 7)));
	return BLOCKS[idx] ?? '▁';
}

export function renderSpark({
	normalized,
}: {
	normalized: NormalizeResult;
}): string {
	const { data } = normalized;
	const numCols = data[0]?.length ?? 0;

	const lines: string[] = [];
	for (let colIdx = 0; colIdx < numCols; colIdx++) {
		const series = data.map((row) => toSpark(row[colIdx] ?? 0)).join('');
		lines.push(`S${colIdx + 1} ${series}`);
	}

	return lines.join('\n');
}
