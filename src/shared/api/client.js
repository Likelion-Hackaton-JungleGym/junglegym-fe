import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    err.userMessage = err?.response?.data?.message || "요청 처리 중 문제가 발생했습니다.";
    return Promise.reject(err);
  }
);
