import styled from "styled-components";
import orgchartImg from "../../../assets/images/OrgChart.svg";

export default function OrgChart() {
  return (
    <>
      <Title>정글관계도</Title>
      <Wrapper>
        <Img src={orgchartImg} />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  border-radius: 10px;
  border: 2px solid #d2d2d2;
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
