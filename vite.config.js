import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Server configuration with the API proxy
  server: {
    proxy: {
      // Any request starting with /api will be forwarded
      '/api': {
        // ❗️ MOST IMPORTANT: Change this port to match your RUNNING backend server port!
        target: 'http://localhost:5000', 
        
        // This is important for the backend to receive the correct host header
        changeOrigin: true, 
      },
    },
  },
});