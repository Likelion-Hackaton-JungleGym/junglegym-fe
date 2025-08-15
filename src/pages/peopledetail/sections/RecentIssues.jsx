import {
  Card,
  Title,
  IssueList,
  IssueItem,
  IssueTitle,
  IssueLink,
} from "../PeopleDetail.styles.js";

export default function RecentIssues({ issues = [] }) {
  if (!issues || issues.length === 0) return null;

  return (
    <Card>
      <Title>최근 이슈</Title>
      <IssueList>
        {issues.map((it, i) => (
          <IssueItem key={i}>
            <IssueTitle>{it.title}</IssueTitle>
            {it.link && (
              <IssueLink href={it.link} target="_blank" rel="noreferrer">
                원문 보기
              </IssueLink>
            )}
          </IssueItem>
        ))}
      </IssueList>
    </Card>
  );
}
