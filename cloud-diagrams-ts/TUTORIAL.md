# 📚 @cloud-diagrams Tutorial - Complete Guide

Welcome to the comprehensive tutorial for the `@cloud-diagrams` package suite! This guide will walk you through everything from basic installation to advanced usage patterns.

## 🚀 Quick Start

### Installation

```bash
# Install core library and your preferred cloud providers
npm install @cloud-diagrams/core @cloud-diagrams/aws

# For React applications
npm install @cloud-diagrams/react

# For CLI usage
npm install -g @cloud-diagrams/cli
```

### Your First Diagram

```typescript
import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS } from '@cloud-diagrams/aws';

// Create a new diagram
const diagram = new Diagram('My First Architecture');

// Add cloud resources
const webServer = new EC2('web-server', {
  label: 'Web Server',
  instanceType: 't3.medium',
});

const database = new RDS('database', {
  label: 'MySQL Database',
  engine: 'mysql',
});

// Add them to the diagram
diagram.addNode(webServer);
diagram.addNode(database);

// Connect them
diagram.connect(webServer, database, { label: 'queries' });

// Generate Mermaid diagram code
const mermaidCode = diagram.render();
console.log(mermaidCode);
```

## 📦 Package Overview

### Core Packages

- **@cloud-diagrams/core** - Essential DSL classes and rendering engine
- **@cloud-diagrams/aws** - Amazon Web Services resources
- **@cloud-diagrams/azure** - Microsoft Azure resources
- **@cloud-diagrams/gcp** - Google Cloud Platform resources
- **@cloud-diagrams/react** - React components and hooks
- **@cloud-diagrams/cli** - Command-line interface

## 🏗️ Basic Usage Patterns

### 1. Simple Two-Tier Architecture

```typescript
import { Diagram, Group } from '@cloud-diagrams/core';
import { EC2, RDS, VPC } from '@cloud-diagrams/aws';

const diagram = new Diagram('Simple Web App');

// Create a VPC group
const vpc = new Group('vpc', {
  label: 'VPC (10.0.0.0/16)',
  style: { background: '#e8f4f8', border: '2px solid #1f77b4' },
});

// Add resources
const webServer = new EC2('web', { label: 'Web Server' });
const database = new RDS('db', { label: 'Database' });

// Organize in groups
vpc.addNode(webServer);
vpc.addNode(database);

diagram.addGroup(vpc);
diagram.connect(webServer, database);

console.log(diagram.render());
```

### 2. Multi-Tier Architecture with Load Balancer

```typescript
import { Diagram, Group } from '@cloud-diagrams/core';
import { EC2, RDS, VPC, LoadBalancer } from '@cloud-diagrams/aws';

const diagram = new Diagram('Three-Tier Architecture');

// Create groups for different tiers
const webTier = new Group('web-tier', { label: 'Web Tier' });
const appTier = new Group('app-tier', { label: 'Application Tier' });
const dataTier = new Group('data-tier', { label: 'Data Tier' });

// Web tier
const loadBalancer = new LoadBalancer('alb', {
  label: 'Application Load Balancer',
});
const webServer1 = new EC2('web1', { label: 'Web Server 1' });
const webServer2 = new EC2('web2', { label: 'Web Server 2' });

webTier.addNode(loadBalancer);
webTier.addNode(webServer1);
webTier.addNode(webServer2);

// App tier
const appServer1 = new EC2('app1', { label: 'App Server 1' });
const appServer2 = new EC2('app2', { label: 'App Server 2' });

appTier.addNode(appServer1);
appTier.addNode(appServer2);

// Data tier
const primaryDB = new RDS('primary-db', { label: 'Primary Database' });
const readReplica = new RDS('read-replica', { label: 'Read Replica' });

dataTier.addNode(primaryDB);
dataTier.addNode(readReplica);

// Add groups to diagram
diagram.addGroup(webTier);
diagram.addGroup(appTier);
diagram.addGroup(dataTier);

// Connect tiers
diagram.connect(loadBalancer, webServer1);
diagram.connect(loadBalancer, webServer2);
diagram.connect(webServer1, appServer1);
diagram.connect(webServer2, appServer2);
diagram.connect(appServer1, primaryDB);
diagram.connect(appServer2, readReplica);
diagram.connect(primaryDB, readReplica, { label: 'replication' });

console.log(diagram.render());
```

## 🌐 Multi-Cloud Examples

### AWS + Azure Hybrid Architecture

```typescript
import { Diagram, Group } from '@cloud-diagrams/core';
import { EC2, RDS } from '@cloud-diagrams/aws';
import { VirtualMachine, SQLDatabase } from '@cloud-diagrams/azure';

const diagram = new Diagram('Hybrid Cloud Architecture');

// AWS components
const awsGroup = new Group('aws', { label: 'AWS (us-east-1)' });
const webServer = new EC2('web-server', { label: 'Web Frontend' });
awsGroup.addNode(webServer);

// Azure components
const azureGroup = new Group('azure', { label: 'Azure (East US)' });
const apiServer = new VirtualMachine('api-server', { label: 'API Backend' });
const database = new SQLDatabase('sql-db', { label: 'SQL Database' });

azureGroup.addNode(apiServer);
azureGroup.addNode(database);

diagram.addGroup(awsGroup);
diagram.addGroup(azureGroup);

// Cross-cloud connection
diagram.connect(webServer, apiServer, {
  label: 'HTTPS API calls',
  style: { strokeDasharray: '5,5' },
});
diagram.connect(apiServer, database);

console.log(diagram.render());
```

### Multi-Cloud Data Pipeline

```typescript
import { Diagram } from '@cloud-diagrams/core';
import { S3, Lambda } from '@cloud-diagrams/aws';
import { BlobStorage, Functions } from '@cloud-diagrams/azure';
import { CloudStorage, CloudFunctions } from '@cloud-diagrams/gcp';

const diagram = new Diagram('Multi-Cloud Data Pipeline');

// Data sources
const awsSource = new S3('aws-data', { label: 'AWS Data Lake' });
const azureSource = new BlobStorage('azure-data', {
  label: 'Azure Blob Storage',
});

// Processing functions
const awsProcessor = new Lambda('aws-etl', { label: 'AWS ETL Function' });
const azureProcessor = new Functions('azure-etl', { label: 'Azure Function' });

// Final storage
const gcpSink = new CloudStorage('gcp-warehouse', {
  label: 'GCP Data Warehouse',
});
const gcpAnalyzer = new CloudFunctions('gcp-analytics', {
  label: 'GCP Analytics',
});

// Add all resources
[
  awsSource,
  azureSource,
  awsProcessor,
  azureProcessor,
  gcpSink,
  gcpAnalyzer,
].forEach((resource) => diagram.addNode(resource));

// Connect the pipeline
diagram.connect(awsSource, awsProcessor);
diagram.connect(azureSource, azureProcessor);
diagram.connect(awsProcessor, gcpSink);
diagram.connect(azureProcessor, gcpSink);
diagram.connect(gcpSink, gcpAnalyzer);

console.log(diagram.render());
```

## ⚛️ React Integration

### Basic React Component

```tsx
import React from 'react';
import { DiagramRenderer, DiagramProvider } from '@cloud-diagrams/react';
import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS } from '@cloud-diagrams/aws';

function createSampleDiagram() {
  const diagram = new Diagram('Sample Architecture');
  const web = new EC2('web', { label: 'Web Server' });
  const db = new RDS('db', { label: 'Database' });

  diagram.addNode(web);
  diagram.addNode(db);
  diagram.connect(web, db);

  return diagram;
}

function App() {
  const diagram = createSampleDiagram();

  return (
    <DiagramProvider>
      <div style={{ padding: '20px' }}>
        <h1>My Cloud Architecture</h1>
        <DiagramRenderer
          diagram={diagram}
          theme="default"
          width={800}
          height={400}
        />
      </div>
    </DiagramProvider>
  );
}

export default App;
```

### Interactive Diagram with Hooks

```tsx
import React, { useState } from 'react';
import {
  DiagramRenderer,
  DiagramProvider,
  useDiagram,
  useTheme,
} from '@cloud-diagrams/react';

function DiagramControls() {
  const { diagram, updateDiagram } = useDiagram();
  const { theme, setTheme } = useTheme();

  const [nodeCount, setNodeCount] = useState(2);

  const addNode = () => {
    // Logic to add nodes dynamically
    setNodeCount((prev) => prev + 1);
  };

  return (
    <div>
      <button onClick={addNode}>Add Node</button>
      <button
        onClick={() => setTheme(theme === 'default' ? 'dark' : 'default')}
      >
        Toggle Theme
      </button>
      <p>Nodes: {nodeCount}</p>
    </div>
  );
}

function InteractiveApp() {
  return (
    <DiagramProvider>
      <DiagramControls />
      <DiagramRenderer />
    </DiagramProvider>
  );
}
```

### Export Functionality

```tsx
import React from 'react';
import { useExport } from '@cloud-diagrams/react';

function ExportControls() {
  const { exportDiagram } = useExport();

  const exportAsSVG = async () => {
    try {
      const svg = await exportDiagram('svg');
      // Download or display SVG
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'diagram.svg';
      a.click();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const exportAsPNG = async () => {
    try {
      const png = await exportDiagram('png', { width: 1920, height: 1080 });
      // Download PNG
      const a = document.createElement('a');
      a.href = png;
      a.download = 'diagram.png';
      a.click();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div>
      <button onClick={exportAsSVG}>Export as SVG</button>
      <button onClick={exportAsPNG}>Export as PNG</button>
    </div>
  );
}
```

## 🖥️ CLI Usage

### Installation and Basic Commands

```bash
# Install CLI globally
npm install -g @cloud-diagrams/cli

# Check installation
cloud-diagrams --version

# Get help
cloud-diagrams --help
```

### Generate Diagrams

```bash
# Generate from TypeScript file
cloud-diagrams generate architecture.ts -o diagram.svg

# Generate PNG with custom dimensions
cloud-diagrams generate architecture.ts -f png -o diagram.png --width 1920 --height 1080

# Generate PDF for presentations
cloud-diagrams generate architecture.ts -f pdf -o presentation.pdf

# Watch mode for development
cloud-diagrams generate architecture.ts --watch --output diagram.svg
```

### Initialize New Projects

```bash
# Create AWS 3-tier architecture
cloud-diagrams init my-aws-app --provider aws --template 3tier

# Create Azure microservices template
cloud-diagrams init my-azure-app --provider azure --template microservices

# Create multi-cloud data pipeline
cloud-diagrams init my-pipeline --provider multi-cloud --template data-pipeline

# List available templates
cloud-diagrams init --list-templates
```

### Validation and Listing

```bash
# Validate diagram syntax
cloud-diagrams validate architecture.ts

# Strict validation with detailed errors
cloud-diagrams validate architecture.ts --strict

# List available AWS services
cloud-diagrams list --provider aws

# List specific service category
cloud-diagrams list --provider azure --category compute

# Show icons for services
cloud-diagrams list --provider gcp --icons
```

### Example Project Structure

```
my-aws-app/
├── src/
│   ├── architecture.ts      # Main diagram definition
│   ├── networks.ts          # Network components
│   └── databases.ts         # Database components
├── output/
│   ├── architecture.svg     # Generated diagrams
│   └── architecture.png
├── package.json
└── tsconfig.json
```

## 🎨 Advanced Features

### Custom Themes

```typescript
import { Diagram } from '@cloud-diagrams/core';

const diagram = new Diagram('Custom Themed Diagram');

// Apply custom theme
diagram.setTheme({
  name: 'corporate',
  background: '#f8f9fa',
  nodeDefaults: {
    fillColor: '#ffffff',
    strokeColor: '#007bff',
    strokeWidth: 2,
    fontFamily: 'Arial, sans-serif',
    fontSize: 12,
  },
  edgeDefaults: {
    strokeColor: '#6c757d',
    strokeWidth: 1,
    strokeDasharray: 'none',
  },
  groupDefaults: {
    background: '#e9ecef',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
  },
});
```

### Custom Layout Algorithms

```typescript
import { Diagram, LayoutAlgorithm } from '@cloud-diagrams/core';

const diagram = new Diagram('Custom Layout');

// Use hierarchical layout
diagram.setLayout(LayoutAlgorithm.HIERARCHICAL, {
  direction: 'TOP_TO_BOTTOM',
  nodeSpacing: 50,
  levelSpacing: 100,
});

// Or manual positioning
diagram.setLayout(LayoutAlgorithm.MANUAL);
webServer.setPosition(100, 100);
database.setPosition(300, 100);
```

### Event Handling and Interactivity

```typescript
import { Diagram } from '@cloud-diagrams/core';

const diagram = new Diagram('Interactive Diagram');

// Add click handlers
webServer.onClick((node, event) => {
  console.log(`Clicked on ${node.label}`);
  // Open AWS console, show details, etc.
  window.open(
    `https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:instanceId=${node.id}`
  );
});

// Add hover effects
database.onHover((node, event) => {
  // Show tooltip, highlight connections, etc.
  console.log(`Hovering over ${node.label}`);
});

// Global diagram events
diagram.onNodeAdded((node) => {
  console.log(`Node added: ${node.id}`);
});

diagram.onConnectionAdded((connection) => {
  console.log(`Connection added: ${connection.from.id} -> ${connection.to.id}`);
});
```

## 🔧 Configuration and Customization

### Environment Configuration

```typescript
// Create a config file: cloud-diagrams.config.js
module.exports = {
  defaultProvider: 'aws',
  outputDir: './diagrams',
  theme: 'default',
  exportFormats: ['svg', 'png'],
  mermaid: {
    theme: 'default',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
    },
  },
  // Provider-specific settings
  aws: {
    region: 'us-east-1',
    showResourceIds: true,
  },
  azure: {
    resourceGroup: 'my-rg',
    subscription: 'my-subscription',
  },
};
```

### Custom Icon Packs

```typescript
import { iconRegistry, IconPack } from '@cloud-diagrams/core';

// Create custom icon pack
const customIconPack: IconPack = {
  name: 'my-company',
  icons: {
    'custom-service': {
      id: 'custom-service',
      name: 'Custom Service',
      category: 'compute',
      provider: 'custom',
      svg: '<svg>...</svg>', // Your custom SVG
      tags: ['custom', 'internal'],
    },
  },
};

// Register custom icons
iconRegistry.registerIconPack('custom', customIconPack);

// Use custom icons
import { Node } from '@cloud-diagrams/core';

class CustomService extends Node {
  constructor(id: string, metadata?: any) {
    super(id, 'custom-service', metadata);
  }
}
```

## 🧪 Testing Your Diagrams

### Unit Testing

```typescript
import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS } from '@cloud-diagrams/aws';

describe('Diagram Tests', () => {
  test('should create diagram with nodes', () => {
    const diagram = new Diagram('Test Diagram');
    const ec2 = new EC2('web', { label: 'Web Server' });
    const rds = new RDS('db', { label: 'Database' });

    diagram.addNode(ec2);
    diagram.addNode(rds);
    diagram.connect(ec2, rds);

    expect(diagram.getNodes()).toHaveLength(2);
    expect(diagram.getConnections()).toHaveLength(1);
  });

  test('should generate valid mermaid syntax', () => {
    const diagram = new Diagram('Test');
    const node = new EC2('test');
    diagram.addNode(node);

    const mermaid = diagram.render();
    expect(mermaid).toContain('flowchart TD');
    expect(mermaid).toContain('test');
  });
});
```

### Integration Testing

```typescript
import { MermaidRenderer } from '@cloud-diagrams/core';

test('should render diagram to SVG', async () => {
  const diagram = new Diagram('Integration Test');
  // ... add nodes and connections

  const renderer = new MermaidRenderer();
  const svg = await renderer.renderToSVG(diagram);

  expect(svg).toContain('<svg');
  expect(svg).toContain('</svg>');
});
```

## 📈 Performance Tips

### Large Diagrams

```typescript
// For diagrams with many nodes (>100)
const diagram = new Diagram('Large Architecture');

// Use manual layout for better performance
diagram.setLayout(LayoutAlgorithm.MANUAL);

// Batch operations
const nodes = [];
for (let i = 0; i < 1000; i++) {
  nodes.push(new EC2(`server-${i}`));
}

// Add all at once instead of individually
diagram.addNodes(nodes);

// Use groups to organize large numbers of nodes
const webTier = new Group('web-tier');
const appTier = new Group('app-tier');
// ... organize nodes into groups
```

### Memory Management

```typescript
// Clean up diagrams when no longer needed
diagram.dispose();

// Use weak references for event handlers
const weakHandler = new WeakRef(myHandler);
node.onClick(weakHandler.deref());
```

## 🎯 Best Practices

### 1. Organize with Groups

```typescript
// Good: Organized with logical groups
const vpc = new Group('vpc', { label: 'Production VPC' });
const webTier = new Group('web', { label: 'Web Tier' });
const dbTier = new Group('db', { label: 'Database Tier' });

vpc.addGroup(webTier);
vpc.addGroup(dbTier);
```

### 2. Use Meaningful Labels

```typescript
// Good: Descriptive labels
const webServer = new EC2('web-prod-01', {
  label: 'Web Server (Production)',
  instanceType: 't3.large',
  availabilityZone: 'us-east-1a',
});

// Bad: Generic labels
const server = new EC2('server1');
```

### 3. Consistent Naming

```typescript
// Good: Consistent naming convention
const webServerProd = new EC2('web-server-prod');
const dbServerProd = new RDS('db-server-prod');
const cacheServerProd = new EC2('cache-server-prod');
```

### 4. Document Complex Architectures

```typescript
const diagram = new Diagram('E-commerce Platform');

// Add documentation
diagram.setDescription(`
  This diagram shows our e-commerce platform architecture:
  - Frontend: React SPA hosted on CloudFront
  - Backend: Node.js API on ECS
  - Database: PostgreSQL RDS with read replicas
  - Cache: Redis ElastiCache cluster
  - Search: Elasticsearch cluster
`);
```

## 🚀 Deployment and CI/CD

### GitHub Actions Example

```yaml
# .github/workflows/diagrams.yml
name: Generate Architecture Diagrams

on:
  push:
    paths: ['src/architecture/**']

jobs:
  generate-diagrams:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install -g @cloud-diagrams/cli

      - name: Generate diagrams
        run: |
          cloud-diagrams generate src/architecture/main.ts -o docs/diagrams/architecture.svg
          cloud-diagrams generate src/architecture/main.ts -f png -o docs/diagrams/architecture.png

      - name: Commit generated diagrams
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/diagrams/
          git commit -m "Update architecture diagrams" || exit 0
          git push
```

### Docker Integration

```dockerfile
# Dockerfile for diagram generation
FROM node:18-alpine

RUN npm install -g @cloud-diagrams/cli

WORKDIR /workspace

COPY package*.json ./
RUN npm install

COPY . .

CMD ["cloud-diagrams", "generate", "architecture.ts", "-o", "output/diagram.svg"]
```

## 🆘 Troubleshooting

### Common Issues

1. **Module not found errors**

   ```bash
   # Ensure all dependencies are installed
   npm install @cloud-diagrams/core @cloud-diagrams/aws
   ```

2. **Mermaid rendering issues**

   ```typescript
   // Check if diagram is too complex
   console.log('Node count:', diagram.getNodes().length);

   // Simplify if needed
   if (diagram.getNodes().length > 50) {
     diagram.setLayout(LayoutAlgorithm.MANUAL);
   }
   ```

3. **CLI command not found**

   ```bash
   # Reinstall CLI globally
   npm uninstall -g @cloud-diagrams/cli
   npm install -g @cloud-diagrams/cli
   ```

4. **TypeScript compilation errors**
   ```json
   // Add to tsconfig.json
   {
     "compilerOptions": {
       "moduleResolution": "node",
       "esModuleInterop": true,
       "skipLibCheck": true
     }
   }
   ```

## 📚 Additional Resources

- **API Documentation**: Full TypeScript API docs
- **Examples Repository**: More complex examples and use cases
- **Community Discord**: Get help and share your diagrams
- **GitHub Issues**: Report bugs and request features
- **Contributing Guide**: How to contribute to the project

## 🎉 Next Steps

Now that you've learned the basics:

1. **Try the examples** in this tutorial
2. **Create your first real diagram** for an existing project
3. **Share your feedback** and join the community
4. **Contribute** new features or cloud services
5. **Build amazing things** with cloud diagrams!

Happy diagramming! 🚀
