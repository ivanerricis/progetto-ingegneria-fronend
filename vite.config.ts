import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { cloudflare } from "@cloudflare/vite-plugin"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [react(), tailwindcss(), cloudflare(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [],
    },
  },
  optimizeDeps: {
    include: ['flag-icons'],
  },
  build: {
    rollupOptions: {
    },
  },
})