import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      '/portfolio/api': {
        target: 'https://api-opom.one-project-one-month.com',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: 'localhost',
      },
    },
  },
  resolve: {
    alias: {
      // Alias '@' to the 'src' directory
      '@': path.resolve(__dirname, './src'),
    },
  },
});
