import { Diagram } from '@cloud-diagrams/core';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';

const execAsync = promisify(exec);

export interface ExecutionOptions {
  validation?: boolean;
  verbose?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors?: Array<{ message: string; line?: number; context?: string }>;
  warnings?: Array<{ message: string; line?: number; context?: string }>;
}

export class DiagramExecutor {
  async execute(
    filePath: string,
    options: ExecutionOptions = {}
  ): Promise<Diagram> {
    const resolvedPath = path.resolve(filePath);
    const ext = path.extname(filePath).toLowerCase();

    try {
      let diagram: Diagram;

      switch (ext) {
        case '.ts':
          diagram = await this.executeTypeScript(resolvedPath, options);
          break;
        case '.js':
        case '.mjs':
          diagram = await this.executeJavaScript(resolvedPath, options);
          break;
        case '.json':
          diagram = await this.parseJSON(resolvedPath, options);
          break;
        default:
          throw new Error(
            `Unsupported file type: ${ext}. Supported types: .ts, .js, .mjs, .json`
          );
      }

      if (options.validation) {
        const validationResult = await this.validateDiagram(diagram);
        if (!validationResult.isValid) {
          throw new Error(
            `Validation failed: ${validationResult.errors?.[0]?.message}`
          );
        }
      }

      return diagram;
    } catch (error: any) {
      throw new Error(`Failed to execute ${filePath}: ${error.message}`);
    }
  }

  async validate(
    filePath: string,
    options: any = {}
  ): Promise<ValidationResult> {
    try {
      const diagram = await this.execute(filePath, { validation: false });
      return await this.validateDiagram(diagram, options);
    } catch (error: any) {
      return {
        isValid: false,
        errors: [{ message: error.message }],
      };
    }
  }

  private async executeTypeScript(
    filePath: string,
    options: ExecutionOptions
  ): Promise<Diagram> {
    const tempDir = await this.createTempDir();
    const tempJsFile = path.join(tempDir, 'diagram.js');

    try {
      // Compile TypeScript to JavaScript
      const tscCommand = `npx tsc --target ES2020 --module ESNext --moduleResolution node --esModuleInterop --allowSyntheticDefaultImports --skipLibCheck --outDir "${tempDir}" "${filePath}"`;

      if (options.verbose) {
        console.log(`Compiling TypeScript: ${tscCommand}`);
      }

      await execAsync(tscCommand);

      // Execute the compiled JavaScript
      return await this.executeJavaScript(tempJsFile, options);
    } finally {
      // Clean up temp files
      await this.cleanupTempDir(tempDir);
    }
  }

  private async executeJavaScript(
    filePath: string,
    options: ExecutionOptions
  ): Promise<Diagram> {
    try {
      // Dynamic import of the JavaScript module
      const module = await import(filePath);

      // Look for exported diagram or default export
      let diagram: Diagram;

      if (module.default && module.default instanceof Diagram) {
        diagram = module.default;
      } else if (module.diagram && module.diagram instanceof Diagram) {
        diagram = module.diagram;
      } else if (typeof module.default === 'function') {
        // If default export is a function, call it
        const result = await module.default();
        if (result instanceof Diagram) {
          diagram = result;
        } else {
          throw new Error(
            'Default export function did not return a Diagram instance'
          );
        }
      } else {
        // Look for any exported Diagram instance
        const diagramExports = Object.values(module).filter(
          (exp) => exp instanceof Diagram
        );
        if (diagramExports.length === 1) {
          diagram = diagramExports[0] as Diagram;
        } else if (diagramExports.length > 1) {
          throw new Error(
            'Multiple Diagram instances found. Please export one as "diagram" or as default export.'
          );
        } else {
          throw new Error(
            'No Diagram instance found in exports. Please export a Diagram instance.'
          );
        }
      }

      return diagram;
    } catch (error: any) {
      if (error.code === 'ERR_MODULE_NOT_FOUND') {
        throw new Error(
          `Module not found: ${filePath}. Make sure the file exists and all dependencies are installed.`
        );
      }
      throw error;
    }
  }

  private async parseJSON(
    filePath: string,
    options: ExecutionOptions
  ): Promise<Diagram> {
    try {
      const fs = await import('fs/promises');
      const content = await fs.readFile(filePath, 'utf8');
      const spec = JSON.parse(content);

      return await this.createDiagramFromSpec(spec);
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        throw new Error(`Invalid JSON in ${filePath}: ${error.message}`);
      }
      throw error;
    }
  }

  private async createDiagramFromSpec(spec: any): Promise<Diagram> {
    // Import the required packages dynamically
    const { Diagram } = await import('@cloud-diagrams/core');

    // Validate spec structure
    if (!spec.name) {
      throw new Error('Diagram specification must include a "name" field');
    }

    const diagram = new Diagram(spec.name, spec.options || {});

    // Add nodes
    if (spec.nodes && Array.isArray(spec.nodes)) {
      for (const nodeSpec of spec.nodes) {
        await this.addNodeFromSpec(diagram, nodeSpec);
      }
    }

    // Add connections
    if (spec.connections && Array.isArray(spec.connections)) {
      for (const connSpec of spec.connections) {
        await this.addConnectionFromSpec(diagram, connSpec);
      }
    }

    // Add groups
    if (spec.groups && Array.isArray(spec.groups)) {
      for (const groupSpec of spec.groups) {
        await this.addGroupFromSpec(diagram, groupSpec);
      }
    }

    return diagram;
  }

  private async addNodeFromSpec(
    diagram: Diagram,
    nodeSpec: any
  ): Promise<void> {
    const { provider, service, id, label, options } = nodeSpec;

    if (!provider || !service || !id) {
      throw new Error(
        'Node specification must include provider, service, and id'
      );
    }

    // Dynamic import of provider package
    let providerPackage: any;
    switch (provider.toLowerCase()) {
      case 'aws':
        providerPackage = await import('@cloud-diagrams/aws');
        break;
      case 'azure':
        providerPackage = await import('@cloud-diagrams/azure');
        break;
      case 'gcp':
        providerPackage = await import('@cloud-diagrams/gcp');
        break;
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }

    const ServiceClass = providerPackage[service];
    if (!ServiceClass) {
      throw new Error(`Service ${service} not found in ${provider} provider`);
    }

    const node = new ServiceClass(id, label || id, options || {});
    diagram.addNode(node);
  }

  private async addConnectionFromSpec(
    diagram: Diagram,
    connSpec: any
  ): Promise<void> {
    const { from, to, options } = connSpec;

    if (!from || !to) {
      throw new Error(
        'Connection specification must include from and to node IDs'
      );
    }

    diagram.connect(from, to, options || {});
  }

  private async addGroupFromSpec(
    diagram: Diagram,
    groupSpec: any
  ): Promise<void> {
    const { id, label, nodes, options } = groupSpec;

    if (!id) {
      throw new Error('Group specification must include an id');
    }

    const group = diagram.addGroup(label || id, options || {});

    if (nodes && Array.isArray(nodes)) {
      for (const nodeId of nodes) {
        // Move existing node to group or create new node
        // This is a simplified implementation
        const existingNode = diagram.getNode?.(nodeId);
        if (existingNode) {
          group.addNode(existingNode);
        }
      }
    }
  }

  private async validateDiagram(
    diagram: Diagram,
    options: any = {}
  ): Promise<ValidationResult> {
    const errors: Array<{ message: string; line?: number; context?: string }> =
      [];
    const warnings: Array<{
      message: string;
      line?: number;
      context?: string;
    }> = [];

    try {
      // Basic validation
      if (!diagram.getName || !diagram.getName()) {
        errors.push({ message: 'Diagram must have a name' });
      }

      // Check for nodes
      const nodes = diagram.getNodes?.() || [];
      if (nodes.length === 0) {
        warnings.push({ message: 'Diagram has no nodes' });
      }

      // Check for orphaned nodes
      const connections = diagram.getConnections?.() || [];
      if (nodes.length > 1 && connections.length === 0) {
        warnings.push({
          message: 'Diagram has multiple nodes but no connections',
        });
      }

      // Strict mode validations
      if (options.strict) {
        // Check for node descriptions
        nodes.forEach((node: any, index: number) => {
          if (!node.metadata?.description) {
            warnings.push({
              message: `Node '${node.id}' missing description`,
              context: `Consider adding a description for better documentation`,
            });
          }
        });

        // Check for proper group usage
        const groups = diagram.getGroups?.() || [];
        groups.forEach((group: any) => {
          if (!group.type) {
            warnings.push({
              message: `Group '${group.id}' should specify a type`,
              context: `Add type: 'vpc', 'subnet', 'region', etc.`,
            });
          }
        });
      }

      return {
        isValid: errors.length === 0,
        errors: errors.length > 0 ? errors : undefined,
        warnings: warnings.length > 0 ? warnings : undefined,
      };
    } catch (error: any) {
      return {
        isValid: false,
        errors: [{ message: `Validation error: ${error.message}` }],
      };
    }
  }

  private async createTempDir(): Promise<string> {
    const os = await import('os');
    const fs = await import('fs/promises');
    const tempDir = path.join(os.tmpdir(), `cloud-diagrams-${Date.now()}`);
    await fs.mkdir(tempDir, { recursive: true });
    return tempDir;
  }

  private async cleanupTempDir(dir: string): Promise<void> {
    try {
      const fs = await import('fs/promises');
      await fs.rm(dir, { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  }
}
