import React, { useState } from 'react';
import { Group } from '@cloud-diagrams/core';
import { DiagramGroupProps } from '../types';

export const DiagramGroup: React.FC<DiagramGroupProps> = ({
  group,
  onClick,
  className = '',
  style = {},
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    onClick?.(group);
  };

  const toggleCollapse = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  const groupStyle = {
    border: '2px dashed #ccc',
    borderRadius: '8px',
    padding: '12px',
    margin: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    ...style,
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: isCollapsed ? '0' : '12px',
    fontWeight: 'bold' as const,
    fontSize: '16px',
  };

  const toggleButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    hover: {
      backgroundColor: '#f0f0f0',
    },
  };

  const contentStyle = {
    display: isCollapsed ? 'none' : 'block',
    animation: isCollapsed ? 'none' : 'fadeIn 0.2s ease',
  };

  const metadataStyle = {
    fontSize: '12px',
    color: '#666',
    marginTop: '8px',
  };

  // Get nodes and subgroups using the correct methods
  const nodes = group.getNodes ? group.getNodes() : [];
  const subgroups = group.getSubGroups ? group.getSubGroups() : [];

  return (
    <div
      className={`diagram-group diagram-group-${group.id} ${className}`}
      style={groupStyle}
      onClick={handleClick}
      data-group-id={group.id}
    >
      <div style={headerStyle}>
        <span>{group.name}</span>
        <button
          style={toggleButtonStyle}
          onClick={toggleCollapse}
          title={isCollapsed ? 'Expand group' : 'Collapse group'}
        >
          {isCollapsed ? '▶' : '▼'}
        </button>
      </div>

      <div style={contentStyle}>
        {nodes.length > 0 && (
          <div style={metadataStyle}>Nodes: {nodes.length}</div>
        )}

        {subgroups.length > 0 && (
          <div style={metadataStyle}>Subgroups: {subgroups.length}</div>
        )}

        {group.metadata && Object.keys(group.metadata).length > 0 && (
          <div style={metadataStyle}>
            <details>
              <summary style={{ cursor: 'pointer' }}>Metadata</summary>
              <pre style={{ fontSize: '11px', marginTop: '4px' }}>
                {JSON.stringify(group.metadata, null, 2)}
              </pre>
            </details>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};
