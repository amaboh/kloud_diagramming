import { Diagram } from '@cloud-diagrams/core';
import * as path from 'path';

export interface ExportOptions {
  format: string;
  width?: number;
  height?: number;
  theme?: string;
  backgroundColor?: string;
  interactive?: boolean;
  quality?: number;
}

export class ExportManager {
  async export(
    diagram: Diagram,
    outputPath: string,
    options: ExportOptions
  ): Promise<void> {
    const format = options.format.toLowerCase();

    switch (format) {
      case 'svg':
        await this.exportSVG(diagram, outputPath, options);
        break;
      case 'png':
        await this.exportPNG(diagram, outputPath, options);
        break;
      case 'pdf':
        await this.exportPDF(diagram, outputPath, options);
        break;
      case 'json':
        await this.exportJSON(diagram, outputPath, options);
        break;
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  private async exportSVG(
    diagram: Diagram,
    outputPath: string,
    options: ExportOptions
  ): Promise<void> {
    const fs = await import('fs/promises');

    // Create a temporary container for rendering
    const { JSDOM } = await this.loadJSDOM();
    const dom = new JSDOM(
      '<!DOCTYPE html><html><body><div id="diagram"></div></body></html>'
    );
    global.document = dom.window.document;
    global.window = dom.window as any;

    try {
      // Render diagram to SVG
      await diagram.render('#diagram', {
        theme: options.theme || 'default',
        interactive: options.interactive || false,
        width: options.width,
        height: options.height,
      });

      // Get the SVG content
      const diagramElement = dom.window.document.getElementById('diagram');
      const svgElement = diagramElement?.querySelector('svg');

      if (!svgElement) {
        throw new Error('Failed to generate SVG content');
      }

      // Set SVG dimensions if specified
      if (options.width) {
        svgElement.setAttribute('width', options.width.toString());
      }
      if (options.height) {
        svgElement.setAttribute('height', options.height.toString());
      }

      // Write SVG to file
      await fs.writeFile(outputPath, svgElement.outerHTML, 'utf8');
    } finally {
      // Cleanup global objects
      delete (global as any).document;
      delete (global as any).window;
    }
  }

  private async exportPNG(
    diagram: Diagram,
    outputPath: string,
    options: ExportOptions
  ): Promise<void> {
    const puppeteer = await import('puppeteer');

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      // Set viewport size
      await page.setViewport({
        width: options.width || 1200,
        height: options.height || 800,
        deviceScaleFactor: 2, // For retina quality
      });

      // Create HTML content with the diagram
      const html = await this.createHTMLForDiagram(diagram, options);
      await page.setContent(html);

      // Wait for diagram to render
      await page.waitForSelector('#diagram svg', { timeout: 10000 });

      // Take screenshot
      await page.screenshot({
        path: outputPath,
        type: 'png',
        fullPage: false,
        clip: {
          x: 0,
          y: 0,
          width: options.width || 1200,
          height: options.height || 800,
        },
      });
    } finally {
      await browser.close();
    }
  }

  private async exportPDF(
    diagram: Diagram,
    outputPath: string,
    options: ExportOptions
  ): Promise<void> {
    const puppeteer = await import('puppeteer');

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      // Create HTML content with the diagram
      const html = await this.createHTMLForDiagram(diagram, options);
      await page.setContent(html);

      // Wait for diagram to render
      await page.waitForSelector('#diagram svg', { timeout: 10000 });

      // Generate PDF
      await page.pdf({
        path: outputPath,
        width: options.width || 1200,
        height: options.height || 800,
        printBackground: true,
        margin: {
          top: '20px',
          bottom: '20px',
          left: '20px',
          right: '20px',
        },
      });
    } finally {
      await browser.close();
    }
  }

  private async exportJSON(
    diagram: Diagram,
    outputPath: string,
    options: ExportOptions
  ): Promise<void> {
    const fs = await import('fs/promises');

    // Convert diagram to JSON specification
    const spec = this.diagramToJSON(diagram);

    await fs.writeFile(outputPath, JSON.stringify(spec, null, 2), 'utf8');
  }

  private async createHTMLForDiagram(
    diagram: Diagram,
    options: ExportOptions
  ): Promise<string> {
    // This is a simplified version - in practice, you'd need to include all necessary scripts and styles
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      margin: 0;
      padding: 20px;
      background: ${options.backgroundColor || 'white'};
      font-family: Arial, sans-serif;
    }
    #diagram {
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <div id="diagram"></div>
  <script type="module">
    // In a real implementation, this would include the full diagram rendering code
    // For now, this is a placeholder that would need to be implemented
    console.log('Diagram rendering placeholder');
  </script>
</body>
</html>`;
  }

  private diagramToJSON(diagram: Diagram): any {
    // Convert diagram back to JSON specification
    // This is a simplified implementation
    return {
      name: diagram.getName?.() || 'Untitled Diagram',
      nodes:
        diagram.getNodes?.()?.map((node: any) => ({
          id: node.id,
          label: node.label,
          provider: node.provider,
          service: node.constructor.name,
          options: node.metadata || {},
        })) || [],
      connections:
        diagram.getConnections?.()?.map((conn: any) => ({
          from: conn.from,
          to: conn.to,
          options: conn.options || {},
        })) || [],
      groups:
        diagram.getGroups?.()?.map((group: any) => ({
          id: group.id,
          label: group.label,
          type: group.type,
          nodes: group.getNodes?.()?.map((node: any) => node.id) || [],
        })) || [],
    };
  }

  private async loadJSDOM(): Promise<any> {
    try {
      return await import('jsdom');
    } catch (error) {
      throw new Error(
        'JSDOM is required for SVG export. Install it with: npm install jsdom'
      );
    }
  }
}
