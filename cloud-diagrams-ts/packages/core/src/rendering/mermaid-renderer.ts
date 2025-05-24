import mermaid from 'mermaid';
import type { Renderer } from './renderer.interface';
import type { DiagramModel, RenderOptions, ExportOptions } from '../types';
import type { Node } from '../dsl/node';
import type { Edge } from '../dsl/edge';
import type { Group } from '../dsl/group';
import { iconRegistry } from '../icons/icon-registry';

export class MermaidRenderer implements Renderer {
  private initialized = false;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    if (this.initialized) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: '"Arial", sans-serif',
      fontSize: 16,
      // Remove architecture config as it's not in Mermaid types yet
    });

    this.initialized = true;
  }

  async render(
    diagram: DiagramModel,
    container: string | HTMLElement,
    options: RenderOptions = {}
  ): Promise<void> {
    const containerElement =
      typeof container === 'string'
        ? (document.querySelector(container) as HTMLElement)
        : container;

    if (!containerElement) {
      throw new Error('Container element not found');
    }

    // Clear the container
    containerElement.innerHTML = '';

    // Generate Mermaid syntax
    const mermaidSyntax = await this.generateMermaidSyntax(diagram);

    try {
      // Generate unique ID for this diagram
      const diagramId = `diagram-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Render with Mermaid
      const { svg } = await mermaid.render(diagramId, mermaidSyntax);

      // Insert SVG into container
      containerElement.innerHTML = svg;

      // Apply any custom styling
      if (options.theme) {
        this.applyTheme(containerElement, options.theme);
      }

      // Enhance with actual icons
      await this.enhanceWithIcons(containerElement, diagram, options.theme);

      // Add interactivity if requested
      if (options.interactive !== false) {
        this.addInteractivity(containerElement, diagram);
      }
    } catch (error) {
      console.error('Mermaid rendering failed:', error);
      console.log('Generated Mermaid syntax:', mermaidSyntax);

      // Fallback error display
      containerElement.innerHTML = `
        <div style="padding: 20px; border: 2px solid #f44336; background: #ffebee; border-radius: 4px;">
          <h3 style="color: #d32f2f; margin: 0 0 10px 0;">Diagram Rendering Error</h3>
          <p style="margin: 0; color: #666;">Failed to render diagram. Check console for details.</p>
          <details style="margin-top: 10px;">
            <summary>Generated Mermaid Code</summary>
            <pre style="background: #f5f5f5; padding: 10px; margin-top: 5px; overflow: auto;">${mermaidSyntax}</pre>
          </details>
        </div>
      `;
      throw error;
    }
  }

  private async generateMermaidSyntax(diagram: DiagramModel): Promise<string> {
    const lines: string[] = [];

    // Use flowchart format for better compatibility
    const direction =
      diagram.layoutOptions?.direction || diagram.config.direction || 'LR';
    lines.push(`flowchart ${direction}`);
    lines.push('');

    // Define nodes first
    const nodeDefinitions = new Map<string, string>();
    const nodeToGroupMap = new Map<string, string>();

    // Build node-to-group mapping
    for (const group of diagram.groups) {
      const allNodes = this.getAllNodesInGroup(group);
      for (const node of allNodes) {
        nodeToGroupMap.set(node.id, group.id);
      }
    }

    // Create node definitions
    for (const node of diagram.nodes) {
      const nodeId = this.getServiceIdentifier(node);
      const nodeLabel = node.label.replace(/[()[\]]/g, ''); // Clean special chars

      // Try to get icon from registry
      let iconSymbol = '🔹'; // Default fallback

      if (node.provider && node.service) {
        try {
          await iconRegistry.loadIconPack(node.provider);
          const hasIcon = iconRegistry.hasIcon(node.provider, node.service);

          if (hasIcon) {
            // Use a service-specific icon symbol for Mermaid
            iconSymbol = this.getIconSymbol(node.provider, node.service);
          }
        } catch (error) {
          console.warn(
            `Failed to load icon for ${node.provider}:${node.service}`,
            error
          );
        }
      }

      // Store node definition for later use
      nodeDefinitions.set(node.id, nodeId);
    }

    // Create groups with proper node assignments
    const processedGroups = new Set<string>();

    for (const group of diagram.groups) {
      if (processedGroups.has(group.id)) continue;

      const groupId = this.getGroupIdentifier(group);
      const groupNodes = group.getNodes ? group.getNodes() : [];
      const subGroups = group.getSubGroups ? group.getSubGroups() : [];

      lines.push(`    subgraph ${groupId} ["${group.name}"]`);
      lines.push(
        `        direction ${group.layoutOptions?.direction || direction}`
      );

      // Add nodes directly in this group
      for (const node of groupNodes) {
        const nodeId = nodeDefinitions.get(node.id);
        if (nodeId) {
          const nodeLabel = node.label.replace(/[()[\]]/g, '');
          const iconSymbol = this.getIconSymbol(
            node.provider || '',
            node.service || ''
          );

          lines.push(`        ${nodeId}["${iconSymbol} ${nodeLabel}"]`);

          // Add CSS class for styling
          const cssClass = `${node.provider || 'generic'}-${node.service || 'service'}`;
          lines.push(`        class ${nodeId} ${cssClass}`);
        }
      }

      // Add subgroups
      for (const subGroup of subGroups) {
        const subGroupId = this.getGroupIdentifier(subGroup);
        const subGroupNodes = subGroup.getNodes ? subGroup.getNodes() : [];

        lines.push(`        subgraph ${subGroupId} ["${subGroup.name}"]`);

        for (const node of subGroupNodes) {
          const nodeId = nodeDefinitions.get(node.id);
          if (nodeId) {
            const nodeLabel = node.label.replace(/[()[\]]/g, '');
            const iconSymbol = this.getIconSymbol(
              node.provider || '',
              node.service || ''
            );

            lines.push(`            ${nodeId}["${iconSymbol} ${nodeLabel}"]`);

            const cssClass = `${node.provider || 'generic'}-${node.service || 'service'}`;
            lines.push(`            class ${nodeId} ${cssClass}`);
          }
        }

        lines.push(`        end`);
        processedGroups.add(subGroup.id);
      }

      lines.push(`    end`);
      processedGroups.add(group.id);
      lines.push('');
    }

    // Add ungrouped nodes
    for (const node of diagram.nodes) {
      if (!node.groupId) {
        const nodeId = nodeDefinitions.get(node.id);
        if (nodeId) {
          const nodeLabel = node.label.replace(/[()[\]]/g, '');
          const iconSymbol = this.getIconSymbol(
            node.provider || '',
            node.service || ''
          );

          lines.push(`    ${nodeId}["${iconSymbol} ${nodeLabel}"]`);

          const cssClass = `${node.provider || 'generic'}-${node.service || 'service'}`;
          lines.push(`    class ${nodeId} ${cssClass}`);
        }
      }
    }

    lines.push('');

    // Add connections/edges
    diagram.edges.forEach((edge) => {
      const fromNode = nodeDefinitions.get(edge.fromId);
      const toNode = nodeDefinitions.get(edge.toId);

      if (fromNode && toNode) {
        const connectionType = edge.options?.bidirectional ? '<-->' : '-->';
        const label = edge.options?.label ? `|${edge.options.label}|` : '';
        lines.push(`    ${fromNode} ${connectionType}${label} ${toNode}`);
      }
    });

    return lines.join('\n');
  }

  private getAllNodesInGroup(group: any): any[] {
    const nodes = group.getNodes ? group.getNodes() : [];
    const subGroups = group.getSubGroups ? group.getSubGroups() : [];

    for (const subGroup of subGroups) {
      nodes.push(...this.getAllNodesInGroup(subGroup));
    }

    return nodes;
  }

  private getGroupIdentifier(group: any): string {
    return `${group.name.replace(/\s+/g, '_')}_${group.id.slice(-4)}`;
  }

  private getServiceIdentifier(node: Node): string {
    // Create a clean identifier from node details
    const base = node.service || 'service';
    const suffix = node.id.slice(-4); // Use last 4 chars of ID for uniqueness
    return `${base}_${suffix}`.replace(/[^a-zA-Z0-9_]/g, '_');
  }

  private getIconSymbol(provider: string, service: string): string {
    // Map cloud services to Unicode symbols for Mermaid compatibility
    // These will be enhanced with CSS to show actual icon images
    const iconSymbols: Record<string, Record<string, string>> = {
      aws: {
        // Compute
        ec2: '🖥️',
        lambda: 'λ',
        ecs: '📦',

        // Database
        rds: '🗄️',
        dynamodb: '⚡',

        // Storage
        s3: '🪣',
        efs: '📁',

        // Network
        vpc: '🔒',
        route53: '🌐',
        cloudfront: '⚡',
      },
      azure: {
        vm: '🖥️',
        functions: 'ƒ',
        sqldb: '🗄️',
        storage: '💾',
      },
      gcp: {
        computeengine: '🖥️',
        cloudfunctions: 'ƒ',
        cloudsql: '🗄️',
        cloudstorage: '☁️',
      },
    };

    return iconSymbols[provider]?.[service] || '🔹';
  }

  /**
   * Enhanced icon rendering with post-processing
   * This method will inject actual SVG icons after Mermaid renders
   */
  private async enhanceWithIcons(
    container: HTMLElement,
    diagram: DiagramModel,
    theme?: string
  ): Promise<void> {
    const svg = container.querySelector('svg');
    if (!svg) return;

    // Find all text elements that might contain our icon symbols
    const textElements = svg.querySelectorAll('text');

    for (const textElement of textElements) {
      const textContent = textElement.textContent || '';

      // Find nodes that match this text content
      for (const node of diagram.nodes) {
        const iconSymbol = this.getIconSymbol(
          node.provider || '',
          node.service || ''
        );

        if (textContent.includes(iconSymbol) && node.provider && node.service) {
          try {
            // Get the actual SVG icon
            const iconDataUrl = await iconRegistry.getIconDataUrl(
              node.provider,
              node.service,
              theme === 'dark' ? 'dark' : 'light'
            );

            if (iconDataUrl) {
              // Replace the symbol with an actual SVG icon
              await this.replaceSymbolWithIcon(
                textElement,
                iconSymbol,
                iconDataUrl
              );
            }
          } catch (error) {
            console.warn(
              `Failed to load icon for ${node.provider}:${node.service}`,
              error
            );
          }
        }
      }
    }
  }

  private async replaceSymbolWithIcon(
    textElement: SVGTextElement,
    symbol: string,
    iconDataUrl: string
  ): Promise<void> {
    const parent = textElement.parentElement;
    if (!parent) return;

    // Create an image element to replace the symbol
    const iconImage = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'image'
    );

    // Position the icon where the symbol was
    const bbox = textElement.getBBox();
    iconImage.setAttribute('x', (bbox.x - 12).toString());
    iconImage.setAttribute('y', (bbox.y - 12).toString());
    iconImage.setAttribute('width', '24');
    iconImage.setAttribute('height', '24');
    iconImage.setAttribute('href', iconDataUrl);

    // Update text content to remove the symbol
    const newText = textElement.textContent?.replace(symbol, '').trim() || '';
    textElement.textContent = newText;

    // Adjust text position to make room for icon
    const currentX = parseFloat(textElement.getAttribute('x') || '0');
    textElement.setAttribute('x', (currentX + 20).toString());

    // Insert icon before text element
    parent.insertBefore(iconImage, textElement);
  }

  private applyTheme(container: HTMLElement, theme: string): void {
    container.classList.add(`diagram-theme-${theme}`);

    if (theme === 'dark') {
      const svg = container.querySelector('svg');
      if (svg) {
        svg.style.background = '#1e1e1e';
        // Update text colors for dark theme
        const textElements = svg.querySelectorAll('text');
        textElements.forEach((text) => {
          text.setAttribute('fill', '#ffffff');
        });
      }
    }
  }

  private addInteractivity(
    container: HTMLElement,
    diagram: DiagramModel
  ): void {
    const svg = container.querySelector('svg');
    if (!svg) return;

    // Add hover effects
    const nodeElements = svg.querySelectorAll('g[id*="node"]');
    nodeElements.forEach((nodeElement) => {
      nodeElement.addEventListener('mouseenter', (e) => {
        (e.currentTarget as SVGElement).style.opacity = '0.8';
        (e.currentTarget as SVGElement).style.cursor = 'pointer';
      });

      nodeElement.addEventListener('mouseleave', (e) => {
        (e.currentTarget as SVGElement).style.opacity = '1';
      });

      // Add click handler if metadata contains URLs
      nodeElement.addEventListener('click', (e) => {
        // Extract node ID and find corresponding data
        const nodeId = this.extractNodeIdFromElement(
          e.currentTarget as SVGElement
        );
        const node = diagram.nodes.find((n) => n.id === nodeId);

        if (node?.metadata?.url) {
          window.open(node.metadata.url, '_blank');
        } else {
          // Dispatch custom event for applications to handle
          container.dispatchEvent(
            new CustomEvent('nodeClick', {
              detail: { node, element: e.currentTarget },
            })
          );
        }
      });
    });
  }

  private extractNodeIdFromElement(element: SVGElement): string | undefined {
    // Try to extract node ID from various possible attributes
    return element.id || element.getAttribute('data-node-id') || undefined;
  }

  async export(
    diagram: DiagramModel,
    format: 'svg' | 'png' | 'pdf',
    options: ExportOptions = {}
  ): Promise<Blob> {
    // Create a temporary container for rendering
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = '1000px';
    tempContainer.style.height = '800px';
    document.body.appendChild(tempContainer);

    try {
      // Render diagram in temporary container
      await this.render(diagram, tempContainer, {
        ...options,
        interactive: false, // Disable interactivity for export
      });

      const svg = tempContainer.querySelector('svg');
      if (!svg) {
        throw new Error('Failed to generate SVG for export');
      }

      // Handle different export formats
      switch (format) {
        case 'svg':
          return this.exportSVG(svg, options);
        case 'png':
          return this.exportPNG(svg, options);
        case 'pdf':
          return this.exportPDF(svg, options);
        default:
          throw new Error(`Unsupported export format: ${format}`);
      }
    } finally {
      // Clean up temporary container
      document.body.removeChild(tempContainer);
    }
  }

  private exportSVG(svg: SVGElement, options: ExportOptions): Blob {
    // Clone SVG and prepare for export
    const svgClone = svg.cloneNode(true) as SVGElement;

    // Set proper dimensions
    if (options.width) svgClone.setAttribute('width', options.width.toString());
    if (options.height)
      svgClone.setAttribute('height', options.height.toString());

    // Serialize SVG
    const svgString = new XMLSerializer().serializeToString(svgClone);
    const svgBlob = new Blob([svgString], {
      type: 'image/svg+xml;charset=utf-8',
    });

    return svgBlob;
  }

  private async exportPNG(
    svg: SVGElement,
    options: ExportOptions
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Set canvas dimensions
      const width = options.width || 1000;
      const height = options.height || 800;
      canvas.width = width;
      canvas.height = height;

      // Create image from SVG
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], {
        type: 'image/svg+xml;charset=utf-8',
      });
      const url = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = () => {
        // Fill background (white by default)
        ctx.fillStyle = options.backgroundColor || 'white';
        ctx.fillRect(0, 0, width, height);

        // Draw SVG
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob
        canvas.toBlob((blob) => {
          URL.revokeObjectURL(url);
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create PNG blob'));
          }
        }, 'image/png');
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load SVG image'));
      };

      img.src = url;
    });
  }

  private async exportPDF(
    svg: SVGElement,
    options: ExportOptions
  ): Promise<Blob> {
    // For PDF export, we'll convert to PNG first and then embed in a PDF
    // This is a simplified approach - a full implementation might use jsPDF
    const pngBlob = await this.exportPNG(svg, options);

    // For now, return the PNG with PDF MIME type
    // TODO: Implement proper PDF generation with jsPDF
    return new Blob([pngBlob], { type: 'application/pdf' });
  }

  supportsInteractivity(): boolean {
    return true;
  }

  getThemes(): string[] {
    return ['default', 'dark', 'light'];
  }
}
