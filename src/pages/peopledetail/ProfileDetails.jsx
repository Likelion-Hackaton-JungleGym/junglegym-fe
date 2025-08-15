import { useState, useMemo } from "react";
import ProfileTabs, { TABS } from "./ProfileTabs.jsx";

// 기본 프로필 내부 카드들
import BasicInfo from "./sections/BasicInfo.jsx";
import Career from "./sections/Career.jsx";
import RecentIssues from "./sections/RecentIssues.jsx";
import SNSLinks from "./sections/SNSLinks.jsx";

// 나머지 세 탭 전용 섹션
import Promises from "./sections/Promises.jsx";
import AssetsCrimes from "./sections/AssetsCrimes.jsx";
import Bills from "./sections/Bills.jsx";

import { Root, SectionList, Card, Title, EmptyText } from "./PeopleDetail.styles.js";

/** ⬇ 이 파일 내부에 더미 상수 정의 */
const DUMMY = {
  basicInfo: {
    birth: "1960.02.18",
    ageSummary: "총 2선",
    committee: "외교통일 위원회",
    military: "육군 하사",
  },
  education: ["○○대학교 행정학과 졸업", "△△대학원 정책학 석사"],
  experience: ["지방의회 의원", "국회 보좌관", "정당 시도당 위원"],
  issues: [{ title: "지역 현안 간담회 개최", link: "" }],
  sns: { facebook: "", instagram: "", blog: "", twitter: "" },

  // 탭: 공약 이행 / 재산 및 전과 / 발의법률
  promises: [
    { title: "주거환경 개선", status: "진행중", updatedAt: "2025-07-01", link: "" },
    { title: "교통 인프라 확충", status: "이행", updatedAt: "2025-06-10", link: "" },
  ],
  assets: {
    total: "—",
    year: "2024",
    details: ["예금 —", "부동산 —", "차량 —"],
  },
  crimes: {
    count: 0,
    items: [],
  },
  bills: [
    { title: "지방재정법 일부개정법률안(가칭)", date: "2024-12-01", status: "계류", link: "" },
  ],
};

/** ⬇ “없으면 더미로 채우기” 헬퍼 (간단/자급자족) */
function fillArr(arr, dummy) {
  return Array.isArray(arr) && arr.length > 0 ? arr : dummy;
}
function hasSome(obj) {
  return !!obj && Object.values(obj).some(Boolean);
}
function fillObj(obj, dummy) {
  return hasSome(obj) ? { ...dummy, ...obj } : dummy;
}

export default function ProfileDetails({ person }) {
  const [active, setActive] = useState(TABS.BASIC);

  // 실제 데이터 + 더미를 합성한 결과 (항상 표시 보장)
  const data = useMemo(() => {
    const p = person ?? {};
    return {
      ...p,
      basicInfo: fillObj(p.basicInfo, DUMMY.basicInfo),
      education: fillArr(p.education, DUMMY.education),
      experience: fillArr(p.experience, DUMMY.experience),
      issues: fillArr(p.issues, DUMMY.issues),
      sns: fillObj(p.sns, DUMMY.sns),

      promises: fillArr(p.promises, DUMMY.promises),
      assets: fillObj(p.assets, DUMMY.assets),
      crimes: fillObj(p.crimes, DUMMY.crimes),
      bills: fillArr(p.bills, DUMMY.bills),
    };
  }, [person]);

  return (
    <Root>
      <ProfileTabs active={active} onChange={setActive} />

      {/* 기본 프로필: 카드 스택 */}
      {active === TABS.BASIC && (
        <SectionList>
          <BasicInfo basic={data.basicInfo} />
          <Career education={data.education} experience={data.experience} /> {/* 하나의 카드 */}
          <RecentIssues issues={data.issues} />
          <SNSLinks sns={data.sns} />
        </SectionList>
      )}

      {/* 공약 이행 */}
      {active === TABS.PROMISES && (
        <SectionList>
          {data.promises?.length ? (
            <Promises list={data.promises} />
          ) : (
            <Card>
              <Title>공약 이행</Title>
              <EmptyText>정보 준비 중</EmptyText>
            </Card>
          )}
        </SectionList>
      )}

      {/* 재산 및 전과 */}
      {active === TABS.ASSETS_CRIMES && (
        <SectionList>
          <AssetsCrimes assets={data.assets} crimes={data.crimes} />
        </SectionList>
      )}

      {/* 발의법률 */}
      {active === TABS.BILLS && (
        <SectionList>
          {data.bills?.length ? (
            <Bills bills={data.bills} />
          ) : (
            <Card>
              <Title>발의법률</Title>
              <EmptyText>정보 준비 중</EmptyText>
            </Card>
          )}
        </SectionList>
      )}
    </Root>
  );
}
