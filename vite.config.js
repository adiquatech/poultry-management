import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // Project root is src/ within poultry-management/
  publicDir: 'public', // Static assets from src/public/
  build: {
    outDir: 'dist', // Output to poultry-management/dist/ (relative to src/)
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        growth: resolve(__dirname, 'src/growth/index.html'),
        signin: resolve(__dirname, 'src/auth/signin.html'),
        signup: resolve(__dirname, 'src/auth/signup.html'),
      },
    },
  },
  server: {
    fs: {
      allow: ['.', 'src'] // Allow serving from poultry-management/ and src/
    },
    open: '/index.html', // Open to index.html on local start
  },
});