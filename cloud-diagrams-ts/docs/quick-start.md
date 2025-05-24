# 🎯 Quick Start Guide

Get up and running with **Cloud Diagrams TypeScript** in under 5 minutes!

## 📦 Installation

### Option 1: Core + AWS (Recommended)

```bash
npm install @cloud-diagrams/core @cloud-diagrams/aws
```

### Option 2: All Providers

```bash
npm install @cloud-diagrams/core @cloud-diagrams/aws @cloud-diagrams/azure @cloud-diagrams/gcp
```

### Option 3: Full Suite (with React & CLI)

```bash
npm install @cloud-diagrams/core @cloud-diagrams/aws @cloud-diagrams/azure @cloud-diagrams/gcp @cloud-diagrams/react @cloud-diagrams/cli
```

## 🚀 Your First Diagram

Create a simple 3-tier web application architecture:

```typescript
import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS, S3 } from '@cloud-diagrams/aws';

// Create a new diagram
const diagram = new Diagram('My First Architecture', {
  direction: 'LR', // Left to Right
  theme: 'default',
});

// Add AWS services
const webServer = diagram.addNode(
  new EC2('web-server', 'Web Server', {
    description: 'Frontend application server',
    url: 'https://console.aws.amazon.com/ec2',
  })
);

const database = diagram.addNode(
  new RDS('database', 'MySQL Database', {
    description: 'Primary application database',
    url: 'https://console.aws.amazon.com/rds',
  })
);

const storage = diagram.addNode(
  new S3('file-storage', 'File Storage', {
    description: 'Static files and uploads',
    url: 'https://console.aws.amazon.com/s3',
  })
);

// Create connections
diagram.connect(webServer, database, {
  label: 'SQL Queries',
  style: 'solid',
});

diagram.connect(webServer, storage, {
  label: 'File Uploads',
  style: 'dashed',
});

// Render the diagram
await diagram.render('#diagram-container', {
  theme: 'default',
  interactive: true,
});
```

## 🌐 HTML Setup

Create an HTML file to display your diagram:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Cloud Architecture</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        background: white;
        border-radius: 12px;
        padding: 30px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333;
        text-align: center;
        margin-bottom: 30px;
      }
      #diagram-container {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 20px;
        background: #fafafa;
        min-height: 400px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🏗️ My Cloud Architecture</h1>
      <div id="diagram-container">
        <!-- Diagram will be rendered here -->
      </div>
    </div>

    <script type="module" src="./diagram.js"></script>
  </body>
</html>
```

## 📁 Project Structure

```
my-cloud-diagram/
├── index.html          # HTML page
├── diagram.ts          # Your diagram code
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript config
```

### package.json

```json
{
  "name": "my-cloud-diagram",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "@cloud-diagrams/core": "^1.0.0",
    "@cloud-diagrams/aws": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^4.0.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build"
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## 🎨 Adding Groups

Organize your services with groups (VPCs, subnets, etc.):

```typescript
import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS, Lambda, VPC } from '@cloud-diagrams/aws';

const diagram = new Diagram('Microservices Architecture');

// Create a VPC group
const vpc = diagram.addGroup('Production VPC', {
  type: 'vpc',
  style: {
    backgroundColor: '#e3f2fd',
    borderColor: '#1976d2',
  },
});

// Add services to the VPC
const webServer1 = vpc.addNode(new EC2('web-1', 'Web Server 1'));
const webServer2 = vpc.addNode(new EC2('web-2', 'Web Server 2'));
const database = vpc.addNode(new RDS('db-1', 'Database'));

// Add external services
const apiGateway = diagram.addNode(new Lambda('api', 'API Gateway'));

// Create connections
diagram.connect(apiGateway, webServer1);
diagram.connect(apiGateway, webServer2);
diagram.connect(webServer1, database);
diagram.connect(webServer2, database);

await diagram.render('#diagram-container');
```

## 🎭 Theme Options

Switch between different visual themes:

```typescript
// Light theme (minimal)
await diagram.render('#container', { theme: 'light' });

// Dark theme
await diagram.render('#container', { theme: 'dark' });

// Default theme (professional)
await diagram.render('#container', { theme: 'default' });
```

## 🖱️ Interactive Features

Add click handlers and metadata:

```typescript
// Add metadata to nodes
const webServer = new EC2('web', 'Web Server', {
  url: 'https://console.aws.amazon.com/ec2',
  description: 'Primary web server handling user requests',
  tags: ['production', 'web-tier'],
});

// Listen for click events
document.addEventListener('nodeClick', (event) => {
  const { node } = event.detail;

  if (node.url) {
    window.open(node.url, '_blank');
  }

  console.log('Clicked node:', node);
});

// Enable interactive mode
await diagram.render('#container', {
  interactive: true,
  showTooltips: true,
});
```

## 📤 Export Options

Export your diagrams to different formats:

```typescript
// Export as SVG (vector)
const svgBlob = await diagram.export('svg', {
  width: 1200,
  height: 800,
});

// Export as PNG (image)
const pngBlob = await diagram.export('png', {
  width: 1920,
  height: 1080,
  backgroundColor: 'white',
});

// Download the file
const url = URL.createObjectURL(pngBlob);
const a = document.createElement('a');
a.href = url;
a.download = 'architecture.png';
a.click();
```

## 🚀 Next Steps

Now that you have a basic diagram working, explore more features:

1. **[📊 Diagram Types](./diagram-types.md)** - Learn about different architecture patterns
2. **[☁️ AWS Services](./providers/aws.md)** - Complete AWS service catalog
3. **[🎨 Theming](./theming.md)** - Customize visual appearance
4. **[🏗️ Advanced Examples](./examples.md)** - Complex architecture examples
5. **[💻 CLI Tool](./cli/README.md)** - Command-line interface for automation

## 💡 Pro Tips

- **Type Safety**: Use TypeScript for full IDE autocomplete and error checking
- **Incremental Building**: Start simple and add complexity gradually
- **Consistent Naming**: Use descriptive names for nodes and connections
- **Group Organization**: Use groups to represent logical boundaries (VPCs, regions, etc.)
- **Interactive Testing**: Use the browser demo to experiment with features

---

**🎉 Congratulations!** You've created your first cloud architecture diagram with Cloud Diagrams TypeScript!

**Need Help?**

- 📚 [Browse Documentation](./README.md)
- 💬 [Ask Questions](https://github.com/your-org/kloud_diagramming/discussions)
- 🐛 [Report Issues](https://github.com/your-org/kloud_diagramming/issues)
