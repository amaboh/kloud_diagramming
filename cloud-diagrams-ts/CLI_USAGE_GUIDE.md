# Cloud Diagrams CLI - Usage Guide

This guide demonstrates the comprehensive CLI tool for generating cloud architecture diagrams with multi-provider support.

## 🚀 Quick Start

### Installation

```bash
# Install globally
npm install -g @cloud-diagrams/cli

# Or install locally in your project
npm install --save-dev @cloud-diagrams/cli
```

### Basic Usage

```bash
# Initialize a new project
cloud-diagrams init my-architecture --provider aws --template 3tier

# Generate diagram
cd my-architecture
npm install
npm run build

# Or use CLI directly
cloud-diagrams generate diagram.ts -o architecture.svg
```

## 📋 Command Reference

### 1. `init` - Initialize Projects

Create new diagram projects with templates and examples.

```bash
# Basic AWS project
cloud-diagrams init my-app

# Azure project with 3-tier template
cloud-diagrams init web-app --provider azure --template 3tier

# Multi-cloud microservices
cloud-diagrams init microservices --provider multi --template microservices

# GCP data pipeline with JSON format
cloud-diagrams init data-pipeline --provider gcp --template data-pipeline --json
```

**Available Options:**

- `--provider <provider>`: aws, azure, gcp, multi (default: aws)
- `--template <template>`: basic, 3tier, microservices, data-pipeline (default: basic)
- `--typescript`: Generate TypeScript template (default: true)
- `--json`: Generate JSON template instead of TypeScript

### 2. `generate` - Generate Diagrams

Generate diagrams from TypeScript, JavaScript, or JSON specifications.

```bash
# Generate SVG (default)
cloud-diagrams generate diagram.ts

# Generate PNG with custom dimensions
cloud-diagrams generate diagram.ts -f png -w 1920 -h 1080

# Generate PDF for presentations
cloud-diagrams generate diagram.json -f pdf -o presentation.pdf

# Generate with dark theme
cloud-diagrams generate diagram.ts -t dark -o dark-diagram.svg

# Watch mode for development
cloud-diagrams generate diagram.ts --watch

# Interactive SVG with click handlers
cloud-diagrams generate diagram.ts --interactive
```

**Available Options:**

- `-o, --output <path>`: Output file path (default: diagram.svg)
- `-f, --format <format>`: svg, png, pdf (default: svg)
- `-t, --theme <theme>`: light, dark (default: light)
- `-d, --direction <direction>`: LR, TB, RL, BT (default: LR)
- `-w, --width <width>`: Width for raster formats (default: 1200)
- `-h, --height <height>`: Height for raster formats (default: 800)
- `--interactive`: Enable interactive features in SVG
- `--no-icons`: Disable cloud provider icons
- `--watch`: Watch for changes and regenerate

### 3. `validate` - Validate Diagrams

Check diagram syntax and structure for errors.

```bash
# Basic validation
cloud-diagrams validate diagram.ts

# Strict validation with additional checks
cloud-diagrams validate diagram.ts --strict

# Validate JSON specification
cloud-diagrams validate diagram.json
```

**Available Options:**

- `--strict`: Enable strict validation mode

### 4. `list` - List Services

Show available cloud services and icons from all providers.

```bash
# List all services
cloud-diagrams list

# AWS services only
cloud-diagrams list --provider aws

# Compute services across all providers
cloud-diagrams list --category compute

# Show icon availability
cloud-diagrams list --icons

# Azure storage services with icons
cloud-diagrams list --provider azure --category storage --icons
```

**Available Options:**

- `-p, --provider <provider>`: Filter by aws, azure, gcp
- `-c, --category <category>`: Filter by service category
- `--icons`: Show icon availability status

### 5. `export` - Convert Formats

Export existing diagrams to different formats.

```bash
# Convert SVG to PNG
cloud-diagrams export diagram.svg -f png

# Convert TypeScript to PDF
cloud-diagrams export diagram.ts -f pdf -o presentation.pdf

# Extract JSON specification
cloud-diagrams export diagram.ts -f json -o spec.json

# High-quality PNG export
cloud-diagrams export diagram.ts -f png -w 2560 -h 1440 -q 1.0
```

**Available Options:**

- `-f, --format <format>`: svg, png, pdf, json (default: png)
- `-o, --output <path>`: Output file path
- `-w, --width <width>`: Width for raster formats (default: 1200)
- `-h, --height <height>`: Height for raster formats (default: 800)
- `-q, --quality <quality>`: Quality 0.1-1.0 (default: 0.9)

## 📝 Input Formats

### TypeScript/JavaScript

```typescript
import { Diagram } from '@cloud-diagrams/core';
import * as AWS from '@cloud-diagrams/aws';

const diagram = new Diagram('My Architecture', {
  direction: 'LR',
  theme: 'light',
});

const webServer = diagram.addNode(AWS.EC2('Web Server'));
const database = diagram.addNode(AWS.RDS('Database'));

diagram.connect(webServer, database);

export default diagram;
```

### JSON Specification

```json
{
  "name": "My Architecture",
  "config": {
    "direction": "LR",
    "theme": "light"
  },
  "nodes": [
    {
      "id": "web",
      "provider": "aws",
      "service": "EC2",
      "label": "Web Server"
    },
    {
      "id": "db",
      "provider": "aws",
      "service": "RDS",
      "label": "Database"
    }
  ],
  "edges": [
    {
      "from": "web",
      "to": "db"
    }
  ]
}
```

## 🏗️ Project Templates

### Basic Template

Simple two-tier architecture with web server and database.

```bash
cloud-diagrams init simple-app --template basic
```

### 3-Tier Template

Traditional web application with load balancer, web/app/database tiers.

```bash
cloud-diagrams init web-app --template 3tier
```

### Microservices Template

API gateway, multiple services, databases, and message queues.

```bash
cloud-diagrams init microservices --template microservices
```

### Data Pipeline Template

Data processing pipeline with sources, processing, storage, and analytics.

```bash
cloud-diagrams init analytics --template data-pipeline
```

## 🌐 Multi-Provider Examples

### AWS + Azure + GCP

```typescript
import { Diagram } from '@cloud-diagrams/core';
import * as AWS from '@cloud-diagrams/aws';
import * as Azure from '@cloud-diagrams/azure';
import * as GCP from '@cloud-diagrams/gcp';

const diagram = new Diagram('Multi-Cloud Architecture');

const awsWeb = diagram.addNode(AWS.EC2('AWS Web Server'));
const azureDB = diagram.addNode(Azure.SQLDatabase('Azure Database'));
const gcpStorage = diagram.addNode(GCP.CloudStorage('GCP Storage'));

diagram.connect(awsWeb, azureDB);
diagram.connect(awsWeb, gcpStorage);
```

## 🔄 CI/CD Integration

### GitHub Actions

```yaml
name: Generate Architecture Diagrams

on:
  push:
    paths: ['diagrams/**']

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install CLI
        run: npm install -g @cloud-diagrams/cli

      - name: Generate diagrams
        run: |
          cloud-diagrams generate diagrams/architecture.ts -f svg -o docs/architecture.svg
          cloud-diagrams generate diagrams/architecture.ts -f png -o docs/architecture.png

      - name: Commit diagrams
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/
          git commit -m "Update architecture diagrams" || exit 0
          git push
```

### GitLab CI

```yaml
generate-diagrams:
  image: node:18
  script:
    - npm install -g @cloud-diagrams/cli
    - cloud-diagrams generate diagrams/architecture.ts -f svg -o public/architecture.svg
    - cloud-diagrams generate diagrams/architecture.ts -f png -o public/architecture.png
  artifacts:
    paths:
      - public/
  only:
    changes:
      - diagrams/**
```

## ⚙️ Configuration

### Environment Variables

```bash
# Enable debug output
export DEBUG=1

# Custom cache directory
export CLOUD_DIAGRAMS_CACHE_DIR=~/.cache/cloud-diagrams

# Custom Puppeteer executable
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
```

### Global Configuration

Create `~/.cloud-diagrams/config.json`:

```json
{
  "defaultProvider": "aws",
  "defaultTheme": "light",
  "defaultFormat": "svg",
  "outputDirectory": "./diagrams"
}
```

## 🐛 Troubleshooting

### TypeScript Compilation Issues

```bash
# Install TypeScript globally
npm install -g typescript

# Check TypeScript version
npx tsc --version
```

### Puppeteer Issues

```bash
# Install Chromium dependencies (Linux)
sudo apt-get install -y chromium-browser

# Set custom executable path
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
```

### Memory Issues

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
```

### Debug Mode

```bash
# Enable debug output
DEBUG=1 cloud-diagrams generate diagram.ts
```

## 📊 Example Workflows

### Development Workflow

```bash
# 1. Initialize project
cloud-diagrams init my-project --provider aws --template 3tier

# 2. Develop with watch mode
cd my-project
cloud-diagrams generate diagram.ts --watch

# 3. Validate before commit
cloud-diagrams validate diagram.ts --strict

# 4. Generate final outputs
cloud-diagrams generate diagram.ts -f svg -o docs/architecture.svg
cloud-diagrams generate diagram.ts -f png -o docs/architecture.png
cloud-diagrams generate diagram.ts -f pdf -o docs/architecture.pdf
```

### Documentation Workflow

```bash
# Generate multiple formats for documentation
cloud-diagrams generate architecture.ts -f svg -o docs/architecture.svg
cloud-diagrams generate architecture.ts -f png -w 1920 -h 1080 -o docs/architecture-hd.png
cloud-diagrams generate architecture.ts -f pdf -o docs/architecture.pdf

# Extract JSON for programmatic use
cloud-diagrams export architecture.ts -f json -o api/architecture-spec.json
```

### Presentation Workflow

```bash
# Generate high-quality images for presentations
cloud-diagrams generate presentation.ts -f png -w 2560 -h 1440 -q 1.0 -o slides/architecture.png
cloud-diagrams generate presentation.ts -f pdf -o slides/architecture.pdf

# Generate interactive version for demos
cloud-diagrams generate presentation.ts --interactive -o demo/architecture.svg
```

This CLI tool provides a comprehensive solution for generating professional cloud architecture diagrams with support for multiple providers, formats, and deployment scenarios.
