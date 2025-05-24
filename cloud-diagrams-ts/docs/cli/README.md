# 💻 CLI Tool Documentation

The **Cloud Diagrams TypeScript CLI** provides a powerful command-line interface for generating diagrams, managing projects, and integrating with CI/CD pipelines.

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g @cloud-diagrams/cli
```

### Local Installation

```bash
npm install --save-dev @cloud-diagrams/cli
```

### Verify Installation

```bash
cloud-diagrams --version
cloud-diagrams --help
```

## 🚀 Quick Start

```bash
# Initialize a new project
cloud-diagrams init my-architecture --provider aws --template 3tier

# Navigate to project
cd my-architecture

# Generate diagram
cloud-diagrams generate diagram.ts -o architecture.svg

# Watch for changes
cloud-diagrams generate diagram.ts --watch
```

## 📋 Commands Overview

| Command        | Description                    | Usage                                              |
| -------------- | ------------------------------ | -------------------------------------------------- |
| **`init`**     | Initialize new diagram project | `cloud-diagrams init <name> [options]`             |
| **`generate`** | Generate diagrams from code    | `cloud-diagrams generate <file> [options]`         |
| **`validate`** | Validate diagram syntax        | `cloud-diagrams validate <file> [options]`         |
| **`list`**     | List available services/icons  | `cloud-diagrams list [options]`                    |
| **`export`**   | Convert diagram formats        | `cloud-diagrams export <input> <output> [options]` |

## 🆕 `init` - Project Initialization

Initialize a new diagram project with templates and examples.

### Basic Usage

```bash
cloud-diagrams init <project-name>
```

### Options

```bash
cloud-diagrams init my-project [options]

Options:
  -p, --provider <provider>     Cloud provider (aws|azure|gcp|multi) [default: "aws"]
  -t, --template <template>     Project template (basic|3tier|microservices|pipeline) [default: "basic"]
  -d, --directory <dir>         Target directory [default: current]
  --typescript                  Use TypeScript (default: true)
  --javascript                  Use JavaScript instead of TypeScript
  --examples                    Include example diagrams
  --git                         Initialize git repository
  --install                     Install dependencies automatically
```

### Templates

#### Basic Template

```bash
cloud-diagrams init my-app --provider aws --template basic
```

Creates a simple 2-tier architecture with web server and database.

#### 3-Tier Template

```bash
cloud-diagrams init enterprise-app --provider aws --template 3tier
```

Creates a complete 3-tier web application with load balancer, web servers, app servers, and database.

#### Microservices Template

```bash
cloud-diagrams init microservices --provider aws --template microservices
```

Creates a microservices architecture with API gateway, multiple services, and event streaming.

#### Data Pipeline Template

```bash
cloud-diagrams init data-platform --provider aws --template pipeline
```

Creates a data processing pipeline with ingestion, processing, and analytics components.

### Multi-Provider Templates

```bash
# Multi-cloud architecture
cloud-diagrams init hybrid-cloud --provider multi --template 3tier

# Azure-specific
cloud-diagrams init azure-app --provider azure --template microservices

# GCP-specific
cloud-diagrams init gcp-data --provider gcp --template pipeline
```

### Generated Project Structure

```
my-project/
├── src/
│   ├── diagram.ts              # Main diagram file
│   └── examples/               # Example diagrams
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── README.md                   # Project documentation
└── .gitignore                  # Git ignore rules
```

## 🎨 `generate` - Diagram Generation

Generate diagrams from TypeScript, JavaScript, or JSON specifications.

### Basic Usage

```bash
cloud-diagrams generate <input-file> [options]
```

### Input Formats

#### TypeScript Files

```bash
cloud-diagrams generate diagram.ts -o output.svg
cloud-diagrams generate src/architecture.ts -f png -o diagrams/
```

#### JavaScript Files

```bash
cloud-diagrams generate diagram.js -o output.svg
```

#### JSON Specifications

```bash
cloud-diagrams generate specification.json -o output.svg
```

### Output Formats

```bash
# SVG (vector graphics)
cloud-diagrams generate diagram.ts -f svg -o architecture.svg

# PNG (raster image)
cloud-diagrams generate diagram.ts -f png -o architecture.png --width 1920 --height 1080

# PDF (document)
cloud-diagrams generate diagram.ts -f pdf -o architecture.pdf

# JSON (specification)
cloud-diagrams generate diagram.ts -f json -o specification.json
```

### Options

```bash
Options:
  -f, --format <format>         Output format (svg|png|pdf|json) [default: "svg"]
  -o, --output <file>           Output file path
  -w, --width <pixels>          Image width for PNG/PDF [default: 1200]
  -h, --height <pixels>         Image height for PNG/PDF [default: 800]
  --theme <theme>               Diagram theme (default|dark|light) [default: "default"]
  --background <color>          Background color for PNG/PDF [default: "white"]
  --watch                       Watch for file changes and regenerate
  --interactive                 Enable interactive features in SVG
  --no-validation              Skip diagram validation
  --verbose                     Verbose output
```

### Watch Mode

```bash
# Watch single file
cloud-diagrams generate diagram.ts --watch

# Watch directory
cloud-diagrams generate src/ --watch -o dist/

# Watch with specific options
cloud-diagrams generate diagram.ts --watch -f png --width 1920 --height 1080
```

### Batch Processing

```bash
# Generate multiple formats
cloud-diagrams generate diagram.ts -f svg -o dist/architecture.svg
cloud-diagrams generate diagram.ts -f png -o dist/architecture.png
cloud-diagrams generate diagram.ts -f pdf -o dist/architecture.pdf

# Process directory
cloud-diagrams generate src/*.ts -o dist/
```

## ✅ `validate` - Diagram Validation

Validate diagram syntax and structure for errors.

### Basic Usage

```bash
cloud-diagrams validate <input-file> [options]
```

### Validation Levels

```bash
# Basic validation (syntax only)
cloud-diagrams validate diagram.ts

# Strict validation (includes best practices)
cloud-diagrams validate diagram.ts --strict

# Validate multiple files
cloud-diagrams validate src/*.ts
```

### Options

```bash
Options:
  --strict                      Enable strict validation rules
  --rules <rules>               Comma-separated validation rules
  --ignore <patterns>           Ignore files matching patterns
  --format <format>             Output format (text|json|junit) [default: "text"]
  --output <file>               Output validation report to file
```

### Validation Rules

#### Built-in Rules

- **syntax**: TypeScript/JavaScript syntax validation
- **imports**: Valid import statements
- **types**: Correct type usage
- **connections**: Valid node connections
- **groups**: Proper group hierarchy
- **naming**: Consistent naming conventions
- **metadata**: Required metadata fields

#### Custom Rules

```bash
# Enable specific rules
cloud-diagrams validate diagram.ts --rules syntax,types,naming

# Strict mode (all rules)
cloud-diagrams validate diagram.ts --strict
```

### Example Output

```
✅ diagram.ts: Valid
⚠️  warnings.ts: 2 warnings
   - Line 15: Consider adding description to node 'web-server'
   - Line 23: Group 'vpc' should specify a type
❌ errors.ts: 1 error
   - Line 8: Cannot connect 'undefined' node to 'database'

Summary: 1 valid, 1 warning, 1 error
```

## 📋 `list` - Service & Icon Reference

List available cloud services, icons, and templates.

### Basic Usage

```bash
cloud-diagrams list [options]
```

### List Services

```bash
# All providers
cloud-diagrams list --services

# Specific provider
cloud-diagrams list --provider aws --services
cloud-diagrams list --provider azure --services
cloud-diagrams list --provider gcp --services

# By category
cloud-diagrams list --provider aws --category compute
cloud-diagrams list --provider azure --category database
```

### List Icons

```bash
# All icons
cloud-diagrams list --icons

# Provider-specific icons
cloud-diagrams list --provider aws --icons

# Search icons
cloud-diagrams list --icons --search "database"
cloud-diagrams list --icons --search "compute" --provider aws
```

### List Templates

```bash
# All templates
cloud-diagrams list --templates

# Provider-specific templates
cloud-diagrams list --provider aws --templates
```

### Options

```bash
Options:
  -p, --provider <provider>     Filter by provider (aws|azure|gcp)
  -c, --category <category>     Filter by service category
  -s, --services               List available services
  -i, --icons                  List available icons
  -t, --templates              List available templates
  --search <term>              Search services/icons by name
  --format <format>            Output format (table|json|csv) [default: "table"]
  --output <file>              Save output to file
```

### Example Output

```bash
$ cloud-diagrams list --provider aws --category compute

AWS Compute Services:
┌─────────────┬─────────────────────┬──────────────────────────────┐
│ Service     │ Class Name          │ Description                  │
├─────────────┼─────────────────────┼──────────────────────────────┤
│ EC2         │ EC2                 │ Elastic Compute Cloud        │
│ Lambda      │ Lambda              │ Serverless Functions         │
│ ECS         │ ECS                 │ Elastic Container Service    │
│ Fargate     │ Fargate             │ Serverless Containers        │
│ Batch       │ Batch               │ Batch Computing              │
│ Lightsail   │ Lightsail           │ Simple Virtual Servers       │
└─────────────┴─────────────────────┴──────────────────────────────┘
```

## 🔄 `export` - Format Conversion

Convert between different diagram formats.

### Basic Usage

```bash
cloud-diagrams export <input> <output> [options]
```

### Conversion Examples

```bash
# JSON to SVG
cloud-diagrams export specification.json diagram.svg

# TypeScript to PNG
cloud-diagrams export diagram.ts architecture.png --width 1920 --height 1080

# SVG to PDF
cloud-diagrams export diagram.svg document.pdf

# Batch conversion
cloud-diagrams export src/*.ts dist/ --format png
```

### Options

```bash
Options:
  -f, --format <format>         Target format (svg|png|pdf|json)
  -w, --width <pixels>          Image width [default: 1200]
  -h, --height <pixels>         Image height [default: 800]
  --theme <theme>               Diagram theme [default: "default"]
  --background <color>          Background color [default: "white"]
  --quality <number>            Image quality 0-100 [default: 90]
  --overwrite                   Overwrite existing files
```

## 🔄 CI/CD Integration

### GitHub Actions

Create `.github/workflows/diagrams.yml`:

```yaml
name: Generate Architecture Diagrams

on:
  push:
    branches: [main]
    paths: ['diagrams/**/*.ts']
  pull_request:
    paths: ['diagrams/**/*.ts']

jobs:
  generate-diagrams:
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
        run: cloud-diagrams validate diagrams/*.ts --strict

      - name: Generate SVG diagrams
        run: |
          mkdir -p docs/diagrams
          cloud-diagrams generate diagrams/architecture.ts -o docs/diagrams/architecture.svg
          cloud-diagrams generate diagrams/deployment.ts -o docs/diagrams/deployment.svg

      - name: Generate PNG diagrams
        run: |
          cloud-diagrams generate diagrams/architecture.ts -f png -o docs/diagrams/architecture.png --width 1920 --height 1080

      - name: Commit generated diagrams
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/diagrams/
          git diff --staged --quiet || git commit -m "Update generated diagrams"
          git push
```

### GitLab CI

Create `.gitlab-ci.yml`:

```yaml
stages:
  - validate
  - generate
  - deploy

variables:
  NODE_VERSION: '18'

validate-diagrams:
  stage: validate
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm install -g @cloud-diagrams/cli
    - cloud-diagrams validate diagrams/*.ts --strict
  only:
    changes:
      - diagrams/**/*.ts

generate-diagrams:
  stage: generate
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm install -g @cloud-diagrams/cli
    - mkdir -p public/diagrams
    - cloud-diagrams generate diagrams/architecture.ts -o public/diagrams/architecture.svg
    - cloud-diagrams generate diagrams/architecture.ts -f png -o public/diagrams/architecture.png --width 1920 --height 1080
  artifacts:
    paths:
      - public/diagrams/
  only:
    changes:
      - diagrams/**/*.ts

pages:
  stage: deploy
  script:
    - echo "Deploying diagrams to GitLab Pages"
  artifacts:
    paths:
      - public
  only:
    - main
```

### Jenkins Pipeline

Create `Jenkinsfile`:

```groovy
pipeline {
    agent any

    tools {
        nodejs '18'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npm install -g @cloud-diagrams/cli'
            }
        }

        stage('Validate Diagrams') {
            steps {
                sh 'cloud-diagrams validate diagrams/*.ts --strict'
            }
        }

        stage('Generate Diagrams') {
            steps {
                sh 'mkdir -p build/diagrams'
                sh 'cloud-diagrams generate diagrams/architecture.ts -o build/diagrams/architecture.svg'
                sh 'cloud-diagrams generate diagrams/architecture.ts -f png -o build/diagrams/architecture.png --width 1920 --height 1080'
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'build/diagrams/*', fingerprint: true
            }
        }
    }

    post {
        always {
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'build/diagrams',
                reportFiles: '*.svg',
                reportName: 'Architecture Diagrams'
            ])
        }
    }
}
```

## 📁 Configuration File

Create `diagram-config.json` for project-wide settings:

```json
{
  "version": "1.0",
  "defaults": {
    "theme": "default",
    "format": "svg",
    "width": 1200,
    "height": 800,
    "interactive": true,
    "validation": {
      "strict": true,
      "rules": ["syntax", "types", "naming", "connections"]
    }
  },
  "providers": {
    "aws": {
      "region": "us-east-1",
      "profile": "default"
    },
    "azure": {
      "subscription": "default"
    },
    "gcp": {
      "project": "my-project"
    }
  },
  "templates": {
    "custom": {
      "path": "./templates",
      "default": "basic"
    }
  },
  "output": {
    "directory": "./dist",
    "naming": "{name}.{format}",
    "overwrite": true
  }
}
```

## 🔧 Advanced Usage

### Custom Templates

Create custom templates in `templates/` directory:

```typescript
// templates/my-template/diagram.ts
import { Diagram } from '@cloud-diagrams/core';
import { EC2, RDS } from '@cloud-diagrams/aws';

export function createTemplate(name: string, options: any) {
  const diagram = new Diagram(name, options);

  // Template logic here
  const web = diagram.addNode(new EC2('web', 'Web Server'));
  const db = diagram.addNode(new RDS('db', 'Database'));
  diagram.connect(web, db);

  return diagram;
}
```

### Environment Variables

Configure CLI behavior with environment variables:

```bash
# Default provider
export CLOUD_DIAGRAMS_PROVIDER=aws

# Default theme
export CLOUD_DIAGRAMS_THEME=dark

# Output directory
export CLOUD_DIAGRAMS_OUTPUT_DIR=./dist

# Validation level
export CLOUD_DIAGRAMS_VALIDATION_STRICT=true
```

### Scripting and Automation

```bash
#!/bin/bash
# generate-all-diagrams.sh

set -e

echo "Generating all architecture diagrams..."

# Validate first
cloud-diagrams validate diagrams/*.ts --strict

# Generate multiple formats
for diagram in diagrams/*.ts; do
    base=$(basename "$diagram" .ts)
    echo "Processing $base..."

    cloud-diagrams generate "$diagram" -f svg -o "dist/${base}.svg"
    cloud-diagrams generate "$diagram" -f png -o "dist/${base}.png" --width 1920 --height 1080
    cloud-diagrams generate "$diagram" -f pdf -o "dist/${base}.pdf"
done

echo "All diagrams generated successfully!"
```

## 🐛 Troubleshooting

### Common Issues

#### TypeScript Compilation Errors

```bash
# Install TypeScript globally
npm install -g typescript

# Check TypeScript configuration
cloud-diagrams validate diagram.ts --verbose
```

#### Missing Dependencies

```bash
# Install all required packages
npm install @cloud-diagrams/core @cloud-diagrams/aws @cloud-diagrams/azure @cloud-diagrams/gcp

# Verify installation
cloud-diagrams list --services
```

#### Permission Errors

```bash
# Fix global installation permissions (Unix/macOS)
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}

# Use npx instead of global installation
npx @cloud-diagrams/cli generate diagram.ts
```

### Debug Mode

Enable verbose logging:

```bash
# Environment variable
export DEBUG=cloud-diagrams:*

# Command flag
cloud-diagrams generate diagram.ts --verbose
```

## 📚 Examples

### Basic Web Application

```bash
cloud-diagrams init web-app --provider aws --template 3tier
cd web-app
cloud-diagrams generate src/diagram.ts -o architecture.svg --interactive
```

### Microservices Platform

```bash
cloud-diagrams init microservices --provider aws --template microservices
cd microservices
cloud-diagrams generate src/diagram.ts --watch -f png --width 2560 --height 1440
```

### Multi-Cloud Architecture

```bash
cloud-diagrams init hybrid --provider multi --template 3tier
cd hybrid
cloud-diagrams validate src/diagram.ts --strict
cloud-diagrams generate src/diagram.ts -f pdf -o documentation/architecture.pdf
```

## 🔗 Related Documentation

- **[Quick Start Guide](../quick-start.md)** - Get started quickly
- **[AWS Provider](../providers/aws.md)** - AWS services documentation
- **[CI/CD Integration](../ci-cd.md)** - Automated diagram generation
- **[Configuration Guide](../configuration.md)** - Advanced configuration options

---

**Need Help?**

- 📚 [Browse Documentation](../README.md)
- 💬 [Ask Questions](https://github.com/your-org/kloud_diagramming/discussions)
- 🐛 [Report Issues](https://github.com/your-org/kloud_diagramming/issues)
