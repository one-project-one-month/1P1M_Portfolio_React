import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://test-api.one-project-one-month.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
  resolve: {
    alias: {
      // Alias '@' to the 'src' directory
      '@': path.resolve(__dirname, './src'),
    },
  },
});
