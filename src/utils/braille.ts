import { type NormalizeResult } from './normalize.js';

// Braille patterns - 2 dots wide, 4 dots tall per character
// Unicode Braille block starts at U+2800
// Dot positions: 1=top-left, 2=mid-left, 3=lower-left, 7=bottom-left
//               4=top-right, 5=mid-right, 6=lower-right, 8=bottom-right
// Bits: d1=0x01, d2=0x02, d3=0x04, d7=0x40, d4=0x08, d5=0x10, d6=0x20, d8=0x80

const DOT_BIT: ReadonlyArray<number> = [
	0x01, 0x02, 0x04, 0x40, 0x08, 0x10, 0x20, 0x80,
];

function brailleChar(dots: ReadonlyArray<boolean>): string {
	let bits = 0;
	for (let i = 0; i < dots.length; i++) {
		if (dots[i]) bits |= DOT_BIT[i] ?? 0;
	}
	return String.fromCodePoint(0x2800 + bits);
}

export interface BrailleOptions {
	readonly width?: number;
	readonly height?: number;
}

export function renderBraille({
	normalized,
	options,
}: {
	normalized: NormalizeResult;
	options?: BrailleOptions;
}): string {
	const { data } = normalized;
	const numRows = data.length;
	const numCols = data[0]?.length ?? 0;

	// Each braille char is 2 dots wide x 4 dots tall
	const charWidth = options?.width ?? 40;
	const charHeight = options?.height ?? 8;
	const dotWidth = charWidth * 2;
	const dotHeight = charHeight * 4;

	// Create dot grid per column
	const lines: string[] = [];

	for (let colIdx = 0; colIdx < numCols; colIdx++) {
		const dotGrid: boolean[][] = Array.from({ length: dotHeight }, () =>
			new Array(dotWidth).fill(false) as boolean[],
		);

		for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
			const y = data[rowIdx]?.[colIdx] ?? 0;
			const dotX = Math.floor(
				(rowIdx / Math.max(numRows - 1, 1)) * (dotWidth - 1),
			);
			const dotY = dotHeight - 1 - Math.floor(y * (dotHeight - 1));
			const safeY = Math.max(0, Math.min(dotHeight - 1, dotY));
			const safeX = Math.max(0, Math.min(dotWidth - 1, dotX));
			if (dotGrid[safeY] && dotGrid[safeY][safeX] !== undefined) {
				dotGrid[safeY][safeX] = true;
			}
		}

		if (colIdx > 0) lines.push('');

		for (let cy = 0; cy < charHeight; cy++) {
			let rowStr = '';
			for (let cx = 0; cx < charWidth; cx++) {
				// 4 dots in left column, 4 in right column
				const dots: boolean[] = [
					dotGrid[cy * 4 + 0]?.[cx * 2 + 0] ?? false,
					dotGrid[cy * 4 + 1]?.[cx * 2 + 0] ?? false,
					dotGrid[cy * 4 + 2]?.[cx * 2 + 0] ?? false,
					dotGrid[cy * 4 + 3]?.[cx * 2 + 0] ?? false,
					dotGrid[cy * 4 + 0]?.[cx * 2 + 1] ?? false,
					dotGrid[cy * 4 + 1]?.[cx * 2 + 1] ?? false,
					dotGrid[cy * 4 + 2]?.[cx * 2 + 1] ?? false,
					dotGrid[cy * 4 + 3]?.[cx * 2 + 1] ?? false,
				];
				rowStr += brailleChar(dots);
			}
			lines.push(rowStr);
		}
	}

	return lines.join('\n');
}
