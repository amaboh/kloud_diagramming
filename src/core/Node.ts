import { NodeOptions, CloudProvider } from "../types";
import { generateId } from "../utils/helpers";

/**
 * Node class - represents a cloud service or component in the diagram
 */
export class Node {
  public id: string;
  public label: string;
  public provider: CloudProvider;
  public service: string;
  public options: NodeOptions;
  public clusterId?: string;
  public groupId?: string;
  public position?: { x: number; y: number; fixed?: boolean };
  public metadata: Record<string, any>;

  constructor(
    id: string,
    label: string,
    provider: CloudProvider,
    service: string,
    options: NodeOptions = {}
  ) {
    this.id = id || generateId();
    this.label = label;
    this.provider = provider;
    this.service = service;
    this.options = {
      category: "General",
      description: "",
      metadata: {},
      ...options,
    };
    this.metadata = this.options.metadata || {};
  }

  withCluster(clusterId: string): Node {
    this.clusterId = clusterId;
    return this;
  }

  withGroup(groupId: string): Node {
    this.groupId = groupId;
    return this;
  }

  withPosition(x: number, y: number, fixed: boolean = false): Node {
    this.position = { x, y, fixed };
    return this;
  }

  withMetadata(metadata: Record<string, any>): Node {
    this.metadata = { ...this.metadata, ...metadata };
    return this;
  }

  getDisplayName(): string {
    return this.label || this.service || this.id;
  }

  getDescription(): string {
    return (
      this.options.description ||
      this.metadata.description ||
      `${this.provider.toUpperCase()} ${this.service}`
    );
  }

  getCategory(): string {
    return this.options.category || "General";
  }

  getIconKey(): string {
    return `${this.provider}.${this.service}`;
  }

  clone(newId?: string): Node {
    const cloned = new Node(
      newId || generateId(),
      this.label,
      this.provider,
      this.service,
      { ...this.options }
    );

    cloned.clusterId = this.clusterId;
    cloned.groupId = this.groupId;
    cloned.position = this.position ? { ...this.position } : undefined;
    cloned.metadata = { ...this.metadata };

    return cloned;
  }

  toJSON(): any {
    return {
      id: this.id,
      label: this.label,
      provider: this.provider,
      service: this.service,
      options: this.options,
      clusterId: this.clusterId,
      groupId: this.groupId,
      position: this.position,
      metadata: this.metadata,
    };
  }

  static fromJSON(data: any): Node {
    const node = new Node(
      data.id,
      data.label,
      data.provider,
      data.service,
      data.options
    );

    node.clusterId = data.clusterId;
    node.groupId = data.groupId;
    node.position = data.position;
    node.metadata = data.metadata || {};

    return node;
  }
}
