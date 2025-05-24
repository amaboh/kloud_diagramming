import { AWSNode } from '@cloud-diagrams/core';
import type { NodeMetadata } from '@cloud-diagrams/core';

export interface S3Options extends NodeMetadata {
  storageClass?: 'STANDARD' | 'STANDARD_IA' | 'GLACIER' | 'DEEP_ARCHIVE';
  versioning?: boolean;
  encryption?: boolean;
}

export class S3 extends AWSNode {
  constructor(label: string, options?: S3Options) {
    super('s3', 'storage', label, options);
  }
}

// Factory function for easier usage
export const S3Bucket = (label: string, options?: S3Options): S3 =>
  new S3(label, options); 