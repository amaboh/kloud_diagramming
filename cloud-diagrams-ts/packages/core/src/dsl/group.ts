import { Node } from './node';

export interface GroupMetadata {
  description?: string;
  color?: string;
  style?: 'vpc' | 'subnet' | 'availability-zone' | 'container' | 'custom';
  collapsed?: boolean;
  [key: string]: any;
}

export interface GroupLayoutOptions {
  direction?: 'LR' | 'TB' | 'RL' | 'BT';
  spacing?: number;
  padding?: number;
  alignment?: 'start' | 'center' | 'end';
}

export class Group {
  private nodes: Node[] = [];
  private subGroups: Group[] = [];
  public metadata: GroupMetadata;
  public layoutOptions: GroupLayoutOptions;

  constructor(
    public readonly id: string,
    public readonly name: string,
    metadata: GroupMetadata = {},
    layoutOptions: GroupLayoutOptions = {}
  ) {
    this.metadata = metadata;
    this.layoutOptions = {
      direction: 'LR',
      spacing: 10,
      padding: 20,
      alignment: 'center',
      ...layoutOptions,
    };
  }

  addNode(node: Node): Node {
    this.nodes.push(node);
    // Mark the node as belonging to this group
    node.groupId = this.id;
    return node;
  }

  addSubGroup(subGroup: Group): Group {
    this.subGroups.push(subGroup);
    return subGroup;
  }

  getNodes(): Node[] {
    return [...this.nodes];
  }

  getSubGroups(): Group[] {
    return [...this.subGroups];
  }

  getAllNodes(): Node[] {
    const allNodes = [...this.nodes];
    for (const subGroup of this.subGroups) {
      allNodes.push(...subGroup.getAllNodes());
    }
    return allNodes;
  }

  removeNode(nodeId: string): boolean {
    const index = this.nodes.findIndex((node) => node.id === nodeId);
    if (index > -1) {
      const node = this.nodes[index];
      node.groupId = undefined; // Remove group association
      this.nodes.splice(index, 1);
      return true;
    }

    // Try to remove from subgroups
    for (const subGroup of this.subGroups) {
      if (subGroup.removeNode(nodeId)) {
        return true;
      }
    }

    return false;
  }

  removeSubGroup(groupId: string): boolean {
    const index = this.subGroups.findIndex((group) => group.id === groupId);
    if (index > -1) {
      this.subGroups.splice(index, 1);
      return true;
    }
    return false;
  }

  hasNode(nodeId: string): boolean {
    return (
      this.nodes.some((node) => node.id === nodeId) ||
      this.subGroups.some((group) => group.hasNode(nodeId))
    );
  }

  findNodeGroup(nodeId: string): Group | undefined {
    if (this.nodes.some((node) => node.id === nodeId)) {
      return this;
    }

    for (const subGroup of this.subGroups) {
      const found = subGroup.findNodeGroup(nodeId);
      if (found) return found;
    }

    return undefined;
  }

  getGroupStyle(): string {
    switch (this.metadata.style) {
      case 'vpc':
        return 'vpc-style';
      case 'subnet':
        return 'subnet-style';
      case 'availability-zone':
        return 'az-style';
      case 'container':
        return 'container-style';
      default:
        return 'default-group-style';
    }
  }
}
