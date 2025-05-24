import { AzureNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface FunctionOptions extends NodeMetadata {
  runtime?: string;
  tier?: 'consumption' | 'premium' | 'dedicated';
  triggers?: string[];
}

export class FunctionApp extends AzureNode {
  constructor(label: string, options?: FunctionOptions) {
    super('function-app', 'compute', label, options);
  }

  static create(label: string, options?: FunctionOptions): FunctionApp {
    return new FunctionApp(label, options);
  }
}

// Factory function for easier usage
export const Functions = (label: string, options?: FunctionOptions): FunctionApp =>
  new FunctionApp(label, options); 