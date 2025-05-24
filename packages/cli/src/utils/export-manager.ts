import * as fs from "fs-extra";
import * as path from "path";
import { Diagram, MermaidRenderer } from "@cloud-diagrams/core";
import puppeteer from "puppeteer";

interface ExportOptions {
  format: "svg" | "png" | "pdf" | "json";
  outputPath: string;
  width?: number;
  height?: number;
  quality?: number;
  interactive?: boolean;
  icons?: boolean;
}

export class ExportManager {
  private renderer: MermaidRenderer;

  constructor() {
    this.renderer = new MermaidRenderer();
  }

  /**
   * Export diagram to specified format
   */
  async export(diagram: Diagram, options: ExportOptions): Promise<void> {
    switch (options.format) {
      case "svg":
        await this.exportSVG(diagram, options);
        break;
      case "png":
        await this.exportPNG(diagram, options);
        break;
      case "pdf":
        await this.exportPDF(diagram, options);
        break;
      case "json":
        await this.exportJSON(diagram, options);
        break;
      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }
  }

  /**
   * Export diagram as SVG
   */
  private async exportSVG(
    diagram: Diagram,
    options: ExportOptions
  ): Promise<void> {
    // Create a temporary container
    const container = this.createTempContainer();

    try {
      // Render diagram to SVG
      await this.renderer.render(diagram, container, {
        theme: diagram.config.theme || "light",
        interactive: options.interactive || false,
      });

      // Extract SVG content
      const svgElement = container.querySelector("svg");
      if (!svgElement) {
        throw new Error("Failed to generate SVG content");
      }

      // Get SVG markup
      let svgContent = svgElement.outerHTML;

      // Add XML declaration and DOCTYPE if not present
      if (!svgContent.startsWith("<?xml")) {
        svgContent = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgContent;
      }

      // Ensure output directory exists
      await fs.ensureDir(path.dirname(options.outputPath));

      // Write SVG file
      await fs.writeFile(options.outputPath, svgContent, "utf-8");
    } finally {
      // Clean up temporary container
      this.cleanupTempContainer(container);
    }
  }

  /**
   * Export diagram as PNG using Puppeteer
   */
  private async exportPNG(
    diagram: Diagram,
    options: ExportOptions
  ): Promise<void> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
      const page = await browser.newPage();

      // Set viewport size
      await page.setViewport({
        width: options.width || 1200,
        height: options.height || 800,
        deviceScaleFactor: 2, // For high DPI
      });

      // Create HTML content with the diagram
      const htmlContent = await this.createHTMLContent(diagram, options);
      await page.setContent(htmlContent, { waitUntil: "networkidle0" });

      // Wait for diagram to render
      await page.waitForSelector("svg", { timeout: 10000 });

      // Take screenshot
      const screenshotBuffer = await page.screenshot({
        type: "png",
        fullPage: true,
        omitBackground: false,
      });

      // Ensure output directory exists
      await fs.ensureDir(path.dirname(options.outputPath));

      // Write PNG file
      await fs.writeFile(options.outputPath, screenshotBuffer);
    } finally {
      await browser.close();
    }
  }

  /**
   * Export diagram as PDF using Puppeteer
   */
  private async exportPDF(
    diagram: Diagram,
    options: ExportOptions
  ): Promise<void> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
      const page = await browser.newPage();

      // Create HTML content with the diagram
      const htmlContent = await this.createHTMLContent(diagram, options);
      await page.setContent(htmlContent, { waitUntil: "networkidle0" });

      // Wait for diagram to render
      await page.waitForSelector("svg", { timeout: 10000 });

      // Generate PDF
      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "20px",
          right: "20px",
          bottom: "20px",
          left: "20px",
        },
      });

      // Ensure output directory exists
      await fs.ensureDir(path.dirname(options.outputPath));

      // Write PDF file
      await fs.writeFile(options.outputPath, pdfBuffer);
    } finally {
      await browser.close();
    }
  }

  /**
   * Export diagram as JSON specification
   */
  private async exportJSON(
    diagram: Diagram,
    options: ExportOptions
  ): Promise<void> {
    const jsonSpec = {
      name: diagram.name,
      config: diagram.config,
      nodes: diagram.nodes.map((node) => ({
        id: node.id,
        label: node.label,
        provider: node.provider,
        service: node.service,
      })),
      edges: diagram.edges.map((edge) => ({
        from: edge.fromId,
        to: edge.toId,
        label: edge.label,
      })),
      groups: diagram.groups.map((group) => ({
        id: group.id,
        name: group.name,
      })),
      metadata: {
        exportedAt: new Date().toISOString(),
        version: "1.0.0",
      },
    };

    // Ensure output directory exists
    await fs.ensureDir(path.dirname(options.outputPath));

    // Write JSON file
    await fs.writeJson(options.outputPath, jsonSpec, { spaces: 2 });
  }

  /**
   * Create HTML content for browser-based rendering
   */
  private async createHTMLContent(
    diagram: Diagram,
    options: ExportOptions
  ): Promise<string> {
    // Create a temporary container to render the diagram
    const container = this.createTempContainer();

    try {
      // Render diagram
      await this.renderer.render(diagram, container, {
        theme: diagram.config.theme || "light",
        interactive: false, // Disable interactivity for static export
      });

      // Extract SVG content
      const svgElement = container.querySelector("svg");
      if (!svgElement) {
        throw new Error("Failed to generate SVG content");
      }

      const svgContent = svgElement.outerHTML;

      // Create HTML wrapper
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${diagram.name}</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
              background: ${
                diagram.config.theme === "dark" ? "#1a1a1a" : "#ffffff"
              };
              color: ${diagram.config.theme === "dark" ? "#ffffff" : "#000000"};
            }
            .diagram-container {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }
            svg {
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          <div class="diagram-container">
            ${svgContent}
          </div>
        </body>
        </html>
      `;
    } finally {
      this.cleanupTempContainer(container);
    }
  }

  /**
   * Create a temporary DOM container for rendering
   */
  private createTempContainer(): HTMLElement {
    // In Node.js environment, we need to create a mock DOM element
    // This is a simplified implementation - in a real scenario, you might use jsdom
    return {
      innerHTML: "",
      querySelector: () => null,
      appendChild: () => {},
    } as any;
  }

  /**
   * Clean up temporary container
   */
  private cleanupTempContainer(container: HTMLElement): void {
    // Clean up if needed
    if (container && typeof container.remove === "function") {
      container.remove();
    }
  }
}
