import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(() => {
  return {
    base: '/microfront-react-vite/shared',
    plugins: [
      react(),
      federation({
        name: 'shared',
        filename: 'remoteEntry.js',
        exposes: {
          './theme': './src/theme/theme.ts',
          './stores/authStore': './src/stores/authStore.ts',
          './stores/registerStore': './src/stores/registerStore.ts',
          './components/Button': './src/components/Button.tsx',
          './components/Input': './src/components/Input.tsx',
          './components/Checkbox': './src/components/Checkbox.tsx',
          './components/Layout': './src/components/Layout.tsx',
          './components/Table': './src/components/Table.tsx',
          './components/FileUpload': './src/components/FileUpload.tsx',
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
