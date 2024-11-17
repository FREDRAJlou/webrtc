import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({})
  ],
  resolve: {
    alias: {
      // Ensure that you install 'rollup-plugin-polyfill-node' package
      'events': 'rollup-plugin-node-polyfills/polyfills/events',
    }
  }
})




