import styled from "styled-components";

// 탭 상수
export const TABS = {
  BASIC: "basic",
  PROMISES: "promises",
  ASSETS_CRIMES: "assets_crimes",
  BILLS: "bills",
};

const ProfileTabs = ({ active, onChange, shouldHideBillsTab = false }) => {
  const tabs = [
    { id: TABS.BASIC, label: "기본 프로필" },
    { id: TABS.PROMISES, label: "공약 이행" },
    { id: TABS.ASSETS_CRIMES, label: "재산 및 전과" },
    ...(shouldHideBillsTab ? [] : [{ id: TABS.BILLS, label: "발의법률" }]),
  ];

  return (
    <TabScrollWrap>
      <TabContainer role="tablist">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            $active={active === tab.id}
            onClick={() => onChange(tab.id)}
            role="tab"
            aria-selected={active === tab.id}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabContainer>
    </TabScrollWrap>
  );
};

/** 고정 폭(부모 너비)에 맞춰 내부에서만 스크롤 */
const TabScrollWrap = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  /* 모바일에서 스크롤바 감추기(필요 없으면 제거) */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabContainer = styled.div`
  display: inline-flex; /* 내용 너비만큼만 차지해서 가로 스크롤 유도 */
  gap: 12px;
  padding: 6px 2px; /* 좌우 여백으로 스크롤 여지 */
  border-radius: 12px;
  margin: 20px 20px;
  position: relative;

  /* 스크롤 스냅(원하면 켜기) */
  scroll-snap-type: x proximity;
`;

const TabButton = styled.button`
  flex: 0 0 auto; /* 폭 고정(내용 기반) + 줄바꿈 방지 */
  padding: 10px 16px;
  border-radius: 19px;
  font-size: 15px;
  font-weight: 600;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.2s ease;
  position: relative;
  min-width: 100px;
  white-space: nowrap;
  scroll-snap-align: start;

  /* 테두리/배경/글자색 */
  border: 1px solid ${(p) => (p.$active ? "#4846D8" : "#F3F3F3")};
  background: ${(p) => (p.$active ? "#4846D8" : "#F3F3F3")};
  color: ${(p) => (p.$active ? "#FFFFFF" : "#767676")};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(116, 113, 249, 0.25);
  }
`;

export default ProfileTabs;
