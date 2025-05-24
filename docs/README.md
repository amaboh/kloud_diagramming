# 📚 Cloud Diagrams TypeScript - Documentation Hub

> **Complete documentation for the Cloud Diagrams TypeScript library**

Welcome to the comprehensive documentation for **Cloud Diagrams TypeScript** - a powerful TypeScript library for creating interactive cloud architecture diagrams using code.

## 🚀 Getting Started

| Quick Links                                                     | Description                           |
| --------------------------------------------------------------- | ------------------------------------- |
| **[📖 Quick Start Guide](./quick-start.md)**                    | Get up and running in 5 minutes       |
| **[🎪 Live Demo](../cloud-diagrams-ts/examples/browser-demo/)** | Interactive examples in your browser  |
| **[💻 CLI Tool](./cli/README.md)**                              | Command-line interface documentation  |
| **[⚡ Installation](./quick-start.md#installation)**            | Installation options and requirements |

## 🏗️ Core Concepts

### Architecture & Design

- **[🎯 Core Concepts](./core-concepts.md)** - Understanding the DSL and architecture
- **[🔧 Diagram Structure](./diagram-structure.md)** - How diagrams are organized
- **[🎨 Theming System](./theming.md)** - Customizing visual appearance
- **[🌐 Rendering Engine](./rendering.md)** - How diagrams are generated

### Components & Services

- **[📦 Packages Overview](./packages.md)** - Understanding the monorepo structure
- **[🔗 Connections & Relationships](./connections.md)** - Linking diagram elements
- **[📋 Groups & Hierarchies](./groups.md)** - Organizing complex architectures

## ☁️ Cloud Providers

| Provider                                         | Coverage | Services | Templates |
| ------------------------------------------------ | -------- | -------- | --------- |
| **[🟠 AWS](./providers/aws.md)**                 | ✅ Full  | 15+      | 4 types   |
| **[🔵 Azure](./providers/azure.md)**             | ✅ Full  | 12+      | 3 types   |
| **[🟡 GCP](./providers/gcp.md)**                 | ✅ Full  | 10+      | 3 types   |
| **[🌍 Multi-Cloud](./providers/multi-cloud.md)** | ✅ Full  | All      | 2 types   |

## 🎯 Features & Capabilities

### Core Features

- **[🖱️ Interactivity](./interactivity.md)** - Click handlers, hover effects, and events
- **[📥 Export Options](./export.md)** - SVG, PNG, PDF, and JSON export
- **[📱 React Integration](./react.md)** - Using with React applications
- **[🎭 Themes](./themes.md)** - Built-in and custom themes

### Advanced Features

- **[👁️ Watch Mode](./watch-mode.md)** - Auto-regeneration during development
- **[🔄 CI/CD Integration](./cicd.md)** - Automated diagram generation
- **[🧪 Testing](./testing.md)** - Testing diagram code and output
- **[🔌 Plugins](./plugins.md)** - Extending functionality

## 🛠️ Tools & Development

### Command Line Interface

- **[💻 CLI Overview](./cli/README.md)** - Complete CLI documentation
- **[🚀 CLI Commands](./cli/commands.md)** - All available commands
- **[🏗️ Templates](./cli/templates.md)** - Project initialization templates
- **[⚙️ Configuration](./cli/configuration.md)** - CLI configuration options

### Development & Contributing

- **[🔧 Development Setup](./development/setup.md)** - Setting up development environment
- **[🏗️ Build System](./development/build.md)** - Understanding the build process
- **[🧪 Testing Guide](./development/testing.md)** - Running and writing tests
- **[📦 Publishing](./development/publishing.md)** - Package publishing workflow

## 📖 API Reference

### Core API

- **[📊 Diagram Class](./api/diagram.md)** - Main diagram API
- **[🎯 Node Classes](./api/nodes.md)** - Service nodes and components
- **[🔗 Connection API](./api/connections.md)** - Connecting diagram elements
- **[📋 Group API](./api/groups.md)** - Grouping and hierarchy

### Provider APIs

- **[🟠 AWS API](./api/aws.md)** - AWS service classes and methods
- **[🔵 Azure API](./api/azure.md)** - Azure service classes and methods
- **[🟡 GCP API](./api/gcp.md)** - GCP service classes and methods
- **[⚛️ React API](./api/react.md)** - React components and hooks

## 🎓 Tutorials & Examples

### Beginner Tutorials

- **[👶 Your First Diagram](./tutorials/first-diagram.md)** - Step-by-step guide
- **[🏗️ 3-Tier Architecture](./tutorials/3tier.md)** - Classic web application
- **[🔄 Basic Connections](./tutorials/connections.md)** - Linking services
- **[🎨 Styling Basics](./tutorials/styling.md)** - Customizing appearance

### Intermediate Tutorials

- **[🏢 Enterprise Architecture](./tutorials/enterprise.md)** - Complex multi-service diagrams
- **[🌐 Multi-Cloud Setup](./tutorials/multi-cloud.md)** - Cross-provider architectures
- **[⚛️ React Integration](./tutorials/react-integration.md)** - Building React apps
- **[🚀 CI/CD Automation](./tutorials/cicd-automation.md)** - Automated workflows

### Advanced Tutorials

- **[🔌 Custom Providers](./tutorials/custom-providers.md)** - Creating new service providers
- **[🎭 Custom Themes](./tutorials/custom-themes.md)** - Building custom visual themes
- **[🧪 Testing Strategies](./tutorials/testing-strategies.md)** - Comprehensive testing approaches
- **[📊 Performance Optimization](./tutorials/performance.md)** - Optimizing large diagrams

## 🆘 Support & Troubleshooting

### Help & Support

- **[❓ FAQ](./faq.md)** - Frequently asked questions
- **[🐛 Troubleshooting](./troubleshooting.md)** - Common issues and solutions
- **[🔍 Error Reference](./errors.md)** - Error codes and fixes
- **[💡 Best Practices](./best-practices.md)** - Recommended approaches

### Community & Contribution

- **[🤝 Contributing Guide](./contributing.md)** - How to contribute
- **[📋 Issue Templates](./issue-templates.md)** - Reporting bugs and features
- **[🗺️ Roadmap](./roadmap.md)** - Future development plans
- **[📜 Changelog](./changelog.md)** - Version history and updates

## 🎯 Quick Reference

### Common Use Cases

| Use Case                    | Documentation                                    | Examples                    |
| --------------------------- | ------------------------------------------------ | --------------------------- |
| **Web Application**         | [3-Tier Tutorial](./tutorials/3tier.md)          | AWS, Azure, GCP examples    |
| **Microservices**           | [Enterprise Tutorial](./tutorials/enterprise.md) | Kubernetes, Docker examples |
| **Data Pipeline**           | [Data Architecture](./tutorials/data.md)         | ETL, Analytics examples     |
| **Serverless Architecture** | [Serverless Guide](./tutorials/serverless.md)    | Lambda, Functions examples  |

### Syntax Quick Reference

```typescript
// Basic diagram
const diagram = new Diagram("My Architecture");
const web = diagram.addNode(new EC2("web", "Web Server"));
const db = diagram.addNode(new RDS("db", "Database"));
diagram.connect(web, db, { label: "SQL" });
await diagram.render("#container");

// With React
<DiagramRenderer diagram={diagram} theme="dark" interactive />;
```

## 📄 License & Legal

- **[📄 MIT License](../LICENSE)** - Open source license terms
- **[🔒 Security Policy](./security.md)** - Reporting security issues
- **[📋 Code of Conduct](./code-of-conduct.md)** - Community guidelines

---

## 🌟 Need Help?

- **📖 Start with the [Quick Start Guide](./quick-start.md)**
- **💬 Ask questions in [GitHub Discussions](https://github.com/amaboh/kloud_diagramming/discussions)**
- **🐛 Report bugs in [GitHub Issues](https://github.com/amaboh/kloud_diagramming/issues)**
- **📧 Contact maintainers for enterprise support**

**Happy Diagramming! 🚀**
