import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api(?=\/|$)/, ''),
      },
    },
  },
  envPrefix: ['VITE_', 'REACT_'],
})
