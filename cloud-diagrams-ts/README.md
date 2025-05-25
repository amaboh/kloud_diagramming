# 📊 @cloud-diagrams - TypeScript Cloud Architecture Diagrams

<div align="center">

![npm](https://img.shields.io/npm/v/@cloud-diagrams/core)
![npm downloads](https://img.shields.io/npm/dm/@cloud-diagrams/core)
![GitHub](https://img.shields.io/github/license/amaboh/kloud_diagramming)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

**Professional cloud architecture diagrams with TypeScript. Multi-cloud support for AWS, Azure, and GCP.**

[📚 Tutorial](./TUTORIAL.md) • [🛠️ API Docs](#api-documentation) • [🤝 Contributing](./CONTRIBUTING.md) • [🎯 Examples](#examples)

</div>

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
import { EC2, RDS, VPC } from '@cloud-diagrams/aws';

// Create a new diagram
const diagram = new Diagram('My AWS Architecture');

// Create cloud resources
const vpc = new VPC('main-vpc', { label: 'Main VPC' });
const webServer = new EC2('web-server', {
  label: 'Web Server',
  instanceType: 't3.medium',
});
const database = new RDS('database', {
  label: 'PostgreSQL Database',
  engine: 'postgres',
});

// Organize with groups
vpc.addNode(webServer);
vpc.addNode(database);
diagram.addGroup(vpc);

// Connect components
diagram.connect(webServer, database, { label: 'queries' });

// Generate Mermaid diagram
const mermaidCode = diagram.render();
console.log(mermaidCode);
```

## 📦 Package Suite

| Package                                                                  | Description                                        | Size                                                                                 | Downloads                                                   |
| ------------------------------------------------------------------------ | -------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| [@cloud-diagrams/core](https://npmjs.com/package/@cloud-diagrams/core)   | Core DSL and rendering engine                      | ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@cloud-diagrams/core)  | ![npm](https://img.shields.io/npm/dm/@cloud-diagrams/core)  |
| [@cloud-diagrams/aws](https://npmjs.com/package/@cloud-diagrams/aws)     | AWS services (EC2, Lambda, RDS, S3, etc.)          | ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@cloud-diagrams/aws)   | ![npm](https://img.shields.io/npm/dm/@cloud-diagrams/aws)   |
| [@cloud-diagrams/azure](https://npmjs.com/package/@cloud-diagrams/azure) | Azure services (VMs, Functions, SQL, etc.)         | ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@cloud-diagrams/azure) | ![npm](https://img.shields.io/npm/dm/@cloud-diagrams/azure) |
| [@cloud-diagrams/gcp](https://npmjs.com/package/@cloud-diagrams/gcp)     | Google Cloud services (GCE, Cloud Functions, etc.) | ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@cloud-diagrams/gcp)   | ![npm](https://img.shields.io/npm/dm/@cloud-diagrams/gcp)   |
| [@cloud-diagrams/react](https://npmjs.com/package/@cloud-diagrams/react) | React components and hooks                         | ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@cloud-diagrams/react) | ![npm](https://img.shields.io/npm/dm/@cloud-diagrams/react) |
| [@cloud-diagrams/cli](https://npmjs.com/package/@cloud-diagrams/cli)     | Command-line interface                             | ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@cloud-diagrams/cli)   | ![npm](https://img.shields.io/npm/dm/@cloud-diagrams/cli)   |

## ✨ Features

### 🏗️ **Multi-Cloud Support**

- **AWS**: 15+ services including EC2, Lambda, RDS, S3, VPC
- **Azure**: 20+ services including VMs, Functions, SQL Database, Cosmos DB
- **GCP**: 10+ services including Compute Engine, Cloud Functions, Cloud SQL
- **Multi-Cloud**: Cross-provider architectures and data pipelines

### ⚛️ **React Integration**

- Pre-built components (`DiagramRenderer`, `CloudNode`, `DiagramGroup`)
- Custom hooks (`useDiagram`, `useTheme`, `useExport`)
- Context providers for state management
- TypeScript support with full type definitions

### 🖥️ **CLI Tool**

- Generate diagrams from TypeScript/JavaScript files
- Multiple export formats (SVG, PNG, PDF)
- Project templates for quick setup
- Watch mode for development
- CI/CD integration

### 🎨 **Professional Styling**

- Official cloud provider icons and styling
- Multiple themes (default, dark, custom)
- Advanced layout algorithms
- Interactive elements and hover effects
- High-quality exports for presentations

## 📋 Usage Examples

### Basic Multi-Tier Architecture

```typescript
import { Diagram, Group } from '@cloud-diagrams/core';
import { EC2, RDS, LoadBalancer } from '@cloud-diagrams/aws';

const diagram = new Diagram('3-Tier Web Application');

// Create tiers
const webTier = new Group('web-tier', { label: 'Web Tier' });
const appTier = new Group('app-tier', { label: 'Application Tier' });
const dataTier = new Group('data-tier', { label: 'Data Tier' });

// Add components
const alb = new LoadBalancer('alb', { label: 'Application Load Balancer' });
const webServer = new EC2('web', { label: 'Web Server' });
const appServer = new EC2('app', { label: 'Application Server' });
const database = new RDS('db', { label: 'Database' });

// Organize into tiers
webTier.addNode(alb);
webTier.addNode(webServer);
appTier.addNode(appServer);
dataTier.addNode(database);

// Add to diagram
diagram.addGroup(webTier);
diagram.addGroup(appTier);
diagram.addGroup(dataTier);

// Connect components
diagram.connect(alb, webServer);
diagram.connect(webServer, appServer);
diagram.connect(appServer, database);
```

### React Component

```tsx
import React from 'react';
import { DiagramRenderer, DiagramProvider } from '@cloud-diagrams/react';

function MyArchitectureApp() {
  return (
    <DiagramProvider>
      <div className="architecture-container">
        <h1>My Cloud Architecture</h1>
        <DiagramRenderer
          diagram={myDiagram}
          theme="default"
          width={1000}
          height={600}
          onNodeClick={(nodeId) => console.log('Clicked:', nodeId)}
        />
      </div>
    </DiagramProvider>
  );
}
```

### CLI Usage

```bash
# Generate diagram from TypeScript file
cloud-diagrams generate architecture.ts -o diagram.svg

# Initialize new project with template
cloud-diagrams init my-app --provider aws --template 3tier

# Export as PNG for presentations
cloud-diagrams generate architecture.ts -f png -o presentation.png --width 1920 --height 1080

# Watch mode for development
cloud-diagrams generate architecture.ts --watch
```

### Multi-Cloud Architecture

```typescript
import { Diagram } from '@cloud-diagrams/core';
import { S3, Lambda } from '@cloud-diagrams/aws';
import { BlobStorage, Functions } from '@cloud-diagrams/azure';
import { CloudStorage } from '@cloud-diagrams/gcp';

const diagram = new Diagram('Multi-Cloud Data Pipeline');

// Data sources
const awsData = new S3('aws-data', { label: 'AWS Data Lake' });
const azureProcessor = new Functions('azure-etl', { label: 'Azure Function' });
const gcpWarehouse = new CloudStorage('gcp-warehouse', {
  label: 'GCP Data Warehouse',
});

diagram.addNode(awsData);
diagram.addNode(azureProcessor);
diagram.addNode(gcpWarehouse);

// Cross-cloud data flow
diagram.connect(awsData, azureProcessor, { label: 'raw data' });
diagram.connect(azureProcessor, gcpWarehouse, { label: 'processed data' });
```

## 📚 Documentation

### 📖 **User Guides**

- **[Complete Tutorial](./TUTORIAL.md)** - Comprehensive guide with examples
- **[API Documentation](#api-documentation)** - Full TypeScript API reference
- **[CLI Guide](./TUTORIAL.md#cli-usage)** - Command-line interface documentation

### 🛠️ **Developer Resources**

- **[Contributing Guide](./CONTRIBUTING.md)** - Setup, standards, and workflow
- **[Architecture Overview](#architecture)** - Technical design and patterns
- **[Examples Directory](./examples/)** - Real-world usage examples

### 🎯 **Quick References**

- **[Supported Services](#supported-cloud-services)** - Complete service coverage
- **[Configuration Options](#configuration)** - Themes, layouts, and customization
- **[Troubleshooting](#troubleshooting)** - Common issues and solutions

## 🌐 Supported Cloud Services

### AWS (15+ Services)

- **Compute**: EC2, Lambda, ECS, EKS
- **Database**: RDS, DynamoDB, Aurora
- **Storage**: S3, EBS, EFS
- **Network**: VPC, Load Balancer, CloudFront
- **Analytics**: Redshift, EMR

### Azure (20+ Services)

- **Compute**: Virtual Machines, Functions, Container Instances, AKS
- **Database**: SQL Database, Cosmos DB, MySQL, PostgreSQL
- **Storage**: Blob Storage, File Storage, Queue Storage
- **Network**: Virtual Network, Load Balancer, Application Gateway
- **AI/ML**: Cognitive Services, Machine Learning

### Google Cloud (10+ Services)

- **Compute**: Compute Engine, Cloud Functions, GKE
- **Database**: Cloud SQL, Firestore
- **Storage**: Cloud Storage
- **Network**: VPC, Load Balancer
- **Analytics**: BigQuery, Dataflow

## 🎨 Themes and Customization

```typescript
// Built-in themes
diagram.setTheme('default'); // Professional light theme
diagram.setTheme('dark'); // Dark mode theme

// Custom theme
diagram.setTheme({
  name: 'corporate',
  background: '#f8f9fa',
  nodeDefaults: {
    fillColor: '#ffffff',
    strokeColor: '#007bff',
    fontFamily: 'Arial, sans-serif',
  },
  groupDefaults: {
    background: '#e9ecef',
    border: '1px solid #dee2e6',
  },
});

// Layout algorithms
diagram.setLayout('hierarchical', {
  direction: 'TOP_TO_BOTTOM',
  nodeSpacing: 50,
});
```

## 🚀 Advanced Features

### Interactive Diagrams

```typescript
// Click handlers
webServer.onClick((node, event) => {
  window.open(
    `https://console.aws.amazon.com/ec2/v2/home#Instances:instanceId=${node.id}`
  );
});

// Hover effects
database.onHover((node, event) => {
  showTooltip(`Database: ${node.metadata.engine}`);
});
```

### Export Options

```typescript
import { exportDiagram } from '@cloud-diagrams/core';

// Export to different formats
await exportDiagram(diagram, 'svg', { theme: 'dark' });
await exportDiagram(diagram, 'png', { width: 1920, height: 1080 });
await exportDiagram(diagram, 'pdf', { title: 'Architecture Overview' });
```

## 🛠️ Development

### Setup

```bash
# Clone the repository
git clone https://github.com/amaboh/kloud_diagramming.git
cd kloud_diagramming/cloud-diagrams-ts

# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm test
```

### Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for:

- **Development Setup** - Local environment configuration
- **Coding Standards** - TypeScript style guide and best practices
- **Testing Requirements** - Unit and integration test guidelines
- **Pull Request Process** - How to submit changes
- **Issue Guidelines** - Bug reports and feature requests

### Project Structure

```
cloud-diagrams-ts/
├── packages/
│   ├── core/          # Core DSL and rendering
│   ├── aws/           # AWS services
│   ├── azure/         # Azure services
│   ├── gcp/           # Google Cloud services
│   ├── react/         # React components
│   └── cli/           # Command-line tool
├── examples/          # Usage examples
├── docs/             # Documentation
└── TUTORIAL.md       # Complete user guide
```

## 📊 Performance

- **Fast Rendering**: Optimized Mermaid.js integration
- **Large Diagrams**: Supports 100+ nodes with manual layout
- **Memory Efficient**: Minimal overhead and cleanup utilities
- **Type Safety**: Full TypeScript support with zero runtime errors

## 🔧 Configuration

### Environment Setup

```javascript
// cloud-diagrams.config.js
module.exports = {
  defaultProvider: 'aws',
  theme: 'default',
  exportFormats: ['svg', 'png'],
  mermaid: {
    theme: 'default',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
    },
  },
};
```

### CI/CD Integration

```yaml
# GitHub Actions example
- name: Generate Architecture Diagrams
  run: |
    npm install -g @cloud-diagrams/cli
    cloud-diagrams generate src/architecture.ts -o docs/architecture.svg
```

## 🆘 Troubleshooting

### Common Issues

**Module Resolution Errors**

```bash
npm install @cloud-diagrams/core @cloud-diagrams/aws
```

**Mermaid Rendering Issues**

```typescript
// For large diagrams, use manual layout
if (diagram.getNodes().length > 50) {
  diagram.setLayout('manual');
}
```

**CLI Command Not Found**

```bash
npm install -g @cloud-diagrams/cli
```

See the [complete troubleshooting guide](./TUTORIAL.md#troubleshooting) for more solutions.

## 📈 Roadmap

### Next Features

- **Enhanced Export**: More format options and customization
- **Visual Editor**: Drag-and-drop diagram builder
- **More Providers**: Support for additional cloud platforms
- **Plugin System**: Extensible architecture for community contributions

### Community

- **Discord Server**: Join our community for support and discussions
- **Contributor Program**: Recognition for community contributions
- **Documentation Site**: Comprehensive docs with interactive examples

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Mermaid.js** - Powerful diagramming library
- **Cloud Providers** - Official icons and styling guidelines
- **Open Source Community** - Contributors and feedback

## 📞 Support

- **GitHub Issues**: [Report bugs and request features](https://github.com/amaboh/kloud_diagramming/issues)
- **Discussions**: [Ask questions and share ideas](https://github.com/amaboh/kloud_diagramming/discussions)
- **Documentation**: [Complete tutorial and guides](./TUTORIAL.md)

---

<div align="center">

**Made with ❤️ by [amaboh](https://github.com/amaboh)**

**Star ⭐ this repo if you find it helpful!**

</div>
