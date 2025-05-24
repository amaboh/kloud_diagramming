import { AzureNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface BlobOptions extends NodeMetadata {
  tier?: 'hot' | 'cool' | 'archive';
  redundancy?: 'LRS' | 'ZRS' | 'GRS' | 'GZRS';
  encryption?: boolean;
}

export class BlobStorage extends AzureNode {
  constructor(label: string, options?: BlobOptions) {
    super('blob-storage', 'storage', label, options);
  }

  static create(label: string, options?: BlobOptions): BlobStorage {
    return new BlobStorage(label, options);
  }
}

// Factory function for easier usage
export const Blob = (label: string, options?: BlobOptions): BlobStorage =>
  new BlobStorage(label, options);
