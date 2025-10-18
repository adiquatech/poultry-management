import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // Build root is src/
  publicDir: '../public', // Point to project root's public/ from src/
  base: '/',
  build: {
    outDir: 'dist', // Output to src/dist
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'), // Map to dist/index.html
        growth: resolve(__dirname, 'src/growth/index.html'),
        signin: resolve(__dirname, 'src/auth/signin.html'),
        signup: resolve(__dirname, 'src/auth/signup.html'),
      },
    },
  },
});