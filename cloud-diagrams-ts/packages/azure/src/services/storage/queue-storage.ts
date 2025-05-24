import { AzureNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface QueueOptions extends NodeMetadata {
  messageRetention?: number;
  encryption?: boolean;
  deadLetter?: boolean;
}

export class QueueStorage extends AzureNode {
  constructor(label: string, options?: QueueOptions) {
    super('queue-storage', 'storage', label, options);
  }

  static create(label: string, options?: QueueOptions): QueueStorage {
    return new QueueStorage(label, options);
  }
}

// Factory function for easier usage
export const Queue = (label: string, options?: QueueOptions): QueueStorage =>
  new QueueStorage(label, options);
