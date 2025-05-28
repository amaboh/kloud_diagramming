# API Reference

Complete API documentation for @kloud-diagramming/core.

## Core Classes

### Diagram

Main diagram container class with Mingrammer-style operators.

```typescript
class Diagram {
  constructor(id: string, title?: string, config?: DiagramConfig)
  
  // Node management
  addNode(node: Node): void
  removeNode(nodeId: string): void
  getNode(nodeId: string): Node | undefined
  getAllNodes(): Node[]
  
  // Edge management
  addEdge(edge: Edge): void
  removeEdge(edgeId: string): void
  getAllEdges(): Edge[]
  
  // Cluster management
  cluster(label: string, options?: ClusterOptions): Cluster
  addCluster(cluster: Cluster): void
  getAllClusters(): Cluster[]
  
  // Mingrammer-style operators
  rightShift(from: Node | Node[], to: Node | Node[]): Edge[]
  leftShift(from: Node | Node[], to: Node | Node[]): Edge[]
  undirected(from: Node | Node[], to: Node | Node[]): Edge[]
  
  // Rendering
  render(container: string | HTMLElement, options?: RenderOptions): Promise<void>
  export(format: "svg" | "png", options?: ExportOptions): Promise<string | Blob>
}
```

### Node

Base node class for cloud services.

```typescript
class Node {
  constructor(
    id: string,
    label: string,
    provider: CloudProvider,
    service: string,
    options?: NodeOptions
  )
  
  // Properties
  readonly id: string
  readonly label: string
  readonly provider: CloudProvider
  readonly service: string
  position?: { x: number; y: number }
  clusterId?: string
  
  // Methods
  withCluster(clusterId: string): Node
  withPosition(x: number, y: number, fixed?: boolean): Node
  getDisplayName(): string
  getCategory(): string
}
```

### Edge

Connection between nodes.

```typescript
class Edge {
  constructor(
    id: string,
    fromId: string,
    toId: string,
    options?: EdgeOptions
  )
  
  // Properties
  readonly id: string
  readonly fromId: string
  readonly toId: string
  options: EdgeOptions
}
```

### Cluster

Visual grouping container.

```typescript
class Cluster {
  constructor(id: string, label: string, options?: ClusterOptions)
  
  // Properties
  readonly id: string
  readonly label: string
  options: ClusterOptions
  
  // Methods
  addNode(node: Node): void
  addNodes(nodes: Node[]): void
  removeNode(nodeId: string): void
  getNodes(): Node[]
}
```

## Service Classes

### AWS Services

```typescript
// Compute
class EC2 extends AWSNode
class Lambda extends AWSNode

// Storage
class S3 extends AWSNode

// Database
class RDS extends AWSNode
class DynamoDB extends AWSNode

// Networking
class ELB extends AWSNode
class VPC extends AWSNode
class CloudFront extends AWSNode
class APIGateway extends AWSNode

// Integration
class SNS extends AWSNode
class SQS extends AWSNode

// Monitoring
class CloudWatch extends AWSNode
```

### Azure Services

```typescript
// Compute
class VirtualMachine extends AzureNode
class FunctionApps extends AzureNode
class AppService extends AzureNode
class ContainerInstances extends AzureNode

// Storage
class BlobStorage extends AzureNode

// Database
class SQLDatabase extends AzureNode
class CosmosDB extends AzureNode

// Networking
class ApplicationGateway extends AzureNode
class VirtualNetwork extends AzureNode

// Integration
class ServiceBus extends AzureNode

// Security
class KeyVault extends AzureNode

// Monitoring
class Monitor extends AzureNode
```

### GCP Services

```typescript
// Compute
class ComputeEngine extends GCPNode
class CloudFunctions extends GCPNode
class AppEngine extends GCPNode
class CloudRun extends GCPNode
class GKE extends GCPNode

// Storage
class CloudStorage extends GCPNode

// Database
class CloudSQL extends GCPNode
class Firestore extends GCPNode

// Networking
class LoadBalancing extends GCPNode
class VPC extends GCPNode

// Analytics
class PubSub extends GCPNode

// Operations
class CloudMonitoring extends GCPNode
```

## Renderer

### CloudDiagramsD3Renderer

Professional D3.js renderer with interactive features.

```typescript
class CloudDiagramsD3Renderer {
  constructor(containerId: string, options?: Partial<RenderOptions>)
  
  // Rendering
  renderDiagram(diagram: Diagram, options?: Partial<RenderOptions>): Promise<void>
  
  // Icon management
  setIconRegistry(iconRegistry: IconRegistry): void
  
  // Interaction
  fitToView(): void
  resetZoom(): void
  
  // Export
  exportSVG(): string
  exportPNG(scale?: number): Promise<Blob>
}
```

## Icon Registry

### IconRegistry

Central icon management system.

```typescript
interface IconRegistry {
  getIcon(provider: CloudProvider, service: string): IconData | null
  getFallbackIcon(provider: CloudProvider, service: string): IconData
  registerIcon(provider: CloudProvider, service: string, iconData: IconData): void
  hasIcon(provider: CloudProvider, service: string): boolean
  getIconCount(provider?: CloudProvider): number
  searchIcons(query: string, provider?: CloudProvider): IconData[]
}

function createIconRegistry(options?: {
  customIcons?: Record<string, IconData>
  awsIcons?: Record<string, IconData>
  azureIcons?: Record<string, IconData>
  gcpIcons?: Record<string, IconData>
}): IconRegistry
```

## Type Definitions

### Core Types

```typescript
type CloudProvider = "aws" | "azure" | "gcp"

interface DiagramConfig {
  direction?: "TB" | "BT" | "LR" | "RL"
  splines?: "ortho" | "curved" | "line"
  bgcolor?: string
  fontname?: string
  fontsize?: number
  nodesep?: number
  ranksep?: number
}

interface NodeOptions {
  category?: string
  description?: string
  color?: string
  shape?: string
  style?: string
  fillcolor?: string
  fontcolor?: string
  [key: string]: any
}

interface EdgeOptions {
  label?: string
  color?: string
  style?: "solid" | "dashed" | "dotted" | "bold"
  arrowhead?: "normal" | "dot" | "diamond" | "box"
  weight?: number
  bidirectional?: boolean
}

interface ClusterOptions {
  style?: "filled" | "rounded" | "dashed"
  bgcolor?: string
  color?: string
  fontcolor?: string
  penwidth?: number
}

interface RenderOptions {
  width?: number
  height?: number
  enableZoom?: boolean
  enablePan?: boolean
  enableTooltips?: boolean
  enableClustering?: boolean
  theme?: "light" | "dark"
  backgroundColor?: string
  layoutAlgorithm?: "force" | "hierarchical" | "grid"
}
```

### Icon Types

```typescript
interface IconData {
  svg: string
  metadata: IconMetadata
}

interface IconMetadata {
  name: string
  description?: string
  category: string
  provider: CloudProvider
  service: string
  tags?: string[]
  version?: string
}
```

## Utility Functions

```typescript
// ID generation
function generateId(): string

// Object manipulation
function deepMerge(target: any, source: any): any

// Validation
function isValidProvider(provider: string): boolean

// String manipulation
function normalizeServiceName(service: string): string
function camelToKebab(str: string): string
function kebabToCamel(str: string): string

// Colors
function getProviderColor(provider: string): string

// Performance
function debounce<T>(func: T, wait: number): T
function throttle<T>(func: T, limit: number): T

// Environment
function isBrowser(): boolean
function isNode(): boolean

// Math
function clamp(value: number, min: number, max: number): number
function lerp(start: number, end: number, factor: number): number
function distance(x1: number, y1: number, x2: number, y2: number): number

// Async
function delay(ms: number): Promise<void>
function retry<T>(fn: () => Promise<T>, maxAttempts?: number, baseDelay?: number): Promise<T>
```

## Usage Examples

### Basic Usage

```typescript
import { Diagram, EC2, S3, Lambda } from "@kloud-diagramming/core"

const diagram = new Diagram("my-architecture")
const web = new EC2("web", "Web Server")
const storage = new S3("storage", "Data Storage")
const api = new Lambda("api", "API Function")

diagram.addNode(web)
diagram.addNode(storage)
diagram.addNode(api)

// Mingrammer-style connections
diagram.rightShift([web], [api])
diagram.rightShift([api], [storage])

await diagram.render("#container")
```

### With Clusters

```typescript
const diagram = new Diagram("clustered-architecture")

const webTier = diagram.cluster("Web Tier", {
  style: "filled",
  bgcolor: "#e3f2fd"
})

const web1 = new EC2("web1", "Web Server 1")
const web2 = new EC2("web2", "Web Server 2")

webTier.addNodes([web1, web2])
diagram.addNode(web1)
diagram.addNode(web2)

await diagram.render("#container", {
  enableClustering: true
})
```

### Custom Renderer

```typescript
import { CloudDiagramsD3Renderer } from "@kloud-diagramming/core"

const renderer = new CloudDiagramsD3Renderer("container", {
  width: 1200,
  height: 800,
  layoutAlgorithm: "hierarchical",
  theme: "dark"
})

await renderer.renderDiagram(diagram)

// Export
const svgString = renderer.exportSVG()
const pngBlob = await renderer.exportPNG(2) // 2x scale
``` 