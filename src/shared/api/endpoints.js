import { api } from "../api/client";
import { DICTIONARY } from "../../pages/jungletown/components/JungleDictionaryData";
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
      desc: item.content, // 상세 설명이 없으니 subtitle 재사용
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
    console.error("사전 데이터 가져오기 실패:", error.userMessage);
    throw error;
  }
};

export const getDictionariesDetail = async (dictionaryId) => {
  try {
    const response = await api.get(`/dictionaries/${dictionaryId}`);
    console.log("✅ 상세 API 응답:", response.data);

    const rawData = response.data.data || {}; // 단일 객체

    // 단일 객체 변환
    const imageData = imageDataMap[rawData.id] || {};
    const mergedData = {
      id: rawData.id,
      // API 데이터
      category: rawData.keyword,
      title: rawData.title,
      subtitle: rawData.subtitle,
      desc: rawData.content, // content 필드 사용
      // 로컬 이미지 데이터
      miniCard: imageData.miniCard || null,
      bigCard: imageData.bigCard || null,
      icon: imageData.icon || null,
      hotRank: imageData.hotRank || null,
    };

    console.log("✅ 합쳐진 상세 데이터:", mergedData);
    return mergedData;
  } catch (error) {
    console.error("상세 데이터 가져오기 실패:", error.userMessage);
    throw error;
  }
};
const youtubeThumb = (link) => {
  const m = link?.match(/(?:v=|youtu\.be\/|shorts\/)([^?&#/]+)/);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : null;
};

const clean = (s) => (typeof s === "string" ? s.trim() : "");

// 목록
export const getNewsletters = async () => {
  try {
    const res = await api.get("/regions/newsletters");
    const arr = Array.isArray(res?.data?.data) ? res.data.data : [];
    // ✅ 최소 공통화: id, thumbnail만 추가
    return arr.map((it) => ({
      ...it,
      id: it.newsletterId, // 공통 id
      thumbnail: it.thumbnailImg || youtubeThumb(it.link) || "/placeholder.png",
    }));
  } catch (error) {
    console.error("뉴스레터 목록 실패:", error?.userMessage || error);
    throw error;
  }
};

// 상세
export const getNewsletterDetail = async (newsletterId) => {
  if (!newsletterId) throw new Error("Invalid newsletterId");

  const res = await api.get("/regions/newsletters", {
    params: { newsletterId },
  });

  const payload = res?.data?.data;
  let raw;
  if (Array.isArray(payload)) {
    const key = String(newsletterId);
    raw = payload.find((it) => String(it.id ?? it.newsletterId) === key);
  } else {
    raw = payload;
  }

  if (!raw) return null;

  return {
    ...raw,
    thumbnail: clean(raw.thumbnailUrl) || youtubeThumb(clean(raw.link)) || "/placeholder.png",
    thumbnailUrl: clean(raw.thumbnailUrl), // 컴포넌트에서도 쓸 수 있게 정리된 값 유지
  };
};
