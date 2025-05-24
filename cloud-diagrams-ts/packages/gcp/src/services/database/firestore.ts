import { GCPNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface FirestoreOptions extends NodeMetadata {
  mode?: 'native' | 'datastore';
  region?: string;
  multiRegion?: boolean;
}

export class Firestore extends GCPNode {
  constructor(label: string, options?: FirestoreOptions) {
    super('firestore', 'database', label, options);
  }

  static create(label: string, options?: FirestoreOptions): Firestore {
    return new Firestore(label, options);
  }
}
