import { describe, it, expect } from 'vitest';
import { renderAscii } from '../src/utils/ascii.js';
import { normalizeData } from '../src/utils/normalize.js';

describe('renderAscii', () => {
	it('generates ascii chart with axis labels', () => {
		const normalized = normalizeData([[1], [5], [10]]);
		const result = renderAscii({ normalized });
		expect(result).toContain('│');
		expect(result).toContain('─');
	});

	it('places data point in chart', () => {
		const normalized = normalizeData([[0], [5], [10]]);
		const result = renderAscii({ normalized });
		expect(result).toContain('●');
	});
});
