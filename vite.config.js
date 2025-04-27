import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,  // Fija el puerto en 3000 para evitar cambios
    strictPort: true,  // Evita que cambie automáticamente a otro puerto
    watch: {
      usePolling: true,  // Soluciona problemas en algunos entornos
    }
  },
  plugins: [react(), tailwindcss()],
})
