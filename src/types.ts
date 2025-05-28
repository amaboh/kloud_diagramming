/**
 * Type definitions for @kloud-diagramming/core
 */

export type CloudProvider = "aws" | "azure" | "gcp";

export interface DiagramConfig {
  title?: string;
  direction?: "TB" | "BT" | "LR" | "RL";
  rankdir?: "TB" | "BT" | "LR" | "RL";
  splines?: "ortho" | "curved" | "line" | "polyline";
  overlap?: boolean;
  concentrate?: boolean;
  compound?: boolean;
  newrank?: boolean;
  bgcolor?: string;
  fontname?: string;
  fontsize?: number;
  fontcolor?: string;
  pad?: number;
  margin?: number;
  nodesep?: number;
  ranksep?: number;
  mindist?: number;
  layout?: "dot" | "neato" | "fdp" | "sfdp" | "circo" | "twopi";
}

export interface NodeOptions {
  label?: string;
  provider?: CloudProvider;
  service?: string;
  category?: string;
  description?: string;
  metadata?: Record<string, any>;
  clusterId?: string;
  groupId?: string;
  position?: { x: number; y: number; fixed?: boolean };
  style?: {
    shape?: string;
    color?: string;
    fillcolor?: string;
    fontcolor?: string;
    fontsize?: number;
    fontname?: string;
    width?: number;
    height?: number;
    fixedsize?: boolean;
    style?: string;
  };
  attributes?: Record<string, string>;
}

export interface EdgeOptions {
  label?: string;
  color?: string;
  style?: "solid" | "dashed" | "dotted" | "bold" | "invis";
  dir?: "forward" | "back" | "both" | "none";
  arrowhead?: "normal" | "dot" | "diamond" | "box" | "open" | "vee" | "none";
  arrowtail?: "normal" | "dot" | "diamond" | "box" | "open" | "vee" | "none";
  weight?: number;
  minlen?: number;
  constraint?: boolean;
  fontcolor?: string;
  fontsize?: number;
  fontname?: string;
  bidirectional?: boolean;
  attributes?: Record<string, string>;
}

export interface ClusterOptions {
  label?: string;
  style?: "filled" | "rounded" | "dashed" | "dotted" | "bold" | "invis";
  color?: string;
  bgcolor?: string;
  fillcolor?: string;
  fontcolor?: string;
  fontsize?: number;
  fontname?: string;
  penwidth?: number;
  margin?: number;
  pad?: number;
  attributes?: Record<string, string>;
}

export interface GroupOptions {
  name?: string;
  metadata?: Record<string, any>;
  layoutOptions?: {
    direction?: "horizontal" | "vertical";
    spacing?: number;
    alignment?: "start" | "center" | "end";
  };
}

export interface RenderOptions {
  width?: number;
  height?: number;
  nodeSize?: number;
  nodeSpacing?: number;
  enableClustering?: boolean;
  enableTooltips?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  enableExport?: boolean;
  theme?: "light" | "dark" | "auto";
  backgroundColor?: string;
  gridEnabled?: boolean;
  miniMapEnabled?: boolean;
  layoutAlgorithm?: "force" | "hierarchical" | "circular" | "grid" | "clustered";
  animation?: {
    enabled?: boolean;
    duration?: number;
    easing?: string;
  };
}

export interface IconMetadata {
  name: string;
  description?: string;
  category: string;
  provider: CloudProvider;
  service: string;
  tags?: string[];
  version?: string;
}

export interface IconData {
  svg: string;
  metadata: IconMetadata;
  variants?: Record<string, any>; // Support for icon variations (light, dark, colored, etc.)
}

export interface IconRegistry {
  icons: {
    aws: Record<string, IconData>;
    azure: Record<string, IconData>;
    gcp: Record<string, IconData>;
  };
  getIcon(provider: CloudProvider, service: string): IconData | null;
  getFallbackIcon(provider: CloudProvider, service: string): IconData;
  registerIcon(
    provider: CloudProvider,
    service: string,
    iconData: IconData
  ): void;
  hasIcon(provider: CloudProvider, service: string): boolean;
  getIconCount(provider?: CloudProvider): number;
  searchIcons(query: string, provider?: CloudProvider): IconData[];
}

export interface DiagramStatistics {
  nodeCount: number;
  edgeCount: number;
  clusterCount: number;
  groupCount: number;
  providers: {
    aws: number;
    azure: number;
    gcp: number;
  };
  categories: Record<string, number>;
  maxDepth: number;
}

export interface ClusterStatistics {
  totalClusters: number;
  maxDepth: number;
  nodesInClusters: number;
  clustersWithSubClusters: number;
  averageNodesPerCluster: number;
}

export interface LayoutPosition {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface NodeClickEvent {
  node: any; // Node instance
  position: { x: number; y: number };
  originalEvent: MouseEvent;
}

export interface EdgeClickEvent {
  edge: any; // Edge instance
  position: { x: number; y: number };
  originalEvent: MouseEvent;
}

export interface ClusterClickEvent {
  cluster: any; // Cluster instance
  position: { x: number; y: number };
  originalEvent: MouseEvent;
}

export interface ExportOptions {
  format: "svg" | "png" | "jpg" | "pdf";
  quality?: number;
  width?: number;
  height?: number;
  backgroundColor?: string;
  filename?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface DiagramModel {
  title: string;
  config: DiagramConfig;
  nodes: any[]; // Node instances
  edges: any[]; // Edge instances
  clusters: any[]; // Cluster instances
  groups: any[]; // Group instances
}

// Event types
export type DiagramEventType =
  | "nodeClick"
  | "nodeHover"
  | "edgeClick"
  | "edgeHover"
  | "clusterClick"
  | "clusterHover"
  | "diagramReady"
  | "diagramError"
  | "layoutComplete";

export interface DiagramEvent<T = any> {
  type: DiagramEventType;
  data: T;
  timestamp: number;
}

// Plugin system types
export interface DiagramPlugin {
  name: string;
  version: string;
  install(diagram: any): void;
  uninstall(diagram: any): void;
}

export interface PluginOptions {
  enabled?: boolean;
  config?: Record<string, any>;
}
