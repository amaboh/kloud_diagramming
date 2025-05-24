import { useState, useCallback } from 'react';
import { Diagram, MermaidRenderer, ExportFormat } from '@cloud-diagrams/core';
import { ExportOptions } from '../types';

export interface UseExportReturn {
  exportDiagram: (
    diagram: Diagram,
    format: ExportFormat,
    options?: ExportOptions
  ) => Promise<string | Blob>;
  downloadDiagram: (
    diagram: Diagram,
    format: ExportFormat,
    options?: ExportOptions
  ) => Promise<void>;
  isExporting: boolean;
  exportError: Error | null;
}

export const useExport = (): UseExportReturn => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<Error | null>(null);

  const exportDiagram = useCallback(
    async (
      diagram: Diagram,
      format: ExportFormat,
      options: ExportOptions = {}
    ): Promise<string | Blob> => {
      setIsExporting(true);
      setExportError(null);

      try {
        const renderer = new MermaidRenderer();

        switch (format) {
          case 'svg': {
            const tempContainer = document.createElement('div');
            await renderer.render(diagram.getModel(), tempContainer, {
              width: options.width,
              height: options.height,
            });
            return tempContainer.innerHTML;
          }

          case 'png': {
            // For PNG export, we need to convert SVG to PNG
            // This would typically be done using html2canvas or similar
            const tempContainer = document.createElement('div');
            await renderer.render(diagram.getModel(), tempContainer, {
              width: options.width || 1200,
              height: options.height || 800,
            });

            return await convertSvgToPng(tempContainer.innerHTML, options);
          }

          case 'pdf': {
            // For PDF export, we would use libraries like jsPDF
            const tempContainer = document.createElement('div');
            await renderer.render(diagram.getModel(), tempContainer, {
              width: options.width || 1200,
              height: options.height || 800,
            });

            return await convertSvgToPdf(tempContainer.innerHTML, options);
          }

          default:
            throw new Error(`Unsupported export format: ${format}`);
        }
      } catch (error) {
        const exportingError =
          error instanceof Error ? error : new Error('Export failed');
        setExportError(exportingError);
        throw exportingError;
      } finally {
        setIsExporting(false);
      }
    },
    []
  );

  const downloadDiagram = useCallback(
    async (
      diagram: Diagram,
      format: ExportFormat,
      options: ExportOptions = {}
    ): Promise<void> => {
      const result = await exportDiagram(diagram, format, options);

      const filename = options.filename || `diagram.${format}`;

      if (typeof result === 'string') {
        // For SVG (string result)
        const blob = new Blob([result], { type: 'image/svg+xml' });
        downloadBlob(blob, filename);
      } else {
        // For PNG/PDF (Blob result)
        downloadBlob(result, filename);
      }
    },
    [exportDiagram]
  );

  return {
    exportDiagram,
    downloadDiagram,
    isExporting,
    exportError,
  };
};

// Utility function to download a blob
const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Placeholder function for SVG to PNG conversion
// In a real implementation, you would use html2canvas or similar
const convertSvgToPng = async (
  svg: string,
  options: ExportOptions
): Promise<Blob> => {
  // This is a placeholder implementation
  // In practice, you would:
  // 1. Create a canvas element
  // 2. Draw the SVG to the canvas
  // 3. Convert canvas to blob

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = options.width || img.width;
      canvas.height = options.height || img.height;

      if (options.backgroundColor) {
        ctx!.fillStyle = options.backgroundColor;
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert to PNG'));
          }
        },
        'image/png',
        options.quality || 1.0
      );
    };

    img.onerror = () =>
      reject(new Error('Failed to load SVG for PNG conversion'));

    const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
    img.src = URL.createObjectURL(svgBlob);
  });
};

// Placeholder function for SVG to PDF conversion
// In a real implementation, you would use jsPDF or similar
const convertSvgToPdf = async (
  svg: string,
  options: ExportOptions
): Promise<Blob> => {
  // This is a placeholder implementation
  // In practice, you would use libraries like jsPDF with svg2pdf plugin
  throw new Error(
    'PDF export not yet implemented. Please use a library like jsPDF with svg2pdf plugin.'
  );
};
