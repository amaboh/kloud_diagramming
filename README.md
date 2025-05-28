# 🌩️ Cloud Diagrams

[![npm version](https://badge.fury.io/js/%40cloud-diagrams%2Fcore.svg)](https://badge.fury.io/js/%40cloud-diagrams%2Fcore)
[![Downloads](https://img.shields.io/npm/dm/@cloud-diagrams/core.svg)](https://www.npmjs.com/package/@cloud-diagrams/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

> **A complete Mingrammer-style cloud architecture diagramming library for JavaScript/TypeScript with D3.js integration**

Create professional cloud architecture diagrams with **1,100+ official cloud service icons** from AWS, Azure, and GCP. Built with D3.js for interactive, scalable, and beautiful visualizations.

## ✨ Features

- 🎨 **1,100+ Official Icons** - AWS, Azure, GCP service icons
- 🔧 **Mingrammer-Style API** - Familiar Python diagrams syntax for JavaScript
- ⚡ **D3.js Powered** - Interactive, scalable, and performant
- 📱 **Framework Agnostic** - Works with React, Vue, Angular, Next.js
- 🎯 **TypeScript Ready** - Full type definitions included
- 📦 **Multiple Formats** - UMD, ES Modules, CommonJS
- 🎨 **SVG Export** - High-quality diagram exports
- 🔄 **Real-time Updates** - Dynamic diagram modifications

## 🚀 Quick Start

### Installation

```bash
npm install @cloud-diagrams/core
```

### Basic Usage

```typescript
import { 
  Diagram, 
  EC2, 
  RDS, 
  Lambda, 
  CloudDiagramsD3Renderer 
} from '@cloud-diagrams/core';

// Create a new diagram
const diagram = new Diagram('My Cloud Architecture');

// Add cloud services
const web = new EC2('Web Server');
const api = new Lambda('API Gateway');
const db = new RDS('Database');

// Build the architecture
diagram
  .addNode(web)
  .addNode(api)
  .addNode(db)
  .addEdge(web, api)
  .addEdge(api, db);

// Render with D3.js
const renderer = new CloudDiagramsD3Renderer();
renderer.render(diagram, '#diagram-container');
```

### Browser UMD Usage

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="https://unpkg.com/@cloud-diagrams/core/dist/index.umd.js"></script>
</head>
<body>
    <div id="diagram"></div>
    <script>
        const { Diagram, EC2, S3, CloudDiagramsD3Renderer } = CloudDiagrams;
        
        const diagram = new Diagram('Simple Architecture');
        diagram.addNode(new EC2('Web')).addNode(new S3('Storage'));
        
        const renderer = new CloudDiagramsD3Renderer();
        renderer.render(diagram, '#diagram');
    </script>
</body>
</html>
```

## 🏗️ Multi-Cloud Architecture Example

```typescript
import { 
  Diagram, 
  Cluster,
  // AWS Services
  EC2, S3, Lambda, RDS, VPC,
  // Azure Services  
  VirtualMachine, BlobStorage, FunctionApps,
  // GCP Services
  ComputeEngine, CloudStorage, CloudFunctions,
  CloudDiagramsD3Renderer 
} from '@cloud-diagrams/core';

const diagram = new Diagram('Multi-Cloud Architecture');

// AWS Infrastructure
const awsCluster = new Cluster('AWS Region');
const ec2 = new EC2('Web Servers');
const s3 = new S3('Static Assets');
const lambda = new Lambda('API Functions');
const rds = new RDS('Primary DB');

awsCluster.addNode(ec2).addNode(s3).addNode(lambda).addNode(rds);

// Azure Backup
const azureCluster = new Cluster('Azure Backup');
const vm = new VirtualMachine('Backup Server');
const blob = new BlobStorage('Backup Storage');

azureCluster.addNode(vm).addNode(blob);

// GCP Analytics
const gcpCluster = new Cluster('GCP Analytics');
const gce = new ComputeEngine('Analytics Engine');
const gcs = new CloudStorage('Data Lake');

gcpCluster.addNode(gce).addNode(gcs);

// Build the complete architecture
diagram
  .addCluster(awsCluster)
  .addCluster(azureCluster)
  .addCluster(gcpCluster)
  .addEdge(ec2, lambda)
  .addEdge(lambda, rds)
  .addEdge(rds, vm)  // Cross-cloud backup
  .addEdge(lambda, gce);  // Cross-cloud analytics

// Render with custom styling
const renderer = new CloudDiagramsD3Renderer({
  width: 1200,
  height: 800,
  theme: 'professional'
});

renderer.render(diagram, '#architecture-diagram');
```

## ⚛️ React Integration

```tsx
import React, { useEffect, useRef } from 'react';
import { 
  Diagram, 
  EC2, 
  RDS, 
  CloudDiagramsD3Renderer 
} from '@cloud-diagrams/core';

const ArchitectureDiagram: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const diagram = new Diagram('React Architecture');
    const web = new EC2('Web Server');
    const db = new RDS('Database');
    
    diagram.addNode(web).addNode(db).addEdge(web, db);

    const renderer = new CloudDiagramsD3Renderer();
    renderer.render(diagram, containerRef.current);

    return () => {
      // Cleanup on unmount
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div>
      <h2>My Cloud Architecture</h2>
      <div 
        ref={containerRef} 
        style={{ width: '100%', height: '600px', border: '1px solid #ccc' }}
      />
    </div>
  );
};

export default ArchitectureDiagram;
```

## 🎨 Available Services

### AWS Services (12 Core Services)
- **Compute**: EC2, Lambda
- **Storage**: S3
- **Database**: RDS, DynamoDB
- **Network**: VPC, ELB, CloudFront, API Gateway
- **Monitoring**: CloudWatch
- **Messaging**: SNS, SQS

### Azure Services (12 Core Services)
- **Compute**: Virtual Machine, Function Apps, Container Instances, App Service
- **Storage**: Blob Storage
- **Database**: SQL Database, Cosmos DB
- **Network**: Virtual Network, Application Gateway
- **Security**: Key Vault
- **Monitoring**: Monitor
- **Messaging**: Service Bus

### GCP Services (12 Core Services)
- **Compute**: Compute Engine, Cloud Functions, App Engine, GKE, Cloud Run
- **Storage**: Cloud Storage
- **Database**: Cloud SQL, Firestore
- **Network**: VPC, Load Balancing
- **Monitoring**: Cloud Monitoring
- **Messaging**: Pub/Sub

## 📊 Export & Customization

### SVG Export

```typescript
import { SVGExporter } from '@cloud-diagrams/core';

const exporter = new SVGExporter();
const svgString = exporter.export(diagram, {
  width: 1200,
  height: 800,
  format: 'svg'
});

// Download or save the SVG
const blob = new Blob([svgString], { type: 'image/svg+xml' });
const url = URL.createObjectURL(blob);
```

### Custom Styling

```typescript
const renderer = new CloudDiagramsD3Renderer({
  theme: {
    background: '#f8f9fa',
    nodeColor: '#ffffff',
    edgeColor: '#6c757d',
    textColor: '#212529',
    clusterColor: '#e9ecef'
  },
  layout: {
    algorithm: 'hierarchical',
    spacing: 100,
    direction: 'top-to-bottom'
  },
  animation: {
    enabled: true,
    duration: 1000,
    easing: 'ease-in-out'
  }
});
```

## 🔧 API Reference

### Core Classes

- **`Diagram`** - Main diagram container
- **`Node`** - Individual service nodes
- **`Edge`** - Connections between nodes
- **`Cluster`** - Grouping container for nodes
- **`Group`** - Logical grouping of elements

### Renderers

- **`CloudDiagramsD3Renderer`** - D3.js-based interactive renderer

### Icon Management

- **`loadAwsIcons()`** - Load AWS service icons
- **`loadAzureIcons()`** - Load Azure service icons  
- **`loadGcpIcons()`** - Load GCP service icons

## 📦 Package Information

- **Size**: 253 KB unpacked
- **Files**: 41 total files
- **Dependencies**: D3.js v7+
- **Node.js**: >=16.0.0
- **TypeScript**: Full support included

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🔗 Links

- **NPM Package**: https://www.npmjs.com/package/@cloud-diagrams/core
- **GitHub Repository**: https://github.com/amaboh/kloud_diagramming
- **Documentation**: https://github.com/amaboh/kloud_diagramming#readme
- **Issues**: https://github.com/amaboh/kloud_diagramming/issues

## 👨‍💻 Author

**amaboh**
- GitHub: [@amaboh](https://github.com/amaboh)
- Email: amaboh@github.com

---

**⭐ Star this project if you find it useful!**
