import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      inlineRegister: false,
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'Gia Sư Check-in',
        short_name: 'Check-in',
        description: 'Ứng dụng quản lý check-in/check-out cho gia sư',
        theme_color: '#1d4ed8',
        background_color: '#f4f7fb',
        display: 'standalone',
        start_url: '/Check_inGS/',
        scope: '/Check_inGS/',
       icons: [
  {
    src: 'icon-192.svg',
    sizes: '192x192',
    type: 'image/svg+xml',
    purpose: 'any'
  },
  {
    src: 'icon-512.svg',
    sizes: '512x512',
    type: 'image/svg+xml',
    purpose: 'any'
  }
]
      },
      workbox: {
        globPatterns: ['**/*.{js,wasm,css,html}'],
        globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js']
      }
    })
  ],
  base: '/Check_inGS/',
  server: {
    port: 5173
  }
})
