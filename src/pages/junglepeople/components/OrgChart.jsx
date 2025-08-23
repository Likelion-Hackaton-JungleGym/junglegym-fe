import styled from "styled-components";
import orgchartImg from "../../../assets/images/OrgChart.svg";

export default function OrgChart() {
  return (
    <>
      <Title>성북구 조직도</Title>
      <Wrapper>
        <Img src={orgchartImg} />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  border-radius: 10px;
border: 1px solid #D3D3D3;
  margin: 10px;
  font-family: Pretendard;
  padding: 13px 23px;
`;

const Title = styled.div`
  font-size: 23px;
  font-size: 23px;
  font-weight: 700;
  letter-spacing: -0.2px;
  margin-top: 50px;
  margin-left: 15px;
`;

const Img = styled.img`
  padding: 10px 0px;
  width: 100%;
  height: auto;
  cursor: pointer;
`;
