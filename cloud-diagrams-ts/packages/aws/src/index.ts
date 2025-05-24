// Export all AWS services
export * from './services';

// Export icon system
export * from './icons/aws-icons';

// Auto-register AWS icons when package is imported
import { iconRegistry } from '@cloud-diagrams/core';
import { awsIconPack } from './icons/aws-icons';

// Register AWS icon pack on module load
iconRegistry.registerIconPack('aws', awsIconPack);

console.log(
  '✅ AWS icon pack registered with',
  Object.keys(awsIconPack.icons || {}).length,
  'icons'
);

// Re-export core types that might be needed
export type { NodeMetadata } from '@cloud-diagrams/core';
