import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base must match the GitHub repo name for GitHub Pages deployment
  base: '/Movie-watchlist/',
})
