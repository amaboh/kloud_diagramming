import type { EdgeOptions } from '../types';

export class Edge {
  constructor(
    public readonly id: string,
    public readonly fromId: string,
    public readonly toId: string,
    public readonly options: EdgeOptions = {}
  ) {}

  get label(): string | undefined {
    return this.options.label;
  }

  get style(): string {
    return this.options.style || 'solid';
  }

  get isBidirectional(): boolean {
    return this.options.bidirectional || false;
  }
}
