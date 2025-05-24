import { AzureNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface VMOptions extends NodeMetadata {
  size?: string;
  os?: 'windows' | 'linux';
  region?: string;
  diskSize?: string;
}

export class VirtualMachine extends AzureNode {
  constructor(label: string, options?: VMOptions) {
    super('virtual-machine', 'compute', label, options);
  }

  static create(label: string, options?: VMOptions): VirtualMachine {
    return new VirtualMachine(label, options);
  }
}

// Factory function for easier usage
export const VM = (label: string, options?: VMOptions): VirtualMachine =>
  new VirtualMachine(label, options);
