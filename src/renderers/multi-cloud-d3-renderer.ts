import * as d3 from "d3";
import { multiCloudIconRegistry } from "../generated/cloud-icons/multi-cloud-icons";

/**
 * Enhanced Multi-Cloud D3.js Renderer
 * Supports AWS, Azure, and GCP icons with provider-specific styling
 */

interface CloudNode {
  id: string;
  label: string;
  provider: "aws" | "azure" | "gcp";
  service: string;
  x: number;
  y: number;
  metadata?: {
    name?: string;
    description?: string;
    category?: string;
    documentation?: string;
  };
  iconDataUrl?: string;
}

interface CloudEdge {
  source: string;
  target: string;
  label?: string;
}

interface ProviderTheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  categories: Record<string, string>;
}

export class MultiCloudD3Renderer {
  private svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> | null =
    null;
  private container: d3.Selection<
    SVGGElement,
    unknown,
    HTMLElement,
    any
  > | null = null;
  private zoom: d3.ZoomBehavior<SVGSVGElement, unknown> | null = null;

  // Configuration
  private readonly iconSize = 40;
  private readonly nodeWidth = 140;
  private readonly nodeHeight = 100;
  private readonly nodeSpacing = 200;

  // Provider themes
  private readonly providerThemes: Record<string, ProviderTheme> = {
    aws: {
      primary: "#FF9900",
      secondary: "#232F3E",
      background: "#FFFFFF",
      text: "#232F3E",
      categories: {
        compute: "#FF9900",
        storage: "#6CAE3E",
        database: "#527FFF",
        networking: "#A166FF",
        security: "#FF5252",
        management: "#FF4F8B",
        integration: "#FF4F8B",
      },
    },
    azure: {
      primary: "#0078D4",
      secondary: "#005A9E",
      background: "#FFFFFF",
      text: "#323130",
      categories: {
        compute: "#0078D4",
        storage: "#0078D4",
        database: "#0078D4",
        networking: "#0078D4",
        security: "#0078D4",
        management: "#0078D4",
        integration: "#0078D4",
      },
    },
    gcp: {
      primary: "#4285F4",
      secondary: "#1A73E8",
      background: "#FFFFFF",
      text: "#202124",
      categories: {
        compute: "#4285F4",
        storage: "#34A853",
        networking: "#9AA0A6",
        "ai-ml": "#EA4335",
        analytics: "#FBBC04",
        security: "#FF5722",
        management: "#9C27B0",
      },
    },
  };

  constructor(containerId: string) {
    this.initializeSVG(containerId);
    this.setupZoom();
  }

  private initializeSVG(containerId: string): void {
    const container = d3.select(`#${containerId}`);

    this.svg = container
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("class", "multi-cloud-diagram");

    this.container = this.svg.append("g").attr("class", "diagram-container");

    // Add definitions for gradients and filters
    this.setupDefinitions();
  }

  private setupDefinitions(): void {
    const defs = this.svg!.append("defs");

    // Provider-specific gradients
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
  }

  private setupZoom(): void {
    this.zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 3])
      .on("zoom", (event) => {
        this.container!.attr("transform", event.transform);
      });

    this.svg!.call(this.zoom);
  }

  async renderDiagram(
    nodes: CloudNode[],
    edges: CloudEdge[] = []
  ): Promise<void> {
    console.log("🌐 Rendering Multi-Cloud Diagram...");

    // Clear existing content
    this.container!.selectAll("*").remove();

    // Load icons for all nodes
    await this.loadNodeIcons(nodes);

    // Calculate layout
    this.calculateLayout(nodes);

    // Render edges first (so they appear behind nodes)
    this.renderEdges(edges, nodes);

    // Render nodes
    this.renderNodes(nodes);

    // Fit diagram to view
    this.fitToView();

    console.log(`✅ Rendered ${nodes.length} nodes and ${edges.length} edges`);
  }

  private async loadNodeIcons(nodes: CloudNode[]): Promise<void> {
    console.log("📦 Loading multi-cloud icons...");

    for (const node of nodes) {
      try {
        const iconUrl = multiCloudIconRegistry.getProviderIcon(
          node.provider,
          node.service
        );
        node.iconDataUrl = iconUrl;

        if (!iconUrl) {
          console.warn(
            `⚠️  Icon not found for ${node.provider}:${node.service}`
          );
        }
      } catch (error) {
        console.error(
          `❌ Error loading icon for ${node.provider}:${node.service}:`,
          error
        );
      }
    }
  }

  private calculateLayout(nodes: CloudNode[]): void {
    // Simple grid layout grouped by provider
    const providerGroups = this.groupNodesByProvider(nodes);
    let currentX = 0;

    Object.entries(providerGroups).forEach(([provider, providerNodes]) => {
      let currentY = 0;
      const maxNodesPerColumn = Math.ceil(Math.sqrt(providerNodes.length));

      providerNodes.forEach((node, index) => {
        const col = Math.floor(index / maxNodesPerColumn);
        const row = index % maxNodesPerColumn;

        node.x = currentX + col * this.nodeSpacing;
        node.y = currentY + row * this.nodeSpacing;
      });

      // Move to next provider group
      const columns = Math.ceil(providerNodes.length / maxNodesPerColumn);
      currentX += columns * this.nodeSpacing + 100; // Add spacing between providers
    });
  }

  private groupNodesByProvider(
    nodes: CloudNode[]
  ): Record<string, CloudNode[]> {
    return nodes.reduce((groups, node) => {
      if (!groups[node.provider]) {
        groups[node.provider] = [];
      }
      groups[node.provider].push(node);
      return groups;
    }, {} as Record<string, CloudNode[]>);
  }

  private renderNodes(nodes: CloudNode[]): void {
    const nodeGroups = this.container!.selectAll(".node-group")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", (d) => `node-group ${d.provider}-node`)
      .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
      .style("cursor", "pointer");

    // Node background
    nodeGroups
      .append("rect")
      .attr("class", "node-background")
      .attr("width", this.nodeWidth)
      .attr("height", this.nodeHeight)
      .attr("rx", 12)
      .attr("ry", 12)
      .style("fill", (d) => `url(#${d.provider}-gradient)`)
      .style("stroke", (d) => this.getProviderTheme(d.provider).primary)
      .style("stroke-width", 2)
      .style("filter", "url(#drop-shadow)");

    // Provider badge
    nodeGroups
      .append("rect")
      .attr("class", "provider-badge")
      .attr("x", this.nodeWidth - 30)
      .attr("y", 5)
      .attr("width", 25)
      .attr("height", 16)
      .attr("rx", 8)
      .style("fill", (d) => this.getProviderTheme(d.provider).primary);

    nodeGroups
      .append("text")
      .attr("class", "provider-badge-text")
      .attr("x", this.nodeWidth - 17.5)
      .attr("y", 16)
      .style("font-family", "system-ui, sans-serif")
      .style("font-size", "10px")
      .style("font-weight", "bold")
      .style("fill", "#FFFFFF")
      .style("text-anchor", "middle")
      .text((d) => d.provider.toUpperCase());

    // Service icons
    nodeGroups
      .filter((d) => Boolean(d.iconDataUrl))
      .append("image")
      .attr("class", "node-icon")
      .attr("width", this.iconSize)
      .attr("height", this.iconSize)
      .attr("x", this.nodeWidth / 2 - this.iconSize / 2)
      .attr("y", 25)
      .attr("href", (d) => d.iconDataUrl!)
      .style("cursor", "pointer");

    // Service labels
    nodeGroups
      .append("text")
      .attr("class", "node-label")
      .attr("x", this.nodeWidth / 2)
      .attr("y", this.nodeHeight - 15)
      .style("font-family", (d) => this.getProviderFont(d.provider))
      .style("font-size", "12px")
      .style("font-weight", "600")
      .style("fill", (d) => this.getProviderTheme(d.provider).text)
      .style("text-anchor", "middle")
      .text((d) => d.label);

    // Add interactions
    this.addNodeInteractions(nodeGroups);
  }

  private renderEdges(edges: CloudEdge[], nodes: CloudNode[]): void {
    const nodeMap = new Map(nodes.map((node) => [node.id, node]));

    const edgeGroups = this.container!.selectAll(".edge-group")
      .data(edges)
      .enter()
      .append("g")
      .attr("class", "edge-group");

    edgeGroups
      .append("line")
      .attr("class", "edge-line")
      .attr("x1", (d) => {
        const sourceNode = nodeMap.get(d.source);
        return sourceNode ? sourceNode.x + this.nodeWidth / 2 : 0;
      })
      .attr("y1", (d) => {
        const sourceNode = nodeMap.get(d.source);
        return sourceNode ? sourceNode.y + this.nodeHeight / 2 : 0;
      })
      .attr("x2", (d) => {
        const targetNode = nodeMap.get(d.target);
        return targetNode ? targetNode.x + this.nodeWidth / 2 : 0;
      })
      .attr("y2", (d) => {
        const targetNode = nodeMap.get(d.target);
        return targetNode ? targetNode.y + this.nodeHeight / 2 : 0;
      })
      .style("stroke", "#9CA3AF")
      .style("stroke-width", 2)
      .style("stroke-dasharray", "5,5");

    // Edge labels
    edgeGroups
      .filter((d) => Boolean(d.label))
      .append("text")
      .attr("class", "edge-label")
      .attr("x", (d) => {
        const sourceNode = nodeMap.get(d.source);
        const targetNode = nodeMap.get(d.target);
        if (sourceNode && targetNode) {
          return (sourceNode.x + targetNode.x + this.nodeWidth) / 2;
        }
        return 0;
      })
      .attr("y", (d) => {
        const sourceNode = nodeMap.get(d.source);
        const targetNode = nodeMap.get(d.target);
        if (sourceNode && targetNode) {
          return (sourceNode.y + targetNode.y + this.nodeHeight) / 2;
        }
        return 0;
      })
      .style("font-family", "system-ui, sans-serif")
      .style("font-size", "10px")
      .style("fill", "#6B7280")
      .style("text-anchor", "middle")
      .text((d) => d.label!);
  }

  private addNodeInteractions(
    nodeGroups: d3.Selection<SVGGElement, CloudNode, SVGGElement, unknown>
  ): void {
    nodeGroups
      .on("mouseover", (event, d) => {
        this.showNodeTooltip(event, d);
        this.highlightNode(d3.select(event.currentTarget), d.provider);
      })
      .on("mouseout", (event, d) => {
        this.hideTooltip();
        this.resetNodeHighlight(d3.select(event.currentTarget));
      })
      .on("click", (event, d) => {
        this.handleNodeClick(event, d);
      });
  }

  private showNodeTooltip(event: MouseEvent, node: CloudNode): void {
    const tooltip = this.createTooltip();
    const theme = this.getProviderTheme(node.provider);

    tooltip.innerHTML = `
      <div class="tooltip-header" style="background: ${
        theme.primary
      }; color: white; padding: 8px; border-radius: 4px 4px 0 0;">
        <strong>${node.metadata?.name || node.label}</strong>
        <span style="float: right; font-size: 10px;">${node.provider.toUpperCase()}</span>
      </div>
      <div class="tooltip-content" style="padding: 8px; background: white; border-radius: 0 0 4px 4px;">
        <div style="margin-bottom: 4px; color: #666;">
          ${
            node.metadata?.description ||
            `${node.provider.toUpperCase()} ${node.service} service`
          }
        </div>
        <div style="font-size: 11px; color: #888;">
          Category: ${node.metadata?.category || "Unknown"}
        </div>
      </div>
    `;

    this.positionTooltip(tooltip, event);
  }

  private createTooltip(): HTMLDivElement {
    // Remove existing tooltip
    d3.select(".cloud-tooltip").remove();

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "cloud-tooltip")
      .style("position", "absolute")
      .style("background", "white")
      .style("border-radius", "4px")
      .style("box-shadow", "0 4px 12px rgba(0,0,0,0.15)")
      .style("font-family", "system-ui, sans-serif")
      .style("font-size", "12px")
      .style("max-width", "250px")
      .style("z-index", "1000")
      .style("pointer-events", "none");

    return tooltip.node() as HTMLDivElement;
  }

  private positionTooltip(tooltip: HTMLDivElement, event: MouseEvent): void {
    const tooltipRect = tooltip.getBoundingClientRect();
    const x = event.pageX + 10;
    const y = event.pageY - tooltipRect.height - 10;

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  }

  private hideTooltip(): void {
    d3.select(".cloud-tooltip").remove();
  }

  private highlightNode(
    nodeGroup: d3.Selection<SVGGElement, CloudNode, SVGGElement, unknown>,
    provider: string
  ): void {
    const theme = this.getProviderTheme(provider);

    nodeGroup
      .select(".node-background")
      .transition()
      .duration(200)
      .style("stroke-width", 3)
      .style("filter", "url(#drop-shadow) brightness(1.05)");

    nodeGroup
      .select(".node-icon")
      .transition()
      .duration(200)
      .attr("width", this.iconSize * 1.1)
      .attr("height", this.iconSize * 1.1)
      .attr("x", this.nodeWidth / 2 - (this.iconSize * 1.1) / 2)
      .attr("y", 25 - (this.iconSize * 0.1) / 2);
  }

  private resetNodeHighlight(
    nodeGroup: d3.Selection<SVGGElement, CloudNode, SVGGElement, unknown>
  ): void {
    nodeGroup
      .select(".node-background")
      .transition()
      .duration(200)
      .style("stroke-width", 2)
      .style("filter", "url(#drop-shadow)");

    nodeGroup
      .select(".node-icon")
      .transition()
      .duration(200)
      .attr("width", this.iconSize)
      .attr("height", this.iconSize)
      .attr("x", this.nodeWidth / 2 - this.iconSize / 2)
      .attr("y", 25);
  }

  private handleNodeClick(event: MouseEvent, node: CloudNode): void {
    console.log("🖱️ Node clicked:", node);

    // Dispatch custom event
    const customEvent = new CustomEvent("cloudNodeClick", {
      detail: {
        node,
        provider: node.provider,
        service: node.service,
        metadata: node.metadata,
      },
    });

    document.dispatchEvent(customEvent);

    // Open documentation if available
    if (node.metadata?.documentation) {
      window.open(node.metadata.documentation, "_blank");
    }
  }

  private fitToView(): void {
    const bounds = this.container!.node()!.getBBox();
    const width = this.svg!.node()!.clientWidth;
    const height = this.svg!.node()!.clientHeight;

    const scale = Math.min(
      width / (bounds.width + 100),
      height / (bounds.height + 100),
      1
    );

    const translateX = (width - bounds.width * scale) / 2 - bounds.x * scale;
    const translateY = (height - bounds.height * scale) / 2 - bounds.y * scale;

    this.svg!.transition()
      .duration(750)
      .call(
        this.zoom!.transform,
        d3.zoomIdentity.translate(translateX, translateY).scale(scale)
      );
  }

  private getProviderTheme(provider: string): ProviderTheme {
    return this.providerThemes[provider] || this.providerThemes.aws;
  }

  private getProviderFont(provider: string): string {
    const fontMap = {
      aws: "Amazon Ember, system-ui, sans-serif",
      azure: "Segoe UI, system-ui, sans-serif",
      gcp: "Google Sans, Roboto, system-ui, sans-serif",
    };
    return fontMap[provider] || "system-ui, sans-serif";
  }

  // Public API methods
  public zoomToFit(): void {
    this.fitToView();
  }

  public resetZoom(): void {
    this.svg!.transition()
      .duration(750)
      .call(this.zoom!.transform, d3.zoomIdentity);
  }

  public exportSVG(): string {
    return this.svg!.node()!.outerHTML;
  }

  public destroy(): void {
    if (this.svg) {
      this.svg.remove();
    }
    d3.select(".cloud-tooltip").remove();
  }
}

export default MultiCloudD3Renderer;
