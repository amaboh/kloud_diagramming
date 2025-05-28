import { IconRegistry, IconData, IconMetadata, CloudProvider } from "../types";
import { normalizeServiceName, getProviderColor } from "../utils/helpers";
import { awsIcons } from "./aws";
import { azureIcons } from "./azure";
import { gcpIcons } from "./gcp";

/**
 * Icon Registry implementation for managing cloud service icons
 */
export class IconRegistryImpl implements IconRegistry {
  public icons: {
    aws: Record<string, IconData>;
    azure: Record<string, IconData>;
    gcp: Record<string, IconData>;
  };

  constructor(initialIcons: Partial<IconRegistry["icons"]> = {}) {
    this.icons = {
      aws: initialIcons.aws || {},
      azure: initialIcons.azure || {},
      gcp: initialIcons.gcp || {},
    };
  }

  getIcon(provider: CloudProvider, service: string): IconData | null {
    const normalizedService = normalizeServiceName(service);

    // Try exact match first
    let icon = this.icons[provider]?.[service];
    if (icon) return icon;

    // Try normalized service name
    icon = this.icons[provider]?.[normalizedService];
    if (icon) return icon;

    // Try common variations
    const variations = this.generateServiceVariations(service);
    for (const variation of variations) {
      icon = this.icons[provider]?.[variation];
      if (icon) return icon;
    }

    return null;
  }

  getFallbackIcon(provider: CloudProvider, service: string): IconData {
    const color = getProviderColor(provider);
    const label = service.substring(0, 3).toUpperCase();

    const svg = `data:image/svg+xml;base64,${btoa(`
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" fill="${color}" rx="4"/>
        <text x="20" y="24" fill="white" font-family="Arial" font-size="8" text-anchor="middle">${label}</text>
      </svg>
    `)}`;

    return {
      svg,
      metadata: {
        name: `${provider.toUpperCase()} ${service}`,
        description: `Fallback icon for ${service}`,
        category: "Fallback",
        provider,
        service,
        tags: ["fallback"],
        version: "1.0.0",
      },
    };
  }

  registerIcon(
    provider: CloudProvider,
    service: string,
    iconData: IconData
  ): void {
    if (!this.icons[provider]) {
      this.icons[provider] = {};
    }
    this.icons[provider][service] = iconData;
  }

  hasIcon(provider: CloudProvider, service: string): boolean {
    return this.getIcon(provider, service) !== null;
  }

  getIconCount(provider?: CloudProvider): number {
    if (provider) {
      return Object.keys(this.icons[provider] || {}).length;
    }

    return Object.values(this.icons).reduce(
      (total, providerIcons) => total + Object.keys(providerIcons).length,
      0
    );
  }

  searchIcons(query: string, provider?: CloudProvider): IconData[] {
    const results: IconData[] = [];
    const searchTerm = query.toLowerCase();

    const searchInProvider = (providerIcons: Record<string, IconData>) => {
      Object.values(providerIcons).forEach((icon) => {
        const metadata = icon.metadata;
        const searchableText = [
          metadata.name,
          metadata.description || "",
          metadata.service,
          ...(metadata.tags || []),
        ]
          .join(" ")
          .toLowerCase();

        if (searchableText.includes(searchTerm)) {
          results.push(icon);
        }
      });
    };

    if (provider) {
      searchInProvider(this.icons[provider] || {});
    } else {
      Object.values(this.icons).forEach(searchInProvider);
    }

    return results;
  }

  private generateServiceVariations(service: string): string[] {
    const variations = new Set<string>();

    // Add original
    variations.add(service);

    // Add normalized
    variations.add(normalizeServiceName(service));

    // Add lowercase
    variations.add(service.toLowerCase());

    // Add without spaces and special characters
    variations.add(service.replace(/[\s\-_]/g, "").toLowerCase());

    // Add camelCase variations
    const camelCase = service.replace(/[\s\-_]+(.)/g, (_, char) =>
      char.toUpperCase()
    );
    variations.add(camelCase);
    variations.add(camelCase.toLowerCase());

    return Array.from(variations);
  }

  // Utility methods for bulk operations
  loadIconsFromObject(
    provider: CloudProvider,
    icons: Record<string, IconData>
  ): void {
    Object.entries(icons).forEach(([service, iconData]) => {
      this.registerIcon(provider, service, iconData);
    });
  }

  exportIcons(provider?: CloudProvider): Record<string, IconData> {
    if (provider) {
      return { ...this.icons[provider] };
    }

    const allIcons: Record<string, IconData> = {};
    Object.entries(this.icons).forEach(([providerName, providerIcons]) => {
      Object.entries(providerIcons).forEach(([service, iconData]) => {
        allIcons[`${providerName}.${service}`] = iconData;
      });
    });

    return allIcons;
  }

  getProviderStats(): Record<
    CloudProvider,
    { count: number; categories: string[] }
  > {
    const stats: Record<
      CloudProvider,
      { count: number; categories: string[] }
    > = {
      aws: { count: 0, categories: [] },
      azure: { count: 0, categories: [] },
      gcp: { count: 0, categories: [] },
    };

    Object.entries(this.icons).forEach(([provider, providerIcons]) => {
      const p = provider as CloudProvider;
      stats[p].count = Object.keys(providerIcons).length;

      const categories = new Set<string>();
      Object.values(providerIcons).forEach((icon) => {
        categories.add(icon.metadata.category);
      });

      stats[p].categories = Array.from(categories).sort();
    });

    return stats;
  }
}

/**
 * Factory function to create an icon registry with real cloud service icons
 */
export function createIconRegistry(
  options: {
    customIcons?: Record<string, IconData>;
    awsIcons?: Record<string, IconData>;
    azureIcons?: Record<string, IconData>;
    gcpIcons?: Record<string, IconData>;
  } = {}
): IconRegistry {
  const registry = new IconRegistryImpl({
    aws: options.awsIcons || awsIcons, // Use real AWS icons by default
    azure: options.azureIcons || azureIcons, // Use real Azure icons by default
    gcp: options.gcpIcons || gcpIcons, // Use real GCP icons by default
  });

  // Load custom icons if provided
  if (options.customIcons) {
    Object.entries(options.customIcons).forEach(([key, iconData]) => {
      const [provider, service] = key.split(".");
      if (provider && service && ["aws", "azure", "gcp"].includes(provider)) {
        registry.registerIcon(provider as CloudProvider, service, iconData);
      }
    });
  }

  return registry;
}
