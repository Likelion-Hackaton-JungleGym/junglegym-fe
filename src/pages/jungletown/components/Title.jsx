import styled from "styled-components";

export default function Title() {
  return (
    <Wrapper>
      <HighlightText>
        동네 한 바퀴
        <Highlight />
      </HighlightText>
      <SubText>우리 동네, 지금 꼭 알아야 할 이슈 </SubText>
      <SubText>카드를 눌러 빠르게 확인해보세요</SubText>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px 20px 5px;
`;

const HighlightText = styled.div`
  position: relative;
  color: #111111;
  text-align: center;
  font-family: Pretendard;
  font-size: 27px;
  font-style: normal;
  font-weight: 700;
  padding-top: 15px;
  margin-bottom: 10px;
  letter-spacing: -1px;
`;

const Highlight = styled.div`
  position: absolute;
  bottom: 3px;
  left: 50%;
  width: 147px;
  height: 12px;
  background: #e1e0ff;
  z-index: -1;
  border-radius: 2px;
  transform: translate(-50%, 30%);
`;

const SubText = styled.p`
  color: #111111;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.2px;
  margin-top: 2px;
`;
