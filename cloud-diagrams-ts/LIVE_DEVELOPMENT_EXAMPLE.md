# 🔥 Live Development Example - Cloud Diagrams TypeScript

**See your cloud architecture diagrams update in real-time as you code!**

This example demonstrates the complete live development workflow from setup to seeing changes on localhost:3000.

## 🚀 Quick Demo (5 minutes)

### Step 1: Run the Quick Start Script

```bash
# Download and run the setup script
curl -o quick-start.sh https://raw.githubusercontent.com/amaboh/kloud_diagramming/main/cloud-diagrams-ts/quick-start.sh
chmod +x quick-start.sh
./quick-start.sh

# Follow the prompts:
# 📁 Enter your project name (default: my-cloud-diagrams): demo-project
```

### Step 2: Start Development Server

```bash
cd demo-project
npm run dev
```

**🌐 Your browser opens to http://localhost:3000 with a live AWS architecture diagram!**

### Step 3: Make Live Changes

Open `src/index.ts` in your favorite editor and try these live edits:

#### **Change 1: Add a New Service** ⚡

Find the `generateInitialDiagram()` method and add this after the existing services:

```typescript
// Add this after the existing services
const cache = new Lambda('cache', {
  label: 'Redis Cache\n(ElastiCache)',
  metadata: { engine: 'redis', version: '6.2' },
});

// Add to diagram
diagram.addNode(cache);

// Connect to app server
diagram.connect(appServer, cache, { label: 'Cache' });
```

**💥 Save the file → Browser automatically refreshes → New cache service appears!**

#### **Change 2: Switch to Dark Theme** 🌙

Change the theme initialization:

```typescript
// Find this line in the constructor
private isDarkTheme = false;

// Change to:
private isDarkTheme = true;
```

**💥 Save → Instant dark theme with professional styling!**

#### **Change 3: Add Multi-Cloud Architecture** 🌍

Add this import at the top:

```typescript
import { VirtualMachine, SQLDatabase } from '@cloud-diagrams/azure';
import { ComputeEngine, CloudSQL } from '@cloud-diagrams/gcp';
```

Add this new method to the class:

```typescript
private async createHybridCloudArchitecture(): Promise<Diagram> {
    const diagram = new Diagram('Hybrid Cloud Architecture', {
        theme: this.isDarkTheme ? 'dark' : 'default',
        layout: 'hierarchical'
    });

    // AWS tier
    const awsWeb = new EC2('aws-web', { label: 'AWS Web\n(us-east-1)' });
    const awsDb = new RDS('aws-db', { label: 'AWS RDS\n(Primary)' });

    // Azure tier
    const azureWeb = new VirtualMachine('azure-web', { label: 'Azure VM\n(West Europe)' });
    const azureDb = new SQLDatabase('azure-db', { label: 'Azure SQL\n(Replica)' });

    // GCP tier
    const gcpAnalytics = new ComputeEngine('gcp-analytics', { label: 'GCP Analytics\n(us-central1)' });
    const gcpData = new CloudSQL('gcp-data', { label: 'BigQuery\n(Data Warehouse)' });

    // Add all nodes
    diagram.addNode(awsWeb);
    diagram.addNode(awsDb);
    diagram.addNode(azureWeb);
    diagram.addNode(azureDb);
    diagram.addNode(gcpAnalytics);
    diagram.addNode(gcpData);

    // Create connections
    diagram.connect(awsWeb, awsDb, { label: 'Primary DB' });
    diagram.connect(azureWeb, azureDb, { label: 'Read Replica' });
    diagram.connect(gcpAnalytics, gcpData, { label: 'Analytics' });

    // Cross-cloud connections
    diagram.connect(awsDb, azureDb, { label: 'Replication' });
    diagram.connect(awsWeb, azureWeb, { label: 'Load Balance' });
    diagram.connect(azureDb, gcpData, { label: 'ETL Pipeline' });

    return diagram;
}
```

Add it to the architectures array:

```typescript
// Find the architectures array and add the new method
const architectures = [
  () => this.createMicroservicesArchitecture(),
  () => this.createDataPipelineArchitecture(),
  () => this.createServerlessArchitecture(),
  () => this.createHybridCloudArchitecture(), // ← Add this line
];
```

**💥 Save → Click "Generate New Diagram" → See multi-cloud architecture!**

## 🎯 Advanced Live Development Patterns

### Pattern 1: Component-Based Development

Create `src/components/aws-components.ts`:

```typescript
import { Diagram, Group } from '@cloud-diagrams/core';
import { EC2, RDS, S3, Lambda, VPC } from '@cloud-diagrams/aws';

export class AWSComponents {
  static createWebTier(name: string): Group {
    const webTier = new Group(`${name}-web-tier`, {
      label: 'Web Tier',
      style: { backgroundColor: '#e8f4fd' },
    });

    const loadBalancer = new Lambda(`${name}-alb`, {
      label: 'Application\nLoad Balancer',
    });
    const webServer1 = new EC2(`${name}-web-1`, {
      label: 'Web Server 1\n(us-east-1a)',
    });
    const webServer2 = new EC2(`${name}-web-2`, {
      label: 'Web Server 2\n(us-east-1b)',
    });

    webTier.addNode(loadBalancer);
    webTier.addNode(webServer1);
    webTier.addNode(webServer2);

    return webTier;
  }

  static createDataTier(name: string): Group {
    const dataTier = new Group(`${name}-data-tier`, {
      label: 'Data Tier',
      style: { backgroundColor: '#fff2e8' },
    });

    const primaryDb = new RDS(`${name}-primary-db`, {
      label: 'Primary DB\n(us-east-1a)',
    });
    const replicaDb = new RDS(`${name}-replica-db`, {
      label: 'Read Replica\n(us-east-1b)',
    });
    const cache = new Lambda(`${name}-cache`, {
      label: 'ElastiCache\n(Redis)',
    });

    dataTier.addNode(primaryDb);
    dataTier.addNode(replicaDb);
    dataTier.addNode(cache);

    return dataTier;
  }
}
```

Import and use in `src/index.ts`:

```typescript
import { AWSComponents } from './components/aws-components';

// In your diagram creation method:
const webTier = AWSComponents.createWebTier('prod');
const dataTier = AWSComponents.createDataTier('prod');

diagram.addGroup(webTier);
diagram.addGroup(dataTier);
```

**💥 Save → Modular, reusable architecture components!**

### Pattern 2: Configuration-Driven Diagrams

Create `src/configs/architectures.json`:

```json
{
  "ecommerce": {
    "name": "E-commerce Platform",
    "theme": "default",
    "services": [
      {
        "type": "EC2",
        "id": "web-server",
        "label": "Web Server\n(t3.large)",
        "metadata": { "instanceType": "t3.large" }
      },
      {
        "type": "RDS",
        "id": "product-db",
        "label": "Product Database\n(PostgreSQL)",
        "metadata": { "engine": "postgresql" }
      },
      {
        "type": "S3",
        "id": "images",
        "label": "Product Images\n(S3 Bucket)",
        "metadata": { "bucketName": "ecommerce-images" }
      }
    ],
    "connections": [
      { "from": "web-server", "to": "product-db", "label": "SQL Queries" },
      { "from": "web-server", "to": "images", "label": "Image URLs" }
    ]
  }
}
```

Create `src/utils/diagram-factory.ts`:

```typescript
import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS, S3, Lambda } from '@cloud-diagrams/aws';

export class DiagramFactory {
  static createFromConfig(config: any): Diagram {
    const diagram = new Diagram(config.name, { theme: config.theme });
    const nodeMap = new Map();

    // Create services
    config.services.forEach((service: any) => {
      let node;
      switch (service.type) {
        case 'EC2':
          node = new EC2(service.id, {
            label: service.label,
            metadata: service.metadata,
          });
          break;
        case 'RDS':
          node = new RDS(service.id, {
            label: service.label,
            metadata: service.metadata,
          });
          break;
        case 'S3':
          node = new S3(service.id, {
            label: service.label,
            metadata: service.metadata,
          });
          break;
        case 'Lambda':
          node = new Lambda(service.id, {
            label: service.label,
            metadata: service.metadata,
          });
          break;
      }
      if (node) {
        diagram.addNode(node);
        nodeMap.set(service.id, node);
      }
    });

    // Create connections
    config.connections.forEach((conn: any) => {
      const fromNode = nodeMap.get(conn.from);
      const toNode = nodeMap.get(conn.to);
      if (fromNode && toNode) {
        diagram.connect(fromNode, toNode, { label: conn.label });
      }
    });

    return diagram;
  }
}
```

Use in your main app:

```typescript
import architectureConfig from './configs/architectures.json';
import { DiagramFactory } from './utils/diagram-factory';

// In your method:
const diagram = DiagramFactory.createFromConfig(architectureConfig.ecommerce);
```

**💥 Save → JSON-driven architecture generation!**

### Pattern 3: Real-Time Collaboration Simulation

Create `src/utils/live-updates.ts`:

```typescript
export class LiveUpdates {
  private updateInterval: NodeJS.Timeout | null = null;

  startSimulation(callback: (update: any) => void) {
    const updates = [
      {
        type: 'scale',
        service: 'web-server',
        action: 'Auto-scaling triggered (+2 instances)',
      },
      {
        type: 'alert',
        service: 'database',
        action: 'High CPU usage detected (85%)',
      },
      {
        type: 'deploy',
        service: 'api',
        action: 'New version deployed (v2.1.3)',
      },
      {
        type: 'backup',
        service: 'storage',
        action: 'Automated backup completed',
      },
      { type: 'security', service: 'vpc', action: 'Security group updated' },
    ];

    let index = 0;
    this.updateInterval = setInterval(() => {
      callback(updates[index % updates.length]);
      index++;
    }, 3000);
  }

  stop() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
}
```

Add to your main app:

```typescript
import { LiveUpdates } from './utils/live-updates';

// In your class:
private liveUpdates = new LiveUpdates();

// Add a button to start simulation:
private startLiveUpdates() {
    this.liveUpdates.startSimulation((update) => {
        this.showStatus(`🔄 ${update.action}`, 'info');
        // Optionally update the diagram based on the update
    });
}
```

**💥 Save → Real-time infrastructure monitoring simulation!**

## 🎨 Styling and Theming

### Custom CSS Styling

Create `src/styles/custom-themes.css`:

```css
/* AWS Orange Theme */
.theme-aws {
  --primary-color: #ff9900;
  --secondary-color: #232f3e;
  --background-color: #fafafa;
}

/* Azure Blue Theme */
.theme-azure {
  --primary-color: #0078d4;
  --secondary-color: #ffffff;
  --background-color: #f3f2f1;
}

/* GCP Theme */
.theme-gcp {
  --primary-color: #4285f4;
  --secondary-color: #34a853;
  --background-color: #f8f9fa;
}

/* Custom node styling */
.diagram-container svg .node-ec2 {
  fill: var(--primary-color);
}
.diagram-container svg .node-rds {
  fill: #ff6b6b;
}
.diagram-container svg .node-s3 {
  fill: #4ecdc4;
}
.diagram-container svg .node-lambda {
  fill: #ffe66d;
}

/* Animated connections */
.diagram-container svg .edge {
  stroke-dasharray: 5, 5;
  animation: dash 1s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -10;
  }
}
```

Import in your main file:

```typescript
import './styles/custom-themes.css';
```

**💥 Save → Professional, animated cloud diagrams!**

## 🚀 Production Deployment

When you're ready to deploy:

```bash
# Build for production
npm run build

# Deploy to any static hosting (Netlify, Vercel, S3, etc.)
# The dist/ folder contains your production-ready app
```

## 🎯 Key Benefits of This Workflow

- ✅ **Instant Feedback**: See changes in < 1 second
- ✅ **Multi-Provider**: AWS, Azure, GCP in one diagram
- ✅ **Component Reuse**: Build once, use everywhere
- ✅ **Configuration-Driven**: JSON-based architecture definitions
- ✅ **Professional Quality**: Enterprise-ready diagrams
- ✅ **Interactive**: Click handlers, hover effects, animations
- ✅ **Export Ready**: SVG, PNG, PDF export capabilities

## 🎉 You're Now a Cloud Diagram Pro!

This live development environment gives you the power to:

1. **Rapidly prototype** cloud architectures
2. **Visualize complex** multi-cloud systems
3. **Share interactive** diagrams with teams
4. **Document infrastructure** as code
5. **Create presentations** with professional diagrams

**Start building amazing cloud architecture diagrams today!** 🚀
