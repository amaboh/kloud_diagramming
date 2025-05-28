import { ClusterOptions } from "../types";
import { Node } from "./Node";
import { generateId } from "../utils/helpers";

/**
 * Cluster class - represents a visual grouping of nodes in the diagram
 */
export class Cluster {
  public id: string;
  public label: string;
  public options: ClusterOptions;
  private nodes: Set<Node> = new Set();
  private subClusters: Set<Cluster> = new Set();
  private parentCluster?: Cluster;

  constructor(id: string, label: string, options: ClusterOptions = {}) {
    this.id = id || generateId();
    this.label = label;
    this.options = {
      style: "filled",
      color: "#333333",
      bgcolor: "#f8f9fa",
      fillcolor: "#f8f9fa",
      fontcolor: "#333333",
      fontsize: 12,
      fontname: "Arial",
      penwidth: 1,
      margin: 8,
      pad: 4,
      ...options,
    };
  }

  addNode(node: Node): void {
    this.nodes.add(node);
    node.withCluster(this.id);
  }

  addNodes(nodes: Node[]): void {
    nodes.forEach((node) => this.addNode(node));
  }

  removeNode(node: Node): void {
    this.nodes.delete(node);
    if (node.clusterId === this.id) {
      node.clusterId = undefined;
    }

    // Also remove from sub-clusters
    this.subClusters.forEach((subCluster) => {
      subCluster.removeNode(node);
    });
  }

  addSubCluster(cluster: Cluster): void {
    this.subClusters.add(cluster);
    cluster.parentCluster = this;
  }

  removeSubCluster(cluster: Cluster): void {
    this.subClusters.delete(cluster);
    if (cluster.parentCluster === this) {
      cluster.parentCluster = undefined;
    }
  }

  getAllNodes(): Node[] {
    const allNodes = new Set<Node>(this.nodes);

    // Add nodes from sub-clusters
    this.subClusters.forEach((subCluster) => {
      subCluster.getAllNodes().forEach((node) => allNodes.add(node));
    });

    return Array.from(allNodes);
  }

  getNodes(): Node[] {
    return Array.from(this.nodes);
  }

  getSubClusters(): Cluster[] {
    return Array.from(this.subClusters);
  }

  getAllSubClusters(): Cluster[] {
    const allSubClusters = new Set<Cluster>(this.subClusters);

    // Add nested sub-clusters
    this.subClusters.forEach((subCluster) => {
      subCluster.getAllSubClusters().forEach((nestedCluster) => {
        allSubClusters.add(nestedCluster);
      });
    });

    return Array.from(allSubClusters);
  }

  hasNode(nodeId: string): boolean {
    // Check direct nodes
    for (const node of this.nodes) {
      if (node.id === nodeId) return true;
    }

    // Check sub-clusters
    for (const subCluster of this.subClusters) {
      if (subCluster.hasNode(nodeId)) return true;
    }

    return false;
  }

  findNodeCluster(nodeId: string): Cluster | null {
    // Check direct nodes
    for (const node of this.nodes) {
      if (node.id === nodeId) return this;
    }

    // Check sub-clusters
    for (const subCluster of this.subClusters) {
      const found = subCluster.findNodeCluster(nodeId);
      if (found) return found;
    }

    return null;
  }

  getDepth(): number {
    if (this.subClusters.size === 0) return 1;

    const maxSubClusterDepth = Math.max(
      ...Array.from(this.subClusters).map((subCluster) => subCluster.getDepth())
    );

    return 1 + maxSubClusterDepth;
  }

  getMaxSubClusterDepth(): number {
    if (this.subClusters.size === 0) return 0;

    return Math.max(
      ...Array.from(this.subClusters).map(
        (subCluster) => 1 + subCluster.getMaxSubClusterDepth()
      )
    );
  }

  isEmpty(): boolean {
    return this.nodes.size === 0 && this.subClusters.size === 0;
  }

  getStats(): any {
    return {
      nodeCount: this.nodes.size,
      totalNodeCount: this.getAllNodes().length,
      subClusterCount: this.subClusters.size,
      totalSubClusterCount: this.getAllSubClusters().length,
      depth: this.getDepth(),
      maxSubClusterDepth: this.getMaxSubClusterDepth(),
      isEmpty: this.isEmpty(),
    };
  }

  getGraphvizAttributes(): Record<string, string> {
    const attrs: Record<string, string> = {};

    if (this.options.style) attrs.style = this.options.style;
    if (this.options.color) attrs.color = this.options.color;
    if (this.options.bgcolor) attrs.bgcolor = this.options.bgcolor;
    if (this.options.fillcolor) attrs.fillcolor = this.options.fillcolor;
    if (this.options.fontcolor) attrs.fontcolor = this.options.fontcolor;
    if (this.options.fontsize) attrs.fontsize = String(this.options.fontsize);
    if (this.options.fontname) attrs.fontname = this.options.fontname;
    if (this.options.penwidth) attrs.penwidth = String(this.options.penwidth);
    if (this.options.margin) attrs.margin = String(this.options.margin);
    if (this.options.pad) attrs.pad = String(this.options.pad);

    if (this.options.attributes) {
      Object.assign(attrs, this.options.attributes);
    }

    return attrs;
  }

  clone(newLabel?: string, newOptions?: ClusterOptions): Cluster {
    const cloned = new Cluster(generateId(), newLabel || this.label, {
      ...this.options,
      ...newOptions,
    });

    // Clone nodes
    this.nodes.forEach((node) => {
      const clonedNode = node.clone();
      cloned.addNode(clonedNode);
    });

    // Clone sub-clusters
    this.subClusters.forEach((subCluster) => {
      const clonedSubCluster = subCluster.clone();
      cloned.addSubCluster(clonedSubCluster);
    });

    return cloned;
  }

  getParent(): Cluster | undefined {
    return this.parentCluster;
  }

  getRoot(): Cluster {
    let current: Cluster = this;
    while (current.parentCluster) {
      current = current.parentCluster;
    }
    return current;
  }

  getPath(): Cluster[] {
    const path: Cluster[] = [];
    let current: Cluster | undefined = this;

    while (current) {
      path.unshift(current);
      current = current.parentCluster;
    }

    return path;
  }

  toJSON(): any {
    return {
      id: this.id,
      label: this.label,
      options: this.options,
      nodes: Array.from(this.nodes).map((node) => node.toJSON()),
      subClusters: Array.from(this.subClusters).map((cluster) =>
        cluster.toJSON()
      ),
    };
  }

  static fromJSON(data: any): Cluster {
    const cluster = new Cluster(data.id, data.label, data.options);

    // Restore nodes
    if (data.nodes) {
      data.nodes.forEach((nodeData: any) => {
        const node = Node.fromJSON(nodeData);
        cluster.addNode(node);
      });
    }

    // Restore sub-clusters
    if (data.subClusters) {
      data.subClusters.forEach((clusterData: any) => {
        const subCluster = Cluster.fromJSON(clusterData);
        cluster.addSubCluster(subCluster);
      });
    }

    return cluster;
  }
}
