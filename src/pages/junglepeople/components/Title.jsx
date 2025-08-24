import styled from "styled-components";

export default function Title({ selectedRegion }) {
  const regionName = selectedRegion || "성북구";
  
  return (
    <Wrapper>
      <BigTexts>
        <BigText>
          {regionName}를
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
  margin-bottom: 10px;
`;

const BigText = styled.div`
  position: relative;
  color: #111111;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  margin: -3px;
  font-size: 27px;
  letter-spacing: -0.5px;
`;

const Highlight = styled.div`
  position: absolute;
  bottom: 3px;
  left: 35%;
  width: 73px;
  height: 12px;
  background: #e1e0ff;
  z-index: -1;
  border-radius: 2px;
  transform: translateY(2px);
`;

const SubText = styled.p`
  color: #111111;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.2px;
  margin: 10px;
`;
