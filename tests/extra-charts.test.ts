import { describe, it, expect } from 'vitest';
import { normalizeData } from '../src/utils/normalize.js';
import { renderSpark } from '../src/utils/spark.js';
import { renderBars } from '../src/utils/bars.js';
import { renderColumns } from '../src/utils/columns.js';
import { renderHeatmap } from '../src/utils/heatmap.js';

describe('additional chart renderers', () => {
	it('renders spark lines for each series', () => {
		const normalized = normalizeData([
			[1, 2],
			[3, 4],
			[5, 6],
		]);
		const result = renderSpark({ normalized });
		expect(result).toContain('S1');
		expect(result).toContain('S2');
		expect(/[▁▂▃▄▅▆▇█]/.test(result)).toBe(true);
	});

	it('renders horizontal bars', () => {
		const normalized = normalizeData([
			[1, 2],
			[3, 4],
			[5, 6],
		]);
		const result = renderBars({ normalized, options: { width: 12 } });
		expect(result).toContain('S1 |');
		expect(result).toContain('S2 |');
	});

	it('renders vertical columns', () => {
		const normalized = normalizeData([[1, 2, 3], [2, 3, 4], [3, 4, 5]]);
		const result = renderColumns({ normalized, options: { height: 6 } });
		expect(result).toContain('─');
		expect(result).toContain('1 2 3');
	});

	it('renders a matrix-style heatmap', () => {
		const normalized = normalizeData([
			[1, 2],
			[3, 4],
			[5, 6],
		]);
		const result = renderHeatmap({ normalized });
		expect(result).toContain('C1 C2');
		expect(result).toContain('R01');
		expect(/[░▒▓█]/.test(result)).toBe(true);
	});
});
