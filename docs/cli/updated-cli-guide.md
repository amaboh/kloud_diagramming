# Cloud Diagrams CLI - Updated Guide

> **⚠️ Current Status**: The CLI package has some technical issues that need to be resolved. This guide shows the intended functionality and fixes needed.

## 🔧 Current Issues & Fixes Needed

### 1. Module Format Issues
- **Problem**: CLI built as ES modules but missing `"type": "module"` in package.json
- **Fix Applied**: Added `"type": "module"` to package.json
- **Status**: ✅ FIXED

### 2. Build Configuration Issues  
- **Problem**: Rollup config using ES format causing Node.js compatibility issues
- **Fix Applied**: Changed format from 'es' to 'cjs' in rollup.config.js
- **Status**: ✅ FIXED

### 3. TypeScript API Mismatches
- **Problem**: CLI expects methods like `getName()`, `getNodes()`, `getConnections()` that don't exist in core
- **Status**: ⚠️ NEEDS CORE PACKAGE UPDATE

## 🚀 Installation (Once Fixed)

```bash
# Install globally
npm install -g @cloud-diagrams/cli

# Or use locally
npm install @cloud-diagrams/cli
npx cloud-diagrams --help
```

## 📋 Available Commands

### `cloud-diagrams init`
Initialize a new diagram project

```bash
# Basic initialization
cloud-diagrams init my-project

# With options
cloud-diagrams init my-project \
  --provider aws \
  --template microservices \
  --typescript \
  --examples \
  --git \
  --install
```

**Options:**
- `--provider <provider>`: Cloud provider (aws|azure|gcp|multi) [default: aws]
- `--template <template>`: Project template (basic|3tier|microservices|pipeline) [default: basic]
- `--typescript`: Use TypeScript (default)
- `--javascript`: Use JavaScript instead of TypeScript
- `--examples`: Include example diagrams
- `--git`: Initialize git repository
- `--install`: Install dependencies automatically

### `cloud-diagrams generate`
Generate diagrams from code files

```bash
# Basic generation
cloud-diagrams generate src/diagram.ts

# With output options
cloud-diagrams generate src/diagram.ts \
  --output diagrams/architecture.svg \
  --format svg \
  --width 1200 \
  --height 800

# Watch mode
cloud-diagrams generate src/diagram.ts --watch

# Multiple formats
cloud-diagrams generate src/diagram.ts --format png --width 1920 --height 1080
```

**Options:**
- `--output <file>`: Output file path
- `--format <format>`: Output format (svg, png, pdf, json) [default: svg]
- `--width <pixels>`: Image width for PNG/PDF [default: 1200]
- `--height <pixels>`: Image height for PNG/PDF [default: 800]
- `--theme <theme>`: Diagram theme (default, dark, light) [default: default]
- `--background <color>`: Background color for PNG/PDF [default: white]
- `--watch`: Watch for file changes and regenerate
- `--interactive`: Enable interactive features in SVG
- `--no-validation`: Skip diagram validation
- `--verbose`: Verbose output

### `cloud-diagrams list`
List available cloud services

```bash
# List all services
cloud-diagrams list

# List by provider
cloud-diagrams list --provider aws
cloud-diagrams list --provider azure
cloud-diagrams list --provider gcp

# List by category
cloud-diagrams list --category compute
cloud-diagrams list --category storage
cloud-diagrams list --category database

# Search services
cloud-diagrams list --search lambda
cloud-diagrams list --search "virtual machine"
```

**Options:**
- `--provider <provider>`: Filter by cloud provider
- `--category <category>`: Filter by service category
- `--search <term>`: Search services by name or description
- `--json`: Output as JSON
- `--detailed`: Show detailed service information

### `cloud-diagrams validate`
Validate diagram files

```bash
# Validate single file
cloud-diagrams validate src/diagram.ts

# Validate multiple files
cloud-diagrams validate src/**/*.ts

# Validate with specific rules
cloud-diagrams validate src/diagram.ts \
  --strict \
  --check-connections \
  --check-icons
```

**Options:**
- `--strict`: Enable strict validation mode
- `--check-connections`: Validate all connections
- `--check-icons`: Verify icon availability
- `--json`: Output results as JSON
- `--fix`: Attempt to fix common issues

### `cloud-diagrams export`
Export diagrams to various formats

```bash
# Export to SVG
cloud-diagrams export src/diagram.ts --format svg

# Export to PNG with custom dimensions
cloud-diagrams export src/diagram.ts \
  --format png \
  --width 1920 \
  --height 1080 \
  --quality 0.9

# Export to PDF
cloud-diagrams export src/diagram.ts \
  --format pdf \
  --page-size A4 \
  --orientation landscape

# Batch export
cloud-diagrams export src/**/*.ts --format svg --output-dir exports/
```

**Options:**
- `--format <format>`: Export format (svg, png, pdf, json)
- `--output <file>`: Output file path
- `--output-dir <dir>`: Output directory for batch exports
- `--width <pixels>`: Image width
- `--height <pixels>`: Image height
- `--quality <number>`: Image quality (0-1) for PNG
- `--page-size <size>`: PDF page size (A4, A3, Letter, etc.)
- `--orientation <orientation>`: PDF orientation (portrait, landscape)

## 📁 Project Templates

### Basic Template
Simple single-cloud architecture

```typescript
// src/diagram.ts
import { Diagram, EC2, S3, RDS } from '@cloud-diagrams/aws';

const diagram = new Diagram('Basic AWS Architecture');

const web = new EC2('web', 'Web Server');
const db = new RDS('db', 'Database');
const storage = new S3('storage', 'Storage');

diagram.addNode(web);
diagram.addNode(db);
diagram.addNode(storage);

diagram.rightShift([web], [db, storage]);

export default diagram;
```

### 3-Tier Template
Classic 3-tier web application

```typescript
// src/diagram.ts
import { Diagram, ELB, EC2, RDS, S3 } from '@cloud-diagrams/aws';

const diagram = new Diagram('3-Tier Architecture');

// Presentation Tier
const lb = new ELB('lb', 'Load Balancer');
const web1 = new EC2('web1', 'Web Server 1');
const web2 = new EC2('web2', 'Web Server 2');

// Application Tier
const app1 = new EC2('app1', 'App Server 1');
const app2 = new EC2('app2', 'App Server 2');

// Data Tier
const db = new RDS('db', 'Database');
const storage = new S3('storage', 'File Storage');

// Add nodes
[lb, web1, web2, app1, app2, db, storage].forEach(node => diagram.addNode(node));

// Connections
diagram.rightShift([lb], [web1, web2]);
diagram.rightShift([web1, web2], [app1, app2]);
diagram.rightShift([app1, app2], [db, storage]);

export default diagram;
```

### Microservices Template
Modern microservices architecture

```typescript
// src/diagram.ts
import { Diagram, APIGateway, Lambda, DynamoDB, SQS, ElastiCache } from '@cloud-diagrams/aws';

const diagram = new Diagram('Microservices Architecture');

// API Gateway
const apiGw = new APIGateway('api-gw', 'API Gateway');

// Microservices
const userService = new Lambda('user-service', 'User Service');
const orderService = new Lambda('order-service', 'Order Service');
const paymentService = new Lambda('payment-service', 'Payment Service');

// Databases
const userDb = new DynamoDB('user-db', 'User Database');
const orderDb = new DynamoDB('order-db', 'Order Database');
const paymentDb = new DynamoDB('payment-db', 'Payment Database');

// Infrastructure
const queue = new SQS('queue', 'Message Queue');
const cache = new ElastiCache('cache', 'Redis Cache');

// Add nodes
[apiGw, userService, orderService, paymentService, userDb, orderDb, paymentDb, queue, cache]
  .forEach(node => diagram.addNode(node));

// API connections
diagram.rightShift([apiGw], [userService, orderService, paymentService]);

// Service to database connections
diagram.rightShift([userService], [userDb, cache]);
diagram.rightShift([orderService], [orderDb, queue]);
diagram.rightShift([paymentService], [paymentDb, queue]);

export default diagram;
```

### Multi-Cloud Template
Hybrid multi-cloud setup

```typescript
// src/diagram.ts
import { Diagram } from '@cloud-diagrams/core';
import { EC2, S3 } from '@cloud-diagrams/aws';
import { VirtualMachine, BlobStorage } from '@cloud-diagrams/azure';
import { ComputeEngine, CloudStorage } from '@cloud-diagrams/gcp';

const diagram = new Diagram('Multi-Cloud Architecture');

// AWS
const awsWeb = new EC2('aws-web', 'AWS Web Server');
const awsStorage = new S3('aws-storage', 'AWS Storage');

// Azure
const azureApp = new VirtualMachine('azure-app', 'Azure App Server');
const azureBlob = new BlobStorage('azure-blob', 'Azure Blob');

// GCP
const gcpCompute = new ComputeEngine('gcp-compute', 'GCP Compute');
const gcpStorage = new CloudStorage('gcp-storage', 'GCP Storage');

// Add nodes
[awsWeb, awsStorage, azureApp, azureBlob, gcpCompute, gcpStorage]
  .forEach(node => diagram.addNode(node));

// Cross-cloud connections
diagram.rightShift([awsWeb], [azureApp]);
diagram.rightShift([azureApp], [gcpCompute]);
diagram.rightShift([awsStorage], [azureBlob]);
diagram.rightShift([azureBlob], [gcpStorage]);

export default diagram;
```

## 🔧 Configuration Files

### `cloud-diagrams.config.js`
Project configuration file

```javascript
module.exports = {
  // Default output settings
  output: {
    directory: './diagrams',
    format: 'svg',
    width: 1200,
    height: 800
  },
  
  // Rendering options
  rendering: {
    theme: 'default',
    layoutAlgorithm: 'hierarchical',
    enableZoom: true,
    enablePan: true
  },
  
  // Validation rules
  validation: {
    strict: false,
    checkConnections: true,
    checkIcons: true,
    allowUnusedNodes: false
  },
  
  // Watch mode settings
  watch: {
    patterns: ['src/**/*.ts', 'src/**/*.js'],
    ignore: ['node_modules/**', 'dist/**']
  },
  
  // Export presets
  presets: {
    'web': {
      format: 'svg',
      width: 1200,
      height: 800,
      interactive: true
    },
    'print': {
      format: 'pdf',
      pageSize: 'A4',
      orientation: 'landscape'
    },
    'presentation': {
      format: 'png',
      width: 1920,
      height: 1080,
      quality: 0.9
    }
  }
};
```

### `package.json` Scripts
Recommended npm scripts

```json
{
  "scripts": {
    "diagram:build": "cloud-diagrams generate src/diagram.ts",
    "diagram:watch": "cloud-diagrams generate src/diagram.ts --watch",
    "diagram:validate": "cloud-diagrams validate src/**/*.ts",
    "diagram:export": "cloud-diagrams export src/**/*.ts --output-dir dist/diagrams",
    "diagram:list": "cloud-diagrams list --provider aws"
  }
}
```

## 🎯 Usage Examples

### Basic Workflow

```bash
# 1. Initialize new project
cloud-diagrams init my-architecture --provider aws --examples

# 2. Navigate to project
cd my-architecture

# 3. Edit diagram file
# Edit src/diagram.ts with your architecture

# 4. Generate diagram
cloud-diagrams generate src/diagram.ts

# 5. Watch for changes during development
cloud-diagrams generate src/diagram.ts --watch

# 6. Export final diagrams
cloud-diagrams export src/diagram.ts --format png --width 1920 --height 1080
```

### CI/CD Integration

```yaml
# .github/workflows/diagrams.yml
name: Generate Diagrams

on:
  push:
    paths:
      - 'src/**/*.ts'
      - 'diagrams/**/*.ts'

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Install CLI
        run: npm install -g @cloud-diagrams/cli
        
      - name: Validate diagrams
        run: cloud-diagrams validate src/**/*.ts
        
      - name: Generate diagrams
        run: cloud-diagrams export src/**/*.ts --output-dir dist/diagrams --format svg
        
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: diagrams
          path: dist/diagrams/
```

## 🐛 Troubleshooting

### Common Issues

1. **Module not found errors**
   ```bash
   # Ensure all dependencies are installed
   npm install
   
   # Check if CLI is properly installed
   npm list -g @cloud-diagrams/cli
   ```

2. **TypeScript compilation errors**
   ```bash
   # Validate TypeScript configuration
   npx tsc --noEmit
   
   # Check diagram syntax
   cloud-diagrams validate src/diagram.ts
   ```

3. **Rendering issues**
   ```bash
   # Enable verbose output
   cloud-diagrams generate src/diagram.ts --verbose
   
   # Check icon availability
   cloud-diagrams list --search "service-name"
   ```

4. **Export failures**
   ```bash
   # Ensure output directory exists
   mkdir -p diagrams
   
   # Try different format
   cloud-diagrams export src/diagram.ts --format svg
   ```

## 🔄 Migration from Python Diagrams

### Command Mapping

| Python Diagrams | Cloud Diagrams CLI |
|-----------------|-------------------|
| `diagrams` | `cloud-diagrams generate` |
| N/A | `cloud-diagrams init` |
| N/A | `cloud-diagrams list` |
| N/A | `cloud-diagrams validate` |
| N/A | `cloud-diagrams export` |

### Syntax Comparison

```python
# Python Diagrams
from diagrams import Diagram
from diagrams.aws.compute import EC2
from diagrams.aws.storage import S3

with Diagram("Web Service", show=False):
    web = EC2("web")
    storage = S3("storage")
    web >> storage
```

```typescript
// Cloud Diagrams CLI
import { Diagram, EC2, S3 } from '@cloud-diagrams/aws';

const diagram = new Diagram('Web Service');
const web = new EC2('web', 'Web Server');
const storage = new S3('storage', 'Storage');

diagram.addNode(web);
diagram.addNode(storage);
diagram.rightShift([web], [storage]);

export default diagram;
```

## 🚀 Next Steps

1. **Fix Core Package API**: Update core package to include missing methods
2. **Test CLI Build**: Rebuild and test CLI after fixes
3. **Add More Templates**: Create additional project templates
4. **Improve Error Handling**: Better error messages and validation
5. **Add Plugin System**: Support for custom providers and templates

---

**Note**: This CLI is currently under development. The core library is fully functional and can be used directly in code. The CLI will be available once the technical issues are resolved. 