import { useState, useCallback } from 'react';
import {
  Diagram,
  Node,
  Group,
  Edge,
  MermaidRenderer,
  ExportFormat,
} from '@cloud-diagrams/core';
import { DiagramHookReturn, ExportOptions } from '../types';

export const useDiagram = (initialDiagram?: Diagram): DiagramHookReturn => {
  const [diagram, setDiagram] = useState<Diagram | null>(
    initialDiagram || null
  );
  const [isRendering, setIsRendering] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const addNode = useCallback(
    (node: Node) => {
      if (diagram) {
        diagram.addNode(node);
        // Force re-render by creating new reference
        setDiagram(new Diagram(diagram.title));
      }
    },
    [diagram]
  );

  const removeNode = useCallback((nodeId: string) => {
    // Note: The core Diagram class doesn't have removeNode method
    console.warn('removeNode not implemented in core Diagram class');
  }, []);

  const addGroup = useCallback(
    (group: Group) => {
      if (diagram) {
        // The core addGroup method takes a string name, not a Group object
        diagram.addGroup(
          group.name,
          undefined,
          group.metadata,
          group.layoutOptions
        );
        setDiagram(new Diagram(diagram.title));
      }
    },
    [diagram]
  );

  const removeGroup = useCallback((groupId: string) => {
    // Note: The core Diagram class doesn't have removeGroup method
    console.warn('removeGroup not implemented in core Diagram class');
  }, []);

  const addEdge = useCallback(
    (edge: Edge) => {
      if (diagram) {
        diagram.connect(edge.fromId, edge.toId, edge.options);
        setDiagram(new Diagram(diagram.title));
      }
    },
    [diagram]
  );

  const removeEdge = useCallback((edgeId: string) => {
    // Note: The core Diagram class doesn't have removeEdge method
    console.warn('removeEdge not implemented in core Diagram class');
  }, []);

  const render = useCallback(async (): Promise<string> => {
    if (!diagram) {
      throw new Error('No diagram to render');
    }

    setIsRendering(true);
    try {
      const tempContainer = document.createElement('div');
      const renderer = new MermaidRenderer();

      await renderer.render(diagram.getModel(), tempContainer, {});

      return tempContainer.innerHTML;
    } finally {
      setIsRendering(false);
    }
  }, [diagram]);

  const exportDiagram = useCallback(
    async (
      format: ExportFormat,
      options: ExportOptions = {}
    ): Promise<string | Blob> => {
      if (!diagram) {
        throw new Error('No diagram to export');
      }

      setIsExporting(true);
      try {
        const renderer = new MermaidRenderer();

        if (format === 'svg') {
          const tempContainer = document.createElement('div');
          await renderer.render(diagram.getModel(), tempContainer, {
            width: options.width,
            height: options.height,
          });
          return tempContainer.innerHTML;
        }

        // For other formats, we would need additional conversion logic
        // This would typically involve using libraries like html2canvas for PNG
        // or puppeteer for PDF
        throw new Error(`Export format ${format} not yet supported`);
      } finally {
        setIsExporting(false);
      }
    },
    [diagram]
  );

  return {
    diagram,
    addNode,
    removeNode,
    addGroup,
    removeGroup,
    addEdge,
    removeEdge,
    render,
    export: exportDiagram,
    isRendering,
    isExporting,
  };
};
