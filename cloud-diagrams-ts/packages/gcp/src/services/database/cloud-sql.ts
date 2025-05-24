import { GCPNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface CloudSQLOptions extends NodeMetadata {
  engine?: 'mysql' | 'postgresql' | 'sqlserver';
  tier?: string;
  region?: string;
  backup?: boolean;
}

export class CloudSQL extends GCPNode {
  constructor(label: string, options?: CloudSQLOptions) {
    super('cloud-sql', 'database', label, options);
  }

  static create(label: string, options?: CloudSQLOptions): CloudSQL {
    return new CloudSQL(label, options);
  }
}
