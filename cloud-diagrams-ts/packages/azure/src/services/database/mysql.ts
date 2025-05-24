import { AzureNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface MySQLOptions extends NodeMetadata {
  version?: '5.7' | '8.0';
  tier?: 'basic' | 'general-purpose' | 'memory-optimized';
  storage?: string;
  backup?: boolean;
}

export class MySQLDatabase extends AzureNode {
  constructor(label: string, options?: MySQLOptions) {
    super('mysql-database', 'database', label, options);
  }

  static create(label: string, options?: MySQLOptions): MySQLDatabase {
    return new MySQLDatabase(label, options);
  }
}

// Factory function for easier usage
export const MySQL = (label: string, options?: MySQLOptions): MySQLDatabase =>
  new MySQLDatabase(label, options);
