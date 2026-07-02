import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Use /pokedex/ when building for production (GitHub Pages),
  // otherwise use root for local dev.
  const isProd = mode === 'production'
  return {
    // base: isProd ? '/pokedex/' : '/',
  //  base:'/pokedex/',
    plugins: [react()],
  }
})
