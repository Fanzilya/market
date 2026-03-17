import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    host: 'localhost',
    cors: false,
    proxy: {
      '/egr': {
        target: 'https://api-fns.ru',
        changeOrigin: true,
        secure: false,
        headers: {
          Connection: 'keep-alive',
          'Content-Type': 'application/json',
        },
        rewrite: (path) => path.replace(/^\/egr/, '/api/egr'),
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('Proxying:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('Response:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
  preview: {
    allowedHosts: ['market.gsurso.ru'],
    port: 5013,
    host: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@landing': path.resolve(__dirname, './src/moduls/landing'),
      '@shop': path.resolve(__dirname, './src/moduls/shop'),
      '@admin': path.resolve(__dirname, './src/moduls/personal-account/admin'),
      '@customer': path.resolve(__dirname, './src/moduls/personal-account/customer'),
      '@supplier': path.resolve(__dirname, './src/moduls/personal-account/supplier'),
      '@general': path.resolve(__dirname, './src/moduls/personal-account/general'),
      '@common': path.resolve(__dirname, './src/moduls/personal-account/common'),
    },
  },
})