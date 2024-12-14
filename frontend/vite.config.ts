import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: "http://localhost:3500",
        },
      },
    },
    esbuild: {
              // Disable type checking during build
              logOverride: { 'this-is-undefined-in-esm': 'silent' },
          }
})



