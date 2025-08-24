import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://www.junglegym.kr",
        changeOrigin: true,
        secure: false,
        headers: {
          'Host': 'www.junglegym.kr',
          'Origin': 'https://www.junglegym.kr',
          'Referer': 'https://www.junglegym.kr'
        }
      },
    },
  },
});
