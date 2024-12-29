import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://chatgpt.com', // Change this to the correct API URL
        changeOrigin: true,
        secure: false, // if the server uses HTTP, set this to true for HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});

