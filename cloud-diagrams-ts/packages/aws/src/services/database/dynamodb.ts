import { AWSNode } from '@cloud-diagrams/core';
import type { NodeMetadata } from '@cloud-diagrams/core';

export interface DynamoDBOptions extends NodeMetadata {
  billingMode?: 'PAY_PER_REQUEST' | 'PROVISIONED';
  readCapacity?: number;
  writeCapacity?: number;
}

export class DynamoDB extends AWSNode {
  constructor(label: string, options?: DynamoDBOptions) {
    super('dynamodb', 'database', label, options);
  }
}

// Factory function for easier usage
export const DynamoDBTable = (label: string, options?: DynamoDBOptions): DynamoDB =>
  new DynamoDB(label, options); 