// src/pages/peopledetail/sections/Career.jsx
import {
  Card,
  CardTitle,
  Section,
  SectionTitle,
  UnorderedList,
  ListItemBullet,
} from "../ProfileDetail.styles.js";
import { parseCareer } from "../../../shared/utils/parseCareer.js";

export default function Career({ raw, education = [], experience = [], books = [] }) {
  let edu = education,
    exp = experience,
    bks = books;

  // 원문 문자열이 온 경우 우선 파싱 사용
  if (raw) {
    const parsed = parseCareer(raw);
    edu = parsed.education;
    exp = parsed.experience;
    bks = parsed.books;
  }

  const hasEdu = Array.isArray(edu) && edu.length > 0;
  const hasExp = Array.isArray(exp) && exp.length > 0;
  const hasBooks = Array.isArray(bks) && bks.length > 0;

  return (
    <Card>
      <CardTitle>주요 약력</CardTitle>

      {hasEdu && (
        <Section>
          <SectionTitle>[학력]</SectionTitle>
          <UnorderedList>
            {edu.map((item, index) => (
              <ListItemBullet key={`edu-${index}`}>{item}</ListItemBullet>
            ))}
          </UnorderedList>
        </Section>
      )}

      {hasExp && (
        <Section>
          <SectionTitle>[주요 경력]</SectionTitle>
          <UnorderedList>
            {exp.map((item, index) => (
              <ListItemBullet key={`exp-${index}`}>{item}</ListItemBullet>
            ))}
          </UnorderedList>
        </Section>
      )}

      {hasBooks && (
        <Section>
          <SectionTitle>[저서]</SectionTitle>
          <UnorderedList>
            {bks.map((item, index) => (
              <ListItemBullet key={`book-${index}`}>{item}</ListItemBullet>
            ))}
          </UnorderedList>
        </Section>
      )}
    </Card>
  );
}
