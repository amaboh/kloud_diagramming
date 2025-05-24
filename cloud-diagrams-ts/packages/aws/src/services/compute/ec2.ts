import { AWSNode } from '@cloud-diagrams/core';
import type { NodeMetadata } from '@cloud-diagrams/core';

export interface EC2Options extends NodeMetadata {
  instanceType?: string;
  ami?: string;
}

export class EC2 extends AWSNode {
  constructor(label: string, options?: EC2Options) {
    super('ec2', 'compute', label, options);
  }
}

// Factory function for easier usage
export const EC2Instance = (label: string, options?: EC2Options): EC2 =>
  new EC2(label, options); 