import {
  DiagramConfig,
  DiagramStatistics,
  ClusterStatistics,
  DiagramModel,
} from "../types";
import { Node } from "./Node";
import { Edge } from "./Edge";
import { Cluster } from "./Cluster";
import { Group } from "./Group";
import { generateId } from "../utils/helpers";

/**
 * Main Diagram class - Mingrammer-style cloud architecture diagrams
 */
export class Diagram {
  public title: string;
  public config: DiagramConfig;
  private nodes: Map<string, Node> = new Map();
  private edges: Map<string, Edge> = new Map();
  private clusters: Map<string, Cluster> = new Map();
  private groups: Map<string, Group> = new Map();
  private layoutOptions: any;

  constructor(
    title: string,
    config: DiagramConfig = {},
    layoutOptions: any = {}
  ) {
    this.title = title;
    this.config = {
      direction: "TB",
      rankdir: "TB",
      splines: "ortho",
      overlap: false,
      concentrate: false,
      compound: true,
      newrank: true,
      bgcolor: "transparent",
      fontname: "Arial",
      fontsize: 12,
      fontcolor: "#333333",
      pad: 0.5,
      margin: 0.5,
      nodesep: 1.0,
      ranksep: 1.0,
      mindist: 1.0,
      layout: "dot",
      ...config,
    };
    this.layoutOptions = {
      algorithm: "hierarchical",
      nodeSpacing: 100,
      levelSpacing: 150,
      ...layoutOptions,
    };
  }

  // Node management
  addNode(node: Node): void {
    this.nodes.set(node.id, node);
  }

  removeNode(nodeId: string): void {
    // Remove from clusters and groups
    this.removeNodeFromClusters(nodeId);
    this.removeNodeFromGroups(nodeId);

    // Remove associated edges
    const edgesToRemove = Array.from(this.edges.values()).filter(
      (edge) => edge.fromId === nodeId || edge.toId === nodeId
    );

    edgesToRemove.forEach((edge) => this.removeEdge(edge.id));

    // Remove the node
    this.nodes.delete(nodeId);
  }

  getNode(nodeId: string): Node | undefined {
    return this.nodes.get(nodeId);
  }

  getAllNodes(): Node[] {
    return Array.from(this.nodes.values());
  }

  // Cluster management
  cluster(label: string, options: any = {}): Cluster {
    const cluster = new Cluster(generateId(), label, options);
    this.clusters.set(cluster.id, cluster);
    return cluster;
  }

  withCluster(
    label: string,
    callback: (cluster: Cluster) => void,
    options: any = {}
  ): Cluster {
    const cluster = this.cluster(label, options);
    callback(cluster);
    return cluster;
  }

  nestedCluster(
    parentCluster: Cluster,
    label: string,
    options: any = {}
  ): Cluster {
    const cluster = new Cluster(generateId(), label, options);
    parentCluster.addSubCluster(cluster);
    this.clusters.set(cluster.id, cluster);
    return cluster;
  }

  removeCluster(clusterId: string): void {
    const cluster = this.clusters.get(clusterId);
    if (cluster) {
      // Remove all nodes from cluster
      cluster.getNodes().forEach((node) => {
        cluster.removeNode(node);
      });

      // Remove from parent cluster if nested
      this.clusters.forEach((parentCluster) => {
        parentCluster.removeSubCluster(cluster);
      });

      this.clusters.delete(clusterId);
    }
  }

  getCluster(clusterId: string): Cluster | undefined {
    return this.clusters.get(clusterId);
  }

  getAllClusters(): Cluster[] {
    return Array.from(this.clusters.values());
  }

  moveNodeToCluster(nodeId: string, clusterId: string): void {
    const node = this.getNode(nodeId);
    const cluster = this.getCluster(clusterId);

    if (node && cluster) {
      // Remove from current clusters
      this.removeNodeFromClusters(nodeId);

      // Add to new cluster
      cluster.addNode(node);
      node.withCluster(clusterId);
    }
  }

  removeNodeFromClusters(nodeId: string): void {
    this.clusters.forEach((cluster) => {
      const node = this.getNode(nodeId);
      if (node && cluster.hasNode(nodeId)) {
        cluster.removeNode(node);
      }
    });
  }

  findNodeCluster(nodeId: string): Cluster | null {
    for (const cluster of this.clusters.values()) {
      if (cluster.hasNode(nodeId)) {
        return cluster;
      }
    }
    return null;
  }

  // Group management
  addGroup(
    name: string,
    callback: (group: Group) => void,
    metadata: any = {},
    layoutOptions: any = {}
  ): Group {
    const group = new Group(generateId(), name, metadata, layoutOptions);
    this.groups.set(group.id, group);
    callback(group);
    return group;
  }

  createNestedGroup(
    parentGroupId: string,
    name: string,
    metadata: any = {},
    layoutOptions: any = {}
  ): Group {
    const parentGroup = this.groups.get(parentGroupId);
    if (!parentGroup) {
      throw new Error(`Parent group ${parentGroupId} not found`);
    }

    const group = new Group(generateId(), name, metadata, layoutOptions);
    parentGroup.addSubGroup(group);
    this.groups.set(group.id, group);
    return group;
  }

  moveNodeToGroup(nodeId: string, groupId: string): void {
    const node = this.getNode(nodeId);
    const group = this.groups.get(groupId);

    if (node && group) {
      // Remove from current groups
      this.removeNodeFromGroups(nodeId);

      // Add to new group
      group.addNode(node);
      node.withGroup(groupId);
    }
  }

  removeNodeFromGroups(nodeId: string): void {
    this.groups.forEach((group) => {
      group.removeNode(nodeId);
    });
  }

  findNodeGroup(nodeId: string): Group | null {
    for (const group of this.groups.values()) {
      if (group.getAllNodes().some((node) => node.id === nodeId)) {
        return group;
      }
    }
    return null;
  }

  // Edge management
  connect(from: Node | Node[], to: Node | Node[], options: any = {}): Edge[] {
    const fromNodes = Array.isArray(from) ? from : [from];
    const toNodes = Array.isArray(to) ? to : [to];
    const edges: Edge[] = [];

    fromNodes.forEach((fromNode) => {
      toNodes.forEach((toNode) => {
        const edge = new Edge(generateId(), fromNode.id, toNode.id, options);
        this.addEdge(edge);
        edges.push(edge);
      });
    });

    return edges;
  }

  connectWithEdge(from: Node, to: Node, edge: Edge): void {
    edge.fromId = from.id;
    edge.toId = to.id;
    this.addEdge(edge);
  }

  edge(from: Node, to: Node): any {
    // Return EdgeBuilder for fluent API
    return {
      build: (options: any = {}) => {
        const edge = new Edge(generateId(), from.id, to.id, options);
        this.addEdge(edge);
        return edge;
      },
    };
  }

  addEdge(edge: Edge): void {
    this.edges.set(edge.id, edge);
  }

  removeEdge(edgeId: string): void {
    this.edges.delete(edgeId);
  }

  getAllEdges(): Edge[] {
    return Array.from(this.edges.values());
  }

  getNodeEdges(nodeId: string): Edge[] {
    return Array.from(this.edges.values()).filter(
      (edge) => edge.fromId === nodeId || edge.toId === nodeId
    );
  }

  // Mingrammer-style operators
  rightShift(from: Node | Node[], to: Node | Node[]): Edge[] {
    return this.connect(from, to, { dir: "forward" });
  }

  leftShift(from: Node | Node[], to: Node | Node[]): Edge[] {
    return this.connect(to, from, { dir: "forward" });
  }

  undirected(from: Node | Node[], to: Node | Node[]): Edge[] {
    return this.connect(from, to, { dir: "none" });
  }

  // Layout management
  setLayoutAlgorithm(algorithm: string): void {
    this.layoutOptions.algorithm = algorithm;
  }

  setManualLayout(enable: boolean): void {
    this.layoutOptions.manual = enable;
  }

  positionNode(
    nodeId: string,
    x: number,
    y: number,
    fixed: boolean = false
  ): void {
    const node = this.getNode(nodeId);
    if (node) {
      node.withPosition(x, y, fixed);
    }
  }

  // Rendering and export
  async render(
    container: string | HTMLElement,
    options: any = {}
  ): Promise<void> {
    // This will be implemented by the renderer
    throw new Error("Render method should be implemented by a renderer");
  }

  async export(format: string, options: any = {}): Promise<string | Blob> {
    // This will be implemented by the renderer
    throw new Error("Export method should be implemented by a renderer");
  }

  // Data model
  getModel(): DiagramModel {
    return {
      title: this.title,
      config: this.config,
      nodes: this.getAllNodes(),
      edges: this.getAllEdges(),
      clusters: this.getAllClusters(),
      groups: Array.from(this.groups.values()),
    };
  }

  // Statistics
  getStatistics(): DiagramStatistics {
    const nodes = this.getAllNodes();
    const providers = { aws: 0, azure: 0, gcp: 0 };
    const categories: Record<string, number> = {};

    nodes.forEach((node) => {
      if (node.provider && providers.hasOwnProperty(node.provider)) {
        providers[node.provider as keyof typeof providers]++;
      }

      const category = node.getCategory();
      categories[category] = (categories[category] || 0) + 1;
    });

    const calculateGroupDepth = (group: Group, depth: number = 0): number => {
      const subGroups = group
        .getAllNodes()
        .filter((node) => this.groups.has(node.id));
      if (subGroups.length === 0) return depth;

      return Math.max(
        ...subGroups.map((subGroup) =>
          calculateGroupDepth(this.groups.get(subGroup.id)!, depth + 1)
        )
      );
    };

    const maxDepth = Math.max(
      ...Array.from(this.groups.values()).map((group) =>
        calculateGroupDepth(group)
      ),
      0
    );

    return {
      nodeCount: nodes.length,
      edgeCount: this.getAllEdges().length,
      clusterCount: this.getAllClusters().length,
      groupCount: this.groups.size,
      providers,
      categories,
      maxDepth,
    };
  }

  getClusterStatistics(): ClusterStatistics {
    const clusters = this.getAllClusters();
    const totalClusters = clusters.length;

    if (totalClusters === 0) {
      return {
        totalClusters: 0,
        maxDepth: 0,
        nodesInClusters: 0,
        clustersWithSubClusters: 0,
        averageNodesPerCluster: 0,
      };
    }

    const maxDepth = Math.max(...clusters.map((cluster) => cluster.getDepth()));
    const nodesInClusters = clusters.reduce(
      (sum, cluster) => sum + cluster.getNodes().length,
      0
    );
    const clustersWithSubClusters = clusters.filter(
      (cluster) => cluster.getSubClusters().length > 0
    ).length;
    const averageNodesPerCluster = nodesInClusters / totalClusters;

    return {
      totalClusters,
      maxDepth,
      nodesInClusters,
      clustersWithSubClusters,
      averageNodesPerCluster,
    };
  }
}
