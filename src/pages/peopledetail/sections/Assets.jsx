// src/pages/peopledetail/sections/Assets.jsx
import {
  Card,
  CardTitle,
  Row,
  InfoIcon,
  InfoLabel,
  InfoValuePrimary,
  ValueStack,
  EmptyInfo,
  EmptyText,
  NoteIcon,
  NoteSection,
} from "../ProfileDetail.styles.js";

import AssetIcon from "../../../assets/icons/AssetIcon.svg";
import DebtIcon from "../../../assets/icons/DebtIcon.svg";
import RealAssetIcon from "../../../assets/icons/RealAssetIcon.svg";
import NoticeIcon from "../../../assets/icons/NoticeIcon.svg";

const FIELDS = [
  { key: "total", label: "총 자산", icon: AssetIcon, alt: "총 자산" },
  { key: "debt", label: "총 부채", icon: DebtIcon, alt: "총 부채" },
  { key: "net", label: "순 자산", icon: RealAssetIcon, alt: "순 자산" },
];

export default function Assets({ assets = {} }) {
  // 빈 상태 처리 (기존 로직 유지)
  if (!assets || assets.count === 0) {
    return (
      <Card>
        <CardTitle>재산 정보</CardTitle>
        <EmptyInfo>
          <NoteSection>
            <img src={NoticeIcon} alt="Notice" />
          </NoteSection>
          <EmptyText>아직 등록된 정보가 없어요</EmptyText>
        </EmptyInfo>
      </Card>
    );
  }

  // 값이 있는 필드만 노출
  const visible = FIELDS.filter((f) => assets?.[f.key]);

  return (
    <Card>
      <CardTitle>재산 정보</CardTitle>

      {visible.map((f) => (
        <Row key={f.key}>
          <InfoIcon>
            <img src={f.icon} alt={f.alt} />
          </InfoIcon>
          <ValueStack>
            <InfoLabel>{f.label}</InfoLabel>
            <InfoValuePrimary>{assets[f.key]}</InfoValuePrimary>
          </ValueStack>
        </Row>
      ))}
    </Card>
  );
}
