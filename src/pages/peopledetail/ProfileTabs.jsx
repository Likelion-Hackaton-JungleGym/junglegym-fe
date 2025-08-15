import { Nav, TabButton } from "./PeopleDetail.styles.js";

// 네 탭만 존재
export const TABS = {
  BASIC: "BASIC",
  PROMISES: "PROMISES",
  ASSETS_CRIMES: "ASSETS_CRIMES",
  BILLS: "BILLS",
};

const items = [
  { key: TABS.BASIC, label: "기본 프로필" },
  { key: TABS.PROMISES, label: "공약 이행" },
  { key: TABS.ASSETS_CRIMES, label: "재산 및 전과" },
  { key: TABS.BILLS, label: "발의법률" },
];

export default function ProfileTabs({ active, onChange }) {
  return (
    <Nav role="tablist" aria-label="프로필 상세 탭">
      {items.map((it) => (
        <TabButton
          key={it.key}
          role="tab"
          aria-selected={active === it.key}
          $active={active === it.key}
          onClick={() => onChange?.(it.key)}
        >
          {it.label}
        </TabButton>
      ))}
    </Nav>
  );
}
