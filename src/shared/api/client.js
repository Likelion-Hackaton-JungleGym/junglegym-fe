import axios from "axios";

export const api = axios.create({
  baseURL: "/api", // dev: Vite 프록시, prod: Vercel rewrite
  timeout: 10000,
});

// (선택) 응답 에러 메시지 깔끔히
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (
      axios.isCancel?.(err) ||
      err?.code === "ERR_CANCELED" ||
      err?.name === "CanceledError" ||
      String(err?.message).toLowerCase() === "canceled"
    ) {
      return Promise.reject(err);
    }
    const serverMsg = err?.response?.data?.message;
    err.userMessage = serverMsg || "요청 처리 중 문제가 발생했습니다.";
    return Promise.reject(err);
  }
);
