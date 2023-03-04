import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import postCssPxToRem from "postcss-pxtorem"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8100,
    open: true,
    proxy: {
      "/proxyApi": {
        target: "http://localhost:7100",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxyApi/, ""),
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.5, // 1rem的大小
          propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
          mediaQuery: false
        }),
      ],
    },
  },
  resolve: {
    // 路径别名
    alias: {
      "@": path.join(__dirname, "src"),
      "#": path.join(__dirname, "types"),
    },
  },
});
