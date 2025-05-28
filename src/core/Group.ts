import { GroupOptions } from "../types";
import { Node } from "./Node";
import { generateId } from "../utils/helpers";

/**
 * Group class - represents a logical grouping of nodes for layout purposes
 */
export class Group {
  public id: string;
  public name: string;
  public metadata: Record<string, any>;
  public layoutOptions: any;
  private nodes: Set<Node> = new Set();
  private subGroups: Set<Group> = new Set();
  private parentGroup?: Group;

  constructor(
    id: string,
    name: string,
    metadata: Record<string, any> = {},
    layoutOptions: any = {}
  ) {
    this.id = id || generateId();
    this.name = name;
    this.metadata = metadata;
    this.layoutOptions = {
      direction: "horizontal",
      spacing: 50,
      alignment: "center",
      ...layoutOptions,
    };
  }

  addNode(node: Node): void {
    this.nodes.add(node);
    node.withGroup(this.id);
  }

  addSubGroup(group: Group): void {
    this.subGroups.add(group);
    group.parentGroup = this;
  }

  removeNode(nodeId: string): void {
    const nodeToRemove = Array.from(this.nodes).find(
      (node) => node.id === nodeId
    );
    if (nodeToRemove) {
      this.nodes.delete(nodeToRemove);
      if (nodeToRemove.groupId === this.id) {
        nodeToRemove.groupId = undefined;
      }
    }

    // Also remove from sub-groups
    this.subGroups.forEach((subGroup) => {
      subGroup.removeNode(nodeId);
    });
  }

  getAllNodes(): Node[] {
    const allNodes = new Set<Node>(this.nodes);

    // Add nodes from sub-groups
    this.subGroups.forEach((subGroup) => {
      subGroup.getAllNodes().forEach((node) => allNodes.add(node));
    });

    return Array.from(allNodes);
  }

  getDirectNodes(): Node[] {
    return Array.from(this.nodes);
  }

  getSubGroups(): Group[] {
    return Array.from(this.subGroups);
  }

  getAllSubGroups(): Group[] {
    const allSubGroups = new Set<Group>(this.subGroups);

    // Add nested sub-groups
    this.subGroups.forEach((subGroup) => {
      subGroup.getAllSubGroups().forEach((nestedGroup) => {
        allSubGroups.add(nestedGroup);
      });
    });

    return Array.from(allSubGroups);
  }

  hasNode(nodeId: string): boolean {
    // Check direct nodes
    for (const node of this.nodes) {
      if (node.id === nodeId) return true;
    }

    // Check sub-groups
    for (const subGroup of this.subGroups) {
      if (subGroup.hasNode(nodeId)) return true;
    }

    return false;
  }

  findNodeGroup(nodeId: string): Group | null {
    // Check direct nodes
    for (const node of this.nodes) {
      if (node.id === nodeId) return this;
    }

    // Check sub-groups
    for (const subGroup of this.subGroups) {
      const found = subGroup.findNodeGroup(nodeId);
      if (found) return found;
    }

    return null;
  }

  getDepth(): number {
    if (this.subGroups.size === 0) return 1;

    const maxSubGroupDepth = Math.max(
      ...Array.from(this.subGroups).map((subGroup) => subGroup.getDepth())
    );

    return 1 + maxSubGroupDepth;
  }

  isEmpty(): boolean {
    return this.nodes.size === 0 && this.subGroups.size === 0;
  }

  getStats(): any {
    return {
      nodeCount: this.nodes.size,
      totalNodeCount: this.getAllNodes().length,
      subGroupCount: this.subGroups.size,
      totalSubGroupCount: this.getAllSubGroups().length,
      depth: this.getDepth(),
      isEmpty: this.isEmpty(),
    };
  }

  getParent(): Group | undefined {
    return this.parentGroup;
  }

  getRoot(): Group {
    let current: Group = this;
    while (current.parentGroup) {
      current = current.parentGroup;
    }
    return current;
  }

  getPath(): Group[] {
    const path: Group[] = [];
    let current: Group | undefined = this;

    while (current) {
      path.unshift(current);
      current = current.parentGroup;
    }

    return path;
  }

  clone(newName?: string, newMetadata?: Record<string, any>): Group {
    const cloned = new Group(
      generateId(),
      newName || this.name,
      { ...this.metadata, ...newMetadata },
      { ...this.layoutOptions }
    );

    // Clone nodes
    this.nodes.forEach((node) => {
      const clonedNode = node.clone();
      cloned.addNode(clonedNode);
    });

    // Clone sub-groups
    this.subGroups.forEach((subGroup) => {
      const clonedSubGroup = subGroup.clone();
      cloned.addSubGroup(clonedSubGroup);
    });

    return cloned;
  }

  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      metadata: this.metadata,
      layoutOptions: this.layoutOptions,
      nodes: Array.from(this.nodes).map((node) => node.toJSON()),
      subGroups: Array.from(this.subGroups).map((group) => group.toJSON()),
    };
  }

  static fromJSON(data: any): Group {
    const group = new Group(
      data.id,
      data.name,
      data.metadata,
      data.layoutOptions
    );

    // Restore nodes
    if (data.nodes) {
      data.nodes.forEach((nodeData: any) => {
        const node = Node.fromJSON(nodeData);
        group.addNode(node);
      });
    }

    // Restore sub-groups
    if (data.subGroups) {
      data.subGroups.forEach((groupData: any) => {
        const subGroup = Group.fromJSON(groupData);
        group.addSubGroup(subGroup);
      });
    }

    return group;
  }
}
