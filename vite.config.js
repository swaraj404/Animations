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
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            if (id.includes('gsap')) {
              return 'gsap';
            }
            if (id.includes('react-responsive')) {
              return 'utils';
            }
            return 'vendor';
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ['gsap', '@gsap/react', 'react-responsive'],
  },
  server: {
    host: true,
  }
})