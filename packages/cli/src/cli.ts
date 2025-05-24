#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { generateCommand } from "./commands/generate";
import { initCommand } from "./commands/init";
import { validateCommand } from "./commands/validate";
import { listCommand } from "./commands/list";
import { exportCommand } from "./commands/export";

const program = new Command();

program
  .name("cloud-diagrams")
  .description("CLI tool for generating cloud architecture diagrams")
  .version("1.0.0");

// Generate command - main functionality
program
  .command("generate")
  .alias("gen")
  .description("Generate diagram from TypeScript or JSON specification")
  .argument("<input>", "Input file (.ts, .js, or .json)")
  .option("-o, --output <path>", "Output file path", "diagram.svg")
  .option("-f, --format <format>", "Output format (svg, png, pdf)", "svg")
  .option("-t, --theme <theme>", "Diagram theme (light, dark)", "light")
  .option(
    "-d, --direction <direction>",
    "Layout direction (LR, TB, RL, BT)",
    "LR"
  )
  .option("-w, --width <width>", "Output width for raster formats", "1200")
  .option("-h, --height <height>", "Output height for raster formats", "800")
  .option("--interactive", "Enable interactive features in SVG output", false)
  .option("--no-icons", "Disable cloud provider icons", false)
  .option("--watch", "Watch input file for changes and regenerate", false)
  .action(generateCommand);

// Initialize command - create templates
program
  .command("init")
  .description("Initialize a new diagram project with templates")
  .argument("[name]", "Project name", "my-diagram")
  .option(
    "-p, --provider <provider>",
    "Primary cloud provider (aws, azure, gcp, multi)",
    "aws"
  )
  .option(
    "-t, --template <template>",
    "Template type (basic, 3tier, microservices, data-pipeline)",
    "basic"
  )
  .option("--typescript", "Generate TypeScript template", true)
  .option("--json", "Generate JSON template instead of TypeScript", false)
  .action(initCommand);

// Validate command - check diagram syntax
program
  .command("validate")
  .alias("check")
  .description("Validate diagram specification syntax")
  .argument("<input>", "Input file to validate")
  .option("--strict", "Enable strict validation mode", false)
  .action(validateCommand);

// List command - show available services
program
  .command("list")
  .alias("ls")
  .description("List available cloud services and icons")
  .option("-p, --provider <provider>", "Filter by provider (aws, azure, gcp)")
  .option("-c, --category <category>", "Filter by service category")
  .option("--icons", "Show icon availability", false)
  .action(listCommand);

// Export command - convert between formats
program
  .command("export")
  .description("Export existing diagram to different format")
  .argument("<input>", "Input diagram file")
  .option("-f, --format <format>", "Target format (svg, png, pdf, json)", "png")
  .option("-o, --output <path>", "Output file path")
  .option("-w, --width <width>", "Output width for raster formats", "1200")
  .option("-h, --height <height>", "Output height for raster formats", "800")
  .option("-q, --quality <quality>", "Output quality (0.1-1.0)", "0.9")
  .action(exportCommand);

// Global error handling
program.configureOutput({
  writeErr: (str) => process.stderr.write(chalk.red(str)),
});

// Parse command line arguments
program.parse();

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
