import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1": {
        target: "https://sunmoonebe-production.up.railway.app",
        // target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/kiot": {
        target: "https://public.kiotapi.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kiot/, ""),
      },
      "/token": {
        target: "https://id.kiotviet.vn/connect/token",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/token/, ""),
      },
    },
  },
  plugins: [react()],
});
