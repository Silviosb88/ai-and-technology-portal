import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  base: '/ai-and-technology-portal/'
})