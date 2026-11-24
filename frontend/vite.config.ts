import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Itt sorold fel a Spring Boot kontrollereid kezdő útvonalait
      // Például: http://localhost:8080/users és http://localhost:8080/auth
      '^/(sensors|sensor-readings|alerts)': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
