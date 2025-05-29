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
    base: '/microfront-react-vite',
    plugins: [
      react(),
      federation({
        name: 'portal',
        remotes: {
          register: `${getRemoteUrl('5001')}/register/assets/remoteEntry.js`,
          upload: `${getRemoteUrl('5002')}/upload/assets/remoteEntry.js`,
        },
        exposes: {
          './authStore': './src/stores/authStore.ts',
          './registerStore': './src/stores/registerStore.ts',
        },
        shared: ['react', 'react-dom', 'zustand']
      })
    ],
    server: { port: 5000 },
    preview: { port: 5000 },
    build: {
      target: 'esnext',
      outDir: 'dist',
      minify: false,
      cssCodeSplit: false
    }
  };
});
