# 🏗️ Cloud Diagrams for React

> **Create interactive cloud architecture diagrams in React applications with TypeScript**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/amaboh/kloud_diagramming)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Build beautiful, interactive cloud architecture diagrams directly in your React applications. Perfect for documentation, presentations, and real-time infrastructure visualization.

## 🚀 Quick Start for React Developers

### 1. **Create React App** (Fastest Start)

```bash
# Create a new React app
npx create-react-app my-cloud-diagrams --template typescript
cd my-cloud-diagrams

# Install cloud diagrams packages
npm install @cloud-diagrams/core @cloud-diagrams/aws @cloud-diagrams/react

# Start developing
npm start
```

### 2. **Next.js App** (Production Ready)

```bash
# Create Next.js app
npx create-next-app@latest my-cloud-diagrams --typescript --tailwind --eslint
cd my-cloud-diagrams

# Install cloud diagrams packages
npm install @cloud-diagrams/core @cloud-diagrams/aws @cloud-diagrams/react

# Start developing
npm run dev
```

### 3. **Vite + React** (Lightning Fast)

```bash
# Create Vite app
npm create vite@latest my-cloud-diagrams -- --template react-ts
cd my-cloud-diagrams

# Install dependencies
npm install
npm install @cloud-diagrams/core @cloud-diagrams/aws @cloud-diagrams/react

# Start developing
npm run dev
```

## ⚡ Your First Diagram in React

Replace your `src/App.tsx` with this simple example:

```tsx
import React from "react";
import { DiagramRenderer, DiagramProvider } from "@cloud-diagrams/react";
import { Diagram } from "@cloud-diagrams/core";
import { EC2, RDS } from "@cloud-diagrams/aws";

function createMyArchitecture() {
  const diagram = new Diagram("My First Cloud Architecture");

  // Create cloud resources
  const webServer = new EC2("web-server", {
    label: "Web Server\n(t3.medium)",
    metadata: { instanceType: "t3.medium" },
  });

  const database = new RDS("database", {
    label: "PostgreSQL\n(db.t3.micro)",
    metadata: { engine: "postgresql" },
  });

  // Add to diagram and connect
  diagram.addNode(webServer);
  diagram.addNode(database);
  diagram.connect(webServer, database, { label: "SQL queries" });

  return diagram;
}

function App() {
  const diagram = createMyArchitecture();

  return (
    <DiagramProvider>
      <div style={{ padding: "20px" }}>
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

**🎉 That's it! Run `npm start` and see your interactive cloud diagram at http://localhost:3000**

## 🎯 Multiple Ways to Use the Library

### **Approach 1: Simple Component Usage** (Recommended for beginners)

```tsx
import { DiagramRenderer } from "@cloud-diagrams/react";
import { createSimpleArchitecture } from "./diagrams/simple";

function MyPage() {
  return (
    <div>
      <h2>Our Infrastructure</h2>
      <DiagramRenderer
        diagram={createSimpleArchitecture()}
        theme="light"
        interactive
      />
    </div>
  );
}
```

### **Approach 2: Hook-Based State Management** (For dynamic diagrams)

```tsx
import { useDiagram, useTheme } from "@cloud-diagrams/react";
import { EC2, RDS } from "@cloud-diagrams/aws";

function InteractiveDiagram() {
  const { diagram, addNode, connect } = useDiagram("My Architecture");
  const { theme, toggleTheme } = useTheme();

  const addWebServer = () => {
    const server = new EC2("web-" + Date.now(), { label: "New Web Server" });
    addNode(server);
  };

  return (
    <div>
      <button onClick={addWebServer}>Add Web Server</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <DiagramRenderer diagram={diagram} theme={theme} />
    </div>
  );
}
```

### **Approach 3: Context Provider Pattern** (For complex apps)

```tsx
import { DiagramProvider, useDiagramContext } from "@cloud-diagrams/react";

function DiagramControls() {
  const { diagram, updateDiagram, exportDiagram } = useDiagramContext();

  return (
    <div>
      <button onClick={() => exportDiagram("svg")}>Export SVG</button>
      <button onClick={() => exportDiagram("png")}>Export PNG</button>
    </div>
  );
}

function App() {
  return (
    <DiagramProvider>
      <DiagramControls />
      <DiagramRenderer />
    </DiagramProvider>
  );
}
```

### **Approach 4: Custom Hooks** (For reusable logic)

```tsx
import { useState, useEffect } from "react";
import { Diagram } from "@cloud-diagrams/core";

function useCloudArchitecture(architectureType: string) {
  const [diagram, setDiagram] = useState<Diagram | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArchitecture() {
      const { createArchitecture } = await import(
        `./architectures/${architectureType}`
      );
      setDiagram(createArchitecture());
      setLoading(false);
    }
    loadArchitecture();
  }, [architectureType]);

  return { diagram, loading };
}

// Usage
function ArchitecturePage({ type }: { type: string }) {
  const { diagram, loading } = useCloudArchitecture(type);

  if (loading) return <div>Loading architecture...</div>;

  return <DiagramRenderer diagram={diagram} />;
}
```

## 🏗️ Project Structure Recommendations

### **Option 1: Simple Structure** (Small projects)

```
src/
├── App.tsx
├── components/
│   └── DiagramViewer.tsx
├── diagrams/
│   ├── simple-web-app.ts
│   ├── microservices.ts
│   └── data-pipeline.ts
└── index.tsx
```

### **Option 2: Feature-Based** (Medium projects)

```
src/
├── features/
│   ├── architecture/
│   │   ├── components/
│   │   │   ├── ArchitectureDiagram.tsx
│   │   │   └── DiagramControls.tsx
│   │   ├── diagrams/
│   │   │   ├── aws-3tier.ts
│   │   │   └── azure-microservices.ts
│   │   └── hooks/
│   │       └── useArchitecture.ts
│   └── dashboard/
├── shared/
│   ├── components/
│   └── utils/
└── App.tsx
```

### **Option 3: Domain-Driven** (Large projects)

```
src/
├── domains/
│   ├── infrastructure/
│   │   ├── components/
│   │   ├── diagrams/
│   │   └── services/
│   ├── monitoring/
│   └── deployment/
├── shared/
│   ├── diagram-components/
│   ├── hooks/
│   └── providers/
└── App.tsx
```

## 🎨 Styling & Theming

### **Built-in Themes**

```tsx
<DiagramRenderer
  diagram={diagram}
  theme="light" // or "dark", "aws", "azure", "gcp"
  width={1000}
  height={600}
/>
```

### **Custom Styling with CSS Modules**

```tsx
// DiagramViewer.module.css
.diagramContainer {
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  padding: 20px;
  background: #f8f9fa;
}

.darkTheme {
  background: #1a1a1a;
  border-color: #333;
}

// DiagramViewer.tsx
import styles from './DiagramViewer.module.css';

function DiagramViewer({ diagram, isDark }) {
  return (
    <div className={`${styles.diagramContainer} ${isDark ? styles.darkTheme : ''}`}>
      <DiagramRenderer diagram={diagram} />
    </div>
  );
}
```

### **Styled Components Integration**

```tsx
import styled from "styled-components";

const DiagramContainer = styled.div`
  border: 2px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  padding: 20px;
  background: ${(props) => props.theme.background};

  .diagram-node {
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

function StyledDiagram({ diagram }) {
  return (
    <DiagramContainer>
      <DiagramRenderer diagram={diagram} />
    </DiagramContainer>
  );
}
```

## 📦 Available Packages

| Package                   | Description                          | Installation                        |
| ------------------------- | ------------------------------------ | ----------------------------------- |
| **@cloud-diagrams/core**  | Core library with diagram DSL        | `npm install @cloud-diagrams/core`  |
| **@cloud-diagrams/aws**   | AWS services (EC2, RDS, S3, etc.)    | `npm install @cloud-diagrams/aws`   |
| **@cloud-diagrams/azure** | Azure services (VMs, SQL, Functions) | `npm install @cloud-diagrams/azure` |
| **@cloud-diagrams/gcp**   | Google Cloud services                | `npm install @cloud-diagrams/gcp`   |
| **@cloud-diagrams/react** | React components and hooks           | `npm install @cloud-diagrams/react` |

## 🔧 Development Tools

### **TypeScript Support**

Full TypeScript support with IntelliSense:

```tsx
import { Diagram } from "@cloud-diagrams/core";
import { EC2, RDS } from "@cloud-diagrams/aws";

// Full type safety and autocompletion
const diagram = new Diagram("My Architecture");
const server = new EC2("web-server", {
  label: "Web Server",
  instanceType: "t3.medium", // TypeScript will validate this
  metadata: {
    availabilityZone: "us-east-1a",
    securityGroups: ["sg-12345"],
  },
});
```

### **Hot Reload Development**

Changes to your diagrams update instantly:

```tsx
// Edit this file and see changes immediately
function createDevelopmentArchitecture() {
  const diagram = new Diagram("Development Environment");

  // Add/remove/modify services here
  const devServer = new EC2("dev-server", { label: "Development Server" });
  const testDb = new RDS("test-db", { label: "Test Database" });

  diagram.addNode(devServer);
  diagram.addNode(testDb);
  diagram.connect(devServer, testDb);

  return diagram;
}
```

### **Export Functionality**

```tsx
import { useExport } from "@cloud-diagrams/react";

function ExportControls() {
  const { exportDiagram } = useExport();

  const handleExport = async (format: "svg" | "png" | "pdf") => {
    try {
      const result = await exportDiagram(format);
      // Download or use the exported diagram
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <div>
      <button onClick={() => handleExport("svg")}>Export SVG</button>
      <button onClick={() => handleExport("png")}>Export PNG</button>
      <button onClick={() => handleExport("pdf")}>Export PDF</button>
    </div>
  );
}
```

## 🎯 Common Use Cases

### **Documentation Sites** (Docusaurus, GitBook)

```tsx
// Perfect for technical documentation
function ArchitectureDoc({ diagramId }) {
  const diagram = useMemo(() => loadDiagram(diagramId), [diagramId]);

  return (
    <div>
      <h2>System Architecture</h2>
      <DiagramRenderer
        diagram={diagram}
        theme="light"
        width="100%"
        height={400}
      />
    </div>
  );
}
```

### **Admin Dashboards**

```tsx
// Real-time infrastructure monitoring
function InfrastructureDashboard() {
  const { diagram, updateNodeStatus } = useInfrastructureMonitoring();

  useEffect(() => {
    // Update diagram based on real infrastructure status
    const interval = setInterval(fetchInfrastructureStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DiagramRenderer
      diagram={diagram}
      interactive
      onNodeClick={handleNodeClick}
    />
  );
}
```

### **Presentation Apps**

```tsx
// Interactive presentations
function ArchitecturePresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const diagrams = [webTierDiagram, appTierDiagram, dataTierDiagram];

  return (
    <div>
      <DiagramRenderer
        diagram={diagrams[currentSlide]}
        theme="presentation"
        width={1200}
        height={800}
      />
      <button onClick={() => setCurrentSlide((prev) => prev + 1)}>
        Next Slide
      </button>
    </div>
  );
}
```

## 📚 Learn More

| Resource                                                                   | Description                 |
| -------------------------------------------------------------------------- | --------------------------- |
| **[📖 Complete Tutorial](./cloud-diagrams-ts/TUTORIAL.md)**                | Step-by-step React examples |
| **[🎪 Live Demo](./cloud-diagrams-ts/examples/browser-demo/)**             | Interactive examples        |
| **[🛠️ Development Setup](./cloud-diagrams-ts/DEVELOPMENT_SETUP_GUIDE.md)** | Local development guide     |
| **[💻 CLI Tools](./cloud-diagrams-ts/CLI_USAGE_GUIDE.md)**                 | Command-line interface      |

## 🤝 Community & Support

- **💬 GitHub Discussions** - Ask questions and share examples
- **🐛 Issues** - Report bugs and request features
- **📖 Documentation** - Comprehensive guides and API reference
- **🎯 Examples** - Real-world usage patterns

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**🚀 Ready to build amazing cloud diagrams in React?**

```bash
npx create-react-app my-cloud-app --template typescript
cd my-cloud-app
npm install @cloud-diagrams/core @cloud-diagrams/aws @cloud-diagrams/react
npm start
```

**Start coding and see your cloud architecture come to life! 🎨✨**
