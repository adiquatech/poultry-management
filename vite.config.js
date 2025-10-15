import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Project root is poultry-management/
  publicDir: 'public',
  build: {
    outDir: 'dist',
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
      allow: ['.']
    }
  }
});