import styled from "styled-components";

// 공통 카드 스타일
export const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px 30px;
  border: 1px solid #d9d9d9;
`;

// 공통 제목 스타일
export const CardTitle = styled.h3`
  font-size: 23px;
  font-weight: 800;
  margin: 0 0 16px 0;
  color: #333;

  /* 텍스트 뒤에 라이트 퍼플 형광펜 효과 */
  display: inline-block;
  background-image: linear-gradient(#edebff, #edebff);
  background-position: 0 70%;
  background-size: 100% 12px;
  background-repeat: no-repeat;
  padding: 0 2px;
`;

// 공통 부제목 스타일
export const CardSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 16px 0;
`;

export const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 10px 0;
`;

// 공통 아이콘 스타일
export const InfoIcon = styled.span`
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    display: block;
    /* 보라색 톤으로 보정 (대부분의 단색/라인 아이콘에 잘 맞음) */
    filter: invert(43%) sepia(45%) saturate(934%) hue-rotate(214deg) brightness(99%) contrast(96%);
  }
`;

// 공통 라벨 스타일
export const InfoLabel = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #7b7b7b;
  min-width: 86px; /* 74 → 86로 살짝 늘려 정렬 안정 */
  line-height: 1.6;
  margin-bottom: 5px;
`;

// 공통 값 스타일
export const InfoValue = styled.span`
  color: #111;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.2;
  margin-top: -2px; /* 라벨과 수직정렬 미세 조정 */
  flex: 1;
`;

// 공통 빈 상태 스타일
export const EmptyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
`;

export const EmptyText = styled.span`
  font-size: 14px;
  color: #666;
`;

// 공통 리스트 컨테이너 스타일
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// 공통 아이템 스타일
export const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// 공통 텍스트 스타일
export const ItemText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin: 5px 0;
`;

// 공통 링크 스타일
export const ItemLink = styled.a`
  font-size: 12px;
  color: #a0a0a0;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// 공통 버튼 스타일
export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  transition: transform 0.2s;
`;

// 공통 버튼 아이콘 스타일
export const ButtonIcon = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

// 공통 버튼 텍스트 스타일
export const ButtonText = styled.span`
  color: #000;
  font-size: 14px;
  font-weight: 500;
`;

// 공통 상태 배지 스타일
export const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;

  background: ${(props) => {
    switch (props.$status) {
      case "completed":
        return "#8B7FF9";
      case "continued":
        return "#B8A9F9";
      case "normal":
        return "#E0E0E0";
      case "hold":
        return "#FFB74D";
      default:
        return "#E0E0E0";
    }
  }};
  color: ${(props) => (props.$status === "normal" || props.$status === "hold" ? "#666" : "white")};
`;

// 공통 섹션 스타일
export const Section = styled.div`
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
`;

// 공통 리스트 스타일
export const UnorderedList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 0 20px;
`;

export const ListItemBullet = styled.li`
  font-size: 14px;
  color: #000;
  margin-bottom: 8px;
  position: relative;

  &::before {
    content: "•";
    position: absolute;
    left: -16px;
    color: #8b7ff9;
  }
`;

// 공통 테이블 스타일
export const Table = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
`;

export const TableRow = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.div`
  flex: 1;
  padding: 12px;
  font-size: 14px;

  &:first-child {
    font-weight: 600;
    background: #f8f9fa;
  }
`;

export const TableSubRow = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
    font-weight: 600;
    color: #333;
  }
`;

// 공통 헤더 스타일
export const Header = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #d32f2f;
  margin-bottom: 12px;
`;

// 공통 노트 섹션 스타일
export const NoteSection = styled.div`
  display: flex;
  gap: 5px;
  padding: 16px 0;
`;

export const NoteIcon = styled.span`
  font-size: 16px;
  color: #666;
`;

export const NoteText = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0 25px;
  line-height: 1.4;
`;

// 공통 더보기 링크 스타일
export const MoreLink = styled.a`
  display: block;
  text-align: center;
  color: #8b7ff9;
  text-decoration: none;
  font-size: 14px;
  margin-top: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

// 공통 그리드 컨테이너 스타일
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

// 공통 카테고리 스타일
export const Category = styled.div`
  font-size: 12px;
  color: #8b7ff9;
  font-weight: 600;
  margin-bottom: 8px;
`;

// 공통 상세 정보 스타일
export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 6px;
  margin-left: 0px; /* 아이콘/라벨 영역만큼 들여쓰기 */
`;

export const DetailItem = styled.span`
  position: relative;
  font-size: 14px;
  color: #a0a0a0;
  padding-left: 12px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 9px;
    width: 4px;
    height: 4px;
    background: #cfcfea; /* 라이트 퍼플-그레이 */
    border-radius: 50%;
  }
`;

// 공통 화살표 스타일
export const Arrow = styled.span`
  color: #ccc;
  font-size: 16px;
`;

// 공통 날짜 스타일
export const DateText = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0 0 8px 0;
`;

// 공통 제안자 스타일
export const ProposerContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
`;

export const ProposerLabel = styled.span`
  font-size: 12px;
  color: #7371DF;
  min-width: 80px;
`;

export const ProposerName = styled.span`
  font-size: 12px;
  color: #333;
  font-weight: 500;
`;

export const ProposerNames = styled.span`
  font-size: 12px;
  color: #333;
  flex: 1;
`;

// 값 기본은 작게(이미 있음). 아래는 상황별 variant
export const InfoValuePrimary = styled(InfoValue)`
  font-size: 22px; /* 생년월일처럼 크게 */
  font-weight: 500;
  color: #111;
`;

export const InfoValueStrong = styled(InfoValue)`
  font-size: 20px; /* 소속위원회/병역사항 값 굵게 */
  font-weight: 500;
  color: #111;
`;

// 재선여부처럼 라벨+요약+서브를 세로로 쌓는 컨테이너
export const ValueStack = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

// 요약(총 n선) 전용
export const SummaryStrong = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #111;
`;
