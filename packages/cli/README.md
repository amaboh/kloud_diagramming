# @cloud-diagrams/cli

Command-line interface for generating cloud architecture diagrams with multi-provider support.

## Installation

```bash
# Global installation
npm install -g @cloud-diagrams/cli

# Local installation
npm install --save-dev @cloud-diagrams/cli
```

## Quick Start

```bash
# Initialize a new project
cloud-diagrams init my-architecture --provider aws --template 3tier

# Generate diagram
cd my-architecture
npm install
npm run build

# Or use the CLI directly
cloud-diagrams generate diagram.ts -o architecture.svg
```

## Commands

### `generate` - Generate diagrams

Generate diagrams from TypeScript, JavaScript, or JSON specifications.

```bash
cloud-diagrams generate <input> [options]

# Examples
cloud-diagrams generate diagram.ts                    # Generate SVG
cloud-diagrams generate diagram.ts -f png             # Generate PNG
cloud-diagrams generate diagram.json -o output.pdf    # Generate PDF from JSON
cloud-diagrams generate diagram.ts --watch            # Watch mode
```

**Options:**

- `-o, --output <path>` - Output file path (default: diagram.svg)
- `-f, --format <format>` - Output format: svg, png, pdf (default: svg)
- `-t, --theme <theme>` - Diagram theme: light, dark (default: light)
- `-d, --direction <direction>` - Layout direction: LR, TB, RL, BT (default: LR)
- `-w, --width <width>` - Output width for raster formats (default: 1200)
- `-h, --height <height>` - Output height for raster formats (default: 800)
- `--interactive` - Enable interactive features in SVG output
- `--no-icons` - Disable cloud provider icons
- `--watch` - Watch input file for changes and regenerate

### `init` - Initialize projects

Create new diagram projects with templates and examples.

```bash
cloud-diagrams init [name] [options]

# Examples
cloud-diagrams init my-app                           # Basic AWS project
cloud-diagrams init web-app --provider azure         # Azure project
cloud-diagrams init microservices --template microservices --provider multi
cloud-diagrams init data-pipeline --template data-pipeline --json
```

**Options:**

- `-p, --provider <provider>` - Primary cloud provider: aws, azure, gcp, multi (default: aws)
- `-t, --template <template>` - Template type: basic, 3tier, microservices, data-pipeline (default: basic)
- `--typescript` - Generate TypeScript template (default: true)
- `--json` - Generate JSON template instead of TypeScript

### `validate` - Validate diagrams

Check diagram syntax and structure for errors.

```bash
cloud-diagrams validate <input> [options]

# Examples
cloud-diagrams validate diagram.ts                   # Basic validation
cloud-diagrams validate diagram.ts --strict          # Strict validation
```

**Options:**

- `--strict` - Enable strict validation mode

### `list` - List available services

Show available cloud services and icons from all providers.

```bash
cloud-diagrams list [options]

# Examples
cloud-diagrams list                                  # List all services
cloud-diagrams list --provider aws                   # AWS services only
cloud-diagrams list --category compute               # Compute services only
cloud-diagrams list --icons                          # Show icon availability
```

**Options:**

- `-p, --provider <provider>` - Filter by provider: aws, azure, gcp
- `-c, --category <category>` - Filter by service category
- `--icons` - Show icon availability

### `export` - Convert between formats

Export existing diagrams to different formats.

```bash
cloud-diagrams export <input> [options]

# Examples
cloud-diagrams export diagram.svg -f png             # SVG to PNG
cloud-diagrams export diagram.ts -f pdf              # TypeScript to PDF
cloud-diagrams export diagram.ts -f json             # Extract JSON spec
```

**Options:**

- `-f, --format <format>` - Target format: svg, png, pdf, json (default: png)
- `-o, --output <path>` - Output file path
- `-w, --width <width>` - Output width for raster formats (default: 1200)
- `-h, --height <height>` - Output height for raster formats (default: 800)
- `-q, --quality <quality>` - Output quality 0.1-1.0 (default: 0.9)

## Input Formats

### TypeScript/JavaScript

```typescript
import { Diagram } from "@cloud-diagrams/core";
import * as AWS from "@cloud-diagrams/aws";

const diagram = new Diagram("My Architecture", {
  direction: "LR",
  theme: "light",
});

const webServer = diagram.addNode(AWS.EC2("Web Server"));
const database = diagram.addNode(AWS.RDS("Database"));

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

## Templates

### Basic

Simple two-tier architecture with web server and database.

### 3-Tier

Traditional three-tier web application with load balancer, web servers, application servers, and database.

### Microservices

Microservices architecture with API gateway, multiple services, databases, and message queues.

### Data Pipeline

Data processing pipeline with sources, processing, storage, and analytics components.

## Multi-Provider Support

The CLI supports diagrams with services from multiple cloud providers:

```typescript
import { Diagram } from "@cloud-diagrams/core";
import * as AWS from "@cloud-diagrams/aws";
import * as Azure from "@cloud-diagrams/azure";
import * as GCP from "@cloud-diagrams/gcp";

const diagram = new Diagram("Multi-Cloud Architecture");

const awsWeb = diagram.addNode(AWS.EC2("AWS Web Server"));
const azureDB = diagram.addNode(Azure.SQLDatabase("Azure Database"));
const gcpStorage = diagram.addNode(GCP.CloudStorage("GCP Storage"));

diagram.connect(awsWeb, azureDB);
diagram.connect(awsWeb, gcpStorage);
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Generate Architecture Diagrams

on:
  push:
    paths: ["diagrams/**"]

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm install -g @cloud-diagrams/cli

      - name: Generate diagrams
        run: |
          cloud-diagrams generate diagrams/architecture.ts -f svg -o docs/architecture.svg
          cloud-diagrams generate diagrams/architecture.ts -f png -o docs/architecture.png

      - name: Commit generated diagrams
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

## Configuration

### Environment Variables

- `DEBUG=1` - Enable debug output
- `CLOUD_DIAGRAMS_CACHE_DIR` - Custom cache directory
- `PUPPETEER_EXECUTABLE_PATH` - Custom Puppeteer executable path

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

## Troubleshooting

### Common Issues

**TypeScript compilation errors:**

```bash
# Install TypeScript globally
npm install -g typescript

# Or use local TypeScript
npx tsc --version
```

**Puppeteer issues:**

```bash
# Install Chromium dependencies (Linux)
sudo apt-get install -y chromium-browser

# Or set custom executable
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
```

**Memory issues with large diagrams:**

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
```

### Debug Mode

Enable debug output for troubleshooting:

```bash
DEBUG=1 cloud-diagrams generate diagram.ts
```

## Examples

See the [examples directory](./examples) for complete working examples:

- [AWS 3-Tier Web Application](./examples/aws-3tier.ts)
- [Azure Microservices](./examples/azure-microservices.ts)
- [GCP Data Pipeline](./examples/gcp-data-pipeline.ts)
- [Multi-Cloud Architecture](./examples/multi-cloud.ts)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

MIT - see [LICENSE](../../LICENSE) for details.
