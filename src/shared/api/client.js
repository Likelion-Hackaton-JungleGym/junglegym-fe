import axios from "axios";


// 올바른 API 도메인 설정
const baseURL = (() => {
  const envUrl = (import.meta.env.VITE_API_BASE_URL || "").trim();

  if (envUrl) return envUrl;

  // 프로덕션에서는 실제 API 도메인
  if (import.meta.env.PROD) {
    return "https://api.junglegym.kr";
  }

  // 개발환경에서는 로컬 또는 API 도메인
  return "https://api.junglegym.kr"; // 또는 "http://localhost:8080"
})();


export const api = axios.create({
  baseURL,
  timeout: 10000,
});

