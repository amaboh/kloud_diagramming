// Export all GCP services
export * from './services';

// Export icon system
export * from './icons/gcp-icons';

// Auto-register GCP icons when package is imported
import { iconRegistry } from '@cloud-diagrams/core';
import { gcpIconPack } from './icons/gcp-icons';

// Register GCP icon pack on module load
iconRegistry.registerIconPack('gcp', gcpIconPack);

console.log(
  '✅ GCP icon pack registered with',
  Object.keys(gcpIconPack.icons || {}).length,
  'icons'
);

// Re-export core types that might be needed
export type { NodeMetadata } from '@cloud-diagrams/core';
