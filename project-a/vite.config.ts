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
    base: '/microfront-react-vite/project-a',
    plugins: [
      react(),
      federation({
        name: 'project_a',
        filename: 'remoteEntry.js',
        exposes: {
          './App': './src/App.tsx',
        },
        remotes: {
          portal: `${getRemoteUrl('5000')}/assets/remoteEntry.js`,
        },
        shared: ['react', 'react-dom']
      })
    ],
    server: { port: 5001 },
    preview: { port: 5001 },
    build: {
      target: 'esnext',
      outDir: 'dist',
      minify: false,
      cssCodeSplit: false
    }
  };
});
