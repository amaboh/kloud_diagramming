import { AWSNode } from '@cloud-diagrams/core';
import type { NodeMetadata } from '@cloud-diagrams/core';

export interface RDSOptions extends NodeMetadata {
  engine?: string;
  instanceClass?: string;
  multiAZ?: boolean;
}

export class RDS extends AWSNode {
  constructor(label: string, options?: RDSOptions) {
    super('rds', 'database', label, options);
  }
}

// Factory function for easier usage
export const RDSDatabase = (label: string, options?: RDSOptions): RDS =>
  new RDS(label, options); 