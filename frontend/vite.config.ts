import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Itt adjuk meg a backend portját (8080)
      '/sensors': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // EZ A KULCS: Csak akkor küldje a backendre, ha a kérés JSON-t vagy API-t vár
        bypass: (req) => {
          // Ha a böngésző HTML oldalt kér (pl. kézi beírás vagy F5 frissítésnél), 
          // akkor NE küldje a backendre, hanem adja vissza a React index.html-t
          if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return '/index.html';
          }
        },
      },
      // Ha a /sensor-readings endpointot is használod, arra is tedd rá ugyanezt:
      '/sensor-readings': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        bypass: (req) => {
          if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return '/index.html';
          }
        },
      },
      '/alerts': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        bypass: (req) => {
          if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return '/index.html';
          }
        },
      }
    },
  },
})
