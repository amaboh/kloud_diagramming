import { AzureNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface VNetOptions extends NodeMetadata {
  addressSpace?: string;
  subnets?: string[];
  dnsServers?: string[];
}

export class VirtualNetwork extends AzureNode {
  constructor(label: string, options?: VNetOptions) {
    super('virtual-network', 'network', label, options);
  }

  static create(label: string, options?: VNetOptions): VirtualNetwork {
    return new VirtualNetwork(label, options);
  }
}

// Factory function for easier usage
export const VNet = (label: string, options?: VNetOptions): VirtualNetwork =>
  new VirtualNetwork(label, options);
