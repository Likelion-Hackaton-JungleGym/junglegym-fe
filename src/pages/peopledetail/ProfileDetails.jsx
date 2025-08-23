// src/pages/peopledetail/ProfileDetails.jsx
import { useState, useMemo, useEffect } from "react";
import styled from "styled-components";

// 탭 네비게이션
import ProfileTabs, { TABS } from "./ProfileTabs.jsx";

// 로딩 컴포넌트
import LoadingScreen from "../../shared/components/LoadingScreen.jsx";

// 10개 섹션 컴포넌트들
import BasicInfo from "./sections/BasicInfo.jsx";
import Career from "./sections/Career.jsx";
import RecentIssues from "./sections/RecentIssues.jsx";
import SNSLinks from "./sections/SNSLinks.jsx";
import PromiseProgress from "./sections/PromiseProgress.jsx";
import KeyPromises from "./sections/KeyPromises.jsx";
import OtherActivities from "./sections/OtherActivities.jsx";
import Assets from "./sections/Assets.jsx";
import Crimes from "./sections/Crimes.jsx";
import Bills from "./sections/Bills.jsx";

// API 연동
import {
  getPoliticianById,
  getPoliticianIssues,
  getPoliticianHomepages,
  getPoliticianProperty,
  getPoliticianCriminalRecord,
  getPoliticianBills,
  getPoliticianPromises,
  getPoliticianActivities,
  getPoliticianPromiseCategories,
  transformPoliticianData,
  getFallbackData,
} from "../../shared/utils/politicianApi.js";

// 더미 데이터 (폴백용)
const DUMMY = getFallbackData();

// 헬퍼 함수
function fillArr(arr, dummy) {
  return Array.isArray(arr) && arr.length > 0 ? arr : dummy;
}
function hasSome(obj) {
  return !!obj && Object.values(obj).some(Boolean);
}
function fillObj(obj, dummy) {
  return hasSome(obj) ? { ...dummy, ...obj } : dummy;
}

export default function ProfileDetails({ politicianId, politician }) {
  const [active, setActive] = useState(TABS.BASIC);
  const [apiData, setApiData] = useState(null);
  const [issuesData, setIssuesData] = useState(null);
  const [snsData, setSnsData] = useState(null);
  const [propertyData, setPropertyData] = useState(null);
  const [criminalRecordData, setCriminalRecordData] = useState(null);
  const [billsData, setBillsData] = useState(null);
  const [currentBillsPage, setCurrentBillsPage] = useState(1);
  const [promisesData, setPromisesData] = useState(null);
  const [activitiesData, setActivitiesData] = useState(null);
  const [promiseCategoriesData, setPromiseCategoriesData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState(null);

  // API 호출 (상위에서 politician을 내려주면 우선 사용)
  useEffect(() => {
    const fetchPoliticianData = async () => {
      if (!politicianId) return;

      // 상위에서 이미 상세 객체를 내려준 경우 API 호출 생략
      if (politician) {
        setApiData(politician);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await getPoliticianById(politicianId);
        const transformedData = transformPoliticianData(response);
        setApiData(transformedData);
      } catch (err) {
        // 폴백은 아래 memo 단계에서 처리
        setError(err?.message || "failed");
        setApiData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoliticianData();
  }, [politicianId, politician]);

  // 최근 이슈 API 호출
  useEffect(() => {
    const fetchIssuesData = async () => {
      if (!politicianId) return;

      try {
        const issues = await getPoliticianIssues(politicianId);
        setIssuesData(issues);
      } catch (err) {
        console.error('최근 이슈 조회 실패:', err);
        setIssuesData([]);
      }
    };

    fetchIssuesData();
  }, [politicianId]);

  // SNS/홈페이지 API 호출
  useEffect(() => {
    const fetchSnsData = async () => {
      if (!politicianId) return;

      try {
        const homepages = await getPoliticianHomepages(politicianId);
        setSnsData(homepages);
      } catch (err) {
        console.error('SNS/홈페이지 조회 실패:', err);
        setSnsData([]);
      }
    };

    fetchSnsData();
  }, [politicianId]);

  // 재산 정보 API 호출
  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!politicianId) return;

      try {
        const property = await getPoliticianProperty(politicianId);
        setPropertyData(property); // null이면 재산 정보 없음
      } catch (err) {
        console.error('재산 정보 조회 실패:', err);
        setPropertyData(null);
      }
    };

    fetchPropertyData();
  }, [politicianId]);

  // 전과 기록 API 호출
  useEffect(() => {
    const fetchCriminalRecordData = async () => {
      if (!politicianId) return;

      try {
        const criminalRecord = await getPoliticianCriminalRecord(politicianId);
        setCriminalRecordData(criminalRecord); // null이면 전과 기록 없음
      } catch (err) {
        console.error('전과 기록 조회 실패:', err);
        setCriminalRecordData(null);
      }
    };

    fetchCriminalRecordData();
  }, [politicianId]);

  // 발의법률안 API 호출
  useEffect(() => {
    const fetchBillsData = async () => {
      if (!politicianId) return;

      try {
        const bills = await getPoliticianBills(politicianId, currentBillsPage, 10); // 현재 페이지, 10개씩
        setBillsData(bills); // null이면 발의법률안 없음
      } catch (err) {
        console.error('발의법률안 조회 실패:', err);
        setBillsData(null);
      }
    };

    fetchBillsData();
  }, [politicianId, currentBillsPage]);

  // 공약 사업 이행 현황 API 호출
  useEffect(() => {
    const fetchPromisesData = async () => {
      if (!politicianId) return;

      try {
        const promises = await getPoliticianPromises(politicianId);
        setPromisesData(promises); // null이면 공약 사업 이행 현황 없음
      } catch (err) {
        console.error('공약 사업 이행 현황 조회 실패:', err);
        setPromisesData(null);
      }
    };

    fetchPromisesData();
  }, [politicianId]);

  // 공약 외 활동 뉴스 API 호출
  useEffect(() => {
    const fetchActivitiesData = async () => {
      if (!politicianId) return;

      try {
        const activities = await getPoliticianActivities(politicianId);
        setActivitiesData(activities); // null이면 공약 외 활동 뉴스 없음
      } catch (err) {
        console.error('공약 외 활동 뉴스 조회 실패:', err);
        setActivitiesData(null);
      }
    };

    fetchActivitiesData();
  }, [politicianId]);

  // 공약 카테고리 목록 API 호출
  useEffect(() => {
    const fetchPromiseCategoriesData = async () => {
      if (!politicianId) return;

      try {
        const categories = await getPoliticianPromiseCategories(politicianId);
        setPromiseCategoriesData(categories); // null이면 공약 카테고리 없음
      } catch (err) {
        console.error('공약 카테고리 목록 조회 실패:', err);
        setPromiseCategoriesData(null);
      }
    };

    fetchPromiseCategoriesData();
  }, [politicianId]);

  // SNS 데이터를 컴포넌트 형식으로 변환
  const transformedSnsData = useMemo(() => {
    if (!snsData || !Array.isArray(snsData)) {
      return DUMMY.sns;
    }

    const snsMap = {
      facebook: "",
      instagram: "",
      blog: "",
      twitter: ""
    };

    snsData.forEach(item => {
      const linkType = item.linkType;
      if (linkType === '인스타그램' || linkType === 'INSTAGRAM') {
        snsMap.instagram = item.link;
      } else if (linkType === '페이스북' || linkType === 'FACEBOOK') {
        snsMap.facebook = item.link;
      } else if (linkType === '트위터' || linkType === 'TWITTER') {
        snsMap.twitter = item.link;
      } else if (linkType === '블로그' || linkType === 'BLOG' || linkType === '홈페이지' || linkType === 'HOMEPAGE') {
        snsMap.blog = item.link;
      }
    });

    return snsMap;
  }, [snsData]);

  // 재산 정보 데이터를 컴포넌트 형식으로 변환
  const transformedPropertyData = useMemo(() => {
    if (!propertyData) {
      // 재산 정보가 없으면 빈 객체 반환 (Assets 컴포넌트에서 "아직 등록된 정보가 없어요" 표시)
      return {
        count: 0,
        items: []
      };
    }

    // 숫자를 한국어 금액 형식으로 변환 (단위: 원 → 억원)
    const formatCurrency = (amount) => {
      if (!amount && amount !== 0) return "—";
      
      const num = Number(amount);
      if (isNaN(num)) return "—";
      
      // 원 단위를 억원 단위로 변환
      const billion = num / 100000000; // 1억 = 100,000,000원
      
      if (billion >= 1) {
        // 억 단위: 소수점 첫째 자리까지 표시
        return `${billion.toFixed(1)}억원`;
      } else if (billion >= 0.01) {
        // 천만원 단위: 소수점 첫째 자리까지 표시
        return `${(billion * 10).toFixed(1)}천만원`;
      } else if (billion >= 0.001) {
        // 백만원 단위: 소수점 첫째 자리까지 표시
        return `${(billion * 100).toFixed(1)}백만원`;
      } else {
        // 그 이하: 만원 단위로 표시
        return `${Math.round(num / 10000)}만원`;
      }
    };

    return {
      total: formatCurrency(propertyData.totalCapital),
      debt: formatCurrency(propertyData.totalDebt),
      net: formatCurrency(propertyData.capital),
      year: new Date().getFullYear().toString(),
      details: []
    };
  }, [propertyData]);

  // 전과 기록 데이터를 컴포넌트 형식으로 변환
  const transformedCriminalRecordData = useMemo(() => {
    if (!criminalRecordData) {
      // 전과 기록이 없으면 빈 객체 반환 (Crimes 컴포넌트에서 "아직 등록된 정보가 없어요" 표시)
      return {
        count: 0,
        items: []
      };
    }

    // API 데이터를 컴포넌트 형식으로 변환
    const items = criminalRecordData.map(record => ({
      title: record.title || '제목 정보 없음',
      penalty: record.fine ? `벌금 ${record.fine.toLocaleString()}원` : '벌금 정보 없음'
    }));

    return {
      count: items.length,
      items: items
    };
  }, [criminalRecordData]);

  // 발의법률안 데이터를 컴포넌트 형식으로 변환
  const transformedBillsData = useMemo(() => {
    if (!billsData || !billsData.items || billsData.items.length === 0) {
      // 발의법률안이 없으면 빈 배열 반환 (Bills 컴포넌트에서 "아직 등록된 정보가 없어요" 표시)
      return [];
    }

    // API 데이터를 컴포넌트 형식으로 변환
    const bills = billsData.items.map(bill => ({
      // 앞면 데이터
      title: bill.name || '제목 정보 없음',
      date: bill.proposeDate ? bill.proposeDate.replace(/-/g, '.') : "",
      status: "대표발의", // 대표발의자로 고정 (API에서 대표발의자만 조회됨)
      mainProposer: bill.mainProposer || "",
      coProposers: bill.joinProposer ? bill.joinProposer.split(', ') : [],
      detailLink: bill.detailLink || "",
      
      // 뒷면 데이터 (상세 정보)
      category: bill.result || "아직 미확정", // result 값이 null이면 '아직 미확정'으로 표시
      link: bill.detailLink || "",
      details: bill.summaryContent ? bill.summaryContent.split('\n').filter(line => line.trim()) : []
    }));

    return bills;
  }, [billsData]);

  // 공약 사업 이행 현황 데이터 변환
  const transformedPromisesData = useMemo(() => {
    if (!promisesData) {
      // 공약 사업 이행 현황이 없으면 null 반환 (PromiseProgress 컴포넌트에서 "아직 등록된 정보가 없어요" 표시)
      return null;
    }

    // API 데이터를 그대로 사용 (이미 필요한 모든 필드가 포함되어 있음)
    return promisesData;
  }, [promisesData]);

  // 공약 외 활동 뉴스 데이터 변환
  const transformedActivitiesData = useMemo(() => {
    if (!activitiesData) {
      // 공약 외 활동 뉴스가 없으면 빈 배열 반환 (OtherActivities 컴포넌트에서 "아직 등록된 정보가 없어요" 표시)
      return [];
    }

    // API 데이터를 컴포넌트 형식으로 변환
    const activities = activitiesData.map(activity => ({
      title: activity.title || '제목 정보 없음',
      link: activity.link || ''
    }));

    return activities;
  }, [activitiesData]);

  // 기본 정보 데이터 변환
  const transformedBasicInfoData = useMemo(() => {
    if (!apiData) {
      return DUMMY.basicInfo;
    }

    // API 데이터를 컴포넌트 형식으로 변환
    const processRetryUnit = (retryUnit) => {
      if (!retryUnit || retryUnit === "—") return [];
      
      // 쉼표나 줄바꿈으로 분리
      return retryUnit
        .split(/[,\n]/)
        .map(item => item.trim())
        .filter(Boolean);
    };

    return {
      birth: apiData.birth || "—",
      ageSummary: apiData.retryNumber ? `총 ${apiData.retryNumber}선` : "—",
      ageDetails: processRetryUnit(apiData.retryUnit), // 배열로 변환
      ageDetail1: apiData.retryUnit || "—",
      ageDetail2: "", // 추가 정보가 있으면 설정
      committee: apiData.committee || "—",
      military: apiData.military || "—",
    };
  }, [apiData]);

  // 공약 카테고리 데이터 변환
  const transformedPromiseCategoriesData = useMemo(() => {
    if (!promiseCategoriesData) {
      // 공약 카테고리가 없으면 빈 배열 반환 (KeyPromises 컴포넌트에서 "아직 등록된 정보가 없어요" 표시)
      return [];
    }

    // API 데이터를 그대로 사용 (이미 필요한 모든 필드가 포함되어 있음)
    return promiseCategoriesData;
  }, [promiseCategoriesData]);

  // 실제 데이터 + 더미를 합성한 결과
  const data = useMemo(() => {
    const sourceData = apiData || {};

    return {
      ...sourceData,

      // 기본 프로필 탭
      basicInfo: transformedBasicInfoData,
      education: fillArr(sourceData.education, DUMMY.education),
      experience: fillArr(sourceData.experience, DUMMY.experience),
      issues: fillArr(issuesData || sourceData.issues, DUMMY.issues),
      sns: fillObj(transformedSnsData, DUMMY.sns),

      // 공약 이행 탭
      promiseProgress: fillObj(sourceData.promiseProgress, DUMMY.promiseProgress),
      keyPromises: transformedPromiseCategoriesData,
      otherActivities: fillArr(transformedActivitiesData, DUMMY.otherActivities),

      // 재산 및 전과 탭
      assets: fillObj(transformedPropertyData, DUMMY.assets),
      crimes: fillObj(transformedCriminalRecordData, DUMMY.crimes),

      // 발의법률 탭
      bills: transformedBillsData || [],
    };
  }, [apiData, issuesData, transformedSnsData, transformedPropertyData, transformedCriminalRecordData, transformedBillsData, transformedPromisesData, transformedActivitiesData, transformedBasicInfoData, transformedPromiseCategoriesData]);

  // Career 섹션용 원문 문자열: 상위 politician > apiData > DUMMY 순서로 폴백
  const careerRaw = useMemo(() => {
    return politician?.careerSummary ?? apiData?.careerSummary ?? DUMMY?.careerSummary ?? "";
  }, [politician, apiData]);

  // 정치인 직책 확인 (구청장, 시장인 경우 발의법률안 탭 숨김)
  const shouldHideBillsTab = useMemo(() => {
    const roleName = politician?.roleName || apiData?.roleName || "";
    return roleName.includes("구청장") || roleName.includes("시장");
  }, [politician, apiData]);

  // 정치인 직책 확인 (지역 국회의원인 경우 공약 사업 이행 현황 섹션 숨김)
  const shouldHidePromiseProgress = useMemo(() => {
    const roleName = politician?.roleName || apiData?.roleName || "";
    return !roleName.includes("구청장") && !roleName.includes("시장");
  }, [politician, apiData]);

  // 발의법률안 탭이 숨겨진 상태에서 해당 탭이 활성화되어 있으면 기본 프로필 탭으로 전환
  useEffect(() => {
    if (shouldHideBillsTab && active === TABS.BILLS) {
      setActive(TABS.BASIC);
    }
  }, [shouldHideBillsTab, active, setActive]);

  // 로딩 중일 때
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Root>
      <ProfileTabs active={active} onChange={setActive} shouldHideBillsTab={shouldHideBillsTab} />

      {/* 기본 프로필 탭 - 4개 섹션 */}
      {active === TABS.BASIC && (
        <SectionList>
          <BasicInfo basic={data.basicInfo} />
          <Career raw={careerRaw} />
          <RecentIssues issues={data.issues} />
          <SNSLinks sns={data.sns} />
        </SectionList>
      )}

      {/* 공약 이행 탭 - 3개 섹션 */}
      {active === TABS.PROMISES && (
        <SectionList>
          {!shouldHidePromiseProgress && (
            <PromiseProgress promiseData={transformedPromisesData} />
          )}
          <KeyPromises categories={data.keyPromises} />
          <OtherActivities activities={data.otherActivities} />
        </SectionList>
      )}

      {/* 재산 및 전과 탭 - 2개 섹션 */}
      {active === TABS.ASSETS_CRIMES && (
        <SectionList>
          <Assets assets={data.assets} />
          <Crimes crimes={data.crimes} />
        </SectionList>
      )}

                   {/* 발의법률 탭 - 1개 섹션 */}
      {active === TABS.BILLS && (
        <SectionList>
                 <Bills 
                   bills={data.bills} 
                   totalPages={billsData?.totalPages || 1}
                   currentPage={currentBillsPage}
                   onPageChange={setCurrentBillsPage}
                 />
        </SectionList>
      )}
    </Root>
  );
}

// Styled Components
const Root = styled.div`
  padding: 15px 0 20px;
  background: #fff;
  min-height: 100vh;
`;

const SectionList = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
