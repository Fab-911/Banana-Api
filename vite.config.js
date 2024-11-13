import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/banana-api': {
        target: 'http://marcconrad.com/uob/banana/api.php?out=json',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/banana-api/, ''),
      },
    },
  },
});