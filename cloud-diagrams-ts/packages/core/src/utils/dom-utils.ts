/**
 * Utility functions for DOM manipulation
 */

export function getContainer(container: string | HTMLElement): HTMLElement {
  if (typeof container === 'string') {
    const element = document.querySelector(container);
    if (!element) {
      throw new Error(`Container element not found: ${container}`);
    }
    return element as HTMLElement;
  }
  return container;
}

export function createSVGElement(tag: string, attributes: Record<string, string> = {}): SVGElement {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
}

export function clearContainer(container: HTMLElement): void {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
} 