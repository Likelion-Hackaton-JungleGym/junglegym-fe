import styled from "styled-components";

export default function Title() {
  return (
    <Wrapper>
      <HighlightText>
        동네 한 바퀴
        <Highlight />
      </HighlightText>
      <SubText>우리 동네, 지금 꼭 알아야 할 이슈 5가지!</SubText>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
`;

const HighlightText = styled.div`
  position: relative;
  color: #111111;
  text-align: center;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  padding-top: 20px;
  letter-spacing: -1px;
`;

const Highlight = styled.div`
  position: absolute;
  bottom: 3px;
  left: 50%;
  width: 50%;
  height: 13px;
  background: #e1e0ff;
  z-index: -1;
  border-radius: 2px;
  transform: translateX(-50%);
`;

const SubText = styled.p`
  color: #111111;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.2px;
`;
