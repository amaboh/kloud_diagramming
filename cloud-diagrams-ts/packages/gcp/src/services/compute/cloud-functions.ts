import { GCPNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface FunctionOptions extends NodeMetadata {
  runtime?: string;
  trigger?: 'http' | 'pubsub' | 'storage' | 'firestore';
  memory?: string;
  timeout?: number;
}

export class CloudFunctions extends GCPNode {
  constructor(label: string, options?: FunctionOptions) {
    super('cloud-functions', 'compute', label, options);
  }

  static create(label: string, options?: FunctionOptions): CloudFunctions {
    return new CloudFunctions(label, options);
  }
}

// Factory function for easier usage
export const GCF = (label: string, options?: FunctionOptions): CloudFunctions =>
  new CloudFunctions(label, options);
