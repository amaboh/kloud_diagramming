import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { DiagramExecutor } from '../utils/diagram-executor.js';

export const validateCommand = new Command('validate')
  .description('Validate diagram syntax and structure')
  .argument('<input>', 'Input file path (.ts, .js, or .json)')
  .option('--strict', 'Enable strict validation rules')
  .option('--rules <rules>', 'Comma-separated validation rules')
  .option('--ignore <patterns>', 'Ignore files matching patterns')
  .option('--format <format>', 'Output format (text|json|junit)', 'text')
  .option('--output <file>', 'Output validation report to file')
  .action(async (input, options) => {
    const spinner = ora('Validating diagram...').start();

    try {
      const executor = new DiagramExecutor();

      const validationOptions = {
        strict: options.strict,
        rules: options.rules ? options.rules.split(',') : undefined,
        ignorePatterns: options.ignore ? options.ignore.split(',') : undefined,
        verbose: true,
      };

      const result = await executor.validate(input, validationOptions);

      spinner.stop();

      if (result.isValid) {
        console.log(chalk.green('✅ Diagram is valid'));

        if (result.warnings && result.warnings.length > 0) {
          console.log(
            chalk.yellow(`\n⚠️  ${result.warnings.length} warning(s):`)
          );
          result.warnings.forEach((warning, index) => {
            console.log(chalk.yellow(`   ${index + 1}. ${warning.message}`));
            if (warning.line) {
              console.log(
                chalk.gray(`      Line ${warning.line}: ${warning.context}`)
              );
            }
          });
        }
      } else {
        console.log(chalk.red('❌ Diagram validation failed'));

        if (result.errors && result.errors.length > 0) {
          console.log(chalk.red(`\n🚫 ${result.errors.length} error(s):`));
          result.errors.forEach((error, index) => {
            console.log(chalk.red(`   ${index + 1}. ${error.message}`));
            if (error.line) {
              console.log(
                chalk.gray(`      Line ${error.line}: ${error.context}`)
              );
            }
          });
        }
      }

      // Output summary
      const summary = {
        valid: result.isValid ? 1 : 0,
        warnings: result.warnings?.length || 0,
        errors: result.errors?.length || 0,
      };

      console.log(
        chalk.blue(
          `\n📊 Summary: ${summary.valid} valid, ${summary.warnings} warning(s), ${summary.errors} error(s)`
        )
      );

      // Write report to file if specified
      if (options.output) {
        const report = generateReport(result, options.format);
        await writeReport(options.output, report);
        console.log(chalk.gray(`Report written to: ${options.output}`));
      }

      // Exit with error code if validation failed
      if (!result.isValid) {
        process.exit(1);
      }
    } catch (error: any) {
      spinner.fail(`Validation failed: ${error.message}`);
      process.exit(1);
    }
  });

function generateReport(result: any, format: string): string {
  switch (format) {
    case 'json':
      return JSON.stringify(result, null, 2);

    case 'junit':
      return generateJUnitReport(result);

    default: // text
      return generateTextReport(result);
  }
}

function generateTextReport(result: any): string {
  let report = `Validation Report\n================\n\n`;
  report += `Status: ${result.isValid ? 'VALID' : 'INVALID'}\n`;
  report += `Errors: ${result.errors?.length || 0}\n`;
  report += `Warnings: ${result.warnings?.length || 0}\n\n`;

  if (result.errors?.length > 0) {
    report += `Errors:\n`;
    result.errors.forEach((error: any, index: number) => {
      report += `  ${index + 1}. ${error.message}\n`;
      if (error.line) {
        report += `     Line ${error.line}: ${error.context}\n`;
      }
    });
    report += '\n';
  }

  if (result.warnings?.length > 0) {
    report += `Warnings:\n`;
    result.warnings.forEach((warning: any, index: number) => {
      report += `  ${index + 1}. ${warning.message}\n`;
      if (warning.line) {
        report += `     Line ${warning.line}: ${warning.context}\n`;
      }
    });
  }

  return report;
}

function generateJUnitReport(result: any): string {
  const testName = 'DiagramValidation';
  const errors = result.errors?.length || 0;
  const warnings = result.warnings?.length || 0;
  const total = 1; // One test case for the diagram

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<testsuite name="${testName}" tests="${total}" failures="${errors}" warnings="${warnings}">\n`;

  if (result.isValid) {
    xml += `  <testcase name="diagram-validation" classname="${testName}"/>\n`;
  } else {
    xml += `  <testcase name="diagram-validation" classname="${testName}">\n`;
    result.errors?.forEach((error: any) => {
      xml += `    <failure message="${escapeXml(error.message)}">${escapeXml(error.context || '')}</failure>\n`;
    });
    xml += `  </testcase>\n`;
  }

  xml += `</testsuite>\n`;
  return xml;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function writeReport(filePath: string, content: string): Promise<void> {
  const fs = await import('fs/promises');
  await fs.writeFile(filePath, content, 'utf8');
}
