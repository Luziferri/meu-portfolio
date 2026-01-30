import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: Isto tem de ser igual ao nome do repositório no GitHub
  base: '/meu-portfolio/', 
})