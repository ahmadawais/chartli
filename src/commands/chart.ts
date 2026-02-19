import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import ora from 'ora';
import pc from 'picocolors';
import { z } from 'zod';
import { parseData, normalizeData } from '../utils/normalize.js';
import { renderSvg } from '../utils/svg.js';
import { renderAscii } from '../utils/ascii.js';
import { renderUnicode } from '../utils/unicode.js';
import { renderBraille } from '../utils/braille.js';

const ChartTypeSchema = z.enum(['svg', 'ascii', 'unicode', 'braille']);
type ChartType = z.infer<typeof ChartTypeSchema>;

async function readStdin(): Promise<string> {
	const lines: string[] = [];
	const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });
	for await (const line of rl) {
		lines.push(line);
	}
	return lines.join('\n');
}

function renderChart({
	input,
	type,
	width,
	height,
	mode,
}: {
	input: string;
	type: ChartType;
	width?: number;
	height?: number;
	mode?: 'circles' | 'lines';
}): string {
	const rows = parseData(input);
	const normalized = normalizeData(rows);

	if (type === 'svg')
		return renderSvg({ normalized, options: { width, height, mode } });
	if (type === 'ascii')
		return renderAscii({ normalized, options: { width, height } });
	if (type === 'unicode') return renderUnicode({ normalized, options: { width } });
	return renderBraille({ normalized, options: { width, height } });
}

export function createChartCommand(): Command {
	const cmd = new Command('chart');

	cmd
		.description('Turn data into charts')
		.argument('[file]', 'Input file (reads from stdin if not provided)')
		.option('-t, --type <type>', 'Chart type: svg, ascii, unicode, braille', 'ascii')
		.option('-w, --width <number>', 'Chart width', parseInt)
		.option('-h, --height <number>', 'Chart height', parseInt)
		.option('-m, --mode <mode>', 'SVG mode: circles or lines', 'circles')
		.action(
			async (
				file: string | undefined,
				opts: {
					type: string;
					width?: number;
					height?: number;
					mode?: string;
				},
			) => {
				const typeResult = ChartTypeSchema.safeParse(opts.type);
				if (!typeResult.success) {
					console.error(
						pc.red(
							`Invalid chart type: ${opts.type}. Use svg, ascii, unicode, or braille.`,
						),
					);
					process.exit(1);
				}

				const type = typeResult.data;
				const spinner = ora(`Generating ${type} chart…`).start();

				try {
					const input = file
						? readFileSync(file, 'utf-8')
						: await readStdin();
					const mode = opts.mode === 'lines' ? 'lines' : 'circles';
					const output = renderChart({
						input,
						type,
						width: opts.width,
						height: opts.height,
						mode,
					});
					spinner.stop();
					console.log(output);
				} catch (err) {
					spinner.stop();
					const msg = err instanceof Error ? err.message : String(err);
					console.error(pc.red(`Error: ${msg}`));
					process.exit(1);
				}
			},
		);

	return cmd;
}
