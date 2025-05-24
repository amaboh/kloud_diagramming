// Mock mermaid for testing
export default {
  initialize: jest.fn(),
  render: jest.fn().mockResolvedValue({ svg: '<svg></svg>' }),
  mermaidAPI: {
    initialize: jest.fn(),
    render: jest.fn().mockResolvedValue('<svg></svg>'),
  },
};
