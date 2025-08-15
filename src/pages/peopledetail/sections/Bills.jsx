import { Card, Title, BulletList } from "../PeopleDetail.styles.js";

/**
 * bills: [{ title, date, link, status }]
 *  - status 예: "원안가결", "대안반영폐기", "계류", ...
 */
export default function Bills({ bills = [] }) {
  return (
    <Card>
      <Title>발의법률</Title>
      <BulletList>
        {bills.map((b, i) => (
          <li key={i}>
            {b.date ? `[${b.date}] ` : ""}
            {b.title}
            {b.status ? ` · ${b.status}` : ""}
            {b.link ? (
              <>
                {" "}
                ·{" "}
                <a href={b.link} target="_blank" rel="noreferrer">
                  원문
                </a>
              </>
            ) : null}
          </li>
        ))}
      </BulletList>
    </Card>
  );
}
