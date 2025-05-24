import * as fs from "fs-extra";
import * as path from "path";
import chalk from "chalk";
import ora from "ora";
import { DiagramExecutor } from "../utils/diagram-executor";

interface ValidateOptions {
  strict: boolean;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    nodes: number;
    edges: number;
    groups: number;
  };
}

export async function validateCommand(input: string, options: ValidateOptions) {
  const spinner = ora("Validating diagram...").start();

  try {
    // Check if file exists
    if (!(await fs.pathExists(input))) {
      throw new Error(`Input file not found: ${input}`);
    }

    const result = await validateDiagram(input, options);

    if (result.valid) {
      spinner.succeed(chalk.green("Diagram validation passed"));
    } else {
      spinner.fail(chalk.red("Diagram validation failed"));
    }

    // Print results
    console.log(chalk.blue("\nValidation Results:"));
    console.log(
      `  Status: ${
        result.valid ? chalk.green("✓ Valid") : chalk.red("✗ Invalid")
      }`
    );
    console.log(`  Nodes: ${result.stats.nodes}`);
    console.log(`  Edges: ${result.stats.edges}`);
    console.log(`  Groups: ${result.stats.groups}`);

    if (result.errors.length > 0) {
      console.log(chalk.red("\nErrors:"));
      result.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
    }

    if (result.warnings.length > 0) {
      console.log(chalk.yellow("\nWarnings:"));
      result.warnings.forEach((warning, index) => {
        console.log(`  ${index + 1}. ${warning}`);
      });
    }

    if (!result.valid) {
      process.exit(1);
    }
  } catch (error) {
    spinner.fail(chalk.red("Validation failed"));
    console.error(chalk.red("Error:"), error.message);
    process.exit(1);
  }
}

async function validateDiagram(
  filePath: string,
  options: ValidateOptions
): Promise<ValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    // Try to execute the diagram
    const executor = new DiagramExecutor();
    const diagram = await executor.fromFile(filePath);

    // Basic structure validation
    if (!diagram.name || diagram.name.trim() === "") {
      errors.push("Diagram must have a name");
    }

    if (diagram.nodes.length === 0) {
      warnings.push("Diagram has no nodes");
    }

    if (diagram.edges.length === 0 && diagram.nodes.length > 1) {
      warnings.push("Diagram has multiple nodes but no connections");
    }

    // Validate edges
    const nodeIds = new Set(diagram.nodes.map((node) => node.id));
    diagram.edges.forEach((edge, index) => {
      if (!nodeIds.has(edge.fromId)) {
        errors.push(
          `Edge ${index + 1}: Source node '${edge.fromId}' not found`
        );
      }
      if (!nodeIds.has(edge.toId)) {
        errors.push(`Edge ${index + 1}: Target node '${edge.toId}' not found`);
      }
    });

    // Validate groups
    diagram.groups.forEach((group, index) => {
      if (!group.name || group.name.trim() === "") {
        errors.push(`Group ${index + 1}: Group must have a name`);
      }
    });

    // Strict mode validations
    if (options.strict) {
      // Check for isolated nodes
      const connectedNodes = new Set<string>();
      diagram.edges.forEach((edge) => {
        connectedNodes.add(edge.fromId);
        connectedNodes.add(edge.toId);
      });

      diagram.nodes.forEach((node) => {
        if (!connectedNodes.has(node.id) && diagram.nodes.length > 1) {
          warnings.push(
            `Node '${node.label}' is isolated (not connected to any other node)`
          );
        }
      });

      // Check for self-loops
      diagram.edges.forEach((edge, index) => {
        if (edge.fromId === edge.toId) {
          warnings.push(
            `Edge ${index + 1}: Self-loop detected (node connects to itself)`
          );
        }
      });

      // Check for duplicate edges
      const edgeSet = new Set<string>();
      diagram.edges.forEach((edge, index) => {
        const edgeKey = `${edge.fromId}->${edge.toId}`;
        if (edgeSet.has(edgeKey)) {
          warnings.push(`Edge ${index + 1}: Duplicate edge detected`);
        }
        edgeSet.add(edgeKey);
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      stats: {
        nodes: diagram.nodes.length,
        edges: diagram.edges.length,
        groups: diagram.groups.length,
      },
    };
  } catch (error) {
    errors.push(`Failed to parse diagram: ${error.message}`);

    return {
      valid: false,
      errors,
      warnings,
      stats: {
        nodes: 0,
        edges: 0,
        groups: 0,
      },
    };
  }
}
