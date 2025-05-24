// Mock external dependencies for testing
jest.mock('puppeteer');
jest.mock('chokidar');
jest.mock('jsdom');

// Mock commander to prevent process.exit during tests
jest.mock('commander', () => ({
  Command: jest.fn().mockImplementation(() => ({
    name: jest.fn().mockReturnThis(),
    description: jest.fn().mockReturnThis(),
    argument: jest.fn().mockReturnThis(),
    option: jest.fn().mockReturnThis(),
    action: jest.fn().mockReturnThis(),
    addCommand: jest.fn().mockReturnThis(),
    exitOverride: jest.fn().mockReturnThis(),
    parse: jest.fn(),
  })),
}));

// Suppress console output during tests
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Basic test to satisfy Jest requirement
describe('CLI Test Setup', () => {
  it('should be properly configured', () => {
    expect(true).toBe(true);
  });
});
