# 📚 React Cloud Diagrams Tutorial - Complete Guide

Welcome to the comprehensive React tutorial for the `@cloud-diagrams` package suite! This guide will walk you through everything from basic React setup to advanced cloud architecture patterns.

## 🚀 Quick Start for React Developers

### Prerequisites

- **Node.js** 16+ (recommended: 18+)
- **React** 16.8+ (hooks support required)
- **TypeScript** 4.5+ (recommended for best experience)

### 1. Create Your React Project

Choose your preferred React setup:

#### **Option A: Create React App** (Recommended for beginners)

```bash
# Create a new React app with TypeScript
npx create-react-app my-cloud-diagrams --template typescript
cd my-cloud-diagrams

# Install cloud diagrams packages
npm install @cloud-diagrams/core @cloud-diagrams/aws @cloud-diagrams/react

# Start development server
npm start
```

#### **Option B: Next.js** (For production apps)

```bash
# Create Next.js app
npx create-next-app@latest my-cloud-diagrams --typescript --tailwind --eslint
cd my-cloud-diagrams

# Install cloud diagrams packages
npm install @cloud-diagrams/core @cloud-diagrams/aws @cloud-diagrams/react

# Start development server
npm run dev
```

#### **Option C: Vite** (Lightning fast development)

```bash
# Create Vite app
npm create vite@latest my-cloud-diagrams -- --template react-ts
cd my-cloud-diagrams

# Install dependencies
npm install
npm install @cloud-diagrams/core @cloud-diagrams/aws @cloud-diagrams/react

# Start development server
npm run dev
```

### 2. Your First Cloud Diagram Component

Replace your `src/App.tsx` with this simple example:

```tsx
import React from 'react';
import { DiagramRenderer, DiagramProvider } from '@cloud-diagrams/react';
import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS } from '@cloud-diagrams/aws';

function createSimpleArchitecture() {
  const diagram = new Diagram('My First Cloud Architecture');

  // Create AWS resources
  const webServer = new EC2('web-server', {
    label: 'Web Server\n(t3.medium)',
    metadata: { instanceType: 't3.medium' },
  });

  const database = new RDS('database', {
    label: 'PostgreSQL\n(db.t3.micro)',
    metadata: { engine: 'postgresql' },
  });

  // Add to diagram and connect
  diagram.addNode(webServer);
  diagram.addNode(database);
  diagram.connect(webServer, database, { label: 'SQL queries' });

  return diagram;
}

function App() {
  const diagram = createSimpleArchitecture();

  return (
    <DiagramProvider>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>🏗️ My Cloud Architecture</h1>
        <DiagramRenderer
          diagram={diagram}
          theme="default"
          width={800}
          height={400}
          interactive
        />
      </div>
    </DiagramProvider>
  );
}

export default App;
```

**🎉 Run `npm start` and see your interactive cloud diagram at http://localhost:3000!**

## 📁 Recommended Project Structure

### **Small Projects** (1-5 diagrams)

```
src/
├── App.tsx
├── components/
│   ├── DiagramViewer.tsx
│   └── DiagramControls.tsx
├── diagrams/
│   ├── simple-web-app.ts
│   ├── microservices.ts
│   └── data-pipeline.ts
├── hooks/
│   └── useDiagram.ts
└── index.tsx
```

### **Medium Projects** (5-20 diagrams)

```
src/
├── features/
│   ├── architecture/
│   │   ├── components/
│   │   │   ├── ArchitectureDiagram.tsx
│   │   │   ├── DiagramControls.tsx
│   │   │   └── ExportControls.tsx
│   │   ├── diagrams/
│   │   │   ├── aws/
│   │   │   │   ├── three-tier.ts
│   │   │   │   └── microservices.ts
│   │   │   ├── azure/
│   │   │   └── gcp/
│   │   └── hooks/
│   │       ├── useArchitecture.ts
│   │       └── useExport.ts
│   └── dashboard/
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── App.tsx
```

### **Large Projects** (20+ diagrams)

```
src/
├── domains/
│   ├── infrastructure/
│   │   ├── components/
│   │   ├── diagrams/
│   │   ├── hooks/
│   │   └── services/
│   ├── monitoring/
│   ├── deployment/
│   └── security/
├── shared/
│   ├── diagram-components/
│   ├── providers/
│   ├── hooks/
│   └── utils/
└── App.tsx
```

## 🎯 Four Ways to Use the Library

### **Approach 1: Simple Component Usage** (Recommended for beginners)

Perfect for static diagrams or simple use cases:

```tsx
// src/components/SimpleArchitecture.tsx
import React from 'react';
import { DiagramRenderer } from '@cloud-diagrams/react';
import { createWebAppArchitecture } from '../diagrams/web-app';

function SimpleArchitecture() {
  return (
    <div>
      <h2>Our Web Application Architecture</h2>
      <DiagramRenderer
        diagram={createWebAppArchitecture()}
        theme="light"
        width={1000}
        height={600}
        interactive
      />
    </div>
  );
}

export default SimpleArchitecture;
```

```typescript
// src/diagrams/web-app.ts
import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS, S3, LoadBalancer } from '@cloud-diagrams/aws';

export function createWebAppArchitecture() {
  const diagram = new Diagram('Web Application Architecture');

  const loadBalancer = new LoadBalancer('alb', {
    label: 'Application\nLoad Balancer',
  });

  const webServer1 = new EC2('web-1', {
    label: 'Web Server 1\n(us-east-1a)',
  });

  const webServer2 = new EC2('web-2', {
    label: 'Web Server 2\n(us-east-1b)',
  });

  const database = new RDS('db', {
    label: 'PostgreSQL\n(Multi-AZ)',
  });

  const storage = new S3('assets', {
    label: 'Static Assets\n(S3 Bucket)',
  });

  // Add nodes
  diagram.addNode(loadBalancer);
  diagram.addNode(webServer1);
  diagram.addNode(webServer2);
  diagram.addNode(database);
  diagram.addNode(storage);

  // Create connections
  diagram.connect(loadBalancer, webServer1);
  diagram.connect(loadBalancer, webServer2);
  diagram.connect(webServer1, database);
  diagram.connect(webServer2, database);
  diagram.connect(webServer1, storage);
  diagram.connect(webServer2, storage);

  return diagram;
}
```

### **Approach 2: Hook-Based State Management** (For dynamic diagrams)

Perfect for interactive diagrams that change based on user input:

```tsx
// src/components/InteractiveDiagram.tsx
import React, { useState } from 'react';
import { DiagramRenderer } from '@cloud-diagrams/react';
import { useDiagram } from '../hooks/useDiagram';
import { EC2, RDS, S3 } from '@cloud-diagrams/aws';

function InteractiveDiagram() {
  const { diagram, addNode, removeNode, connect } = useDiagram(
    'Interactive Architecture'
  );
  const [nodeCounter, setNodeCounter] = useState(1);

  const addWebServer = () => {
    const server = new EC2(`web-${nodeCounter}`, {
      label: `Web Server ${nodeCounter}\n(t3.medium)`,
    });
    addNode(server);
    setNodeCounter((prev) => prev + 1);
  };

  const addDatabase = () => {
    const db = new RDS(`db-${nodeCounter}`, {
      label: `Database ${nodeCounter}\n(PostgreSQL)`,
    });
    addNode(db);
    setNodeCounter((prev) => prev + 1);
  };

  const addStorage = () => {
    const storage = new S3(`storage-${nodeCounter}`, {
      label: `Storage ${nodeCounter}\n(S3 Bucket)`,
    });
    addNode(storage);
    setNodeCounter((prev) => prev + 1);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={addWebServer} style={buttonStyle}>
          Add Web Server
        </button>
        <button onClick={addDatabase} style={buttonStyle}>
          Add Database
        </button>
        <button onClick={addStorage} style={buttonStyle}>
          Add Storage
        </button>
      </div>

      <DiagramRenderer
        diagram={diagram}
        theme="default"
        width={1200}
        height={700}
        interactive
      />
    </div>
  );
}

const buttonStyle = {
  margin: '0 10px',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default InteractiveDiagram;
```

```typescript
// src/hooks/useDiagram.ts
import { useState, useCallback } from 'react';
import { Diagram } from '@cloud-diagrams/core';

export function useDiagram(name: string) {
  const [diagram, setDiagram] = useState(() => new Diagram(name));

  const addNode = useCallback((node: any) => {
    setDiagram((prevDiagram) => {
      const newDiagram = new Diagram(prevDiagram.name);
      // Copy existing nodes
      prevDiagram.getNodes().forEach((existingNode) => {
        newDiagram.addNode(existingNode);
      });
      // Copy existing connections
      prevDiagram.getConnections().forEach((connection) => {
        newDiagram.connect(connection.from, connection.to, connection.options);
      });
      // Add new node
      newDiagram.addNode(node);
      return newDiagram;
    });
  }, []);

  const removeNode = useCallback((nodeId: string) => {
    setDiagram((prevDiagram) => {
      const newDiagram = new Diagram(prevDiagram.name);
      prevDiagram
        .getNodes()
        .filter((node) => node.id !== nodeId)
        .forEach((node) => newDiagram.addNode(node));
      return newDiagram;
    });
  }, []);

  const connect = useCallback((fromId: string, toId: string, options?: any) => {
    setDiagram((prevDiagram) => {
      const newDiagram = new Diagram(prevDiagram.name);
      // Copy nodes and connections
      prevDiagram.getNodes().forEach((node) => newDiagram.addNode(node));
      prevDiagram.getConnections().forEach((connection) => {
        newDiagram.connect(connection.from, connection.to, connection.options);
      });

      // Add new connection
      const fromNode = newDiagram.getNodes().find((n) => n.id === fromId);
      const toNode = newDiagram.getNodes().find((n) => n.id === toId);
      if (fromNode && toNode) {
        newDiagram.connect(fromNode, toNode, options);
      }
      return newDiagram;
    });
  }, []);

  return { diagram, addNode, removeNode, connect };
}
```

### **Approach 3: Context Provider Pattern** (For complex apps)

Perfect for applications where multiple components need access to diagram state:

```tsx
// src/providers/DiagramProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Diagram } from '@cloud-diagrams/core';

interface DiagramContextType {
  diagram: Diagram | null;
  setDiagram: (diagram: Diagram) => void;
  theme: string;
  setTheme: (theme: string) => void;
  exportDiagram: (format: 'svg' | 'png' | 'pdf') => Promise<void>;
}

const DiagramContext = createContext<DiagramContextType | undefined>(undefined);

export function DiagramProvider({ children }: { children: ReactNode }) {
  const [diagram, setDiagram] = useState<Diagram | null>(null);
  const [theme, setTheme] = useState('default');

  const exportDiagram = async (format: 'svg' | 'png' | 'pdf') => {
    if (!diagram) return;

    try {
      const result = await diagram.export(format);
      // Create download link
      const blob = new Blob([result], {
        type: format === 'svg' ? 'image/svg+xml' : `image/${format}`,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `diagram.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <DiagramContext.Provider
      value={{
        diagram,
        setDiagram,
        theme,
        setTheme,
        exportDiagram,
      }}
    >
      {children}
    </DiagramContext.Provider>
  );
}

export function useDiagramContext() {
  const context = useContext(DiagramContext);
  if (!context) {
    throw new Error('useDiagramContext must be used within DiagramProvider');
  }
  return context;
}
```

```tsx
// src/components/DiagramControls.tsx
import React from 'react';
import { useDiagramContext } from '../providers/DiagramProvider';

function DiagramControls() {
  const { theme, setTheme, exportDiagram } = useDiagramContext();

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>Theme: </label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value="default">Default</option>
          <option value="dark">Dark</option>
          <option value="aws">AWS</option>
          <option value="azure">Azure</option>
          <option value="gcp">GCP</option>
        </select>
      </div>

      <div>
        <button onClick={() => exportDiagram('svg')} style={buttonStyle}>
          Export SVG
        </button>
        <button onClick={() => exportDiagram('png')} style={buttonStyle}>
          Export PNG
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  margin: '0 5px',
  padding: '8px 16px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default DiagramControls;
```

```tsx
// src/App.tsx
import React from 'react';
import { DiagramProvider } from './providers/DiagramProvider';
import DiagramControls from './components/DiagramControls';
import ArchitectureViewer from './components/ArchitectureViewer';

function App() {
  return (
    <DiagramProvider>
      <div style={{ padding: '20px' }}>
        <h1>🏗️ Cloud Architecture Dashboard</h1>
        <DiagramControls />
        <ArchitectureViewer />
      </div>
    </DiagramProvider>
  );
}

export default App;
```

### **Approach 4: Custom Hooks** (For reusable logic)

Perfect for creating reusable diagram logic across multiple components:

```typescript
// src/hooks/useCloudArchitecture.ts
import { useState, useEffect } from 'react';
import { Diagram } from '@cloud-diagrams/core';

export function useCloudArchitecture(architectureType: string) {
  const [diagram, setDiagram] = useState<Diagram | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArchitecture() {
      try {
        setLoading(true);
        setError(null);

        // Dynamic import based on architecture type
        const { createArchitecture } = await import(
          `../diagrams/${architectureType}`
        );
        const newDiagram = createArchitecture();
        setDiagram(newDiagram);
      } catch (err) {
        setError(`Failed to load architecture: ${architectureType}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadArchitecture();
  }, [architectureType]);

  return { diagram, loading, error };
}
```

```typescript
// src/hooks/useTheme.ts
import { useState, useCallback } from 'react';

export function useTheme(initialTheme = 'default') {
  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'default' ? 'dark' : 'default'));
  }, []);

  const setCustomTheme = useCallback((newTheme: string) => {
    setTheme(newTheme);
  }, []);

  return { theme, setTheme: setCustomTheme, toggleTheme };
}
```

```typescript
// src/hooks/useExport.ts
import { useCallback } from 'react';
import { Diagram } from '@cloud-diagrams/core';

export function useExport() {
  const exportDiagram = useCallback(
    async (
      diagram: Diagram,
      format: 'svg' | 'png' | 'pdf',
      options?: { width?: number; height?: number }
    ) => {
      try {
        const result = await diagram.export(format, options);

        // Create download
        const blob = new Blob([result], {
          type: format === 'svg' ? 'image/svg+xml' : `image/${format}`,
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${diagram.name.toLowerCase().replace(/\s+/g, '-')}.${format}`;
        a.click();
        URL.revokeObjectURL(url);

        return result;
      } catch (error) {
        console.error('Export failed:', error);
        throw error;
      }
    },
    []
  );

  return { exportDiagram };
}
```

```tsx
// src/components/ArchitecturePage.tsx
import React from 'react';
import { DiagramRenderer } from '@cloud-diagrams/react';
import { useCloudArchitecture } from '../hooks/useCloudArchitecture';
import { useTheme } from '../hooks/useTheme';
import { useExport } from '../hooks/useExport';

interface ArchitecturePageProps {
  type: string;
  title: string;
}

function ArchitecturePage({ type, title }: ArchitecturePageProps) {
  const { diagram, loading, error } = useCloudArchitecture(type);
  const { theme, toggleTheme } = useTheme();
  const { exportDiagram } = useExport();

  const handleExport = async (format: 'svg' | 'png' | 'pdf') => {
    if (diagram) {
      try {
        await exportDiagram(diagram, format);
      } catch (error) {
        alert('Export failed. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div>Loading {title}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h2>{title}</h2>
        <div>
          <button onClick={toggleTheme} style={buttonStyle}>
            Toggle Theme
          </button>
          <button onClick={() => handleExport('svg')} style={buttonStyle}>
            Export SVG
          </button>
          <button onClick={() => handleExport('png')} style={buttonStyle}>
            Export PNG
          </button>
        </div>
      </div>

      {diagram && (
        <DiagramRenderer
          diagram={diagram}
          theme={theme}
          width={1200}
          height={800}
          interactive
        />
      )}
    </div>
  );
}

const buttonStyle = {
  margin: '0 5px',
  padding: '8px 16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default ArchitecturePage;
```

## 🌐 Multi-Cloud Examples

### **AWS + Azure Hybrid Architecture**

```typescript
// src/diagrams/hybrid-cloud.ts
import { Diagram, Group } from '@cloud-diagrams/core';
import { EC2, RDS } from '@cloud-diagrams/aws';
import { VirtualMachine, SQLDatabase } from '@cloud-diagrams/azure';

export function createHybridCloudArchitecture() {
  const diagram = new Diagram('Hybrid Cloud Architecture');

  // AWS group
  const awsGroup = new Group('aws-region', {
    label: 'AWS (us-east-1)',
    style: { backgroundColor: '#fff3cd', border: '2px solid #ff9900' },
  });

  const awsWeb = new EC2('aws-web', {
    label: 'Web Frontend\n(EC2 t3.large)',
    metadata: { instanceType: 't3.large', region: 'us-east-1' },
  });

  const awsCache = new EC2('aws-cache', {
    label: 'Redis Cache\n(ElastiCache)',
    metadata: { engine: 'redis', region: 'us-east-1' },
  });

  awsGroup.addNode(awsWeb);
  awsGroup.addNode(awsCache);

  // Azure group
  const azureGroup = new Group('azure-region', {
    label: 'Azure (East US)',
    style: { backgroundColor: '#e7f3ff', border: '2px solid #0078d4' },
  });

  const azureApi = new VirtualMachine('azure-api', {
    label: 'API Backend\n(Standard D2s v3)',
    metadata: { size: 'Standard_D2s_v3', region: 'East US' },
  });

  const azureDb = new SQLDatabase('azure-db', {
    label: 'SQL Database\n(S2 Standard)',
    metadata: { tier: 'Standard', region: 'East US' },
  });

  azureGroup.addNode(azureApi);
  azureGroup.addNode(azureDb);

  // Add groups to diagram
  diagram.addGroup(awsGroup);
  diagram.addGroup(azureGroup);

  // Cross-cloud connections
  diagram.connect(awsWeb, azureApi, {
    label: 'HTTPS API calls',
    style: { strokeDasharray: '5,5', strokeColor: '#ff6b6b' },
  });

  diagram.connect(awsWeb, awsCache, { label: 'Cache' });
  diagram.connect(azureApi, azureDb, { label: 'SQL queries' });

  return diagram;
}
```

### **Multi-Cloud Data Pipeline**

```typescript
// src/diagrams/data-pipeline.ts
import { Diagram } from '@cloud-diagrams/core';
import { S3, Lambda } from '@cloud-diagrams/aws';
import { BlobStorage, Functions } from '@cloud-diagrams/azure';
import { CloudStorage, CloudFunctions } from '@cloud-diagrams/gcp';

export function createDataPipelineArchitecture() {
  const diagram = new Diagram('Multi-Cloud Data Pipeline');

  // Data sources
  const awsSource = new S3('aws-data-lake', {
    label: 'AWS Data Lake\n(S3 Bucket)',
    metadata: { bucketName: 'company-data-lake' },
  });

  const azureSource = new BlobStorage('azure-blob', {
    label: 'Azure Blob Storage\n(Hot Tier)',
    metadata: { tier: 'Hot', replication: 'LRS' },
  });

  // Processing functions
  const awsProcessor = new Lambda('aws-etl', {
    label: 'AWS ETL Function\n(Python 3.9)',
    metadata: { runtime: 'python3.9', memory: '1024MB' },
  });

  const azureProcessor = new Functions('azure-processor', {
    label: 'Azure Function\n(Node.js 18)',
    metadata: { runtime: 'node18', plan: 'Consumption' },
  });

  // Final storage and analytics
  const gcpWarehouse = new CloudStorage('gcp-warehouse', {
    label: 'GCP Data Warehouse\n(BigQuery)',
    metadata: { location: 'US', storageClass: 'STANDARD' },
  });

  const gcpAnalytics = new CloudFunctions('gcp-analytics', {
    label: 'GCP Analytics\n(Cloud Functions)',
    metadata: { runtime: 'python39', trigger: 'HTTP' },
  });

  // Add all nodes
  diagram.addNode(awsSource);
  diagram.addNode(azureSource);
  diagram.addNode(awsProcessor);
  diagram.addNode(azureProcessor);
  diagram.addNode(gcpWarehouse);
  diagram.addNode(gcpAnalytics);

  // Create pipeline connections
  diagram.connect(awsSource, awsProcessor, { label: 'S3 Event Trigger' });
  diagram.connect(azureSource, azureProcessor, { label: 'Blob Event Trigger' });
  diagram.connect(awsProcessor, gcpWarehouse, { label: 'Processed Data' });
  diagram.connect(azureProcessor, gcpWarehouse, { label: 'Processed Data' });
  diagram.connect(gcpWarehouse, gcpAnalytics, { label: 'Analytics Query' });

  return diagram;
}
```

## 🎨 Styling & Theming

### **Built-in Themes**

```tsx
import React, { useState } from 'react';
import { DiagramRenderer } from '@cloud-diagrams/react';

function ThemedDiagram({ diagram }) {
  const [theme, setTheme] = useState('default');

  const themes = [
    { value: 'default', label: 'Default' },
    { value: 'dark', label: 'Dark' },
    { value: 'aws', label: 'AWS Orange' },
    { value: 'azure', label: 'Azure Blue' },
    { value: 'gcp', label: 'GCP Colors' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label>Choose Theme: </label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          {themes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <DiagramRenderer
        diagram={diagram}
        theme={theme}
        width={1000}
        height={600}
      />
    </div>
  );
}
```

### **Custom Styling with CSS Modules**

```css
/* DiagramViewer.module.css */
.diagramContainer {
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  padding: 24px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.diagramContainer:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.darkTheme {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  border-color: #5a6c7d;
  color: white;
}

.awsTheme {
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
  border-color: #ff9900;
}

.azureTheme {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-color: #0078d4;
}

.gcpTheme {
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
  border-color: #4285f4;
}

.controls {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.primaryButton {
  background: #007bff;
  color: white;
}

.primaryButton:hover {
  background: #0056b3;
  transform: translateY(-1px);
}

.secondaryButton {
  background: #6c757d;
  color: white;
}

.secondaryButton:hover {
  background: #545b62;
}
```

```tsx
// src/components/StyledDiagramViewer.tsx
import React, { useState } from 'react';
import { DiagramRenderer } from '@cloud-diagrams/react';
import styles from './DiagramViewer.module.css';

interface StyledDiagramViewerProps {
  diagram: any;
  title: string;
}

function StyledDiagramViewer({ diagram, title }: StyledDiagramViewerProps) {
  const [theme, setTheme] = useState('default');

  const getContainerClass = () => {
    const baseClass = styles.diagramContainer;
    switch (theme) {
      case 'dark':
        return `${baseClass} ${styles.darkTheme}`;
      case 'aws':
        return `${baseClass} ${styles.awsTheme}`;
      case 'azure':
        return `${baseClass} ${styles.azureTheme}`;
      case 'gcp':
        return `${baseClass} ${styles.gcpTheme}`;
      default:
        return baseClass;
    }
  };

  return (
    <div>
      <div className={styles.controls}>
        <h3 style={{ margin: 0, flex: 1 }}>{title}</h3>
        <button
          className={`${styles.button} ${styles.secondaryButton}`}
          onClick={() => setTheme('default')}
        >
          Default
        </button>
        <button
          className={`${styles.button} ${styles.secondaryButton}`}
          onClick={() => setTheme('dark')}
        >
          Dark
        </button>
        <button
          className={`${styles.button} ${styles.secondaryButton}`}
          onClick={() => setTheme('aws')}
        >
          AWS
        </button>
        <button
          className={`${styles.button} ${styles.primaryButton}`}
          onClick={() => window.print()}
        >
          Print
        </button>
      </div>

      <div className={getContainerClass()}>
        <DiagramRenderer
          diagram={diagram}
          theme={theme}
          width="100%"
          height={600}
          interactive
        />
      </div>
    </div>
  );
}

export default StyledDiagramViewer;
```

### **Styled Components Integration**

```tsx
// src/components/StyledDiagram.tsx
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { DiagramRenderer } from '@cloud-diagrams/react';

const DiagramContainer = styled.div`
  border: 2px solid ${(props) => props.theme.borderColor};
  border-radius: 12px;
  padding: 24px;
  background: ${(props) => props.theme.background};
  box-shadow: 0 4px 6px ${(props) => props.theme.shadowColor};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 15px ${(props) => props.theme.shadowColorHover};
    transform: translateY(-2px);
  }

  .diagram-node {
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
      filter: brightness(1.1);
    }
  }

  .diagram-edge {
    transition: stroke-width 0.3s ease;

    &:hover {
      stroke-width: 3;
    }
  }
`;

const ControlPanel = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  padding: 16px;
  background: ${(props) => props.theme.controlBackground};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.controlBorder};
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  background: ${(props) =>
    props.primary ? props.theme.primaryColor : props.theme.secondaryColor};
  color: white;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.primary
        ? props.theme.primaryColorHover
        : props.theme.secondaryColorHover};
    transform: translateY(-1px);
  }
`;

const themes = {
  light: {
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    borderColor: '#e1e5e9',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowColorHover: 'rgba(0, 0, 0, 0.15)',
    controlBackground: '#f8f9fa',
    controlBorder: '#dee2e6',
    primaryColor: '#007bff',
    primaryColorHover: '#0056b3',
    secondaryColor: '#6c757d',
    secondaryColorHover: '#545b62',
  },
  dark: {
    background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    borderColor: '#5a6c7d',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowColorHover: 'rgba(0, 0, 0, 0.4)',
    controlBackground: '#34495e',
    controlBorder: '#5a6c7d',
    primaryColor: '#3498db',
    primaryColorHover: '#2980b9',
    secondaryColor: '#95a5a6',
    secondaryColorHover: '#7f8c8d',
  },
  aws: {
    background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
    borderColor: '#ff9900',
    shadowColor: 'rgba(255, 153, 0, 0.2)',
    shadowColorHover: 'rgba(255, 153, 0, 0.3)',
    controlBackground: '#fff8e1',
    controlBorder: '#ffcc02',
    primaryColor: '#ff9900',
    primaryColorHover: '#e68900',
    secondaryColor: '#232f3e',
    secondaryColorHover: '#1a252f',
  },
};

interface StyledDiagramProps {
  diagram: any;
  themeName?: 'light' | 'dark' | 'aws';
  title: string;
}

function StyledDiagram({
  diagram,
  themeName = 'light',
  title,
}: StyledDiagramProps) {
  const [currentTheme, setCurrentTheme] = React.useState(themeName);

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <ControlPanel>
        <h3
          style={{
            margin: 0,
            flex: 1,
            color: themes[currentTheme].secondaryColor,
          }}
        >
          {title}
        </h3>
        <Button onClick={() => setCurrentTheme('light')}>Light</Button>
        <Button onClick={() => setCurrentTheme('dark')}>Dark</Button>
        <Button onClick={() => setCurrentTheme('aws')}>AWS</Button>
        <Button primary onClick={() => window.print()}>
          Print
        </Button>
      </ControlPanel>

      <DiagramContainer>
        <DiagramRenderer
          diagram={diagram}
          theme={currentTheme}
          width="100%"
          height={600}
          interactive
        />
      </DiagramContainer>
    </ThemeProvider>
  );
}

export default StyledDiagram;
```

## 🔧 Advanced Features

### **Real-Time Updates**

```tsx
// src/components/LiveInfrastructureDiagram.tsx
import React, { useState, useEffect } from 'react';
import { DiagramRenderer } from '@cloud-diagrams/react';
import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS } from '@cloud-diagrams/aws';

interface ServiceStatus {
  id: string;
  status: 'healthy' | 'warning' | 'error';
  cpu: number;
  memory: number;
}

function LiveInfrastructureDiagram() {
  const [diagram, setDiagram] = useState<Diagram | null>(null);
  const [serviceStatuses, setServiceStatuses] = useState<ServiceStatus[]>([]);

  // Simulate real-time status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setServiceStatuses((prev) =>
        prev.map((service) => ({
          ...service,
          cpu: Math.random() * 100,
          memory: Math.random() * 100,
          status: Math.random() > 0.8 ? 'warning' : 'healthy',
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Create diagram with status-aware nodes
  useEffect(() => {
    const newDiagram = new Diagram('Live Infrastructure Monitoring');

    const webServer = new EC2('web-server', {
      label: 'Web Server\n(Live Status)',
      metadata: {
        status:
          serviceStatuses.find((s) => s.id === 'web-server')?.status ||
          'healthy',
        cpu: serviceStatuses.find((s) => s.id === 'web-server')?.cpu || 0,
      },
    });

    const database = new RDS('database', {
      label: 'Database\n(Live Status)',
      metadata: {
        status:
          serviceStatuses.find((s) => s.id === 'database')?.status || 'healthy',
        memory: serviceStatuses.find((s) => s.id === 'database')?.memory || 0,
      },
    });

    newDiagram.addNode(webServer);
    newDiagram.addNode(database);
    newDiagram.connect(webServer, database, { label: 'SQL' });

    setDiagram(newDiagram);

    // Initialize service statuses
    if (serviceStatuses.length === 0) {
      setServiceStatuses([
        { id: 'web-server', status: 'healthy', cpu: 25, memory: 40 },
        { id: 'database', status: 'healthy', cpu: 15, memory: 60 },
      ]);
    }
  }, [serviceStatuses]);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3>🔴 Live Infrastructure Status</h3>
        <div style={{ display: 'flex', gap: '20px' }}>
          {serviceStatuses.map((service) => (
            <div
              key={service.id}
              style={{
                padding: '10px',
                border: `2px solid ${service.status === 'healthy' ? '#28a745' : '#ffc107'}`,
                borderRadius: '8px',
                backgroundColor:
                  service.status === 'healthy' ? '#d4edda' : '#fff3cd',
              }}
            >
              <strong>{service.id}</strong>
              <br />
              Status: {service.status}
              <br />
              CPU: {service.cpu}%<br />
              Memory: {service.memory}%
            </div>
          ))}
        </div>
      </div>

      {diagram && (
        <DiagramRenderer
          diagram={diagram}
          theme="default"
          width={1000}
          height={500}
          interactive
        />
      )}
    </div>
  );
}

export default LiveInfrastructureDiagram;
```

### **Export with Custom Options**

```tsx
// src/components/AdvancedExportControls.tsx
import React, { useState } from 'react';
import { useExport } from '../hooks/useExport';

interface AdvancedExportControlsProps {
  diagram: any;
}

function AdvancedExportControls({ diagram }: AdvancedExportControlsProps) {
  const { exportDiagram } = useExport();
  const [exportOptions, setExportOptions] = useState({
    format: 'svg' as 'svg' | 'png' | 'pdf',
    width: 1920,
    height: 1080,
    quality: 100,
    background: 'white',
  });

  const handleExport = async () => {
    try {
      await exportDiagram(diagram, exportOptions.format, {
        width: exportOptions.width,
        height: exportOptions.height,
        quality: exportOptions.quality,
        background: exportOptions.background,
      });
    } catch (error) {
      alert('Export failed. Please try again.');
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f8f9fa',
      }}
    >
      <h4>Export Options</h4>

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}
      >
        <div>
          <label>Format:</label>
          <select
            value={exportOptions.format}
            onChange={(e) =>
              setExportOptions((prev) => ({
                ...prev,
                format: e.target.value as 'svg' | 'png' | 'pdf',
              }))
            }
            style={{ width: '100%', padding: '5px' }}
          >
            <option value="svg">SVG (Vector)</option>
            <option value="png">PNG (Raster)</option>
            <option value="pdf">PDF (Document)</option>
          </select>
        </div>

        <div>
          <label>Background:</label>
          <select
            value={exportOptions.background}
            onChange={(e) =>
              setExportOptions((prev) => ({
                ...prev,
                background: e.target.value,
              }))
            }
            style={{ width: '100%', padding: '5px' }}
          >
            <option value="white">White</option>
            <option value="transparent">Transparent</option>
            <option value="#f8f9fa">Light Gray</option>
            <option value="#2c3e50">Dark</option>
          </select>
        </div>

        <div>
          <label>Width:</label>
          <input
            type="number"
            value={exportOptions.width}
            onChange={(e) =>
              setExportOptions((prev) => ({
                ...prev,
                width: parseInt(e.target.value),
              }))
            }
            style={{ width: '100%', padding: '5px' }}
          />
        </div>

        <div>
          <label>Height:</label>
          <input
            type="number"
            value={exportOptions.height}
            onChange={(e) =>
              setExportOptions((prev) => ({
                ...prev,
                height: parseInt(e.target.value),
              }))
            }
            style={{ width: '100%', padding: '5px' }}
          />
        </div>

        {exportOptions.format === 'png' && (
          <div>
            <label>Quality (%):</label>
            <input
              type="range"
              min="10"
              max="100"
              value={exportOptions.quality}
              onChange={(e) =>
                setExportOptions((prev) => ({
                  ...prev,
                  quality: parseInt(e.target.value),
                }))
              }
              style={{ width: '100%' }}
            />
            <span>{exportOptions.quality}%</span>
          </div>
        )}
      </div>

      <button
        onClick={handleExport}
        style={{
          marginTop: '15px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Export {exportOptions.format.toUpperCase()}
      </button>
    </div>
  );
}

export default AdvancedExportControls;
```

## 🎯 Common Use Cases

### **Documentation Sites** (Docusaurus, GitBook)

```tsx
// src/components/DocumentationDiagram.tsx
import React, { useMemo } from 'react';
import { DiagramRenderer } from '@cloud-diagrams/react';

interface DocumentationDiagramProps {
  diagramId: string;
  title?: string;
  description?: string;
}

function DocumentationDiagram({
  diagramId,
  title,
  description,
}: DocumentationDiagramProps) {
  const diagram = useMemo(() => {
    // Load diagram based on ID
    return loadDiagramById(diagramId);
  }, [diagramId]);

  return (
    <div style={{ margin: '20px 0' }}>
      {title && <h3>{title}</h3>}
      {description && (
        <p style={{ color: '#666', marginBottom: '15px' }}>{description}</p>
      )}

      <div
        style={{
          border: '1px solid #e1e5e9',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
        }}
      >
        <DiagramRenderer
          diagram={diagram}
          theme="light"
          width="100%"
          height={400}
          interactive={false} // Static for documentation
        />
      </div>

      <details style={{ marginTop: '10px' }}>
        <summary style={{ cursor: 'pointer', color: '#007bff' }}>
          View diagram code
        </summary>
        <pre
          style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '5px',
            overflow: 'auto',
            fontSize: '14px',
          }}
        >
          {getDiagramCode(diagramId)}
        </pre>
      </details>
    </div>
  );
}

function loadDiagramById(id: string) {
  // Implementation to load diagram by ID
  // This could be from a registry, file system, or API
}

function getDiagramCode(id: string): string {
  // Return the TypeScript code for the diagram
  return `// Diagram code for ${id}`;
}

export default DocumentationDiagram;
```

### **Admin Dashboards**

```tsx
// src/components/InfrastructureDashboard.tsx
import React, { useState, useEffect } from 'react';
import { DiagramRenderer } from '@cloud-diagrams/react';
import { useInfrastructureMonitoring } from '../hooks/useInfrastructureMonitoring';

function InfrastructureDashboard() {
  const { diagram, services, updateNodeStatus, refreshData } =
    useInfrastructureMonitoring();

  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
  };

  const getServiceDetails = (nodeId: string) => {
    return services.find((s) => s.id === nodeId);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Main diagram area */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <h2>🏗️ Infrastructure Overview</h2>
          <button
            onClick={refreshData}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🔄 Refresh
          </button>
        </div>

        <DiagramRenderer
          diagram={diagram}
          theme="default"
          width="100%"
          height={600}
          interactive
          onNodeClick={handleNodeClick}
        />
      </div>

      {/* Side panel for service details */}
      <div
        style={{
          width: '300px',
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderLeft: '1px solid #dee2e6',
        }}
      >
        <h3>Service Details</h3>

        {selectedNode ? (
          <ServiceDetailsPanel service={getServiceDetails(selectedNode)} />
        ) : (
          <p style={{ color: '#666' }}>Click on a service to view details</p>
        )}
      </div>
    </div>
  );
}

function ServiceDetailsPanel({ service }: { service: any }) {
  if (!service) return null;

  return (
    <div>
      <h4>{service.name}</h4>
      <div style={{ marginBottom: '15px' }}>
        <strong>Status:</strong>
        <span
          style={{
            marginLeft: '10px',
            padding: '2px 8px',
            borderRadius: '12px',
            backgroundColor:
              service.status === 'healthy' ? '#d4edda' : '#f8d7da',
            color: service.status === 'healthy' ? '#155724' : '#721c24',
            fontSize: '12px',
          }}
        >
          {service.status}
        </span>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>CPU Usage:</strong> {service.cpu}%
        <div
          style={{
            width: '100%',
            backgroundColor: '#e9ecef',
            borderRadius: '4px',
            height: '8px',
            marginTop: '5px',
          }}
        >
          <div
            style={{
              width: `${service.cpu}%`,
              backgroundColor: service.cpu > 80 ? '#dc3545' : '#28a745',
              height: '100%',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>Memory Usage:</strong> {service.memory}%
        <div
          style={{
            width: '100%',
            backgroundColor: '#e9ecef',
            borderRadius: '4px',
            height: '8px',
            marginTop: '5px',
          }}
        >
          <div
            style={{
              width: `${service.memory}%`,
              backgroundColor: service.memory > 80 ? '#dc3545' : '#28a745',
              height: '100%',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Last Updated:</strong>
        <br />
        {new Date(service.lastUpdated).toLocaleString()}
      </div>

      <button
        style={{
          width: '100%',
          padding: '8px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        View Logs
      </button>
    </div>
  );
}

export default InfrastructureDashboard;
```

### **Presentation Apps**

```tsx
// src/components/ArchitecturePresentation.tsx
import React, { useState, useEffect } from 'react';
import { DiagramRenderer } from '@cloud-diagrams/react';

interface Slide {
  id: string;
  title: string;
  diagram: any;
  notes?: string;
}

interface ArchitecturePresentationProps {
  slides: Slide[];
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
}

function ArchitecturePresentation({
  slides,
  autoAdvance = false,
  autoAdvanceInterval = 10000,
}: ArchitecturePresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    if (autoAdvance && isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, autoAdvanceInterval);

      return () => clearInterval(interval);
    }
  }, [autoAdvance, isPlaying, autoAdvanceInterval, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1a1a1a',
        color: 'white',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#2c3e50',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ margin: 0 }}>{currentSlideData.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span>
            {currentSlide + 1} / {slides.length}
          </span>
          {autoAdvance && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                padding: '5px 10px',
                backgroundColor: isPlaying ? '#dc3545' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Diagram area */}
        <div style={{ flex: 1, padding: '20px' }}>
          <DiagramRenderer
            diagram={currentSlideData.diagram}
            theme="dark"
            width="100%"
            height="100%"
            interactive={false}
          />
        </div>

        {/* Notes panel */}
        {currentSlideData.notes && (
          <div
            style={{
              width: '300px',
              padding: '20px',
              backgroundColor: '#34495e',
              borderLeft: '1px solid #5a6c7d',
            }}
          >
            <h3>Speaker Notes</h3>
            <p style={{ lineHeight: '1.6' }}>{currentSlideData.notes}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#2c3e50',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            opacity: currentSlide === 0 ? 0.5 : 1,
          }}
        >
          ← Previous
        </button>

        {/* Slide indicators */}
        <div style={{ display: 'flex', gap: '5px' }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: index === currentSlide ? '#007bff' : '#6c757d',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            opacity: currentSlide === slides.length - 1 ? 0.5 : 1,
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default ArchitecturePresentation;
```

## 🚀 Next Steps

1. **Start with a simple approach** and gradually add complexity
2. **Explore the examples** in this tutorial
3. **Build your first diagram** using your preferred React setup
4. **Join the community** and share your creations
5. **Contribute** new features or cloud services

**Happy diagramming with React! 🎨✨**
