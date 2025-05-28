import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(() => {
  return {
    base: '/microfront-react-vite/project-c',
    plugins: [
      react(),
      federation({
        name: 'project_c',
        filename: 'remoteEntry.js',
        exposes: {
          './App': './src/App.tsx',
        },
        shared: ['react', 'react-dom']
      })
    ],
    server: { port: 5003 },
    preview: { port: 5003 },
    build: {
      target: 'esnext',
      outDir: 'dist',
      minify: false,
      cssCodeSplit: false
    }
  };
});
