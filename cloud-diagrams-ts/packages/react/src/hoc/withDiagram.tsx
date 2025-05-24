import React from 'react';
import { Diagram, ThemeDefinition } from '@cloud-diagrams/core';
import { DiagramProvider } from '../components/DiagramProvider';
import { useDiagramContext } from '../contexts/DiagramContext';

export interface WithDiagramProps {
  diagram?: Diagram;
  theme?: string | ThemeDefinition;
}

// Higher-Order Component that provides diagram context
export function withDiagram<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const WithDiagramComponent = React.forwardRef<any, P & WithDiagramProps>(
    (props, ref) => {
      const { diagram, theme, ...restProps } = props;

      return (
        <DiagramProvider diagram={diagram} theme={theme}>
          <WrappedComponent {...(restProps as P)} ref={ref} />
        </DiagramProvider>
      );
    }
  );

  WithDiagramComponent.displayName = `withDiagram(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WithDiagramComponent;
}

// Hook for components wrapped with withDiagram to access diagram context
export const useDiagramFromHOC = () => {
  return useDiagramContext();
};
