// src/pages/peopledetail/ProfileDetails.jsx
import { useState, useMemo, useEffect } from "react";
import styled from "styled-components";

// 탭 네비게이션
import ProfileTabs, { TABS } from "./ProfileTabs.jsx";

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

    // 숫자를 한국어 금액 형식으로 변환 (단위: 만원)
    const formatCurrency = (amount) => {
      if (!amount && amount !== 0) return "—";
      
      const num = Number(amount);
      if (isNaN(num)) return "—";
      
      if (num >= 10000) {
        return `${(num / 10000).toFixed(1)}억원`;
      } else {
        return `${num}만원`;
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
      title: record.title,
      penalty: `벌금 ${record.fine.toLocaleString()}원`
    }));

    return {
      count: items.length,
      items: items
    };
  }, [criminalRecordData]);

  // 실제 데이터 + 더미를 합성한 결과
  const data = useMemo(() => {
    const sourceData = apiData || {};

    return {
      ...sourceData,

      // 기본 프로필 탭
      basicInfo: fillObj(sourceData.basicInfo, DUMMY.basicInfo),
      education: fillArr(sourceData.education, DUMMY.education),
      experience: fillArr(sourceData.experience, DUMMY.experience),
      issues: fillArr(issuesData || sourceData.issues, DUMMY.issues),
      sns: fillObj(transformedSnsData, DUMMY.sns),

      // 공약 이행 탭
      promiseProgress: fillObj(sourceData.promiseProgress, DUMMY.promiseProgress),
      keyPromises: fillArr(sourceData.keyPromises, DUMMY.keyPromises),
      otherActivities: fillArr(sourceData.otherActivities, DUMMY.otherActivities),

      // 재산 및 전과 탭
      assets: fillObj(transformedPropertyData, DUMMY.assets),
      crimes: fillObj(transformedCriminalRecordData, DUMMY.crimes),

      // 발의법률 탭
      bills: fillArr(sourceData.bills, DUMMY.bills),
    };
  }, [apiData, issuesData, transformedSnsData, transformedPropertyData, transformedCriminalRecordData]);

  // Career 섹션용 원문 문자열: 상위 politician > apiData > DUMMY 순서로 폴백
  const careerRaw = useMemo(() => {
    return politician?.careerSummary ?? apiData?.careerSummary ?? DUMMY?.careerSummary ?? "";
  }, [politician, apiData]);

  return (
    <Root>
      <ProfileTabs active={active} onChange={setActive} />

      {/* 로딩 인디케이터 */}
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            fontSize: "12px",
            color: "#666",
            background: "#f0f0f0",
            borderRadius: "8px",
            margin: "0 0 16px 0",
          }}
        >
          정치인 정보를 불러오는 중...
        </div>
      )}

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
          <PromiseProgress progressData={data.promiseProgress} />
          <KeyPromises keyPromises={data.keyPromises} />
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
          <Bills bills={data.bills} />
        </SectionList>
      )}
    </Root>
  );
}

// Styled Components
const Root = styled.div`
  padding: 20px;
  background: #fff;
  min-height: 100vh;
`;

const SectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
