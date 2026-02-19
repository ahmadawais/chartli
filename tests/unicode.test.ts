import { describe, it, expect } from 'vitest';
import { renderUnicode } from '../src/utils/unicode.js';
import { normalizeData } from '../src/utils/normalize.js';

describe('renderUnicode', () => {
	it('generates unicode block chart', () => {
		const normalized = normalizeData([[0], [5], [10]]);
		const result = renderUnicode({ normalized });
		expect(result.length).toBeGreaterThan(0);
	});

	it('uses block characters', () => {
		const normalized = normalizeData([[0], [5], [10]]);
		const result = renderUnicode({ normalized });
		// Should contain at least one block character
		const hasBlock = /[▁▂▃▄▅▆▇█]/.test(result);
		expect(hasBlock).toBe(true);
	});
});
