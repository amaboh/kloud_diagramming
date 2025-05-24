import { AzureNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface PostgreSQLOptions extends NodeMetadata {
  version?: '11' | '12' | '13' | '14' | '15';
  tier?: 'basic' | 'general-purpose' | 'memory-optimized';
  storage?: string;
  backup?: boolean;
}

export class PostgreSQLDatabase extends AzureNode {
  constructor(label: string, options?: PostgreSQLOptions) {
    super('postgresql-database', 'database', label, options);
  }

  static create(
    label: string,
    options?: PostgreSQLOptions
  ): PostgreSQLDatabase {
    return new PostgreSQLDatabase(label, options);
  }
}

// Factory function for easier usage
export const PostgreSQL = (
  label: string,
  options?: PostgreSQLOptions
): PostgreSQLDatabase => new PostgreSQLDatabase(label, options);
