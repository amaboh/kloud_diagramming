# 🟠 AWS Provider Documentation

Complete reference for Amazon Web Services (AWS) integration with Cloud Diagrams TypeScript.

## 📦 Installation

```bash
npm install @cloud-diagrams/core @cloud-diagrams/aws
```

## 🚀 Quick Import

```typescript
import { Diagram } from '@cloud-diagrams/core';
import {
  // Compute
  EC2,
  Lambda,
  ECS,
  Fargate,
  // Database
  RDS,
  DynamoDB,
  Aurora,
  ElastiCache,
  // Storage
  S3,
  EFS,
  EBS,
  // Network
  VPC,
  ALB,
  CloudFront,
  Route53,
  // Analytics
  Kinesis,
  EMR,
  Redshift,
  // Security
  IAM,
  KMS,
  WAF,
} from '@cloud-diagrams/aws';
```

## 🖥️ Compute Services

### EC2 - Elastic Compute Cloud

```typescript
import { EC2 } from '@cloud-diagrams/aws';

// Basic EC2 instance
const webServer = new EC2('web-server', 'Web Server', {
  instanceType: 't3.medium',
  availabilityZone: 'us-east-1a',
  url: 'https://console.aws.amazon.com/ec2',
});

// EC2 with detailed configuration
const appServer = new EC2('app-server', 'Application Server', {
  instanceType: 'm5.large',
  availabilityZone: 'us-east-1b',
  description: 'Primary application server',
  tags: ['production', 'app-tier'],
  metadata: {
    cpu: '2 vCPU',
    memory: '8 GB',
    storage: 'EBS Optimized',
  },
});
```

### Lambda - Serverless Functions

```typescript
import { Lambda } from '@cloud-diagrams/aws';

// API Gateway Lambda
const apiHandler = new Lambda('api-handler', 'API Handler', {
  runtime: 'nodejs18.x',
  timeout: 30,
  memorySize: 512,
  description: 'Processes API requests',
});

// Event-driven Lambda
const processor = new Lambda('event-processor', 'Event Processor', {
  runtime: 'python3.9',
  timeout: 300,
  memorySize: 1024,
  trigger: 'S3 Event',
  description: 'Processes uploaded files',
});
```

### ECS - Elastic Container Service

```typescript
import { ECS, Fargate } from '@cloud-diagrams/aws';

// ECS Service
const webService = new ECS('web-service', 'Web Service', {
  serviceName: 'nginx-web',
  taskDefinition: 'web-task:1',
  desiredCount: 3,
  cluster: 'production-cluster',
});

// Fargate Service (serverless containers)
const apiService = new Fargate('api-service', 'API Service', {
  serviceName: 'api-backend',
  cpu: '256',
  memory: '512',
  desiredCount: 2,
});
```

## 🗄️ Database Services

### RDS - Relational Database Service

```typescript
import { RDS, Aurora } from '@cloud-diagrams/aws';

// MySQL RDS Instance
const database = new RDS('main-db', 'Main Database', {
  engine: 'MySQL',
  version: '8.0.35',
  instanceClass: 'db.t3.micro',
  storage: '20 GB',
  multiAZ: true,
  backupRetention: 7,
});

// Aurora Cluster
const cluster = new Aurora('aurora-cluster', 'Aurora Cluster', {
  engine: 'aurora-mysql',
  version: '5.7.mysql_aurora.2.12.0',
  instanceClass: 'db.r5.large',
  instances: 2,
  description: 'High-performance database cluster',
});
```

### DynamoDB - NoSQL Database

```typescript
import { DynamoDB } from '@cloud-diagrams/aws';

// DynamoDB Table
const userTable = new DynamoDB('users-table', 'Users Table', {
  tableName: 'Users',
  partitionKey: 'userId',
  sortKey: 'timestamp',
  billingMode: 'PAY_PER_REQUEST',
  gsi: ['email-index', 'username-index'],
});

// DynamoDB with complex configuration
const sessionTable = new DynamoDB('sessions', 'Session Store', {
  tableName: 'UserSessions',
  partitionKey: 'sessionId',
  billingMode: 'PROVISIONED',
  readCapacity: 100,
  writeCapacity: 50,
  ttl: {
    enabled: true,
    attribute: 'expiresAt',
  },
});
```

## 💾 Storage Services

### S3 - Simple Storage Service

```typescript
import { S3 } from '@cloud-diagrams/aws';

// Standard S3 Bucket
const assetsBucket = new S3('assets-bucket', 'Static Assets', {
  bucketName: 'myapp-static-assets',
  versioning: true,
  encryption: 'AES256',
  publicAccess: false,
});

// S3 with CloudFront
const cdnBucket = new S3('cdn-bucket', 'CDN Origin', {
  bucketName: 'myapp-cdn-origin',
  storageClass: 'STANDARD',
  lifecycle: {
    transitions: [
      { days: 30, storageClass: 'STANDARD_IA' },
      { days: 90, storageClass: 'GLACIER' },
    ],
  },
});
```

### EFS - Elastic File System

```typescript
import { EFS } from '@cloud-diagrams/aws';

const sharedStorage = new EFS('shared-storage', 'Shared File System', {
  performanceMode: 'generalPurpose',
  throughputMode: 'provisioned',
  encrypted: true,
  backupPolicy: 'ENABLED',
});
```

## 🌐 Network Services

### VPC - Virtual Private Cloud

```typescript
import { VPC, Subnet, IGW, NAT } from '@cloud-diagrams/aws';

// VPC with subnets
const vpc = new VPC('main-vpc', 'Production VPC', {
  cidrBlock: '10.0.0.0/16',
  region: 'us-east-1',
  enableDnsHostnames: true,
  enableDnsSupport: true,
});

// Public Subnet
const publicSubnet = new Subnet('public-subnet', 'Public Subnet', {
  cidrBlock: '10.0.1.0/24',
  availabilityZone: 'us-east-1a',
  mapPublicIp: true,
});

// Private Subnet
const privateSubnet = new Subnet('private-subnet', 'Private Subnet', {
  cidrBlock: '10.0.2.0/24',
  availabilityZone: 'us-east-1b',
  mapPublicIp: false,
});
```

### Load Balancers

```typescript
import { ALB, NLB, ELB } from '@cloud-diagrams/aws';

// Application Load Balancer
const loadBalancer = new ALB('web-lb', 'Web Load Balancer', {
  scheme: 'internet-facing',
  type: 'application',
  listeners: [
    { port: 80, protocol: 'HTTP' },
    { port: 443, protocol: 'HTTPS' },
  ],
  targetGroups: ['web-servers', 'api-servers'],
});

// Network Load Balancer
const nlb = new NLB('tcp-lb', 'TCP Load Balancer', {
  scheme: 'internal',
  type: 'network',
  listeners: [{ port: 3306, protocol: 'TCP' }],
});
```

### CloudFront - CDN

```typescript
import { CloudFront } from '@cloud-diagrams/aws';

const cdn = new CloudFront('global-cdn', 'Global CDN', {
  origins: ['s3-bucket.amazonaws.com'],
  cacheSettings: {
    defaultTTL: 86400,
    maxTTL: 31536000,
    minTTL: 0,
  },
  geoRestriction: {
    restrictionType: 'whitelist',
    locations: ['US', 'CA', 'GB'],
  },
});
```

## 📊 Analytics Services

### Kinesis - Real-time Data Streaming

```typescript
import {
  Kinesis,
  KinesisFirehose,
  KinesisAnalytics,
} from '@cloud-diagrams/aws';

// Kinesis Data Stream
const dataStream = new Kinesis('event-stream', 'Event Stream', {
  streamName: 'user-events',
  shardCount: 4,
  retentionPeriod: 24,
  encryptionType: 'KMS',
});

// Kinesis Data Firehose
const firehose = new KinesisFirehose('data-firehose', 'Data Firehose', {
  deliveryStreamName: 'events-to-s3',
  destination: 'S3',
  bufferSize: 5,
  bufferInterval: 300,
});
```

### EMR - Elastic MapReduce

```typescript
import { EMR } from '@cloud-diagrams/aws';

const cluster = new EMR('analytics-cluster', 'Analytics Cluster', {
  releaseLabel: 'emr-6.15.0',
  applications: ['Spark', 'Hadoop', 'Hive'],
  masterInstanceType: 'm5.xlarge',
  coreInstanceType: 'm5.large',
  coreInstanceCount: 4,
});
```

## 🏗️ Complete Architecture Examples

### 3-Tier Web Application

```typescript
import { Diagram } from '@cloud-diagrams/core';
import { VPC, ALB, EC2, RDS, S3, CloudFront } from '@cloud-diagrams/aws';

const diagram = new Diagram('3-Tier Web Application', {
  direction: 'TB',
  theme: 'default',
});

// Network Layer
const vpc = diagram.addGroup('Production VPC', { type: 'vpc' });

// CDN Layer
const cdn = diagram.addNode(new CloudFront('cdn', 'CloudFront CDN'));

// Load Balancer Layer
const alb = vpc.addNode(new ALB('web-lb', 'Application Load Balancer'));

// Web Tier
const webTier = vpc.addGroup('Web Tier');
const web1 = webTier.addNode(new EC2('web-1', 'Web Server 1'));
const web2 = webTier.addNode(new EC2('web-2', 'Web Server 2'));

// App Tier
const appTier = vpc.addGroup('Application Tier');
const app1 = appTier.addNode(new EC2('app-1', 'App Server 1'));
const app2 = appTier.addNode(new EC2('app-2', 'App Server 2'));

// Database Tier
const dbTier = vpc.addGroup('Database Tier');
const database = dbTier.addNode(new RDS('db', 'Primary Database'));

// Storage
const storage = diagram.addNode(new S3('assets', 'Static Assets'));

// Connections
diagram.connect(cdn, alb, { label: 'HTTPS' });
diagram.connect(alb, web1, { label: 'HTTP' });
diagram.connect(alb, web2, { label: 'HTTP' });
diagram.connect(web1, app1, { label: 'API' });
diagram.connect(web2, app2, { label: 'API' });
diagram.connect(app1, database, { label: 'SQL' });
diagram.connect(app2, database, { label: 'SQL' });
diagram.connect(cdn, storage, { label: 'Origin' });

await diagram.render('#diagram-container');
```

### Serverless Architecture

```typescript
import { Diagram } from '@cloud-diagrams/core';
import { CloudFront, S3, Lambda, DynamoDB, Kinesis } from '@cloud-diagrams/aws';

const diagram = new Diagram('Serverless Architecture', {
  direction: 'LR',
  theme: 'default',
});

// Frontend
const spa = diagram.addNode(new S3('spa-bucket', 'SPA Frontend'));
const cdn = diagram.addNode(new CloudFront('spa-cdn', 'Global CDN'));

// API Layer
const apiGateway = diagram.addNode(new Lambda('api-gateway', 'API Gateway'));
const authHandler = diagram.addNode(new Lambda('auth', 'Auth Handler'));
const userHandler = diagram.addNode(new Lambda('users', 'User Handler'));
const orderHandler = diagram.addNode(new Lambda('orders', 'Order Handler'));

// Data Layer
const userTable = diagram.addNode(new DynamoDB('users', 'Users Table'));
const orderTable = diagram.addNode(new DynamoDB('orders', 'Orders Table'));

// Event Processing
const eventStream = diagram.addNode(new Kinesis('events', 'Event Stream'));
const eventProcessor = diagram.addNode(
  new Lambda('processor', 'Event Processor')
);

// Connections
diagram.connect(cdn, spa, { label: 'Origin' });
diagram.connect(spa, apiGateway, { label: 'API Calls' });
diagram.connect(apiGateway, authHandler, { label: 'Auth' });
diagram.connect(apiGateway, userHandler, { label: 'Users' });
diagram.connect(apiGateway, orderHandler, { label: 'Orders' });
diagram.connect(userHandler, userTable, { label: 'Read/Write' });
diagram.connect(orderHandler, orderTable, { label: 'Read/Write' });
diagram.connect(orderHandler, eventStream, { label: 'Events' });
diagram.connect(eventStream, eventProcessor, { label: 'Process' });

await diagram.render('#diagram-container');
```

### Microservices Architecture

```typescript
import { Diagram } from '@cloud-diagrams/core';
import { VPC, ALB, ECS, RDS, ElastiCache, Kinesis } from '@cloud-diagrams/aws';

const diagram = new Diagram('Microservices Architecture', {
  direction: 'TB',
  theme: 'default',
});

// Network
const vpc = diagram.addGroup('Production VPC', { type: 'vpc' });
const alb = vpc.addNode(new ALB('api-gateway', 'API Gateway'));

// Services
const services = vpc.addGroup('Microservices');
const userService = services.addNode(new ECS('user-service', 'User Service'));
const orderService = services.addNode(
  new ECS('order-service', 'Order Service')
);
const paymentService = services.addNode(
  new ECS('payment-service', 'Payment Service')
);
const notificationService = services.addNode(
  new ECS('notification-service', 'Notification Service')
);

// Data Layer
const dataLayer = vpc.addGroup('Data Layer');
const userDb = dataLayer.addNode(new RDS('user-db', 'User Database'));
const orderDb = dataLayer.addNode(new RDS('order-db', 'Order Database'));
const cache = dataLayer.addNode(new ElastiCache('cache', 'Redis Cache'));

// Event Processing
const eventBus = diagram.addNode(new Kinesis('event-bus', 'Event Bus'));

// Connections
diagram.connect(alb, userService, { label: 'HTTP' });
diagram.connect(alb, orderService, { label: 'HTTP' });
diagram.connect(alb, paymentService, { label: 'HTTP' });

diagram.connect(userService, userDb, { label: 'SQL' });
diagram.connect(orderService, orderDb, { label: 'SQL' });
diagram.connect(userService, cache, { label: 'Cache' });
diagram.connect(orderService, cache, { label: 'Cache' });

diagram.connect(orderService, eventBus, { label: 'Events' });
diagram.connect(paymentService, eventBus, { label: 'Events' });
diagram.connect(eventBus, notificationService, { label: 'Process' });

await diagram.render('#diagram-container');
```

## 🎨 Styling & Customization

### Custom Node Styling

```typescript
// Custom EC2 with styling
const webServer = new EC2('web', 'Web Server', {
  style: {
    backgroundColor: '#ff9800',
    borderColor: '#f57c00',
    textColor: '#ffffff',
  },
  icon: {
    size: 64,
    color: '#ffffff',
  },
});
```

### Group Styling

```typescript
// VPC with custom styling
const vpc = diagram.addGroup('Production VPC', {
  type: 'vpc',
  style: {
    backgroundColor: '#e3f2fd',
    borderColor: '#1976d2',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
});
```

## 🔧 Advanced Configuration

### Connection Styling

```typescript
// Different connection types
diagram.connect(webServer, database, {
  label: 'SQL Queries',
  style: 'solid',
  color: '#4caf50',
  width: 2,
});

diagram.connect(webServer, cache, {
  label: 'Cache Lookup',
  style: 'dashed',
  color: '#ff9800',
  width: 1,
});
```

### Metadata & Tags

```typescript
const server = new EC2('server', 'Production Server', {
  tags: ['production', 'web-tier', 'critical'],
  metadata: {
    environment: 'production',
    team: 'platform',
    cost_center: 'engineering',
    backup_policy: 'daily',
  },
  monitoring: {
    cloudwatch: true,
    alarms: ['high-cpu', 'low-disk-space'],
    dashboard: 'production-overview',
  },
});
```

## 📋 Service Reference

### Complete Service List

| Category        | Services                                                |
| --------------- | ------------------------------------------------------- |
| **Compute**     | EC2, Lambda, ECS, Fargate, Batch, Lightsail             |
| **Database**    | RDS, DynamoDB, Aurora, ElastiCache, DocumentDB, Neptune |
| **Storage**     | S3, EFS, EBS, FSx, Storage Gateway                      |
| **Network**     | VPC, ALB, NLB, ELB, CloudFront, Route53, API Gateway    |
| **Analytics**   | Kinesis, EMR, Redshift, QuickSight, Athena, Glue        |
| **Security**    | IAM, KMS, WAF, Shield, GuardDuty, Inspector             |
| **Monitoring**  | CloudWatch, X-Ray, CloudTrail, Config                   |
| **Integration** | SQS, SNS, EventBridge, Step Functions                   |

## 💡 Best Practices

1. **Consistent Naming**: Use descriptive, consistent names for resources
2. **Group Organization**: Use VPCs and subnets to organize services logically
3. **Tagging Strategy**: Use tags for environment, team, and cost tracking
4. **Security Groups**: Represent security boundaries with groups
5. **Documentation**: Include descriptions and metadata for complex services

## 🔗 Related Documentation

- **[Quick Start Guide](../quick-start.md)** - Get started quickly
- **[Grouping Guide](../grouping.md)** - Organizing services with groups
- **[Theming Guide](../theming.md)** - Customizing visual appearance
- **[Export Guide](../export-import.md)** - Saving and sharing diagrams

---

**Need Help?**

- 📚 [Browse Documentation](../README.md)
- 💬 [Ask Questions](https://github.com/your-org/kloud_diagramming/discussions)
- 🐛 [Report Issues](https://github.com/your-org/kloud_diagramming/issues)
