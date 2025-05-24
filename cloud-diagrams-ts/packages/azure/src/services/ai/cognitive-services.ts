import { AzureNode, type NodeMetadata } from '@cloud-diagrams/core';

export interface CognitiveOptions extends NodeMetadata {
  service?: 'vision' | 'speech' | 'language' | 'decision';
  tier?: 'free' | 'standard' | 'premium';
  region?: string;
}

export class CognitiveServices extends AzureNode {
  constructor(label: string, options?: CognitiveOptions) {
    super('cognitive-services', 'ai', label, options);
  }

  static create(label: string, options?: CognitiveOptions): CognitiveServices {
    return new CognitiveServices(label, options);
  }
}

// Factory function for easier usage
export const Cognitive = (
  label: string,
  options?: CognitiveOptions
): CognitiveServices => new CognitiveServices(label, options);
