import axios from "axios";

const api = axios.create({
  baseURL: "http://백엔드API주소를여기에넣으세요.com:8080",
  timeout: 30 * 1000, // 타임아웃 30초
  withCredentials: false, // 백엔드에서 토큰 관련 이야기가 나오면 먼저 멘토에게 연락주세요.
});

export default api;
