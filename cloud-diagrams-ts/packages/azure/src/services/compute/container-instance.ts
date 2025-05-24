import { AzureNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface ContainerOptions extends NodeMetadata {
  image?: string;
  cpu?: number;
  memory?: string;
  ports?: number[];
}

export class ContainerInstance extends AzureNode {
  constructor(label: string, options?: ContainerOptions) {
    super('container-instance', 'compute', label, options);
  }

  static create(label: string, options?: ContainerOptions): ContainerInstance {
    return new ContainerInstance(label, options);
  }
}

// Factory function for easier usage
export const ACI = (
  label: string,
  options?: ContainerOptions
): ContainerInstance => new ContainerInstance(label, options);
