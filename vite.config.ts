
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Aumentamos el límite de advertencia de tamaño a 2000kb para acomodar jspdf y el SDK de Google
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'jspdf'],
          ai: ['@google/genai']
        }
      }
    }
  }
});
