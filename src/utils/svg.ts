import { type NormalizeResult } from './normalize.js';

// Bang Wong's colour-safe palette
const COLORS = [
	'#0072B2',
	'#F0E442',
	'#009E73',
	'#CC79A7',
	'#D55E00',
	'#eeeeee',
] as const;

export interface SvgOptions {
	readonly width?: number;
	readonly height?: number;
	readonly mode?: 'circles' | 'lines';
	readonly titles?: ReadonlyArray<string>;
}

function getColor(colIdx: number, numCols: number): string {
	if (numCols === 1) return '#eeeeee';
	return COLORS[colIdx % COLORS.length] ?? '#eeeeee';
}

function point({
	x,
	y,
	chartWidth,
	height,
	xMargin,
	yMargin,
}: {
	x: number;
	y: number;
	chartWidth: number;
	height: number;
	xMargin: number;
	yMargin: number;
}): string {
	const px = x * (chartWidth - 2 * xMargin) + xMargin;
	const py = height - 2 * yMargin - y * (height - 2 * yMargin) + yMargin;
	return `${Math.round(px)},${Math.round(py)}`;
}

function renderCircles({
	colIdx,
	data,
	color,
	chartWidth,
	height,
	xMargin,
	yMargin,
}: {
	colIdx: number;
	data: ReadonlyArray<ReadonlyArray<number>>;
	color: string;
	chartWidth: number;
	height: number;
	xMargin: number;
	yMargin: number;
}): string {
	return data
		.map((_, rowIdx) => {
			const y = data[rowIdx]?.[colIdx] ?? 0;
			const p = point({ x: rowIdx / data.length, y, chartWidth, height, xMargin, yMargin });
			const [cx, cy] = p.split(',');
			return `  <circle cx='${cx}' cy='${cy}' r='1.2' fill='${color}ff' stroke='${color}ff'/>`;
		})
		.join('\n');
}

function renderLine({
	colIdx,
	data,
	color,
	chartWidth,
	height,
	xMargin,
	yMargin,
}: {
	colIdx: number;
	data: ReadonlyArray<ReadonlyArray<number>>;
	color: string;
	chartWidth: number;
	height: number;
	xMargin: number;
	yMargin: number;
}): string {
	const points = data
		.map((_, rowIdx) => {
			const y = data[rowIdx]?.[colIdx] ?? 0;
			return point({ x: rowIdx / data.length, y, chartWidth, height, xMargin, yMargin });
		})
		.join(' ');
	return `  <polyline stroke='${color}ff' stroke-width='1.5' fill='none' points='${points}'/>`;
}

function renderLegend({
	colIdx,
	title,
	color,
	minVal,
	maxVal,
	chartWidth,
	gutter,
	lineHeight,
	fontSize,
}: {
	colIdx: number;
	title: string;
	color: string;
	minVal: number;
	maxVal: number;
	chartWidth: number;
	gutter: number;
	lineHeight: number;
	fontSize: number;
}): string {
	const x = chartWidth + gutter;
	const y = colIdx * lineHeight;
	return [
		`  <g transform='translate(${x} ${y})'>`,
		`    <circle cx='-10' cy='${-lineHeight / 2 + 5}' r='3.5' fill='${color}' stroke='${color}'/>`,
		`    <text style='fill: #eeeeee; font-size: ${fontSize}px; font-family: mono' xml:space='preserve'>${title} [${minVal.toFixed(3)}, ${maxVal.toFixed(3)}]</text>`,
		`  </g>`,
	].join('\n');
}

export function renderSvg({
	normalized,
	options,
}: {
	normalized: NormalizeResult;
	options?: SvgOptions;
}): string {
	const chartWidth = options?.width ?? 320;
	const height = options?.height ?? 120;
	const mode = options?.mode ?? 'circles';
	const titles = options?.titles ?? [];

	const xMargin = 0;
	const yMargin = 5;
	const gutter = 30;
	const legendWidth = 300;
	const lineHeight = 20;
	const fontSize = 15;

	const { data, min, max } = normalized;
	const numCols = data[0]?.length ?? 0;
	const totalWidth = chartWidth + gutter + legendWidth;

	const lines: string[] = [
		`<?xml version='1.0'?>`,
		`<svg xmlns='http://www.w3.org/2000/svg' width='${totalWidth}' height='${height}' version='1.1'>`,
	];

	for (let colIdx = 0; colIdx < numCols; colIdx++) {
		const color = getColor(colIdx, numCols);
		const renderArgs = {
			colIdx,
			data,
			color,
			chartWidth,
			height,
			xMargin,
			yMargin,
		};
		if (mode === 'lines') {
			lines.push(renderLine(renderArgs));
		} else {
			lines.push(renderCircles(renderArgs));
		}
	}

	if (titles.length > 0) {
		for (let colIdx = 0; colIdx < numCols; colIdx++) {
			const title = titles[colIdx] ?? '';
			const color = getColor(colIdx, numCols);
			lines.push(
				renderLegend({
					colIdx,
					title,
					color,
					minVal: min[colIdx] ?? 0,
					maxVal: max[colIdx] ?? 0,
					chartWidth,
					gutter,
					lineHeight,
					fontSize,
				}),
			);
		}
	}

	lines.push(`</svg>`);
	return lines.join('\n');
}
