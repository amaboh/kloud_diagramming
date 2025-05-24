import { AzureNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface AppGatewayOptions extends NodeMetadata {
  tier?: 'standard' | 'waf';
  capacity?: number;
  ssl?: boolean;
  waf?: boolean;
}

export class ApplicationGateway extends AzureNode {
  constructor(label: string, options?: AppGatewayOptions) {
    super('application-gateway', 'network', label, options);
  }

  static create(
    label: string,
    options?: AppGatewayOptions
  ): ApplicationGateway {
    return new ApplicationGateway(label, options);
  }
}

// Factory function for easier usage
export const AppGW = (
  label: string,
  options?: AppGatewayOptions
): ApplicationGateway => new ApplicationGateway(label, options);
