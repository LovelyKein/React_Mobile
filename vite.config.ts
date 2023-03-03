import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8100,
    open: true,
    proxy: {
      "/proxyApi": {
        target: "http://localhost:5001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxyApi/, ""),
      },
    },
  },
  resolve: {
    // 路径别名
    alias: {
      "@": path.join(__dirname, "src"),
      "#": path.join(__dirname, "types"),
    },
  }
});
