import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate', injectRegister: 'auto',
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,json,ts,tsx}']
    },devOptions: {
      enabled: true,
    },
  })], resolve: {
    alias: {
      '@data': '/src/data',
      '@utils': '/src/utils',
      '@domain': '/src/domain',
      '@features': '/src/features',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@assets': '/src/assets',
      '@pages': '/src/pages',
      '@quicker': '/src',
      '@styles': '/src/styles',
      '@common': '/src/common',
    },
  },
});
