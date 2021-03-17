import { chrome } from '../../electron-vendors.config.js';
import { join } from 'path';
import externalPackages from '../../external-packages.config.js';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import theme from './src/styles/theme';
/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      '/@/': join(__dirname, 'src') + '/',
      '/@/common': join(__dirname, '../common') + '/',
    },
  },
  plugins: [reactRefresh()],
  base: '',
  build: {
    sourcemap: 'inline',
    target: `chrome${chrome}`,
    polyfillDynamicImport: false,
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      external: externalPackages,
    },
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 重写 less 变量，定制样式
        modifyVars: theme,
      },
    },
  },
  jsx: 'react',
});
