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
