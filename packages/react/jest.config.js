module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.{test,spec}.{ts,tsx}",
    "**/*.{test,spec}.{ts,tsx}",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/src/__tests__/setup.ts",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@cloud-diagrams/core$": "<rootDir>/../core/src",
    "^@cloud-diagrams/aws$": "<rootDir>/../aws/src",
    "^@cloud-diagrams/azure$": "<rootDir>/../azure/src",
    "^@cloud-diagrams/gcp$": "<rootDir>/../gcp/src",
  },
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/__tests__/**",
    "!src/__tests__/setup.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  verbose: true,
  clearMocks: true,
  restoreMocks: true,
};
