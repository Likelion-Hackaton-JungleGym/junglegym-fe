import axios from "axios";

// API 기본 설정
const api = axios.create({
  baseURL: "", // 프록시 설정 사용 (vite.config.js에서 /api -> https://junglegym.kr로 프록시)
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

/**
 * 특정 정치인 정보 조회 API
 * @param {string|number} politicianId - 정치인 ID
 * @returns {Promise<Object>} 정치인 상세 정보
 */
export const getPoliticianById = async (politicianId) => {
  try {
    console.log('정치인 정보 조회 API 호출:', politicianId);
    console.log('요청 URL:', `${api.defaults.baseURL}/api/politician/${politicianId}`);

    const response = await api.get(`/api/politician/${politicianId}`);

    console.log('정치인 정보 API 응답:', response.data);

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || '정치인 정보 조회 실패');
    }
  } catch (error) {
    console.error('정치인 정보 조회 오류:', error);
    console.error('에러 상세:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: error.config
    });

    // 서버 에러 시 에러를 그대로 던짐
    if (error.response?.status === 500) {
      throw new Error('서버 내부 오류가 발생했습니다.');
    }

    // 에러 타입별 처리
    if (error.code === 'ERR_NETWORK') {
      throw new Error('네트워크 연결에 실패했습니다. 서버가 실행 중인지 확인해주세요.');
    }
    if (error.response?.status === 404) {
      throw new Error('해당 정치인 정보를 찾을 수 없습니다.');
    } else if (error.response?.status === 403) {
      throw new Error('접근이 거부되었습니다.');
    }
    
    throw error;
  }
};

/**
 * 지역별 정치인 리스트 조회 API
 * @returns {Promise<Array>} 정치인 리스트
 */
export const getPoliticiansByRegion = async () => {
  try {
    console.log('지역별 정치인 리스트 조회 API 호출');
    console.log('요청 URL:', `${api.defaults.baseURL}/api/regions/politicians`);

    const response = await api.get(`/api/regions/politicians`);

    console.log('지역별 정치인 리스트 API 응답:', response.data);

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || '지역별 정치인 리스트 조회 실패');
    }
  } catch (error) {
    console.error('지역별 정치인 리스트 조회 오류:', error);
    
    // 서버 에러 시 에러를 그대로 던짐
    if (error.response?.status === 500 || error.response?.status === 400) {
      throw new Error('지역별 정치인 리스트 조회에 실패했습니다.');
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

  // careerSummary를 학력과 경력으로 분리 (임시 로직)
  const careerParts = apiData.careerSummary ? apiData.careerSummary.split('~~') : [];
  const education = careerParts.length > 0 ? [careerParts[0].trim()] : [];
  const experience = careerParts.length > 1 ? [careerParts[1].trim()] : [];

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
    issues: [], // API에서 최근 이슈 정보가 오면 설정
    sns: {
      facebook: "",
      instagram: "",
      blog: "",
      twitter: ""
    },

    // 공약 이행 탭 (API에서 오는 정보가 있으면 설정)
    promiseProgress: {
      completed: 0,
      continued: 0,
      normal: 0,
      notImplemented: 0,
      total: 0
    },
    keyPromises: [],
    otherActivities: [],

    // 재산 및 전과 탭 (API에서 오는 정보가 있으면 설정)
    assets: {
      total: "—",
      debt: "—",
      net: "—",
      year: new Date().getFullYear().toString(),
      details: []
    },
    crimes: {
      count: 0,
      items: []
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
    regionText: apiData.regionText
  };
};

/**
 * 에러 처리를 위한 폴백 데이터 반환
 * @returns {Object} 기본 더미 데이터
 */
export const getFallbackData = () => {
  return {
    basicInfo: {
      birth: "1960.02.18",
      ageSummary: "총 2선",
      ageDetail1: "민선 7기",
      ageDetail2: "민선 8기",
      committee: "외교통일 위원회",
      military: "육군 하사",
    },
    education: [
      "고려대학교 정책대학원 행정학 석사",
      "한국방송통신대학교 사회과학대학 행정학 학사", 
      "정읍제일고등학교",
      "덕천초등학교"
    ],
    experience: [
      "성북구의회 의원",
      "국회사무처 보좌관",
      "더불어민주당 서울시당",
      "한성대학교 겸임교수",
      "서울시구청장협의회 부회장"
    ],
    issues: [
      { title: "성북복지재단 초대 이사장 윤재성씨 임명", link: "" },
      { title: "소비쿠폰 현장 점검 나서며 민생 회복 강조", link: "" },
      { title: "생활 현안 직접 점검, 현장행정 본격화", link: "" }
    ],
    sns: { facebook: "", instagram: "", blog: "", twitter: "" },
    promiseProgress: {
      completed: 22,
      continued: 25,
      normal: 30,
      notImplemented: 30,
      total: 77
    },
    keyPromises: [
      { category: "복지", text: "1인 가구를 위한 맞춤형 지원센터를 운영하겠습니다", status: "normal" },
      { category: "경제", text: "청년 스마트 창업센터를 구축하고 창업 거리를 활성화하겠습니다", status: "completed" },
      { category: "환경", text: "정릉천과 성북천을 생태하천으로 복원하겠습니다", status: "continued" },
      { category: "문화", text: "문화예술교육센터를 설립해 모두가 참여하는 문화도시를 만들겠습니다", status: "normal" },
      { category: "안전", text: "공공 CCTV 확대와 범죄 예방 시스템으로 일상을 더 안전하게 만들겠습니다", status: "hold" }
    ],
    otherActivities: [
      { title: "세계 지방정부 기후총회 발표", link: "" },
      { title: "'지자체 혁신평가' 대상 수상", link: "" },
      { title: "현장 중심 민생행정 추구", link: "" }
    ],
    assets: {
      total: "50.35억원",
      debt: "13.8억원", 
      net: "36.55억원",
      year: "2024",
      details: ["예금 —", "부동산 —", "차량 —"],
    },
    crimes: {
      count: 3,
      items: [
        { title: "무고 공무원자격사칭", penalty: "벌금 1,500,000원" },
        { title: "도로교통법위반(음주운전)", penalty: "벌금 1,500,000원" },
        { title: "공용물건손상 특수공무집행방해", penalty: "벌금 5,500,000원" }
      ],
    },
    bills: [
      { 
        title: "항공안전법 일부개정법률안", 
        date: "2025.08.01", 
        status: "대표발의",
        mainProposer: "김와와",
        coProposers: ["이라라", "박모모", "최낭낭", "윤명명", "김흑흑", "이라라", "박모모", "최냥냥", "윤명명", "김흑흑"]
      },
    ]
  };
};

export default api; 