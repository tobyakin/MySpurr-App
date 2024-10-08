import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //add test to vite config
  test: {
    environment: 'happy-dom'
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    rollupOptions: {
      external: [
        'primevue/resources/themes/aura-light-green/theme.css'
      ]
    }
  }
})
