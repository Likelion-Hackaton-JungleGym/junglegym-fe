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
    console.log("📋 뉴스레터 목록 API 응답:", res?.data);

    const arr = Array.isArray(res?.data?.data) ? res.data.data : [];

    return arr.map((it) => ({
      ...it,
      // 목록에서는 newsletterId를 id로 매핑 (라우팅과 호환성을 위해)
      id: it.newsletterId,
      thumbnail: it.thumbnailImg || youtubeThumb(it.link) || "/placeholder.png",
    }));
  } catch (error) {
    console.error("뉴스레터 목록 실패:", error?.userMessage || error);
    throw error;
  }
};

// 상세 - 다른 API 패턴들을 시도
export const getNewsletterDetail = async (newsletterId) => {
  if (!newsletterId) throw new Error("Invalid newsletterId");

  console.log("🔍 뉴스레터 상세 요청 ID:", newsletterId, typeof newsletterId);

  try {
    // 방법 1: 다양한 엔드포인트 패턴 시도
    const possibleEndpoints = [
      `/regions/newsletters/${newsletterId}/detail`, // 상세 전용
      `/regions/newsletters/detail/${newsletterId}`, // 다른 패턴
      `/regions/newsletters/${newsletterId}`, // 현재 시도했던 것
      `/newsletters/${newsletterId}`, // regions 없이
      `/newsletters/detail/${newsletterId}`, // newsletters만
    ];

    for (const endpoint of possibleEndpoints) {
      try {
        console.log(`📍 시도: ${endpoint}`);
        const res = await api.get(endpoint);
        console.log(`✅ 성공: ${endpoint}`, res?.data);

        const raw = res?.data?.data;
        if (raw) {
          return {
            ...raw,
            id: raw.id || raw.newsletterId || newsletterId,
            newsletterId: raw.newsletterId || raw.id || newsletterId,
            thumbnail:
              clean(raw.thumbnailUrl) ||
              clean(raw.thumbnailImg) ||
              youtubeThumb(clean(raw.link)) ||
              "/placeholder.png",
            thumbnailUrl: clean(raw.thumbnailUrl) || clean(raw.thumbnailImg),
          };
        }
      } catch (endpointError) {
        console.log(`❌ 실패: ${endpoint} (${endpointError?.response?.status})`);
        continue;
      }
    }

    // 방법 2: 쿼리 파라미터 방식들 시도
    const queryMethods = [
      { params: { newsletterId } },
      { params: { id: newsletterId } },
      { params: { newsletter_id: newsletterId } },
    ];

    for (const queryParam of queryMethods) {
      try {
        console.log("📍 쿼리 파라미터 시도:", queryParam);
        const res = await api.get("/regions/newsletters", queryParam);
        console.log("✅ 쿼리 성공:", res?.data);

        const payload = res?.data?.data;
        if (Array.isArray(payload) && payload.length > 0) {
          // 단일 결과를 찾거나 첫 번째 사용
          const item =
            payload.length === 1
              ? payload[0]
              : payload.find((it) => String(it.newsletterId || it.id) === String(newsletterId)) ||
                payload[0];

          if (item) {
            return {
              ...item,
              id: item.newsletterId || item.id,
              newsletterId: item.newsletterId || item.id,
              thumbnail:
                clean(item.thumbnailUrl) ||
                clean(item.thumbnailImg) ||
                youtubeThumb(clean(item.link)) ||
                "/placeholder.png",
              thumbnailUrl: clean(item.thumbnailUrl) || clean(item.thumbnailImg),
            };
          }
        }
      } catch (queryError) {
        console.log("❌ 쿼리 실패:", queryError?.response?.status);
        continue;
      }
    }

    // 방법 3: 목록에서 필터링 (fallback)
    console.log("📍 최종 방법: 목록에서 필터링");
    const res = await api.get("/regions/newsletters");
    const arr = Array.isArray(res?.data?.data) ? res.data.data : [];
    const key = String(newsletterId);
    const found = arr.find((it) => String(it.newsletterId) === key);

    if (found) {
      console.log("✅ 목록에서 찾음 (제한된 데이터):", found);
      return {
        ...found,
        id: found.newsletterId,
        newsletterId: found.newsletterId,
        thumbnail:
          clean(found.thumbnailImg) || youtubeThumb(clean(found.link)) || "/placeholder.png",
        thumbnailUrl: clean(found.thumbnailImg),
        // 목록에 없는 필드들은 빈 값으로 설정
        mediaImgUrl: null,
        inTitle: null,
        subtitle1: null,
        subtitle2: null,
        content2: null,
        todayQuestion: null,
        titleQuestion: null,
        questionContent: null,
      };
    }

    console.error("❌ 모든 방법 실패");
    return null;
  } catch (error) {
    console.error("뉴스레터 상세 전체 실패:", {
      message: error?.message,
      status: error?.response?.status,
      data: error?.response?.data,
      userMessage: error?.userMessage,
    });
    throw error;
  }
};
