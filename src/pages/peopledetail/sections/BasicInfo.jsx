import { Card, Title, InfoList, InfoItem, InfoKey, InfoValue } from "../PeopleDetail.styles.js";

export default function BasicInfo({ basic = {} }) {
  const rows = [
    { label: "생년월일", value: basic.birth },
    { label: "재선여부", value: basic.ageSummary },
    { label: "소속위원회", value: basic.committee },
    { label: "병역사항", value: basic.military },
  ].filter((r) => r.value);

  if (rows.length === 0) return null;

  return (
    <Card>
      <Title>기본 정보</Title>
      <InfoList>
        {rows.map((r, i) => (
          <InfoItem key={i}>
            <InfoKey>{r.label}</InfoKey>
            <InfoValue>{r.value}</InfoValue>
          </InfoItem>
        ))}
      </InfoList>
    </Card>
  );
}
