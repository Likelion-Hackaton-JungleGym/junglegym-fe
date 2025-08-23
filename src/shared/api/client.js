import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
      err?.message === "canceled"
    ) {
      return Promise.reject(err);
    }
    err.userMessage = err?.response?.data?.message || "요청 처리 중 문제가 발생했습니다.";
    return Promise.reject(err);
  }
);
