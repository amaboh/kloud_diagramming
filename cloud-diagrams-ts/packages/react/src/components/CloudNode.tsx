import React from 'react';
import { Node } from '@cloud-diagrams/core';
import { CloudNodeProps } from '../types';

export const CloudNode: React.FC<CloudNodeProps> = ({
  node,
  onClick,
  onHover,
  className = '',
  style = {},
  children,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    onClick?.(node);
  };

  const handleMouseEnter = () => {
    onHover?.(node);
  };

  const nodeStyle = {
    display: 'inline-block',
    padding: '8px 12px',
    margin: '4px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    ...style,
  };

  const labelStyle = {
    fontWeight: 'bold' as const,
    fontSize: '14px',
    marginBottom: '4px',
  };

  const metadataStyle = {
    fontSize: '12px',
    color: '#666',
    marginTop: '4px',
  };

  return (
    <div
      className={`cloud-node cloud-node-${node.provider} cloud-node-${node.service} ${className}`}
      style={nodeStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      data-node-id={node.id}
      data-provider={node.provider}
      data-service={node.service}
      data-category={node.category}
    >
      <div style={labelStyle}>{node.label}</div>

      {node.service && (
        <div style={metadataStyle}>
          {node.provider?.toUpperCase()} {node.service}
        </div>
      )}

      {node.category && (
        <div style={metadataStyle}>Category: {node.category}</div>
      )}

      {children}
    </div>
  );
};
