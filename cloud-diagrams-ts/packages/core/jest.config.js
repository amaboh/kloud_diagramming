module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\.ts$': 'ts-jest',
  },
  // Transform ES modules from node_modules
  transformIgnorePatterns: [
    'node_modules/(?!(mermaid|ts-dedent|dayjs|@braintree/sanitize-url|dompurify|fflate|khroma|mdast-util-from-markdown|micromark|decode-named-character-reference|character-entities|mdast-util-to-string|unist-util-stringify-position|mdast-util-gfm-table|mdast-util-gfm-task-list-item|ccount|markdown-table|repeat-string|longest-streak|mdast-util-find-and-replace|escape-string-regexp|mdast-util-from-markdown|micromark-core-commonmark|micromark-factory-space|micromark-util-character|micromark-util-chunked|micromark-util-combine-extensions|micromark-util-decode-numeric-character-reference|micromark-util-decode-string|micromark-util-normalize-identifier|micromark-util-resolve-all|micromark-util-sanitize-uri|micromark-util-subtokenize|micromark-util-symbol|micromark-util-types|mdast-util-to-markdown|zwitch|longest-streak|mdast-util-phrasing|mdast-util-to-string|unist-util-visit|unist-util-is|unist-util-visit-parents)/)',
  ],
  // Mock Mermaid for testing
  moduleNameMapper: {
    '^mermaid$': '<rootDir>/tests/__mocks__/mermaid.ts',
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/index.ts'],
  coverageThreshold: {
    global: {
      branches: 70, // Reduced threshold due to mocking
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
