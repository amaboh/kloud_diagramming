export interface DiagramConfig {
  direction?: 'LR' | 'RL' | 'TB' | 'BT';
  theme?: 'default' | 'dark' | 'light';
  layout?: 'auto' | 'manual';
  padding?: number;
  spacing?: {
    node?: number;
    edge?: number;
  };
}

export interface NodeMetadata {
  url?: string;
  description?: string;
  tags?: string[];
  properties?: Record<string, any>;
  [key: string]: any;
}

export interface EdgeOptions {
  label?: string;
  style?: 'solid' | 'dashed' | 'dotted';
  bidirectional?: boolean;
  color?: string;
  strokeWidth?: number;
  metadata?: Record<string, any>;
}

export interface RenderOptions {
  theme?: string;
  width?: number;
  height?: number;
  interactive?: boolean;
  showTitle?: boolean;
  padding?: number;
  layoutAlgorithm?: 'auto' | 'manual' | 'hierarchical' | 'force-directed';
}

export interface ExportOptions {
  width?: number;
  height?: number;
  backgroundColor?: string;
  scale?: number;
  format?: 'svg' | 'png' | 'pdf';
  quality?: number; // For PNG/JPEG exports (0-1)
}

// Enhanced diagram model with layout support
export interface DiagramModel {
  title: string;
  config: DiagramConfig;
  nodes: any[];
  edges: any[];
  groups: any[];
  layoutOptions?: {
    algorithm?: 'auto' | 'manual' | 'hierarchical' | 'force-directed';
    spacing?: {
      node?: number;
      group?: number;
      level?: number;
    };
    direction?: 'LR' | 'TB' | 'RL' | 'BT';
    alignment?: 'start' | 'center' | 'end';
  };
}

// Layout and positioning types
export interface NodePosition {
  x?: number;
  y?: number;
  fixed?: boolean;
}

export interface LayoutConstraints {
  minSpacing?: number;
  maxWidth?: number;
  maxHeight?: number;
  preserveAspectRatio?: boolean;
}

export interface GroupLayoutOptions {
  direction?: 'LR' | 'TB' | 'RL' | 'BT';
  spacing?: number;
  padding?: number;
  alignment?: 'start' | 'center' | 'end';
}

// Event types for interactivity
export interface NodeClickEvent {
  node: any;
  element: SVGElement;
}

export interface DiagramEvent {
  type: 'nodeClick' | 'nodeHover' | 'edgeClick';
  data: NodeClickEvent | any;
}

// Icon system types
export interface IconDefinition {
  svg: string;
  viewBox?: string;
  variants?: {
    dark?: string;
    light?: string;
    colored?: string;
  };
}

export interface IconSet {
  provider: string;
  icons: Record<string, IconDefinition>;
}

// Theme types
export interface Theme {
  name: string;
  colors: {
    background?: string;
    text?: string;
    node?: string;
    edge?: string;
    group?: string;
  };
  fonts?: {
    family?: string;
    size?: number;
  };
}

// Renderer interface support types
export type ExportFormat = 'svg' | 'png' | 'pdf';

export interface RendererCapabilities {
  supportsInteractivity: boolean;
  supportsAnimation: boolean;
  supportedExportFormats: ExportFormat[];
  supportedThemes: string[];
}
