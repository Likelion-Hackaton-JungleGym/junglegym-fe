import styled from "styled-components";
import orgchartImg from "./img/orgImsi.svg";

export default function OrgChart() {
  return (
    <Wrapper>
      <Title>성북구 조직도</Title>

      <Img src={orgchartImg} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 10px;
  font-family: Pretendard;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.2px;
  margin-top: 50px;
`;

const Img = styled.img`
  padding-top: 10px;
  width: 100%;
  height: auto;
  cursor: pointer;
`;
