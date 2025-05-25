# 🤝 Contributing to @cloud-diagrams

Thank you for your interest in contributing to the `@cloud-diagrams` project! This guide will help you get started with development, understand our processes, and make meaningful contributions.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Release Process](#release-process)
- [Community Guidelines](#community-guidelines)

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **Git** (v2.30.0 or higher)
- **TypeScript** (v5.0.0 or higher)

### Quick Setup

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/kloud_diagramming.git
cd kloud_diagramming/cloud-diagrams-ts

# 3. Install dependencies
npm install

# 4. Build all packages
npm run build

# 5. Run tests to verify setup
npm test

# 6. Create a new branch for your feature
git checkout -b feature/your-feature-name
```

## 🏗️ Development Setup

### Local Environment Setup

1. **Clone and Install**

   ```bash
   git clone https://github.com/amaboh/kloud_diagramming.git
   cd kloud_diagramming/cloud-diagrams-ts
   npm install
   ```

2. **Verify Installation**

   ```bash
   # Check if all packages build successfully
   npm run build

   # Verify tests pass
   npm test

   # Check linting
   npm run lint
   ```

3. **Development Scripts**

   ```bash
   # Build all packages
   npm run build

   # Build in watch mode for development
   npm run dev

   # Run tests
   npm test

   # Run tests in watch mode
   npm run test:watch

   # Lint code
   npm run lint

   # Fix linting issues
   npm run lint:fix

   # Clean build artifacts
   npm run clean
   ```

### IDE Setup

#### VS Code (Recommended)

1. **Install Extensions:**

   - TypeScript and JavaScript Language Features
   - ESLint
   - Prettier
   - Jest
   - GitLens

2. **Workspace Settings (`.vscode/settings.json`):**
   ```json
   {
     "typescript.preferences.useAliasesForRenames": false,
     "typescript.suggest.autoImports": true,
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "eslint.workingDirectories": ["packages/*"],
     "jest.jestCommandLine": "npm test --",
     "files.exclude": {
       "**/node_modules": true,
       "**/dist": true
     }
   }
   ```

#### WebStorm/IntelliJ

1. Enable TypeScript support
2. Configure ESLint and Prettier
3. Set up Jest test runner
4. Configure code style according to `.eslintrc.js`

## 📁 Project Structure

```
cloud-diagrams-ts/
├── packages/                          # Monorepo packages
│   ├── core/                         # Core library
│   │   ├── src/
│   │   │   ├── dsl/                  # Domain Specific Language
│   │   │   │   ├── diagram.ts        # Main Diagram class
│   │   │   │   ├── node.ts           # Base Node classes
│   │   │   │   ├── edge.ts           # Edge/Connection classes
│   │   │   │   └── group.ts          # Group/Container classes
│   │   │   ├── rendering/            # Diagram rendering
│   │   │   │   ├── mermaid-renderer.ts
│   │   │   │   └── renderer.interface.ts
│   │   │   ├── icons/                # Icon management
│   │   │   │   ├── icon-registry.ts
│   │   │   │   └── types.ts
│   │   │   ├── themes/               # Visual themes
│   │   │   ├── utils/                # Utility functions
│   │   │   ├── export/               # Export functionality
│   │   │   └── types.ts              # TypeScript definitions
│   │   ├── tests/                    # Test files
│   │   ├── package.json
│   │   ├── rollup.config.js
│   │   └── tsconfig.json
│   ├── aws/                          # AWS services
│   │   ├── src/
│   │   │   ├── services/             # AWS service implementations
│   │   │   │   ├── compute/          # EC2, Lambda, etc.
│   │   │   │   ├── database/         # RDS, DynamoDB, etc.
│   │   │   │   ├── storage/          # S3, EBS, etc.
│   │   │   │   └── network/          # VPC, Load Balancers, etc.
│   │   │   └── icons/                # AWS icon pack
│   │   └── ...
│   ├── azure/                        # Azure services
│   ├── gcp/                          # Google Cloud services
│   ├── react/                        # React components
│   │   ├── src/
│   │   │   ├── components/           # React components
│   │   │   ├── hooks/                # Custom hooks
│   │   │   ├── contexts/             # React contexts
│   │   │   └── hoc/                  # Higher-order components
│   │   └── ...
│   └── cli/                          # Command-line interface
│       ├── src/
│       │   ├── commands/             # CLI command implementations
│       │   ├── utils/                # CLI utilities
│       │   └── cli.ts                # Main CLI entry point
│       └── ...
├── examples/                         # Usage examples
├── docs/                            # Documentation
├── .github/                         # GitHub workflows and templates
├── lerna.json                       # Lerna configuration
├── package.json                     # Root package.json
├── tsconfig.json                    # Root TypeScript config
└── README.md
```

## 🔄 Development Workflow

### 1. Planning Your Contribution

Before starting development:

1. **Check existing issues** to avoid duplicating work
2. **Create an issue** for new features or bug reports
3. **Discuss your approach** in the issue comments
4. **Get approval** for significant changes

### 2. Creating a Branch

```bash
# Feature branches
git checkout -b feature/aws-ecs-support
git checkout -b feature/react-theme-switcher

# Bug fix branches
git checkout -b fix/mermaid-rendering-issue
git checkout -b fix/cli-export-error

# Documentation branches
git checkout -b docs/update-readme
git checkout -b docs/api-documentation
```

### 3. Development Process

1. **Make your changes** following coding standards
2. **Write tests** for new functionality
3. **Update documentation** as needed
4. **Test thoroughly** in multiple scenarios
5. **Commit with clear messages**

### 4. Testing Your Changes

```bash
# Run all tests
npm test

# Test specific package
npm test -- packages/core

# Run tests in watch mode during development
npm run test:watch

# Build to check for TypeScript errors
npm run build

# Lint your code
npm run lint

# Integration test with CLI
cd packages/cli && npm run build
npm test

# Test examples
cd examples/basic && npm install && npm run build
```

## 📝 Coding Standards

### TypeScript Style Guide

#### 1. File Organization

```typescript
// 1. External library imports
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

// 2. Internal imports from other packages
import { Diagram } from '@cloud-diagrams/core';

// 3. Relative imports
import { AWSNode } from '../base/aws-node';
import { IconDefinition } from './types';

// 4. Type-only imports (separate from value imports)
import type { NodeMetadata, RenderOptions } from '@cloud-diagrams/core';
```

#### 2. Naming Conventions

```typescript
// Classes: PascalCase
class DiagramRenderer {
  // Public methods: camelCase
  public renderDiagram(): string {}

  // Private methods: camelCase with underscore prefix
  private _validateInput(): boolean {}

  // Constants: SCREAMING_SNAKE_CASE
  private static readonly DEFAULT_THEME = 'default';
}

// Interfaces: PascalCase with 'I' prefix (optional)
interface NodeMetadata {
  label?: string;
  description?: string;
}

// Types: PascalCase
type CloudProvider = 'aws' | 'azure' | 'gcp';

// Variables and functions: camelCase
const diagramInstance = new Diagram();
const renderToSVG = (diagram: Diagram) => {};

// Constants: camelCase or SCREAMING_SNAKE_CASE for module-level
const defaultConfig = {};
const API_BASE_URL = 'https://api.example.com';
```

#### 3. Class Structure

```typescript
class EC2 extends AWSNode {
  // 1. Static properties
  private static readonly DEFAULT_INSTANCE_TYPE = 't3.micro';

  // 2. Instance properties
  private readonly instanceType: string;
  private readonly availabilityZone?: string;

  // 3. Constructor
  constructor(id: string, metadata?: EC2Metadata) {
    super(id, 'ec2', metadata);
    this.instanceType = metadata?.instanceType || EC2.DEFAULT_INSTANCE_TYPE;
    this.availabilityZone = metadata?.availabilityZone;
  }

  // 4. Public methods
  public getInstanceType(): string {
    return this.instanceType;
  }

  public setAvailabilityZone(zone: string): void {
    this.availabilityZone = zone;
  }

  // 5. Private methods
  private _validateInstanceType(type: string): boolean {
    return /^[a-z0-9]+\.[a-z0-9]+$/.test(type);
  }
}
```

#### 4. Function Signatures

```typescript
// Use explicit return types for public APIs
public renderDiagram(
  diagram: Diagram,
  options?: RenderOptions
): Promise<string> {
  // Implementation
}

// Use type guards when appropriate
function isAWSNode(node: Node): node is AWSNode {
  return node.provider === 'aws';
}

// Use generic constraints
function createNode<T extends Node>(
  nodeClass: new (...args: any[]) => T,
  ...args: any[]
): T {
  return new nodeClass(...args);
}
```

### Code Quality Rules

#### 1. Error Handling

```typescript
// Use specific error types
class DiagramValidationError extends Error {
  constructor(
    message: string,
    public readonly diagram: Diagram
  ) {
    super(message);
    this.name = 'DiagramValidationError';
  }
}

// Handle errors gracefully
async function renderDiagram(diagram: Diagram): Promise<string> {
  try {
    const validated = this._validateDiagram(diagram);
    return await this._render(validated);
  } catch (error) {
    if (error instanceof DiagramValidationError) {
      console.error('Validation failed:', error.message);
      throw new Error(`Invalid diagram: ${error.message}`);
    }
    throw error; // Re-throw unexpected errors
  }
}
```

#### 2. Documentation

````typescript
/**
 * Represents an AWS EC2 instance in a cloud architecture diagram.
 *
 * @example
 * ```typescript
 * const webServer = new EC2('web-server', {
 *   label: 'Web Server',
 *   instanceType: 't3.medium',
 *   availabilityZone: 'us-east-1a'
 * });
 * ```
 */
class EC2 extends AWSNode {
  /**
   * Creates a new EC2 instance node.
   *
   * @param id - Unique identifier for this node
   * @param metadata - Optional metadata including instance configuration
   * @throws {Error} When instance type is invalid
   */
  constructor(id: string, metadata?: EC2Metadata) {
    // Implementation
  }

  /**
   * Gets the EC2 instance type (e.g., 't3.medium').
   *
   * @returns The instance type string
   */
  public getInstanceType(): string {
    return this.instanceType;
  }
}
````

### React Component Standards

#### 1. Component Structure

```tsx
import React, { useState, useCallback, useMemo } from 'react';
import type { DiagramProps } from './types';

/**
 * Renders a cloud architecture diagram with interactive features.
 */
export const DiagramRenderer: React.FC<DiagramProps> = ({
  diagram,
  theme = 'default',
  width = 800,
  height = 600,
  onNodeClick,
  className,
}) => {
  // 1. State declarations
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 2. Memoized values
  const diagramConfig = useMemo(
    () => ({
      theme,
      width,
      height,
    }),
    [theme, width, height]
  );

  // 3. Callbacks
  const handleNodeClick = useCallback(
    (nodeId: string) => {
      onNodeClick?.(nodeId);
    },
    [onNodeClick]
  );

  // 4. Effects
  useEffect(() => {
    // Implementation
  }, [diagram]);

  // 5. Render logic
  if (error) {
    return <div className="diagram-error">Error: {error.message}</div>;
  }

  return (
    <div className={`diagram-container ${className || ''}`}>
      {/* Component JSX */}
    </div>
  );
};
```

#### 2. Custom Hooks

```typescript
/**
 * Hook for managing diagram state and operations.
 */
export function useDiagram(initialDiagram?: Diagram) {
  const [diagram, setDiagram] = useState(initialDiagram);
  const [history, setHistory] = useState<Diagram[]>([]);

  const addNode = useCallback(
    (node: Node) => {
      if (!diagram) return;

      const newDiagram = diagram.clone();
      newDiagram.addNode(node);
      setDiagram(newDiagram);
      setHistory((prev) => [...prev, diagram]);
    },
    [diagram]
  );

  const undo = useCallback(() => {
    if (history.length === 0) return;

    const previousDiagram = history[history.length - 1];
    setDiagram(previousDiagram);
    setHistory((prev) => prev.slice(0, -1));
  }, [history]);

  return {
    diagram,
    addNode,
    undo,
    canUndo: history.length > 0,
  };
}
```

## 🧪 Testing Requirements

### Test Structure

Each package should have comprehensive tests:

```
packages/core/
├── src/
│   └── dsl/
│       └── diagram.ts
└── tests/
    ├── unit/
    │   └── dsl/
    │       └── diagram.test.ts
    ├── integration/
    │   └── rendering.test.ts
    └── fixtures/
        └── sample-diagrams.ts
```

### Unit Tests

```typescript
// packages/core/tests/unit/dsl/diagram.test.ts
import { Diagram } from '../../../src/dsl/diagram';
import { EC2 } from '@cloud-diagrams/aws';

describe('Diagram', () => {
  let diagram: Diagram;

  beforeEach(() => {
    diagram = new Diagram('Test Diagram');
  });

  afterEach(() => {
    diagram.dispose?.();
  });

  describe('constructor', () => {
    it('should create diagram with title', () => {
      expect(diagram.getTitle()).toBe('Test Diagram');
    });

    it('should initialize with empty nodes', () => {
      expect(diagram.getNodes()).toHaveLength(0);
    });
  });

  describe('addNode', () => {
    it('should add node to diagram', () => {
      const node = new EC2('test-node');
      diagram.addNode(node);

      expect(diagram.getNodes()).toHaveLength(1);
      expect(diagram.getNode('test-node')).toBe(node);
    });

    it('should throw error for duplicate node IDs', () => {
      const node1 = new EC2('duplicate');
      const node2 = new EC2('duplicate');

      diagram.addNode(node1);
      expect(() => diagram.addNode(node2)).toThrow(
        'Node with ID "duplicate" already exists'
      );
    });
  });

  describe('connect', () => {
    it('should connect two nodes', () => {
      const node1 = new EC2('node1');
      const node2 = new EC2('node2');

      diagram.addNode(node1);
      diagram.addNode(node2);
      diagram.connect(node1, node2);

      expect(diagram.getConnections()).toHaveLength(1);
    });

    it('should throw error when connecting non-existent nodes', () => {
      const node1 = new EC2('node1');
      const node2 = new EC2('node2');

      expect(() => diagram.connect(node1, node2)).toThrow();
    });
  });
});
```

### Integration Tests

```typescript
// packages/core/tests/integration/rendering.test.ts
import { Diagram, MermaidRenderer } from '../../src';
import { EC2, RDS } from '@cloud-diagrams/aws';

describe('Diagram Rendering Integration', () => {
  let renderer: MermaidRenderer;

  beforeEach(() => {
    renderer = new MermaidRenderer();
  });

  it('should render simple diagram to mermaid syntax', async () => {
    const diagram = new Diagram('Integration Test');
    const web = new EC2('web', { label: 'Web Server' });
    const db = new RDS('db', { label: 'Database' });

    diagram.addNode(web);
    diagram.addNode(db);
    diagram.connect(web, db);

    const mermaidCode = await renderer.render(diagram);

    expect(mermaidCode).toContain('flowchart TD');
    expect(mermaidCode).toContain('web["Web Server"]');
    expect(mermaidCode).toContain('db["Database"]');
    expect(mermaidCode).toContain('web --> db');
  });

  it('should render diagram with groups', async () => {
    const diagram = new Diagram('Group Test');
    const group = new Group('vpc', { label: 'VPC' });
    const web = new EC2('web');

    group.addNode(web);
    diagram.addGroup(group);

    const mermaidCode = await renderer.render(diagram);

    expect(mermaidCode).toContain('subgraph vpc["VPC"]');
    expect(mermaidCode).toContain('end');
  });
});
```

### React Component Tests

```tsx
// packages/react/tests/components/DiagramRenderer.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DiagramRenderer } from '../../src/components/DiagramRenderer';
import { Diagram } from '@cloud-diagrams/core';
import { EC2 } from '@cloud-diagrams/aws';

// Mock the Mermaid library
jest.mock('mermaid', () => ({
  initialize: jest.fn(),
  render: jest.fn().mockResolvedValue('<svg>mocked svg</svg>'),
}));

describe('DiagramRenderer', () => {
  let mockDiagram: Diagram;

  beforeEach(() => {
    mockDiagram = new Diagram('Test');
    mockDiagram.addNode(new EC2('test-node'));
  });

  it('should render diagram container', () => {
    render(<DiagramRenderer diagram={mockDiagram} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should handle node click events', () => {
    const onNodeClick = jest.fn();
    render(<DiagramRenderer diagram={mockDiagram} onNodeClick={onNodeClick} />);

    const svgElement = screen.getByRole('img');
    fireEvent.click(svgElement);

    // Test implementation depends on how click events are handled
  });

  it('should apply custom className', () => {
    render(
      <DiagramRenderer diagram={mockDiagram} className="custom-diagram" />
    );

    expect(document.querySelector('.custom-diagram')).toBeInTheDocument();
  });
});
```

### Test Coverage Requirements

- **Minimum Coverage**: 80% for all packages
- **Critical Paths**: 95% coverage for core DSL classes
- **Public APIs**: 100% coverage for all exported functions
- **Error Paths**: All error conditions must be tested

```bash
# Check coverage
npm run test -- --coverage

# Coverage report will show:
# - Lines: 80%+ required
# - Functions: 85%+ required
# - Branches: 75%+ required
# - Statements: 80%+ required
```

## 🔄 Pull Request Process

### 1. Before Submitting

- [ ] All tests pass (`npm test`)
- [ ] Code builds successfully (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] Documentation updated if needed
- [ ] Change described in CHANGELOG.md (for significant changes)

### 2. PR Template

```markdown
## Description

Brief description of changes and motivation.

## Type of Change

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that causes existing functionality to change)
- [ ] Documentation update

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] New tests added for new functionality

## Screenshots (if applicable)

Include screenshots for UI changes.

## Checklist

- [ ] My code follows the project's coding standards
- [ ] I have performed a self-review of my code
- [ ] I have commented my code in hard-to-understand areas
- [ ] I have updated documentation as needed
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally
```

### 3. Review Process

1. **Automated Checks**: All CI checks must pass
2. **Code Review**: At least one maintainer review required
3. **Testing**: Reviewer will test functionality
4. **Documentation**: Verify docs are updated
5. **Merge**: Squash and merge after approval

## 🐛 Issue Guidelines

### Bug Reports

Use this template for bug reports:

````markdown
**Bug Description**
A clear description of the bug.

**To Reproduce**
Steps to reproduce the behavior:

1. Install packages '...'
2. Create diagram with '...'
3. Call method '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**

- Node.js version: [e.g. 18.16.0]
- npm version: [e.g. 9.5.1]
- Package version: [e.g. @cloud-diagrams/core@0.1.0]
- Operating System: [e.g. macOS 13.4]

**Code Sample**

```typescript
// Minimal code sample that reproduces the issue
const diagram = new Diagram('Bug Example');
// ...
```
````

**Additional Context**
Any other context about the problem.

````

### Feature Requests

```markdown
**Feature Description**
Clear description of the requested feature.

**Use Case**
Describe the problem this feature would solve.

**Proposed Solution**
Describe your preferred solution.

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Screenshots, mockups, or examples.
````

## 📦 Release Process

### Version Management

We use semantic versioning (SemVer):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

### Release Steps

1. **Update Version Numbers**

   ```bash
   # Update all package versions
   npx lerna version --conventional-commits
   ```

2. **Generate Changelog**

   ```bash
   # Generate changelog from commit messages
   npx conventional-changelog -p angular -i CHANGELOG.md -s
   ```

3. **Build and Test**

   ```bash
   npm run clean
   npm run build
   npm test
   ```

4. **Publish to npm**

   ```bash
   # Publish all packages
   npx lerna publish from-package
   ```

5. **Create GitHub Release**
   - Tag the release
   - Upload build artifacts
   - Include changelog

## 🌟 Community Guidelines

### Code of Conduct

We are committed to providing a welcoming and inclusive environment:

1. **Be Respectful**: Treat everyone with respect and kindness
2. **Be Inclusive**: Welcome people of all backgrounds and identities
3. **Be Collaborative**: Share knowledge and help others learn
4. **Be Constructive**: Provide helpful feedback and suggestions

### Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Documentation**: Check TUTORIAL.md and API docs first
- **Examples**: Look at examples/ directory for usage patterns

### Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes for significant contributions
- Special recognition for major features or fixes

## 🎯 Priorities for Contributors

We welcome contributions in these areas:

### High Priority

- **New Cloud Services**: Expand AWS, Azure, GCP service coverage
- **Bug Fixes**: Address any issues or unexpected behavior
- **Performance**: Optimize rendering for large diagrams
- **Documentation**: Improve examples and tutorials

### Medium Priority

- **New Cloud Providers**: Add support for other cloud platforms
- **Themes**: Create new visual themes and customization options
- **CLI Features**: Enhance command-line functionality
- **React Components**: Add new interactive components

### Low Priority

- **Examples**: Create more real-world examples
- **Integrations**: Add support for other frameworks
- **Tooling**: Improve development and build processes

## 📞 Contact

- **Maintainer**: amaboh
- **Repository**: https://github.com/amaboh/kloud_diagramming
- **Issues**: https://github.com/amaboh/kloud_diagramming/issues

---

Thank you for contributing to @cloud-diagrams! Your contributions help make cloud architecture diagramming accessible to developers worldwide. 🚀
