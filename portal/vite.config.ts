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
          project_a: `${getRemoteUrl('5001')}/project-a/assets/remoteEntry.js`,
          project_b: `${getRemoteUrl('5002')}/project-b/assets/remoteEntry.js`,
          project_c: `${getRemoteUrl('5003')}/project-c/assets/remoteEntry.js`,
        },
        exposes: {
          './Login': './src/components/Login.tsx',
          './authStore': './src/stores/user.ts',
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
