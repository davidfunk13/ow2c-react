import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    }
    define: {
      // Define environment variables that will be available during build
      'import.meta.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      // You can define other environment variables here if needed
      // For example, 'import.meta.env.API_URL': JSON.stringify(process.env.API_URL || ''),
    },
})
