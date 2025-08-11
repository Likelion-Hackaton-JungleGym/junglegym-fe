import styled from "styled-components";
import orgchartimg from "./img/orgimsi.svg";

export default function OrgChart() {
  return (
    <Wrapper>
      <Title>성북구 조직도</Title>

      <Img src={orgchartimg} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 20px;
  font-family: Pretendard;
`;

const Title = styled.div`
  padding: 10px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.2px;
  margin: 10px;
`;

const Img = styled.img`
  padding: 10px;
  width: 100%; /* 카드 폭 꽉 채우기 */
  height: auto;
  cursor: pointer;
`;
