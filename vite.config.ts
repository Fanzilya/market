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

