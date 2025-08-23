import axios from "axios";

// API 기본 설정
const api = axios.create({
  baseURL: "", // 프록시 설정 사용 (vite.config.js에서 /api -> https://junglegym.kr로 프록시)
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * 특정 정치인 정보 조회 API
 * @param {string|number} politicianId - 정치인 ID
 * @returns {Promise<Object>} 정치인 상세 정보
 */
export const getPoliticianById = async (politicianId) => {
  try {
    const response = await api.get(`/api/politician/${politicianId}`);

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "정치인 정보 조회 실패");
    }
  } catch (error) {
    if (error.response?.status === 500) {
      throw new Error("서버 내부 오류가 발생했습니다.");
    }
    if (error.code === "ERR_NETWORK") {
      throw new Error("네트워크 연결에 실패했습니다. 서버가 실행 중인지 확인해주세요.");
    }
    if (error.response?.status === 404) {
      throw new Error("해당 정치인 정보를 찾을 수 없습니다.");
    } else if (error.response?.status === 403) {
      throw new Error("접근이 거부되었습니다.");
    }
    throw error;
  }
};

/**
 * 정치인 발의법률안 조회 API
 * @param {number} politicianId - 정치인 ID
 * @param {number} page - 페이지 번호 (기본값: 1)
 * @param {number} size - 페이지 크기 (기본값: 10)
 * @returns {Promise<Object|null>} 발의법률안 정보 (없으면 null)
 */
export const getPoliticianBills = async (politicianId, page = 1, size = 10) => {
  try {
    const response = await api.get(
      `/api/politicians/${politicianId}/bills?page=${page}&size=${size}`
    );

    if (response.data.success) {
      if (
        !response.data.data ||
        !response.data.data.items ||
        response.data.data.items.length === 0
      ) {
        return null;
      }
      return response.data.data;
    } else {
      if (response.data.code === 404) {
        return null;
      }
      throw new Error(response.data.message || "정치인 발의법률안 조회 실패");
    }
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    if (error.response?.status === 500 || error.response?.status === 400) {
      throw new Error("정치인 발의법률안 조회에 실패했습니다.");
    }
    throw error;
  }
};

/**
 * 정치인 전과 기록 조회 API
 * @param {number} politicianId - 정치인 ID
 * @returns {Promise<Array|null>} 전과 기록 리스트 (없으면 null)
 */
export const getPoliticianCriminalRecord = async (politicianId) => {
  try {
    const response = await api.get(`/api/politician/${politicianId}/criminalRecord`);

    if (response.data.success) {
      if (!response.data.data || response.data.data.length === 0) {
        return null;
      }
      return response.data.data;
    } else {
      if (response.data.code === 404) {
        return null;
      }
      throw new Error(response.data.message || "정치인 전과 기록 조회 실패");
    }
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    if (error.response?.status === 500 || error.response?.status === 400) {
      throw new Error("정치인 전과 기록 조회에 실패했습니다.");
    }
    throw error;
  }
};

/**
 * 정치인 재산 정보 조회 API
 * @param {number} politicianId - 정치인 ID
 * @returns {Promise<Object|null>} 재산 정보 (없으면 null)
 */
export const getPoliticianProperty = async (politicianId) => {
  try {
    const res = await api.get(`/api/politician/${politicianId}/property`);
    return res.data?.success ? res.data.data : null;
  } catch (error) {
    const status = error.response?.status;
    if (status === 404) {
      return null;
    }
    if (status === 400 || status === 500) {
      throw new Error("정치인 재산 정보 조회에 실패했습니다.");
    }
    throw error;
  }
};

/**
 * 정치인 SNS/홈페이지 조회 API
 * @param {number} politicianId - 정치인 ID
 * @returns {Promise<Array>} SNS/홈페이지 리스트
 */
export const getPoliticianHomepages = async (politicianId) => {
  try {
    const response = await api.get(`/api/politician/${politicianId}/homepages`);

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "정치인 SNS/홈페이지 조회 실패");
    }
  } catch (error) {
    if (error.response?.status === 500 || error.response?.status === 400) {
      throw new Error("정치인 SNS/홈페이지 조회에 실패했습니다.");
    }
    throw error;
  }
};

/**
 * 정치인 최근 이슈 조회 API
 * @param {number} politicianId - 정치인 ID
 * @returns {Promise<Array>} 최근 이슈 리스트
 */
export const getPoliticianIssues = async (politicianId) => {
  try {
    const response = await api.get(`/api/politicians/${politicianId}/issues`);

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "정치인 최근 이슈 조회 실패");
    }
  } catch (error) {
    if (error.response?.status === 500 || error.response?.status === 400) {
      throw new Error("정치인 최근 이슈 조회에 실패했습니다.");
    }
    throw error;
  }
};

/**
 * 정치인 공약 사업 이행 현황 조회 API
 * @param {number} politicianId - 정치인 ID
 * @returns {Promise<Object|null>} 공약 사업 이행 현황 (없으면 null)
 */
export const getPoliticianPromises = async (politicianId) => {
  try {
    const response = await api.get(`/api/politicians/${politicianId}/promises/summary`);

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "정치인 공약 사업 이행 현황 조회 실패");
    }
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    if (error.response?.status === 500 || error.response?.status === 400) {
      throw new Error("정치인 공약 사업 이행 현황 조회에 실패했습니다.");
    }
    throw error;
  }
};

/**
 * 정치인 공약 외 활동 뉴스 조회 API
 * @param {number} politicianId - 정치인 ID
 * @returns {Promise<Array|null>} 공약 외 활동 뉴스 리스트 (없으면 null)
 */
export const getPoliticianActivities = async (politicianId) => {
  try {
    const response = await api.get(`/api/politicians/${politicianId}/activities`);

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "정치인 공약 외 활동 뉴스 조회 실패");
    }
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    if (error.response?.status === 500 || error.response?.status === 400) {
      throw new Error("정치인 공약 외 활동 뉴스 조회에 실패했습니다.");
    }
    throw error;
  }
};

/**
 * 정치인 공약 카테고리 목록 조회 API
 * @param {number} politicianId - 정치인 ID
 * @returns {Promise<Array|null>} 공약 카테고리 리스트 (없으면 null)
 */
export const getPoliticianPromiseCategories = async (politicianId) => {
  try {
    const response = await api.get(`/api/politicians/${politicianId}/promises/categories`);

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "정치인 공약 카테고리 목록 조회 실패");
    }
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    if (error.response?.status === 500 || error.response?.status === 400) {
      throw new Error("정치인 공약 카테고리 목록 조회에 실패했습니다.");
    }
    throw error;
  }
};

/**
 * 공약 카테고리 상세 공약 목록 조회 API
 * @param {number} categoryId - 카테고리 ID
 * @returns {Promise<Array|null>} 상세 공약 리스트 (없으면 null)
 */
export const getCategoryPromises = async (categoryId) => {
  try {
    const response = await api.get(`/api/categories/${categoryId}/promises`);

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "공약 카테고리 상세 공약 목록 조회 실패");
    }
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    if (error.response?.status === 500 || error.response?.status === 400) {
      throw new Error("공약 카테고리 상세 공약 목록 조회에 실패했습니다.");
    }
    throw error;
  }
};

/**
 * 모든 지역구 목록 조회 API
 * @returns {Promise<Array>} 지역구 목록
 */
export const getAllRegions = async () => {
  try {
    const response = await api.get(`/api/regions/politicians`);
    
    if (response.data.success) {
      const politicians = response.data.data || [];
      const regionSet = new Set();
      
      politicians.forEach(politician => {
        if (politician.regionText) {
          const regions = politician.regionText.split(',').map(r => r.trim());
          regions.forEach(region => {
            if (region) regionSet.add(region);
          });
        }
        
        if (politician.regionList && Array.isArray(politician.regionList)) {
          politician.regionList.forEach(region => {
            if (region) regionSet.add(region);
          });
        }
      });
      
      const regions = Array.from(regionSet).sort();
      
      return regions.length > 0 ? regions : [
        "종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구", "성북구", 
        "강북구", "도봉구", "노원구", "은평구", "서대문구", "마포구", "양천구", "강서구", 
        "구로구", "금천구", "영등포구", "동작구", "관악구", "서초구", "강남구", "송파구", "강동구"
      ];
    } else {
      throw new Error(response.data.message || "지역구 목록 조회 실패");
    }
  } catch (error) {
    if (error.response?.status === 500 || error.response?.status === 400) {
      return [
        "종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구", "성북구", 
        "강북구", "도봉구", "노원구", "은평구", "서대문구", "마포구", "양천구", "강서구", 
        "구로구", "금천구", "영등포구", "동작구", "관악구", "서초구", "강남구", "송파구", "강동구"
      ];
    }
    throw error;
  }
};

/**
 * 지역별 정치인 리스트 조회 API
 * @param {string} regionName - 지역구명 (선택사항)
 * @returns {Promise<Array>} 정치인 리스트
 */
export const getPoliticiansByRegion = async (regionName = '성북구') => {
  try {
    let url = `/api/regions/politicians`;
    if (regionName) {
      url += `?regionName=${encodeURIComponent(regionName)}`;
    }

    const response = await api.get(url);

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "지역별 정치인 리스트 조회 실패");
    }
  } catch (error) {
    if (error.response?.status === 500 || error.response?.status === 400) {
      throw new Error("지역별 정치인 리스트 조회에 실패했습니다.");
    }
    throw error;
  }
};

/**
 * API 응답 데이터를 ProfileDetails 컴포넌트 형식으로 변환
 * @param {Object} apiData - API 응답 데이터
 * @returns {Object} ProfileDetails에서 사용할 형식
 */
export const transformPoliticianData = (apiData) => {
  if (!apiData) return null;

  // careerSummary를 학력, 경력, 저서로 분리
  let education = [];
  let experience = [];
  let books = [];

  if (apiData.careerSummary) {
    const careerText = apiData.careerSummary.replace(/\r\n/g, "\n");
    const sections = careerText.split("\n\n");

    sections.forEach((section) => {
      const lines = section.split("\n").filter((line) => line.trim());
      if (lines.length === 0) return;

      const title = lines[0].trim();
      const content = lines
        .slice(1)
        .map((line) => line.trim())
        .filter((line) => line);

      if (title.includes("학력")) {
        education = content;
      } else if (title.includes("주요경력") || title.includes("경력")) {
        experience = content;
      } else if (title.includes("저서")) {
        books = content;
      }
    });
  }

  return {
    // 기본 프로필 탭
    basicInfo: {
      birth: apiData.birth || "—",
      ageSummary: apiData.retryNumber ? `총 ${apiData.retryNumber}선` : "—",
      ageDetail1: apiData.retryUnit || "—",
      ageDetail2: "", // 추가 정보가 있으면 설정
      committee: apiData.committee || "—",
      military: apiData.military || "—",
    },
    education: education,
    experience: experience,
    issues: [], // 최근 이슈는 별도 API로 조회
    sns: {
      facebook: "",
      instagram: "",
      blog: "",
      twitter: "",
    },

    // 공약 이행 탭 (API에서 오는 정보가 있으면 설정)
    promiseProgress: {
      completed: 0,
      continued: 0,
      normal: 0,
      notImplemented: 0,
      total: 0,
    },
    keyPromises: [],
    otherActivities: [],

    // 재산 및 전과 탭 (API에서 오는 정보가 있으면 설정)
    assets: {
      total: "—",
      debt: "—",
      net: "—",
      year: new Date().getFullYear().toString(),
      details: [],
    },
    crimes: {
      count: 0,
      items: [],
    },

    // 발의법률 탭 (API에서 오는 정보가 있으면 설정)
    bills: [],

    // 추가 정보
    id: apiData.id,
    name: apiData.name,
    regionName: apiData.regionName,
    polyName: apiData.polyName,
    profileImg: apiData.profileImg,
    roleName: apiData.roleName,
    regionText: apiData.regionText,
  };
};



export default api;
