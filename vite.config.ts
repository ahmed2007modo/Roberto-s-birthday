import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages serves this project from /<repository-name>/.
  base: '/Roberto-s-birthday/',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5178,
  },
})
