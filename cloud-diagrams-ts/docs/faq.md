# ❓ Frequently Asked Questions

Common questions and answers about **Cloud Diagrams TypeScript**.

## 🚀 Getting Started

### Q: What is Cloud Diagrams TypeScript?

**A:** Cloud Diagrams TypeScript is a powerful library for creating interactive cloud architecture diagrams using code. It's inspired by Python's Diagrams library but built specifically for TypeScript/JavaScript with browser-native rendering and interactive features.

### Q: How is this different from draw.io or Lucidchart?

**A:** Unlike traditional drag-and-drop diagramming tools:

- ✅ **Diagrams as Code**: Your diagrams are version-controlled TypeScript code
- ✅ **Type Safety**: Full IDE support with autocompletion and error checking
- ✅ **Interactive**: Browser-native with click handlers and hover effects
- ✅ **Automation**: Generate diagrams programmatically from infrastructure code
- ✅ **Consistency**: Standardized icons and layouts across all diagrams

### Q: Do I need to know TypeScript to use this?

**A:** While TypeScript knowledge is helpful, the library is designed to be approachable:

- 📚 **Comprehensive documentation** with copy-paste examples
- 🎯 **Simple API** with intuitive method names
- 🛠️ **CLI tool** that generates templates and examples
- 💡 **IDE support** helps you learn as you go

## 📦 Installation & Setup

### Q: What packages do I need to install?

**A:** For most users:

```bash
# Core library + AWS services (most common)
npm install @cloud-diagrams/core @cloud-diagrams/aws

# All cloud providers
npm install @cloud-diagrams/core @cloud-diagrams/aws @cloud-diagrams/azure @cloud-diagrams/gcp

# Full suite including React and CLI
npm install @cloud-diagrams/core @cloud-diagrams/aws @cloud-diagrams/azure @cloud-diagrams/gcp @cloud-diagrams/react @cloud-diagrams/cli
```

### Q: Can I use this with JavaScript instead of TypeScript?

**A:** Yes! The library works with both:

```javascript
// JavaScript example
import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS } from '@cloud-diagrams/aws';

const diagram = new Diagram('My Architecture');
const web = diagram.addNode(new EC2('web', 'Web Server'));
const db = diagram.addNode(new RDS('db', 'Database'));
diagram.connect(web, db);
```

However, you'll lose type safety and IDE autocompletion benefits.

### Q: What browsers are supported?

**A:** All modern browsers:

- ✅ **Chrome 80+**
- ✅ **Firefox 75+**
- ✅ **Safari 13+**
- ✅ **Edge 80+**

The library uses modern web standards (SVG, ES modules) and doesn't require any plugins.

## ☁️ Cloud Providers

### Q: Which cloud providers are supported?

**A:** Currently supported:

| Provider        | Status      | Services                     | Icons                    |
| --------------- | ----------- | ---------------------------- | ------------------------ |
| **AWS**         | ✅ Complete | 50+ services                 | Official AWS icons       |
| **Azure**       | ✅ Complete | 30+ services                 | Official Microsoft icons |
| **GCP**         | ✅ Complete | 20+ services                 | Official Google icons    |
| **Multi-Cloud** | ✅ Complete | Cross-provider architectures | -                        |

### Q: What AWS services are available?

**A:** 50+ AWS services across all categories:

- **Compute**: EC2, Lambda, ECS, Fargate, Batch
- **Database**: RDS, DynamoDB, Aurora, ElastiCache
- **Storage**: S3, EFS, EBS, FSx
- **Network**: VPC, ALB, CloudFront, Route53
- **Analytics**: Kinesis, EMR, Redshift, Athena
- **Security**: IAM, KMS, WAF, GuardDuty

See the [complete AWS service list](./providers/aws.md#service-reference).

### Q: Can I request support for a specific service?

**A:** Absolutely! Please:

1. 🐛 **[Open an issue](https://github.com/your-org/kloud_diagramming/issues)** with the service name
2. 📋 Include the official icon URL if available
3. 💡 Describe your use case

We regularly add new services based on community requests.

### Q: Can I use custom icons or services?

**A:** Yes! You can create custom nodes:

```typescript
import { Node } from '@cloud-diagrams/core';

class CustomService extends Node {
  constructor(id: string, label: string, options = {}) {
    super(id, label, {
      ...options,
      iconUrl: 'https://example.com/my-icon.svg',
      provider: 'custom',
    });
  }
}

const customNode = new CustomService('my-service', 'My Service');
```

## 🎨 Rendering & Visualization

### Q: How are diagrams rendered?

**A:** The library uses **Mermaid.js** as the rendering engine:

- 🎨 **SVG output** for crisp, scalable graphics
- 🖱️ **DOM integration** for interactivity
- 🎭 **Theme support** for different visual styles
- 📱 **Responsive** design that works on all screen sizes

### Q: Can I customize the appearance?

**A:** Yes, multiple customization options:

```typescript
// Theme selection
await diagram.render('#container', { theme: 'dark' });

// Custom node styling
const server = new EC2('web', 'Web Server', {
  style: {
    backgroundColor: '#ff9800',
    borderColor: '#f57c00',
  },
});

// Custom group styling
const vpc = diagram.addGroup('VPC', {
  style: {
    backgroundColor: '#e3f2fd',
    borderColor: '#1976d2',
  },
});
```

### Q: What export formats are supported?

**A:** Multiple formats for different use cases:

- **SVG**: Vector graphics, best for web and interactive use
- **PNG**: Raster images, good for documentation and presentations
- **PDF**: Documents, perfect for reports and printing
- **JSON**: Diagram specifications for programmatic use

### Q: Can I make diagrams interactive?

**A:** Yes! The library supports rich interactivity:

```typescript
// Add click handlers
const server = new EC2('web', 'Web Server', {
  url: 'https://console.aws.amazon.com/ec2',
  metadata: { environment: 'production' },
});

// Listen for events
document.addEventListener('nodeClick', (event) => {
  const { node } = event.detail;
  console.log('Clicked:', node.label);
  if (node.url) {
    window.open(node.url, '_blank');
  }
});
```

## 🛠️ Development & Integration

### Q: Can I use this in a React application?

**A:** Yes! We provide a dedicated React package:

```typescript
import { DiagramRenderer } from '@cloud-diagrams/react';

function MyComponent() {
  return (
    <DiagramRenderer
      diagram={myDiagram}
      theme="default"
      interactive={true}
    />
  );
}
```

See the [React Integration Guide](./react/README.md) for details.

### Q: How do I integrate with CI/CD pipelines?

**A:** Use the CLI tool for automation:

```yaml
# GitHub Actions example
- name: Generate diagrams
  run: |
    npm install -g @cloud-diagrams/cli
    cloud-diagrams generate diagrams/architecture.ts -o docs/architecture.svg
```

See the [CI/CD Integration Guide](./cli/README.md#cicd-integration) for complete examples.

### Q: Can I generate diagrams from infrastructure code?

**A:** While not built-in, you can create adapters:

```typescript
// Example: Generate from Terraform
function fromTerraform(tfPlan: any): Diagram {
  const diagram = new Diagram('Infrastructure');

  // Parse Terraform plan and create nodes
  tfPlan.resources.forEach((resource) => {
    if (resource.type === 'aws_instance') {
      diagram.addNode(new EC2(resource.name, resource.name));
    }
  });

  return diagram;
}
```

### Q: How do I handle large, complex diagrams?

**A:** Several strategies for complex architectures:

1. **Use Groups**: Organize with VPCs, subnets, and logical containers
2. **Multiple Diagrams**: Break into logical components (network, data, compute)
3. **Hierarchical Layout**: Use the `direction: 'TB'` for better vertical flow
4. **Manual Positioning**: Override automatic layout for precise control

```typescript
// Example: Large microservices architecture
const diagram = new Diagram('Platform', {
  direction: 'TB',
  layout: 'hierarchical',
});

const vpc = diagram.addGroup('Production VPC');
const services = vpc.addGroup('Microservices');
const data = vpc.addGroup('Data Layer');
```

## 🔧 Troubleshooting

### Q: Why am I getting TypeScript errors?

**A:** Common solutions:

1. **Install type definitions**: `npm install @types/node`
2. **Check tsconfig.json**: Ensure `"esModuleInterop": true`
3. **Update TypeScript**: Use TypeScript 4.0+ for best compatibility

### Q: The diagram isn't rendering. What's wrong?

**A:** Check these common issues:

1. **Container element**: Ensure the target element exists
2. **Async rendering**: Use `await diagram.render()`
3. **Import errors**: Verify all imports are correct
4. **Browser console**: Check for JavaScript errors

```typescript
// Correct async usage
try {
  await diagram.render('#diagram-container');
  console.log('Diagram rendered successfully');
} catch (error) {
  console.error('Rendering failed:', error);
}
```

### Q: Why are icons not showing?

**A:** Possible causes:

1. **Network restrictions**: Icons load from CDN, check firewall
2. **Missing packages**: Ensure provider packages are installed
3. **Import errors**: Verify service imports are correct

### Q: Performance is slow with large diagrams. How can I optimize?

**A:** Optimization strategies:

1. **Lazy loading**: Only render visible parts
2. **Simplify**: Reduce unnecessary details
3. **Group efficiently**: Use hierarchy to reduce complexity
4. **Consider splitting**: Break into multiple diagrams

## 💰 Licensing & Commercial Use

### Q: Is this free to use?

**A:** Yes! Cloud Diagrams TypeScript is **MIT licensed** and completely free for:

- ✅ **Personal projects**
- ✅ **Commercial applications**
- ✅ **Enterprise use**
- ✅ **Modification and distribution**

### Q: Can I use the official cloud provider icons?

**A:** Yes! We use only official icons with proper licensing:

- **AWS**: Official icons with permitted use for architecture diagrams
- **Azure**: Microsoft's official product icons
- **GCP**: Google Cloud's official icon library

All icons are used in accordance with provider guidelines.

### Q: Do I need to provide attribution?

**A:** Attribution to the library is not required (MIT license), but we appreciate:

- 🌟 **GitHub stars** to help others discover the project
- 💬 **Community contributions** with feedback and improvements
- 📣 **Sharing** your diagrams and use cases

## 🤝 Community & Support

### Q: How do I get help?

**A:** Multiple support channels:

1. 📚 **[Documentation](./README.md)** - Comprehensive guides and examples
2. 💬 **[Discussions](https://github.com/your-org/kloud_diagramming/discussions)** - Ask questions and share ideas
3. 🐛 **[Issues](https://github.com/your-org/kloud_diagramming/issues)** - Report bugs and request features
4. 📧 **Email**: For sensitive or private questions

### Q: How can I contribute?

**A:** We welcome contributions:

- 🐛 **Bug reports** and feature requests
- 📝 **Documentation** improvements
- 🎨 **New services** and icons
- 💻 **Code contributions** and optimizations
- 🎓 **Examples** and tutorials

See our [Contributing Guide](./contributing.md) for details.

### Q: What's the roadmap for future features?

**A:** Upcoming priorities:

1. **Enhanced Icon System** - More cloud services and custom icon support
2. **Advanced Layout Options** - Better automatic positioning
3. **Live Editing** - Visual editor with code generation
4. **Integration Plugins** - Terraform, CDK, and other IaC tools
5. **Performance Optimizations** - Better handling of large diagrams

See the [complete roadmap](./roadmap.md) for details.

## 🔄 Migration & Updates

### Q: How do I update to the latest version?

**A:** Update all packages together:

```bash
npm update @cloud-diagrams/core @cloud-diagrams/aws @cloud-diagrams/azure @cloud-diagrams/gcp
```

Check the [changelog](./changelog.md) for breaking changes.

### Q: I'm coming from Python Diagrams. How do I migrate?

**A:** The concepts are similar but syntax differs:

```python
# Python Diagrams
from diagrams import Diagram
from diagrams.aws.compute import EC2
from diagrams.aws.database import RDS

with Diagram("Web Service", show=False):
    web = EC2("web")
    db = RDS("database")
    web >> db
```

```typescript
// Cloud Diagrams TypeScript
import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS } from '@cloud-diagrams/aws';

const diagram = new Diagram('Web Service');
const web = diagram.addNode(new EC2('web', 'Web'));
const db = diagram.addNode(new RDS('database', 'Database'));
diagram.connect(web, db);
await diagram.render('#container');
```

Key differences:

- Explicit diagram creation and rendering
- Node constructor takes `(id, label, options)`
- Browser-native, no external dependencies

---

**Still have questions?**

- 💬 **[Ask in Discussions](https://github.com/your-org/kloud_diagramming/discussions)**
- 📧 **[Contact the maintainers](mailto:support@cloud-diagrams-ts.dev)**
- 🐛 **[Open an issue](https://github.com/your-org/kloud_diagramming/issues)** for bugs
