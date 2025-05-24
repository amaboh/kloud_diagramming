# 🔵 Azure Provider - Complete Service Library

> **Comprehensive Microsoft Azure services for cloud architecture diagrams**

The Azure provider package (`@cloud-diagrams/azure`) offers a complete collection of Microsoft Azure services with official icons, proper TypeScript support, and consistent API design.

## 📦 Installation

```bash
npm install @cloud-diagrams/azure @cloud-diagrams/core
```

## 🚀 Quick Start

```typescript
import { Diagram } from "@cloud-diagrams/core";
import {
  VirtualMachine,
  SQLDatabase,
  BlobStorage,
} from "@cloud-diagrams/azure";

const diagram = new Diagram("Azure Web Application", {
  direction: "TB",
  theme: "default",
});

// Add Azure services
const vm = diagram.addNode(
  new VirtualMachine("vm-1", "Web Server", {
    description: "Windows Server 2022",
    url: "https://portal.azure.com/#@/resource/subscriptions/.../virtualMachines/vm-1",
  })
);

const database = diagram.addNode(
  new SQLDatabase("sql-1", "Database", {
    description: "Azure SQL Database",
    url: "https://portal.azure.com/#@/resource/subscriptions/.../sqlServers/sql-1",
  })
);

const storage = diagram.addNode(
  new BlobStorage("storage-1", "File Storage", {
    description: "Azure Blob Storage",
    url: "https://portal.azure.com/#@/resource/subscriptions/.../storageAccounts/storage1",
  })
);

// Create connections
diagram.connect(vm, database, { label: "SQL Connection" });
diagram.connect(vm, storage, { label: "File Access" });

// Render interactive diagram
await diagram.render("#diagram-container", {
  theme: "default",
  interactive: true,
});
```

## ☁️ Available Services

### 💻 Compute Services

#### **Virtual Machines**

```typescript
import { VirtualMachine } from "@cloud-diagrams/azure";

const vm = new VirtualMachine("vm-web", "Web Server", {
  description: "Standard_B2s",
  vmSize: "Standard_B2s",
  os: "Windows Server 2022",
  url: "https://portal.azure.com/#@/resource/...",
});
```

#### **Azure Functions**

```typescript
import { AzureFunction } from "@cloud-diagrams/azure";

const func = new AzureFunction("func-api", "API Functions", {
  description: "Serverless API endpoints",
  runtime: "Node.js 18",
  url: "https://portal.azure.com/#@/resource/...",
});
```

#### **Container Instances**

```typescript
import { ContainerInstance } from "@cloud-diagrams/azure";

const container = new ContainerInstance("aci-app", "App Container", {
  description: "Containerized application",
  image: "nginx:latest",
  url: "https://portal.azure.com/#@/resource/...",
});
```

#### **Azure Kubernetes Service (AKS)**

```typescript
import { AzureKubernetes } from "@cloud-diagrams/azure";

const aks = new AzureKubernetes("aks-cluster", "K8s Cluster", {
  description: "Managed Kubernetes cluster",
  nodeCount: 3,
  url: "https://portal.azure.com/#@/resource/...",
});
```

### 🗄️ Database Services

#### **SQL Database**

```typescript
import { SQLDatabase } from "@cloud-diagrams/azure";

const sqldb = new SQLDatabase("sql-main", "Primary Database", {
  description: "Azure SQL Database",
  tier: "Standard",
  url: "https://portal.azure.com/#@/resource/...",
});
```

#### **Cosmos DB**

```typescript
import { CosmosDB } from "@cloud-diagrams/azure";

const cosmos = new CosmosDB("cosmos-docs", "Document Database", {
  description: "NoSQL document database",
  api: "SQL API",
  url: "https://portal.azure.com/#@/resource/...",
});
```

#### **MySQL Database**

```typescript
import { MySQLDatabase } from "@cloud-diagrams/azure";

const mysql = new MySQLDatabase("mysql-app", "MySQL Database", {
  description: "Azure Database for MySQL",
  version: "8.0",
  url: "https://portal.azure.com/#@/resource/...",
});
```

#### **PostgreSQL Database**

```typescript
import { PostgreSQLDatabase } from "@cloud-diagrams/azure";

const postgres = new PostgreSQLDatabase("postgres-app", "PostgreSQL DB", {
  description: "Azure Database for PostgreSQL",
  version: "14",
  url: "https://portal.azure.com/#@/resource/...",
});
```

### 💾 Storage Services

#### **Blob Storage**

```typescript
import { BlobStorage } from "@cloud-diagrams/azure";

const blob = new BlobStorage("storage-files", "File Storage", {
  description: "Azure Blob Storage",
  tier: "Hot",
  url: "https://portal.azure.com/#@/resource/...",
});
```

#### **File Storage**

```typescript
import { FileStorage } from "@cloud-diagrams/azure";

const files = new FileStorage("files-share", "Shared Files", {
  description: "Azure File Share",
  quota: "100 GB",
  url: "https://portal.azure.com/#@/resource/...",
});
```

#### **Queue Storage**

```typescript
import { QueueStorage } from "@cloud-diagrams/azure";

const queue = new QueueStorage("queue-messages", "Message Queue", {
  description: "Azure Queue Storage",
  url: "https://portal.azure.com/#@/resource/...",
});
```

### 🌐 Network Services

#### **Virtual Network**

```typescript
import { VirtualNetwork } from "@cloud-diagrams/azure";

const vnet = new VirtualNetwork("vnet-main", "Main VNet", {
  description: "Primary virtual network",
  addressSpace: "10.0.0.0/16",
  url: "https://portal.azure.com/#@/resource/...",
});
```

#### **Load Balancer**

```typescript
import { LoadBalancer } from "@cloud-diagrams/azure";

const lb = new LoadBalancer("lb-web", "Web Load Balancer", {
  description: "Standard Load Balancer",
  sku: "Standard",
  url: "https://portal.azure.com/#@/resource/...",
});
```

#### **Application Gateway**

```typescript
import { ApplicationGateway } from "@cloud-diagrams/azure";

const appgw = new ApplicationGateway("appgw-main", "App Gateway", {
  description: "Application Gateway v2",
  sku: "Standard_v2",
  url: "https://portal.azure.com/#@/resource/...",
});
```

### 🤖 AI & ML Services

#### **Cognitive Services**

```typescript
import { CognitiveServices } from "@cloud-diagrams/azure";

const cognitive = new CognitiveServices("cs-text", "Text Analytics", {
  description: "Text Analytics API",
  kind: "TextAnalytics",
  url: "https://portal.azure.com/#@/resource/...",
});
```

#### **Machine Learning**

```typescript
import { MachineLearning } from "@cloud-diagrams/azure";

const ml = new MachineLearning("ml-workspace", "ML Workspace", {
  description: "Azure ML Workspace",
  url: "https://portal.azure.com/#@/resource/...",
});
```

## 🏗️ Architecture Examples

### 3-Tier Web Application

```typescript
import { Diagram } from "@cloud-diagrams/core";
import {
  ApplicationGateway,
  VirtualMachine,
  SQLDatabase,
  BlobStorage,
  VirtualNetwork,
} from "@cloud-diagrams/azure";

const diagram = new Diagram("3-Tier Azure Web App", { direction: "TB" });

// Create Virtual Network
const vnet = diagram.addGroup("Production VNet", (group) => {
  // Web Tier
  const webTier = group.addGroup("Web Tier", (webGroup) => {
    webGroup.addNode(new VirtualMachine("vm-web1", "Web Server 1"));
    webGroup.addNode(new VirtualMachine("vm-web2", "Web Server 2"));
  });

  // App Tier
  const appTier = group.addGroup("Application Tier", (appGroup) => {
    appGroup.addNode(new VirtualMachine("vm-app1", "App Server 1"));
    appGroup.addNode(new VirtualMachine("vm-app2", "App Server 2"));
  });

  // Data Tier
  const dataTier = group.addGroup("Data Tier", (dataGroup) => {
    dataGroup.addNode(new SQLDatabase("sql-main", "Primary Database"));
  });
});

// External services
const appGateway = diagram.addNode(
  new ApplicationGateway("appgw-main", "App Gateway")
);
const storage = diagram.addNode(
  new BlobStorage("storage-assets", "Static Assets")
);

// Connections
diagram.connect(appGateway, "vm-web1", { label: "HTTPS" });
diagram.connect(appGateway, "vm-web2", { label: "HTTPS" });
diagram.connect("vm-web1", "vm-app1", { label: "API" });
diagram.connect("vm-web2", "vm-app2", { label: "API" });
diagram.connect("vm-app1", "sql-main", { label: "SQL" });
diagram.connect("vm-app2", "sql-main", { label: "SQL" });
diagram.connect("vm-web1", "storage-assets", { label: "CDN" });
diagram.connect("vm-web2", "storage-assets", { label: "CDN" });

await diagram.render("#container");
```

### Serverless Application

```typescript
import { Diagram } from "@cloud-diagrams/core";
import {
  AzureFunction,
  CosmosDB,
  BlobStorage,
  ApplicationGateway,
  QueueStorage,
} from "@cloud-diagrams/azure";

const diagram = new Diagram("Serverless Azure Application", {
  direction: "LR",
});

// API Gateway
const appGateway = diagram.addNode(
  new ApplicationGateway("appgw-api", "API Gateway")
);

// Functions
const userFunc = diagram.addNode(
  new AzureFunction("func-users", "User Service")
);
const orderFunc = diagram.addNode(
  new AzureFunction("func-orders", "Order Service")
);
const notifyFunc = diagram.addNode(
  new AzureFunction("func-notify", "Notification Service")
);

// Data stores
const userDb = diagram.addNode(new CosmosDB("cosmos-users", "User Database"));
const orderDb = diagram.addNode(
  new CosmosDB("cosmos-orders", "Order Database")
);
const fileStorage = diagram.addNode(
  new BlobStorage("storage-files", "File Storage")
);

// Queue
const queue = diagram.addNode(new QueueStorage("queue-orders", "Order Queue"));

// Connections
diagram.connect(appGateway, userFunc, { label: "User API" });
diagram.connect(appGateway, orderFunc, { label: "Order API" });
diagram.connect(userFunc, userDb, { label: "Read/Write" });
diagram.connect(orderFunc, orderDb, { label: "Read/Write" });
diagram.connect(orderFunc, queue, { label: "Enqueue" });
diagram.connect(queue, notifyFunc, { label: "Trigger" });
diagram.connect(userFunc, fileStorage, { label: "Upload" });

await diagram.render("#container");
```

## 🎨 Azure Styling & Themes

### Official Azure Colors

The Azure provider uses official Microsoft Azure colors and styling:

```typescript
const diagram = new Diagram("Azure Architecture", {
  theme: "azure", // Azure-specific theme
  colors: {
    primary: "#0078D4", // Azure Blue
    secondary: "#106EBE", // Azure Dark Blue
    accent: "#40E0D0", // Azure Teal
    background: "#F8F9FA", // Azure Light Gray
  },
});
```

### Azure Resource Groups

Organize resources using Azure Resource Group styling:

```typescript
const diagram = new Diagram("Azure Resources", { direction: "TB" });

const resourceGroup = diagram.addGroup("rg-production", {
  type: "resource-group",
  label: "Production Resource Group",
  region: "East US",
  styling: {
    color: "#0078D4",
    borderStyle: "dashed",
  },
});

resourceGroup.addNode(new VirtualMachine("vm-web", "Web Server"));
resourceGroup.addNode(new SQLDatabase("sql-db", "Database"));
```

## 📊 Service Categories

| Category     | Services                                              | Count | Description         |
| ------------ | ----------------------------------------------------- | ----- | ------------------- |
| **Compute**  | Virtual Machines, Functions, Container Instances, AKS | 4     | Computing resources |
| **Database** | SQL Database, Cosmos DB, MySQL, PostgreSQL            | 4     | Database services   |
| **Storage**  | Blob Storage, File Storage, Queue Storage             | 3     | Storage solutions   |
| **Network**  | Virtual Network, Load Balancer, Application Gateway   | 3     | Networking services |
| **AI/ML**    | Cognitive Services, Machine Learning                  | 2     | AI/ML services      |

## 🎯 Factory Functions

For convenience, all Azure services are available as factory functions:

```typescript
import * as Azure from "@cloud-diagrams/azure";

// Factory function usage
const vm = Azure.VirtualMachine("vm-1", "Web Server");
const db = Azure.SQLDatabase("sql-1", "Database");
const storage = Azure.BlobStorage("storage-1", "Files");

// Equivalent to:
const vm = new Azure.VirtualMachine("vm-1", "Web Server");
const db = new Azure.SQLDatabase("sql-1", "Database");
const storage = new Azure.BlobStorage("storage-1", "Files");
```

## 🔗 Integration Examples

### With React

```typescript
import React from "react";
import { DiagramRenderer } from "@cloud-diagrams/react";
import { Diagram } from "@cloud-diagrams/core";
import { VirtualMachine, SQLDatabase } from "@cloud-diagrams/azure";

const AzureDiagram: React.FC = () => {
  const diagram = new Diagram("Azure Web App");
  diagram.addNode(new VirtualMachine("vm-1", "Web Server"));
  diagram.addNode(new SQLDatabase("sql-1", "Database"));

  return <DiagramRenderer diagram={diagram} theme="azure" interactive={true} />;
};
```

### With CLI

```bash
# Initialize Azure project
cloud-diagrams init my-azure-app --provider azure --template 3tier

# Generate Azure architecture
cloud-diagrams generate src/azure-diagram.ts -o azure-architecture.svg

# List Azure services
cloud-diagrams list --provider azure --icons
```

## 📚 Additional Resources

- **[Azure Architecture Center](https://docs.microsoft.com/en-us/azure/architecture/)** - Official Azure architecture guidance
- **[Azure Icons](https://docs.microsoft.com/en-us/azure/architecture/icons/)** - Official Azure icon library
- **[Azure Well-Architected Framework](https://docs.microsoft.com/en-us/azure/architecture/framework/)** - Best practices
- **[Azure Resource Naming](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/naming-and-tagging)** - Naming conventions

## 🐛 Troubleshooting

### Common Issues

**Service not found:**

```typescript
// ❌ Incorrect
import { EC2 } from "@cloud-diagrams/azure"; // EC2 is AWS, not Azure

// ✅ Correct
import { VirtualMachine } from "@cloud-diagrams/azure";
```

**Missing Azure theme:**

```typescript
// Add Azure theme support
await diagram.render("#container", { theme: "azure" });
```

### Performance Tips

- Use factory functions for better tree-shaking
- Group related resources in Resource Groups
- Use meaningful service IDs for debugging
- Enable interactive mode selectively

---

**Need help with Azure services?** Check the [FAQ](../faq.md) or [open an issue](https://github.com/your-org/kloud_diagramming/issues).
