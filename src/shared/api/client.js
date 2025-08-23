import axios from "axios";

// .env가 없거나 값이 비어있으면 자동으로 '/api' 사용
const baseURL = (() => {
  const envUrl = (import.meta.env.VITE_API_BASE_URL || "").trim();
  return envUrl || "/api";
})();

export const api = axios.create({
  baseURL,
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // ✅ 요청 취소는 사용자 메시지 부여/로그 대상에서 제외
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
