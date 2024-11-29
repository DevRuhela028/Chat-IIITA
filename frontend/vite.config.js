import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // or '/' based on your setup
  build: {
    outDir: 'dist',
    // other settings
  }
})
