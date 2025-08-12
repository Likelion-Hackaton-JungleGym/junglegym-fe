import styled from "styled-components";
import CardNews1 from "../components/img/CardNews1.svg";

export default function CardNews() {
  return (
    <Wrapper>
      <Date>25년 8월 1주차</Date>
      <Card1 />
      {/*다른 거 먼저 만들고 여기 다시 만들기 */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: blue;
  margin-bottom: 55px;
`;

const Date = styled.div`
  //position: relative;
  color: #111111;
  text-align: center;
  font-family: Pretendard;
  font-size: 19px;
  font-weight: 600;
  padding: 10px;
`;

const Card1 = styled.div`
  width: 340px;
  height: 320px;
  background-image: url(${CardNews1});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
`;
