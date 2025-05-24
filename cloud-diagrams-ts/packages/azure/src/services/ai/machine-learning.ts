import { AzureNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface MLOptions extends NodeMetadata {
  computeType?: 'cpu' | 'gpu';
  tier?: 'basic' | 'standard' | 'premium';
  autoScale?: boolean;
}

export class MachineLearning extends AzureNode {
  constructor(label: string, options?: MLOptions) {
    super('machine-learning', 'ai', label, options);
  }

  static create(label: string, options?: MLOptions): MachineLearning {
    return new MachineLearning(label, options);
  }
}

// Factory function for easier usage
export const ML = (label: string, options?: MLOptions): MachineLearning =>
  new MachineLearning(label, options);
