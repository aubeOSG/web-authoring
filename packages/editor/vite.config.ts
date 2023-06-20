import { resolve } from 'path';
import { defineConfig } from 'vite';
// import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/server/index.ts'),
      name: 'server',
      fileName: 'server',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: [
        /node_modules/,
        'path',
        'node:os',
      ],
      output: {
        dir: 'web',
        format: 'cjs'
      },
    },
  }
});