import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(() => {
  return {
    base: '/microfront-react-vite/register',
    plugins: [
      react(),
      federation({
        name: 'register',
        filename: 'remoteEntry.js',
        exposes: {
          './App': './src/App.tsx',
        },
        shared: ['react', 'react-dom']
      })
    ],
    server: { port: 5001 },
    preview: { port: 5001 },
    build: {
      target: 'esnext',
      outDir: 'dist',
      rollupOptions: {
        input: {},
      },
    }
  };
});
