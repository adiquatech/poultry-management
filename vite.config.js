import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',
  publicDir: 'public',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        growth: resolve(__dirname, 'src/growth/index.html'),
        signin: resolve(__dirname, 'src/auth/signin.html'),
        signup: resolve(__dirname, 'src/auth/signup.html'),
        callback: resolve(__dirname, 'src/auth/callback.html'),
      },
    },
  },
  server: {
    fs: {
      allow: ['src'] // Allow serving files from src/ during development
    }
  }
});