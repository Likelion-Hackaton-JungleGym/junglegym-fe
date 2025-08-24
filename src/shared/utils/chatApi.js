import api from "./api";

/** 최근 리스트: GET /api/chat?limit=10 */
export async function getChats({ limit = 10 } = {}) {
  console.log("[getChats] 요청 시작", { limit });
  try {
    // 직접 API 호출
    const res = await fetch(`https://www.junglegym.kr/api/chat?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log("[getChats] 응답 도착", res.status, data);
    const list = Array.isArray(data?.data) ? data.data : [];
    return { raw: data, list };
  } catch (error) {
    console.log("[getChats] 서버 연결 실패, 더미 데이터 사용", error.message);
    // 백엔드 서버 다운 시 더미 데이터 반환
    return { 
      raw: { success: true, data: [] }, 
      list: [
        { question: "비례대표와 지역구는 어떻게 다른건가요?" },
        { question: "국회의원은 몇 명이고, 다 뭐 하는 사람들이에요?" },
        { question: "정당이 많던데, 무소속이랑 정당 후보는 뭐가 달라?" }
      ]
    };
  }
}

/** 질문하기: POST /api/chat */
export async function askJungleTalkAI(question, { privated = false } = {}) {
  console.log("[askJungleTalkAI] 요청 시작", { question, privated });
  try {
    // 직접 API 호출
    const res = await fetch('https://www.junglegym.kr/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ question, privated })
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log("[askJungleTalkAI] 응답 도착", res.status, data);
    return data?.data; // { question, answer, constitution }
  } catch (error) {
    console.log("[askJungleTalkAI] 서버 연결 실패, 더미 데이터 사용", error.message);
    // 백엔드 서버 다운 시 더미 데이터 반환
    return {
      question: question,
      answer: "죄송합니다. 현재 서버에 일시적인 문제가 있어 답변을 제공할 수 없습니다. 잠시 후 다시 시도해주세요.",
      constitution: "서버 연결 문제로 관련 법 조항을 불러올 수 없습니다."
    };
  }
}