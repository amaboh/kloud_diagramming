// Mock fs-extra for testing
jest.mock("fs-extra");

// Mock puppeteer for testing
jest.mock("puppeteer", () => ({
  launch: jest.fn().mockResolvedValue({
    newPage: jest.fn().mockResolvedValue({
      setViewport: jest.fn(),
      setContent: jest.fn(),
      waitForSelector: jest.fn(),
      screenshot: jest.fn().mockResolvedValue(Buffer.from("mock-image")),
      pdf: jest.fn().mockResolvedValue(Buffer.from("mock-pdf")),
    }),
    close: jest.fn(),
  }),
}));

// Mock child_process
jest.mock("child_process", () => ({
  execSync: jest.fn(),
}));

// Mock ora spinner
jest.mock("ora", () => {
  const mockSpinner = {
    start: jest.fn().mockReturnThis(),
    stop: jest.fn().mockReturnThis(),
    succeed: jest.fn().mockReturnThis(),
    fail: jest.fn().mockReturnThis(),
    text: "",
  };
  return jest.fn(() => mockSpinner);
});

// Mock inquirer
jest.mock("inquirer", () => ({
  prompt: jest.fn().mockResolvedValue({ overwrite: true }),
}));

// Increase test timeout for CLI operations
jest.setTimeout(30000);
