import { AzureNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface SQLOptions extends NodeMetadata {
  tier?: 'basic' | 'standard' | 'premium';
  size?: string;
  backup?: boolean;
  encryption?: boolean;
}

export class SQLDatabase extends AzureNode {
  constructor(label: string, options?: SQLOptions) {
    super('sql-database', 'database', label, options);
  }

  static create(label: string, options?: SQLOptions): SQLDatabase {
    return new SQLDatabase(label, options);
  }
}

// Factory function for easier usage
export const SqlDB = (label: string, options?: SQLOptions): SQLDatabase =>
  new SQLDatabase(label, options);
