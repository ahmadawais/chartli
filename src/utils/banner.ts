import pc from 'picocolors';

const BANNER_LARGE = `
█▀▀ █ █ ▄▀█ █▀█ ▀█▀ █   █
█▄▄ █▀█ █▀█ █▀▄  █  █▄▄ █
`.trim();

const BANNER_SMALL = `
▌ chartli ▐
`.trim();

export function showBanner(): void {
	const width = process.stdout.columns ?? 80;
	const banner = width >= 34 ? BANNER_LARGE : BANNER_SMALL;
	const lines = banner.split('\n');
	if (lines.length > 1) {
		console.log(pc.cyan(lines[0] ?? ''));
		console.log(pc.magenta(lines[1] ?? ''));
	} else {
		console.log(pc.white(banner));
	}
	console.log(pc.gray('  Render charts from numeric data\n'));
}
