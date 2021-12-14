import { node } from '../../electron-vendors.config.js';
import { join } from 'path';
import externalPackages from '../../external-packages.config.js';
import { defineConfig } from 'vite';

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      '/@/common': join(process.cwd(), 'packages/common') + '/',
      '/@/': join(__dirname, 'src') + '/',
    },
  },
  publicDir: 'public',
  build: {
    sourcemap: 'inline',
    target: `node${node}`,
    outDir: 'dist',
    assetsDir: '.',
    minify: process.env.MODE === 'development' ? false : undefined, // undefined must set default value
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: externalPackages,
      output: {
        entryFileNames: '[name].cjs',
      },
    },
    emptyOutDir: true,
  },
});
