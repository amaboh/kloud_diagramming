import * as fs from "fs-extra";
import * as path from "path";

interface TemplateConfig {
  name: string;
  provider: "aws" | "azure" | "gcp" | "multi";
  template: "basic" | "3tier" | "microservices" | "data-pipeline";
  useTypeScript: boolean;
  useJson: boolean;
}

export class TemplateGenerator {
  /**
   * Generate project files based on template configuration
   */
  async generate(projectPath: string, config: TemplateConfig): Promise<void> {
    if (config.useJson) {
      await this.generateJsonTemplate(projectPath, config);
    } else {
      await this.generateCodeTemplate(projectPath, config);
    }

    // Generate example files
    await this.generateExamples(projectPath, config);
  }

  /**
   * Generate JSON-based template
   */
  private async generateJsonTemplate(
    projectPath: string,
    config: TemplateConfig
  ): Promise<void> {
    const jsonSpec = this.getJsonTemplate(config);
    await fs.writeJson(path.join(projectPath, "diagram.json"), jsonSpec, {
      spaces: 2,
    });
  }

  /**
   * Generate TypeScript/JavaScript code template
   */
  private async generateCodeTemplate(
    projectPath: string,
    config: TemplateConfig
  ): Promise<void> {
    const codeTemplate = this.getCodeTemplate(config);
    const fileName = config.useTypeScript ? "diagram.ts" : "diagram.js";
    await fs.writeFile(path.join(projectPath, fileName), codeTemplate);
  }

  /**
   * Generate example files
   */
  private async generateExamples(
    projectPath: string,
    config: TemplateConfig
  ): Promise<void> {
    const examplesDir = path.join(projectPath, "examples");
    await fs.ensureDir(examplesDir);

    // Generate different architecture examples
    const examples = [
      { name: "simple", template: "basic" },
      { name: "3tier-web-app", template: "3tier" },
      { name: "microservices", template: "microservices" },
    ];

    for (const example of examples) {
      const exampleConfig = { ...config, template: example.template as any };
      const codeTemplate = this.getCodeTemplate(exampleConfig);
      const fileName = config.useTypeScript
        ? `${example.name}.ts`
        : `${example.name}.js`;
      await fs.writeFile(path.join(examplesDir, fileName), codeTemplate);
    }
  }

  /**
   * Get JSON template based on configuration
   */
  private getJsonTemplate(config: TemplateConfig): any {
    switch (config.template) {
      case "basic":
        return this.getBasicJsonTemplate(config);
      case "3tier":
        return this.get3TierJsonTemplate(config);
      case "microservices":
        return this.getMicroservicesJsonTemplate(config);
      case "data-pipeline":
        return this.getDataPipelineJsonTemplate(config);
      default:
        return this.getBasicJsonTemplate(config);
    }
  }

  /**
   * Get code template based on configuration
   */
  private getCodeTemplate(config: TemplateConfig): string {
    switch (config.template) {
      case "basic":
        return this.getBasicCodeTemplate(config);
      case "3tier":
        return this.get3TierCodeTemplate(config);
      case "microservices":
        return this.getMicroservicesCodeTemplate(config);
      case "data-pipeline":
        return this.getDataPipelineCodeTemplate(config);
      default:
        return this.getBasicCodeTemplate(config);
    }
  }

  /**
   * Basic template with simple architecture
   */
  private getBasicCodeTemplate(config: TemplateConfig): string {
    const imports = this.getImports(config);
    const services = this.getBasicServices(config);

    return `${imports}

// Create a new diagram
const diagram = new Diagram("${config.name}", {
  direction: "LR",
  theme: "light"
});

${services}

// Export the diagram
${
  config.useTypeScript ? "export default diagram;" : "module.exports = diagram;"
}
`;
  }

  /**
   * 3-tier web application template
   */
  private get3TierCodeTemplate(config: TemplateConfig): string {
    const imports = this.getImports(config);
    const services = this.get3TierServices(config);

    return `${imports}

// Create a 3-tier web application diagram
const diagram = new Diagram("${config.name} - 3-Tier Architecture", {
  direction: "LR",
  theme: "light"
});

${services}

// Export the diagram
${
  config.useTypeScript ? "export default diagram;" : "module.exports = diagram;"
}
`;
  }

  /**
   * Microservices template
   */
  private getMicroservicesCodeTemplate(config: TemplateConfig): string {
    const imports = this.getImports(config);
    const services = this.getMicroservicesServices(config);

    return `${imports}

// Create a microservices architecture diagram
const diagram = new Diagram("${config.name} - Microservices Architecture", {
  direction: "TB",
  theme: "light"
});

${services}

// Export the diagram
${
  config.useTypeScript ? "export default diagram;" : "module.exports = diagram;"
}
`;
  }

  /**
   * Data pipeline template
   */
  private getDataPipelineCodeTemplate(config: TemplateConfig): string {
    const imports = this.getImports(config);
    const services = this.getDataPipelineServices(config);

    return `${imports}

// Create a data pipeline diagram
const diagram = new Diagram("${config.name} - Data Pipeline", {
  direction: "LR",
  theme: "light"
});

${services}

// Export the diagram
${
  config.useTypeScript ? "export default diagram;" : "module.exports = diagram;"
}
`;
  }

  /**
   * Get import statements based on provider
   */
  private getImports(config: TemplateConfig): string {
    const coreImport = `import { Diagram } from '@cloud-diagrams/core';`;

    if (config.provider === "multi") {
      return `${coreImport}
import * as AWS from '@cloud-diagrams/aws';
import * as Azure from '@cloud-diagrams/azure';
import * as GCP from '@cloud-diagrams/gcp';`;
    } else {
      const providerName = config.provider.toUpperCase();
      return `${coreImport}
import * as ${providerName} from '@cloud-diagrams/${config.provider}';`;
    }
  }

  /**
   * Get basic services based on provider
   */
  private getBasicServices(config: TemplateConfig): string {
    switch (config.provider) {
      case "aws":
        return `// Add AWS services
const webServer = diagram.addNode(AWS.EC2("Web Server"));
const database = diagram.addNode(AWS.RDS("Database"));

// Connect services
diagram.connect(webServer, database);`;

      case "azure":
        return `// Add Azure services
const webApp = diagram.addNode(Azure.AppService("Web App"));
const database = diagram.addNode(Azure.SQLDatabase("Database"));

// Connect services
diagram.connect(webApp, database);`;

      case "gcp":
        return `// Add GCP services
const computeEngine = diagram.addNode(GCP.ComputeEngine("Web Server"));
const cloudSQL = diagram.addNode(GCP.CloudSQL("Database"));

// Connect services
diagram.connect(computeEngine, cloudSQL);`;

      case "multi":
        return `// Multi-cloud architecture
const awsWeb = diagram.addNode(AWS.EC2("AWS Web Server"));
const azureDB = diagram.addNode(Azure.SQLDatabase("Azure Database"));
const gcpStorage = diagram.addNode(GCP.CloudStorage("GCP Storage"));

// Connect services
diagram.connect(awsWeb, azureDB);
diagram.connect(awsWeb, gcpStorage);`;

      default:
        return this.getBasicServices({ ...config, provider: "aws" });
    }
  }

  /**
   * Get 3-tier services
   */
  private get3TierServices(config: TemplateConfig): string {
    switch (config.provider) {
      case "aws":
        return `// Create VPC group
diagram.addGroup("VPC", (vpc) => {
  // Web tier
  const webGroup = vpc.addGroup("Web Tier", (web) => {
    web.addNode(AWS.ALB("Load Balancer"));
    web.addNode(AWS.EC2("Web Server 1"));
    web.addNode(AWS.EC2("Web Server 2"));
  });

  // Application tier
  const appGroup = vpc.addGroup("App Tier", (app) => {
    app.addNode(AWS.EC2("App Server 1"));
    app.addNode(AWS.EC2("App Server 2"));
  });

  // Database tier
  const dbGroup = vpc.addGroup("DB Tier", (db) => {
    db.addNode(AWS.RDS("Primary DB"));
    db.addNode(AWS.RDS("Read Replica"));
  });
});

// External services
const cdn = diagram.addNode(AWS.CloudFront("CDN"));
const storage = diagram.addNode(AWS.S3("Static Assets"));

// Connect tiers
diagram.connect(cdn, "Web Tier");
diagram.connect("Web Tier", "App Tier");
diagram.connect("App Tier", "DB Tier");
diagram.connect(cdn, storage);`;

      case "azure":
        return `// Create Resource Group
diagram.addGroup("Resource Group", (rg) => {
  // Web tier
  const webGroup = rg.addGroup("Web Tier", (web) => {
    web.addNode(Azure.ApplicationGateway("App Gateway"));
    web.addNode(Azure.AppService("Web App 1"));
    web.addNode(Azure.AppService("Web App 2"));
  });

  // Application tier
  const appGroup = rg.addGroup("App Tier", (app) => {
    app.addNode(Azure.AppService("API App 1"));
    app.addNode(Azure.AppService("API App 2"));
  });

  // Database tier
  const dbGroup = rg.addGroup("DB Tier", (db) => {
    db.addNode(Azure.SQLDatabase("Primary DB"));
    db.addNode(Azure.SQLDatabase("Read Replica"));
  });
});

// External services
const cdn = diagram.addNode(Azure.CDN("CDN"));
const storage = diagram.addNode(Azure.BlobStorage("Static Assets"));

// Connect tiers
diagram.connect(cdn, "Web Tier");
diagram.connect("Web Tier", "App Tier");
diagram.connect("App Tier", "DB Tier");
diagram.connect(cdn, storage);`;

      default:
        return this.get3TierServices({ ...config, provider: "aws" });
    }
  }

  /**
   * Get microservices architecture
   */
  private getMicroservicesServices(config: TemplateConfig): string {
    switch (config.provider) {
      case "aws":
        return `// API Gateway
const apiGateway = diagram.addNode(AWS.APIGateway("API Gateway"));

// Microservices
diagram.addGroup("Microservices", (services) => {
  const userService = services.addNode(AWS.Lambda("User Service"));
  const orderService = services.addNode(AWS.Lambda("Order Service"));
  const paymentService = services.addNode(AWS.Lambda("Payment Service"));
  const inventoryService = services.addNode(AWS.Lambda("Inventory Service"));
});

// Databases
diagram.addGroup("Databases", (dbs) => {
  const userDB = dbs.addNode(AWS.DynamoDB("User DB"));
  const orderDB = dbs.addNode(AWS.DynamoDB("Order DB"));
  const paymentDB = dbs.addNode(AWS.RDS("Payment DB"));
  const inventoryDB = dbs.addNode(AWS.DynamoDB("Inventory DB"));
});

// Message Queue
const messageQueue = diagram.addNode(AWS.SQS("Message Queue"));

// Connect services
diagram.connect(apiGateway, "Microservices");
diagram.connect("Microservices", "Databases");
diagram.connect("Microservices", messageQueue);`;

      case "azure":
        return `// API Management
const apiManagement = diagram.addNode(Azure.APIManagement("API Management"));

// Microservices
diagram.addGroup("Microservices", (services) => {
  const userService = services.addNode(Azure.Functions("User Service"));
  const orderService = services.addNode(Azure.Functions("Order Service"));
  const paymentService = services.addNode(Azure.Functions("Payment Service"));
  const inventoryService = services.addNode(Azure.Functions("Inventory Service"));
});

// Databases
diagram.addGroup("Databases", (dbs) => {
  const userDB = dbs.addNode(Azure.CosmosDB("User DB"));
  const orderDB = dbs.addNode(Azure.CosmosDB("Order DB"));
  const paymentDB = dbs.addNode(Azure.SQLDatabase("Payment DB"));
  const inventoryDB = dbs.addNode(Azure.CosmosDB("Inventory DB"));
});

// Service Bus
const serviceBus = diagram.addNode(Azure.ServiceBus("Service Bus"));

// Connect services
diagram.connect(apiManagement, "Microservices");
diagram.connect("Microservices", "Databases");
diagram.connect("Microservices", serviceBus);`;

      default:
        return this.getMicroservicesServices({ ...config, provider: "aws" });
    }
  }

  /**
   * Get data pipeline services
   */
  private getDataPipelineServices(config: TemplateConfig): string {
    switch (config.provider) {
      case "aws":
        return `// Data Sources
diagram.addGroup("Data Sources", (sources) => {
  sources.addNode(AWS.RDS("Operational DB"));
  sources.addNode(AWS.S3("Log Files"));
  sources.addNode(AWS.Kinesis("Streaming Data"));
});

// Data Processing
diagram.addGroup("Processing", (processing) => {
  processing.addNode(AWS.Glue("ETL Jobs"));
  processing.addNode(AWS.EMR("Big Data Processing"));
  processing.addNode(AWS.Lambda("Data Transformation"));
});

// Data Storage
diagram.addGroup("Storage", (storage) => {
  storage.addNode(AWS.S3("Data Lake"));
  storage.addNode(AWS.Redshift("Data Warehouse"));
});

// Analytics
diagram.addGroup("Analytics", (analytics) => {
  analytics.addNode(AWS.Athena("Query Engine"));
  analytics.addNode(AWS.QuickSight("Visualization"));
});

// Connect pipeline stages
diagram.connect("Data Sources", "Processing");
diagram.connect("Processing", "Storage");
diagram.connect("Storage", "Analytics");`;

      case "azure":
        return `// Data Sources
diagram.addGroup("Data Sources", (sources) => {
  sources.addNode(Azure.SQLDatabase("Operational DB"));
  sources.addNode(Azure.BlobStorage("Log Files"));
  sources.addNode(Azure.EventHubs("Streaming Data"));
});

// Data Processing
diagram.addGroup("Processing", (processing) => {
  processing.addNode(Azure.DataFactory("ETL Pipeline"));
  processing.addNode(Azure.HDInsight("Big Data Processing"));
  processing.addNode(Azure.Functions("Data Transformation"));
});

// Data Storage
diagram.addGroup("Storage", (storage) => {
  storage.addNode(Azure.DataLake("Data Lake"));
  storage.addNode(Azure.Synapse("Data Warehouse"));
});

// Analytics
diagram.addGroup("Analytics", (analytics) => {
  analytics.addNode(Azure.Synapse("Query Engine"));
  analytics.addNode(Azure.PowerBI("Visualization"));
});

// Connect pipeline stages
diagram.connect("Data Sources", "Processing");
diagram.connect("Processing", "Storage");
diagram.connect("Storage", "Analytics");`;

      default:
        return this.getDataPipelineServices({ ...config, provider: "aws" });
    }
  }

  /**
   * Generate basic JSON template
   */
  private getBasicJsonTemplate(config: TemplateConfig): any {
    return {
      name: config.name,
      config: {
        direction: "LR",
        theme: "light",
      },
      nodes: [
        {
          id: "web",
          provider: config.provider === "multi" ? "aws" : config.provider,
          service: config.provider === "azure" ? "AppService" : "EC2",
          label: "Web Server",
        },
        {
          id: "db",
          provider: config.provider === "multi" ? "azure" : config.provider,
          service:
            config.provider === "gcp"
              ? "CloudSQL"
              : config.provider === "azure"
              ? "SQLDatabase"
              : "RDS",
          label: "Database",
        },
      ],
      edges: [
        {
          from: "web",
          to: "db",
        },
      ],
    };
  }

  /**
   * Generate 3-tier JSON template
   */
  private get3TierJsonTemplate(config: TemplateConfig): any {
    // Simplified 3-tier for JSON format
    return {
      name: `${config.name} - 3-Tier Architecture`,
      config: {
        direction: "LR",
        theme: "light",
      },
      groups: [
        { id: "web", name: "Web Tier" },
        { id: "app", name: "App Tier" },
        { id: "db", name: "DB Tier" },
      ],
      nodes: [
        {
          id: "lb",
          provider: config.provider === "azure" ? "azure" : "aws",
          service: config.provider === "azure" ? "ApplicationGateway" : "ALB",
          label: "Load Balancer",
          group: "web",
        },
        {
          id: "web1",
          provider: config.provider === "azure" ? "azure" : "aws",
          service: config.provider === "azure" ? "AppService" : "EC2",
          label: "Web Server 1",
          group: "web",
        },
        {
          id: "app1",
          provider: config.provider === "azure" ? "azure" : "aws",
          service: config.provider === "azure" ? "AppService" : "EC2",
          label: "App Server 1",
          group: "app",
        },
        {
          id: "database",
          provider: config.provider === "azure" ? "azure" : "aws",
          service: config.provider === "azure" ? "SQLDatabase" : "RDS",
          label: "Database",
          group: "db",
        },
      ],
      edges: [
        { from: "lb", to: "web1" },
        { from: "web1", to: "app1" },
        { from: "app1", to: "database" },
      ],
    };
  }

  /**
   * Generate microservices JSON template
   */
  private getMicroservicesJsonTemplate(config: TemplateConfig): any {
    return this.getBasicJsonTemplate(config); // Simplified for JSON
  }

  /**
   * Generate data pipeline JSON template
   */
  private getDataPipelineJsonTemplate(config: TemplateConfig): any {
    return this.getBasicJsonTemplate(config); // Simplified for JSON
  }

  /**
   * Generate README content
   */
  generateReadme(config: TemplateConfig): string {
    return `# ${config.name}

Cloud architecture diagram generated with [@cloud-diagrams/cli](https://github.com/cloud-diagrams/cloud-diagrams-ts).

## Architecture

This diagram represents a **${
      config.template
    }** architecture using **${config.provider.toUpperCase()}** services.

## Usage

### Generate Diagram

\`\`\`bash
# Generate SVG
npm run build

# Generate PNG
npm run build:png

# Generate PDF
npm run build:pdf
\`\`\`

### Watch Mode

\`\`\`bash
npm run watch
\`\`\`

### Validate

\`\`\`bash
npm run validate
\`\`\`

## Customization

Edit the \`diagram.${
      config.useTypeScript ? "ts" : "js"
    }\` file to modify the architecture:

- Add new services
- Change connections
- Modify groups and layouts
- Update themes and styling

## Examples

Check the \`examples/\` directory for more architecture patterns:

- \`simple.${config.useTypeScript ? "ts" : "js"}\` - Basic architecture
- \`3tier-web-app.${
      config.useTypeScript ? "ts" : "js"
    }\` - 3-tier web application
- \`microservices.${
      config.useTypeScript ? "ts" : "js"
    }\` - Microservices architecture

## Documentation

- [Cloud Diagrams Documentation](https://cloud-diagrams.dev)
- [CLI Reference](https://cloud-diagrams.dev/cli)
- [API Reference](https://cloud-diagrams.dev/api)

## License

MIT
`;
  }
}
