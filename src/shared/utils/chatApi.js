import api from "./api";

/** 최근 리스트: GET /api/chat?limit=10 */
export async function getChats({ limit = 10 } = {}) {
  console.log("[getChats] 요청 시작", { limit });
  const res = await api.get("/api/chat", { params: { limit } });
  console.log("[getChats] 응답 도착", res.status, res.data);
  const data = res?.data;
  const list = Array.isArray(data?.data) ? data.data : [];
  return { raw: data, list };
}

/** 질문하기: POST /api/chat */
export async function askJungleTalkAI(question, { privated = false } = {}) {
  console.log("[askJungleTalkAI] 요청 시작", { question, privated });
  const res = await api.post(
    "/api/chat",
    { question, privated },
    { headers: { "Content-Type": "application/json", Accept: "application/json" } }
  );
  console.log("[askJungleTalkAI] 응답 도착", res.status, res.data);
  return res?.data?.data; // { question, answer, constitution }
}