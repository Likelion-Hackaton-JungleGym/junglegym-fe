import { Card, Title, BulletList } from "../PeopleDetail.styles.js";

/**
 * list: [{ title, status, updatedAt, link }]
 *  - status 예: "이행", "진행중", "보류", "폐기"
 */
export default function Promises({ list = [] }) {
  return (
    <Card>
      <Title>공약 이행</Title>
      <BulletList>
        {list.map((p, i) => (
          <li key={i}>
            {p.title}
            {p.status ? ` · ${p.status}` : ""}
            {p.updatedAt ? ` · ${p.updatedAt}` : ""}
            {p.link ? (
              <>
                {" · "}
                <a href={p.link} target="_blank" rel="noreferrer">
                  자세히
                </a>
              </>
            ) : null}
          </li>
        ))}
      </BulletList>
    </Card>
  );
}
