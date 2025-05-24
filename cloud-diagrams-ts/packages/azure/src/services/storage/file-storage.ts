import { AzureNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface FileOptions extends NodeMetadata {
  tier?: 'standard' | 'premium';
  protocol?: 'SMB' | 'NFS';
  size?: string;
}

export class FileStorage extends AzureNode {
  constructor(label: string, options?: FileOptions) {
    super('file-storage', 'storage', label, options);
  }

  static create(label: string, options?: FileOptions): FileStorage {
    return new FileStorage(label, options);
  }
}

// Factory function for easier usage
export const Files = (label: string, options?: FileOptions): FileStorage =>
  new FileStorage(label, options);
