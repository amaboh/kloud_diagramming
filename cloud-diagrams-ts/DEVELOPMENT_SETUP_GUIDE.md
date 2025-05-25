# 🚀 Development Environment Setup Guide

**Cloud Diagrams TypeScript - Complete Development Setup**

This guide will walk you through setting up a complete development environment to work with the `@cloud-diagrams` packages and see your changes live on localhost:3000.

## 📋 Prerequisites

- **Node.js** 16+ (recommended: 18+)
- **npm** 8+ or **yarn** 1.22+
- **TypeScript** 4.5+ or 5.x
- **Git** (optional, for version control)

## 🏗️ Step 1: Create Your Project Structure

### Option A: Start from Scratch

```bash
# Create your project directory
mkdir my-cloud-diagrams
cd my-cloud-diagrams

# Initialize npm project
npm init -y

# Create project structure
mkdir -p src/{diagrams,components,utils}
mkdir -p public/{assets,styles}
mkdir -p examples
```

### Option B: Clone and Extend the Repository

```bash
# Clone the repository
git clone https://github.com/amaboh/kloud_diagramming.git
cd kloud_diagramming/cloud-diagrams-ts

# Install dependencies
npm install

# Create your development workspace
mkdir -p my-workspace/{src,public,examples}
cd my-workspace
```

## 📦 Step 2: Install Cloud Diagrams Packages

```bash
# Install core packages
npm install @cloud-diagrams/core @cloud-diagrams/aws @cloud-diagrams/azure @cloud-diagrams/gcp

# Install React components (for web development)
npm install @cloud-diagrams/react

# Install CLI tool (optional, for command-line usage)
npm install -g @cloud-diagrams/cli

# Install development dependencies
npm install --save-dev typescript @types/node ts-node nodemon
npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev html-webpack-plugin css-loader style-loader
```

## ⚙️ Step 3: Configure TypeScript

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 🌐 Step 4: Set Up Development Server

### Create `webpack.config.js`:

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: './dist',
    port: 3000,
    hot: true,
    open: true,
  },
};
```

### Install additional webpack dependencies:

```bash
npm install --save-dev ts-loader
```

## 📄 Step 5: Create HTML Template

Create `public/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cloud Diagrams Development</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        background: white;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      }
      .diagram-container {
        margin: 20px 0;
        padding: 20px;
        border: 2px dashed #ddd;
        border-radius: 8px;
        background: #f9f9f9;
      }
      .controls {
        margin: 20px 0;
        padding: 15px;
        background: #f0f0f0;
        border-radius: 5px;
      }
      button {
        background: #4caf50;
        color: white;
        border: none;
        padding: 10px 20px;
        margin: 5px;
        border-radius: 5px;
        cursor: pointer;
      }
      button:hover {
        background: #45a049;
      }
      .status {
        margin: 10px 0;
        padding: 10px;
        border-radius: 5px;
      }
      .success {
        background: #d4edda;
        color: #155724;
      }
      .error {
        background: #f8d7da;
        color: #721c24;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🚀 Cloud Diagrams Development Environment</h1>
      <p>
        Live development with hot reload - make changes and see them instantly!
      </p>

      <div class="controls">
        <button id="generateBtn">Generate New Diagram</button>
        <button id="exportBtn">Export SVG</button>
        <button id="themeBtn">Toggle Theme</button>
      </div>

      <div id="status" class="status"></div>
      <div id="diagram-container" class="diagram-container">
        <!-- Diagrams will be rendered here -->
      </div>
    </div>
  </body>
</html>
```

## 💻 Step 6: Create Your First Diagram

Create `src/index.ts`:

```typescript
import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS, S3, Lambda, VPC } from '@cloud-diagrams/aws';

class DiagramApp {
  private currentDiagram: Diagram | null = null;
  private isDarkTheme = false;

  constructor() {
    this.init();
  }

  private init() {
    this.setupEventListeners();
    this.generateInitialDiagram();
  }

  private setupEventListeners() {
    const generateBtn = document.getElementById('generateBtn');
    const exportBtn = document.getElementById('exportBtn');
    const themeBtn = document.getElementById('themeBtn');

    generateBtn?.addEventListener('click', () => this.generateNewDiagram());
    exportBtn?.addEventListener('click', () => this.exportDiagram());
    themeBtn?.addEventListener('click', () => this.toggleTheme());
  }

  private async generateInitialDiagram() {
    try {
      this.showStatus('Generating initial diagram...', 'info');

      // Create a comprehensive AWS architecture
      const diagram = new Diagram('My AWS Architecture', {
        theme: this.isDarkTheme ? 'dark' : 'default',
        layout: 'hierarchical',
      });

      // Create VPC group
      const vpc = new VPC('main-vpc', {
        label: 'Main VPC (10.0.0.0/16)',
        metadata: { cidr: '10.0.0.0/16' },
      });

      // Create services
      const webServer = new EC2('web-server', {
        label: 'Web Server\n(t3.medium)',
        metadata: { instanceType: 't3.medium', az: 'us-east-1a' },
      });

      const appServer = new EC2('app-server', {
        label: 'App Server\n(t3.large)',
        metadata: { instanceType: 't3.large', az: 'us-east-1b' },
      });

      const database = new RDS('database', {
        label: 'PostgreSQL\n(db.t3.micro)',
        metadata: { engine: 'postgresql', version: '13.7' },
      });

      const storage = new S3('storage', {
        label: 'Static Assets\nBucket',
        metadata: { bucketName: 'my-app-assets' },
      });

      const processor = new Lambda('processor', {
        label: 'Image Processor\n(Node.js 18)',
        metadata: { runtime: 'nodejs18.x', memory: '512MB' },
      });

      // Add nodes to VPC group
      vpc.addNode(webServer);
      vpc.addNode(appServer);
      vpc.addNode(database);

      // Add all nodes to diagram
      diagram.addGroup(vpc);
      diagram.addNode(storage);
      diagram.addNode(processor);

      // Create connections
      diagram.connect(webServer, appServer, { label: 'HTTP/HTTPS' });
      diagram.connect(appServer, database, { label: 'SQL' });
      diagram.connect(webServer, storage, { label: 'Static Files' });
      diagram.connect(processor, storage, { label: 'Upload/Process' });
      diagram.connect(appServer, processor, { label: 'Trigger' });

      this.currentDiagram = diagram;
      await this.renderDiagram();

      this.showStatus('✅ Diagram generated successfully!', 'success');
    } catch (error) {
      this.showStatus(`❌ Error: ${error.message}`, 'error');
      console.error('Diagram generation error:', error);
    }
  }

  private async generateNewDiagram() {
    try {
      this.showStatus('Generating new diagram...', 'info');

      // Create a different architecture each time
      const architectures = [
        () => this.createMicroservicesArchitecture(),
        () => this.createDataPipelineArchitecture(),
        () => this.createServerlessArchitecture(),
      ];

      const randomArchitecture =
        architectures[Math.floor(Math.random() * architectures.length)];
      this.currentDiagram = await randomArchitecture();

      await this.renderDiagram();
      this.showStatus('✅ New diagram generated!', 'success');
    } catch (error) {
      this.showStatus(`❌ Error: ${error.message}`, 'error');
    }
  }

  private async createMicroservicesArchitecture(): Promise<Diagram> {
    const diagram = new Diagram('Microservices Architecture', {
      theme: this.isDarkTheme ? 'dark' : 'default',
      layout: 'hierarchical',
    });

    // API Gateway and services
    const apiGateway = new Lambda('api-gateway', { label: 'API Gateway' });
    const userService = new Lambda('user-service', { label: 'User Service' });
    const orderService = new Lambda('order-service', {
      label: 'Order Service',
    });
    const paymentService = new Lambda('payment-service', {
      label: 'Payment Service',
    });

    // Databases
    const userDB = new RDS('user-db', { label: 'User Database' });
    const orderDB = new RDS('order-db', { label: 'Order Database' });
    const paymentDB = new RDS('payment-db', { label: 'Payment Database' });

    diagram.addNode(apiGateway);
    diagram.addNode(userService);
    diagram.addNode(orderService);
    diagram.addNode(paymentService);
    diagram.addNode(userDB);
    diagram.addNode(orderDB);
    diagram.addNode(paymentDB);

    // Connections
    diagram.connect(apiGateway, userService);
    diagram.connect(apiGateway, orderService);
    diagram.connect(apiGateway, paymentService);
    diagram.connect(userService, userDB);
    diagram.connect(orderService, orderDB);
    diagram.connect(paymentService, paymentDB);

    return diagram;
  }

  private async createDataPipelineArchitecture(): Promise<Diagram> {
    const diagram = new Diagram('Data Pipeline Architecture', {
      theme: this.isDarkTheme ? 'dark' : 'default',
      layout: 'hierarchical',
    });

    const dataSource = new S3('data-source', { label: 'Raw Data\nS3 Bucket' });
    const processor = new Lambda('data-processor', { label: 'Data Processor' });
    const warehouse = new RDS('data-warehouse', { label: 'Data Warehouse' });
    const analytics = new Lambda('analytics', { label: 'Analytics Engine' });
    const dashboard = new S3('dashboard', { label: 'Dashboard\nStatic Site' });

    diagram.addNode(dataSource);
    diagram.addNode(processor);
    diagram.addNode(warehouse);
    diagram.addNode(analytics);
    diagram.addNode(dashboard);

    diagram.connect(dataSource, processor, { label: 'Trigger' });
    diagram.connect(processor, warehouse, { label: 'Store' });
    diagram.connect(warehouse, analytics, { label: 'Query' });
    diagram.connect(analytics, dashboard, { label: 'Update' });

    return diagram;
  }

  private async createServerlessArchitecture(): Promise<Diagram> {
    const diagram = new Diagram('Serverless Architecture', {
      theme: this.isDarkTheme ? 'dark' : 'default',
      layout: 'hierarchical',
    });

    const frontend = new S3('frontend', {
      label: 'React App\n(S3 + CloudFront)',
    });
    const api = new Lambda('api', { label: 'REST API\n(Lambda)' });
    const auth = new Lambda('auth', { label: 'Authentication\n(Lambda)' });
    const database = new RDS('database', { label: 'DynamoDB' });
    const storage = new S3('storage', { label: 'File Storage\n(S3)' });

    diagram.addNode(frontend);
    diagram.addNode(api);
    diagram.addNode(auth);
    diagram.addNode(database);
    diagram.addNode(storage);

    diagram.connect(frontend, api, { label: 'HTTPS' });
    diagram.connect(frontend, auth, { label: 'Auth' });
    diagram.connect(api, database, { label: 'Data' });
    diagram.connect(api, storage, { label: 'Files' });

    return diagram;
  }

  private async renderDiagram() {
    if (!this.currentDiagram) return;

    const container = document.getElementById('diagram-container');
    if (!container) return;

    try {
      const svg = await this.currentDiagram.render();
      container.innerHTML = svg;

      // Add click handlers to nodes
      const nodes = container.querySelectorAll('[id^="node-"]');
      nodes.forEach((node) => {
        node.addEventListener('click', (e) => {
          const nodeId = (e.target as Element).id.replace('node-', '');
          this.showStatus(`🖱️ Clicked node: ${nodeId}`, 'info');
        });
      });
    } catch (error) {
      container.innerHTML = `<p style="color: red;">Error rendering diagram: ${error.message}</p>`;
    }
  }

  private async exportDiagram() {
    if (!this.currentDiagram) {
      this.showStatus('❌ No diagram to export', 'error');
      return;
    }

    try {
      const svg = await this.currentDiagram.render();
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `diagram-${Date.now()}.svg`;
      a.click();

      URL.revokeObjectURL(url);
      this.showStatus('✅ Diagram exported successfully!', 'success');
    } catch (error) {
      this.showStatus(`❌ Export error: ${error.message}`, 'error');
    }
  }

  private toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.showStatus(
      `🎨 Switched to ${this.isDarkTheme ? 'dark' : 'light'} theme`,
      'info'
    );

    // Regenerate diagram with new theme
    if (this.currentDiagram) {
      this.currentDiagram.setTheme(this.isDarkTheme ? 'dark' : 'default');
      this.renderDiagram();
    }
  }

  private showStatus(message: string, type: 'success' | 'error' | 'info') {
    const statusEl = document.getElementById('status');
    if (!statusEl) return;

    statusEl.textContent = message;
    statusEl.className = `status ${type}`;

    // Auto-clear after 3 seconds
    setTimeout(() => {
      statusEl.textContent = '';
      statusEl.className = 'status';
    }, 3000);
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DiagramApp();
});
```

## 📝 Step 7: Configure Package Scripts

Update your `package.json`:

```json
{
  "name": "my-cloud-diagrams",
  "version": "1.0.0",
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production",
    "start": "npm run dev",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@cloud-diagrams/core": "^0.2.1",
    "@cloud-diagrams/aws": "^0.2.1",
    "@cloud-diagrams/azure": "^0.2.1",
    "@cloud-diagrams/gcp": "^0.2.1",
    "@cloud-diagrams/react": "^1.0.2"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "ts-loader": "^9.4.0",
    "webpack": "^5.88.0",
    "webpack-cli": "^5.1.0",
    "webpack-dev-server": "^4.15.0",
    "html-webpack-plugin": "^5.5.0",
    "css-loader": "^6.8.0",
    "style-loader": "^3.3.0"
  }
}
```

## 🚀 Step 8: Start Development

```bash
# Start the development server
npm run dev

# Your browser should automatically open to http://localhost:3000
# If not, manually navigate to http://localhost:3000
```

## 🔄 Step 9: Live Development Workflow

Now you can start coding with live reload:

### 1. **Edit Diagrams in Real-Time**

Modify `src/index.ts` to change your diagrams:

```typescript
// Add this to createMicroservicesArchitecture method
const notificationService = new Lambda('notification-service', {
  label: 'Notification\nService',
});
diagram.addNode(notificationService);
diagram.connect(orderService, notificationService, { label: 'Order Events' });
```

**Save the file** → **Browser automatically refreshes** → **See changes instantly!**

### 2. **Create New Diagram Files**

Create `src/diagrams/my-custom-diagram.ts`:

```typescript
import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS } from '@cloud-diagrams/aws';

export function createCustomDiagram(): Diagram {
  const diagram = new Diagram('My Custom Architecture');

  const web = new EC2('web', { label: 'Web Server' });
  const db = new RDS('db', { label: 'Database' });

  diagram.addNode(web);
  diagram.addNode(db);
  diagram.connect(web, db);

  return diagram;
}
```

Import and use in `src/index.ts`:

```typescript
import { createCustomDiagram } from './diagrams/my-custom-diagram';

// Add to your architectures array
const architectures = [
  () => this.createMicroservicesArchitecture(),
  () => this.createDataPipelineArchitecture(),
  () => this.createServerlessArchitecture(),
  () => createCustomDiagram(), // Your new diagram!
];
```

### 3. **Experiment with Different Providers**

```typescript
// Try Azure services
import { VirtualMachine, SQLDatabase } from '@cloud-diagrams/azure';

const vm = new VirtualMachine('web-vm', { label: 'Azure VM' });
const sqlDb = new SQLDatabase('sql-db', { label: 'Azure SQL' });

// Try GCP services
import { ComputeEngine, CloudSQL } from '@cloud-diagrams/gcp';

const gceInstance = new ComputeEngine('gce-vm', { label: 'GCE Instance' });
const cloudSql = new CloudSQL('cloud-sql', { label: 'Cloud SQL' });
```

## 🎨 Step 10: Advanced Customization

### Custom Styling

Create `src/styles/custom.css`:

```css
/* Custom diagram styling */
.diagram-container svg {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Custom node styling */
.node-aws {
  fill: #ff9900;
}
.node-azure {
  fill: #0078d4;
}
.node-gcp {
  fill: #4285f4;
}
```

Import in your `src/index.ts`:

```typescript
import './styles/custom.css';
```

### Environment Variables

Create `.env`:

```
DIAGRAM_THEME=dark
AUTO_EXPORT=true
DEFAULT_PROVIDER=aws
```

## 🐛 Troubleshooting

### Common Issues:

1. **Module not found errors**:

   ```bash
   npm install --save-dev @types/webpack-env
   ```

2. **TypeScript compilation errors**:

   ```bash
   npm run type-check
   ```

3. **Hot reload not working**:

   - Check that webpack-dev-server is running on port 3000
   - Clear browser cache (Ctrl+Shift+R)

4. **Diagram not rendering**:
   - Check browser console for errors
   - Verify all packages are installed correctly

## 📚 Next Steps

1. **Explore Examples**: Check `examples/` folder for more diagram patterns
2. **Read Documentation**: Visit package READMEs for detailed API docs
3. **Join Community**: Contribute to the project on GitHub
4. **Build Production**: Run `npm run build` when ready to deploy

## 🎉 You're Ready!

Your development environment is now set up with:

- ✅ **Live reload** on localhost:3000
- ✅ **TypeScript support** with hot compilation
- ✅ **Multi-provider** cloud services (AWS, Azure, GCP)
- ✅ **Interactive diagrams** with click handlers
- ✅ **Theme switching** and export functionality
- ✅ **Professional development workflow**

Start coding and watch your cloud architectures come to life in real-time! 🚀
