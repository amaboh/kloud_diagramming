# 🚀 Quick Start Guide

> **Get up and running with Cloud Diagrams TypeScript in 5 minutes**

This guide will help you create your first interactive cloud architecture diagram using TypeScript. By the end, you'll have a working diagram that you can click, export, and customize.

## ⚡ Installation

### Option 1: NPM/Yarn (Recommended)

```bash
# Core package + AWS services
npm install @cloud-diagrams/core @cloud-diagrams/aws

# Or with multiple providers
npm install @cloud-diagrams/core @cloud-diagrams/aws @cloud-diagrams/azure @cloud-diagrams/gcp

# For React applications
npm install @cloud-diagrams/react

# For CLI tools
npm install -g @cloud-diagrams/cli
```

### Option 2: CDN (Quick Testing)

```html
<script type="module">
  import { Diagram } from "https://unpkg.com/@cloud-diagrams/core";
  import { EC2, RDS } from "https://unpkg.com/@cloud-diagrams/aws";
  // Your diagram code here
</script>
```

## 🏗️ Your First Diagram (2 minutes)

Let's create a simple 3-tier web application diagram:

### 1. Create the HTML Structure

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Cloud Architecture</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 40px;
      }
      #diagram {
        width: 100%;
        height: 600px;
        border: 1px solid #ddd;
      }
    </style>
  </head>
  <body>
    <h1>🏗️ My 3-Tier Architecture</h1>
    <div id="diagram"></div>

    <script type="module" src="diagram.js"></script>
  </body>
</html>
```

### 2. Create the Diagram Code

Create `diagram.js`:

```javascript
import { Diagram } from "@cloud-diagrams/core";
import { EC2, RDS, S3, ALB } from "@cloud-diagrams/aws";

// Create a new diagram
const diagram = new Diagram("3-Tier Web Application", {
  direction: "TB", // Top to Bottom
  theme: "default",
});

// Add AWS services
const loadBalancer = diagram.addNode(
  new ALB("alb-1", "Load Balancer", {
    url: "https://console.aws.amazon.com/ec2/v2/home#LoadBalancers",
    description: "Distributes incoming traffic",
  })
);

const webServer1 = diagram.addNode(
  new EC2("web-1", "Web Server 1", {
    url: "https://console.aws.amazon.com/ec2",
    description: "Primary web server",
  })
);

const webServer2 = diagram.addNode(
  new EC2("web-2", "Web Server 2", {
    url: "https://console.aws.amazon.com/ec2",
    description: "Secondary web server",
  })
);

const database = diagram.addNode(
  new RDS("db-1", "MySQL Database", {
    url: "https://console.aws.amazon.com/rds",
    description: "Application database",
  })
);

const storage = diagram.addNode(
  new S3("s3-1", "Static Assets", {
    url: "https://console.aws.amazon.com/s3",
    description: "Images, CSS, JS files",
  })
);

// Create connections
diagram.connect(loadBalancer, webServer1, {
  label: "HTTP/HTTPS",
  color: "blue",
});
diagram.connect(loadBalancer, webServer2, {
  label: "HTTP/HTTPS",
  color: "blue",
});
diagram.connect(webServer1, database, {
  label: "SQL Queries",
  color: "green",
});
diagram.connect(webServer2, database, {
  label: "SQL Queries",
  color: "green",
});
diagram.connect(webServer1, storage, {
  label: "Static Files",
  color: "orange",
});
diagram.connect(webServer2, storage, {
  label: "Static Files",
  color: "orange",
});

// Render interactive diagram
await diagram.render("#diagram", {
  theme: "default",
  interactive: true,
  animations: true,
});

// Add click event listeners
document.addEventListener("nodeClick", (event) => {
  const { node } = event.detail;
  console.log(`Clicked: ${node.label}`);

  // Open AWS console (if URL provided)
  if (node.metadata?.url) {
    window.open(node.metadata.url, "_blank");
  }
});

console.log("✅ Diagram rendered successfully!");
```

### 3. Open in Browser

Open your HTML file in a browser and you should see an interactive diagram! Click on any service to open the AWS console.

## 🏢 Project Structure (Recommended)

For larger projects, organize your files like this:

```
my-architecture/
├── src/
│   ├── diagrams/
│   │   ├── main-architecture.ts
│   │   ├── network-diagram.ts
│   │   └── data-flow.ts
│   ├── components/
│   │   ├── custom-services.ts
│   │   └── shared-groups.ts
│   └── themes/
│       └── company-theme.ts
├── public/
│   └── index.html
├── dist/
├── package.json
└── README.md
```

## 📋 Working with Groups (VPCs, Resource Groups)

Organize services into logical groups:

```typescript
import { Diagram } from "@cloud-diagrams/core";
import { EC2, RDS, VPC } from "@cloud-diagrams/aws";

const diagram = new Diagram("VPC Architecture");

// Create a VPC group
const productionVPC = diagram.addGroup("Production VPC", (group) => {
  // Public subnet
  const publicSubnet = group.addGroup("Public Subnet", (subnet) => {
    subnet.addNode(new EC2("bastion", "Bastion Host"));
    subnet.addNode(new EC2("nat", "NAT Gateway"));
  });

  // Private subnet
  const privateSubnet = group.addGroup("Private Subnet", (subnet) => {
    subnet.addNode(new EC2("app-1", "App Server 1"));
    subnet.addNode(new EC2("app-2", "App Server 2"));
    subnet.addNode(new RDS("db", "Database"));
  });
});

await diagram.render("#container");
```

## 🎨 Themes and Styling

Switch between built-in themes:

```typescript
// Dark theme for presentations
await diagram.render("#container", { theme: "dark" });

// Light theme for documents
await diagram.render("#container", { theme: "light" });

// Custom colors
await diagram.render("#container", {
  theme: "default",
  customColors: {
    background: "#f5f5f5",
    nodeStroke: "#333",
    nodeFill: "#fff",
  },
});
```

## 🖱️ Adding Interactivity

Make your diagrams interactive:

```typescript
// Add tooltips and click handlers
const webServer = new EC2("web-1", "Web Server", {
  url: "https://console.aws.amazon.com/ec2",
  description: "Primary web server running nginx",
  tags: ["production", "web", "nginx"],
  onClick: (node) => {
    alert(`${node.label}: ${node.metadata.description}`);
  },
  onHover: (node) => {
    console.log(`Hovering over: ${node.label}`);
  },
});

// Listen for diagram events
document.addEventListener("nodeClick", (event) => {
  const { node } = event.detail;

  // Show service details in a modal
  showServiceDetails(node);
});

document.addEventListener("connectionClick", (event) => {
  const { connection } = event.detail;

  // Highlight data flow
  highlightDataFlow(connection);
});
```

## 📥 Export Options

Export your diagrams in multiple formats:

```typescript
// Export as SVG (vector graphics)
const svgBlob = await diagram.export("svg", {
  width: 1200,
  height: 800,
  includeInteractivity: false, // For static exports
});
downloadFile(svgBlob, "architecture.svg");

// Export as PNG (high resolution)
const pngBlob = await diagram.export("png", {
  width: 1920,
  height: 1080,
  backgroundColor: "white",
  scale: 2, // Retina quality
});
downloadFile(pngBlob, "architecture.png");

// Export as PDF (presentation ready)
const pdfBlob = await diagram.export("pdf", {
  width: 1200,
  height: 800,
  format: "A4",
  orientation: "landscape",
});
downloadFile(pdfBlob, "architecture.pdf");

// Helper function for downloads
function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
```

## 🛠️ Using the CLI Tool

For development workflows, use the CLI:

```bash
# Initialize a new project
cloud-diagrams init my-project --provider aws --template 3tier

# Generate diagrams from TypeScript
cloud-diagrams generate src/architecture.ts -o docs/architecture.svg

# Watch mode for development
cloud-diagrams generate src/architecture.ts --watch

# Export to multiple formats
cloud-diagrams generate src/architecture.ts \
    -f png,pdf,svg \
    --width 1920 \
    --height 1080

# Validate diagram syntax
cloud-diagrams validate src/architecture.ts
```

## ⚛️ React Integration

Use with React applications:

```jsx
import React from "react";
import { DiagramRenderer, useDiagram } from "@cloud-diagrams/react";
import { EC2, RDS } from "@cloud-diagrams/aws";

function ArchitectureView() {
  const diagram = useDiagram("My Architecture", (d) => {
    const web = d.addNode(new EC2("web", "Web Server"));
    const db = d.addNode(new RDS("db", "Database"));
    d.connect(web, db, { label: "SQL" });
  });

  return (
    <div>
      <h1>System Architecture</h1>
      <DiagramRenderer
        diagram={diagram}
        theme="dark"
        interactive={true}
        onNodeClick={(node) => console.log("Clicked:", node.label)}
      />
    </div>
  );
}
```

## 💡 Pro Tips

1. **Start Simple**: Begin with basic diagrams and add complexity gradually
2. **Use Groups**: Organize related services into logical groups (VPCs, resource groups)
3. **Add Metadata**: Include URLs, descriptions, and tags for richer interactivity
4. **Test Exports**: Always test your export formats before presentations
5. **Version Control**: Keep diagram code in version control with your infrastructure
6. **Documentation**: Add comments to explain architectural decisions

## 🎯 What's Next?

Now that you have a working diagram, explore these areas:

- **[📚 Full Documentation Hub](./README.md)** - Complete feature reference
- **[☁️ AWS Services Guide](./providers/aws.md)** - All available AWS services
- **[🎭 Theming Guide](./themes.md)** - Customizing visual appearance
- **[🏢 Enterprise Examples](./tutorials/enterprise.md)** - Complex architectures
- **[🔄 CI/CD Integration](./cicd.md)** - Automated diagram generation

## 🆘 Need Help?

- **[❓ FAQ](./faq.md)** - Common questions and answers
- **[🐛 Troubleshooting](./troubleshooting.md)** - Solving common issues
- **💬 [GitHub Discussions](https://github.com/your-org/kloud_diagramming/discussions)** - Community support

**Happy diagramming! 🚀**
