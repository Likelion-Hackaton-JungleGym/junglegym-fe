import {
  Card,
  CardTitle,
  Button,
  ButtonIcon,
  ButtonText,
} from "../ProfileDetail.styles.js";
import styled from "styled-components";

import FacebookIcon from "@/assets/icons/FacebookIcon.svg";
import InstagramIcon from "@/assets/icons/InstagramIcon.svg";
import BlogIcon from "@/assets/icons/BlogIcon.svg";
import TwitterIcon from "@/assets/icons/TwitterIcon.svg";

const SNSLinks = ({ sns }) => {
  const snsButtons = [
    { key: 'facebook', label: '페이스북', icon: FacebookIcon, link: sns?.facebook },
    { key: 'instagram', label: '인스타그램', icon: InstagramIcon, link: sns?.instagram },
    { key: 'blog', label: '블로그', icon: BlogIcon, link: sns?.blog },
    { key: 'twitter', label: 'X (트위터)', icon: TwitterIcon, link: sns?.twitter }
  ];

  // 링크가 있는 SNS만 필터링
  const activeSnsButtons = snsButtons.filter(button => button.link);
  const activeCount = activeSnsButtons.length;

  // SNS 개수에 따른 그리드 설정
  const getGridTemplateColumns = () => {
    if (activeCount === 1) return "1fr 1fr"; // 한 줄, 옆 칸 비우기
    if (activeCount === 2) return "1fr 1fr"; // 한 줄
    if (activeCount === 3) return "1fr 1fr"; // 두 줄 (2개 + 1개)
    if (activeCount === 4) return "1fr 1fr"; // 두 줄 (2개 + 2개)
    return "1fr 1fr"; // 기본값
  };

  const getGridTemplateRows = () => {
    if (activeCount === 1) return "1fr"; // 한 줄
    if (activeCount === 2) return "1fr"; // 한 줄
    if (activeCount === 3) return "1fr 1fr"; // 두 줄
    if (activeCount === 4) return "1fr 1fr"; // 두 줄
    return "1fr"; // 기본값
  };

  return (
    <Card>
      <CardTitle>SNS</CardTitle>
      {activeCount > 0 ? (
        <DynamicGridContainer
          $columns={getGridTemplateColumns()}
          $rows={getGridTemplateRows()}
          $count={activeCount}
        >
          {snsButtons.map(({ key, label, icon, link }) => {
            if (!link) return null; // 링크가 없는 SNS는 렌더링하지 않음
            
            return (
              <Button
                key={key}
                as="a"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ButtonIcon>
                  <img src={icon} alt={label} />
                </ButtonIcon>
                <ButtonText>{label}</ButtonText>
              </Button>
            );
          })}
        </DynamicGridContainer>
      ) : (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          color: '#666',
          fontSize: '14px'
        }}>
          등록된 SNS가 없습니다.
        </div>
      )}
    </Card>
  );
};

// 동적 그리드 컨테이너
const DynamicGridContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$columns};
  grid-template-rows: ${props => props.$rows};
  gap: 10px;
  
  /* SNS 1개일 때: 첫 번째 칸에만 배치 */
  ${props => props.$count === 1 && `
    & > *:first-child {
      grid-column: 1;
    }
  `}
  
  /* SNS 3개일 때: 두 번째 줄에 하나만 배치 */
  ${props => props.$count === 3 && `
    & > *:nth-child(3) {
      grid-column: 1;
    }
  `}
  `;
 
export default SNSLinks;
