import * as fs from "fs-extra";
import * as path from "path";
import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";
import { TemplateGenerator } from "../utils/template-generator";

interface InitOptions {
  provider: "aws" | "azure" | "gcp" | "multi";
  template: "basic" | "3tier" | "microservices" | "data-pipeline";
  typescript: boolean;
  json: boolean;
}

export async function initCommand(name: string, options: InitOptions) {
  const spinner = ora("Initializing diagram project...").start();

  try {
    // Validate project name
    if (!name || name.trim() === "") {
      throw new Error("Project name cannot be empty");
    }

    const projectPath = path.resolve(name);

    // Check if directory already exists
    if (await fs.pathExists(projectPath)) {
      spinner.stop();

      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: `Directory "${name}" already exists. Overwrite?`,
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log(chalk.yellow("Operation cancelled."));
        return;
      }

      spinner.start("Initializing diagram project...");
    }

    // Create project directory
    await fs.ensureDir(projectPath);

    spinner.text = "Generating template files...";

    // Create template generator
    const generator = new TemplateGenerator();

    // Generate files based on options
    const templateConfig = {
      name,
      provider: options.provider,
      template: options.template,
      useTypeScript: options.typescript && !options.json,
      useJson: options.json,
    };

    await generator.generate(projectPath, templateConfig);

    // Create package.json for the project
    const packageJson = {
      name: name.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      version: "1.0.0",
      description: `Cloud architecture diagram for ${name}`,
      main: options.typescript ? "diagram.ts" : "diagram.js",
      scripts: {
        build: "cloud-diagrams generate diagram.ts -o diagram.svg",
        "build:png": "cloud-diagrams generate diagram.ts -f png -o diagram.png",
        "build:pdf": "cloud-diagrams generate diagram.ts -f pdf -o diagram.pdf",
        watch: "cloud-diagrams generate diagram.ts --watch",
        validate: "cloud-diagrams validate diagram.ts",
      },
      devDependencies: {
        "@cloud-diagrams/cli": "^1.0.0",
        "@cloud-diagrams/core": "^1.0.0",
        ...(options.provider === "aws" || options.provider === "multi"
          ? { "@cloud-diagrams/aws": "^1.0.0" }
          : {}),
        ...(options.provider === "azure" || options.provider === "multi"
          ? { "@cloud-diagrams/azure": "^1.0.0" }
          : {}),
        ...(options.provider === "gcp" || options.provider === "multi"
          ? { "@cloud-diagrams/gcp": "^1.0.0" }
          : {}),
        ...(options.typescript
          ? { typescript: "^5.0.0", "@types/node": "^20.0.0" }
          : {}),
      },
    };

    await fs.writeJson(path.join(projectPath, "package.json"), packageJson, {
      spaces: 2,
    });

    // Create README.md
    const readmeContent = generator.generateReadme(templateConfig);
    await fs.writeFile(path.join(projectPath, "README.md"), readmeContent);

    // Create .gitignore
    const gitignoreContent = [
      "node_modules/",
      "dist/",
      "*.log",
      ".DS_Store",
      "*.svg",
      "*.png",
      "*.pdf",
      "!examples/*.svg",
      "!examples/*.png",
    ].join("\n");

    await fs.writeFile(path.join(projectPath, ".gitignore"), gitignoreContent);

    // Create TypeScript config if needed
    if (options.typescript) {
      const tsConfig = {
        compilerOptions: {
          target: "ES2020",
          module: "commonjs",
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          moduleResolution: "node",
          resolveJsonModule: true,
        },
        include: ["*.ts"],
        exclude: ["node_modules", "dist"],
      };

      await fs.writeJson(path.join(projectPath, "tsconfig.json"), tsConfig, {
        spaces: 2,
      });
    }

    spinner.succeed(chalk.green(`Project "${name}" initialized successfully!`));

    // Print next steps
    console.log(chalk.blue("\nNext steps:"));
    console.log(`  cd ${name}`);
    console.log("  npm install");
    console.log("  npm run build");

    console.log(chalk.blue("\nGenerated files:"));
    const files = await fs.readdir(projectPath);
    files.forEach((file) => {
      console.log(`  ${chalk.gray("•")} ${file}`);
    });

    console.log(chalk.blue("\nAvailable commands:"));
    console.log("  npm run build      - Generate SVG diagram");
    console.log("  npm run build:png  - Generate PNG diagram");
    console.log("  npm run build:pdf  - Generate PDF diagram");
    console.log("  npm run watch      - Watch for changes");
    console.log("  npm run validate   - Validate diagram syntax");
  } catch (error) {
    spinner.fail(chalk.red("Failed to initialize project"));
    console.error(chalk.red("Error:"), error.message);
    process.exit(1);
  }
}
