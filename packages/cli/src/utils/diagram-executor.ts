import * as fs from "fs-extra";
import * as path from "path";
import { execSync } from "child_process";
import { Diagram } from "@cloud-diagrams/core";
import * as AWS from "@cloud-diagrams/aws";
import * as Azure from "@cloud-diagrams/azure";
import * as GCP from "@cloud-diagrams/gcp";

interface JsonDiagramSpec {
  name: string;
  config?: {
    direction?: "LR" | "TB" | "RL" | "BT";
    theme?: "light" | "dark";
  };
  nodes: Array<{
    id: string;
    provider: "aws" | "azure" | "gcp";
    service: string;
    label: string;
    group?: string;
  }>;
  edges: Array<{
    from: string;
    to: string;
    label?: string;
  }>;
  groups?: Array<{
    id: string;
    name: string;
    parent?: string;
  }>;
}

export class DiagramExecutor {
  private tempDir: string;

  constructor() {
    this.tempDir = path.join(process.cwd(), ".cloud-diagrams-temp");
  }

  /**
   * Execute a TypeScript or JavaScript file and extract the diagram
   */
  async fromFile(filePath: string): Promise<Diagram> {
    const absolutePath = path.resolve(filePath);
    const ext = path.extname(filePath).toLowerCase();

    if (ext === ".ts") {
      return this.executeTypeScript(absolutePath);
    } else if (ext === ".js") {
      return this.executeJavaScript(absolutePath);
    } else {
      throw new Error(`Unsupported file extension: ${ext}`);
    }
  }

  /**
   * Create diagram from JSON specification
   */
  async fromJson(spec: JsonDiagramSpec): Promise<Diagram> {
    const diagram = new Diagram(spec.name, spec.config || {});

    // Create groups first
    const groupMap = new Map<string, any>();
    if (spec.groups) {
      for (const groupSpec of spec.groups) {
        const group = diagram.addGroup(groupSpec.name, () => {});
        groupMap.set(groupSpec.id, group);
      }
    }

    // Create nodes
    const nodeMap = new Map<string, any>();
    for (const nodeSpec of spec.nodes) {
      const nodeClass = this.getNodeClass(nodeSpec.provider, nodeSpec.service);
      const node = nodeClass(nodeSpec.label);

      if (nodeSpec.group && groupMap.has(nodeSpec.group)) {
        const group = groupMap.get(nodeSpec.group);
        group.addNode(node);
      } else {
        diagram.addNode(node);
      }

      nodeMap.set(nodeSpec.id, node);
    }

    // Create edges
    for (const edgeSpec of spec.edges) {
      const fromNode = nodeMap.get(edgeSpec.from);
      const toNode = nodeMap.get(edgeSpec.to);

      if (!fromNode || !toNode) {
        throw new Error(`Invalid edge: ${edgeSpec.from} -> ${edgeSpec.to}`);
      }

      diagram.connect(fromNode, toNode, edgeSpec.label);
    }

    return diagram;
  }

  /**
   * Execute TypeScript file
   */
  private async executeTypeScript(filePath: string): Promise<Diagram> {
    // Ensure temp directory exists
    await fs.ensureDir(this.tempDir);

    try {
      // Compile TypeScript to JavaScript
      const jsPath = path.join(this.tempDir, "diagram.js");

      execSync(
        `npx tsc "${filePath}" --outDir "${this.tempDir}" --module commonjs --target es2020 --esModuleInterop --skipLibCheck`,
        {
          stdio: "pipe",
        }
      );

      // Execute the compiled JavaScript
      return this.executeJavaScript(jsPath);
    } catch (error) {
      throw new Error(`TypeScript compilation failed: ${error.message}`);
    } finally {
      // Clean up temp directory
      await fs.remove(this.tempDir);
    }
  }

  /**
   * Execute JavaScript file
   */
  private async executeJavaScript(filePath: string): Promise<Diagram> {
    try {
      // Clear require cache to ensure fresh execution
      delete require.cache[require.resolve(filePath)];

      // Create execution context with cloud providers
      const context = {
        Diagram,
        AWS,
        Azure,
        GCP,
        require,
        module: { exports: {} },
        exports: {},
        __filename: filePath,
        __dirname: path.dirname(filePath),
        console,
        process,
      };

      // Read and execute the file
      const code = await fs.readFile(filePath, "utf-8");

      // Wrap code in a function to provide context
      const wrappedCode = `
        (function(Diagram, AWS, Azure, GCP, require, module, exports, __filename, __dirname, console, process) {
          ${code}
          
          // Return the diagram if it's exported
          if (typeof module.exports === 'object' && module.exports.diagram) {
            return module.exports.diagram;
          }
          if (typeof module.exports === 'function') {
            return module.exports();
          }
          if (module.exports instanceof Diagram) {
            return module.exports;
          }
          
          // Look for global diagram variable
          if (typeof diagram !== 'undefined') {
            return diagram;
          }
          
          throw new Error('No diagram found. Please export a Diagram instance or assign it to a variable named "diagram".');
        })
      `;

      // Execute the wrapped code
      const func = eval(wrappedCode);
      const result = func(
        context.Diagram,
        context.AWS,
        context.Azure,
        context.GCP,
        context.require,
        context.module,
        context.exports,
        context.__filename,
        context.__dirname,
        context.console,
        context.process
      );

      if (!(result instanceof Diagram)) {
        throw new Error("Executed file did not return a Diagram instance");
      }

      return result;
    } catch (error) {
      throw new Error(`JavaScript execution failed: ${error.message}`);
    }
  }

  /**
   * Get node class from provider and service name
   */
  private getNodeClass(provider: string, service: string): any {
    switch (provider.toLowerCase()) {
      case "aws":
        if (!(service in AWS)) {
          throw new Error(`Unknown AWS service: ${service}`);
        }
        return (AWS as any)[service];

      case "azure":
        if (!(service in Azure)) {
          throw new Error(`Unknown Azure service: ${service}`);
        }
        return (Azure as any)[service];

      case "gcp":
        if (!(service in GCP)) {
          throw new Error(`Unknown GCP service: ${service}`);
        }
        return (GCP as any)[service];

      default:
        throw new Error(`Unknown provider: ${provider}`);
    }
  }
}
