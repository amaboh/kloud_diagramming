import { AWSNode } from '@cloud-diagrams/core';
import type { NodeMetadata } from '@cloud-diagrams/core';

export interface LambdaOptions extends NodeMetadata {
  runtime?: string;
  memorySize?: number;
  timeout?: number;
}

export class Lambda extends AWSNode {
  constructor(label: string, options?: LambdaOptions) {
    super('lambda', 'compute', label, options);
  }
}

// Factory function for easier usage
export const LambdaFunction = (label: string, options?: LambdaOptions): Lambda =>
  new Lambda(label, options); 