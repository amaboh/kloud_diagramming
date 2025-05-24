import * as path from 'path';

export interface TemplateConfig {
  name: string;
  provider: string;
  template: string;
  directory: string;
  language: 'typescript' | 'javascript';
  includeExamples: boolean;
  initializeGit: boolean;
  installDependencies: boolean;
}

export class TemplateGenerator {
  async generate(config: TemplateConfig): Promise<void> {
    const projectDir = path.join(config.directory, config.name);

    // Create project directory
    await this.createDirectory(projectDir);

    // Generate package.json
    await this.generatePackageJson(projectDir, config);

    // Generate TypeScript/JavaScript config
    if (config.language === 'typescript') {
      await this.generateTypeScriptConfig(projectDir);
    }

    // Generate main diagram file
    await this.generateMainDiagram(projectDir, config);

    // Generate examples if requested
    if (config.includeExamples) {
      await this.generateExamples(projectDir, config);
    }

    // Generate README
    await this.generateReadme(projectDir, config);

    // Initialize git if requested
    if (config.initializeGit) {
      await this.initializeGit(projectDir);
    }

    // Install dependencies if requested
    if (config.installDependencies) {
      await this.installDependencies(projectDir);
    }
  }

  private async createDirectory(dir: string): Promise<void> {
    const fs = await import('fs/promises');
    await fs.mkdir(dir, { recursive: true });
    await fs.mkdir(path.join(dir, 'src'), { recursive: true });
  }

  private async generatePackageJson(
    projectDir: string,
    config: TemplateConfig
  ): Promise<void> {
    const fs = await import('fs/promises');

    const packageJson = {
      name: config.name,
      version: '1.0.0',
      description: `Cloud architecture diagram using ${config.provider.toUpperCase()}`,
      main: config.language === 'typescript' ? 'dist/index.js' : 'src/index.js',
      scripts: {
        ...(config.language === 'typescript'
          ? {
              build: 'tsc',
              dev: 'tsc --watch',
              generate: 'cloud-diagrams generate src/diagram.ts',
            }
          : {
              generate: 'cloud-diagrams generate src/diagram.js',
            }),
        validate: `cloud-diagrams validate src/diagram.${config.language === 'typescript' ? 'ts' : 'js'}`,
        export: `cloud-diagrams generate src/diagram.${config.language === 'typescript' ? 'ts' : 'js'} -f png,svg,pdf`,
      },
      keywords: ['cloud', 'diagrams', config.provider, 'architecture'],
      author: '',
      license: 'MIT',
      dependencies: {
        '@cloud-diagrams/core': '^1.0.0',
        ...(config.provider === 'aws' && { '@cloud-diagrams/aws': '^1.0.0' }),
        ...(config.provider === 'azure' && {
          '@cloud-diagrams/azure': '^1.0.0',
        }),
        ...(config.provider === 'gcp' && { '@cloud-diagrams/gcp': '^1.0.0' }),
        ...(config.provider === 'multi' && {
          '@cloud-diagrams/aws': '^1.0.0',
          '@cloud-diagrams/azure': '^1.0.0',
          '@cloud-diagrams/gcp': '^1.0.0',
        }),
      },
      ...(config.language === 'typescript' && {
        devDependencies: {
          typescript: '^5.0.0',
          '@types/node': '^20.0.0',
        },
      }),
    };

    await fs.writeFile(
      path.join(projectDir, 'package.json'),
      JSON.stringify(packageJson, null, 2),
      'utf8'
    );
  }

  private async generateTypeScriptConfig(projectDir: string): Promise<void> {
    const fs = await import('fs/promises');

    const tsConfig = {
      compilerOptions: {
        target: 'ES2020',
        module: 'ESNext',
        moduleResolution: 'node',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        outDir: './dist',
        rootDir: './src',
      },
      include: ['src/**/*'],
      exclude: ['node_modules', 'dist'],
    };

    await fs.writeFile(
      path.join(projectDir, 'tsconfig.json'),
      JSON.stringify(tsConfig, null, 2),
      'utf8'
    );
  }

  private async generateMainDiagram(
    projectDir: string,
    config: TemplateConfig
  ): Promise<void> {
    const fs = await import('fs/promises');
    const ext = config.language === 'typescript' ? 'ts' : 'js';
    const content = this.getDiagramTemplate(config);

    await fs.writeFile(
      path.join(projectDir, 'src', `diagram.${ext}`),
      content,
      'utf8'
    );
  }

  private getDiagramTemplate(config: TemplateConfig): string {
    const { provider, template, language } = config;
    const isTS = language === 'typescript';

    switch (template) {
      case 'basic':
        return this.getBasicTemplate(provider, isTS);
      case '3tier':
        return this.get3TierTemplate(provider, isTS);
      case 'microservices':
        return this.getMicroservicesTemplate(provider, isTS);
      case 'pipeline':
        return this.getPipelineTemplate(provider, isTS);
      default:
        return this.getBasicTemplate(provider, isTS);
    }
  }

  private getBasicTemplate(provider: string, isTS: boolean): string {
    const imports = this.getImports(provider);
    const typeAnnotations = isTS ? ': Diagram' : '';

    return `${imports}

// Basic 2-tier architecture
const diagram${typeAnnotations} = new Diagram('Basic Architecture', {
  direction: 'LR',
  theme: 'default'
});

// Add services
const webServer = diagram.addNode(
  new EC2('web-1', 'Web Server', {
    description: 'Primary web server',
    url: 'https://console.aws.amazon.com/ec2'
  })
);

const database = diagram.addNode(
  new RDS('db-1', 'Database', {
    description: 'Application database',
    url: 'https://console.aws.amazon.com/rds'
  })
);

// Connect services
diagram.connect(webServer, database, {
  label: 'SQL Queries',
  style: 'solid'
});

// Export diagram
export default diagram;

// Uncomment to render in browser:
// diagram.render('#diagram-container');
`;
  }

  private get3TierTemplate(provider: string, isTS: boolean): string {
    const imports = this.getImports(provider);
    const typeAnnotations = isTS ? ': Diagram' : '';

    return `${imports}

// 3-Tier Web Application
const diagram${typeAnnotations} = new Diagram('3-Tier Web Application', {
  direction: 'TB',
  theme: 'default'
});

// Load Balancer
const loadBalancer = diagram.addNode(
  new ALB('alb-1', 'Load Balancer', {
    description: 'Distributes incoming traffic'
  })
);

// Web Tier
const webTier = diagram.addGroup('Web Tier', { type: 'subnet' });
const web1 = webTier.addNode(new EC2('web-1', 'Web Server 1'));
const web2 = webTier.addNode(new EC2('web-2', 'Web Server 2'));

// App Tier  
const appTier = diagram.addGroup('Application Tier', { type: 'subnet' });
const app1 = appTier.addNode(new EC2('app-1', 'App Server 1'));
const app2 = appTier.addNode(new EC2('app-2', 'App Server 2'));

// Database Tier
const dbTier = diagram.addGroup('Database Tier', { type: 'subnet' });
const database = dbTier.addNode(new RDS('db-1', 'Primary Database'));

// Storage
const storage = diagram.addNode(new S3('storage-1', 'Static Assets'));

// Connections
diagram.connect(loadBalancer, web1, { label: 'HTTP' });
diagram.connect(loadBalancer, web2, { label: 'HTTP' });
diagram.connect(web1, app1, { label: 'API' });
diagram.connect(web2, app2, { label: 'API' });
diagram.connect(app1, database, { label: 'SQL' });
diagram.connect(app2, database, { label: 'SQL' });
diagram.connect(web1, storage, { label: 'Assets' });
diagram.connect(web2, storage, { label: 'Assets' });

export default diagram;
`;
  }

  private getMicroservicesTemplate(provider: string, isTS: boolean): string {
    const imports = this.getImports(provider);
    const typeAnnotations = isTS ? ': Diagram' : '';

    return `${imports}

// Microservices Architecture
const diagram${typeAnnotations} = new Diagram('Microservices Architecture', {
  direction: 'TB',
  theme: 'default'
});

// API Gateway
const apiGateway = diagram.addNode(
  new Lambda('api-gateway', 'API Gateway', {
    description: 'Central API gateway'
  })
);

// Microservices
const services = diagram.addGroup('Microservices', { type: 'subnet' });
const userService = services.addNode(new Lambda('user-service', 'User Service'));
const orderService = services.addNode(new Lambda('order-service', 'Order Service'));
const paymentService = services.addNode(new Lambda('payment-service', 'Payment Service'));

// Data Layer
const dataLayer = diagram.addGroup('Data Layer', { type: 'subnet' });
const userDb = dataLayer.addNode(new DynamoDB('user-db', 'User Database'));
const orderDb = dataLayer.addNode(new DynamoDB('order-db', 'Order Database'));

// Event Bus
const eventBus = diagram.addNode(
  new SNS('event-bus', 'Event Bus', {
    description: 'Inter-service communication'
  })
);

// Connections
diagram.connect(apiGateway, userService, { label: 'User API' });
diagram.connect(apiGateway, orderService, { label: 'Order API' });
diagram.connect(apiGateway, paymentService, { label: 'Payment API' });

diagram.connect(userService, userDb, { label: 'Read/Write' });
diagram.connect(orderService, orderDb, { label: 'Read/Write' });

diagram.connect(orderService, eventBus, { label: 'Events' });
diagram.connect(paymentService, eventBus, { label: 'Events' });

export default diagram;
`;
  }

  private getPipelineTemplate(provider: string, isTS: boolean): string {
    const imports = this.getImports(provider);
    const typeAnnotations = isTS ? ': Diagram' : '';

    return `${imports}

// Data Processing Pipeline
const diagram${typeAnnotations} = new Diagram('Data Processing Pipeline', {
  direction: 'LR',
  theme: 'default'
});

// Data Sources
const sources = diagram.addGroup('Data Sources', { type: 'region' });
const webLogs = sources.addNode(new S3('web-logs', 'Web Logs'));
const apiLogs = sources.addNode(new S3('api-logs', 'API Logs'));
const userEvents = sources.addNode(new Kinesis('user-events', 'User Events'));

// Processing Layer
const processing = diagram.addGroup('Processing Layer', { type: 'subnet' });
const processor = processing.addNode(new Lambda('processor', 'Event Processor'));
const analytics = processing.addNode(new EMR('analytics', 'Analytics Cluster'));

// Storage Layer
const storage = diagram.addGroup('Storage Layer', { type: 'subnet' });
const dataLake = storage.addNode(new S3('data-lake', 'Data Lake'));
const warehouse = storage.addNode(new Redshift('warehouse', 'Data Warehouse'));

// Visualization
const dashboard = diagram.addNode(
  new EC2('dashboard', 'Analytics Dashboard', {
    description: 'Business intelligence dashboard'
  })
);

// Connections
diagram.connect(webLogs, processor, { label: 'Process' });
diagram.connect(apiLogs, processor, { label: 'Process' });
diagram.connect(userEvents, processor, { label: 'Stream' });

diagram.connect(processor, dataLake, { label: 'Store' });
diagram.connect(analytics, dataLake, { label: 'Read' });
diagram.connect(analytics, warehouse, { label: 'Transform' });

diagram.connect(warehouse, dashboard, { label: 'Query' });

export default diagram;
`;
  }

  private getImports(provider: string): string {
    const baseImport = "import { Diagram } from '@cloud-diagrams/core';";

    switch (provider) {
      case 'aws':
        return `${baseImport}
import { EC2, RDS, S3, ALB, Lambda, DynamoDB, SNS, Kinesis, EMR, Redshift } from '@cloud-diagrams/aws';`;

      case 'azure':
        return `${baseImport}
import { VirtualMachine, SQLDatabase, BlobStorage, AppService, AzureFunction } from '@cloud-diagrams/azure';`;

      case 'gcp':
        return `${baseImport}
import { ComputeEngine, CloudSQL, CloudStorage, CloudFunction } from '@cloud-diagrams/gcp';`;

      case 'multi':
        return `${baseImport}
import { EC2, RDS, S3 } from '@cloud-diagrams/aws';
import { VirtualMachine, SQLDatabase } from '@cloud-diagrams/azure';
import { ComputeEngine, CloudSQL } from '@cloud-diagrams/gcp';`;

      default:
        return baseImport;
    }
  }

  private async generateExamples(
    projectDir: string,
    config: TemplateConfig
  ): Promise<void> {
    const fs = await import('fs/promises');
    const examplesDir = path.join(projectDir, 'examples');
    await fs.mkdir(examplesDir, { recursive: true });

    // Generate different example patterns
    const examples = [
      { name: 'simple', template: 'basic' },
      { name: 'webapp', template: '3tier' },
      { name: 'serverless', template: 'microservices' },
    ];

    for (const example of examples) {
      const content = this.getDiagramTemplate({
        ...config,
        template: example.template,
      });

      const ext = config.language === 'typescript' ? 'ts' : 'js';
      await fs.writeFile(
        path.join(examplesDir, `${example.name}.${ext}`),
        content,
        'utf8'
      );
    }
  }

  private async generateReadme(
    projectDir: string,
    config: TemplateConfig
  ): Promise<void> {
    const fs = await import('fs/promises');
    const ext = config.language === 'typescript' ? 'ts' : 'js';

    const readme = `# ${config.name}

Cloud architecture diagram created with Cloud Diagrams TypeScript.

## Overview

This project contains a ${config.template} architecture diagram using ${config.provider.toUpperCase()} services.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

\`\`\`bash
npm install
\`\`\`

### Generate Diagram

\`\`\`bash
# Generate SVG
npm run generate

# Generate PNG
cloud-diagrams generate src/diagram.${ext} -f png -o architecture.png

# Generate PDF  
cloud-diagrams generate src/diagram.${ext} -f pdf -o architecture.pdf

# Validate diagram
npm run validate
\`\`\`

### Development

${
  config.language === 'typescript'
    ? `
\`\`\`bash
# Build TypeScript
npm run build

# Watch mode
npm run dev
\`\`\`
`
    : ''
}

## Project Structure

\`\`\`
${config.name}/
├── src/
│   └── diagram.${ext}         # Main diagram definition
${
  config.includeExamples
    ? `├── examples/          # Example diagrams
│   ├── simple.${ext}
│   ├── webapp.${ext}
│   └── serverless.${ext}`
    : ''
}
├── package.json
${config.language === 'typescript' ? '├── tsconfig.json' : ''}
└── README.md
\`\`\`

## Available Commands

- \`npm run generate\` - Generate diagram as SVG
- \`npm run validate\` - Validate diagram syntax
- \`npm run export\` - Export to multiple formats

## Customization

Edit \`src/diagram.${ext}\` to modify your architecture:

1. Add new services
2. Create connections between services  
3. Organize with groups (VPCs, subnets, etc.)
4. Customize styling and themes

## Documentation

- [Cloud Diagrams TypeScript Documentation](https://github.com/your-org/cloud-diagrams-ts)
- [${config.provider.toUpperCase()} Provider Guide](https://github.com/your-org/cloud-diagrams-ts/docs/providers/${config.provider}.md)

## License

MIT
`;

    await fs.writeFile(path.join(projectDir, 'README.md'), readme, 'utf8');
  }

  private async initializeGit(projectDir: string): Promise<void> {
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);

    try {
      await execAsync('git init', { cwd: projectDir });

      // Create .gitignore
      const fs = await import('fs/promises');
      const gitignore = `
node_modules/
dist/
*.log
.DS_Store
.env
.env.local
*.png
*.pdf
*.svg
!examples/*.svg
`;
      await fs.writeFile(
        path.join(projectDir, '.gitignore'),
        gitignore.trim(),
        'utf8'
      );
    } catch (error) {
      // Git initialization failed, but don't throw - it's not critical
      console.warn('Git initialization failed:', error);
    }
  }

  private async installDependencies(projectDir: string): Promise<void> {
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);

    try {
      await execAsync('npm install', { cwd: projectDir });
    } catch (error) {
      throw new Error(`Failed to install dependencies: ${error}`);
    }
  }
}
