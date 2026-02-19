import { describe, it, expect } from 'vitest';
import { parseData, normalizeData } from '../src/utils/normalize.js';

describe('parseData', () => {
	it('parses numeric data', () => {
		const input = '1 2 3\n4 5 6';
		const result = parseData(input);
		expect(result).toEqual([
			[1, 2, 3],
			[4, 5, 6],
		]);
	});

	it('skips header row', () => {
		const input = 'a b c\n1 2 3';
		const result = parseData(input);
		expect(result).toEqual([[1, 2, 3]]);
	});
});

describe('normalizeData', () => {
	it('normalizes values to [0, 1]', () => {
		const rows = [[0], [5], [10]];
		const result = normalizeData(rows);
		expect(result.data[0]?.[0]).toBeCloseTo(0);
		expect(result.data[2]?.[0]).toBeCloseTo(1);
	});

	it('handles single value', () => {
		const rows = [[5]];
		const result = normalizeData(rows);
		expect(result.data[0]?.[0]).toBe(0);
	});

	it('returns min/max correctly', () => {
		const rows = [[2], [8]];
		const result = normalizeData(rows);
		expect(result.min[0]).toBe(2);
		expect(result.max[0]).toBe(8);
	});
});
