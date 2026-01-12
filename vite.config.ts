import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Increase chunk size warning limit (our app with pokemon data is expected to be larger)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],
          // UI components
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-tabs', '@radix-ui/react-select', '@radix-ui/react-slider', '@radix-ui/react-switch', '@radix-ui/react-tooltip'],
          // i18n
          'i18n-vendor': ['i18next', 'react-i18next'],
        },
        // Include content hash in filenames for cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  // Force refresh on dev server
  css: {
    devSourcemap: true,
  },
  server: {
    headers: {
      'Cache-Control': 'no-store',
    },
  },
})
