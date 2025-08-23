import {
  Card,
  CardTitle,
  ListContainer,
  ItemText,
  ItemLink
} from "../ProfileDetail.styles.js";

const OtherActivities = ({ activities }) => (
  <Card>
    <CardTitle>공약 외 활동</CardTitle>
    <ListContainer>
      {activities.map((activity, index) => (
        <div 
          key={index} 
          style={{ 
            borderBottom: index === activities.length - 1 ? 'none' : '1px solid #eee', 
            paddingBottom: index === activities.length - 1 ? '0px' : '12px' 
          }}
        >
          <ItemText>{activity.title}</ItemText>
          <ItemLink 
            href={activity.link} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            원본 기사로 넘어가기 {'>'}
          </ItemLink>
        </div>
      ))}
    </ListContainer>
  </Card>
);

export default OtherActivities; 