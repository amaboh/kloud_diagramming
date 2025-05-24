import "@testing-library/jest-dom";

// Mock the MermaidRenderer at the core package level
jest.mock("@cloud-diagrams/core", () => {
  // Get the actual core exports
  const actualCore = jest.requireActual("@cloud-diagrams/core");

  // Mock MermaidRenderer class
  class MockMermaidRenderer {
    constructor() {
      // Don't call initialize during testing
    }

    async render(diagram: any, container: any, options: any = {}) {
      // Mock render that just adds some basic content
      const containerElement =
        typeof container === "string"
          ? document.querySelector(container)
          : container;

      if (containerElement) {
        containerElement.innerHTML = "<svg><g>Mock diagram</g></svg>";
      }
    }

    async export() {
      return new Blob(["mock"], { type: "image/svg+xml" });
    }

    supportsInteractivity() {
      return true;
    }

    getThemes() {
      return ["default", "dark"];
    }
  }

  return {
    ...actualCore,
    MermaidRenderer: MockMermaidRenderer,
  };
});

// Also mock mermaid directly for any direct imports
jest.mock("mermaid", () => {
  const mockMermaid = {
    initialize: jest.fn(),
    render: jest.fn().mockResolvedValue({ svg: "<svg></svg>" }),
    mermaidAPI: {
      initialize: jest.fn(),
      render: jest.fn().mockResolvedValue("<svg></svg>"),
    },
  };

  return {
    __esModule: true,
    default: mockMermaid,
    ...mockMermaid,
  };
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock URL.createObjectURL and revokeObjectURL
global.URL.createObjectURL = jest.fn();
global.URL.revokeObjectURL = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock DOM methods
global.document.createElement = jest.fn().mockImplementation((tagName) => {
  const element = {
    tagName: tagName.toUpperCase(),
    innerHTML: "",
    outerHTML: "",
    style: {},
    appendChild: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn(() => []),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    click: jest.fn(),
  };

  if (tagName === "canvas") {
    element.getContext = jest.fn(() => ({
      fillStyle: "",
      fillRect: jest.fn(),
      drawImage: jest.fn(),
    }));
    element.toBlob = jest.fn((callback) => {
      callback(new Blob(["mock"], { type: "image/png" }));
    });
    element.width = 800;
    element.height = 600;
  }

  return element;
});
