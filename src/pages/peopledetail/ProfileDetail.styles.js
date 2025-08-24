import styled from "styled-components";

// 공통 컨테이너 스타일
export const Container = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px 30px;
  border: 1px solid #d9d9d9;
`;

// 핵심 공약용 컨테이너 스타일 (카드 부분만 패딩 조정)
export const KeyPromisesContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  border: 1px solid #d9d9d9;
  
  /* 타이틀 부분은 패딩 유지 */
  .key-promises-title {
    padding: 20px 30px 0 30px;
  }
  
  /* 카드 부분만 양옆 패딩 제거 */
  .key-promises-content {
    padding: 0;
  }
`;

// 공통 제목 스타일
export const Title = styled.h3`
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

// 공통 카드 스타일
export const Card = styled.div`
  background: #fff;
  border-radius: 15px;
  padding: 20px 30px;
  border: 1px solid #d2d2d2;
`;

// 공통 제목 스타일
export const CardTitle = styled.h3`
  font-size: 21px;
  font-weight: 700;
  margin: 0 0 10px 0;
  color: #000;

  /* 텍스트 뒤에 라이트 퍼플 형광펜 효과 */
  display: inline-block;
  background-image: linear-gradient(#e1e0ff);
  background-position: 0 100%;
  background-size: 100% 12px;
  background-repeat: no-repeat;
  padding: 0 8px;
`;

// 공통 부제목 스타일
export const CardSubtitle = styled.p`
  font-size: 14px;
  color: #959595;
  margin: 0 0 16px 0;
  font-weight: 500;
`;

export const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 10px 0 0;
`;

// 공통 아이콘 스타일
export const InfoIcon = styled.span`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
  margin-left: 10px;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
`;

// 공통 라벨 스타일
export const InfoLabel = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #959595;
  min-width: 86px; /* 74 → 86로 살짝 늘려 정렬 안정 */
  line-height: 1.6;
  margin-bottom: 4px;
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
  gap: 10px;
  padding: 40px;
  border-radius: 8px;
`;

export const EmptyText = styled.span`
  font-size: 15px;
  color: #a7a7a7;
`;

// 공통 리스트 컨테이너 스타일
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 5px 5px 0;
`;

// 공통 아이템 스타일
export const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// 공통 텍스트 스타일
export const ItemText = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #000;
  margin: 5px 0;
  line-height: 1.3;
`;

// 공통 링크 스타일
export const ItemLink = styled.a`
  font-size: 12px;
  font-weight: 500;
  color: #b5b5b5;
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
  background-color: #f6f6f6;
  border: 1px solid #e3e3e3;
  border-radius: 8px;
  transition: transform 0.2s;
  text-decoration: none;
  width: 140px;
  height: 36px;
`;

// 공통 버튼 아이콘 스타일
export const ButtonIcon = styled.span`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

// 공통 버튼 텍스트 스타일
export const ButtonText = styled.span`
  color: #000;
  font-size: 13px;
  font-weight: 400;
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
  margin-left: 8px;
  margin-top: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h4`
  font-size: 17px;
  font-weight: 600;
  color: #000;
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
  font-weight: 400;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: "•";
    position: absolute;
    left: -16px;
    color: #000;
  }
`;

// 공통 테이블 스타일
export const Table = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
`;

// HTML table 엘리먼트용 테이블 스타일
export const TableElement = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.div`
  display: flex;
  border-bottom: 0.5px solid #eee;

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

// HTML table 엘리먼트용 행과 셀 스타일
export const TableRowElement = styled.tr`
  border-bottom: 0.5px solid #000;
`;

export const SectionRowElement = styled.tr`
  td {
    font-weight: 700;
    background: #fff;
  }
`;

export const TableCellElement = styled.td`
  padding: 6px 5px;
  border-right: 0.5px solid #000;
  font-size: 13px;
  font-weight: 500;
  text-align: center;

  &:last-child {
    border-right: none;
  }
`;

export const SubtotalRow = styled(TableRow)`
  background-color: #fff;
  font-weight: 500;
`;

export const SubtotalRowElement = styled(TableRowElement)`
  background-color: #e1e0ff;
  font-weight: 500;
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
  gap: 0px;
  padding: 16px 0;
  color: #a7a7a7;
  margin-left: 10px;
`;

export const NoteIcon = styled.span`
  font-size: 16px;
  color: #a7a7a7;
  margin-top: 5px;
`;

export const NoteText = styled.p`
  font-size: 13px;
  color: #a7a7a7;
  margin: 0 6px 0 27px;
  line-height: 1.4;
  font-weight: 400;
`;

// 공통 더보기 링크 스타일
export const MoreLink = styled.a`
  display: block;
  text-align: center;
  color: #000;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
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
  gap: 1px;
  margin-top: 6px;
  margin-left: 0px; /* 아이콘/라벨 영역만큼 들여쓰기 */
`;

export const DetailItem = styled.span`
  position: relative;
  font-size: 12px;
  color: #a7a6a6;
  padding-left: 12px;
  display: block;
  line-height: 1.4;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 5px;
    width: 4px;
    height: 4px;
    background: #a7a6a6; /* 라이트 퍼플-그레이 */
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
  font-weight: 400;
  color: #959595;
  margin: 0 0 8px 0;
`;

// 공통 제안자 스타일
export const ProposerContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
`;

export const ProposerLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #7371df;
  min-width: 60px;
`;

export const ProposerName = styled.span`
  font-size: 13px;
  color: #000;
  font-weight: 400;
`;

export const ProposerNames = styled.div`
  font-size: 13px;
  color: #000;
  font-weight: 400;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
`;

// 값 기본은 작게(이미 있음). 아래는 상황별 variant
export const InfoValuePrimary = styled(InfoValue)`
  font-size: 19px; /* 생년월일처럼 크게 */
  font-weight: 500;
  color: #000;
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

// 공약 사업 이행 현황 스타일
export const ProgressSection = styled.div`
  margin-bottom: 32px;
  margin-top: 10px;
`;

export const ProgressTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
  color: #000;
`;

export const ProgressDate = styled.p`
  font-size: 12px;
  color: #a7a6a6;
  font-weight: 500;
  margin: 0;
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const ProgressBars = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: ${(props) => props.color};
  border-radius: 6px;
  color: white;
  font-weight: 500;
  width: ${(props) => (props.width > 0 ? props.width : 0)}%;
  min-width: 150px;
  height: 35px;
  transition: width 0.3s ease;

  &.light-bg {
    color: #333;
  }
`;

export const ProgressBarLabel = styled.span`
  font-size: 14px;
  white-space: nowrap;
`;

export const ProgressBarCount = styled.span`
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
`;

export const TableSection = styled.div`
  margin-top: 32px;
`;

export const TableTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin: 0 0 10px 0;
`;

export const TableContainer = styled.div`
  border-bottom: 0.5 solid #000;
  border-top: 0.5px solid #000;
  overflow: hidden;
`;

export const TableHeader = styled.th`
  padding: 10px 10px;
  background-color: #fff;
  border-bottom:0.5px solid #000;
  border-right: 0.5px solid #000;
  font-weight: 500;
  text-align: center;
  font-size: 13px;

  &:last-child {
    border-right: none;
  }
`;

// 핵심 공약 스타일
export const CategoryItem = styled.div`
  border-radius: 8px;
  overflow: hidden;
`;

export const CategoryDivider = styled.div`
  height: 1px;
  background-color: #e0e0e0;
  margin: 0 30px;
`;

export const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  transition: background-color 0.2s ease;

`;

export const CategoryTitle = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: #7471F9;
  margin: 0 0 8px 0;
  padding: 0 15px;
`;

export const CategorySummary = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #000;
  margin-right: 5px;
  line-height: 1.4;
  padding: 0 15px;
`;

export const CategoryContent = styled.div`
  padding: 22px 16px;
  border-top: 1px solid #e0e0e0;
  background-color: #F3F2F7;
`;

export const CategoryArrow = styled.span`
  font-size: 12px;
  color: #606060;
  transition: transform 0.2s ease;
  margin-right: 15px;
  margin-bottom: 8px;
`;

export const DetailPromises = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

export const PromiseCard = styled.div`
  border-radius: 10px;
  background-color: #fff;
  min-height: 80px;
  position: relative;
  transform-style: preserve-3d;
`;

export const PromiseCardFront = styled.div`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  background-color: #fff;
  transform: rotateY(0deg);
`;

export const PromiseCardBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  border-radius: 10px;
  background-color: #7471F9;
`;

export const PromiseNumber = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #7471F9;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 400;
  flex-shrink: 0;
`;

export const PromiseStatus = styled.span`
  display: inline-block;
  padding: 2px 10px;
  width: fit-content;
  border-radius: 9px;
  font-size: 11px;
  font-weight: 500;
  margin-left: 30px;
`;

export const PromiseContent = styled.div`
  font-size: 13px;
  line-height: 130%;
  color: #000;
  font-weight: 300;
`;

// 3D 카드 컨테이너
export const Card3DContainer = styled.div`
  perspective: 1200px;
`;

export const Card3DWrapper = styled.div`
  position: relative;
  border-radius: 10px;
  min-height: 80px;
  transform-style: preserve-3d;
  transform: ${props => props.$isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
  transition: transform 0.4s ease-in-out;
  cursor: ${props => props.$hasGoal ? "pointer" : "default"};
  will-change: transform;
`;

// 카드 앞면
export const CardFront = styled.div`
  border: 1px solid #D2D2D2;
  border-radius: 10px;
  background: #fff;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  align-items: center;
`;

// 카드 뒷면
export const CardBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #D2D2D2;
  border-radius: 10px;
  background: #746F89;
  padding: 10px 15px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

// 카드 내용 컨테이너
export const CardContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CardContentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// 뒷면 내용
export const BackContent = styled.div``;

export const BackTitle = styled.div`
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 0px;
  color: #000;
`;

export const BackText = styled.div`
  color: #2F2E34;
  font-size: 14px;
  line-height: 1.5;
`;

// 빈 상태 메시지
export const EmptyMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;
