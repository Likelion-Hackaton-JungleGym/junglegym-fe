import { api } from "./client";

const transformDictionaryData = (apiData) => {
  return apiData.map((item) => ({
    // 컴포넌트가 사용하는 필드명: API 필드명
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    category: item.keyword,
    //desc: item.detail_description,
    //icon: item.thumbnail_url,
    //miniCard: item.thumbnail_url,
    //bigCard: item.detail_image_url,
    //hotRank: item.is_hot ? "/hot-icon.png" : null,
  }));
};

export const getDictionaries = async () => {
  try {
    const response = await api.get("/dictionaries");
    console.log("✅ 원본 API 응답:", response.data);

    const rawData = response.data.data || [];
    const transformedData = transformDictionaryData(rawData);

    console.log("✅ 변환된 데이터:", transformedData);
    return transformedData;
  } catch (error) {
    console.error("사전 데이터 가져오기 실패:", error.userMessage);
    throw error;
  }
};
