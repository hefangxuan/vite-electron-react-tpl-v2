import { chrome } from '../../electron-vendors.config.js';
import { join } from 'path';
import externalPackages from '../../external-packages.config.js';
import { defineConfig } from 'vite';

const PACKAGE_ROOT = __dirname;

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: process.cwd(),
  resolve: {
    alias: {
      '/@/': join(__dirname, 'src') + '/',
    },
  },
  build: {
    sourcemap: 'inline',
    target: `chrome${chrome}`,
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
    brotliSize: false,
  },
});
