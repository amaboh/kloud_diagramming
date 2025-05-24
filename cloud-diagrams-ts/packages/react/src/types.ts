import { ReactNode, CSSProperties } from 'react';
import {
  Diagram,
  Node,
  Group,
  Edge,
  ThemeDefinition,
  RenderOptions,
  ExportFormat,
} from '@cloud-diagrams/core';

// Component Props
export interface DiagramRendererProps {
  diagram: Diagram;
  theme?: string | ThemeDefinition;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
  onNodeClick?: (nodeId: string, node: Node) => void;
  onGroupClick?: (groupId: string, group: Group) => void;
  onRenderComplete?: (svg: string) => void;
  onRenderError?: (error: Error) => void;
  renderOptions?: Partial<RenderOptions>;
  autoResize?: boolean;
  interactive?: boolean;
  children?: ReactNode;
}

export interface CloudNodeProps {
  node: Node;
  onClick?: (node: Node) => void;
  onHover?: (node: Node) => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface DiagramGroupProps {
  group: Group;
  onClick?: (group: Group) => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface DiagramProviderProps {
  diagram?: Diagram;
  theme?: string | ThemeDefinition;
  children: ReactNode;
}

// Context Types
export interface DiagramContextValue {
  diagram: Diagram | null;
  setDiagram: (diagram: Diagram) => void;
  addNode: (node: Node) => void;
  removeNode: (nodeId: string) => void;
  addGroup: (group: Group) => void;
  removeGroup: (groupId: string) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (edgeId: string) => void;
  render: () => Promise<string>;
  isRendering: boolean;
}

export interface ThemeContextValue {
  theme: string | ThemeDefinition;
  setTheme: (theme: string | ThemeDefinition) => void;
  availableThemes: string[];
}

// Hook Types
export interface DiagramHookReturn {
  diagram: Diagram | null;
  addNode: (node: Node) => void;
  removeNode: (nodeId: string) => void;
  addGroup: (group: Group) => void;
  removeGroup: (groupId: string) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (edgeId: string) => void;
  render: () => Promise<string>;
  export: (
    format: ExportFormat,
    options?: ExportOptions
  ) => Promise<string | Blob>;
  isRendering: boolean;
  isExporting: boolean;
}

export interface ExportOptions {
  filename?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  quality?: number;
  scale?: number;
}

// Event Types
export interface NodeClickEvent {
  node: Node;
  originalEvent: Event;
}

export interface GroupClickEvent {
  group: Group;
  originalEvent: Event;
}

// Utility Types
export type ThemeMode = 'light' | 'dark' | 'auto';

export interface DiagramStats {
  nodeCount: number;
  groupCount: number;
  edgeCount: number;
  renderTime?: number;
}
