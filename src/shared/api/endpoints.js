import { api } from "../api/client";
import { DICTIONARY } from "../../pages/jungletown/components/JungleDictionaryData";

/* ---------- JungleDictionary ---------- */

// 로컬 이미지 데이터를 객체로 변환 (id를 키로 사용)
const imageDataMap = DICTIONARY.reduce((acc, item) => {
  acc[item.id] = {
    miniCard: item.miniCard,
    bigCard: item.bigCard,
    icon: item.icon,
    hotRank: item.hotRank,
  };
  return acc;
}, {});

// 데이터 합치는 함수
const mergeDictionaryData = (apiData) => {
  return apiData.map((item) => {
    const imageData = imageDataMap[item.id] || {}; // id로 이미지 데이터 찾기
    return {
      id: item.id,
      // API 데이터
      category: item.keyword,
      title: item.title,
      subtitle: item.subtitle,
      desc: item.content,
      // 로컬 이미지 데이터
      miniCard: imageData.miniCard || null,
      bigCard: imageData.bigCard || null,
      icon: imageData.icon || null,
      hotRank: imageData.hotRank || null,
    };
  });
};

export const getDictionaries = async () => {
  try {
    const response = await api.get("/dictionaries");
    console.log("✅ 원본 API 응답:", response.data);
    const rawData = response.data.data || [];
    const mergedData = mergeDictionaryData(rawData);
    console.log("✅ 합쳐진 데이터:", mergedData);
    return mergedData;
  } catch (error) {
    console.error("사전 데이터 가져오기 실패:", error?.userMessage || error);
    throw error;
  }
};

export const getDictionariesDetail = async (dictionaryId) => {
  try {
    const response = await api.get(`/dictionaries/${dictionaryId}`);
    console.log("✅ 상세 API 응답:", response.data);
    const rawData = response.data.data || {};
    const imageData = imageDataMap[rawData.id] || {};
    const mergedData = {
      id: rawData.id,
      category: rawData.keyword,
      title: rawData.title,
      subtitle: rawData.subtitle,
      desc: rawData.content,
      miniCard: imageData.miniCard || null,
      bigCard: imageData.bigCard || null,
      icon: imageData.icon || null,
      hotRank: imageData.hotRank || null,
    };
    console.log("✅ 합쳐진 상세 데이터:", mergedData);
    return mergedData;
  } catch (error) {
    console.error("상세 데이터 가져오기 실패:", error?.userMessage || error);
    throw error;
  }
};

/* ---------- JungleSound (Newsletters) ---------- */

const youtubeThumb = (link) => {
  const m = link?.match(/(?:v=|youtu\.be\/|shorts\/)([^?&#/]+)/);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : null;
};

const clean = (s) => (typeof s === "string" ? s.trim() : "");

// 목록
export const getNewsletters = async () => {
  try {
    const res = await api.get("/regions/newsletters");
    console.log("📋 뉴스레터 목록 API 응답:", res?.data);

    const arr = Array.isArray(res?.data?.data) ? res.data.data : [];

    return arr.map((it) => ({
      ...it,
      id: it.newsletterId, // 라우팅 호환
      thumbnail:
        clean(it.thumbnailUrl) ||
        clean(it.thumbnailImg) ||
        youtubeThumb(clean(it.link)) ||
        "/placeholder.png",
    }));
  } catch (error) {
    console.error("뉴스레터 목록 실패:", error?.userMessage || error);
    throw error;
  }
};

// 상세 (검증된 엔드포인트 우선 + 목록 폴백)
export const getNewsletterDetail = async (newsletterId) => {
  if (!newsletterId) throw new Error("Invalid newsletterId");
  const idStr = String(newsletterId);

  console.log("🔍 뉴스레터 상세 요청 ID:", idStr, typeof idStr);

  // 1차: 동작 확인된 엔드포인트
  try {
    const res = await api.get(`/newsletters/${idStr}`);
    console.log("✅ 성공: /newsletters/:id", res?.data);
    const raw = res?.data?.data;

    if (raw) {
      return {
        ...raw,
        id: raw.id ?? idStr,
        newsletterId: raw.newsletterId ?? raw.id ?? idStr,
        thumbnail:
          clean(raw.thumbnailUrl) ||
          clean(raw.thumbnailImg) ||
          youtubeThumb(clean(raw.link)) ||
          "/placeholder.png",
        thumbnailUrl: clean(raw.thumbnailUrl) || clean(raw.thumbnailImg),
      };
    }
  } catch (e) {
    console.log("❌ /newsletters/:id 실패, 목록 폴백 시도", e?.response?.status);
  }

  // 2차: 목록 폴백
  try {
    console.log("📍 목록에서 필터링 폴백");
    const res = await api.get("/regions/newsletters");
    const arr = Array.isArray(res?.data?.data) ? res.data.data : [];
    const found = arr.find((it) => String(it.newsletterId || it.id) === idStr);

    if (found) {
      console.log("✅ 목록에서 찾음 (제한된 데이터):", found);
      return {
        ...found,
        id: found.newsletterId || found.id || idStr,
        newsletterId: found.newsletterId || found.id || idStr,
        thumbnail:
          clean(found.thumbnailUrl) ||
          clean(found.thumbnailImg) ||
          youtubeThumb(clean(found.link)) ||
          "/placeholder.png",
        thumbnailUrl: clean(found.thumbnailUrl) || clean(found.thumbnailImg),
        // 목록에 없는 필드들은 빈 값
        mediaImgUrl: found.mediaImgUrl ?? null,
        inTitle: null,
        subtitle1: null,
        subtitle2: null,
        content2: null,
        todayQuestion: null,
        titleQuestion: null,
        questionContent: null,
      };
    }
  } catch (fallbackErr) {
    console.log("❌ 목록 폴백도 실패:", fallbackErr?.response?.status);
  }

  console.error("❌ 모든 방법 실패");
  return null;
};
