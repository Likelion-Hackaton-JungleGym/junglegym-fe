import { Card, Title, SNSGrid, SNSBtn } from "../PeopleDetail.styles.js";

export default function SNSLinks({ sns = {} }) {
  const list = [
    { key: "facebook", label: "페이스북" },
    { key: "instagram", label: "인스타그램" },
    { key: "blog", label: "블로그" },
    { key: "twitter", label: "X (트위터)" },
  ].filter((it) => !!sns?.[it.key]);

  if (list.length === 0) return null;

  return (
    <Card>
      <Title>SNS</Title>
      <SNSGrid>
        {list.map((it) => (
          <SNSBtn key={it.key} href={sns[it.key]} target="_blank" rel="noreferrer">
            {it.label}
          </SNSBtn>
        ))}
      </SNSGrid>
    </Card>
  );
}
