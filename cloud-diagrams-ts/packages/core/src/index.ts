// Core DSL exports
export { Diagram } from './dsl/diagram';
export { Node, AWSNode, AzureNode, GCPNode } from './dsl/node';
export { Edge } from './dsl/edge';
export { Group } from './dsl/group';

// Rendering exports
export { MermaidRenderer } from './rendering/mermaid-renderer';
export type { Renderer } from './rendering/renderer.interface';

// Export utilities
export { SVGExporter } from './export/svg-exporter';
export type { ExportOptions } from './export/types';

// Icon system
export { IconRegistry, iconRegistry } from './icons/icon-registry';
export type {
  IconDefinition,
  IconSet,
  IconPack,
  IconTheme,
  AWSIconSet,
  AzureIconSet,
  GCPIconSet,
} from './icons/types';

// Utility exports
export * from './utils/dom-utils';
export * from './utils/svg-utils';

// Theme exports
export * from './themes';

// Types
export type {
  DiagramConfig,
  NodeMetadata,
  EdgeOptions,
  RenderOptions,
  DiagramModel,
  ExportFormat,
  Theme,
  Theme as ThemeDefinition,
  RendererCapabilities,
  NodeClickEvent,
  DiagramEvent,
} from './types';
