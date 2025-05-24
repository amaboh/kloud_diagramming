import { GCPNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface ComputeOptions extends NodeMetadata {
  machineType?: string;
  zone?: string;
  diskSize?: string;
  preemptible?: boolean;
}

export class ComputeEngine extends GCPNode {
  constructor(label: string, options?: ComputeOptions) {
    super('compute-engine', 'compute', label, options);
  }

  static create(label: string, options?: ComputeOptions): ComputeEngine {
    return new ComputeEngine(label, options);
  }
}

// Factory function for easier usage
export const GCE = (label: string, options?: ComputeOptions): ComputeEngine =>
  new ComputeEngine(label, options);
