module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.{test,spec}.{ts,js}",
    "**/*.{test,spec}.{ts,js}",
  ],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "^@cloud-diagrams/core$": "<rootDir>/../core/src",
    "^@cloud-diagrams/aws$": "<rootDir>/../aws/src",
    "^@cloud-diagrams/azure$": "<rootDir>/../azure/src",
    "^@cloud-diagrams/gcp$": "<rootDir>/../gcp/src",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,js}",
    "!src/**/*.d.ts",
    "!src/**/*.test.{ts,js}",
    "!src/**/*.spec.{ts,js}",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  testTimeout: 30000, // 30 seconds for CLI operations
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],
};
