import pc from 'picocolors';

const BANNER_LARGE = `
 ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗██╗     ██╗
██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝██║     ██║
██║     ███████║███████║██████╔╝   ██║   ██║     ██║
██║     ██╔══██║██╔══██║██╔══██╗   ██║   ██║     ██║
╚██████╗██║  ██║██║  ██║██║  ██║   ██║   ███████╗██║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝
`.trim();

const BANNER_SMALL = `
 ▄▄▄·  ▄ .▄ ▄▄▄· ▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▌  ▪
▐█ ▄█ ██▪▐█▐█ ▀█ ▀▄ █·•██  •██  ██•  ██
 ██▀· ██▀▐█▄█▀▀█ ▐▀▀▄  ▐█.▪ ▐█.▪ ██▪  ▐█·
▐█▪·• ██▌▐▀▐█ ▪▐▌▐█•█▌ ▐█▌· ▐█▌· ▐█▌▐▌▐█▌
.▀    ▀▀▀ · ▀  ▀ .▀  ▀  ▀▀▀  ▀▀▀ .▀▀▀ ▀▀▀
`.trim();

export function showBanner(): void {
	const width = process.stdout.columns ?? 80;
	const banner = width >= 80 ? BANNER_LARGE : BANNER_SMALL;
	console.log(pc.white(banner));
	console.log(pc.gray('  CLI for charts in terminals\n'));
}
