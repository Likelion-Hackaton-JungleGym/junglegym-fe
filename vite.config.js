import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.junglegym.kr",
        changeOrigin: true,
        secure: true,
        // rewrite 제거해서 /api/dictionaries 그대로 유지
      },
    },
  },
});
