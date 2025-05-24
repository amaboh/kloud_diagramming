import { AzureNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface AKSOptions extends NodeMetadata {
  nodeCount?: number;
  nodeSize?: string;
  kubernetesVersion?: string;
  networkPlugin?: 'azure' | 'kubenet';
}

export class KubernetesService extends AzureNode {
  constructor(label: string, options?: AKSOptions) {
    super('kubernetes-service', 'compute', label, options);
  }

  static create(label: string, options?: AKSOptions): KubernetesService {
    return new KubernetesService(label, options);
  }
}

// Factory function for easier usage
export const AKS = (label: string, options?: AKSOptions): KubernetesService =>
  new KubernetesService(label, options);
