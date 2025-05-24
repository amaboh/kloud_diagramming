# 🟡 GCP Provider - Complete Service Library

> **Comprehensive Google Cloud Platform services for cloud architecture diagrams**

The GCP provider package (`@cloud-diagrams/gcp`) offers a complete collection of Google Cloud Platform services with official icons, proper TypeScript support, and consistent API design.

## 📦 Installation

```bash
npm install @cloud-diagrams/gcp @cloud-diagrams/core
```

## 🚀 Quick Start

```typescript
import { Diagram } from "@cloud-diagrams/core";
import { ComputeEngine, CloudSQL, CloudStorage } from "@cloud-diagrams/gcp";

const diagram = new Diagram("GCP Web Application", {
  direction: "TB",
  theme: "default",
});

// Add GCP services
const vm = diagram.addNode(
  new ComputeEngine("vm-1", "Web Server", {
    description: "e2-standard-2",
    machineType: "e2-standard-2",
    zone: "us-central1-a",
    url: "https://console.cloud.google.com/compute/instances/vm-1",
  })
);

const database = diagram.addNode(
  new CloudSQL("sql-1", "Database", {
    description: "PostgreSQL 14",
    databaseVersion: "POSTGRES_14",
    region: "us-central1",
    url: "https://console.cloud.google.com/sql/instances/sql-1",
  })
);

const storage = diagram.addNode(
  new CloudStorage("bucket-1", "File Storage", {
    description: "Standard Storage",
    storageClass: "STANDARD",
    location: "US",
    url: "https://console.cloud.google.com/storage/browser/bucket-1",
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

#### **Compute Engine**

```typescript
import { ComputeEngine } from "@cloud-diagrams/gcp";

const vm = new ComputeEngine("vm-web", "Web Server", {
  description: "e2-standard-4",
  machineType: "e2-standard-4",
  zone: "us-central1-a",
  os: "Ubuntu 22.04 LTS",
  url: "https://console.cloud.google.com/compute/instances/vm-web",
});
```

#### **Cloud Functions**

```typescript
import { CloudFunction } from "@cloud-diagrams/gcp";

const func = new CloudFunction("func-api", "API Functions", {
  description: "HTTP triggered functions",
  runtime: "nodejs18",
  region: "us-central1",
  url: "https://console.cloud.google.com/functions/list",
});
```

#### **Google Kubernetes Engine (GKE)**

```typescript
import { KubernetesEngine } from "@cloud-diagrams/gcp";

const gke = new KubernetesEngine("gke-cluster", "K8s Cluster", {
  description: "Managed Kubernetes cluster",
  nodeCount: 3,
  region: "us-central1",
  url: "https://console.cloud.google.com/kubernetes/list",
});
```

### 🗄️ Database Services

#### **Cloud SQL**

```typescript
import { CloudSQL } from "@cloud-diagrams/gcp";

const sqldb = new CloudSQL("sql-main", "Primary Database", {
  description: "PostgreSQL 14",
  databaseVersion: "POSTGRES_14",
  tier: "db-standard-2",
  region: "us-central1",
  url: "https://console.cloud.google.com/sql/instances/sql-main",
});
```

#### **Firestore**

```typescript
import { Firestore } from "@cloud-diagrams/gcp";

const firestore = new Firestore("firestore-docs", "Document Database", {
  description: "NoSQL document database",
  mode: "Native",
  location: "us-central",
  url: "https://console.cloud.google.com/firestore",
});
```

### 💾 Storage Services

#### **Cloud Storage**

```typescript
import { CloudStorage } from "@cloud-diagrams/gcp";

const bucket = new CloudStorage("bucket-files", "File Storage", {
  description: "Standard Cloud Storage",
  storageClass: "STANDARD",
  location: "US",
  url: "https://console.cloud.google.com/storage/browser/bucket-files",
});
```

### 🌐 Network Services

#### **VPC Network**

```typescript
import { VPCNetwork } from "@cloud-diagrams/gcp";

const vpc = new VPCNetwork("vpc-main", "Main VPC", {
  description: "Primary VPC network",
  mode: "custom",
  url: "https://console.cloud.google.com/networking/networks/list",
});
```

#### **Cloud Load Balancing**

```typescript
import { LoadBalancer } from "@cloud-diagrams/gcp";

const lb = new LoadBalancer("lb-web", "Web Load Balancer", {
  description: "HTTP(S) Load Balancer",
  type: "EXTERNAL",
  url: "https://console.cloud.google.com/net-services/loadbalancing/list",
});
```

## 🏗️ Architecture Examples

### 3-Tier Web Application

```typescript
import { Diagram } from "@cloud-diagrams/core";
import {
  LoadBalancer,
  ComputeEngine,
  CloudSQL,
  CloudStorage,
  VPCNetwork,
} from "@cloud-diagrams/gcp";

const diagram = new Diagram("3-Tier GCP Web App", { direction: "TB" });

// Create VPC Network
const vpc = diagram.addGroup("Production VPC", (group) => {
  // Web Tier
  const webTier = group.addGroup("Web Tier", (webGroup) => {
    webGroup.addNode(new ComputeEngine("vm-web1", "Web Server 1"));
    webGroup.addNode(new ComputeEngine("vm-web2", "Web Server 2"));
  });

  // App Tier
  const appTier = group.addGroup("Application Tier", (appGroup) => {
    appGroup.addNode(new ComputeEngine("vm-app1", "App Server 1"));
    appGroup.addNode(new ComputeEngine("vm-app2", "App Server 2"));
  });

  // Data Tier
  const dataTier = group.addGroup("Data Tier", (dataGroup) => {
    dataGroup.addNode(new CloudSQL("sql-main", "Primary Database"));
  });
});

// External services
const loadBalancer = diagram.addNode(
  new LoadBalancer("lb-main", "Load Balancer")
);
const storage = diagram.addNode(
  new CloudStorage("bucket-assets", "Static Assets")
);

// Connections
diagram.connect(loadBalancer, "vm-web1", { label: "HTTPS" });
diagram.connect(loadBalancer, "vm-web2", { label: "HTTPS" });
diagram.connect("vm-web1", "vm-app1", { label: "API" });
diagram.connect("vm-web2", "vm-app2", { label: "API" });
diagram.connect("vm-app1", "sql-main", { label: "SQL" });
diagram.connect("vm-app2", "sql-main", { label: "SQL" });
diagram.connect("vm-web1", "bucket-assets", { label: "CDN" });
diagram.connect("vm-web2", "bucket-assets", { label: "CDN" });

await diagram.render("#container");
```

### Serverless Application

```typescript
import { Diagram } from "@cloud-diagrams/core";
import {
  CloudFunction,
  Firestore,
  CloudStorage,
  LoadBalancer,
} from "@cloud-diagrams/gcp";

const diagram = new Diagram("Serverless GCP Application", { direction: "LR" });

// Load Balancer
const loadBalancer = diagram.addNode(
  new LoadBalancer("lb-api", "API Load Balancer")
);

// Functions
const userFunc = diagram.addNode(
  new CloudFunction("func-users", "User Service")
);
const orderFunc = diagram.addNode(
  new CloudFunction("func-orders", "Order Service")
);
const notifyFunc = diagram.addNode(
  new CloudFunction("func-notify", "Notification Service")
);

// Data stores
const userDb = diagram.addNode(
  new Firestore("firestore-users", "User Database")
);
const orderDb = diagram.addNode(
  new Firestore("firestore-orders", "Order Database")
);
const fileStorage = diagram.addNode(
  new CloudStorage("bucket-files", "File Storage")
);

// Connections
diagram.connect(loadBalancer, userFunc, { label: "User API" });
diagram.connect(loadBalancer, orderFunc, { label: "Order API" });
diagram.connect(userFunc, userDb, { label: "Read/Write" });
diagram.connect(orderFunc, orderDb, { label: "Read/Write" });
diagram.connect(orderFunc, notifyFunc, { label: "Trigger" });
diagram.connect(userFunc, fileStorage, { label: "Upload" });

await diagram.render("#container");
```

### Data Pipeline

```typescript
import { Diagram } from "@cloud-diagrams/core";
import {
  CloudStorage,
  CloudFunction,
  BigQuery,
  DataFlow,
  ComputeEngine,
} from "@cloud-diagrams/gcp";

const diagram = new Diagram("GCP Data Pipeline", { direction: "LR" });

// Data Sources
const sources = diagram.addGroup("Data Sources", (group) => {
  group.addNode(new CloudStorage("bucket-raw", "Raw Data"));
  group.addNode(new CloudFunction("func-ingest", "Data Ingestion"));
});

// Processing
const processing = diagram.addGroup("Processing", (group) => {
  group.addNode(new DataFlow("dataflow-etl", "ETL Pipeline"));
  group.addNode(new ComputeEngine("vm-analytics", "Analytics Engine"));
});

// Storage
const warehouse = diagram.addNode(
  new BigQuery("bq-warehouse", "Data Warehouse")
);

// Connections
diagram.connect("func-ingest", "bucket-raw", { label: "Store" });
diagram.connect("bucket-raw", "dataflow-etl", { label: "Process" });
diagram.connect("dataflow-etl", "bq-warehouse", { label: "Load" });
diagram.connect("vm-analytics", "bq-warehouse", { label: "Query" });

await diagram.render("#container");
```

## 🎨 GCP Styling & Themes

### Official Google Cloud Colors

The GCP provider uses official Google Cloud colors and styling:

```typescript
const diagram = new Diagram("GCP Architecture", {
  theme: "gcp", // GCP-specific theme
  colors: {
    primary: "#4285F4", // Google Blue
    secondary: "#34A853", // Google Green
    accent: "#FBBC04", // Google Yellow
    error: "#EA4335", // Google Red
    background: "#FFFFFF", // Clean White
  },
});
```

### GCP Projects & Regions

Organize resources using GCP Project and Region styling:

```typescript
const diagram = new Diagram("GCP Resources", { direction: "TB" });

const project = diagram.addGroup("my-gcp-project", {
  type: "project",
  label: "Production Project",
  projectId: "my-company-prod",
  styling: {
    color: "#4285F4",
    borderStyle: "solid",
  },
});

const region = project.addGroup("us-central1", {
  type: "region",
  label: "US Central 1",
  styling: {
    color: "#34A853",
    borderStyle: "dashed",
  },
});

region.addNode(new ComputeEngine("vm-web", "Web Server"));
region.addNode(new CloudSQL("sql-db", "Database"));
```

## 📊 Service Categories

| Category      | Services                             | Count | Description         |
| ------------- | ------------------------------------ | ----- | ------------------- |
| **Compute**   | Compute Engine, Cloud Functions, GKE | 3     | Computing resources |
| **Database**  | Cloud SQL, Firestore                 | 2     | Database services   |
| **Storage**   | Cloud Storage                        | 1     | Storage solutions   |
| **Network**   | VPC Network, Load Balancer           | 2     | Networking services |
| **Analytics** | BigQuery, DataFlow                   | 2     | Data analytics      |

## 🎯 Factory Functions

For convenience, all GCP services are available as factory functions:

```typescript
import * as GCP from "@cloud-diagrams/gcp";

// Factory function usage
const vm = GCP.ComputeEngine("vm-1", "Web Server");
const db = GCP.CloudSQL("sql-1", "Database");
const storage = GCP.CloudStorage("bucket-1", "Files");

// Equivalent to:
const vm = new GCP.ComputeEngine("vm-1", "Web Server");
const db = new GCP.CloudSQL("sql-1", "Database");
const storage = new GCP.CloudStorage("bucket-1", "Files");
```

## 🔗 Integration Examples

### With React

```typescript
import React from "react";
import { DiagramRenderer } from "@cloud-diagrams/react";
import { Diagram } from "@cloud-diagrams/core";
import { ComputeEngine, CloudSQL } from "@cloud-diagrams/gcp";

const GCPDiagram: React.FC = () => {
  const diagram = new Diagram("GCP Web App");
  diagram.addNode(new ComputeEngine("vm-1", "Web Server"));
  diagram.addNode(new CloudSQL("sql-1", "Database"));

  return <DiagramRenderer diagram={diagram} theme="gcp" interactive={true} />;
};
```

### With CLI

```bash
# Initialize GCP project
cloud-diagrams init my-gcp-app --provider gcp --template 3tier

# Generate GCP architecture
cloud-diagrams generate src/gcp-diagram.ts -o gcp-architecture.svg

# List GCP services
cloud-diagrams list --provider gcp --icons
```

## 📚 Additional Resources

- **[Google Cloud Architecture Center](https://cloud.google.com/architecture)** - Official GCP architecture guidance
- **[Google Cloud Icons](https://cloud.google.com/icons)** - Official GCP icon library
- **[Well-Architected Framework](https://cloud.google.com/architecture/framework)** - Best practices
- **[Resource Naming](https://cloud.google.com/resource-manager/docs/creating-managing-projects)** - Naming conventions

## 🐛 Troubleshooting

### Common Issues

**Service not found:**

```typescript
// ❌ Incorrect
import { EC2 } from "@cloud-diagrams/gcp"; // EC2 is AWS, not GCP

// ✅ Correct
import { ComputeEngine } from "@cloud-diagrams/gcp";
```

**Missing GCP theme:**

```typescript
// Add GCP theme support
await diagram.render("#container", { theme: "gcp" });
```

### Performance Tips

- Use factory functions for better tree-shaking
- Group related resources in Projects and Regions
- Use meaningful service IDs for debugging
- Enable interactive mode selectively

### GCP-Specific Considerations

- **Project Hierarchy**: Organize resources within projects
- **Regional Resources**: Consider region-specific services
- **IAM & Security**: Use service accounts in metadata
- **Billing**: Include cost-center information in descriptions

---

**Need help with GCP services?** Check the [FAQ](../faq.md) or [open an issue](https://github.com/your-org/kloud_diagramming/issues).
