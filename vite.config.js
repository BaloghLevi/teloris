import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  publicDir: resolve(process.cwd(), 'public'),
  build: {
    outDir: resolve(process.cwd(), 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(process.cwd(), 'src/index.html'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [resolve(process.cwd(), 'node_modules')],
      },
    },
  },
});
