import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleApiRequest } from './server/api.js';

function apiPlugin() {
  return {
    name: 'persistent-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api/')) {
          const handled = handleApiRequest(req, res);
          if (!handled) next();
        } else {
          next();
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api/')) {
          const handled = handleApiRequest(req, res);
          if (!handled) next();
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
