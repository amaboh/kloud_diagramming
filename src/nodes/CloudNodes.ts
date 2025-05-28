import { Node } from "../core/Node";
import { NodeOptions, CloudProvider } from "../types";

/**
 * Base AWS Node class - extends Node with AWS-specific defaults
 */
export class AWSNode extends Node {
  constructor(
    id: string,
    label: string,
    service: string,
    options: NodeOptions = {}
  ) {
    super(id, label, "aws", service, {
      category: options.category || "AWS",
      ...options,
    });
  }
}

/**
 * Base Azure Node class - extends Node with Azure-specific defaults
 */
export class AzureNode extends Node {
  constructor(
    id: string,
    label: string,
    service: string,
    options: NodeOptions = {}
  ) {
    super(id, label, "azure", service, {
      category: options.category || "Azure",
      ...options,
    });
  }
}

/**
 * Base GCP Node class - extends Node with GCP-specific defaults
 */
export class GCPNode extends Node {
  constructor(
    id: string,
    label: string,
    service: string,
    options: NodeOptions = {}
  ) {
    super(id, label, "gcp", service, {
      category: options.category || "GCP",
      ...options,
    });
  }
}
