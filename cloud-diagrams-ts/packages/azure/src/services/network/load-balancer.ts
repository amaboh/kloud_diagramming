import { AzureNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface LoadBalancerOptions extends NodeMetadata {
  type?: 'public' | 'internal';
  sku?: 'basic' | 'standard';
  algorithm?: 'round-robin' | 'least-connections';
}

export class LoadBalancer extends AzureNode {
  constructor(label: string, options?: LoadBalancerOptions) {
    super('load-balancer', 'network', label, options);
  }

  static create(label: string, options?: LoadBalancerOptions): LoadBalancer {
    return new LoadBalancer(label, options);
  }
}

// Factory function for easier usage
export const LB = (
  label: string,
  options?: LoadBalancerOptions
): LoadBalancer => new LoadBalancer(label, options);
