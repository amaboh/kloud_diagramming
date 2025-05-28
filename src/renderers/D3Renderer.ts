import * as d3 from "d3";
import { RenderOptions, IconRegistry, CloudProvider } from "../types";
import { Diagram } from "../core/Diagram";
import { Node } from "../core/Node";
import { Edge } from "../core/Edge";
import { Cluster } from "../core/Cluster";

interface ProviderTheme {
  primary: string;
  secondary: string;
  text: string;
}

interface LayoutPosition {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

interface D3Node extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  provider: CloudProvider;
  service: string;
  position?: { x: number; y: number };
}

interface D3Edge extends Edge {
  source: D3Node;
  target: D3Node;
}

/**
 * Professional D3.js renderer for cloud architecture diagrams
 * Supports clusters, styled edges, and interactive features
 */
export class CloudDiagramsD3Renderer {
  private containerId: string;
  private options: RenderOptions & {
    nodeSize: number;
    nodeSpacing: number;
    clusterPadding: number;
    edgeStrokeWidth: number;
  };
  private iconRegistry: IconRegistry | null = null;
  private svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> | null =
    null;
  private container: d3.Selection<
    SVGGElement,
    unknown,
    HTMLElement,
    any
  > | null = null;
  private zoom: d3.ZoomBehavior<SVGSVGElement, unknown> | null = null;
  private simulation: d3.Simulation<D3Node, undefined> | null = null;

  private readonly providerThemes: Record<CloudProvider, ProviderTheme> = {
    aws: { primary: "#FF9900", secondary: "#232F3E", text: "#232F3E" },
    azure: { primary: "#0078D4", secondary: "#005A9E", text: "#323130" },
    gcp: { primary: "#4285F4", secondary: "#1A73E8", text: "#202124" },
  };

  private readonly edgeStyles: Record<string, string> = {
    solid: "none",
    dashed: "5,5",
    dotted: "2,3",
    bold: "none",
  };

  constructor(containerId: string, options: Partial<RenderOptions> = {}) {
    this.containerId = containerId;
    this.options = {
      width: 1200,
      height: 800,
      nodeSize: 140,
      nodeSpacing: 180,
      clusterPadding: 40,
      edgeStrokeWidth: 2,
      enableZoom: true,
      enablePan: true,
      enableTooltips: true,
      enableClustering: true,
      theme: "light",
      backgroundColor: "#ffffff",
      layoutAlgorithm: "hierarchical",
      ...options,
    };

    this.initializeSVG();
  }

  // ========================================================================
  // INITIALIZATION
  // ========================================================================

  private initializeSVG(): void {
    const container = d3.select(`#${this.containerId}`);
    container.selectAll("*").remove();

    this.svg = container
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${this.options.width} ${this.options.height}`)
      .attr("class", "cloud-diagram-svg");

    this.setupDefinitions();

    this.container = this.svg.append("g").attr("class", "diagram-container");

    if (this.options.enableZoom) {
      this.setupZoom();
    }
  }

  private setupDefinitions(): void {
    if (!this.svg) return;

    const defs = this.svg.append("defs");

    // Provider gradients
    Object.entries(this.providerThemes).forEach(([provider, theme]) => {
      const gradient = defs
        .append("linearGradient")
        .attr("id", `${provider}-gradient`)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", theme.primary)
        .attr("stop-opacity", 0.1);

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", theme.primary)
        .attr("stop-opacity", 0.05);
    });

    // Drop shadow filter
    const filter = defs
      .append("filter")
      .attr("id", "drop-shadow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");

    filter
      .append("feDropShadow")
      .attr("dx", 0)
      .attr("dy", 4)
      .attr("stdDeviation", 8)
      .attr("flood-color", "rgba(0,0,0,0.12)");

    // Arrow markers for edges
    this.createArrowMarkers(defs);
  }

  private createArrowMarkers(
    defs: d3.Selection<SVGDefsElement, unknown, HTMLElement, any>
  ): void {
    const arrowTypes = ["normal", "dot", "diamond", "box"];
    const colors = ["#666", "#4CAF50", "#FF9800", "#F44336", "#2196F3"];

    arrowTypes.forEach((type) => {
      colors.forEach((color, index) => {
        const marker = defs
          .append("marker")
          .attr("id", `arrow-${type}-${index}`)
          .attr("viewBox", "0 -5 10 10")
          .attr("refX", 8)
          .attr("refY", 0)
          .attr("markerWidth", 6)
          .attr("markerHeight", 6)
          .attr("orient", "auto")
          .attr("fill", color);

        switch (type) {
          case "normal":
            marker.append("path").attr("d", "M0,-5L10,0L0,5");
            break;
          case "dot":
            marker.append("circle").attr("cx", 5).attr("cy", 0).attr("r", 3);
            break;
          case "diamond":
            marker.append("path").attr("d", "M0,0L5,-3L10,0L5,3Z");
            break;
          case "box":
            marker
              .append("rect")
              .attr("x", 2)
              .attr("y", -3)
              .attr("width", 6)
              .attr("height", 6);
            break;
        }
      });
    });
  }

  private setupZoom(): void {
    if (!this.svg || !this.container) return;

    this.zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 3])
      .on("zoom", (event) => {
        if (this.container) {
          this.container.attr("transform", event.transform);
        }
      });

    this.svg.call(this.zoom);
  }

  // ========================================================================
  // ICON REGISTRY INTEGRATION
  // ========================================================================

  public setIconRegistry(iconRegistry: IconRegistry): void {
    this.iconRegistry = iconRegistry;
  }

  private async loadNodeIcons(nodes: Node[]): Promise<void> {
    if (!this.iconRegistry) {
      console.warn("No icon registry set, using fallback icons");
      return;
    }

    // Pre-load all required icons
    for (const node of nodes) {
      const icon = this.iconRegistry.getIcon(node.provider, node.service);
      if (!icon) {
        console.warn(`Icon not found for ${node.provider}.${node.service}`);
      }
    }
  }

  // ========================================================================
  // MAIN RENDERING METHODS
  // ========================================================================

  public async renderDiagram(
    diagram: Diagram,
    options: Partial<RenderOptions> = {}
  ): Promise<void> {
    try {
      const mergedOptions = { ...this.options, ...options };

      const nodes = diagram.getAllNodes();
      const edges = diagram.getAllEdges();
      const clusters = diagram.getAllClusters();

      // Load icons
      await this.loadNodeIcons(nodes);

      // Calculate layout
      const layout = this.calculateLayout(
        nodes,
        edges,
        clusters,
        mergedOptions
      );

      // Clear previous content
      if (this.container) {
        this.container.selectAll("*").remove();
      }

      // Render in order: clusters, edges, nodes
      if (mergedOptions.enableClustering && clusters.length > 0) {
        this.renderClusters(clusters, nodes);
      }

      this.renderEdges(edges, nodes);
      this.renderNodes(nodes);

      // Add interactions
      if (mergedOptions.enableTooltips) {
        this.addTooltips(nodes, edges, clusters);
      }

      // Fit to view
      this.fitToView();
    } catch (error) {
      console.error("Error rendering diagram:", error);
      throw error;
    }
  }

  private calculateLayout(
    nodes: Node[],
    edges: Edge[],
    clusters: Cluster[],
    options: RenderOptions
  ): LayoutPosition[] {
    switch (options.layoutAlgorithm) {
      case "hierarchical":
        return this.calculateHierarchicalLayout(nodes, edges, options);
      case "force":
        return this.calculateForceLayout(nodes, edges, options);
      case "grid":
        return this.layoutNodesInGrid(nodes, options);
      case "clustered":
        return this.calculateClusteredLayout(nodes, edges, clusters, options);
      default:
        return this.calculateHierarchicalLayout(nodes, edges, options);
    }
  }

  private calculateHierarchicalLayout(
    nodes: Node[],
    edges: Edge[],
    options: RenderOptions
  ): LayoutPosition[] {
    const positions: LayoutPosition[] = [];
    
    // Build adjacency list to understand connections
    const adjacencyList = new Map<string, string[]>();
    const inDegree = new Map<string, number>();
    
    // Initialize
    nodes.forEach(node => {
      adjacencyList.set(node.id, []);
      inDegree.set(node.id, 0);
    });
    
    // Build graph
    edges.forEach(edge => {
      const fromList = adjacencyList.get(edge.fromId) || [];
      fromList.push(edge.toId);
      adjacencyList.set(edge.fromId, fromList);
      inDegree.set(edge.toId, (inDegree.get(edge.toId) || 0) + 1);
    });
    
    // Topological sort to determine levels
    const levels: string[][] = [];
    const queue: string[] = [];
    const visited = new Set<string>();
    
    // Find root nodes (no incoming edges)
    nodes.forEach(node => {
      if ((inDegree.get(node.id) || 0) === 0) {
        queue.push(node.id);
      }
    });
    
    // If no root nodes, start with first node
    if (queue.length === 0 && nodes.length > 0) {
      queue.push(nodes[0].id);
    }
    
    // Process levels using breadth-first search
    while (queue.length > 0) {
      const currentLevel: string[] = [];
      const levelSize = queue.length;
      
      // Process all nodes at current level
      for (let i = 0; i < levelSize; i++) {
        const nodeId = queue.shift()!;
        if (!visited.has(nodeId)) {
          visited.add(nodeId);
          currentLevel.push(nodeId);
          
          // Add children to next level
          const children = adjacencyList.get(nodeId) || [];
          children.forEach(childId => {
            if (!visited.has(childId)) {
              // Decrease in-degree and add to queue if all parents processed
              const newInDegree = (inDegree.get(childId) || 0) - 1;
              inDegree.set(childId, newInDegree);
              if (newInDegree === 0) {
                queue.push(childId);
              }
            }
          });
        }
      }
      
      if (currentLevel.length > 0) {
        levels.push(currentLevel);
      }
    }
    
    // Add any remaining unvisited nodes to the last level
    nodes.forEach(node => {
      if (!visited.has(node.id)) {
        if (levels.length === 0) {
          levels.push([]);
        }
        levels[levels.length - 1].push(node.id);
      }
    });
    
    // Calculate positions with improved spacing
    const nodeSize = this.options.nodeSize;
    const horizontalSpacing = Math.max(this.options.nodeSpacing, nodeSize + 80); // Minimum spacing
    const verticalSpacing = Math.max(200, nodeSize + 100); // Vertical spacing between levels
    const startY = 100; // Top margin
    
    // Calculate total width needed for each level
    const levelWidths = levels.map(level => 
      Math.max(0, (level.length - 1) * horizontalSpacing)
    );
    const maxLevelWidth = Math.max(...levelWidths, 0);
    
    // Ensure diagram fits in viewport
    const diagramWidth = Math.max(maxLevelWidth + nodeSize, options.width! * 0.8);
    const centerX = options.width! / 2;
    
    levels.forEach((level, levelIndex) => {
      const y = startY + levelIndex * verticalSpacing;
      const levelWidth = (level.length - 1) * horizontalSpacing;
      const startX = centerX - levelWidth / 2;
      
      level.forEach((nodeId, nodeIndex) => {
        const node = nodes.find(n => n.id === nodeId);
        if (node) {
          const x = level.length === 1 
            ? centerX 
            : startX + nodeIndex * horizontalSpacing;
          
          node.withPosition(x, y, true);
          positions.push({ x, y, width: nodeSize, height: nodeSize });
        }
      });
    });
    
    return positions;
  }

  private calculateClusteredLayout(
    nodes: Node[],
    edges: Edge[],
    clusters: Cluster[],
    options: RenderOptions
  ): LayoutPosition[] {
    const positions: LayoutPosition[] = [];
    const clusterPositions = new Map<string, LayoutPosition>();

    // Simple clustered layout implementation
    let currentY = 100;

    clusters.forEach((cluster, clusterIndex) => {
      const clusterNodes = cluster.getNodes();
      const clusterWidth = Math.max(
        300,
        clusterNodes.length * (this.options.nodeSize + this.options.nodeSpacing)
      );
      const clusterHeight = 200;

      const clusterPos = {
        x: 100 + (clusterIndex % 2) * (clusterWidth + 100),
        y: currentY,
        width: clusterWidth,
        height: clusterHeight,
      };

      clusterPositions.set(cluster.id, clusterPos);

      // Position nodes within cluster
      clusterNodes.forEach((node, nodeIndex) => {
        const nodePos = {
          x: clusterPos.x + 50 + nodeIndex * (this.options.nodeSize + 50),
          y: clusterPos.y + clusterHeight / 2,
        };

        node.withPosition(nodePos.x, nodePos.y, true);
        positions.push(nodePos);
      });

      if (clusterIndex % 2 === 1) {
        currentY += clusterHeight + 100;
      }
    });

    // Position unclustered nodes
    const unclusteredNodes = nodes.filter((node) => !node.clusterId);
    unclusteredNodes.forEach((node, index) => {
      const nodePos = {
        x: 100 + index * (this.options.nodeSize + this.options.nodeSpacing),
        y: currentY + 100,
      };

      node.withPosition(nodePos.x, nodePos.y, true);
      positions.push(nodePos);
    });

    return positions;
  }

  private calculateForceLayout(
    nodes: Node[],
    edges: Edge[],
    options: RenderOptions
  ): LayoutPosition[] {
    const positions: LayoutPosition[] = [];
    
    if (nodes.length === 0) return positions;
    
    // Convert to D3 nodes and links
    const d3Nodes: D3Node[] = nodes.map((node, index) => ({
      id: node.id,
      label: node.label,
      provider: node.provider,
      service: node.service,
      position: node.position,
      x: node.position?.x || (options.width! / 4) + Math.random() * (options.width! / 2),
      y: node.position?.y || (options.height! / 4) + Math.random() * (options.height! / 2),
    }));

    const d3Links = edges.map((edge) => ({
      source: d3Nodes.find((n) => n.id === edge.fromId)!,
      target: d3Nodes.find((n) => n.id === edge.toId)!,
    })).filter(link => link.source && link.target);

    // Create force simulation with better parameters
    this.simulation = d3
      .forceSimulation(d3Nodes)
      .force(
        "link",
        d3
          .forceLink(d3Links)
          .id((d: any) => d.id)
          .distance(this.options.nodeSpacing * 1.5)
          .strength(0.8)
      )
      .force("charge", d3.forceManyBody().strength(-800))
      .force(
        "center",
        d3.forceCenter(options.width! / 2, options.height! / 2)
      )
      .force(
        "collision",
        d3.forceCollide().radius(this.options.nodeSize / 2 + 30)
      )
      .force(
        "x",
        d3.forceX(options.width! / 2).strength(0.1)
      )
      .force(
        "y", 
        d3.forceY(options.height! / 2).strength(0.1)
      );

    // Run simulation for more iterations for better convergence
    for (let i = 0; i < 500; ++i) {
      this.simulation.tick();
    }

    // Update node positions and return positions
    d3Nodes.forEach((d3Node, index) => {
      const node = nodes[index];
      const x = Math.max(this.options.nodeSize, Math.min(options.width! - this.options.nodeSize, d3Node.x || 0));
      const y = Math.max(this.options.nodeSize, Math.min(options.height! - this.options.nodeSize, d3Node.y || 0));
      
      node.withPosition(x, y, true);
      positions.push({ x, y, width: this.options.nodeSize, height: this.options.nodeSize });
    });

    return positions;
  }

  private layoutNodesInGrid(
    nodes: Node[],
    options: RenderOptions
  ): LayoutPosition[] {
    const positions: LayoutPosition[] = [];
    
    if (nodes.length === 0) return positions;
    
    // Calculate optimal grid dimensions
    const nodeCount = nodes.length;
    const cols = Math.ceil(Math.sqrt(nodeCount));
    const rows = Math.ceil(nodeCount / cols);
    
    // Calculate spacing
    const nodeSize = this.options.nodeSize;
    const horizontalSpacing = Math.max(this.options.nodeSpacing, nodeSize + 60);
    const verticalSpacing = Math.max(this.options.nodeSpacing, nodeSize + 80);
    
    // Calculate total grid dimensions
    const gridWidth = (cols - 1) * horizontalSpacing;
    const gridHeight = (rows - 1) * verticalSpacing;
    
    // Center the grid in the viewport
    const startX = (options.width! - gridWidth) / 2;
    const startY = (options.height! - gridHeight) / 2;
    
    nodes.forEach((node, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      const x = startX + col * horizontalSpacing;
      const y = startY + row * verticalSpacing;
      
      node.withPosition(x, y, true);
      positions.push({ x, y, width: nodeSize, height: nodeSize });
    });
    
    return positions;
  }

  // ========================================================================
  // RENDERING METHODS
  // ========================================================================

  private renderClusters(clusters: Cluster[], nodes: Node[]): void {
    if (!this.container) return;

    const clusterGroups = this.container
      .selectAll(".cluster")
      .data(clusters)
      .enter()
      .append("g")
      .attr("class", "cluster");

    clusterGroups
      .append("rect")
      .attr("class", "cluster-background")
      .attr("x", (d) => this.getClusterBounds(d, nodes).x)
      .attr("y", (d) => this.getClusterBounds(d, nodes).y)
      .attr("width", (d) => this.getClusterBounds(d, nodes).width)
      .attr("height", (d) => this.getClusterBounds(d, nodes).height)
      .attr("fill", (d) => this.getClusterFill(d))
      .attr("stroke", (d) => this.getClusterStroke(d))
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", (d) => this.getClusterStrokeDashArray(d))
      .attr("rx", 8)
      .attr("ry", 8);

    clusterGroups
      .append("text")
      .attr("class", "cluster-label")
      .attr("x", (d) => this.getClusterBounds(d, nodes).x + 10)
      .attr("y", (d) => this.getClusterBounds(d, nodes).y + 20)
      .text((d) => d.label)
      .attr("font-family", "Arial, sans-serif")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("fill", "#333");
  }

  private getClusterBounds(
    cluster: Cluster,
    nodes: Node[]
  ): { x: number; y: number; width: number; height: number } {
    const clusterNodes = cluster.getNodes();

    if (clusterNodes.length === 0) {
      return { x: 0, y: 0, width: 200, height: 100 };
    }

    const xs = clusterNodes.map((node) => node.position?.x || 0);
    const ys = clusterNodes.map((node) => node.position?.y || 0);

    const minX = Math.min(...xs) - this.options.clusterPadding;
    const maxX =
      Math.max(...xs) + this.options.nodeSize + this.options.clusterPadding;
    const minY = Math.min(...ys) - this.options.clusterPadding;
    const maxY =
      Math.max(...ys) + this.options.nodeSize + this.options.clusterPadding;

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  private getClusterFill(cluster: Cluster): string {
    return cluster.options.fillcolor || cluster.options.bgcolor || "#f8f9fa";
  }

  private getClusterStroke(cluster: Cluster): string {
    return cluster.options.color || "#dee2e6";
  }

  private getClusterStrokeDashArray(cluster: Cluster): string {
    const style = cluster.options.style || "solid";
    return this.edgeStyles[style] || "none";
  }

  private renderEdges(edges: Edge[], nodes: Node[]): void {
    if (!this.container) return;

    const edgeGroups = this.container
      .selectAll(".edge")
      .data(edges)
      .enter()
      .append("g")
      .attr("class", "edge");

    // Calculate edge positions with proper node boundaries
    edgeGroups
      .append("line")
      .attr("class", "edge-line")
      .attr("x1", (d) => {
        const fromNode = nodes.find((n) => n.id === d.fromId);
        return fromNode?.position?.x || 0;
      })
      .attr("y1", (d) => {
        const fromNode = nodes.find((n) => n.id === d.fromId);
        // Start from bottom of source node
        return (fromNode?.position?.y || 0) + this.options.nodeSize / 2;
      })
      .attr("x2", (d) => {
        const toNode = nodes.find((n) => n.id === d.toId);
        return toNode?.position?.x || 0;
      })
      .attr("y2", (d) => {
        const toNode = nodes.find((n) => n.id === d.toId);
        // End at top of target node
        return (toNode?.position?.y || 0) - this.options.nodeSize / 2;
      })
      .attr("stroke", (d) => d.options.color || "#666")
      .attr("stroke-width", (d) => this.getEdgeStrokeWidth(d))
      .attr("stroke-dasharray", (d) => this.getEdgeStrokeDashArray(d))
      .attr("marker-end", (d) => this.getEdgeMarker(d))
      .attr("opacity", 0.8);

    // Add edge labels if present
    edgeGroups
      .filter((d) => Boolean(d.options.label))
      .append("text")
      .attr("class", "edge-label")
      .attr("x", (d) => {
        const fromNode = nodes.find((n) => n.id === d.fromId);
        const toNode = nodes.find((n) => n.id === d.toId);
        return ((fromNode?.position?.x || 0) + (toNode?.position?.x || 0)) / 2;
      })
      .attr("y", (d) => {
        const fromNode = nodes.find((n) => n.id === d.fromId);
        const toNode = nodes.find((n) => n.id === d.toId);
        const fromY = (fromNode?.position?.y || 0) + this.options.nodeSize / 2;
        const toY = (toNode?.position?.y || 0) - this.options.nodeSize / 2;
        return (fromY + toY) / 2 - 5;
      })
      .text((d) => d.options.label || "")
      .attr("font-family", "Arial, sans-serif")
      .attr("font-size", "12px")
      .attr("fill", "#666")
      .attr("text-anchor", "middle")
      .attr("background", "white")
      .attr("padding", "2px");
  }

  private getEdgeStrokeWidth(edge: Edge): number {
    return edge.options.weight
      ? edge.options.weight * 2
      : this.options.edgeStrokeWidth;
  }

  private getEdgeStrokeDashArray(edge: Edge): string {
    const style = edge.options.style || "solid";
    return this.edgeStyles[style] || "none";
  }

  private getEdgeMarker(edge: Edge): string {
    const arrowhead = edge.options.arrowhead || "normal";
    const color = edge.options.color || "#666";
    const colorIndex = this.getColorIndex(color);
    return `url(#arrow-${arrowhead}-${colorIndex})`;
  }

  private getColorIndex(color: string): number {
    const colors = ["#666", "#4CAF50", "#FF9800", "#F44336", "#2196F3"];
    const index = colors.indexOf(color);
    return index >= 0 ? index : 0;
  }

  private renderNodes(nodes: Node[]): void {
    if (!this.container) return;

    const nodeGroups = this.container
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr(
        "transform",
        (d) => `translate(${d.position?.x || 0}, ${d.position?.y || 0})`
      );

    // Node background rounded rectangle - square with rounded corners
    nodeGroups
      .append("rect")
      .attr("class", "node-background")
      .attr("x", -this.options.nodeSize / 2)
      .attr("y", -this.options.nodeSize / 2)
      .attr("width", this.options.nodeSize)
      .attr("height", this.options.nodeSize)
      .attr("rx", 12) // Increased border radius for better rounded corners
      .attr("ry", 12)
      .attr("fill", "#ffffff") // White background like multi-cloud demo
      .attr("stroke", (d) => this.providerThemes[d.provider]?.primary || "#666")
      .attr("stroke-width", 2)
      .attr("filter", "url(#drop-shadow)");

    // Node icon - larger to fill more of the square
    nodeGroups
      .append("image")
      .attr("class", "node-icon")
      .attr("x", -this.options.nodeSize / 3) // Larger icon
      .attr("y", -this.options.nodeSize / 3)
      .attr("width", (this.options.nodeSize * 2) / 3) // 2/3 of node size
      .attr("height", (this.options.nodeSize * 2) / 3)
      .attr("href", (d) => {
        if (this.iconRegistry) {
          const icon = this.iconRegistry.getIcon(d.provider, d.service);
          return (
            icon?.svg ||
            this.iconRegistry.getFallbackIcon(d.provider, d.service).svg
          );
        }
        return this.createFallbackIcon(d);
      });

    // Node label - positioned below the square
    nodeGroups
      .append("text")
      .attr("class", "node-label")
      .attr("y", this.options.nodeSize / 2 + 20) // More space below larger nodes
      .attr("text-anchor", "middle")
      .text((d) => d.getDisplayName())
      .attr("font-family", "Arial, sans-serif")
      .attr("font-size", "14px") // Slightly larger font
      .attr("font-weight", "500")
      .attr("fill", "#333");

    // Add interactions
    this.addNodeInteractions(nodeGroups);
  }

  private createFallbackIcon(node: Node): string {
    const color = this.providerThemes[node.provider]?.primary || "#666";
    const label = node.service.substring(0, 3).toUpperCase();

    return `data:image/svg+xml;base64,${btoa(`
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" fill="${color}" rx="4"/>
        <text x="20" y="24" fill="white" font-family="Arial" font-size="8" text-anchor="middle">${label}</text>
      </svg>
    `)}`;
  }

  private addNodeInteractions(
    nodeGroups: d3.Selection<SVGGElement, Node, SVGGElement, unknown>
  ): void {
    nodeGroups
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        // Dispatch custom event
        const customEvent = new CustomEvent("cloudNodeClick", { detail: d });
        document.dispatchEvent(customEvent);
      })
      .on("mouseenter", (event, d) => {
        this.highlightNode(d3.select(event.currentTarget as SVGGElement));
      })
      .on("mouseleave", (event, d) => {
        this.resetNodeHighlight(d3.select(event.currentTarget as SVGGElement));
      });
  }

  private addTooltips(nodes: Node[], edges: Edge[], clusters: Cluster[]): void {
    // Tooltip implementation would go here
    // For now, we'll use the browser's default title attribute
  }

  private highlightNode(nodeGroup: d3.Selection<any, Node, any, any>): void {
    nodeGroup
      .select(".node-background")
      .transition()
      .duration(200)
      .attr("x", -this.options.nodeSize / 2 - 5)
      .attr("y", -this.options.nodeSize / 2 - 5)
      .attr("width", this.options.nodeSize + 10)
      .attr("height", this.options.nodeSize + 10)
      .attr("stroke-width", 3);
  }

  private resetNodeHighlight(
    nodeGroup: d3.Selection<any, Node, any, any>
  ): void {
    nodeGroup
      .select(".node-background")
      .transition()
      .duration(200)
      .attr("x", -this.options.nodeSize / 2)
      .attr("y", -this.options.nodeSize / 2)
      .attr("width", this.options.nodeSize)
      .attr("height", this.options.nodeSize)
      .attr("stroke-width", 2);
  }

  // ========================================================================
  // UTILITY METHODS
  // ========================================================================

  public fitToView(): void {
    if (!this.svg || !this.container || !this.zoom) return;

    const bounds = (this.container.node() as SVGGElement).getBBox();
    const fullWidth = this.options.width!;
    const fullHeight = this.options.height!;
    const width = bounds.width;
    const height = bounds.height;
    const midX = bounds.x + width / 2;
    const midY = bounds.y + height / 2;

    if (width === 0 || height === 0) return;

    const scale = Math.min(fullWidth / width, fullHeight / height) * 0.9;
    const translate = [
      fullWidth / 2 - scale * midX,
      fullHeight / 2 - scale * midY,
    ];

    this.svg
      .transition()
      .duration(750)
      .call(
        this.zoom.transform,
        d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
      );
  }

  public resetZoom(): void {
    if (!this.svg || !this.zoom) return;

    this.svg
      .transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity);
  }

  public exportSVG(): string {
    if (!this.svg) return "";

    const svgNode = this.svg.node();
    return svgNode ? new XMLSerializer().serializeToString(svgNode) : "";
  }

  public async exportPNG(scale: number = 2): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const svgString = this.exportSVG();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      const img = new Image();
      img.onload = () => {
        canvas.width = this.options.width! * scale;
        canvas.height = this.options.height! * scale;
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Could not create blob"));
          }
        }, "image/png");
      };

      img.onerror = () => reject(new Error("Could not load SVG"));
      img.src = "data:image/svg+xml;base64," + btoa(svgString);
    });
  }
}
