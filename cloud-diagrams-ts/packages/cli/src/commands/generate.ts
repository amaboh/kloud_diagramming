import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { DiagramExecutor } from '../utils/diagram-executor.js';
import { ExportManager } from '../utils/export-manager.js';
import { FileWatcher } from '../utils/file-watcher.js';

export const generateCommand = new Command('generate')
  .description('Generate diagrams from TypeScript, JavaScript, or JSON files')
  .argument('<input>', 'Input file path (.ts, .js, or .json)')
  .option('-o, --output <file>', 'Output file path')
  .option('-f, --format <format>', 'Output format (svg, png, pdf, json)', 'svg')
  .option('-w, --width <pixels>', 'Image width for PNG/PDF', '1200')
  .option('-h, --height <pixels>', 'Image height for PNG/PDF', '800')
  .option('--theme <theme>', 'Diagram theme (default, dark, light)', 'default')
  .option('--background <color>', 'Background color for PNG/PDF', 'white')
  .option('--watch', 'Watch for file changes and regenerate')
  .option('--interactive', 'Enable interactive features in SVG')
  .option('--no-validation', 'Skip diagram validation')
  .option('--verbose', 'Verbose output')
  .action(async (input, options) => {
    const spinner = ora('Generating diagram...').start();

    try {
      const executor = new DiagramExecutor();
      const exportManager = new ExportManager();

      if (options.watch) {
        spinner.stop();
        console.log(chalk.blue('👁️  Watching for changes...'));

        const watcher = new FileWatcher(input, async () => {
          const watchSpinner = ora('Regenerating diagram...').start();
          try {
            await generateDiagram();
            watchSpinner.succeed('Diagram regenerated successfully!');
          } catch (error: any) {
            watchSpinner.fail(`Generation failed: ${error.message}`);
          }
        });

        await watcher.start();
        return;
      }

      await generateDiagram();
      spinner.succeed('Diagram generated successfully!');

      async function generateDiagram() {
        // Execute diagram code
        const diagram = await executor.execute(input, {
          validation: options.validation,
          verbose: options.verbose,
        });

        // Generate output filename if not provided
        const outputFile =
          options.output || generateOutputFilename(input, options.format);

        // Export diagram
        await exportManager.export(diagram, outputFile, {
          format: options.format,
          width: parseInt(options.width),
          height: parseInt(options.height),
          theme: options.theme,
          backgroundColor: options.background,
          interactive: options.interactive,
        });

        if (options.verbose) {
          console.log(chalk.gray(`Generated: ${outputFile}`));
        }
      }
    } catch (error: any) {
      spinner.fail(`Generation failed: ${error.message}`);
      if (options.verbose) {
        console.error(chalk.red(error.stack));
      }
      process.exit(1);
    }
  });

function generateOutputFilename(input: string, format: string): string {
  const baseName = input.replace(/\.[^.]+$/, '');
  return `${baseName}.${format}`;
}
