#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { generateCommand } from './commands/generate.js';
import { initCommand } from './commands/init.js';
import { validateCommand } from './commands/validate.js';
import { listCommand } from './commands/list.js';
import { exportCommand } from './commands/export.js';

const program = new Command();

program
  .name('cloud-diagrams')
  .description('CLI tool for Cloud Diagrams TypeScript')
  .version('1.0.0');

// Add commands
program.addCommand(generateCommand);
program.addCommand(initCommand);
program.addCommand(validateCommand);
program.addCommand(listCommand);
program.addCommand(exportCommand);

// Error handling
program.exitOverride();

try {
  program.parse();
} catch (err: any) {
  if (err.code === 'commander.unknownCommand') {
    console.error(
      chalk.red(`Error: Unknown command '${err.message.split("'")[1]}'`)
    );
    console.log(chalk.yellow('\nUse --help to see available commands.'));
  } else if (err.code === 'commander.missingArgument') {
    console.error(chalk.red(`Error: ${err.message}`));
  } else {
    console.error(chalk.red(`Error: ${err.message}`));
  }
  process.exit(1);
}
