import {
  Card,
  CardTitle,
  ListContainer,
  Category,
  ItemText,
  StatusBadge,
  MoreLink
} from "../ProfileDetail.styles.js";

const KeyPromises = ({ keyPromises }) => (
  <Card>
    <CardTitle>핵심 공약</CardTitle>
    <ListContainer>
      <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '16px' }}>
        <Category>복지</Category>
        <ItemText>1인 가구를 위한 맞춤형 지원센터를 운영하겠습니다</ItemText>
        <StatusBadge $status="normal">정상추진</StatusBadge>
      </div>
      <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '16px' }}>
        <Category>경제</Category>
        <ItemText>청년 스마트 창업센터를 구축하고 창업 거리를 활성화하겠습니다</ItemText>
        <StatusBadge $status="completed">완료</StatusBadge>
      </div>
      <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '16px' }}>
        <Category>환경</Category>
        <ItemText>정릉천과 성북천을 생태하천으로 복원하겠습니다</ItemText>
        <StatusBadge $status="continued">이행후 계속추진</StatusBadge>
      </div>
      <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '16px' }}>
        <Category>문화</Category>
        <ItemText>문화예술교육센터를 설립해 모두가 참여하는 문화도시를 만들겠습니다</ItemText>
        <StatusBadge $status="normal">정상추진</StatusBadge>
      </div>
      <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '16px' }}>
        <Category>안전</Category>
        <ItemText>공공 CCTV 확대와 범죄 예방 시스템으로 일상을 더 안전하게 만들겠습니다</ItemText>
        <StatusBadge $status="hold">보류</StatusBadge>
      </div>
    </ListContainer>
    <MoreLink>더 보기 {'>'}</MoreLink>
  </Card>
);

export default KeyPromises; 