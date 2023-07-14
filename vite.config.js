import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/liu-tree-node.github.io/",
  plugins: [vue()],
  build: {
    outDir: 'docs'
  },
})
