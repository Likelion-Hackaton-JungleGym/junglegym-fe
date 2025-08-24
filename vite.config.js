// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // ⬅️ 루트 배포
  plugins: [react()],
  build: { sourcemap: true },
  server: {
    proxy: {
      "/api": {
        target: "https://api.junglegym.kr",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
