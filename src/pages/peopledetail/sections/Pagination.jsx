import styled from "styled-components";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxVisiblePages = 5;
  
  // 표시할 페이지 번호들 계산
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  // 시작 페이지 조정
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <PaginationContainer>
      {pages.map((page) => (
        <PageButton
          key={page}
          $active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
`;

const PageButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  color: ${props => props.$active ? '#000' : '#959595'};
  font-size: 13px;
  font-weight: ${props => props.$active ? '600' : '400'};
  transition: all 0.2s ease;
  
`;

export default Pagination; 