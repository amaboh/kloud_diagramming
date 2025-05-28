# Framework Integration Guide

This guide shows how to integrate `@cloud-diagrams/core` with popular JavaScript frameworks and build tools.

## 🚀 Quick Start

### Installation

```bash
npm install @cloud-diagrams/core d3
# or
yarn add @cloud-diagrams/core d3
# or
pnpm add @cloud-diagrams/core d3
```

## ⚛️ React Integration

### Basic React Component

```jsx
import React, { useEffect, useRef } from 'react';
import { Diagram, EC2, S3, Lambda, CloudDiagramsD3Renderer } from '@cloud-diagrams/core';

function CloudDiagram({ title = "My Architecture" }) {
  const containerRef = useRef(null);
  const diagramRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create diagram
    const diagram = new Diagram(title);
    
    // Create services
    const web = new EC2('web', 'Web Server');
    const api = new Lambda('api', 'API Function');
    const storage = new S3('storage', 'Storage');
    
    // Add nodes
    [web, api, storage].forEach(node => diagram.addNode(node));
    
    // Create connections
    diagram.rightShift([web], [api]);
    diagram.rightShift([api], [storage]);
    
    // Render
    const renderer = new CloudDiagramsD3Renderer(containerRef.current);
    renderer.renderDiagram(diagram);
    
    diagramRef.current = { diagram, renderer };

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [title]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '500px',
        border: '1px solid #ccc',
        borderRadius: '8px'
      }} 
    />
  );
}

export default CloudDiagram;
```

### React Hook for Diagrams

```jsx
import { useEffect, useRef, useState } from 'react';
import { Diagram, CloudDiagramsD3Renderer } from '@cloud-diagrams/core';

export function useCloudDiagram(containerRef, options = {}) {
  const [diagram, setDiagram] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const newDiagram = new Diagram(options.title || 'Architecture Diagram');
    const newRenderer = new CloudDiagramsD3Renderer(containerRef.current, options);
    
    setDiagram(newDiagram);
    setRenderer(newRenderer);
    setIsReady(true);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      setIsReady(false);
    };
  }, [options.title]);

  const renderDiagram = async () => {
    if (diagram && renderer) {
      await renderer.renderDiagram(diagram);
    }
  };

  const exportSVG = () => {
    if (renderer) {
      return renderer.exportSVG();
    }
  };

  return {
    diagram,
    renderer,
    isReady,
    renderDiagram,
    exportSVG
  };
}

// Usage
function MyComponent() {
  const containerRef = useRef(null);
  const { diagram, isReady, renderDiagram, exportSVG } = useCloudDiagram(containerRef, {
    title: 'My Architecture',
    layoutAlgorithm: 'force'
  });

  useEffect(() => {
    if (isReady && diagram) {
      // Add your services
      const web = new EC2('web', 'Web Server');
      diagram.addNode(web);
      
      renderDiagram();
    }
  }, [isReady, diagram, renderDiagram]);

  return (
    <div>
      <button onClick={exportSVG}>Export SVG</button>
      <div ref={containerRef} style={{ width: '100%', height: '500px' }} />
    </div>
  );
}
```

## 🖖 Vue.js Integration

### Vue 3 Composition API

```vue
<template>
  <div>
    <div class="controls">
      <button @click="generateDiagram">Generate Diagram</button>
      <button @click="exportDiagram">Export SVG</button>
    </div>
    <div ref="diagramContainer" class="diagram-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Diagram, EC2, S3, Lambda, CloudDiagramsD3Renderer } from '@cloud-diagrams/core';

const diagramContainer = ref(null);
let diagram = null;
let renderer = null;

const generateDiagram = async () => {
  if (!diagramContainer.value) return;

  // Clear previous diagram
  diagramContainer.value.innerHTML = '';

  // Create new diagram
  diagram = new Diagram('Vue.js Architecture');
  
  // Create services
  const web = new EC2('web', 'Web Server');
  const api = new Lambda('api', 'API Function');
  const storage = new S3('storage', 'Storage');
  
  // Add nodes
  [web, api, storage].forEach(node => diagram.addNode(node));
  
  // Create connections
  diagram.rightShift([web], [api]);
  diagram.rightShift([api], [storage]);
  
  // Render
  renderer = new CloudDiagramsD3Renderer(diagramContainer.value);
  await renderer.renderDiagram(diagram);
};

const exportDiagram = () => {
  if (renderer) {
    renderer.exportSVG();
  }
};

onMounted(() => {
  generateDiagram();
});

onUnmounted(() => {
  if (diagramContainer.value) {
    diagramContainer.value.innerHTML = '';
  }
});
</script>

<style scoped>
.diagram-container {
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.controls {
  margin-bottom: 20px;
}

button {
  margin-right: 10px;
  padding: 8px 16px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

### Vue 2 Options API

```vue
<template>
  <div>
    <button @click="generateDiagram">Generate Diagram</button>
    <div ref="diagramContainer" class="diagram-container"></div>
  </div>
</template>

<script>
import { Diagram, EC2, S3, CloudDiagramsD3Renderer } from '@cloud-diagrams/core';

export default {
  name: 'CloudDiagram',
  data() {
    return {
      diagram: null,
      renderer: null
    };
  },
  mounted() {
    this.generateDiagram();
  },
  beforeDestroy() {
    if (this.$refs.diagramContainer) {
      this.$refs.diagramContainer.innerHTML = '';
    }
  },
  methods: {
    async generateDiagram() {
      if (!this.$refs.diagramContainer) return;

      this.diagram = new Diagram('Vue 2 Architecture');
      
      const web = new EC2('web', 'Web Server');
      const storage = new S3('storage', 'Storage');
      
      [web, storage].forEach(node => this.diagram.addNode(node));
      this.diagram.rightShift([web], [storage]);
      
      this.renderer = new CloudDiagramsD3Renderer(this.$refs.diagramContainer);
      await this.renderer.renderDiagram(this.diagram);
    }
  }
};
</script>
```

## 🅰️ Angular Integration

### Angular Component

```typescript
// cloud-diagram.component.ts
import { Component, ElementRef, ViewChild, OnInit, OnDestroy, Input } from '@angular/core';
import { Diagram, EC2, S3, Lambda, CloudDiagramsD3Renderer } from '@cloud-diagrams/core';

@Component({
  selector: 'app-cloud-diagram',
  template: `
    <div class="diagram-controls">
      <button (click)="generateDiagram()">Generate Diagram</button>
      <button (click)="exportDiagram()">Export SVG</button>
    </div>
    <div #diagramContainer class="diagram-container"></div>
  `,
  styles: [`
    .diagram-container {
      width: 100%;
      height: 500px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
    .diagram-controls {
      margin-bottom: 20px;
    }
    button {
      margin-right: 10px;
      padding: 8px 16px;
      background: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class CloudDiagramComponent implements OnInit, OnDestroy {
  @ViewChild('diagramContainer', { static: true }) diagramContainer!: ElementRef;
  @Input() title: string = 'Angular Architecture';

  private diagram: Diagram | null = null;
  private renderer: CloudDiagramsD3Renderer | null = null;

  ngOnInit() {
    this.generateDiagram();
  }

  ngOnDestroy() {
    if (this.diagramContainer?.nativeElement) {
      this.diagramContainer.nativeElement.innerHTML = '';
    }
  }

  async generateDiagram() {
    if (!this.diagramContainer?.nativeElement) return;

    // Clear previous diagram
    this.diagramContainer.nativeElement.innerHTML = '';

    // Create diagram
    this.diagram = new Diagram(this.title);
    
    // Create services
    const web = new EC2('web', 'Web Server');
    const api = new Lambda('api', 'API Function');
    const storage = new S3('storage', 'Storage');
    
    // Add nodes
    [web, api, storage].forEach(node => this.diagram!.addNode(node));
    
    // Create connections
    this.diagram.rightShift([web], [api]);
    this.diagram.rightShift([api], [storage]);
    
    // Render
    this.renderer = new CloudDiagramsD3Renderer(this.diagramContainer.nativeElement);
    await this.renderer.renderDiagram(this.diagram);
  }

  exportDiagram() {
    if (this.renderer) {
      this.renderer.exportSVG();
    }
  }
}
```

### Angular Service

```typescript
// cloud-diagram.service.ts
import { Injectable } from '@angular/core';
import { Diagram, CloudDiagramsD3Renderer } from '@cloud-diagrams/core';

@Injectable({
  providedIn: 'root'
})
export class CloudDiagramService {
  createDiagram(title: string): Diagram {
    return new Diagram(title);
  }

  createRenderer(container: HTMLElement, options?: any): CloudDiagramsD3Renderer {
    return new CloudDiagramsD3Renderer(container, options);
  }

  async renderDiagram(diagram: Diagram, renderer: CloudDiagramsD3Renderer): Promise<void> {
    await renderer.renderDiagram(diagram);
  }
}
```

## ⚡ Next.js Integration

### Next.js Component (App Router)

```jsx
// app/components/CloudDiagram.jsx
'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import to avoid SSR issues
const CloudDiagramInner = dynamic(() => Promise.resolve(CloudDiagramComponent), {
  ssr: false
});

function CloudDiagramComponent() {
  const containerRef = useRef(null);

  useEffect(() => {
    async function loadAndRender() {
      // Dynamic import to ensure client-side only
      const { Diagram, EC2, S3, CloudDiagramsD3Renderer } = await import('@cloud-diagrams/core');
      
      if (!containerRef.current) return;

      const diagram = new Diagram('Next.js Architecture');
      
      const web = new EC2('web', 'Web Server');
      const storage = new S3('storage', 'Storage');
      
      [web, storage].forEach(node => diagram.addNode(node));
      diagram.rightShift([web], [storage]);
      
      const renderer = new CloudDiagramsD3Renderer(containerRef.current);
      await renderer.renderDiagram(diagram);
    }

    loadAndRender();
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '500px',
        border: '1px solid #ccc',
        borderRadius: '8px'
      }} 
    />
  );
}

export default function CloudDiagram() {
  return <CloudDiagramInner />;
}
```

### Next.js Page

```jsx
// app/diagram/page.jsx
import CloudDiagram from '../components/CloudDiagram';

export default function DiagramPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Cloud Architecture Diagram</h1>
      <CloudDiagram />
    </div>
  );
}
```

## ⚡ Vite Integration

### Vite + Vanilla JavaScript

```javascript
// main.js
import { Diagram, EC2, S3, Lambda, CloudDiagramsD3Renderer } from '@cloud-diagrams/core';
import './style.css';

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Vite Cloud Diagrams</h1>
    <div class="controls">
      <button id="generate">Generate Diagram</button>
      <button id="export">Export SVG</button>
    </div>
    <div id="diagram-container"></div>
  </div>
`;

let diagram = null;
let renderer = null;

async function generateDiagram() {
  const container = document.querySelector('#diagram-container');
  if (!container) return;

  // Clear previous
  container.innerHTML = '';

  // Create diagram
  diagram = new Diagram('Vite Architecture');
  
  const web = new EC2('web', 'Web Server');
  const api = new Lambda('api', 'API Function');
  const storage = new S3('storage', 'Storage');
  
  [web, api, storage].forEach(node => diagram.addNode(node));
  
  diagram.rightShift([web], [api]);
  diagram.rightShift([api], [storage]);
  
  renderer = new CloudDiagramsD3Renderer(container);
  await renderer.renderDiagram(diagram);
}

function exportDiagram() {
  if (renderer) {
    renderer.exportSVG();
  }
}

// Event listeners
document.querySelector('#generate').addEventListener('click', generateDiagram);
document.querySelector('#export').addEventListener('click', exportDiagram);

// Generate initial diagram
generateDiagram();
```

### Vite Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['@cloud-diagrams/core', 'd3']
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  }
});
```

## 🌐 Browser UMD Integration

### Direct Script Tag

```html
<!DOCTYPE html>
<html>
<head>
    <title>Cloud Diagrams UMD</title>
</head>
<body>
    <div id="diagram-container" style="width: 100%; height: 500px;"></div>
    
    <!-- Load UMD bundle -->
    <script src="https://unpkg.com/@cloud-diagrams/core/dist/index.umd.js"></script>
    
    <script>
        // Use global KloudDiagramming object
        const diagram = new KloudDiagramming.Diagram('UMD Architecture');
        
        const web = new KloudDiagramming.EC2('web', 'Web Server');
        const storage = new KloudDiagramming.S3('storage', 'Storage');
        
        [web, storage].forEach(node => diagram.addNode(node));
        diagram.rightShift([web], [storage]);
        
        const renderer = new KloudDiagramming.CloudDiagramsD3Renderer('diagram-container');
        renderer.renderDiagram(diagram);
    </script>
</body>
</html>
```

## 🎨 Styling and Theming

### Custom CSS

```css
/* Custom diagram styling */
.cloud-diagram-container {
  width: 100%;
  height: 500px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cloud-diagram-container svg {
  width: 100%;
  height: 100%;
}

/* Node styling */
.cloud-diagram-container .node {
  cursor: pointer;
  transition: all 0.3s ease;
}

.cloud-diagram-container .node:hover {
  transform: scale(1.05);
}

/* Edge styling */
.cloud-diagram-container .edge {
  stroke: #666;
  stroke-width: 2;
  fill: none;
}

.cloud-diagram-container .edge.aws {
  stroke: #ff9900;
}

.cloud-diagram-container .edge.azure {
  stroke: #0078d4;
}

.cloud-diagram-container .edge.gcp {
  stroke: #4285f4;
}
```

## 🔧 Advanced Configuration

### TypeScript Configuration

```typescript
// types/cloud-diagrams.d.ts
declare module '@cloud-diagrams/core' {
  export interface DiagramConfig {
    title?: string;
    direction?: 'TB' | 'BT' | 'LR' | 'RL';
    theme?: 'light' | 'dark' | 'auto';
  }

  export interface RenderOptions {
    width?: number;
    height?: number;
    layoutAlgorithm?: 'force' | 'hierarchical' | 'grid';
    enableZoom?: boolean;
    enablePan?: boolean;
  }

  export class Diagram {
    constructor(title: string, config?: DiagramConfig);
    addNode(node: Node): void;
    rightShift(from: Node[], to: Node[]): void;
  }

  export class CloudDiagramsD3Renderer {
    constructor(container: string | HTMLElement, options?: RenderOptions);
    renderDiagram(diagram: Diagram): Promise<void>;
    exportSVG(): string;
  }

  export class EC2 {
    constructor(id: string, label: string);
  }

  export class S3 {
    constructor(id: string, label: string);
  }

  // Add other service classes as needed
}
```

## 🚀 Performance Tips

1. **Lazy Loading**: Use dynamic imports for better performance
2. **Memoization**: Cache diagram instances when possible
3. **Cleanup**: Always clean up DOM elements on component unmount
4. **Debouncing**: Debounce diagram regeneration on prop changes
5. **Virtual Scrolling**: For large diagrams, consider virtual scrolling

## 🐛 Troubleshooting

### Common Issues

1. **SSR Issues**: Use dynamic imports with `ssr: false`
2. **D3 Conflicts**: Ensure D3 versions are compatible
3. **Container Size**: Ensure container has explicit dimensions
4. **Memory Leaks**: Clean up event listeners and DOM elements

### Debug Mode

```javascript
// Enable debug mode
const renderer = new CloudDiagramsD3Renderer(container, {
  debug: true,
  verbose: true
});
```

This comprehensive guide should help developers integrate the cloud diagrams library with any popular framework or build tool. 