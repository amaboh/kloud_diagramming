const typescript = require('rollup-plugin-typescript2');
const path = require('path');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      tsconfig: 'tsconfig.build.json',
    }),
  ],
  external: ['@cloud-diagrams/core'],
};
