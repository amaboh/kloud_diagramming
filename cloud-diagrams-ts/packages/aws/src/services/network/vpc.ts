import { AWSNode } from '@cloud-diagrams/core';
import type { NodeMetadata } from '@cloud-diagrams/core';

export interface VPCOptions extends NodeMetadata {
  cidr?: string;
  enableDnsHostnames?: boolean;
  enableDnsSupport?: boolean;
}

export class VPC extends AWSNode {
  constructor(label: string, options?: VPCOptions) {
    super('vpc', 'network', label, options);
  }
}

// Factory function for easier usage
export const VirtualPrivateCloud = (label: string, options?: VPCOptions): VPC =>
  new VPC(label, options); 