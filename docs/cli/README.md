# 💻 CLI Tool Documentation

> **Complete guide to the Cloud Diagrams TypeScript command-line interface**

The CLI tool provides a powerful command-line interface for generating, validating, and managing cloud architecture diagrams. Perfect for development workflows, CI/CD pipelines, and automated documentation generation.

## 🚀 Installation

### Global Installation (Recommended)

```bash
npm install -g @cloud-diagrams/cli
```

### Local Project Installation

```bash
npm install --save-dev @cloud-diagrams/cli
```

### Verify Installation

```bash
cloud-diagrams --version
cloud-diagrams --help
```

## 📋 Available Commands

### `init` - Initialize New Projects

Create new diagram projects with templates and boilerplate code.

```bash
# Basic usage
cloud-diagrams init my-project

# With specific provider and template
cloud-diagrams init my-project --provider aws --template 3tier

# Interactive mode
cloud-diagrams init my-project --interactive

# All options
cloud-diagrams init my-project \
    --provider aws \
    --template microservices \
    --typescript \
    --git \
    --description "My cloud architecture"
```

**Options:**

- `--provider <aws|azure|gcp|multi>` - Cloud provider
- `--template <basic|3tier|microservices|data>` - Project template
- `--typescript` - Generate TypeScript files (default)
- `--javascript` - Generate JavaScript files
- `--git` - Initialize Git repository
- `--interactive` - Interactive setup wizard
- `--description <text>` - Project description

### `generate` - Generate Diagrams

Create diagrams from TypeScript, JavaScript, or JSON specifications.

```bash
# Basic generation
cloud-diagrams generate src/architecture.ts

# Specify output file
cloud-diagrams generate src/architecture.ts -o docs/architecture.svg

# Multiple formats
cloud-diagrams generate src/architecture.ts -f png,pdf,svg

# Custom dimensions
cloud-diagrams generate src/architecture.ts \
    -f png \
    --width 1920 \
    --height 1080 \
    --scale 2

# Watch mode for development
cloud-diagrams generate src/architecture.ts --watch

# JSON specification
cloud-diagrams generate architecture.json -o diagram.svg
```

**Options:**

- `-o, --output <file>` - Output file path
- `-f, --format <svg|png|pdf|json>` - Output format(s)
- `--width <number>` - Width in pixels (default: 1200)
- `--height <number>` - Height in pixels (default: 800)
- `--scale <number>` - Scale factor for raster formats (default: 1)
- `--theme <default|dark|light>` - Visual theme
- `--watch` - Watch for file changes and regenerate
- `--background <color>` - Background color
- `--quality <number>` - JPEG quality (10-100)

### `validate` - Validate Diagrams

Check diagram syntax and structure for errors.

```bash
# Basic validation
cloud-diagrams validate src/architecture.ts

# Strict mode (warnings as errors)
cloud-diagrams validate src/architecture.ts --strict

# Multiple files
cloud-diagrams validate src/**/*.ts

# JSON format validation
cloud-diagrams validate architecture.json --format json

# Custom rules
cloud-diagrams validate src/architecture.ts --rules custom-rules.json
```

**Options:**

- `--strict` - Treat warnings as errors
- `--format <typescript|javascript|json>` - Input format
- `--rules <file>` - Custom validation rules
- `--reporter <default|json|junit>` - Output format
- `--max-warnings <number>` - Maximum allowed warnings

### `list` - List Available Services

Show available cloud services and icons from all providers.

```bash
# List all services
cloud-diagrams list

# Filter by provider
cloud-diagrams list --provider aws

# Filter by category
cloud-diagrams list --category compute

# Show with icons
cloud-diagrams list --icons

# JSON output
cloud-diagrams list --format json

# Search services
cloud-diagrams list --search "database"
```

**Options:**

- `--provider <aws|azure|gcp>` - Filter by cloud provider
- `--category <compute|database|storage|network>` - Filter by category
- `--icons` - Show service icons
- `--format <table|json|csv>` - Output format
- `--search <term>` - Search services by name or description

### `export` - Convert Between Formats

Convert diagrams between different formats and specifications.

```bash
# TypeScript to JSON specification
cloud-diagrams export src/architecture.ts -f json -o spec.json

# JSON to multiple formats
cloud-diagrams export spec.json -f svg,png,pdf

# Batch export with templates
cloud-diagrams export src/**/*.ts \
    --format svg \
    --output-dir docs/diagrams \
    --template "{name}-{provider}"

# Export with custom styling
cloud-diagrams export src/architecture.ts \
    -f png \
    --theme custom \
    --style-file custom.css
```

**Options:**

- `-f, --format <format>` - Target format(s)
- `-o, --output <file>` - Output file
- `--output-dir <dir>` - Output directory for batch export
- `--template <pattern>` - Filename template for batch export
- `--theme <theme>` - Visual theme
- `--style-file <file>` - Custom CSS styles

## 🏗️ Project Templates

### Basic Template

Simple two-tier architecture with web server and database.

```bash
cloud-diagrams init my-app --template basic --provider aws
```

Generated structure:

```
my-app/
├── src/
│   └── architecture.ts     # Main diagram file
├── package.json
├── tsconfig.json
└── README.md
```

### 3-Tier Template

Traditional web application with load balancer, web servers, and database.

```bash
cloud-diagrams init my-webapp --template 3tier --provider aws
```

Generated files:

- `src/main-architecture.ts` - Complete 3-tier setup
- `src/components/` - Reusable components
- `src/themes/` - Custom styling

### Microservices Template

API gateway, multiple services, databases, and message queues.

```bash
cloud-diagrams init my-microservices --template microservices --provider aws
```

Generated files:

- `src/microservices.ts` - Main architecture
- `src/services/` - Individual service definitions
- `src/networking/` - Network configuration
- `docker-compose.yml` - Local development setup

### Data Pipeline Template

Data sources, processing, storage, and analytics components.

```bash
cloud-diagrams init my-pipeline --template data --provider aws
```

Generated files:

- `src/data-pipeline.ts` - ETL pipeline
- `src/sources/` - Data source definitions
- `src/processing/` - Processing components
- `src/storage/` - Storage solutions

## 🔧 Configuration

### Global Configuration

Create `~/.cloud-diagrams/config.json`:

```json
{
  "defaultProvider": "aws",
  "defaultTheme": "default",
  "defaultFormat": "svg",
  "outputDir": "./docs/diagrams",
  "watchMode": {
    "debounceMs": 500,
    "ignorePatterns": ["node_modules", "*.tmp"]
  },
  "validation": {
    "strict": false,
    "maxWarnings": 10
  },
  "export": {
    "defaultWidth": 1200,
    "defaultHeight": 800,
    "defaultScale": 1,
    "backgroundColor": "white"
  }
}
```

### Project Configuration

Create `cloud-diagrams.config.js` in your project:

```javascript
module.exports = {
  provider: "aws",
  theme: "default",
  input: {
    patterns: ["src/**/*.ts", "diagrams/**/*.ts"],
    exclude: ["**/*.test.ts", "**/*.spec.ts"],
  },
  output: {
    directory: "docs/diagrams",
    formats: ["svg", "png"],
    dimensions: {
      width: 1920,
      height: 1080,
      scale: 2,
    },
  },
  validation: {
    rules: "custom-rules.json",
    strict: true,
  },
  watch: {
    enabled: true,
    debounce: 300,
    ignore: ["node_modules", "dist"],
  },
};
```

## 🔄 CI/CD Integration

### GitHub Actions

Create `.github/workflows/diagrams.yml`:

```yaml
name: Generate Architecture Diagrams

on:
  push:
    paths:
      - "src/**/*.ts"
      - "diagrams/**/*.ts"
  pull_request:
    paths:
      - "src/**/*.ts"
      - "diagrams/**/*.ts"

jobs:
  generate-diagrams:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Install CLI tool
        run: npm install -g @cloud-diagrams/cli

      - name: Validate diagrams
        run: cloud-diagrams validate src/**/*.ts --strict

      - name: Generate diagrams
        run: |
          cloud-diagrams generate src/architecture.ts \
            -f svg,png,pdf \
            --width 1920 \
            --height 1080 \
            --scale 2

      - name: Upload diagrams
        uses: actions/upload-artifact@v3
        with:
          name: architecture-diagrams
          path: docs/diagrams/

      - name: Commit generated diagrams
        if: github.event_name == 'push'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/diagrams/
          git diff --staged --quiet || git commit -m "Update architecture diagrams"
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
  NODE_VERSION: "18"

validate-diagrams:
  stage: validate
  image: node:${NODE_VERSION}
  before_script:
    - npm ci
    - npm install -g @cloud-diagrams/cli
  script:
    - cloud-diagrams validate src/**/*.ts --strict
  only:
    changes:
      - src/**/*.ts
      - diagrams/**/*.ts

generate-diagrams:
  stage: generate
  image: node:${NODE_VERSION}
  before_script:
    - npm ci
    - npm install -g @cloud-diagrams/cli
  script:
    - mkdir -p docs/diagrams
    - cloud-diagrams generate src/architecture.ts -f svg,png,pdf
    - cloud-diagrams generate src/microservices.ts -f svg,png
  artifacts:
    paths:
      - docs/diagrams/
    expire_in: 1 week
  only:
    - main
    - develop

deploy-docs:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache rsync openssh-client
  script:
    - rsync -av docs/ $DEPLOY_SERVER:/var/www/docs/
  dependencies:
    - generate-diagrams
  only:
    - main
  when: manual
```

### Jenkins Pipeline

Create `Jenkinsfile`:

```groovy
pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18'
    }

    environment {
        CLI_VERSION = 'latest'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npm install -g @cloud-diagrams/cli@${CLI_VERSION}'
            }
        }

        stage('Validate Diagrams') {
            steps {
                sh 'cloud-diagrams validate src/**/*.ts --strict --reporter junit'
            }
            post {
                always {
                    junit 'validation-results.xml'
                }
            }
        }

        stage('Generate Diagrams') {
            parallel {
                stage('SVG Diagrams') {
                    steps {
                        sh '''
                            cloud-diagrams generate src/architecture.ts \
                                -f svg \
                                -o docs/diagrams/architecture.svg
                        '''
                    }
                }
                stage('PNG Diagrams') {
                    steps {
                        sh '''
                            cloud-diagrams generate src/architecture.ts \
                                -f png \
                                --width 1920 \
                                --height 1080 \
                                --scale 2 \
                                -o docs/diagrams/architecture.png
                        '''
                    }
                }
                stage('PDF Documentation') {
                    steps {
                        sh '''
                            cloud-diagrams generate src/architecture.ts \
                                -f pdf \
                                --width 1200 \
                                --height 800 \
                                -o docs/diagrams/architecture.pdf
                        '''
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'docs/diagrams/**/*', fingerprint: true
            }
        }

        stage('Deploy to S3') {
            when {
                branch 'main'
            }
            steps {
                withAWS(credentials: 'aws-docs-deployment') {
                    s3Upload(
                        bucket: 'my-company-docs',
                        path: 'diagrams/',
                        includePathPattern: 'docs/diagrams/**/*',
                        workingDir: '.'
                    )
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            slackSend(
                channel: '#dev-team',
                message: "✅ Architecture diagrams updated successfully: ${env.BUILD_URL}"
            )
        }
        failure {
            slackSend(
                channel: '#dev-team',
                message: "❌ Failed to generate architecture diagrams: ${env.BUILD_URL}"
            )
        }
    }
}
```

## 🔧 Advanced Usage

### Batch Processing

Process multiple diagram files:

```bash
# Generate all diagrams in src/
cloud-diagrams generate src/**/*.ts \
    --format svg \
    --output-dir docs/diagrams

# With custom naming template
cloud-diagrams generate src/**/*.ts \
    --format png \
    --output-dir docs/diagrams \
    --template "{provider}-{name}-{timestamp}"
```

### Custom Themes

Create and use custom themes:

```bash
# Generate with custom theme
cloud-diagrams generate src/architecture.ts \
    --theme custom \
    --style-file themes/company-theme.css

# Preview theme changes
cloud-diagrams generate src/architecture.ts \
    --theme custom \
    --watch \
    --preview
```

### Environment-Specific Configurations

Use different configurations for different environments:

```bash
# Development
cloud-diagrams generate src/architecture.ts \
    --config cloud-diagrams.dev.js

# Production
cloud-diagrams generate src/architecture.ts \
    --config cloud-diagrams.prod.js

# Staging
cloud-diagrams generate src/architecture.ts \
    --config cloud-diagrams.staging.js
```

## 🐛 Troubleshooting

### Common Issues

#### Permission Errors

```bash
# Fix global installation permissions
sudo npm install -g @cloud-diagrams/cli

# Or use npx for one-time usage
npx @cloud-diagrams/cli generate src/architecture.ts
```

#### Memory Issues with Large Diagrams

```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" cloud-diagrams generate large-diagram.ts
```

#### Watch Mode Not Working

```bash
# Check file permissions
ls -la src/

# Use polling mode on some systems
cloud-diagrams generate src/architecture.ts --watch --poll
```

### Debug Mode

Enable verbose logging for troubleshooting:

```bash
# Enable debug output
DEBUG=cloud-diagrams:* cloud-diagrams generate src/architecture.ts

# Log to file
cloud-diagrams generate src/architecture.ts --verbose --log-file debug.log
```

## 📚 Examples

### Complete Workflow Example

```bash
# 1. Initialize new project
cloud-diagrams init my-company-architecture \
    --provider aws \
    --template microservices \
    --git

# 2. Navigate to project
cd my-company-architecture

# 3. Customize architecture
# Edit src/microservices.ts

# 4. Validate changes
cloud-diagrams validate src/microservices.ts --strict

# 5. Generate documentation
cloud-diagrams generate src/microservices.ts \
    -f svg,png,pdf \
    --width 1920 \
    --height 1080

# 6. Start development with watch mode
cloud-diagrams generate src/microservices.ts --watch
```

## 🔗 Integration Examples

### Package.json Scripts

Add CLI commands to your `package.json`:

```json
{
  "scripts": {
    "diagrams:validate": "cloud-diagrams validate src/**/*.ts --strict",
    "diagrams:generate": "cloud-diagrams generate src/architecture.ts -f svg,png",
    "diagrams:watch": "cloud-diagrams generate src/architecture.ts --watch",
    "diagrams:export": "cloud-diagrams export src/**/*.ts --format svg --output-dir docs/",
    "docs:build": "npm run diagrams:generate && npm run docs:compile"
  }
}
```

### Pre-commit Hooks

Add diagram validation to pre-commit hooks using `husky`:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "cloud-diagrams validate src/**/*.ts --strict"
    }
  }
}
```

## 📖 What's Next?

- **[🚀 Quick Start Guide](../quick-start.md)** - Get started with the library
- **[☁️ AWS Provider](../providers/aws.md)** - AWS services documentation
- **[🔄 CI/CD Integration](../cicd.md)** - Advanced automation setups
- **[⚛️ React Integration](../react.md)** - Using with React applications

## 🆘 Need Help?

- **[❓ FAQ](../faq.md)** - Common CLI questions
- **[🐛 Troubleshooting](../troubleshooting.md)** - Solving CLI issues
- **💬 [GitHub Discussions](https://github.com/your-org/kloud_diagramming/discussions)** - Community support

**Happy CLI diagramming! 🚀**
