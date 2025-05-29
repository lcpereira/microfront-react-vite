import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(() => {
  return {
    base: '/microfront-react-vite/upload',
    plugins: [
      react(),
      federation({
        name: 'upload',
        filename: 'remoteEntry.js',
        exposes: {
          './App': './src/App.tsx',
        },
        shared: ['react', 'react-dom']
      })
    ],
    server: { port: 5002 },
    preview: { port: 5002 },
    build: {
      target: 'esnext',
      outDir: 'dist',
      rollupOptions: {
        input: {},
      },
    }
  };
});
