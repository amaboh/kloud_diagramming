import '@testing-library/jest-dom';

// Mock Mermaid with proper ES module structure
jest.mock('mermaid', () => ({
  __esModule: true,
  default: {
    initialize: jest.fn(),
    render: jest.fn().mockResolvedValue({ svg: '<svg>test</svg>' }),
    parse: jest.fn().mockReturnValue(true),
    mermaidAPI: {
      initialize: jest.fn(),
      render: jest.fn().mockResolvedValue('<svg>test</svg>'),
      parse: jest.fn().mockReturnValue(true),
    },
  },
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock DOM methods that might not be available in test environment
Object.defineProperty(window, 'matchMedia', {
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

// Add a simple test to satisfy Jest requirement
describe('Test Setup', () => {
  test('setup file loads correctly', () => {
    expect(true).toBe(true);
  });
});
