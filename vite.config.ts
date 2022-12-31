import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './docs',
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
      },
      manifest: {
        background_color: '#000000',
        theme_color: '#7E1F86',
        name: 'TaskManager1.0',
        short_name: 'TaskManager1.0',
        start_url: '/TaskManager/',
        display: 'standalone',
        icons: [
          {
            src: 'public/list-solid.svg',
            sizes: '144x144',
            type: 'image/svg',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
  server: {
    port: 8080,
    host: true,
    hmr: {
      host: 'localhost',
    },
  },
  base: './',
});
