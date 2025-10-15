import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
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
      allow: ['..', 'src']
    },
    open: '/index.html',
    configureServer({ app }) {
      app.use((req, res, next) => {
        if (req.url === '/') {
          res.writeHead(302, { Location: '/index.html' });
          res.end();
        } else {
          next();
        }
      });
    }
  }
});

