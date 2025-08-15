import styled from "styled-components";

/* 레이아웃 */
export const Root = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 0 16px 100px;
  box-sizing: border-box;
`;

export const SectionList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  @media (min-width: 640px) {
    gap: 16px;
  }
`;

/* 탭 */
export const Nav = styled.div`
  display: flex;
  gap: 10px;
  padding: 8px 0 14px;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 2;

  overflow-x: auto;
  white-space: nowrap; 
  -webkit-overflow-scrolling: touch; 

  scrollbar-width: none; 
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabButton = styled.button`
  appearance: none;
  border: none;
  width: 100px;
  background: ${({ $active }) => ($active ? "#4846D8" : "#F3F3F3")};
  color: ${({ $active }) => ($active ? "#fff" : "#767676")};
  border-radius: 19px;
  padding: 10px 17px;
  font-size: 14px;
  font-weight: 600;
  transition: transform 0.12s ease, background 0.2s ease;
`;

/* 카드 공통 */
export const Card = styled.section`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 20px 35px;
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 10px;
  color: #111;
`;

/* 기본 정보 */
export const InfoList = styled.ul`
  display: grid;
  gap: 10px;
`;
export const InfoItem = styled.li`
  display: grid;
  grid-template-columns: 92px 1fr;
  align-items: start;
  gap: 10px;
`;
export const InfoKey = styled.div`
  color: #666;
  font-size: 13px;
`;
export const InfoValue = styled.div`
  color: #111;
  font-size: 14px;
  line-height: 1.45;
`;

/* 약력/경력 */
export const BulletList = styled.ul`
  padding-left: 18px;
  line-height: 1.6;
  color: #111;
  & > li {
    margin: 4px 0;
  }
`;
export const TwoCards = styled.div`
  display: grid;
  gap: 14px;
`;

/* 최근 이슈 */
export const IssueList = styled.ul`
  display: grid;
  gap: 12px;
`;
export const IssueItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;
export const IssueTitle = styled.div`
  font-size: 14px;
  color: #111;
  line-height: 1.4;
`;
export const IssueLink = styled.a`
  flex-shrink: 0;
  font-size: 13px;
  color: #4a61ff;
  text-decoration: underline;
`;

/* SNS */
export const SNSGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
`;
export const SNSBtn = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 12px;
  background: #f5f6f8;
  color: #111;
  font-size: 14px;
  border: 1px solid #ececec;
`;
export const EmptyText = styled.div`
  font-size: 14px;
  color: #9a9a9a;
  padding: 12px 2px 6px;
`;

export const Highlight = styled.div`
  position: absolute;
  bottom: 3px;
  width: calc(100% + 20px);
  left: -10px;
  height: 14px;
  background: #e1e0ff;
  z-index: -1;
  border-radius: 2px;
`;