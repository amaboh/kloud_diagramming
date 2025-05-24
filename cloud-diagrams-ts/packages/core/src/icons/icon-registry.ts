import type { IconDefinition, IconSet, IconPack } from './types';

export class IconRegistry {
  private icons = new Map<string, IconDefinition>();
  private iconPacks = new Map<string, IconPack>();
  private cache = new Map<string, string>();
  private loadedPacks = new Set<string>();

  /**
   * Register a single icon
   */
  register(provider: string, service: string, icon: IconDefinition): void {
    const key = `${provider}:${service}`;
    this.icons.set(key, icon);
  }

  /**
   * Get an icon by provider and service
   */
  get(provider: string, service: string): IconDefinition | undefined {
    const key = `${provider}:${service}`;
    return this.icons.get(key);
  }

  /**
   * Register an icon pack for a provider
   */
  registerIconPack(provider: string, pack: IconPack): void {
    this.iconPacks.set(provider, pack);
  }

  /**
   * Load icons for a specific provider
   */
  async loadIconPack(provider: string): Promise<void> {
    if (this.loadedPacks.has(provider)) {
      return; // Already loaded
    }

    const pack = this.iconPacks.get(provider);
    if (!pack) {
      console.warn(`No icon pack registered for provider: ${provider}`);
      return;
    }

    try {
      // Load icon data from the pack
      if (typeof pack.loadIcons === 'function') {
        const iconSet = await pack.loadIcons();
        this.registerIconSet(provider, iconSet);
      } else if (pack.icons) {
        this.registerIconSet(provider, pack.icons);
      }

      this.loadedPacks.add(provider);
      console.log(
        `✅ Loaded icon pack for ${provider}: ${Object.keys(pack.icons || {}).length} icons`
      );
    } catch (error) {
      console.error(`Failed to load icon pack for ${provider}:`, error);
      throw error;
    }
  }

  /**
   * Register multiple icons from an icon set
   */
  private registerIconSet(provider: string, iconSet: IconSet): void {
    Object.entries(iconSet).forEach(([service, icon]) => {
      if (icon) {
        this.register(provider, service, icon);
      }
    });
  }

  /**
   * Get icon SVG data with caching
   */
  async getIconSvg(
    provider: string,
    service: string,
    variant?: 'light' | 'dark' | 'colored'
  ): Promise<string | null> {
    const cacheKey = `${provider}:${service}:${variant || 'default'}`;

    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Ensure icon pack is loaded
    await this.loadIconPack(provider);

    const icon = this.get(provider, service);
    if (!icon) {
      console.warn(`Icon not found: ${provider}:${service}`);
      return null;
    }

    // Get the appropriate variant
    let svgData: string;
    if (variant && icon.variants && icon.variants[variant]) {
      svgData = icon.variants[variant]!;
    } else {
      svgData = icon.svg;
    }

    // Cache the result
    this.cache.set(cacheKey, svgData);

    return svgData;
  }

  /**
   * Get all available services for a provider
   */
  getServicesForProvider(provider: string): string[] {
    const services: string[] = [];

    this.icons.forEach((icon, key) => {
      const [iconProvider, service] = key.split(':');
      if (iconProvider === provider) {
        services.push(service);
      }
    });

    return services.sort();
  }

  /**
   * Get icon as data URL for embedding
   */
  async getIconDataUrl(
    provider: string,
    service: string,
    variant?: 'light' | 'dark' | 'colored'
  ): Promise<string | null> {
    const svgData = await this.getIconSvg(provider, service, variant);
    if (!svgData) return null;

    // Convert SVG to data URL
    const base64 = btoa(svgData);
    return `data:image/svg+xml;base64,${base64}`;
  }

  /**
   * Check if an icon exists
   */
  hasIcon(provider: string, service: string): boolean {
    const key = `${provider}:${service}`;
    return this.icons.has(key);
  }

  /**
   * Clear all cached icon data
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get registry statistics
   */
  getStats(): {
    totalIcons: number;
    providersLoaded: number;
    cacheSize: number;
    providers: string[];
  } {
    const providers = new Set<string>();
    this.icons.forEach((_, key) => {
      const [provider] = key.split(':');
      providers.add(provider);
    });

    return {
      totalIcons: this.icons.size,
      providersLoaded: this.loadedPacks.size,
      cacheSize: this.cache.size,
      providers: Array.from(providers).sort(),
    };
  }
}

// Global icon registry instance
export const iconRegistry = new IconRegistry();
