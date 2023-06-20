import { resolve } from 'path';
import { defineConfig } from 'vite';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import tsconfig from './tsconfig.server.json';

export default {
  input: 'src/server/index.ts',
  external: [
    /node_modules/,
    'path',
    'node:os'
  ],
  output: {
    dir: 'dist',
    file: 'server.js',
    format: 'cjs',
  },
  plugins: [
    commonjs(),
    typescript(tsconfig),
  ],
};

// export default defineConfig({
//   build: {
//     emptyOutDir: false,
//     lib: {
//       entry: resolve(__dirname, 'src/server/index.ts'),
//       name: 'server',
//       fileName: 'server',
//       formats: ['cjs'],
//     },
//     rollupOptions: {
//       external: [
//         /node_modules/,
//         'path',
//         'node:os',
//       ],
//       output: {
//         dir: 'dist',
//         format: 'cjs'
//       },
//     },
//   },
//   plugins: [
//     commonjs(),
//     typescript(tsconfig),
//   ],
// });