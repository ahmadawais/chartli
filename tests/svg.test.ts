import { describe, it, expect } from 'vitest';
import { renderSvg } from '../src/utils/svg.js';
import { normalizeData } from '../src/utils/normalize.js';

describe('renderSvg', () => {
	it('generates valid SVG markup', () => {
		const normalized = normalizeData([[0], [5], [10]]);
		const svg = renderSvg({ normalized });
		expect(svg).toContain('<?xml version');
		expect(svg).toContain('<svg');
		expect(svg).toContain('</svg>');
	});

	it('generates circles by default', () => {
		const normalized = normalizeData([[0], [5], [10]]);
		const svg = renderSvg({ normalized });
		expect(svg).toContain('<circle');
	});

	it('generates polyline in lines mode', () => {
		const normalized = normalizeData([[0], [5], [10]]);
		const svg = renderSvg({ normalized, options: { mode: 'lines' } });
		expect(svg).toContain('<polyline');
	});
});
