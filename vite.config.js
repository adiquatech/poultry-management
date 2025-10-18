import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', 
  publicDir: 'public', 
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        growth: resolve(__dirname, '/growth/index.html'),
        signin: resolve(__dirname, '/auth/signin.html'),
        signup: resolve(__dirname, '/auth/signup.html'),
      },
    },
  },
});