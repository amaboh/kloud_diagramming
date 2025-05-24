import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Diagram,
  Node,
  Group,
  ThemeDefinition,
  MermaidRenderer,
  ExportFormat,
} from '@cloud-diagrams/core';
import { DiagramRendererProps } from '../types';

export const DiagramRenderer: React.FC<DiagramRendererProps> = ({
  diagram,
  theme = 'default',
  width = '100%',
  height = '400px',
  className = '',
  style = {},
  onNodeClick,
  onGroupClick,
  onRenderComplete,
  onRenderError,
  renderOptions = {},
  autoResize = true,
  interactive = true,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [renderError, setRenderError] = useState<Error | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');

  const handleRender = useCallback(async () => {
    if (!diagram || !containerRef.current) return;

    setIsRendering(true);
    setRenderError(null);

    try {
      const renderer = new MermaidRenderer();

      await renderer.render(diagram.getModel(), containerRef.current, {
        theme: typeof theme === 'string' ? theme : undefined,
        interactive,
        width: typeof width === 'number' ? width : undefined,
        height: typeof height === 'number' ? height : undefined,
        ...renderOptions,
      });

      const svgElement = containerRef.current.querySelector('svg');
      if (svgElement) {
        setSvgContent(svgElement.outerHTML);

        // Add event listeners for interactive features
        if (interactive) {
          addInteractiveEventListeners();
        }
      }

      onRenderComplete?.(containerRef.current.innerHTML);
    } catch (error) {
      const renderingError =
        error instanceof Error ? error : new Error('Rendering failed');
      setRenderError(renderingError);
      onRenderError?.(renderingError);
    } finally {
      setIsRendering(false);
    }
  }, [
    diagram,
    theme,
    width,
    height,
    renderOptions,
    interactive,
    onRenderComplete,
    onRenderError,
  ]);

  const addInteractiveEventListeners = useCallback(() => {
    if (!containerRef.current || !interactive) return;

    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    // Get nodes and groups from diagram model
    const model = diagram.getModel();

    // Add click handlers for nodes
    model.nodes.forEach((node: Node) => {
      const nodeElement = svgElement.querySelector(
        `[data-node-id="${node.id}"]`
      );
      if (nodeElement && onNodeClick) {
        nodeElement.addEventListener('click', (event) => {
          event.preventDefault();
          onNodeClick(node.id, node);
        });
        (nodeElement as HTMLElement).style.cursor = 'pointer';
      }
    });

    // Add click handlers for groups
    model.groups.forEach((group: Group) => {
      const groupElement = svgElement.querySelector(
        `[data-group-id="${group.id}"]`
      );
      if (groupElement && onGroupClick) {
        groupElement.addEventListener('click', (event) => {
          event.preventDefault();
          onGroupClick(group.id, group);
        });
        (groupElement as HTMLElement).style.cursor = 'pointer';
      }
    });
  }, [diagram, interactive, onNodeClick, onGroupClick]);

  // Re-render when diagram or theme changes
  useEffect(() => {
    handleRender();
  }, [handleRender]);

  // Handle auto-resize
  useEffect(() => {
    if (!autoResize || !containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      handleRender();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [autoResize, handleRender]);

  const containerStyle = {
    width,
    height,
    position: 'relative' as const,
    overflow: 'auto',
    ...style,
  };

  const loadingStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    fontSize: '14px',
    color: '#666',
  };

  const errorStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    fontSize: '14px',
    color: '#e74c3c',
    flexDirection: 'column' as const,
    gap: '8px',
  };

  return (
    <div
      ref={containerRef}
      className={`cloud-diagram-renderer ${className}`}
      style={containerStyle}
    >
      {isRendering && (
        <div style={loadingStyle}>
          <div>Rendering diagram...</div>
        </div>
      )}

      {renderError && (
        <div style={errorStyle}>
          <div>Failed to render diagram</div>
          <div style={{ fontSize: '12px' }}>{renderError.message}</div>
        </div>
      )}

      {children}
    </div>
  );
};

// Export utility function for programmatic rendering
export const renderDiagram = async (
  diagram: Diagram,
  options: {
    theme?: string | ThemeDefinition;
    format?: ExportFormat;
    width?: number;
    height?: number;
  } = {}
): Promise<string> => {
  const tempContainer = document.createElement('div');
  const renderer = new MermaidRenderer();

  await renderer.render(diagram.getModel(), tempContainer, {
    theme: typeof options.theme === 'string' ? options.theme : undefined,
    width: options.width,
    height: options.height,
  });

  return tempContainer.innerHTML;
};
