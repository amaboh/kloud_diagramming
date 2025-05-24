import { v4 as uuidv4 } from 'uuid';
import type { NodeMetadata } from '../types';

export interface NodePosition {
  x?: number;
  y?: number;
  fixed?: boolean;
}

export abstract class Node {
  abstract readonly provider: string;
  abstract readonly service: string;
  abstract readonly category: string;

  public groupId?: string; // Track which group this node belongs to
  public position?: NodePosition; // Manual positioning support

  constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly metadata?: NodeMetadata,
    position?: NodePosition
  ) {
    this.position = position;
  }

  getIconKey(): string {
    return `${this.provider}:${this.service}`;
  }

  setGroup(groupId: string | undefined): void {
    this.groupId = groupId;
  }

  setPosition(position: NodePosition): void {
    this.position = { ...this.position, ...position };
  }

  isPositioned(): boolean {
    return !!(this.position?.x !== undefined && this.position?.y !== undefined);
  }
}

export class AWSNode extends Node {
  readonly provider = 'aws';
  readonly service: string;
  readonly category: string;

  constructor(
    service: string,
    category: string,
    label: string,
    metadata?: NodeMetadata,
    id: string = uuidv4(),
    position?: NodePosition
  ) {
    super(id, label, metadata, position);
    this.service = service;
    this.category = category;
  }
}

export class AzureNode extends Node {
  readonly provider = 'azure';
  readonly service: string;
  readonly category: string;

  constructor(
    service: string,
    category: string,
    label: string,
    metadata?: NodeMetadata,
    id: string = uuidv4(),
    position?: NodePosition
  ) {
    super(id, label, metadata, position);
    this.service = service;
    this.category = category;
  }
}

export class GCPNode extends Node {
  readonly provider = 'gcp';
  readonly service: string;
  readonly category: string;

  constructor(
    service: string,
    category: string,
    label: string,
    metadata?: NodeMetadata,
    id: string = uuidv4(),
    position?: NodePosition
  ) {
    super(id, label, metadata, position);
    this.service = service;
    this.category = category;
  }
}
