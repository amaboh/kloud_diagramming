import { GCPNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface StorageOptions extends NodeMetadata {
  storageClass?: 'standard' | 'nearline' | 'coldline' | 'archive';
  region?: string;
  versioning?: boolean;
}

export class CloudStorage extends GCPNode {
  constructor(label: string, options?: StorageOptions) {
    super('cloud-storage', 'storage', label, options);
  }

  static create(label: string, options?: StorageOptions): CloudStorage {
    return new CloudStorage(label, options);
  }
}

// Factory function for easier usage
export const GCS = (label: string, options?: StorageOptions): CloudStorage =>
  new CloudStorage(label, options);
