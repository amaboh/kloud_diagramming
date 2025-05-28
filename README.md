# @kloud-diagramming/core

A complete **Mingrammer-style cloud architecture diagramming library** for JavaScript/TypeScript with D3.js integration. Create professional cloud architecture diagrams with 1,100+ official cloud service icons from AWS, Azure, and GCP.

[![npm version](https://badge.fury.io/js/@kloud-diagramming%2Fcore.svg)](https://badge.fury.io/js/@kloud-diagramming%2Fcore)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Features

- **🎯 Mingrammer-style API** - Familiar syntax for Python Mingrammer users
- **☁️ 1,100+ Official Icons** - AWS (306+), Azure (588+), GCP (210+) service icons
- **🎨 Professional D3.js Rendering** - SVG rendering with interactive features
- **📦 Cluster Support** - Visual grouping with nested clusters
- **🔗 Styled Edges** - Multiple line styles, arrows, and colors
- **⚡ Interactive** - Zoom, pan, tooltips, and click events
- **📱 Framework Agnostic** - Works with React, Vue, Angular, or vanilla JS
- **🚀 TypeScript Ready** - Full TypeScript support with type definitions
- **📤 Export Capabilities** - SVG export functionality
- **🎭 Multiple Layout Algorithms** - Hierarchical, force-directed, and manual layouts

## 📦 Installation

```bash
npm install @kloud-diagramming/core d3
```

```bash
yarn add @kloud-diagramming/core d3
```

```bash
pnpm add @kloud-diagramming/core d3
```

## 🚀 Quick Start

### Basic Usage

```javascript
import { Diagram, CloudDiagramsD3Renderer, EC2, S3, Lambda, RDS } from "@kloud-diagramming/core";

// Create a new diagram
const diagram = new Diagram("My Cloud Architecture");

// Create cloud service nodes
const web = new EC2("web", "Web Server");
const api = new Lambda("api", "API Function");
const db = new RDS("db", "Database");
const storage = new S3("storage", "File Storage");

// Add nodes to diagram
diagram.addNode(web);
diagram.addNode(api);
diagram.addNode(db);
diagram.addNode(storage);

// Connect nodes using Mingrammer-style operators
diagram.rightShift([web], [api]); // web >> api
diagram.rightShift([api], [db, storage]); // api >> [db, storage]

// Render the diagram
const renderer = new CloudDiagramsD3Renderer("diagram-container", {
    width: 1000,
    height: 600,
    layoutAlgorithm: 'hierarchical'
});
renderer.renderDiagram(diagram);
```

### Browser Usage (UMD)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Cloud Architecture Diagram</title>
</head>
<body>
    <div id="diagram-container"></div>
    
    <!-- Load D3.js -->
    <script src="https://d3js.org/d3.v7.min.js"></script>
    
    <!-- Load @kloud-diagramming/core -->
    <script src="https://unpkg.com/@kloud-diagramming/core/dist/index.umd.js"></script>
    
    <script>
        const { Diagram, CloudDiagramsD3Renderer, EC2, S3, RDS } = KloudDiagramming;
        
        // Create diagram
        const diagram = new Diagram("Simple AWS Architecture");
        
        // Add services
        const web = new EC2("web", "Web Server");
        const db = new RDS("db", "Database");
        const storage = new S3("storage", "Storage");
        
        diagram.addNode(web);
        diagram.addNode(db);
        diagram.addNode(storage);
        
        // Connect services
        diagram.rightShift([web], [db, storage]);
        
        // Render
        const renderer = new CloudDiagramsD3Renderer("diagram-container", {
            width: 800,
            height: 400,
            layoutAlgorithm: 'hierarchical'
        });
        renderer.renderDiagram(diagram);
    </script>
</body>
</html>
```

### With Clusters

```javascript
import { Diagram, CloudDiagramsD3Renderer, EC2, Lambda, RDS, Cluster } from "@kloud-diagramming/core";

const diagram = new Diagram("Clustered Architecture");

// Create a cluster
const webTier = new Cluster("web-tier", "Web Tier", {
    style: "rounded",
    bgcolor: "#e3f2fd",
    color: "#2196f3",
});

// Create nodes
const web1 = new EC2("web1", "Web Server 1");
const web2 = new EC2("web2", "Web Server 2");
const api = new Lambda("api", "API Service");
const db = new RDS("db", "Database");

// Add nodes to cluster
webTier.addNode(web1);
webTier.addNode(web2);

// Add cluster and nodes to diagram
diagram.addCluster(webTier);
diagram.addNode(api);
diagram.addNode(db);

// Create connections
diagram.rightShift([web1, web2], [api]);
diagram.rightShift([api], [db]);

// Render
const renderer = new CloudDiagramsD3Renderer("container", {
    layoutAlgorithm: 'hierarchical',
    nodeSpacing: 150
});
renderer.renderDiagram(diagram);
```

### React Integration

```jsx
import React, { useEffect, useRef } from "react";
import { Diagram, CloudDiagramsD3Renderer, EC2, S3 } from "@kloud-diagramming/core";

function CloudDiagram() {
  const containerRef = useRef(null);

  useEffect(() => {
    const diagram = new Diagram("React Cloud Architecture");

    const web = new EC2("web", "Web Server");
    const storage = new S3("storage", "Storage");

    diagram.addNode(web);
    diagram.addNode(storage);
    diagram.rightShift([web], [storage]);

    // Render to the container
    const renderer = new CloudDiagramsD3Renderer(containerRef.current, {
        width: 800,
        height: 400,
        layoutAlgorithm: 'force'
    });
    renderer.renderDiagram(diagram);
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "500px" }} />;
}
```

### Next.js Integration

```jsx
// pages/diagram.js
import dynamic from "next/dynamic";

const CloudDiagram = dynamic(() => import("../components/CloudDiagram"), {
  ssr: false, // Disable server-side rendering for D3.js
});

export default function DiagramPage() {
  return (
    <div>
      <h1>My Cloud Architecture</h1>
      <CloudDiagram />
    </div>
  );
}
```

### Vue.js Integration

```vue
<template>
  <div>
    <h1>Cloud Architecture</h1>
    <div ref="diagramContainer" class="diagram-container"></div>
  </div>
</template>

<script>
import { Diagram, CloudDiagramsD3Renderer, EC2, S3, RDS } from "@kloud-diagramming/core";

export default {
  name: "CloudDiagram",
  mounted() {
    this.renderDiagram();
  },
  methods: {
    renderDiagram() {
      const diagram = new Diagram("Vue Cloud Architecture");
      
      const web = new EC2("web", "Web Server");
      const db = new RDS("db", "Database");
      const storage = new S3("storage", "Storage");
      
      diagram.addNode(web);
      diagram.addNode(db);
      diagram.addNode(storage);
      
      diagram.rightShift([web], [db, storage]);
      
      const renderer = new CloudDiagramsD3Renderer(this.$refs.diagramContainer, {
        width: 800,
        height: 400,
        layoutAlgorithm: 'hierarchical'
      });
      renderer.renderDiagram(diagram);
    }
  }
};
</script>

<style>
.diagram-container {
  width: 100%;
  height: 500px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
```

## 🎨 Styling and Layout

### Layout Algorithms

```javascript
// Hierarchical layout (default)
const renderer = new CloudDiagramsD3Renderer("container", {
    layoutAlgorithm: 'hierarchical',
    nodeSpacing: 150,
    levelSpacing: 100
});

// Force-directed layout
const renderer = new CloudDiagramsD3Renderer("container", {
    layoutAlgorithm: 'force',
    forceStrength: -300,
    linkDistance: 100
});

// Manual positioning
const renderer = new CloudDiagramsD3Renderer("container", {
    layoutAlgorithm: 'manual'
});

// Set manual positions
web.setPosition(100, 100);
db.setPosition(300, 100);
```

### Custom Edge Styles

```javascript
// Create custom edges with styling
const edge = diagram.connect(web, api, {
  label: "HTTPS",
  color: "#4CAF50",
  style: "dashed",
  strokeWidth: 2
});

// Using Edge builder for complex styling
import { EdgeBuilder } from "@kloud-diagramming/core";

const styledEdge = new EdgeBuilder()
    .from(web)
    .to(api)
    .label("API Calls")
    .color("#2196F3")
    .style("solid")
    .arrowhead("diamond")
    .build();

diagram.addEdge(styledEdge);
```

### Cluster Styling

```javascript
const cluster = new Cluster("prod-env", "Production Environment", {
  style: "filled",
  bgcolor: "#fff3e0",
  color: "#ff9900",
  fontcolor: "#e65100",
  penwidth: 2,
  borderRadius: 10
});
```

## 📚 API Reference

### Core Classes

#### `Diagram`

Main diagram class for creating cloud architecture diagrams.

```typescript
class Diagram {
  constructor(title: string, config?: DiagramConfig);

  // Node management
  addNode(node: Node): void;
  removeNode(nodeId: string): void;
  getNode(nodeId: string): Node | undefined;
  getAllNodes(): Node[];

  // Cluster management
  addCluster(cluster: Cluster): void;
  removeCluster(clusterId: string): void;
  getCluster(clusterId: string): Cluster | undefined;

  // Edge management
  addEdge(edge: Edge): void;
  connect(from: Node, to: Node, options?: EdgeOptions): Edge;

  // Mingrammer-style operators
  rightShift(from: Node | Node[], to: Node | Node[]): Edge[]; // >>
  leftShift(from: Node | Node[], to: Node | Node[]): Edge[]; // <<
  undirected(from: Node | Node[], to: Node | Node[]): Edge[]; // -

  // Utility methods
  getStatistics(): DiagramStatistics;
  validate(): ValidationResult;
  clear(): void;
}
```

#### `CloudDiagramsD3Renderer`

D3.js-based renderer for creating interactive SVG diagrams.

```typescript
class CloudDiagramsD3Renderer {
  constructor(
    container: string | HTMLElement,
    options?: RenderOptions
  );

  // Rendering
  renderDiagram(diagram: Diagram): Promise<void>;
  updateDiagram(diagram: Diagram): Promise<void>;
  clear(): void;

  // Export
  exportSVG(): string;
  exportPNG(options?: ExportOptions): Promise<Blob>;

  // Interaction
  enableZoom(enabled: boolean): void;
  enablePan(enabled: boolean): void;
  fitToContainer(): void;
  
  // Events
  on(event: string, callback: Function): void;
  off(event: string, callback?: Function): void;
}
```

#### `Node`

Base class for all cloud service nodes.

```typescript
class Node {
  constructor(
    id: string,
    label: string,
    provider: CloudProvider,
    service: string,
    options?: NodeOptions
  );

  // Properties
  getId(): string;
  getLabel(): string;
  getProvider(): CloudProvider;
  getService(): string;
  getCategory(): string;
  
  // Positioning
  setPosition(x: number, y: number): void;
  getPosition(): { x: number; y: number };
  
  // Styling
  setStyle(style: NodeStyle): void;
  getStyle(): NodeStyle;
  
  // Metadata
  setMetadata(key: string, value: any): void;
  getMetadata(key?: string): any;
}
```

### Service Classes

#### AWS Services

```javascript
import { 
  EC2, S3, Lambda, RDS, ELB, VPC, CloudFront, 
  APIGateway, DynamoDB, SNS, SQS, CloudWatch 
} from '@kloud-diagramming/core';

// Compute
const compute = new EC2('web', 'Web Server');
const serverless = new Lambda('api', 'API Function');

// Storage
const storage = new S3('data', 'Data Bucket');

// Database
const database = new RDS('db', 'Database');
const nosql = new DynamoDB('cache', 'Cache');

// Networking
const loadBalancer = new ELB('lb', 'Load Balancer');
const vpc = new VPC('vpc', 'Virtual Private Cloud');
const cdn = new CloudFront('cdn', 'CDN');
const api = new APIGateway('api-gw', 'API Gateway');

// Messaging
const notifications = new SNS('sns', 'Notifications');
const queue = new SQS('queue', 'Message Queue');

// Monitoring
const monitoring = new CloudWatch('cw', 'CloudWatch');
```

#### Azure Services

```javascript
import {
  VirtualMachine, BlobStorage, SQLDatabase, FunctionApps,
  AppService, ApplicationGateway, VirtualNetwork, CosmosDB,
  ServiceBus, KeyVault, Monitor, ContainerInstances
} from '@kloud-diagramming/core';

// Compute
const vm = new VirtualMachine('web', 'Web VM');
const functions = new FunctionApps('api', 'Functions');
const webapp = new AppService('app', 'Web App');
const containers = new ContainerInstances('containers', 'Containers');

// Storage
const blob = new BlobStorage('storage', 'Blob Storage');

// Database
const sql = new SQLDatabase('db', 'SQL Database');
const cosmos = new CosmosDB('nosql', 'Cosmos DB');

// Networking
const appGateway = new ApplicationGateway('agw', 'App Gateway');
const vnet = new VirtualNetwork('vnet', 'Virtual Network');

// Security & Management
const keyVault = new KeyVault('kv', 'Key Vault');
const monitor = new Monitor('monitor', 'Monitor');

// Messaging
const serviceBus = new ServiceBus('sb', 'Service Bus');
```

#### GCP Services

```javascript
import {
  ComputeEngine, CloudStorage, CloudSQL, CloudFunctions,
  AppEngine, LoadBalancing, VPC as GCPVPC, Firestore,
  PubSub, CloudRun, GKE, CloudMonitoring
} from '@kloud-diagramming/core';

// Compute
const compute = new ComputeEngine('web', 'Compute Instance');
const functions = new CloudFunctions('api', 'Cloud Functions');
const appEngine = new AppEngine('app', 'App Engine');
const cloudRun = new CloudRun('run', 'Cloud Run');
const kubernetes = new GKE('k8s', 'GKE Cluster');

// Storage
const storage = new CloudStorage('data', 'Cloud Storage');

// Database
const sql = new CloudSQL('db', 'Cloud SQL');
const firestore = new Firestore('nosql', 'Firestore');

// Networking
const loadBalancer = new LoadBalancing('lb', 'Load Balancer');
const vpc = new GCPVPC('vpc', 'VPC Network');

// Messaging & Monitoring
const pubsub = new PubSub('pubsub', 'Pub/Sub');
const monitoring = new CloudMonitoring('monitoring', 'Cloud Monitoring');
```

## 🔧 Advanced Features

### Icon Management

```javascript
import { 
  createIconRegistry, 
  loadAwsIcons, loadAzureIcons, loadGcpIcons,
  getAwsIconCount, areAwsIconsLoaded 
} from '@kloud-diagramming/core';

// Check icon loading status
console.log('AWS icons loaded:', areAwsIconsLoaded());
console.log('AWS icon count:', getAwsIconCount());

// Load icons manually (usually automatic)
await loadAwsIcons();
await loadAzureIcons();
await loadGcpIcons();

// Create custom icon registry
const customRegistry = createIconRegistry({
  customIcons: {
    'my-service': {
      svg: '<svg>...</svg>',
      metadata: {
        name: 'My Custom Service',
        category: 'Custom',
        provider: 'custom'
      }
    }
  }
});
```

### Event Handling

```javascript
// Listen for renderer events
renderer.on('nodeClick', (event) => {
  console.log('Clicked node:', event.node.getId());
});

renderer.on('nodeHover', (event) => {
  console.log('Hovered node:', event.node.getLabel());
});

renderer.on('diagramReady', () => {
  console.log('Diagram rendered successfully');
});

// Custom node interactions
const webServer = new EC2('web', 'Web Server');
webServer.setMetadata('onClick', () => {
  window.open('https://console.aws.amazon.com/ec2');
});
```

### Export Options

```javascript
// Export as SVG string
const svgString = renderer.exportSVG();

// Export as PNG blob
const pngBlob = await renderer.exportPNG({
  width: 1920,
  height: 1080,
  quality: 0.9,
  backgroundColor: 'white'
});

// Download exported diagram
function downloadDiagram(format = 'svg') {
  const content = format === 'svg' ? 
    renderer.exportSVG() : 
    renderer.exportPNG();
    
  const blob = new Blob([content], { 
    type: format === 'svg' ? 'image/svg+xml' : 'image/png' 
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `diagram.${format}`;
  a.click();
  URL.revokeObjectURL(url);
}
```

## 🔧 Configuration

### Diagram Configuration

```javascript
const diagram = new Diagram("My Architecture", {
  direction: "TB", // Top to Bottom, LR (Left to Right), etc.
  theme: "default", // default, dark, aws, azure, gcp
  showGrid: true,
  snapToGrid: false,
  gridSize: 20
});
```

### Render Options

```javascript
const renderer = new CloudDiagramsD3Renderer("container", {
  width: 1200,
  height: 800,
  layoutAlgorithm: 'hierarchical', // hierarchical, force, manual
  nodeSpacing: 150,
  levelSpacing: 100,
  enableZoom: true,
  enablePan: true,
  enableTooltips: true,
  theme: 'default',
  backgroundColor: '#f5f5f5',
  
  // Force layout specific options
  forceStrength: -300,
  linkDistance: 100,
  
  // Animation options
  animationDuration: 750,
  enableAnimations: true
});
```

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📞 Support

- 📖 [Documentation](https://github.com/amaboh/kloud_diagramming)
- 🐛 [Issue Tracker](https://github.com/amaboh/kloud_diagramming/issues)
- 💬 [Discussions](https://github.com/amaboh/kloud_diagramming/discussions)

## 🙏 Acknowledgments

- Inspired by [Mingrammer Diagrams](https://diagrams.mingrammer.com/) for Python
- Built with [D3.js](https://d3js.org/) for powerful data visualization
- Icons provided by AWS, Microsoft Azure, and Google Cloud Platform

---

**Made with ❤️ by the Kloud Diagramming Team**
