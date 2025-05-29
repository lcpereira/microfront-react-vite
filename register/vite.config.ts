import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  const getRemoteUrl = (portOrProject: string) => {
    return isDev
      ? `http://localhost:${portOrProject}/microfront-react-vite`
      : 'https://lcpereira.github.io/microfront-react-vite';
  };

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
        remotes: {
          shared: `${getRemoteUrl('5001')}/shared/assets/remoteEntry.js`,
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
