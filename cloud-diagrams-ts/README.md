# 🏗️ Cloud Diagrams TypeScript

> **Interactive cloud architecture diagrams as TypeScript code**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/your-org/cloud-diagrams-ts)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![Mermaid](https://img.shields.io/badge/Mermaid.js-10.6+-ff6b6b)](https://mermaid.js.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

A powerful TypeScript library for creating **interactive cloud architecture diagrams** using code. Inspired by [Mingrammer's Diagrams](https://diagrams.mingrammer.com/) but built for the modern web with TypeScript, interactive features, and browser-native rendering.

## ✨ Features

- 🎯 **Type-Safe DSL**: Full TypeScript support with IDE autocompletion
- 🎨 **Interactive Rendering**: Hover effects, click handlers, and custom events
- ☁️ **Multi-Cloud Support**: AWS services (Azure & GCP coming soon)
- 🖼️ **Multiple Export Formats**: SVG, PNG, and PDF export
- 🎭 **Theme Support**: Light, dark, and custom themes
- 🔧 **Extensible Architecture**: Plugin-ready for custom providers
- 🌐 **Browser Native**: No external dependencies or server required
- 📱 **Responsive**: Works on desktop and mobile devices

## 🚀 Quick Start

### Installation

```bash
npm install @cloud-diagrams/core @cloud-diagrams/aws
```

### Basic Usage

```typescript
import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS, S3 } from '@cloud-diagrams/aws';

// Create a new diagram
const diagram = new Diagram('3-Tier Web Application', {
  direction: 'LR',
  theme: 'default',
});

// Add AWS services
const webServer = diagram.addNode(
  new EC2('web-1', 'Web Server', {
    url: 'https://console.aws.amazon.com/ec2',
  })
);

const database = diagram.addNode(
  new RDS('db-1', 'Database', {
    url: 'https://console.aws.amazon.com/rds',
  })
);

const storage = diagram.addNode(
  new S3('storage-1', 'File Storage', {
    url: 'https://console.aws.amazon.com/s3',
  })
);

// Create connections
diagram.connect(webServer, database, { label: 'SQL Queries' });
diagram.connect(webServer, storage, { label: 'Static Files' });

// Render interactive diagram
await diagram.render('#diagram-container', {
  theme: 'default',
  interactive: true,
});
```

### Advanced Example with Groups

```typescript
import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS, Lambda } from '@cloud-diagrams/aws';

const diagram = new Diagram('Microservices Architecture', { direction: 'TB' });

// Create VPC group
const vpc = diagram.addGroup('Production VPC', (group) => {
  group.addNode(new EC2('web-1', 'Web Server 1'));
  group.addNode(new EC2('web-2', 'Web Server 2'));
});

// Add external services
const api = diagram.addNode(new Lambda('api-1', 'API Gateway'));
const db = diagram.addNode(new RDS('db-1', 'Primary Database'));

// Connect services
const webServers = vpc.getNodes();
webServers.forEach((server) => {
  diagram.connect(api, server, { label: 'HTTP' });
  diagram.connect(server, db, { label: 'Queries' });
});

await diagram.render('#container');
```

## 🎪 Interactive Demo

Open `examples/browser-demo/index.html` in your browser to see a **live interactive demo** showcasing:

- ✅ Real-time diagram rendering
- ✅ Multiple architecture examples
- ✅ Theme switching
- ✅ Export functionality
- ✅ Interactive node clicking
- ✅ Professional UI design

## 📦 Packages

| Package                 | Description                   | Status             |
| ----------------------- | ----------------------------- | ------------------ |
| `@cloud-diagrams/core`  | Core DSL and rendering engine | ✅ **Stable**      |
| `@cloud-diagrams/aws`   | AWS services and components   | ✅ **Stable**      |
| `@cloud-diagrams/azure` | Azure services and components | 🚧 **Coming Soon** |
| `@cloud-diagrams/gcp`   | Google Cloud services         | 🚧 **Coming Soon** |
| `@cloud-diagrams/react` | React integration components  | 🚧 **Planned**     |
| `@cloud-diagrams/cli`   | Command-line interface        | 🚧 **Planned**     |

## 🎨 Supported Services

### AWS Services ✅

#### Compute

- **EC2** - Elastic Compute Cloud
- **Lambda** - Serverless Functions
- **ECS** - Container Service

#### Database

- **RDS** - Relational Database Service
- **DynamoDB** - NoSQL Database

#### Storage

- **S3** - Simple Storage Service
- **EFS** - Elastic File System

#### Network

- **VPC** - Virtual Private Cloud
- **Route53** - DNS Service
- **CloudFront** - CDN

_More services being added regularly!_

## 🎭 Themes

```typescript
// Available themes
await diagram.render('#container', { theme: 'default' }); // Clean, professional
await diagram.render('#container', { theme: 'dark' }); // Dark mode
await diagram.render('#container', { theme: 'light' }); // Minimal light
```

## 📥 Export Options

```typescript
// Export as SVG (vector graphics)
const svgBlob = await diagram.export('svg', {
  width: 1200,
  height: 800,
});

// Export as PNG (raster image)
const pngBlob = await diagram.export('png', {
  width: 1200,
  height: 800,
  backgroundColor: 'white',
});

// Export as PDF (document ready)
const pdfBlob = await diagram.export('pdf', {
  width: 1200,
  height: 800,
});
```

## 🖱️ Interactivity

### Click Handlers

```typescript
// Add metadata with URLs
const webServer = new EC2('web-1', 'Web Server', {
  url: 'https://console.aws.amazon.com/ec2',
  description: 'Primary web server',
});

// Listen for node clicks
container.addEventListener('nodeClick', (event) => {
  const { node } = event.detail;
  console.log(`Clicked: ${node.label}`);
  // Custom handling logic
});
```

### Hover Effects

Nodes automatically show hover effects and cursor changes. Customize with CSS:

```css
.diagram-theme-dark .node:hover {
  opacity: 0.8;
  transform: scale(1.05);
}
```

## 🏗️ Architecture

```
cloud-diagrams-ts/
├── packages/
│   ├── core/           # Core DSL and rendering
│   ├── aws/            # AWS service implementations
│   ├── azure/          # Azure services (planned)
│   └── gcp/            # GCP services (planned)
├── examples/
│   ├── basic/          # Simple usage examples
│   └── browser-demo/   # Interactive demo
└── docs/               # Documentation
```

## 🧪 Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Clone repository
git clone https://github.com/your-org/cloud-diagrams-ts.git
cd cloud-diagrams-ts

# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm test

# Clean build
npm run clean
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Adding New Services

1. Create service class in appropriate package
2. Add to service index exports
3. Write tests for the service
4. Update documentation

### Adding New Providers

1. Create new package (e.g., `@cloud-diagrams/oracle`)
2. Implement provider-specific services
3. Follow existing patterns from AWS package
4. Add comprehensive tests

## 📚 Documentation

**📖 [Complete Documentation](./docs/README.md)** - Comprehensive guides and references

### Quick Links

| Resource                                           | Description                                |
| -------------------------------------------------- | ------------------------------------------ |
| **[🎯 Quick Start](./docs/quick-start.md)**        | Get up and running in 5 minutes            |
| **[🟠 AWS Services](./docs/providers/aws.md)**     | Complete AWS service catalog with examples |
| **[💻 CLI Tool](./docs/cli/README.md)**            | Command-line interface documentation       |
| **[⚛️ React Integration](./docs/react/README.md)** | React components and hooks                 |
| **[🔄 CI/CD Integration](./docs/ci-cd.md)**        | Automated diagram generation               |

## 🗺️ Roadmap

### ✅ **Phase 1: Foundation** (Completed)

- Core DSL implementation
- AWS services library
- Mermaid.js rendering engine
- Interactive features
- Export capabilities

### 🚧 **Phase 2: Enhancement** (In Progress)

- [ ] Enhanced icon system with official cloud icons
- [ ] Advanced layout options
- [ ] Improved group visualization
- [ ] Azure services implementation
- [ ] GCP services implementation

### 🔮 **Phase 3: Advanced Features** (Planned)

- [ ] React component library
- [ ] CLI tool for CI/CD integration
- [ ] Pan and zoom functionality
- [ ] Live diagram editing
- [ ] Documentation site with playground

## 🏆 Why Cloud Diagrams TypeScript?

### **vs. Traditional Diagramming Tools**

- ✅ **Version Control**: Diagrams are code, stored in git
- ✅ **Automation**: Generate diagrams from infrastructure code
- ✅ **Consistency**: Standardized icons and layouts
- ✅ **Collaboration**: Code reviews for diagram changes

### **vs. Python Diagrams**

- ✅ **Type Safety**: Full TypeScript support with IDE features
- ✅ **Interactive**: Browser-native with click handlers and themes
- ✅ **Modern**: No external dependencies or server required
- ✅ **Web Integration**: Easy embedding in web applications

### **vs. Manual Drawing**

- ✅ **Maintainable**: Update code, not pixels
- ✅ **Scalable**: Handle complex architectures programmatically
- ✅ **Professional**: Consistent, high-quality output
- ✅ **Efficient**: Rapid iteration and updates

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Mingrammer's Diagrams](https://diagrams.mingrammer.com/)
- Powered by [Mermaid.js](https://mermaid.js.org/)
- Built with [TypeScript](https://www.typescriptlang.org/)

---

**Made with ❤️ for the cloud development community**

[🌟 Star us on GitHub](https://github.com/your-org/cloud-diagrams-ts) | [📖 Read the Docs](https://cloud-diagrams-ts.dev) | [💬 Join Discussions](https://github.com/your-org/cloud-diagrams-ts/discussions)
