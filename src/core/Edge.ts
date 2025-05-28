import { EdgeOptions } from "../types";
import { generateId } from "../utils/helpers";

/**
 * Edge class - represents a connection between nodes in the diagram
 */
export class Edge {
  public id: string;
  public fromId: string;
  public toId: string;
  public options: EdgeOptions;

  constructor(
    id: string,
    fromId: string,
    toId: string,
    options: EdgeOptions = {}
  ) {
    this.id = id || generateId();
    this.fromId = fromId;
    this.toId = toId;
    this.options = {
      style: "solid",
      dir: "forward",
      arrowhead: "normal",
      weight: 1,
      constraint: true,
      ...options,
    };
  }

  get label(): string | undefined {
    return this.options.label;
  }

  get style(): string {
    return this.options.style || "solid";
  }

  get color(): string | undefined {
    return this.options.color;
  }

  get isBidirectional(): boolean {
    return this.options.bidirectional || this.options.dir === "both";
  }

  get isVisible(): boolean {
    return this.options.style !== "invis";
  }

  // Fluent API methods
  withOptions(newOptions: EdgeOptions): Edge {
    return new Edge(this.id, this.fromId, this.toId, {
      ...this.options,
      ...newOptions,
    });
  }

  withColor(color: string): Edge {
    return this.withOptions({ color });
  }

  withStyle(style: EdgeOptions["style"]): Edge {
    return this.withOptions({ style });
  }

  withLabel(label: string): Edge {
    return this.withOptions({ label });
  }

  bidirectional(): Edge {
    return this.withOptions({ dir: "both", bidirectional: true });
  }

  invisible(): Edge {
    return this.withOptions({ style: "invis" });
  }

  withWeight(weight: number): Edge {
    return this.withOptions({ weight });
  }

  getGraphvizAttributes(): Record<string, string> {
    const attrs: Record<string, string> = {};

    if (this.options.label) attrs.label = this.options.label;
    if (this.options.color) attrs.color = this.options.color;
    if (this.options.style) attrs.style = this.options.style;
    if (this.options.fontcolor) attrs.fontcolor = this.options.fontcolor;
    if (this.options.fontsize) attrs.fontsize = String(this.options.fontsize);
    if (this.options.fontname) attrs.fontname = this.options.fontname;
    if (this.options.dir) attrs.dir = this.options.dir;
    if (this.options.arrowhead) attrs.arrowhead = this.options.arrowhead;
    if (this.options.arrowtail) attrs.arrowtail = this.options.arrowtail;
    if (this.options.weight) attrs.weight = String(this.options.weight);
    if (this.options.minlen) attrs.minlen = String(this.options.minlen);
    if (this.options.constraint !== undefined)
      attrs.constraint = String(this.options.constraint);

    if (this.options.attributes) {
      Object.assign(attrs, this.options.attributes);
    }

    return attrs;
  }

  clone(newId?: string): Edge {
    return new Edge(newId || generateId(), this.fromId, this.toId, {
      ...this.options,
    });
  }

  toJSON(): any {
    return {
      id: this.id,
      fromId: this.fromId,
      toId: this.toId,
      options: this.options,
    };
  }

  static fromJSON(data: any): Edge {
    return new Edge(data.id, data.fromId, data.toId, data.options);
  }
}

/**
 * EdgeBuilder class - fluent API for creating edges
 */
export class EdgeBuilder {
  private fromId: string;
  private toId: string;
  private options: EdgeOptions = {};

  constructor(fromId: string, toId: string) {
    this.fromId = fromId;
    this.toId = toId;
  }

  label(label: string): EdgeBuilder {
    this.options.label = label;
    return this;
  }

  color(color: string): EdgeBuilder {
    this.options.color = color;
    return this;
  }

  style(style: EdgeOptions["style"]): EdgeBuilder {
    this.options.style = style;
    return this;
  }

  fontColor(fontcolor: string): EdgeBuilder {
    this.options.fontcolor = fontcolor;
    return this;
  }

  fontSize(fontsize: number): EdgeBuilder {
    this.options.fontsize = fontsize;
    return this;
  }

  fontName(fontname: string): EdgeBuilder {
    this.options.fontname = fontname;
    return this;
  }

  direction(dir: EdgeOptions["dir"]): EdgeBuilder {
    this.options.dir = dir;
    return this;
  }

  arrowHead(arrowhead: EdgeOptions["arrowhead"]): EdgeBuilder {
    this.options.arrowhead = arrowhead;
    return this;
  }

  arrowTail(arrowtail: EdgeOptions["arrowtail"]): EdgeBuilder {
    this.options.arrowtail = arrowtail;
    return this;
  }

  weight(weight: number): EdgeBuilder {
    this.options.weight = weight;
    return this;
  }

  minLength(minlen: number): EdgeBuilder {
    this.options.minlen = minlen;
    return this;
  }

  constraint(constraint: boolean): EdgeBuilder {
    this.options.constraint = constraint;
    return this;
  }

  bidirectional(): EdgeBuilder {
    this.options.dir = "both";
    this.options.bidirectional = true;
    return this;
  }

  invisible(): EdgeBuilder {
    this.options.style = "invis";
    return this;
  }

  attributes(attributes: Record<string, string>): EdgeBuilder {
    this.options.attributes = { ...this.options.attributes, ...attributes };
    return this;
  }

  build(id?: string): Edge {
    return new Edge(id || generateId(), this.fromId, this.toId, this.options);
  }
}
