import { AzureNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface CosmosOptions extends NodeMetadata {
  api?: 'sql' | 'mongodb' | 'cassandra' | 'table' | 'gremlin';
  consistency?: 'strong' | 'bounded' | 'session' | 'eventual';
  multiRegion?: boolean;
}

export class CosmosDB extends AzureNode {
  constructor(label: string, options?: CosmosOptions) {
    super('cosmos-db', 'database', label, options);
  }

  static create(label: string, options?: CosmosOptions): CosmosDB {
    return new CosmosDB(label, options);
  }
}

// Factory function for easier usage
export const Cosmos = (label: string, options?: CosmosOptions): CosmosDB =>
  new CosmosDB(label, options);
