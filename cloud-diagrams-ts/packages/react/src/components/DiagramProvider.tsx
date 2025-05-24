import React, { useState, useCallback, ReactNode } from 'react';
import {
  Diagram,
  Node,
  Group,
  Edge,
  ThemeDefinition,
  MermaidRenderer,
} from '@cloud-diagrams/core';
import {
  DiagramContext,
  DiagramContextValue,
} from '../contexts/DiagramContext';
import { ThemeContext, ThemeContextValue } from '../contexts/ThemeContext';

export interface DiagramProviderProps {
  diagram?: Diagram;
  theme?: string | ThemeDefinition;
  children: ReactNode;
}

export const DiagramProvider: React.FC<DiagramProviderProps> = ({
  diagram: initialDiagram,
  theme: initialTheme = 'default',
  children,
}) => {
  const [diagram, setDiagram] = useState<Diagram | null>(
    initialDiagram || null
  );
  const [theme, setTheme] = useState<string | ThemeDefinition>(initialTheme);
  const [isRendering, setIsRendering] = useState(false);

  const addNode = useCallback(
    (node: Node) => {
      if (diagram) {
        diagram.addNode(node);
        // Force re-render by creating new diagram reference
        setDiagram(new Diagram(diagram.title));
      }
    },
    [diagram]
  );

  const removeNode = useCallback(
    (nodeId: string) => {
      if (diagram) {
        // Note: The core Diagram class doesn't have removeNode method
        // This would need to be implemented in the core package
        console.warn('removeNode not implemented in core Diagram class');
      }
    },
    [diagram]
  );

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

  const removeGroup = useCallback(
    (groupId: string) => {
      if (diagram) {
        // Note: The core Diagram class doesn't have removeGroup method
        // This would need to be implemented in the core package
        console.warn('removeGroup not implemented in core Diagram class');
      }
    },
    [diagram]
  );

  const addEdge = useCallback(
    (edge: Edge) => {
      if (diagram) {
        diagram.connect(edge.fromId, edge.toId, edge.options);
        setDiagram(new Diagram(diagram.title));
      }
    },
    [diagram]
  );

  const removeEdge = useCallback(
    (edgeId: string) => {
      if (diagram) {
        // Note: The core Diagram class doesn't have removeEdge method
        // This would need to be implemented in the core package
        console.warn('removeEdge not implemented in core Diagram class');
      }
    },
    [diagram]
  );

  const render = useCallback(async (): Promise<string> => {
    if (!diagram) {
      throw new Error('No diagram to render');
    }

    setIsRendering(true);
    try {
      // Create a temporary container for rendering
      const tempContainer = document.createElement('div');
      const renderer = new MermaidRenderer();

      await renderer.render(diagram.getModel(), tempContainer, {
        theme: typeof theme === 'string' ? theme : undefined,
      });

      return tempContainer.innerHTML;
    } finally {
      setIsRendering(false);
    }
  }, [diagram, theme]);

  const diagramContextValue: DiagramContextValue = {
    diagram,
    setDiagram,
    addNode,
    removeNode,
    addGroup,
    removeGroup,
    addEdge,
    removeEdge,
    render,
    isRendering,
  };

  const themeContextValue: ThemeContextValue = {
    theme,
    setTheme,
    availableThemes: ['default', 'dark', 'light'],
  };

  return (
    <DiagramContext.Provider value={diagramContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        {children}
      </ThemeContext.Provider>
    </DiagramContext.Provider>
  );
};
