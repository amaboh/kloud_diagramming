#!/bin/bash

# 🚀 Cloud Diagrams TypeScript - Quick Start Script
# This script sets up a complete development environment

set -e

echo "🚀 Cloud Diagrams TypeScript - Quick Start Setup"
echo "================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16+ required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Get project name from user
read -p "📁 Enter your project name (default: my-cloud-diagrams): " PROJECT_NAME
PROJECT_NAME=${PROJECT_NAME:-my-cloud-diagrams}

# Create project directory
echo "📁 Creating project directory: $PROJECT_NAME"
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

# Initialize npm project
echo "📦 Initializing npm project..."
npm init -y > /dev/null

# Create project structure
echo "🏗️ Creating project structure..."
mkdir -p src/{diagrams,components,utils}
mkdir -p public/{assets,styles}
mkdir -p examples

# Install dependencies
echo "📦 Installing Cloud Diagrams packages..."
npm install @cloud-diagrams/core @cloud-diagrams/aws @cloud-diagrams/azure @cloud-diagrams/gcp @cloud-diagrams/react --silent

echo "🛠️ Installing development dependencies..."
npm install --save-dev typescript @types/node ts-loader webpack webpack-cli webpack-dev-server html-webpack-plugin css-loader style-loader --silent

# Create TypeScript configuration
echo "⚙️ Creating TypeScript configuration..."
cat > tsconfig.json << 'EOF'
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
EOF

# Create Webpack configuration
echo "🌐 Creating Webpack configuration..."
cat > webpack.config.js << 'EOF'
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
EOF

# Create HTML template
echo "📄 Creating HTML template..."
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
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
            background: #4CAF50;
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
        .success { background: #d4edda; color: #155724; }
        .error { background: #f8d7da; color: #721c24; }
        .info { background: #d1ecf1; color: #0c5460; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Cloud Diagrams Development Environment</h1>
        <p>Live development with hot reload - make changes and see them instantly!</p>
        
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
EOF

# Create main TypeScript file
echo "💻 Creating main application file..."
cat > src/index.ts << 'EOF'
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
                layout: 'hierarchical'
            });

            // Create VPC group
            const vpc = new VPC('main-vpc', { 
                label: 'Main VPC (10.0.0.0/16)',
                metadata: { cidr: '10.0.0.0/16' }
            });

            // Create services
            const webServer = new EC2('web-server', { 
                label: 'Web Server\n(t3.medium)',
                metadata: { instanceType: 't3.medium', az: 'us-east-1a' }
            });

            const appServer = new EC2('app-server', { 
                label: 'App Server\n(t3.large)',
                metadata: { instanceType: 't3.large', az: 'us-east-1b' }
            });

            const database = new RDS('database', { 
                label: 'PostgreSQL\n(db.t3.micro)',
                metadata: { engine: 'postgresql', version: '13.7' }
            });

            const storage = new S3('storage', { 
                label: 'Static Assets\nBucket',
                metadata: { bucketName: 'my-app-assets' }
            });

            const processor = new Lambda('processor', { 
                label: 'Image Processor\n(Node.js 18)',
                metadata: { runtime: 'nodejs18.x', memory: '512MB' }
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
                () => this.createServerlessArchitecture()
            ];

            const randomArchitecture = architectures[Math.floor(Math.random() * architectures.length)];
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
            layout: 'hierarchical'
        });

        // API Gateway and services
        const apiGateway = new Lambda('api-gateway', { label: 'API Gateway' });
        const userService = new Lambda('user-service', { label: 'User Service' });
        const orderService = new Lambda('order-service', { label: 'Order Service' });
        const paymentService = new Lambda('payment-service', { label: 'Payment Service' });
        
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
            layout: 'hierarchical'
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
            layout: 'hierarchical'
        });

        const frontend = new S3('frontend', { label: 'React App\n(S3 + CloudFront)' });
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
            nodes.forEach(node => {
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
        this.showStatus(`🎨 Switched to ${this.isDarkTheme ? 'dark' : 'light'} theme`, 'info');
        
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
EOF

# Update package.json with scripts
echo "📝 Updating package.json with scripts..."
npm pkg set scripts.dev="webpack serve --mode development"
npm pkg set scripts.build="webpack --mode production"
npm pkg set scripts.start="npm run dev"
npm pkg set scripts.type-check="tsc --noEmit"

# Create example diagram
echo "📋 Creating example diagram..."
mkdir -p src/diagrams
cat > src/diagrams/example-multi-cloud.ts << 'EOF'
import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS } from '@cloud-diagrams/aws';
import { VirtualMachine, SQLDatabase } from '@cloud-diagrams/azure';
import { ComputeEngine, CloudSQL } from '@cloud-diagrams/gcp';

export function createMultiCloudDiagram(): Diagram {
    const diagram = new Diagram('Multi-Cloud Architecture');
    
    // AWS components
    const awsWeb = new EC2('aws-web', { label: 'AWS Web Server' });
    const awsDb = new RDS('aws-db', { label: 'AWS Database' });
    
    // Azure components
    const azureWeb = new VirtualMachine('azure-web', { label: 'Azure VM' });
    const azureDb = new SQLDatabase('azure-db', { label: 'Azure SQL' });
    
    // GCP components
    const gcpWeb = new ComputeEngine('gcp-web', { label: 'GCP Compute' });
    const gcpDb = new CloudSQL('gcp-db', { label: 'Cloud SQL' });
    
    // Add all nodes
    diagram.addNode(awsWeb);
    diagram.addNode(awsDb);
    diagram.addNode(azureWeb);
    diagram.addNode(azureDb);
    diagram.addNode(gcpWeb);
    diagram.addNode(gcpDb);
    
    // Create connections
    diagram.connect(awsWeb, awsDb);
    diagram.connect(azureWeb, azureDb);
    diagram.connect(gcpWeb, gcpDb);
    
    // Cross-cloud connections
    diagram.connect(awsWeb, azureWeb, { label: 'Sync' });
    diagram.connect(azureWeb, gcpWeb, { label: 'Backup' });
    
    return diagram;
}
EOF

# Create README
echo "📚 Creating README..."
cat > README.md << 'EOF'
# Cloud Diagrams Development Environment

This project was created using the Cloud Diagrams TypeScript quick-start script.

## 🚀 Getting Started

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## 📁 Project Structure

```
src/
├── index.ts              # Main application
├── diagrams/             # Custom diagram definitions
├── components/           # Reusable components
└── utils/               # Utility functions

public/
├── index.html           # HTML template
├── assets/              # Static assets
└── styles/              # CSS files
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run type-check` - Check TypeScript types

## 📖 Documentation

- [Development Setup Guide](DEVELOPMENT_SETUP_GUIDE.md)
- [Cloud Diagrams Core](https://www.npmjs.com/package/@cloud-diagrams/core)
- [AWS Services](https://www.npmjs.com/package/@cloud-diagrams/aws)
- [Azure Services](https://www.npmjs.com/package/@cloud-diagrams/azure)
- [GCP Services](https://www.npmjs.com/package/@cloud-diagrams/gcp)

## 🎨 Features

- ✅ Live reload development
- ✅ TypeScript support
- ✅ Multi-cloud providers (AWS, Azure, GCP)
- ✅ Interactive diagrams
- ✅ Theme switching
- ✅ SVG export
- ✅ Professional styling

Happy coding! 🎉
EOF

echo ""
echo "🎉 Setup complete! Your Cloud Diagrams development environment is ready."
echo ""
echo "📁 Project created in: $(pwd)"
echo ""
echo "🚀 To start developing:"
echo "   cd $PROJECT_NAME"
echo "   npm run dev"
echo ""
echo "🌐 Your app will open at: http://localhost:3000"
echo ""
echo "📚 Check out the DEVELOPMENT_SETUP_GUIDE.md for detailed instructions!"
echo ""
echo "✨ Happy coding with Cloud Diagrams TypeScript! ✨" 