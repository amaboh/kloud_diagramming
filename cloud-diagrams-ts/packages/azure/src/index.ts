// Export all Azure services
export * from './services';

// Export icon system
export * from './icons/azure-icons';

// Auto-register Azure icons when package is imported
import { iconRegistry } from '@cloud-diagrams/core';
import { azureIconPack } from './icons/azure-icons';

// Register Azure icon pack on module load
iconRegistry.registerIconPack('azure', azureIconPack);

console.log(
  '✅ Azure icon pack registered with',
  Object.keys(azureIconPack.icons || {}).length,
  'icons'
);

// Re-export core types that might be needed
export type { NodeMetadata } from '@cloud-diagrams/core';
