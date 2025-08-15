import { Card, Title, BulletList } from "../PeopleDetail.styles.js";

export default function Career({ education = [], experience = [] }) {
  const hasEdu = (education?.length || 0) > 0;
  const hasExp = (experience?.length || 0) > 0;
  if (!hasEdu && !hasExp) return null;

  return (
    <Card>
      <Title>주요 약력</Title>

      {hasEdu && (
        <>
          <strong style={{ fontSize: 13, color: "#666", display: "block", margin: "6px 0 4px" }}>
            학력
          </strong>
          <BulletList>
            {education.map((item, i) => (
              <li key={`edu-${i}`}>{item}</li>
            ))}
          </BulletList>
        </>
      )}

      {hasExp && (
        <>
          <strong style={{ fontSize: 13, color: "#666", display: "block", margin: "8px 0 4px" }}>
            경력
          </strong>
          <BulletList>
            {experience.map((item, i) => (
              <li key={`exp-${i}`}>{item}</li>
            ))}
          </BulletList>
        </>
      )}
    </Card>
  );
}
