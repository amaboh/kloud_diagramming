import { GCPNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface VPCOptions extends NodeMetadata {
  mode?: 'auto' | 'custom';
  region?: string;
  subnets?: string[];
}

export class VPC extends GCPNode {
  constructor(label: string, options?: VPCOptions) {
    super('vpc', 'network', label, options);
  }

  static create(label: string, options?: VPCOptions): VPC {
    return new VPC(label, options);
  }
}
