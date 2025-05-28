# Frequently Asked Questions (FAQ)

## General Questions

### What is @kloud-diagramming/core?

@kloud-diagramming/core is a complete Mingrammer-style cloud architecture diagramming library for JavaScript and TypeScript. It allows you to create professional cloud architecture diagrams programmatically using familiar syntax similar to Python's Mingrammer library.

### How is this different from other diagramming libraries?

- **Mingrammer-style API**: Familiar syntax for Python Mingrammer users
- **Cloud-focused**: Built specifically for cloud architecture diagrams
- **1,100+ Official Icons**: Includes official icons from AWS, Azure, and GCP
- **Professional Rendering**: D3.js-powered SVG rendering with interactive features
- **TypeScript-first**: Full type safety and IntelliSense support
- **Framework Agnostic**: Works with React, Vue, Angular, or vanilla JavaScript

### Is it free to use?

Yes! @kloud-diagramming/core is open source and released under the MIT License. You can use it freely in both personal and commercial projects.

## Installation & Setup

### How do I install the package?

```bash
npm install @kloud-diagramming/core d3
```

The `d3` package is a peer dependency required for rendering.

### Can I use it with CDN?

Yes! You can include it directly in HTML:

```html
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="https://unpkg.com/@kloud-diagramming/core/dist/index.umd.js"></script>
```

### What are the browser requirements?

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

The library uses modern JavaScript features and SVG rendering.

## Usage Questions

### How do I create a simple diagram?

```typescript
import { Diagram, EC2, S3 } from "@kloud-diagramming/core";

const diagram = new Diagram("my-architecture");
const web = new EC2("web", "Web Server");
const storage = new S3("storage", "Data Storage");

diagram.addNode(web);
diagram.addNode(storage);
diagram.rightShift([web], [storage]); // Mingrammer-style connection

await diagram.render("#container");
```

### What cloud providers are supported?

Currently supported:
- **AWS**: 12 service classes (EC2, S3, Lambda, RDS, etc.)
- **Azure**: 12 service classes (Virtual Machine, Blob Storage, etc.)
- **GCP**: 12 service classes (Compute Engine, Cloud Storage, etc.)

More services are added regularly. You can also create custom service classes.

### How do I add custom services?

```typescript
import { AWSNode } from "@kloud-diagramming/core";

class CustomService extends AWSNode {
  constructor(id: string, label: string = "Custom Service") {
    super(id, label, "customservice", {
      category: "Custom",
      description: "My custom service"
    });
  }
}
```

### Can I group services into clusters?

Yes! Use clusters to organize related services:

```typescript
const webTier = diagram.cluster("Web Tier", {
  style: "filled",
  bgcolor: "#e3f2fd"
});

webTier.addNodes([web1, web2, loadBalancer]);
```

## Rendering & Visualization

### What rendering options are available?

The D3.js renderer supports:
- **Layout algorithms**: Force-directed, hierarchical, grid
- **Interactive features**: Zoom, pan, node highlighting
- **Export formats**: SVG, PNG
- **Themes**: Light and dark modes
- **Clustering**: Visual grouping of related services

### How do I export diagrams?

```typescript
// SVG export
const svgString = renderer.exportSVG();

// PNG export (high resolution)
const pngBlob = await renderer.exportPNG(2); // 2x scale
```

### Can I customize the appearance?

Yes! You can customize:
- Node colors and styles
- Edge colors and line styles
- Cluster backgrounds and borders
- Overall theme and layout
- Custom icons

### How do I handle large diagrams?

For large diagrams:
- Use clustering to organize nodes
- Enable zoom and pan for navigation
- Consider hierarchical layout for better organization
- Use the grid layout for structured arrangements

## Framework Integration

### How do I use it with React?

```tsx
import React, { useEffect, useRef } from 'react';
import { Diagram, CloudDiagramsD3Renderer } from '@kloud-diagramming/core';

function DiagramComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const diagram = new Diagram("react-diagram");
      // ... add nodes and edges
      
      const renderer = new CloudDiagramsD3Renderer(containerRef.current);
      renderer.renderDiagram(diagram);
    }
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '400px' }} />;
}
```

### Does it work with Next.js?

Yes! The library is SSR-compatible. Make sure to render diagrams only on the client side:

```tsx
import dynamic from 'next/dynamic';

const DiagramComponent = dynamic(() => import('./DiagramComponent'), {
  ssr: false
});
```

### Can I use it with Vue.js?

Absolutely! Here's a Vue 3 example:

```vue
<template>
  <div ref="diagramContainer" class="diagram-container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Diagram, CloudDiagramsD3Renderer } from '@kloud-diagramming/core';

const diagramContainer = ref(null);

onMounted(() => {
  const diagram = new Diagram("vue-diagram");
  // ... add nodes and edges
  
  const renderer = new CloudDiagramsD3Renderer(diagramContainer.value);
  renderer.renderDiagram(diagram);
});
</script>
```

## Icons & Customization

### How do I add custom icons?

```typescript
import { createIconRegistry } from "@kloud-diagramming/core";

const registry = createIconRegistry({
  customIcons: {
    "aws.myservice": {
      svg: "data:image/svg+xml;base64,...",
      metadata: {
        name: "My Service",
        category: "Custom",
        provider: "aws",
        service: "myservice"
      }
    }
  }
});

renderer.setIconRegistry(registry);
```

### What if an icon is missing?

The library automatically generates fallback icons with:
- Provider-specific colors
- Service name abbreviation
- Consistent styling

### Can I use my own icon set?

Yes! You can replace the entire icon registry with your custom icons or extend the existing ones.

## Performance & Optimization

### How large can my diagrams be?

The library can handle:
- **Small diagrams**: 1-20 nodes (instant rendering)
- **Medium diagrams**: 20-100 nodes (< 1 second)
- **Large diagrams**: 100+ nodes (may require optimization)

For very large diagrams, consider:
- Using clustering to reduce visual complexity
- Implementing pagination or filtering
- Using the grid layout for better performance

### What's the bundle size?

- **ES Module**: ~37KB (gzipped)
- **UMD**: ~37KB (gzipped)
- **Dependencies**: D3.js (~240KB gzipped)

The library is optimized for tree-shaking when using ES modules.

### How can I optimize performance?

- Use the `hierarchical` layout for structured diagrams
- Enable clustering for better organization
- Limit the number of visible nodes
- Use debounced updates for interactive features

## Troubleshooting

### The diagram doesn't render

Check that:
1. D3.js is loaded before the library
2. The container element exists in the DOM
3. The container has dimensions (width/height)
4. No JavaScript errors in the console

### Icons are not showing

This usually means:
1. Icon registry is not set up
2. Service name doesn't match icon keys
3. Network issues loading icon data

The library will show fallback icons in these cases.

### TypeScript errors

Make sure you have the correct type definitions:
```bash
npm install --save-dev @types/d3
```

### Performance issues

For performance problems:
1. Check the number of nodes and edges
2. Try different layout algorithms
3. Enable clustering
4. Consider pagination for large datasets

## Development & Contributing

### How can I contribute?

We welcome contributions! See our [Contributing Guide](CONTRIBUTING.md) for:
- Setting up the development environment
- Adding new cloud services
- Improving documentation
- Reporting bugs

### How do I add a new cloud service?

1. Create the service class extending the appropriate provider base
2. Add proper TypeScript types
3. Include tests
4. Update documentation
5. Submit a pull request

### Can I request new features?

Yes! Please:
1. Check existing issues first
2. Create a detailed feature request
3. Explain the use case
4. Consider contributing the implementation

## Commercial Use

### Can I use this in commercial projects?

Yes! The MIT License allows commercial use without restrictions.

### Do I need to credit the library?

While not required, we appreciate attribution. You can include:
```
Powered by @kloud-diagramming/core
```

### Is there commercial support available?

Currently, support is community-based through GitHub issues and discussions. Commercial support options may be available in the future.

## Migration & Compatibility

### How do I migrate from Mingrammer (Python)?

The API is designed to be familiar:

**Python Mingrammer:**
```python
from diagrams import Diagram
from diagrams.aws.compute import EC2

with Diagram("Web Service"):
    web = EC2("web")
```

**@kloud-diagramming/core:**
```typescript
import { Diagram, EC2 } from "@kloud-diagramming/core";

const diagram = new Diagram("web-service", "Web Service");
const web = new EC2("web", "web");
diagram.addNode(web);
```

### Is it compatible with existing D3.js code?

Yes! The library uses D3.js internally and doesn't conflict with other D3.js usage on the same page.

### Can I integrate with existing diagramming tools?

The library exports standard SVG, which can be:
- Imported into design tools
- Converted to other formats
- Embedded in documents
- Used in presentations

---

## Still have questions?

- 📖 Check the [API Reference](API_REFERENCE.md)
- 💬 Join our [GitHub Discussions](https://github.com/kloud-diagramming/core/discussions)
- 🐛 Report issues on [GitHub](https://github.com/kloud-diagramming/core/issues)
- 📧 Contact us at team@kloud-diagramming.com
