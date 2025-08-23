import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: { sourcemap: true },
  server: {
    proxy: {
      "/api": {
        target: "https://api.junglegym.kr",
        changeOrigin: true,

        secure: true,
        // ❌ 중요: rewrite 삭제! (/api 프리픽스 유지)
        // rewrite: (path) => path.replace(/^\/api/, ""), // ← 이 줄 있으면 지우기

      },
    },
  },
});
