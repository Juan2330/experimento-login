import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  preview: {
    port: 4173, 
    host: true,
    allowedHosts: [
      "experimento-login-frontend-production.up.railway.app"
    ]
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://experimento-login-production.up.railway.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});