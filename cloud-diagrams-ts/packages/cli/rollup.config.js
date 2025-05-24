const typescript = require('@rollup/plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = {
  input: 'src/cli.ts',
  output: {
    file: 'dist/cli.js',
    format: 'es',
    banner: '#!/usr/bin/env node',
  },
  external: [
    'commander',
    'chalk',
    'ora',
    'puppeteer',
    'chokidar',
    'fs-extra',
    'child_process',
    'util',
    'path',
    'fs/promises',
    'os',
    'jsdom',
    '@cloud-diagrams/core',
    '@cloud-diagrams/aws',
    '@cloud-diagrams/azure',
    '@cloud-diagrams/gcp',
  ],
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
    }),
  ],
};
