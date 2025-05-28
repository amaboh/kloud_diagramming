# Contributing to @kloud-diagramming/core

Thank you for your interest in contributing to @kloud-diagramming/core! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- Git

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/kloud-diagramming-core.git
   cd kloud-diagramming-core
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build the Project**
   ```bash
   npm run build
   ```

4. **Run Tests**
   ```bash
   npm test
   ```

5. **Start Development Server**
   ```bash
   npm run demo
   ```

## 📁 Project Structure

```
src/
├── core/           # Core diagram classes (Diagram, Node, Edge, Cluster)
├── nodes/          # Cloud service node implementations
│   ├── aws/        # AWS service classes
│   ├── azure/      # Azure service classes
│   └── gcp/        # GCP service classes
├── renderers/      # D3.js renderer implementation
├── icons/          # Icon registry and provider modules
├── utils/          # Utility functions
├── types.ts        # TypeScript type definitions
└── index.ts        # Main exports
```

## 🛠️ Development Workflow

### 1. Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### 2. Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### 3. Building

```bash
# Clean and build
npm run build

# Build in watch mode
npm run dev

# Check bundle size
npm run size-check
```

## 📝 Contribution Types

### 🐛 Bug Fixes

1. Create an issue describing the bug
2. Fork the repository
3. Create a branch: `git checkout -b fix/bug-description`
4. Make your changes
5. Add tests if applicable
6. Submit a pull request

### ✨ New Features

1. Create an issue to discuss the feature
2. Wait for approval from maintainers
3. Fork the repository
4. Create a branch: `git checkout -b feature/feature-name`
5. Implement the feature
6. Add comprehensive tests
7. Update documentation
8. Submit a pull request

### 🏗️ Adding New Cloud Services

To add a new cloud service node:

1. **Create the service class** in the appropriate provider directory:
   ```typescript
   // src/nodes/aws/NewService.ts
   import { AWSNode } from "../CloudNodes";
   import { NodeOptions } from "../../types";

   export class NewService extends AWSNode {
     constructor(id: string, label: string = "New Service", options: NodeOptions = {}) {
       super(id, label, "newservice", {
         category: "Compute", // or appropriate category
         description: "Description of the new service",
         ...options,
       });
     }
   }
   ```

2. **Export the class** in the provider's index file:
   ```typescript
   // src/nodes/aws/AWSServices.ts
   export { NewService } from "./NewService";
   ```

3. **Add to main exports**:
   ```typescript
   // src/index.ts
   export { NewService } from "./nodes/aws/AWSServices";
   ```

4. **Add tests**:
   ```typescript
   // tests/nodes/aws/NewService.test.ts
   import { NewService } from "../../../src/nodes/aws/AWSServices";

   describe("NewService", () => {
     it("should create a new service node", () => {
       const service = new NewService("test", "Test Service");
       expect(service.provider).toBe("aws");
       expect(service.service).toBe("newservice");
     });
   });
   ```

### 🎨 Adding Icons

1. **Add icon data** to the appropriate provider file:
   ```typescript
   // src/icons/aws.ts
   export const awsIcons: Record<string, IconData> = {
     newservice: {
       svg: "data:image/svg+xml;base64,...",
       metadata: {
         name: "AWS New Service",
         description: "New service icon",
         category: "Compute",
         provider: "aws",
         service: "newservice",
         tags: ["aws", "compute"],
         version: "1.0.0",
       },
     },
   };
   ```

2. **Test the icon** in the demo

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows the project's style guidelines
- [ ] Tests pass locally
- [ ] New features include tests
- [ ] Documentation is updated
- [ ] Commit messages are clear and descriptive

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass
- [ ] New tests added
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

## 🧪 Testing Guidelines

### Unit Tests

- Write tests for all new functions and classes
- Use descriptive test names
- Test both success and error cases
- Aim for high code coverage

### Integration Tests

- Test complete workflows
- Test renderer functionality
- Test icon loading and fallbacks

### Example Test Structure

```typescript
describe("ComponentName", () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  describe("methodName", () => {
    it("should handle normal case", () => {
      // Test implementation
    });

    it("should handle edge case", () => {
      // Test implementation
    });

    it("should throw error for invalid input", () => {
      // Test implementation
    });
  });
});
```

## 📚 Documentation

### Code Documentation

- Use JSDoc comments for all public APIs
- Include examples in documentation
- Document complex algorithms
- Keep comments up to date

### README Updates

- Update examples when adding features
- Keep API documentation current
- Add new service classes to the list

## 🚀 Release Process

1. **Version Bump**: Update version in `package.json`
2. **Changelog**: Update `CHANGELOG.md`
3. **Build**: Run `npm run build`
4. **Test**: Run `npm run validate`
5. **Tag**: Create git tag
6. **Publish**: Run `npm publish`

## 🤝 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow the project's code of conduct

### Communication

- Use GitHub issues for bug reports and feature requests
- Use GitHub discussions for questions and ideas
- Be clear and concise in communications
- Provide examples when possible

## 🆘 Getting Help

- **Documentation**: Check the [docs](../README.md)
- **Issues**: Search existing issues first
- **Discussions**: Use GitHub discussions for questions
- **Examples**: Check the `examples/` directory

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to @kloud-diagramming/core! 🎉 