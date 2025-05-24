import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { DiagramExecutor } from '../utils/diagram-executor.js';
import { ExportManager } from '../utils/export-manager.js';

export const exportCommand = new Command('export')
  .description('Convert between different diagram formats')
  .argument('<input>', 'Input file path')
  .argument('<output>', 'Output file path')
  .option('-f, --format <format>', 'Target format (svg|png|pdf|json)')
  .option('-w, --width <pixels>', 'Image width', '1200')
  .option('-h, --height <pixels>', 'Image height', '800')
  .option('--theme <theme>', 'Diagram theme', 'default')
  .option('--background <color>', 'Background color', 'white')
  .option('--quality <number>', 'Image quality 0-100', '90')
  .option('--overwrite', 'Overwrite existing files')
  .action(async (input, output, options) => {
    const spinner = ora('Converting diagram...').start();

    try {
      const executor = new DiagramExecutor();
      const exportManager = new ExportManager();

      // Check if output file exists and overwrite is not set
      if (!options.overwrite && (await fileExists(output))) {
        spinner.fail(
          'Output file already exists. Use --overwrite to replace it.'
        );
        process.exit(1);
      }

      // Determine format from output file extension if not specified
      const format = options.format || getFormatFromExtension(output);

      if (!format) {
        spinner.fail(
          'Could not determine output format. Please specify with --format option.'
        );
        process.exit(1);
      }

      // Execute diagram code to get diagram object
      const diagram = await executor.execute(input, {
        validation: true,
        verbose: false,
      });

      // Convert to target format
      await exportManager.export(diagram, output, {
        format,
        width: parseInt(options.width),
        height: parseInt(options.height),
        theme: options.theme,
        backgroundColor: options.background,
        quality: parseInt(options.quality),
      });

      spinner.succeed(
        `Successfully converted to ${format.toUpperCase()} format`
      );
      console.log(chalk.green(`Output saved to: ${output}`));
    } catch (error: any) {
      spinner.fail(`Conversion failed: ${error.message}`);
      process.exit(1);
    }
  });

function getFormatFromExtension(filename: string): string | null {
  const ext = filename.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'svg':
      return 'svg';
    case 'png':
      return 'png';
    case 'pdf':
      return 'pdf';
    case 'json':
      return 'json';
    default:
      return null;
  }
}

async function fileExists(path: string): Promise<boolean> {
  try {
    const fs = await import('fs/promises');
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}
