import { Command } from 'commander';
import { createRequire } from 'node:module';
import { showBanner } from './utils/banner.js';
import { createChartCommand } from './commands/chart.js';

const require = createRequire(import.meta.url);
const pkg = require('../package.json') as { version: string };

const program = new Command();

program
	.name('chartli')
	.description('CLI for charts in terminals')
	.version(pkg.version, '-v, --version', 'Output the version number')
	.helpOption('-h, --help', 'Display help for command')
	.addHelpCommand(false);

program.hook('preAction', () => {
	if (!process.argv.includes('--version') && !process.argv.includes('-v')) {
		showBanner();
	}
});

program.addCommand(createChartCommand());

// Default action: if no subcommand, show banner + help
program.action(() => {
	showBanner();
	program.help();
});

program.parse(process.argv);
