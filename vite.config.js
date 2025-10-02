import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Remove problematic rollupOptions for now
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['gsap', '@gsap/react', 'react-responsive'],
  },
  server: {
    host: true,
  }
})