import React, { createContext, useContext, ReactNode } from 'react';
import { Diagram, Node, Group, Edge } from '@cloud-diagrams/core';

export interface DiagramContextValue {
  diagram: Diagram | null;
  setDiagram: (diagram: Diagram) => void;
  addNode: (node: Node) => void;
  removeNode: (nodeId: string) => void;
  addGroup: (group: Group) => void;
  removeGroup: (groupId: string) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (edgeId: string) => void;
  render: () => Promise<string>;
  isRendering: boolean;
}

const DiagramContext = createContext<DiagramContextValue | undefined>(
  undefined
);

export const useDiagramContext = () => {
  const context = useContext(DiagramContext);
  if (context === undefined) {
    throw new Error('useDiagramContext must be used within a DiagramProvider');
  }
  return context;
};

export { DiagramContext };
