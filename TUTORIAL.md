# 📚 @kloud-diagramming/core Tutorial - Complete Guide

Welcome to the comprehensive tutorial for the `@kloud-diagramming/core` package! This guide will walk you through everything from basic setup to advanced cloud architecture patterns.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16+ (recommended: 18+)
- **D3.js** 7.0+ (peer dependency)
- **TypeScript** 4.5+ (recommended for best experience)

### 1. Installation

```bash
# Install the core package and D3.js
npm install @kloud-diagramming/core d3

# For TypeScript projects (recommended)
npm install --save-dev @types/d3
```

### 2. Your First Cloud Diagram

Create a simple HTML file to test the library:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Cloud Diagram</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        #diagram { border: 1px solid #ddd; border-radius: 8px; }
    </style>
</head>
<body>
    <h1>🏗️ My Cloud Architecture</h1>
    <div id="diagram"></div>

    <!-- Load D3.js -->
    <script src="https://d3js.org/d3.v7.min.js"></script>
    
    <!-- Load @kloud-diagramming/core -->
    <script src="https://unpkg.com/@kloud-diagramming/core/dist/index.umd.js"></script>
    
    <script>
        const { Diagram, CloudDiagramsD3Renderer, EC2, RDS, S3 } = KloudDiagramming;

        // Create a new diagram
        const diagram = new Diagram('My First Architecture');

        // Create AWS services
        const webServer = new EC2('web', 'Web Server');
        const database = new RDS('db', 'PostgreSQL Database');
        const storage = new S3('storage', 'File Storage');

        // Add nodes to diagram
        diagram.addNode(webServer);
        diagram.addNode(database);
        diagram.addNode(storage);

        // Connect services using Mingrammer-style operators
        diagram.rightShift([webServer], [database, storage]);

        // Render the diagram
        const renderer = new CloudDiagramsD3Renderer('diagram', {
            width: 800,
            height: 400,
            layoutAlgorithm: 'hierarchical',
            enableZoom: true,
            enablePan: true
        });

        renderer.renderDiagram(diagram);
    </script>
</body>
</html>
```

**🎉 Open this file in your browser to see your interactive cloud diagram!**

## 📁 Project Structure Recommendations

### **Small Projects** (1-5 diagrams)

```
my-cloud-project/
├── index.html
├── diagrams/
│   ├── simple-web-app.js
│   ├── microservices.js
│   └── data-pipeline.js
├── styles/
│   └── diagram.css
└── package.json
```

### **Medium Projects** (5-20 diagrams)

```
my-cloud-project/
├── src/
│   ├── diagrams/
│   │   ├── aws/
│   │   │   ├── three-tier.ts
│   │   │   └── microservices.ts
│   │   ├── azure/
│   │   │   └── web-app.ts
│   │   └── multi-cloud/
│   │       └── hybrid.ts
│   ├── components/
│   │   ├── DiagramViewer.ts
│   │   └── ExportControls.ts
│   └── utils/
│       └── diagram-helpers.ts
├── dist/
├── package.json
└── tsconfig.json
```

### **Large Projects** (20+ diagrams)

```
enterprise-architecture/
├── src/
│   ├── domains/
│   │   ├── infrastructure/
│   │   │   ├── diagrams/
│   │   │   ├── components/
│   │   │   └── services/
│   │   ├── security/
│   │   ├── monitoring/
│   │   └── deployment/
│   ├── shared/
│   │   ├── components/
│   │   ├── themes/
│   │   └── utils/
│   └── apps/
│       ├── web-viewer/
│       └── documentation/
└── packages/
    ├── core-extensions/
    └── custom-services/
```

## 🎯 Four Main Usage Patterns

### **Pattern 1: Browser UMD Bundle** (Easiest)

Perfect for quick prototypes, documentation, and simple web pages:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Cloud Architecture</title>
</head>
<body>
    <div id="my-diagram"></div>
    
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="https://unpkg.com/@kloud-diagramming/core/dist/index.umd.js"></script>
    
    <script>
        const { Diagram, CloudDiagramsD3Renderer, EC2, S3, Lambda } = KloudDiagramming;
        
        function createServerlessArchitecture() {
            const diagram = new Diagram('Serverless Web Application');
            
            const api = new Lambda('api', 'API Gateway + Lambda');
            const storage = new S3('storage', 'Static Website');
            const data = new S3('data', 'Data Storage');
            
            diagram.addNode(api);
            diagram.addNode(storage);
            diagram.addNode(data);
            
            diagram.rightShift([storage], [api]);
            diagram.rightShift([api], [data]);
            
            return diagram;
        }
        
        // Render
        const diagram = createServerlessArchitecture();
        const renderer = new CloudDiagramsD3Renderer('my-diagram', {
            width: 800,
            height: 400,
            layoutAlgorithm: 'hierarchical'
        });
        
        renderer.renderDiagram(diagram);
    </script>
</body>
</html>
```

### **Pattern 2: ES Modules** (Modern JavaScript)

For modern web applications with build tools:

```javascript
// diagrams/web-app.js
import { Diagram, CloudDiagramsD3Renderer, EC2, RDS, S3, ELB } from '@kloud-diagramming/core';

export function createWebAppArchitecture() {
    const diagram = new Diagram('Three-Tier Web Application');

    // Load Balancer
    const loadBalancer = new ELB('alb', 'Application Load Balancer');

    // Web Servers
    const webServer1 = new EC2('web-1', 'Web Server 1\n(us-east-1a)');
    const webServer2 = new EC2('web-2', 'Web Server 2\n(us-east-1b)');

    // Database
    const database = new RDS('db', 'PostgreSQL\n(Multi-AZ)');

    // Storage
    const storage = new S3('assets', 'Static Assets');

    // Add nodes
    diagram.addNode(loadBalancer);
    diagram.addNode(webServer1);
    diagram.addNode(webServer2);
    diagram.addNode(database);
    diagram.addNode(storage);

    // Create connections
    diagram.rightShift([loadBalancer], [webServer1, webServer2]);
    diagram.rightShift([webServer1, webServer2], [database]);
    diagram.rightShift([webServer1, webServer2], [storage]);

    return diagram;
}

// main.js
import { createWebAppArchitecture } from './diagrams/web-app.js';

const diagram = createWebAppArchitecture();
const renderer = new CloudDiagramsD3Renderer('diagram-container', {
    width: 1000,
    height: 600,
    layoutAlgorithm: 'hierarchical',
    enableZoom: true,
    enablePan: true
});

renderer.renderDiagram(diagram);
```

### **Pattern 3: TypeScript** (Recommended)

For type-safe development with full IntelliSense:

```typescript
// types/architecture.ts
export interface ArchitectureConfig {
    name: string;
    services: ServiceConfig[];
    connections: ConnectionConfig[];
}

export interface ServiceConfig {
    id: string;
    type: 'compute' | 'storage' | 'database' | 'networking';
    provider: 'aws' | 'azure' | 'gcp';
    service: string;
    label: string;
    metadata?: Record<string, any>;
}

export interface ConnectionConfig {
    from: string;
    to: string;
    label?: string;
    style?: 'solid' | 'dashed' | 'dotted';
}
```

```typescript
// diagrams/microservices.ts
import { 
    Diagram, 
    CloudDiagramsD3Renderer, 
    EC2, 
    Lambda, 
    RDS, 
    DynamoDB, 
    SQS,
    ELB,
    Cluster 
} from '@kloud-diagramming/core';
import type { ArchitectureConfig } from '../types/architecture';

export class MicroservicesArchitecture {
    private diagram: Diagram;
    private renderer: CloudDiagramsD3Renderer | null = null;

    constructor(config: ArchitectureConfig) {
        this.diagram = new Diagram(config.name);
        this.buildFromConfig(config);
    }

    private buildFromConfig(config: ArchitectureConfig): void {
        // Create clusters for organization
        const webTier = new Cluster('web-tier', 'Web Tier', {
            bgcolor: '#e3f2fd',
            color: '#2196f3'
        });

        const serviceTier = new Cluster('service-tier', 'Microservices', {
            bgcolor: '#f3e5f5',
            color: '#9c27b0'
        });

        const dataTier = new Cluster('data-tier', 'Data Layer', {
            bgcolor: '#e8f5e8',
            color: '#4caf50'
        });

        // Create services
        const loadBalancer = new ELB('lb', 'Load Balancer');
        const userService = new EC2('user-service', 'User Service');
        const orderService = new Lambda('order-service', 'Order Service');
        const paymentService = new Lambda('payment-service', 'Payment Service');
        
        const userDB = new RDS('user-db', 'User Database');
        const orderDB = new DynamoDB('order-db', 'Order Database');
        const messageQueue = new SQS('queue', 'Message Queue');

        // Organize into clusters
        webTier.addNode(loadBalancer);
        serviceTier.addNode(userService);
        serviceTier.addNode(orderService);
        serviceTier.addNode(paymentService);
        serviceTier.addNode(messageQueue);
        dataTier.addNode(userDB);
        dataTier.addNode(orderDB);

        // Add clusters to diagram
        this.diagram.addCluster(webTier);
        this.diagram.addCluster(serviceTier);
        this.diagram.addCluster(dataTier);

        // Create connections
        this.diagram.rightShift([loadBalancer], [userService, orderService]);
        this.diagram.rightShift([userService], [userDB]);
        this.diagram.rightShift([orderService], [orderDB, paymentService]);
        this.diagram.rightShift([paymentService], [messageQueue]);
    }

    public async render(containerId: string): Promise<void> {
        this.renderer = new CloudDiagramsD3Renderer(containerId, {
            width: 1200,
            height: 800,
            layoutAlgorithm: 'hierarchical',
            nodeSpacing: 150,
            levelSpacing: 100,
            enableZoom: true,
            enablePan: true,
            enableTooltips: true
        });

        await this.renderer.renderDiagram(this.diagram);
        this.setupEventHandlers();
    }

    private setupEventHandlers(): void {
        if (!this.renderer) return;

        this.renderer.on('nodeClick', (event) => {
            console.log(`Clicked: ${event.node.getLabel()}`);
            this.showServiceDetails(event.node);
        });

        this.renderer.on('nodeHover', (event) => {
            this.highlightConnections(event.node);
        });
    }

    private showServiceDetails(node: any): void {
        // Custom logic to show service details
        const metadata = node.getMetadata();
        console.log('Service details:', metadata);
    }

    private highlightConnections(node: any): void {
        // Custom logic to highlight related services
        console.log('Highlighting connections for:', node.getId());
    }

    public exportSVG(): string {
        if (!this.renderer) {
            throw new Error('Diagram must be rendered before exporting');
        }
        return this.renderer.exportSVG();
    }

    public async exportPNG(): Promise<Blob> {
        if (!this.renderer) {
            throw new Error('Diagram must be rendered before exporting');
        }
        return this.renderer.exportPNG({
            width: 1920,
            height: 1080,
            quality: 0.9,
            backgroundColor: 'white'
        });
    }
}
```

```typescript
// main.ts
import { MicroservicesArchitecture } from './diagrams/microservices';
import type { ArchitectureConfig } from './types/architecture';

const config: ArchitectureConfig = {
    name: 'E-commerce Microservices',
    services: [
        { id: 'lb', type: 'networking', provider: 'aws', service: 'elb', label: 'Load Balancer' },
        { id: 'user-service', type: 'compute', provider: 'aws', service: 'ec2', label: 'User Service' },
        // ... more services
    ],
    connections: [
        { from: 'lb', to: 'user-service', label: 'HTTP' },
        // ... more connections
    ]
};

async function main() {
    const architecture = new MicroservicesArchitecture(config);
    await architecture.render('diagram-container');
    
    // Add export functionality
    document.getElementById('export-svg')?.addEventListener('click', () => {
        const svg = architecture.exportSVG();
        downloadFile(svg, 'architecture.svg', 'image/svg+xml');
    });
}

function downloadFile(content: string, filename: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

main().catch(console.error);
```

### **Pattern 4: React Integration** (For Web Apps)

For React applications with component-based architecture:

```tsx
// components/DiagramViewer.tsx
import React, { useEffect, useRef, useState } from 'react';
import { 
    Diagram, 
    CloudDiagramsD3Renderer, 
    EC2, 
    RDS, 
    S3 
} from '@kloud-diagramming/core';

interface DiagramViewerProps {
    architectureType: 'simple' | 'microservices' | 'serverless';
    onNodeClick?: (nodeId: string) => void;
}

export const DiagramViewer: React.FC<DiagramViewerProps> = ({ 
    architectureType, 
    onNodeClick 
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<CloudDiagramsD3Renderer | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const renderDiagram = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const diagram = createDiagramByType(architectureType);
                
                rendererRef.current = new CloudDiagramsD3Renderer(containerRef.current!, {
                    width: containerRef.current!.clientWidth,
                    height: 600,
                    layoutAlgorithm: 'hierarchical',
                    enableZoom: true,
                    enablePan: true
                });

                await rendererRef.current.renderDiagram(diagram);

                // Setup event handlers
                if (onNodeClick) {
                    rendererRef.current.on('nodeClick', (event) => {
                        onNodeClick(event.node.getId());
                    });
                }

                setIsLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to render diagram');
                setIsLoading(false);
            }
        };

        renderDiagram();

        // Cleanup
        return () => {
            if (rendererRef.current) {
                rendererRef.current.clear();
            }
        };
    }, [architectureType, onNodeClick]);

    const exportSVG = () => {
        if (rendererRef.current) {
            const svg = rendererRef.current.exportSVG();
            const blob = new Blob([svg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${architectureType}-architecture.svg`;
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    if (isLoading) {
        return <div className="diagram-loading">Loading diagram...</div>;
    }

    if (error) {
        return <div className="diagram-error">Error: {error}</div>;
    }

    return (
        <div className="diagram-viewer">
            <div className="diagram-controls">
                <button onClick={exportSVG} className="export-btn">
                    Export SVG
                </button>
            </div>
            <div 
                ref={containerRef} 
                className="diagram-container"
                style={{ width: '100%', height: '600px', border: '1px solid #ddd' }}
            />
        </div>
    );
};

function createDiagramByType(type: string): Diagram {
    switch (type) {
        case 'simple':
            return createSimpleArchitecture();
        case 'microservices':
            return createMicroservicesArchitecture();
        case 'serverless':
            return createServerlessArchitecture();
        default:
            throw new Error(`Unknown architecture type: ${type}`);
    }
}

function createSimpleArchitecture(): Diagram {
    const diagram = new Diagram('Simple Web Application');
    
    const web = new EC2('web', 'Web Server');
    const db = new RDS('db', 'Database');
    const storage = new S3('storage', 'File Storage');
    
    diagram.addNode(web);
    diagram.addNode(db);
    diagram.addNode(storage);
    
    diagram.rightShift([web], [db, storage]);
    
    return diagram;
}

function createMicroservicesArchitecture(): Diagram {
    // Implementation for microservices architecture
    const diagram = new Diagram('Microservices Architecture');
    // ... add services and connections
    return diagram;
}

function createServerlessArchitecture(): Diagram {
    // Implementation for serverless architecture
    const diagram = new Diagram('Serverless Architecture');
    // ... add services and connections
    return diagram;
}
```

```tsx
// App.tsx
import React, { useState } from 'react';
import { DiagramViewer } from './components/DiagramViewer';

type ArchitectureType = 'simple' | 'microservices' | 'serverless';

function App() {
    const [selectedArchitecture, setSelectedArchitecture] = useState<ArchitectureType>('simple');
    const [selectedNode, setSelectedNode] = useState<string | null>(null);

    const handleNodeClick = (nodeId: string) => {
        setSelectedNode(nodeId);
        console.log(`Selected node: ${nodeId}`);
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>🏗️ Cloud Architecture Viewer</h1>
                <div className="architecture-selector">
                    <label>Architecture Type: </label>
                    <select 
                        value={selectedArchitecture} 
                        onChange={(e) => setSelectedArchitecture(e.target.value as ArchitectureType)}
                    >
                        <option value="simple">Simple Web App</option>
                        <option value="microservices">Microservices</option>
                        <option value="serverless">Serverless</option>
                    </select>
                </div>
            </header>

            <main className="app-main">
                <div className="diagram-section">
                    <DiagramViewer 
                        architectureType={selectedArchitecture}
                        onNodeClick={handleNodeClick}
                    />
                </div>
                
                {selectedNode && (
                    <div className="node-details">
                        <h3>Selected Service</h3>
                        <p>Node ID: {selectedNode}</p>
                        {/* Add more service details here */}
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
```

## 🌐 Multi-Cloud Examples

### **AWS + Azure Hybrid Architecture**

```typescript
import { 
    Diagram, 
    CloudDiagramsD3Renderer,
    Cluster,
    // AWS Services
    EC2, 
    RDS, 
    S3,
    // Azure Services
    VirtualMachine, 
    SQLDatabase, 
    BlobStorage 
} from '@kloud-diagramming/core';

export function createHybridCloudArchitecture(): Diagram {
    const diagram = new Diagram('Hybrid Cloud Architecture');

    // AWS Cluster
    const awsCluster = new Cluster('aws-region', 'AWS (us-east-1)', {
        bgcolor: '#fff3cd',
        color: '#ff9900',
        style: 'rounded'
    });

    const awsWeb = new EC2('aws-web', 'Web Frontend\n(EC2 t3.large)');
    const awsCache = new EC2('aws-cache', 'Redis Cache\n(ElastiCache)');
    const awsStorage = new S3('aws-storage', 'Static Assets\n(S3)');

    awsCluster.addNode(awsWeb);
    awsCluster.addNode(awsCache);
    awsCluster.addNode(awsStorage);

    // Azure Cluster
    const azureCluster = new Cluster('azure-region', 'Azure (East US)', {
        bgcolor: '#e7f3ff',
        color: '#0078d4',
        style: 'rounded'
    });

    const azureApi = new VirtualMachine('azure-api', 'API Backend\n(Standard D2s v3)');
    const azureDb = new SQLDatabase('azure-db', 'SQL Database\n(S2 Standard)');
    const azureBlob = new BlobStorage('azure-blob', 'Blob Storage\n(Hot Tier)');

    azureCluster.addNode(azureApi);
    azureCluster.addNode(azureDb);
    azureCluster.addNode(azureBlob);

    // Add clusters to diagram
    diagram.addCluster(awsCluster);
    diagram.addCluster(azureCluster);

    // Cross-cloud connections
    diagram.connect(awsWeb, azureApi, {
        label: 'HTTPS API calls',
        style: 'dashed',
        color: '#ff6b6b'
    });

    diagram.rightShift([awsWeb], [awsCache]);
    diagram.rightShift([awsWeb], [awsStorage]);
    diagram.rightShift([azureApi], [azureDb]);
    diagram.rightShift([azureApi], [azureBlob]);

    return diagram;
}
```

### **Multi-Cloud Data Pipeline**

```typescript
import { 
    Diagram,
    // AWS
    S3, 
    Lambda,
    // Azure
    BlobStorage, 
    FunctionApps,
    // GCP
    CloudStorage, 
    CloudFunctions 
} from '@kloud-diagramming/core';

export function createDataPipelineArchitecture(): Diagram {
    const diagram = new Diagram('Multi-Cloud Data Pipeline');

    // Data Sources
    const awsDataLake = new S3('aws-data-lake', 'AWS Data Lake\n(S3 Bucket)');
    const azureBlob = new BlobStorage('azure-blob', 'Azure Blob Storage\n(Hot Tier)');

    // Processing Functions
    const awsETL = new Lambda('aws-etl', 'AWS ETL Function\n(Python 3.9)');
    const azureProcessor = new FunctionApps('azure-processor', 'Azure Function\n(Node.js 18)');

    // Final Storage
    const gcpWarehouse = new CloudStorage('gcp-warehouse', 'GCP Data Warehouse\n(BigQuery)');
    const gcpAnalytics = new CloudFunctions('gcp-analytics', 'GCP Analytics\n(Cloud Functions)');

    // Add all nodes
    [awsDataLake, azureBlob, awsETL, azureProcessor, gcpWarehouse, gcpAnalytics]
        .forEach(node => diagram.addNode(node));

    // Create pipeline connections
    diagram.rightShift([awsDataLake], [awsETL]);
    diagram.rightShift([azureBlob], [azureProcessor]);
    diagram.rightShift([awsETL, azureProcessor], [gcpWarehouse]);
    diagram.rightShift([gcpWarehouse], [gcpAnalytics]);

    return diagram;
}
```

## 🎨 Advanced Styling & Theming

### **Custom Themes**

```typescript
import { CloudDiagramsD3Renderer } from '@kloud-diagramming/core';

// Corporate theme
const corporateRenderer = new CloudDiagramsD3Renderer('container', {
    theme: 'custom',
    customTheme: {
        background: '#f8f9fa',
        nodeDefaults: {
            fillColor: '#ffffff',
            strokeColor: '#007bff',
            strokeWidth: 2,
            fontFamily: 'Arial, sans-serif',
            fontSize: 12,
            borderRadius: 8
        },
        edgeDefaults: {
            strokeColor: '#6c757d',
            strokeWidth: 1,
            arrowSize: 6
        },
        clusterDefaults: {
            fillColor: '#e9ecef',
            strokeColor: '#dee2e6',
            strokeWidth: 1,
            borderRadius: 12
        }
    }
});

// Dark theme
const darkRenderer = new CloudDiagramsD3Renderer('container', {
    theme: 'custom',
    customTheme: {
        background: '#1a1a1a',
        nodeDefaults: {
            fillColor: '#2d2d2d',
            strokeColor: '#4a90e2',
            strokeWidth: 2,
            fontColor: '#ffffff',
            fontFamily: 'Consolas, monospace'
        },
        edgeDefaults: {
            strokeColor: '#888888',
            strokeWidth: 1
        }
    }
});
```

### **Dynamic Styling Based on Node State**

```typescript
import { EC2, RDS } from '@kloud-diagramming/core';

// Create nodes with metadata for styling
const webServer = new EC2('web', 'Web Server');
webServer.setMetadata('status', 'healthy');
webServer.setMetadata('cpu', 25);
webServer.setMetadata('memory', 60);

const database = new RDS('db', 'Database');
database.setMetadata('status', 'warning');
database.setMetadata('cpu', 85);
database.setMetadata('memory', 90);

// Custom styling based on status
function getNodeStyle(node: any) {
    const status = node.getMetadata('status');
    const cpu = node.getMetadata('cpu');
    
    let fillColor = '#ffffff';
    let strokeColor = '#007bff';
    
    if (status === 'warning' || cpu > 80) {
        fillColor = '#fff3cd';
        strokeColor = '#ffc107';
    } else if (status === 'error' || cpu > 95) {
        fillColor = '#f8d7da';
        strokeColor = '#dc3545';
    } else if (status === 'healthy') {
        fillColor = '#d4edda';
        strokeColor = '#28a745';
    }
    
    return { fillColor, strokeColor };
}

// Apply custom styling during rendering
renderer.on('nodeRender', (event) => {
    const style = getNodeStyle(event.node);
    event.element.style.fill = style.fillColor;
    event.element.style.stroke = style.strokeColor;
});
```

## 🔧 Advanced Features

### **Real-Time Updates**

```typescript
class LiveInfrastructureMonitor {
    private diagram: Diagram;
    private renderer: CloudDiagramsD3Renderer;
    private updateInterval: number;

    constructor(containerId: string) {
        this.diagram = this.createInitialDiagram();
        this.renderer = new CloudDiagramsD3Renderer(containerId, {
            width: 1200,
            height: 800,
            layoutAlgorithm: 'force',
            enableZoom: true,
            enablePan: true
        });
        
        this.startMonitoring();
    }

    private createInitialDiagram(): Diagram {
        const diagram = new Diagram('Live Infrastructure Monitor');
        
        const webServer = new EC2('web', 'Web Server');
        const database = new RDS('db', 'Database');
        const cache = new EC2('cache', 'Redis Cache');
        
        diagram.addNode(webServer);
        diagram.addNode(database);
        diagram.addNode(cache);
        
        diagram.rightShift([webServer], [database, cache]);
        
        return diagram;
    }

    private async startMonitoring(): Promise<void> {
        await this.renderer.renderDiagram(this.diagram);
        
        this.updateInterval = setInterval(() => {
            this.updateServiceStatuses();
        }, 5000); // Update every 5 seconds
    }

    private async updateServiceStatuses(): Promise<void> {
        // Simulate fetching real service data
        const services = this.diagram.getAllNodes();
        
        for (const service of services) {
            const status = await this.fetchServiceStatus(service.getId());
            service.setMetadata('status', status.health);
            service.setMetadata('cpu', status.cpu);
            service.setMetadata('memory', status.memory);
            service.setMetadata('lastUpdated', new Date().toISOString());
        }
        
        // Update the visual representation
        await this.renderer.updateDiagram(this.diagram);
    }

    private async fetchServiceStatus(serviceId: string): Promise<any> {
        // Simulate API call to monitoring service
        return {
            health: Math.random() > 0.8 ? 'warning' : 'healthy',
            cpu: Math.random() * 100,
            memory: Math.random() * 100
        };
    }

    public stopMonitoring(): void {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

// Usage
const monitor = new LiveInfrastructureMonitor('live-diagram');
```

### **Interactive Service Details**

```typescript
class InteractiveArchitectureViewer {
    private renderer: CloudDiagramsD3Renderer;
    private selectedNode: any = null;

    constructor(containerId: string, diagram: Diagram) {
        this.renderer = new CloudDiagramsD3Renderer(containerId, {
            width: 1000,
            height: 600,
            layoutAlgorithm: 'hierarchical',
            enableZoom: true,
            enablePan: true
        });

        this.setupInteractions();
        this.renderer.renderDiagram(diagram);
    }

    private setupInteractions(): void {
        this.renderer.on('nodeClick', (event) => {
            this.handleNodeClick(event.node);
        });

        this.renderer.on('nodeHover', (event) => {
            this.showTooltip(event.node, event.position);
        });

        this.renderer.on('nodeLeave', () => {
            this.hideTooltip();
        });

        this.renderer.on('edgeClick', (event) => {
            this.showConnectionDetails(event.edge);
        });
    }

    private handleNodeClick(node: any): void {
        // Highlight selected node
        if (this.selectedNode) {
            this.unhighlightNode(this.selectedNode);
        }
        
        this.selectedNode = node;
        this.highlightNode(node);
        
        // Show detailed panel
        this.showServiceDetails(node);
        
        // Open relevant console/documentation
        this.openServiceConsole(node);
    }

    private highlightNode(node: any): void {
        // Add visual highlighting
        const nodeElement = this.renderer.getNodeElement(node.getId());
        if (nodeElement) {
            nodeElement.style.strokeWidth = '3px';
            nodeElement.style.stroke = '#ff6b6b';
        }
    }

    private unhighlightNode(node: any): void {
        const nodeElement = this.renderer.getNodeElement(node.getId());
        if (nodeElement) {
            nodeElement.style.strokeWidth = '1px';
            nodeElement.style.stroke = '#007bff';
        }
    }

    private showTooltip(node: any, position: { x: number, y: number }): void {
        const tooltip = document.createElement('div');
        tooltip.className = 'service-tooltip';
        tooltip.innerHTML = `
            <h4>${node.getLabel()}</h4>
            <p><strong>Provider:</strong> ${node.getProvider()}</p>
            <p><strong>Service:</strong> ${node.getService()}</p>
            <p><strong>Status:</strong> ${node.getMetadata('status') || 'Unknown'}</p>
        `;
        
        tooltip.style.position = 'absolute';
        tooltip.style.left = `${position.x + 10}px`;
        tooltip.style.top = `${position.y - 10}px`;
        tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '10px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '12px';
        tooltip.style.zIndex = '1000';
        
        document.body.appendChild(tooltip);
    }

    private hideTooltip(): void {
        const tooltip = document.querySelector('.service-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    private showServiceDetails(node: any): void {
        const detailsPanel = document.getElementById('service-details');
        if (detailsPanel) {
            detailsPanel.innerHTML = `
                <h3>${node.getLabel()}</h3>
                <div class="service-info">
                    <p><strong>ID:</strong> ${node.getId()}</p>
                    <p><strong>Provider:</strong> ${node.getProvider()}</p>
                    <p><strong>Service Type:</strong> ${node.getService()}</p>
                    <p><strong>Category:</strong> ${node.getCategory()}</p>
                </div>
                <div class="service-metadata">
                    <h4>Metadata</h4>
                    <pre>${JSON.stringify(node.getMetadata(), null, 2)}</pre>
                </div>
                <div class="service-actions">
                    <button onclick="window.open('${this.getConsoleUrl(node)}')">
                        Open Console
                    </button>
                    <button onclick="this.showLogs('${node.getId()}')">
                        View Logs
                    </button>
                </div>
            `;
        }
    }

    private openServiceConsole(node: any): void {
        const url = this.getConsoleUrl(node);
        if (url) {
            window.open(url, '_blank');
        }
    }

    private getConsoleUrl(node: any): string {
        const provider = node.getProvider();
        const service = node.getService();
        
        switch (provider) {
            case 'aws':
                return `https://console.aws.amazon.com/${service}`;
            case 'azure':
                return `https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.${service}`;
            case 'gcp':
                return `https://console.cloud.google.com/${service}`;
            default:
                return '';
        }
    }
}
```

## 🚀 Production Deployment

### **Build Configuration**

```json
// package.json
{
  "name": "my-cloud-architecture-app",
  "version": "1.0.0",
  "scripts": {
    "build": "webpack --mode production",
    "dev": "webpack serve --mode development",
    "type-check": "tsc --noEmit",
    "lint": "eslint src/**/*.{ts,tsx}",
    "test": "jest"
  },
  "dependencies": {
    "@kloud-diagramming/core": "^0.2.1",
    "d3": "^7.0.0"
  },
  "devDependencies": {
    "@types/d3": "^7.4.0",
    "typescript": "^5.0.0",
    "webpack": "^5.0.0",
    "webpack-cli": "^5.0.0",
    "webpack-dev-server": "^4.0.0"
  }
}
```

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  externals: {
    'd3': 'd3'
  },
  devServer: {
    static: './dist',
    hot: true
  }
};
```

### **CI/CD Pipeline**

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Type check
      run: npm run type-check
    
    - name: Lint
      run: npm run lint
    
    - name: Test
      run: npm test
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      if: github.ref == 'refs/heads/main'
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 🎯 Best Practices

### **1. Performance Optimization**

```typescript
// For large diagrams (100+ nodes)
const optimizedRenderer = new CloudDiagramsD3Renderer('container', {
    layoutAlgorithm: 'manual', // Faster than force layout
    enableAnimations: false, // Disable for performance
    renderBatchSize: 50, // Render in batches
    enableVirtualization: true, // Only render visible nodes
    viewportBuffer: 100 // Buffer around viewport
});

// Memory management
function cleanupDiagram(renderer: CloudDiagramsD3Renderer) {
    renderer.clear();
    renderer.off(); // Remove all event listeners
}
```

### **2. Error Handling**

```typescript
class RobustDiagramRenderer {
    private renderer: CloudDiagramsD3Renderer | null = null;
    private retryCount = 0;
    private maxRetries = 3;

    async renderWithRetry(diagram: Diagram, containerId: string): Promise<void> {
        try {
            this.renderer = new CloudDiagramsD3Renderer(containerId, {
                width: 1000,
                height: 600,
                layoutAlgorithm: 'hierarchical'
            });

            await this.renderer.renderDiagram(diagram);
            this.retryCount = 0; // Reset on success
        } catch (error) {
            console.error('Render failed:', error);
            
            if (this.retryCount < this.maxRetries) {
                this.retryCount++;
                console.log(`Retrying... (${this.retryCount}/${this.maxRetries})`);
                
                // Wait before retry
                await new Promise(resolve => setTimeout(resolve, 1000));
                return this.renderWithRetry(diagram, containerId);
            } else {
                throw new Error(`Failed to render after ${this.maxRetries} attempts: ${error}`);
            }
        }
    }
}
```

### **3. Accessibility**

```typescript
// Accessible diagram renderer
const accessibleRenderer = new CloudDiagramsD3Renderer('container', {
    enableAccessibility: true,
    ariaLabels: true,
    keyboardNavigation: true,
    focusIndicators: true,
    theme: 'high-contrast' // For better visibility
});

// Keyboard navigation
renderer.on('keydown', (event) => {
    switch (event.key) {
        case 'Tab':
            // Navigate between nodes
            break;
        case 'Enter':
        case ' ':
            // Activate selected node
            break;
        case 'Escape':
            // Clear selection
            break;
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
            // Navigate in direction
            break;
    }
});
```

## 📞 Getting Help

- **Examples**: Check the `/examples` directory for working demos
- **Documentation**: See [README.md](./README.md) and [VISUALIZATION_GUIDE.md](./docs/VISUALIZATION_GUIDE.md)
- **GitHub Issues**: Report bugs or request features
- **Discussions**: Ask questions and share your architectures

---

**Happy diagramming with @kloud-diagramming/core! 🎨✨** 