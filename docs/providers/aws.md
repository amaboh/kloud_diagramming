# 🟠 AWS Provider Documentation

> **Complete guide to using AWS services with Cloud Diagrams TypeScript**

The AWS provider offers comprehensive support for Amazon Web Services, including all major service categories with official AWS icons and styling.

## 📦 Installation

```bash
npm install @cloud-diagrams/aws
```

## 🚀 Quick Start

```typescript
import { Diagram } from "@cloud-diagrams/core";
import { EC2, RDS, S3, VPC } from "@cloud-diagrams/aws";

const diagram = new Diagram("AWS Architecture");
const vpc = diagram.addGroup("Production VPC", (group) => {
  group.addNode(new EC2("web", "Web Server"));
  group.addNode(new RDS("db", "Database"));
  group.addNode(new S3("storage", "File Storage"));
});

await diagram.render("#container");
```

## ☁️ Available Services

### 💻 Compute Services

#### EC2 - Elastic Compute Cloud

```typescript
import { EC2 } from "@cloud-diagrams/aws";

// Basic EC2 instance
const webServer = new EC2("web-1", "Web Server", {
  instanceType: "t3.medium",
  os: "Amazon Linux 2",
  url: "https://console.aws.amazon.com/ec2",
  description: "Primary web server running nginx",
});

// With custom styling
const appServer = new EC2("app-1", "Application Server", {
  instanceType: "m5.large",
  region: "us-east-1",
  availabilityZone: "us-east-1a",
  customStyles: {
    borderColor: "#ff6b6b",
    backgroundColor: "#f8f9fa",
  },
});
```

#### Lambda - Serverless Functions

```typescript
import { Lambda } from "@cloud-diagrams/aws";

const apiFunction = new Lambda("api-handler", "API Handler", {
  runtime: "nodejs18.x",
  memorySize: "512MB",
  timeout: "30s",
  url: "https://console.aws.amazon.com/lambda",
});

const processingFunction = new Lambda("data-processor", "Data Processor", {
  runtime: "python3.9",
  memorySize: "1GB",
  triggers: ["S3", "CloudWatch Events"],
});
```

#### ECS - Container Service

```typescript
import { ECS } from "@cloud-diagrams/aws";

const containerService = new ECS("web-service", "Web Service", {
  launchType: "FARGATE",
  cpu: "256",
  memory: "512",
  taskCount: 3,
});
```

### 🗄️ Database Services

#### RDS - Relational Database Service

```typescript
import { RDS } from "@cloud-diagrams/aws";

// Basic RDS instance
const database = new RDS("main-db", "Production Database", {
  engine: "mysql",
  version: "8.0",
  instanceClass: "db.t3.medium",
  multiAZ: true,
  url: "https://console.aws.amazon.com/rds",
});

// PostgreSQL with read replicas
const postgresMain = new RDS("postgres-main", "PostgreSQL Primary", {
  engine: "postgresql",
  version: "14.6",
  instanceClass: "db.r5.xlarge",
  storageType: "gp3",
  allocatedStorage: "100GB",
});

const postgresReplica = new RDS("postgres-replica", "Read Replica", {
  engine: "postgresql",
  replicaOf: "postgres-main",
  instanceClass: "db.r5.large",
});
```

#### DynamoDB - NoSQL Database

```typescript
import { DynamoDB } from "@cloud-diagrams/aws";

const userTable = new DynamoDB("user-table", "User Profiles", {
  partitionKey: "userId",
  sortKey: "timestamp",
  billingMode: "PAY_PER_REQUEST",
  globalSecondaryIndexes: ["email-index", "status-index"],
});

const sessionTable = new DynamoDB("session-table", "User Sessions", {
  partitionKey: "sessionId",
  ttl: "expires",
  pointInTimeRecovery: true,
});
```

### 💾 Storage Services

#### S3 - Simple Storage Service

```typescript
import { S3 } from "@cloud-diagrams/aws";

// Basic S3 bucket
const staticAssets = new S3("static-assets", "Static Website Assets", {
  bucketName: "my-app-static-assets",
  region: "us-east-1",
  versioning: true,
  url: "https://console.aws.amazon.com/s3",
});

// S3 with advanced features
const dataLake = new S3("data-lake", "Analytics Data Lake", {
  bucketName: "company-data-lake",
  storageClass: "INTELLIGENT_TIERING",
  encryption: "AES256",
  lifecycle: true,
  replication: true,
  accessLogging: true,
});
```

#### EFS - Elastic File System

```typescript
import { EFS } from "@cloud-diagrams/aws";

const sharedStorage = new EFS("shared-files", "Shared Application Files", {
  performanceMode: "generalPurpose",
  throughputMode: "provisioned",
  encrypted: true,
});
```

### 🌐 Network Services

#### VPC - Virtual Private Cloud

```typescript
import { VPC } from "@cloud-diagrams/aws";

// VPC as a group container
const productionVPC = diagram.addGroup("Production VPC", (vpc) => {
  // Public subnet
  const publicSubnet = vpc.addGroup("Public Subnet (10.0.1.0/24)", (subnet) => {
    subnet.addNode(new EC2("bastion", "Bastion Host"));
    subnet.addNode(new ALB("alb", "Load Balancer"));
  });

  // Private subnet
  const privateSubnet = vpc.addGroup(
    "Private Subnet (10.0.2.0/24)",
    (subnet) => {
      subnet.addNode(new EC2("app-1", "App Server 1"));
      subnet.addNode(new EC2("app-2", "App Server 2"));
      subnet.addNode(new RDS("db", "Database"));
    }
  );
});
```

#### Route53 - DNS Service

```typescript
import { Route53 } from "@cloud-diagrams/aws";

const dnsService = new Route53("dns", "DNS Management", {
  hostedZones: ["example.com", "api.example.com"],
  recordTypes: ["A", "CNAME", "MX"],
  healthChecks: true,
});
```

#### CloudFront - Content Delivery Network

```typescript
import { CloudFront } from "@cloud-diagrams/aws";

const cdn = new CloudFront("cdn", "Global CDN", {
  origins: ["s3-bucket", "alb-origin"],
  cacheBehaviors: ["default", "/api/*", "/static/*"],
  geoRestriction: false,
  wafEnabled: true,
});
```

#### ALB - Application Load Balancer

```typescript
import { ALB } from "@cloud-diagrams/aws";

const loadBalancer = new ALB("main-alb", "Application Load Balancer", {
  scheme: "internet-facing",
  targets: ["web-1", "web-2"],
  listeners: ["HTTP:80", "HTTPS:443"],
  healthCheck: "/health",
});
```

### 📊 Analytics & Big Data

#### Redshift - Data Warehouse

```typescript
import { Redshift } from "@cloud-diagrams/aws";

const dataWarehouse = new Redshift("dw", "Data Warehouse", {
  nodeType: "dc2.large",
  numberOfNodes: 3,
  database: "analytics",
  encrypted: true,
});
```

#### EMR - Elastic MapReduce

```typescript
import { EMR } from "@cloud-diagrams/aws";

const sparkCluster = new EMR("spark-cluster", "Spark Processing", {
  applications: ["Spark", "Hadoop"],
  instanceTypes: ["m5.xlarge", "m5.2xlarge"],
  autoScaling: true,
});
```

## 🏗️ Complete Architecture Examples

### 3-Tier Web Application

```typescript
import { Diagram } from "@cloud-diagrams/core";
import { EC2, RDS, S3, ALB, CloudFront } from "@cloud-diagrams/aws";

const diagram = new Diagram("3-Tier Web Application", {
  direction: "TB",
  theme: "aws",
});

// CDN Layer
const cdn = diagram.addNode(
  new CloudFront("cdn", "Global CDN", {
    description: "Content delivery and caching",
  })
);

// Load Balancer
const alb = diagram.addNode(
  new ALB("alb", "Application Load Balancer", {
    description: "Distributes traffic across web servers",
  })
);

// Web Tier
const webTier = diagram.addGroup("Web Tier", (group) => {
  group.addNode(
    new EC2("web-1", "Web Server 1", {
      instanceType: "t3.medium",
    })
  );
  group.addNode(
    new EC2("web-2", "Web Server 2", {
      instanceType: "t3.medium",
    })
  );
});

// Database Tier
const database = diagram.addNode(
  new RDS("db", "MySQL Database", {
    engine: "mysql",
    multiAZ: true,
    backupRetention: "7 days",
  })
);

// Storage
const storage = diagram.addNode(
  new S3("assets", "Static Assets", {
    description: "Images, CSS, JavaScript files",
  })
);

// Connections
diagram.connect(cdn, alb, { label: "HTTPS" });
diagram.connect(alb, webTier, { label: "HTTP/HTTPS" });
diagram.connect(webTier, database, { label: "SQL Queries" });
diagram.connect(webTier, storage, { label: "Static Files" });
diagram.connect(cdn, storage, { label: "Direct Access" });

await diagram.render("#container");
```

### Serverless Architecture

```typescript
import {
  Lambda,
  DynamoDB,
  S3,
  APIGateway,
  CloudWatch,
} from "@cloud-diagrams/aws";

const diagram = new Diagram("Serverless API", { direction: "LR" });

// API Gateway
const api = diagram.addNode(
  new APIGateway("api", "REST API", {
    description: "Public API endpoint",
  })
);

// Lambda Functions
const authFunction = diagram.addNode(
  new Lambda("auth", "Authentication", {
    runtime: "nodejs18.x",
    description: "User authentication and authorization",
  })
);

const dataFunction = diagram.addNode(
  new Lambda("data", "Data Processing", {
    runtime: "python3.9",
    description: "Business logic and data processing",
  })
);

// Database
const userTable = diagram.addNode(
  new DynamoDB("users", "User Table", {
    partitionKey: "userId",
  })
);

const dataTable = diagram.addNode(
  new DynamoDB("data", "Application Data", {
    partitionKey: "dataId",
    sortKey: "timestamp",
  })
);

// Storage
const uploads = diagram.addNode(
  new S3("uploads", "File Uploads", {
    description: "User uploaded files",
  })
);

// Monitoring
const monitoring = diagram.addNode(
  new CloudWatch("logs", "Monitoring", {
    description: "Logs and metrics",
  })
);

// Connections
diagram.connect(api, authFunction, { label: "/auth/*" });
diagram.connect(api, dataFunction, { label: "/data/*" });
diagram.connect(authFunction, userTable, { label: "User lookup" });
diagram.connect(dataFunction, dataTable, { label: "CRUD operations" });
diagram.connect(dataFunction, uploads, { label: "File operations" });
diagram.connect([authFunction, dataFunction], monitoring, { label: "Logs" });

await diagram.render("#container");
```

### Microservices with ECS

```typescript
import { ECS, RDS, Redis, ALB, VPC } from "@cloud-diagrams/aws";

const diagram = new Diagram("Microservices Architecture", { direction: "TB" });

// VPC Container
const vpc = diagram.addGroup("Production VPC", (vpcGroup) => {
  // Load Balancer
  const alb = vpcGroup.addNode(new ALB("alb", "Application Load Balancer"));

  // Microservices
  const userService = vpcGroup.addNode(
    new ECS("user-service", "User Service", {
      taskDefinition: "user-service:1",
      desiredCount: 3,
    })
  );

  const orderService = vpcGroup.addNode(
    new ECS("order-service", "Order Service", {
      taskDefinition: "order-service:1",
      desiredCount: 2,
    })
  );

  const paymentService = vpcGroup.addNode(
    new ECS("payment-service", "Payment Service", {
      taskDefinition: "payment-service:1",
      desiredCount: 2,
    })
  );

  // Databases
  const userDB = vpcGroup.addNode(
    new RDS("user-db", "User Database", {
      engine: "postgresql",
    })
  );

  const orderDB = vpcGroup.addNode(
    new RDS("order-db", "Order Database", {
      engine: "mysql",
    })
  );

  // Cache
  const cache = vpcGroup.addNode(
    new Redis("cache", "Redis Cache", {
      nodeType: "cache.t3.micro",
    })
  );

  // Connections
  diagram.connect(alb, [userService, orderService, paymentService], {
    label: "HTTP",
  });
  diagram.connect(userService, userDB, { label: "SQL" });
  diagram.connect(orderService, orderDB, { label: "SQL" });
  diagram.connect([userService, orderService], cache, { label: "Cache" });
  diagram.connect(orderService, paymentService, { label: "Payment API" });
});

await diagram.render("#container");
```

## 🎨 Styling and Customization

### Custom Styling

```typescript
import { EC2 } from "@cloud-diagrams/aws";

const webServer = new EC2("web", "Web Server", {
  customStyles: {
    backgroundColor: "#e3f2fd",
    borderColor: "#1976d2",
    borderWidth: "2px",
    borderStyle: "dashed",
    textColor: "#0d47a1",
  },
});
```

### Regional Styling

```typescript
// Different regions with color coding
const usEastServer = new EC2("us-east", "US East Server", {
  region: "us-east-1",
  customStyles: { backgroundColor: "#e8f5e8" },
});

const euWestServer = new EC2("eu-west", "EU West Server", {
  region: "eu-west-1",
  customStyles: { backgroundColor: "#fff3e0" },
});
```

## 📋 Service Reference Table

| Service         | Class Name   | Category    | Icon | Multi-AZ | Serverless |
| --------------- | ------------ | ----------- | ---- | -------- | ---------- |
| **EC2**         | `EC2`        | Compute     | ✅   | ❌       | ❌         |
| **Lambda**      | `Lambda`     | Compute     | ✅   | ✅       | ✅         |
| **ECS**         | `ECS`        | Compute     | ✅   | ✅       | ✅         |
| **RDS**         | `RDS`        | Database    | ✅   | ✅       | ❌         |
| **DynamoDB**    | `DynamoDB`   | Database    | ✅   | ✅       | ✅         |
| **S3**          | `S3`         | Storage     | ✅   | ✅       | ✅         |
| **EFS**         | `EFS`        | Storage     | ✅   | ✅       | ✅         |
| **VPC**         | `VPC`        | Network     | ✅   | ✅       | ❌         |
| **ALB**         | `ALB`        | Network     | ✅   | ✅       | ✅         |
| **CloudFront**  | `CloudFront` | Network     | ✅   | ✅       | ✅         |
| **Route53**     | `Route53`    | Network     | ✅   | ✅       | ✅         |
| **API Gateway** | `APIGateway` | Integration | ✅   | ✅       | ✅         |
| **SQS**         | `SQS`        | Integration | ✅   | ✅       | ✅         |
| **SNS**         | `SNS`        | Integration | ✅   | ✅       | ✅         |
| **CloudWatch**  | `CloudWatch` | Monitoring  | ✅   | ✅       | ✅         |

## 💡 Best Practices

### 1. Resource Naming

```typescript
// Good: Descriptive names with environment
const prodWebServer = new EC2("prod-web-01", "Production Web Server");
const stagingDB = new RDS("staging-mysql-01", "Staging MySQL Database");

// Avoid: Generic names
const server = new EC2("server1", "Server");
```

### 2. Grouping Resources

```typescript
// Group by environment or function
const productionEnv = diagram.addGroup("Production Environment", (prod) => {
  const webTier = prod.addGroup("Web Tier", (web) => {
    web.addNode(new EC2("web-1", "Web Server 1"));
    web.addNode(new EC2("web-2", "Web Server 2"));
  });

  const dataTier = prod.addGroup("Data Tier", (data) => {
    data.addNode(new RDS("db-primary", "Primary Database"));
    data.addNode(new RDS("db-replica", "Read Replica"));
  });
});
```

### 3. Connection Labels

```typescript
// Be specific about connection types and protocols
diagram.connect(webServer, database, {
  label: "MySQL (Port 3306)",
  color: "green",
  style: "solid",
});

diagram.connect(alb, webServer, {
  label: "HTTPS (Port 443)",
  color: "blue",
  style: "solid",
});
```

### 4. Metadata for Operations

```typescript
const webServer = new EC2("web-1", "Web Server", {
  region: "us-east-1",
  availabilityZone: "us-east-1a",
  instanceId: "i-1234567890abcdef0",
  instanceType: "t3.medium",
  securityGroups: ["web-sg", "ssh-sg"],
  url: "https://console.aws.amazon.com/ec2/v2/home#InstanceDetails:instanceId=i-1234567890abcdef0",
  description: "Primary web server running nginx and serving static content",
  tags: ["production", "web-tier", "nginx"],
  owner: "platform-team",
  costCenter: "engineering",
});
```

## 🔧 Advanced Features

### Dynamic Service Discovery

```typescript
// Automatically connect services based on tags
const services = diagram.getNodesByTag("web-tier");
const database = diagram.getNodeById("main-db");

services.forEach((service) => {
  diagram.connect(service, database, { label: "Database Connection" });
});
```

### Health Status Indicators

```typescript
const webServer = new EC2("web-1", "Web Server", {
  healthStatus: "healthy",
  customStyles: {
    borderColor: webServer.healthStatus === "healthy" ? "green" : "red",
  },
});
```

### Cost Estimation Display

```typescript
const expensiveDB = new RDS("big-db", "Analytics Database", {
  instanceClass: "db.r5.24xlarge",
  estimatedMonthlyCost: "$12,000",
  customStyles: {
    backgroundColor: "#ffebee", // Light red for expensive resources
  },
});
```

## 📚 What's Next?

- **[🔵 Azure Provider](./azure.md)** - Microsoft Azure services
- **[🟡 GCP Provider](./gcp.md)** - Google Cloud Platform services
- **[🌍 Multi-Cloud](./multi-cloud.md)** - Cross-provider architectures
- **[💻 CLI Tools](../cli/README.md)** - Command-line interface
- **[⚛️ React Integration](../react.md)** - Using with React applications

## 🆘 Need Help?

- **[❓ FAQ](../faq.md)** - Common AWS-related questions
- **[🐛 Troubleshooting](../troubleshooting.md)** - AWS-specific issues
- **💬 [GitHub Discussions](https://github.com/your-org/kloud_diagramming/discussions)** - Community support

**Happy AWS diagramming! 🚀**
