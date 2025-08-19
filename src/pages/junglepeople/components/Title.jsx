import styled from "styled-components";

export default function Title() {
  return (
    <Wrapper>
      <BigTexts>
        <BigText>
          성북구를
          <Highlight />
        </BigText>
        <BigText>이루는 사람들</BigText>
      </BigTexts>
      <SubText>
        우리 동네 대표자 한눈에 보기
        <br />
        공약부터 재산까지, 한 번에 확인!
      </SubText>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 20px;
`;

const BigTexts = styled.div`
  margin-top: 10px;
`;

const BigText = styled.div`
  position: relative;
  color: #111111;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  margin: -5px;
  font-size: 26px;
  letter-spacing: -0.5px;
`;

const Highlight = styled.div`
  position: absolute;
  bottom: 3px;
  left: 35%;
  width: 72px;
  height: 14px;
  background: #e1e0ff;
  z-index: -1;
  border-radius: 2px;
`;

const SubText = styled.p`
  color: #111111;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.2px;
  margin: 10px;
`;
