import type { DiagramModel, RenderOptions, ExportOptions } from '../types';

export interface Renderer {
  render(
    diagram: DiagramModel,
    container: string | HTMLElement,
    options?: RenderOptions
  ): Promise<void>;

  export(
    diagram: DiagramModel,
    format: 'svg' | 'png' | 'pdf',
    options?: ExportOptions
  ): Promise<Blob>;

  supportsInteractivity(): boolean;
  getThemes(): string[];
}

// Re-export types for convenience
export type { RenderOptions, ExportOptions };
