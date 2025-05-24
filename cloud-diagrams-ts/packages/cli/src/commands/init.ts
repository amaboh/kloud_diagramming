import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { TemplateGenerator } from '../utils/template-generator.js';

export const initCommand = new Command('init')
  .description('Initialize a new diagram project')
  .argument('<name>', 'Project name')
  .option(
    '-p, --provider <provider>',
    'Cloud provider (aws|azure|gcp|multi)',
    'aws'
  )
  .option(
    '-t, --template <template>',
    'Project template (basic|3tier|microservices|pipeline)',
    'basic'
  )
  .option('-d, --directory <dir>', 'Target directory', '.')
  .option('--typescript', 'Use TypeScript (default)')
  .option('--javascript', 'Use JavaScript instead of TypeScript')
  .option('--examples', 'Include example diagrams')
  .option('--git', 'Initialize git repository')
  .option('--install', 'Install dependencies automatically')
  .action(async (name, options) => {
    const spinner = ora(`Initializing project '${name}'...`).start();

    try {
      const generator = new TemplateGenerator();

      const config = {
        name,
        provider: options.provider,
        template: options.template,
        directory: options.directory,
        language: options.javascript ? 'javascript' : 'typescript',
        includeExamples: options.examples,
        initializeGit: options.git,
        installDependencies: options.install,
      };

      await generator.generate(config);

      spinner.succeed(`Project '${name}' initialized successfully!`);

      console.log(chalk.green('\n✅ Project created with:'));
      console.log(`   📦 Provider: ${options.provider.toUpperCase()}`);
      console.log(`   🏗️  Template: ${options.template}`);
      console.log(`   📝 Language: ${config.language}`);

      if (options.examples) {
        console.log(`   📋 Examples: Included`);
      }

      console.log(chalk.blue('\n🚀 Next steps:'));
      console.log(`   cd ${name}`);

      if (!options.install) {
        console.log(`   npm install`);
      }

      console.log(
        `   cloud-diagrams generate src/diagram.${config.language === 'typescript' ? 'ts' : 'js'}`
      );
    } catch (error: any) {
      spinner.fail(`Initialization failed: ${error.message}`);
      process.exit(1);
    }
  });
