// Mock D3.js to avoid ES module issues in tests
jest.mock("d3", () => ({
  select: jest.fn(() => ({
    append: jest.fn(() => ({
      attr: jest.fn(() => ({
        style: jest.fn(() => ({
          text: jest.fn(),
        })),
      })),
    })),
    selectAll: jest.fn(() => ({
      data: jest.fn(() => ({
        enter: jest.fn(() => ({
          append: jest.fn(() => ({
            attr: jest.fn(() => ({
              style: jest.fn(() => ({
                text: jest.fn(),
              })),
            })),
          })),
        })),
      })),
    })),
  })),
  scaleOrdinal: jest.fn(() => ({
    domain: jest.fn(() => ({
      range: jest.fn(),
    })),
  })),
  forceSimulation: jest.fn(() => ({
    force: jest.fn(() => ({
      force: jest.fn(),
    })),
    nodes: jest.fn(),
    on: jest.fn(),
  })),
  forceManyBody: jest.fn(),
  forceLink: jest.fn(() => ({
    id: jest.fn(),
    distance: jest.fn(),
  })),
  forceCenter: jest.fn(),
  zoom: jest.fn(() => ({
    on: jest.fn(),
  })),
  zoomIdentity: {},
  event: null,
}));

// Mock DOM methods that D3 might use
Object.defineProperty(global, "document", {
  value: {
    createElement: jest.fn(() => ({
      setAttribute: jest.fn(),
      appendChild: jest.fn(),
      innerHTML: "",
      style: {},
    })),
    getElementById: jest.fn(() => ({
      appendChild: jest.fn(),
      innerHTML: "",
      style: {},
    })),
  },
});

Object.defineProperty(global, "window", {
  value: {
    getComputedStyle: jest.fn(() => ({})),
  },
});
