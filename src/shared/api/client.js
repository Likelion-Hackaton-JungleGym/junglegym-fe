import axios from "axios";

// 환경변수가 있으면 그걸 쓰고, 없으면 '/api' 프록시 사용
const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

export const api = axios.create({
  baseURL,
  timeout: 10000,
});

// 디버깅용 (배포 후 콘솔에서 확인)
console.log("[API] baseURL =", api.defaults.baseURL);

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
