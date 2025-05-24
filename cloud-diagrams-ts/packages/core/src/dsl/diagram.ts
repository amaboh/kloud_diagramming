import { v4 as uuidv4 } from 'uuid';
import { Node } from './node';
import { Edge } from './edge';
import { Group, GroupMetadata, GroupLayoutOptions } from './group';
import { MermaidRenderer } from '../rendering/mermaid-renderer';
import type {
  DiagramConfig,
  RenderOptions,
  ExportOptions,
  EdgeOptions,
} from '../types';

export interface LayoutOptions {
  algorithm?: 'auto' | 'manual' | 'hierarchical' | 'force-directed';
  spacing?: {
    node?: number;
    group?: number;
    level?: number;
  };
  direction?: 'LR' | 'TB' | 'RL' | 'BT';
  alignment?: 'start' | 'center' | 'end';
}

export class Diagram {
  private nodes = new Map<string, Node>();
  private edges: Edge[] = [];
  private groups = new Map<string, Group>();
  private renderer = new MermaidRenderer();
  public layoutOptions: LayoutOptions;

  constructor(
    public readonly title: string,
    private config: DiagramConfig = {},
    layoutOptions: LayoutOptions = {}
  ) {
    this.layoutOptions = {
      algorithm: 'auto',
      spacing: {
        node: 50,
        group: 80,
        level: 100,
      },
      direction: config.direction || 'LR',
      alignment: 'center',
      ...layoutOptions,
    };
  }

  addNode(node: Node): Node {
    this.nodes.set(node.id, node);
    return node;
  }

  addGroup(
    name: string,
    callback?: (group: Group) => void,
    metadata?: GroupMetadata,
    layoutOptions?: GroupLayoutOptions
  ): Group {
    const group = new Group(uuidv4(), name, metadata, layoutOptions);
    this.groups.set(group.id, group);

    if (callback) {
      callback(group);
    }

    return group;
  }

  createNestedGroup(
    parentGroupId: string,
    name: string,
    metadata?: GroupMetadata,
    layoutOptions?: GroupLayoutOptions
  ): Group {
    const parentGroup = this.groups.get(parentGroupId);
    if (!parentGroup) {
      throw new Error(`Parent group with ID ${parentGroupId} not found`);
    }

    const subGroup = new Group(uuidv4(), name, metadata, layoutOptions);
    parentGroup.addSubGroup(subGroup);
    this.groups.set(subGroup.id, subGroup);

    return subGroup;
  }

  connect(
    from: Node | string,
    to: Node | string,
    options: EdgeOptions = {}
  ): Edge {
    const fromId = typeof from === 'string' ? from : from.id;
    const toId = typeof to === 'string' ? to : to.id;

    const edge = new Edge(uuidv4(), fromId, toId, options);
    this.edges.push(edge);

    return edge;
  }

  // Layout management methods
  setLayoutAlgorithm(algorithm: LayoutOptions['algorithm']): void {
    this.layoutOptions.algorithm = algorithm;
  }

  setManualLayout(enable: boolean): void {
    this.layoutOptions.algorithm = enable ? 'manual' : 'auto';
  }

  positionNode(nodeId: string, x: number, y: number, fixed = false): void {
    const node = this.nodes.get(nodeId);
    if (node) {
      node.setPosition({ x, y, fixed });
    }
  }

  // Group management methods
  moveNodeToGroup(nodeId: string, groupId: string): void {
    const node = this.nodes.get(nodeId);
    const group = this.groups.get(groupId);

    if (!node || !group) {
      throw new Error('Node or group not found');
    }

    // Remove from current group if any
    if (node.groupId) {
      const currentGroup = this.groups.get(node.groupId);
      currentGroup?.removeNode(nodeId);
    }

    // Add to new group
    group.addNode(node);
  }

  removeNodeFromGroups(nodeId: string): void {
    const node = this.nodes.get(nodeId);
    if (node && node.groupId) {
      const group = this.groups.get(node.groupId);
      group?.removeNode(nodeId);
    }
  }

  findNodeGroup(nodeId: string): Group | undefined {
    for (const group of this.groups.values()) {
      const found = group.findNodeGroup(nodeId);
      if (found) return found;
    }
    return undefined;
  }

  // Enhanced rendering with layout support
  async render(
    container: string | HTMLElement,
    options: RenderOptions = {}
  ): Promise<void> {
    const model = {
      title: this.title,
      config: this.config,
      nodes: Array.from(this.nodes.values()),
      edges: this.edges,
      groups: Array.from(this.groups.values()),
      layoutOptions: this.layoutOptions,
    };

    await this.renderer.render(model, container, options);
  }

  async export(
    format: 'svg' | 'png' | 'pdf',
    options: ExportOptions = {}
  ): Promise<Blob> {
    const model = {
      title: this.title,
      config: this.config,
      nodes: Array.from(this.nodes.values()),
      edges: this.edges,
      groups: Array.from(this.groups.values()),
      layoutOptions: this.layoutOptions,
    };

    return this.renderer.export(model, format, options);
  }

  getModel() {
    return {
      title: this.title,
      config: this.config,
      nodes: Array.from(this.nodes.values()),
      edges: this.edges,
      groups: Array.from(this.groups.values()),
      layoutOptions: this.layoutOptions,
    };
  }

  // Utility methods for diagram analysis
  getGroupStatistics() {
    const stats = {
      totalGroups: this.groups.size,
      totalNodes: this.nodes.size,
      nodesInGroups: 0,
      ungroupedNodes: 0,
      maxGroupDepth: 0,
    };

    // Count nodes in groups
    for (const node of this.nodes.values()) {
      if (node.groupId) {
        stats.nodesInGroups++;
      } else {
        stats.ungroupedNodes++;
      }
    }

    // Calculate max group depth
    const calculateDepth = (group: Group, depth = 0): number => {
      let maxDepth = depth;
      for (const subGroup of group.getSubGroups()) {
        maxDepth = Math.max(maxDepth, calculateDepth(subGroup, depth + 1));
      }
      return maxDepth;
    };

    for (const group of this.groups.values()) {
      stats.maxGroupDepth = Math.max(
        stats.maxGroupDepth,
        calculateDepth(group)
      );
    }

    return stats;
  }
}
