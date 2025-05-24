import { GCPNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface GKEOptions extends NodeMetadata {
  nodeCount?: number;
  machineType?: string;
  kubernetesVersion?: string;
  autopilot?: boolean;
}

export class KubernetesEngine extends GCPNode {
  constructor(label: string, options?: GKEOptions) {
    super('kubernetes-engine', 'compute', label, options);
  }

  static create(label: string, options?: GKEOptions): KubernetesEngine {
    return new KubernetesEngine(label, options);
  }
}

// Factory function for easier usage
export const GKE = (label: string, options?: GKEOptions): KubernetesEngine =>
  new KubernetesEngine(label, options);
