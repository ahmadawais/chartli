import { describe, it, expect } from 'vitest';
import { renderBraille } from '../src/utils/braille.js';
import { normalizeData } from '../src/utils/normalize.js';

describe('renderBraille', () => {
	it('generates braille chart', () => {
		const normalized = normalizeData([[0], [5], [10]]);
		const result = renderBraille({ normalized });
		expect(result.length).toBeGreaterThan(0);
	});

	it('uses braille characters', () => {
		const normalized = normalizeData([[0, 5, 10]]);
		const result = renderBraille({ normalized });
		// Braille chars are in range U+2800 to U+28FF
		const hasBraille = [...result].some((ch) => {
			const cp = ch.codePointAt(0) ?? 0;
			return cp >= 0x2800 && cp <= 0x28ff;
		});
		expect(hasBraille).toBe(true);
	});
});
