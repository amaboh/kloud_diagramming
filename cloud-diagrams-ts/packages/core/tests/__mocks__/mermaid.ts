// Mock implementation of Mermaid for testing
const mermaid = {
  initialize: jest.fn(),
  render: jest.fn().mockResolvedValue({
    svg: '<svg><g><text>Mock Diagram</text></g></svg>',
    bindFunctions: jest.fn(),
  }),
  parse: jest.fn(),
  parseError: jest.fn(),
  mermaidAPI: {
    initialize: jest.fn(),
    render: jest.fn(),
    parse: jest.fn(),
    parseError: jest.fn(),
  },
};

export default mermaid;
