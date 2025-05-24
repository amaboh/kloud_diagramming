import * as fs from "fs-extra";
import * as path from "path";
import chalk from "chalk";
import ora from "ora";
import { execSync } from "child_process";
import { Diagram } from "@cloud-diagrams/core";
import { DiagramExecutor } from "../utils/diagram-executor";
import { ExportManager } from "../utils/export-manager";
import { FileWatcher } from "../utils/file-watcher";

interface GenerateOptions {
  output: string;
  format: "svg" | "png" | "pdf";
  theme: "light" | "dark";
  direction: "LR" | "TB" | "RL" | "BT";
  width: string;
  height: string;
  interactive: boolean;
  icons: boolean;
  watch: boolean;
}

export async function generateCommand(input: string, options: GenerateOptions) {
  const spinner = ora("Generating diagram...").start();

  try {
    // Validate input file exists
    if (!(await fs.pathExists(input))) {
      throw new Error(`Input file not found: ${input}`);
    }

    // Determine input file type
    const ext = path.extname(input).toLowerCase();
    const supportedExtensions = [".ts", ".js", ".json"];

    if (!supportedExtensions.includes(ext)) {
      throw new Error(
        `Unsupported file type: ${ext}. Supported: ${supportedExtensions.join(
          ", "
        )}`
      );
    }

    // Create diagram executor
    const executor = new DiagramExecutor();
    let diagram: Diagram;

    spinner.text = "Loading diagram specification...";

    if (ext === ".json") {
      // Parse JSON specification
      const jsonContent = await fs.readJson(input);
      diagram = await executor.fromJson(jsonContent);
    } else {
      // Execute TypeScript/JavaScript file
      diagram = await executor.fromFile(input);
    }

    spinner.text = "Rendering diagram...";

    // Apply configuration options
    diagram.config.direction = options.direction;
    diagram.config.theme = options.theme;

    // Create export manager
    const exportManager = new ExportManager();

    // Generate output
    const outputPath = options.output;
    await exportManager.export(diagram, {
      format: options.format,
      outputPath,
      width: parseInt(options.width),
      height: parseInt(options.height),
      interactive: options.interactive,
      icons: options.icons,
    });

    spinner.succeed(
      chalk.green(`Diagram generated successfully: ${outputPath}`)
    );

    // Print diagram statistics
    console.log(chalk.blue("\nDiagram Statistics:"));
    console.log(`  Nodes: ${diagram.nodes.length}`);
    console.log(`  Edges: ${diagram.edges.length}`);
    console.log(`  Groups: ${diagram.groups.length}`);
    console.log(`  Format: ${options.format.toUpperCase()}`);
    console.log(`  Theme: ${options.theme}`);

    // Watch mode
    if (options.watch) {
      console.log(
        chalk.yellow("\nWatching for changes... (Press Ctrl+C to stop)")
      );

      const watcher = new FileWatcher();
      await watcher.watch(input, async () => {
        console.log(chalk.blue("\nFile changed, regenerating..."));
        try {
          await generateCommand(input, { ...options, watch: false });
        } catch (error) {
          console.error(
            chalk.red("Error regenerating diagram:"),
            error.message
          );
        }
      });
    }
  } catch (error) {
    spinner.fail(chalk.red("Failed to generate diagram"));
    console.error(chalk.red("Error:"), error.message);

    if (error.stack && process.env.DEBUG) {
      console.error(chalk.gray("\nStack trace:"));
      console.error(chalk.gray(error.stack));
    }

    process.exit(1);
  }
}
