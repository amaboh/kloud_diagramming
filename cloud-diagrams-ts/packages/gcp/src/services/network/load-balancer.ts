import { GCPNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface LoadBalancerOptions extends NodeMetadata {
  type?: 'global' | 'regional';
  protocol?: 'http' | 'https' | 'tcp' | 'udp';
  backend?: string;
}

export class LoadBalancer extends GCPNode {
  constructor(label: string, options?: LoadBalancerOptions) {
    super('load-balancer', 'network', label, options);
  }

  static create(label: string, options?: LoadBalancerOptions): LoadBalancer {
    return new LoadBalancer(label, options);
  }
}

// Factory function for easier usage
export const GLB = (
  label: string,
  options?: LoadBalancerOptions
): LoadBalancer => new LoadBalancer(label, options);
