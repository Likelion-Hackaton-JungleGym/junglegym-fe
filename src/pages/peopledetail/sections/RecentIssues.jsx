import { Card, CardTitle, ListContainer, ItemText, ItemLink } from "../ProfileDetail.styles.js";

const RecentIssues = ({ issues }) => (
  <Card>
    <CardTitle>최근 이슈</CardTitle>
    <ListContainer>
      {issues.map((issue, index) => (
        <div 
          key={index} 
          style={{ 
            borderBottom: index === issues.length - 1 ? "none" : "1px solid #eee", 
            paddingBottom: index === issues.length - 1 ? "0px" : "15px" 
          }}
        >
          <ItemText>{issue.title}</ItemText>
          <ItemLink 
            href={issue.link} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            원본 기사로 넘어가기 {">"}
          </ItemLink>
        </div>
      ))}
    </ListContainer>
  </Card>
);

export default RecentIssues;
