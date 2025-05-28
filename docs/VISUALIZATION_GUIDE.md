# 🎨 Cloud Architecture Visualization Guide

**Complete guide to visualizing your cloud architectures with @kloud-diagramming/core**

This guide covers all the ways you can visualize, render, and share your cloud architecture diagrams created with the `@kloud-diagramming/core` library.

## 🚀 Quick Visualization at localhost:3000

### 1. Web Viewer (Instant Visualization)

**The fastest way to see your architectures in action:**

```bash
# Navigate to the examples directory
cd examples

# Start a simple HTTP server
npx http-server . -p 3000

# Open browser at http://localhost:3000
# Try working-example.html for a comprehensive demo
```

**What you get:**

- 🎨 Interactive diagrams with professional D3.js rendering
- 🔄 Real-time rendering with SVG output
- 📱 Responsive design for all devices
- 📥 SVG export functionality
- 🎯 Multiple architecture examples
- 🌙 Multiple layout algorithms (hierarchical, force-directed, manual)

### 2. React Development Server

**For React applications with hot reload:**

```bash
# Create a new React app (if needed)
npx create-react-app my-architecture-app --template typescript
cd my-architecture-app

# Install dependencies
npm install @kloud-diagramming/core d3

# Replace src/App.tsx with your diagram code
# (See React examples below)

# Start development server
npm start

# Opens automatically at http://localhost:3000
```

## 📋 Visualization Methods

### Method 1: Direct D3.js Rendering

**Best for:** Interactive web applications, dashboards, presentations

```typescript
import { Diagram, CloudDiagramsD3Renderer, EC2, RDS, VPC } from '@kloud-diagramming/core';

const diagram = new Diagram('My Architecture');
const vpc = new VPC('main-vpc', 'Main VPC');
const web = new EC2('web', 'Web Server');
const db = new RDS('db', 'Database');

diagram.addNode(vpc);
diagram.addNode(web);
diagram.addNode(db);
diagram.rightShift([web], [db]);

// Render with D3.js
const renderer = new CloudDiagramsD3Renderer('diagram-container', {
    width: 1000,
    height: 600,
    layoutAlgorithm: 'hierarchical',
    enableZoom: true,
    enablePan: true
});

renderer.renderDiagram(diagram);
```

### Method 2: Browser UMD Bundle

**Best for:** Quick prototyping, sharing code, documentation

```html
<!DOCTYPE html>
<html>
<head>
    <title>Cloud Architecture</title>
</head>
<body>
    <div id="diagram"></div>
    
    <!-- Load D3.js -->
    <script src="https://d3js.org/d3.v7.min.js"></script>
    
    <!-- Load @kloud-diagramming/core UMD bundle -->
    <script src="https://unpkg.com/@kloud-diagramming/core/dist/index.umd.js"></script>
    
    <script>
        const { Diagram, CloudDiagramsD3Renderer, EC2, S3, RDS } = KloudDiagramming;
        
        // Create diagram
        const diagram = new Diagram('Simple Architecture');
        
        const web = new EC2('web', 'Web Server');
        const db = new RDS('db', 'Database');
        const storage = new S3('storage', 'Storage');
        
        diagram.addNode(web);
        diagram.addNode(db);
        diagram.addNode(storage);
        
        diagram.rightShift([web], [db, storage]);
        
        // Render
        const renderer = new CloudDiagramsD3Renderer('diagram', {
            width: 800,
            height: 400,
            layoutAlgorithm: 'hierarchical'
        });
        
        renderer.renderDiagram(diagram);
    </script>
</body>
</html>
```

### Method 3: React Components

**Best for:** Web applications, interactive dashboards, user interfaces

```tsx
import React, { useEffect, useRef } from 'react';
import { Diagram, CloudDiagramsD3Renderer, EC2, RDS } from '@kloud-diagramming/core';

function createMyArchitecture() {
  const diagram = new Diagram('My AWS Architecture');
  const web = new EC2('web', 'Web Server');
  const db = new RDS('db', 'PostgreSQL');

  diagram.addNode(web);
  diagram.addNode(db);
  diagram.rightShift([web], [db]);

  return diagram;
}

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<CloudDiagramsD3Renderer | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const diagram = createMyArchitecture();
      
      rendererRef.current = new CloudDiagramsD3Renderer(containerRef.current, {
        width: 1000,
        height: 600,
        layoutAlgorithm: 'hierarchical',
        enableZoom: true,
        enablePan: true
      });
      
      rendererRef.current.renderDiagram(diagram);
      
      // Event handling
      rendererRef.current.on('nodeClick', (event) => {
        console.log(`Clicked: ${event.node.getId()}`);
      });
    }
    
    return () => {
      if (rendererRef.current) {
        rendererRef.current.clear();
      }
    };
  }, []);

  const exportSVG = () => {
    if (rendererRef.current) {
      const svgString = rendererRef.current.exportSVG();
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'architecture.svg';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Cloud Architecture</h1>
      <button onClick={exportSVG} style={{ marginBottom: '20px' }}>
        Export SVG
      </button>
      <div 
        ref={containerRef} 
        style={{ 
          width: '100%', 
          height: '600px',
          border: '1px solid #ddd',
          borderRadius: '8px'
        }} 
      />
    </div>
  );
}

export default App;
```

### Method 4: Programmatic Export

**Best for:** Custom applications, automated reporting, integration

```typescript
import { Diagram, CloudDiagramsD3Renderer, EC2, RDS } from '@kloud-diagramming/core';

async function generateAndExport() {
  const diagram = new Diagram('Generated Architecture');

  // Build your diagram
  const web = new EC2('web', 'Web Server');
  const db = new RDS('db', 'Database');
  diagram.addNode(web);
  diagram.addNode(db);
  diagram.rightShift([web], [db]);

  try {
    // Create a temporary container for rendering
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    document.body.appendChild(tempContainer);

    const renderer = new CloudDiagramsD3Renderer(tempContainer, {
      width: 800,
      height: 600,
      layoutAlgorithm: 'hierarchical'
    });

    await renderer.renderDiagram(diagram);

    // Export to different formats
    const svgContent = renderer.exportSVG();
    const pngBlob = await renderer.exportPNG({
      width: 1920,
      height: 1080,
      quality: 0.9,
      backgroundColor: 'white'
    });

    // Clean up
    document.body.removeChild(tempContainer);

    console.log('✅ Diagrams exported successfully');
    return { svgContent, pngBlob };
  } catch (error) {
    console.error('❌ Export failed:', error);
    throw error;
  }
}
```

## 🌐 Online Visualization Platforms

### 1. GitHub Pages / Netlify / Vercel

**Perfect for sharing interactive diagrams:**

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Cloud Architecture</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .diagram { border: 1px solid #ddd; border-radius: 8px; margin: 20px 0; }
        .controls { margin: 20px 0; }
        .btn { padding: 10px 20px; margin: 5px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏗️ Cloud Architecture Portfolio</h1>
        
        <div class="controls">
            <button class="btn" onclick="renderAWS()">AWS Architecture</button>
            <button class="btn" onclick="renderAzure()">Azure Architecture</button>
            <button class="btn" onclick="renderMultiCloud()">Multi-Cloud</button>
            <button class="btn" onclick="exportDiagram()">Export SVG</button>
        </div>
        
        <div id="diagram" class="diagram"></div>
    </div>

    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="https://unpkg.com/@kloud-diagramming/core/dist/index.umd.js"></script>
    <script>
        let currentRenderer = null;
        
        function renderAWS() {
            const { Diagram, CloudDiagramsD3Renderer, EC2, RDS, S3, ELB } = KloudDiagramming;
            
            const diagram = new Diagram('AWS Three-Tier Architecture');
            
            const lb = new ELB('lb', 'Load Balancer');
            const web = new EC2('web', 'Web Servers');
            const db = new RDS('db', 'Database');
            const storage = new S3('storage', 'File Storage');
            
            diagram.addNode(lb);
            diagram.addNode(web);
            diagram.addNode(db);
            diagram.addNode(storage);
            
            diagram.rightShift([lb], [web]);
            diagram.rightShift([web], [db, storage]);
            
            renderDiagram(diagram);
        }
        
        function renderDiagram(diagram) {
            const container = document.getElementById('diagram');
            container.innerHTML = '';
            
            currentRenderer = new KloudDiagramming.CloudDiagramsD3Renderer(container, {
                width: 1000,
                height: 500,
                layoutAlgorithm: 'hierarchical',
                enableZoom: true,
                enablePan: true
            });
            
            currentRenderer.renderDiagram(diagram);
        }
        
        function exportDiagram() {
            if (currentRenderer) {
                const svg = currentRenderer.exportSVG();
                const blob = new Blob([svg], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'architecture.svg';
                a.click();
                URL.revokeObjectURL(url);
            }
        }
        
        // Auto-render on load
        document.addEventListener('DOMContentLoaded', renderAWS);
    </script>
</body>
</html>
```

### 2. CodePen / JSFiddle

**For quick sharing and testing:**

```javascript
// CodePen example
const { Diagram, CloudDiagramsD3Renderer, EC2, S3, RDS } = KloudDiagramming;

const diagram = new Diagram('CodePen Architecture');

const web = new EC2('web', 'Web Server');
const db = new RDS('db', 'Database');
const storage = new S3('storage', 'Storage');

diagram.addNode(web);
diagram.addNode(db);
diagram.addNode(storage);

diagram.rightShift([web], [db, storage]);

const renderer = new CloudDiagramsD3Renderer('diagram', {
    width: 600,
    height: 400,
    layoutAlgorithm: 'hierarchical'
});

renderer.renderDiagram(diagram);
```

### 3. Observable Notebooks

**For data-driven architecture documentation:**

```javascript
// Observable cell
import { Diagram, CloudDiagramsD3Renderer, EC2, RDS, S3 } from '@kloud-diagramming/core';

function createArchitecture(data) {
  const diagram = new Diagram('Data-Driven Architecture');
  
  data.services.forEach(service => {
    const ServiceClass = service.type === 'compute' ? EC2 : 
                        service.type === 'database' ? RDS : S3;
    const node = new ServiceClass(service.id, service.name);
    diagram.addNode(node);
  });
  
  data.connections.forEach(conn => {
    const from = diagram.getNode(conn.from);
    const to = diagram.getNode(conn.to);
    if (from && to) {
      diagram.rightShift([from], [to]);
    }
  });
  
  return diagram;
}

// Render in Observable
{
  const container = DOM.element('div');
  const diagram = createArchitecture(architectureData);
  
  const renderer = new CloudDiagramsD3Renderer(container, {
    width: 800,
    height: 500,
    layoutAlgorithm: 'force'
  });
  
  renderer.renderDiagram(diagram);
  return container;
}
```

## 🎨 Customization Options

### Layout Algorithms

```typescript
// Hierarchical layout (best for layered architectures)
const renderer = new CloudDiagramsD3Renderer('container', {
    layoutAlgorithm: 'hierarchical',
    nodeSpacing: 150,
    levelSpacing: 100,
    direction: 'TB' // Top to Bottom
});

// Force-directed layout (best for network topologies)
const renderer = new CloudDiagramsD3Renderer('container', {
    layoutAlgorithm: 'force',
    forceStrength: -300,
    linkDistance: 100,
    centerForce: 0.1
});

// Manual positioning (full control)
const renderer = new CloudDiagramsD3Renderer('container', {
    layoutAlgorithm: 'manual'
});

// Set positions manually
web.setPosition(100, 100);
db.setPosition(300, 200);
```

### Theme Configuration

```typescript
// Built-in themes
const renderer = new CloudDiagramsD3Renderer('container', {
    theme: 'default',  // Professional light
    // theme: 'dark',   // Dark mode
    // theme: 'aws',    // AWS orange theme
    // theme: 'azure',  // Azure blue theme
    // theme: 'gcp',    // GCP colors
});

// Custom theme
const renderer = new CloudDiagramsD3Renderer('container', {
    theme: 'custom',
    customTheme: {
        background: '#f8f9fa',
        nodeDefaults: {
            fillColor: '#ffffff',
            strokeColor: '#007bff',
            strokeWidth: 2,
            fontFamily: 'Arial, sans-serif',
        },
        edgeDefaults: {
            strokeColor: '#6c757d',
            strokeWidth: 1,
        }
    }
});
```

### Interactive Features

```typescript
// Enable interactions
const renderer = new CloudDiagramsD3Renderer('container', {
    enableZoom: true,
    enablePan: true,
    enableTooltips: true,
    enableNodeDrag: true
});

// Event handlers
renderer.on('nodeClick', (event) => {
    console.log(`Clicked: ${event.node.getLabel()}`);
    // Open AWS console, show details, etc.
    if (event.node.getProvider() === 'aws') {
        window.open(`https://console.aws.amazon.com/${event.node.getService()}`);
    }
});

renderer.on('nodeHover', (event) => {
    // Show tooltip, highlight connections
    showTooltip(event.node.getMetadata());
});

renderer.on('edgeClick', (event) => {
    console.log(`Connection: ${event.edge.getFrom().getId()} -> ${event.edge.getTo().getId()}`);
});
```

## 💼 Enterprise Integration

### 1. Corporate Documentation

```typescript
// Generate diagrams for architecture documentation
async function generateDocumentation() {
  const architectures = [
    { name: 'Production', data: productionConfig },
    { name: 'Staging', data: stagingConfig },
    { name: 'Development', data: developmentConfig }
  ];

  for (const arch of architectures) {
    const diagram = createDiagramFromConfig(arch.data);
    
    const tempContainer = document.createElement('div');
    document.body.appendChild(tempContainer);
    
    const renderer = new CloudDiagramsD3Renderer(tempContainer, {
      width: 1200,
      height: 800,
      layoutAlgorithm: 'hierarchical',
      theme: 'corporate'
    });
    
    await renderer.renderDiagram(diagram);
    const svg = renderer.exportSVG();
    
    // Save to documentation system
    await saveToWiki(arch.name, svg);
    
    document.body.removeChild(tempContainer);
  }
}
```

### 2. CI/CD Pipeline Integration

```yaml
# GitHub Actions example
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
        run: |
          npm install @kloud-diagramming/core d3
          npm install -g puppeteer

      - name: Generate diagrams
        run: |
          node scripts/generate-diagrams.js

      - name: Commit diagrams
        run: |
          git add docs/diagrams/
          git commit -m "Update architecture diagrams"
          git push
```

```javascript
// scripts/generate-diagrams.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateDiagrams() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Load your diagram generation HTML
  await page.goto(`file://${path.join(__dirname, 'diagram-generator.html')}`);
  
  // Generate different architectures
  const architectures = ['production', 'staging', 'development'];
  
  for (const arch of architectures) {
    await page.evaluate((archType) => {
      window.generateArchitecture(archType);
    }, arch);
    
    // Wait for rendering
    await page.waitForTimeout(2000);
    
    // Get SVG content
    const svg = await page.evaluate(() => {
      return document.querySelector('#diagram svg').outerHTML;
    });
    
    // Save to file
    fs.writeFileSync(`docs/diagrams/${arch}.svg`, svg);
  }
  
  await browser.close();
}

generateDiagrams().catch(console.error);
```

### 3. Custom Web Applications

```typescript
// Integration with existing web apps
class ArchitectureViewer {
  private container: HTMLElement;
  private renderer: CloudDiagramsD3Renderer;
  private diagram: Diagram;

  constructor(containerId: string, architectureData: any) {
    this.container = document.getElementById(containerId)!;
    this.diagram = this.buildDiagramFromData(architectureData);
    this.initializeRenderer();
  }

  private initializeRenderer() {
    this.renderer = new CloudDiagramsD3Renderer(this.container, {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
      layoutAlgorithm: 'hierarchical',
      enableZoom: true,
      enablePan: true
    });

    this.addEventListeners();
  }

  private addEventListeners() {
    this.renderer.on('nodeClick', this.handleNodeClick.bind(this));
    this.renderer.on('nodeHover', this.handleNodeHover.bind(this));
    
    // Resize handling
    window.addEventListener('resize', () => {
      this.renderer.fitToContainer();
    });
  }

  private handleNodeClick(event: any) {
    // Custom business logic
    this.showNodeDetails(event.node);
  }

  public async updateArchitecture(newData: any) {
    this.diagram = this.buildDiagramFromData(newData);
    await this.renderer.updateDiagram(this.diagram);
  }

  public exportDiagram(format: 'svg' | 'png' = 'svg') {
    if (format === 'svg') {
      return this.renderer.exportSVG();
    } else {
      return this.renderer.exportPNG();
    }
  }

  private buildDiagramFromData(data: any): Diagram {
    // Convert your data format to diagram
    const diagram = new Diagram(data.name);
    
    data.services.forEach((service: any) => {
      const node = this.createNodeFromService(service);
      diagram.addNode(node);
    });
    
    data.connections.forEach((conn: any) => {
      const from = diagram.getNode(conn.from);
      const to = diagram.getNode(conn.to);
      if (from && to) {
        diagram.connect(from, to, conn.options);
      }
    });
    
    return diagram;
  }
}

// Usage
const viewer = new ArchitectureViewer('diagram-container', architectureData);
```

## 📱 Mobile and Responsive Viewing

### Responsive Design Tips

```css
/* Make diagrams responsive */
.diagram-container {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  position: relative;
}

.diagram-container svg {
  max-width: 100%;
  height: auto;
}

/* Mobile-specific adjustments */
@media (max-width: 768px) {
  .diagram-container {
    padding: 10px;
    height: 400px; /* Fixed height for mobile */
  }
  
  /* Adjust node sizes for mobile */
  .node text {
    font-size: 12px;
  }
  
  .node rect {
    rx: 4;
    ry: 4;
  }
}

@media (max-width: 480px) {
  .diagram-container {
    height: 300px;
  }
  
  .node text {
    font-size: 10px;
  }
}
```

### Touch-Friendly Controls

```typescript
// Mobile-optimized renderer
const renderer = new CloudDiagramsD3Renderer('container', {
  width: window.innerWidth - 20,
  height: window.innerHeight * 0.6,
  layoutAlgorithm: 'hierarchical',
  enableZoom: true,
  enablePan: true,
  
  // Mobile-specific options
  nodeSpacing: 100, // Closer spacing for mobile
  enableTooltips: false, // Disable hover tooltips on mobile
  
  // Touch gesture support
  touchGestures: {
    pan: true,
    zoom: true,
    tap: true
  }
});

// Mobile-specific event handling
if ('ontouchstart' in window) {
  renderer.on('nodeTap', (event) => {
    // Show mobile-friendly modal instead of tooltip
    showMobileModal(event.node);
  });
} else {
  renderer.on('nodeClick', (event) => {
    showDesktopTooltip(event.node);
  });
}

// Responsive resize handling
function handleResize() {
  const container = document.getElementById('diagram-container');
  if (container) {
    renderer.updateSize(
      container.clientWidth,
      container.clientHeight
    );
    renderer.fitToContainer();
  }
}

window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', handleResize);
```

## 🎯 Best Practices for Visualization

### 1. **Optimize for Your Audience**

```typescript
// For technical teams
const techRenderer = new CloudDiagramsD3Renderer('container', {
  theme: 'dark',
  showMetadata: true,
  enableAdvancedFeatures: true,
  layoutAlgorithm: 'force' // Shows relationships clearly
});

// For business stakeholders
const businessRenderer = new CloudDiagramsD3Renderer('container', {
  theme: 'default',
  layoutAlgorithm: 'hierarchical', // Clear hierarchy
  nodeSpacing: 200, // More space for readability
  hideImplementationDetails: true
});

// For documentation
const docRenderer = new CloudDiagramsD3Renderer('container', {
  theme: 'corporate',
  enableZoom: false, // Static for docs
  enablePan: false,
  width: 1200,
  height: 800
});
```

### 2. **Performance Optimization**

```typescript
// For large diagrams (100+ nodes)
const largeRenderer = new CloudDiagramsD3Renderer('container', {
  layoutAlgorithm: 'manual', // Faster than force layout
  enableAnimations: false, // Disable for performance
  renderBatchSize: 50, // Render in batches
  
  // Virtualization for very large diagrams
  enableVirtualization: true,
  viewportBuffer: 100
});

// Memory management
renderer.on('diagramReady', () => {
  // Clean up previous diagrams
  if (previousRenderer) {
    previousRenderer.clear();
  }
});
```

### 3. **Accessibility**

```typescript
// Screen reader support
const accessibleRenderer = new CloudDiagramsD3Renderer('container', {
  enableAccessibility: true,
  ariaLabels: true,
  keyboardNavigation: true,
  
  // High contrast mode
  theme: 'high-contrast',
  
  // Focus indicators
  focusIndicators: true
});

// Keyboard navigation
renderer.on('keydown', (event) => {
  switch (event.key) {
    case 'Tab':
      // Navigate between nodes
      break;
    case 'Enter':
      // Activate selected node
      break;
    case 'Escape':
      // Clear selection
      break;
  }
});
```

## 🚀 Getting Started Checklist

**For immediate visualization:**

- [ ] Install `@kloud-diagramming/core` and `d3`
- [ ] Try the UMD bundle example in your browser
- [ ] Explore the examples in the `/examples` directory
- [ ] Test different layout algorithms

**For custom diagrams:**

- [ ] Create your first diagram with TypeScript/JavaScript
- [ ] Choose appropriate layout algorithm
- [ ] Add interactivity and event handlers
- [ ] Implement export functionality

**For production use:**

- [ ] Set up React/Vue/Angular components
- [ ] Configure responsive design
- [ ] Integrate with your documentation system
- [ ] Set up CI/CD for automated diagram generation
- [ ] Train team on the visualization tools

## 📞 Need Help?

- **Quick Demo**: Try the examples in `/examples` directory
- **Documentation**: Check the main [README.md](../README.md)
- **GitHub Issues**: Report problems or request features
- **Discussions**: Ask questions and share your architectures

---

**Start visualizing your cloud architectures today! 🎨** 