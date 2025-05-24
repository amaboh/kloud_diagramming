import * as fs from "fs-extra";
import * as path from "path";
import chalk from "chalk";
import ora from "ora";
import { ExportManager } from "../utils/export-manager";
import { DiagramExecutor } from "../utils/diagram-executor";

interface ExportOptions {
  format: "svg" | "png" | "pdf" | "json";
  output?: string;
  width: string;
  height: string;
  quality: string;
}

export async function exportCommand(input: string, options: ExportOptions) {
  const spinner = ora("Exporting diagram...").start();

  try {
    // Validate input file exists
    if (!(await fs.pathExists(input))) {
      throw new Error(`Input file not found: ${input}`);
    }

    // Determine output path if not specified
    let outputPath = options.output;
    if (!outputPath) {
      const inputExt = path.extname(input);
      const inputBase = path.basename(input, inputExt);
      const inputDir = path.dirname(input);
      outputPath = path.join(inputDir, `${inputBase}.${options.format}`);
    }

    spinner.text = "Loading diagram...";

    // Load the diagram
    const executor = new DiagramExecutor();
    const diagram = await executor.fromFile(input);

    spinner.text = `Exporting to ${options.format.toUpperCase()}...`;

    // Export the diagram
    const exportManager = new ExportManager();
    await exportManager.export(diagram, {
      format: options.format,
      outputPath,
      width: parseInt(options.width),
      height: parseInt(options.height),
      quality: parseFloat(options.quality),
    });

    spinner.succeed(
      chalk.green(`Diagram exported successfully: ${outputPath}`)
    );

    // Show file info
    const stats = await fs.stat(outputPath);
    const fileSizeKB = Math.round(stats.size / 1024);

    console.log(chalk.blue("\nExport Details:"));
    console.log(`  Input: ${input}`);
    console.log(`  Output: ${outputPath}`);
    console.log(`  Format: ${options.format.toUpperCase()}`);
    console.log(`  Size: ${fileSizeKB} KB`);

    if (options.format === "png" || options.format === "pdf") {
      console.log(`  Dimensions: ${options.width}x${options.height}`);
      console.log(
        `  Quality: ${Math.round(parseFloat(options.quality) * 100)}%`
      );
    }
  } catch (error) {
    spinner.fail(chalk.red("Export failed"));
    console.error(chalk.red("Error:"), error.message);
    process.exit(1);
  }
}
