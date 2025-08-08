import styled from "styled-components";
//import { Link } from "react-router-dom";
import leeseungro from "../components/img/leeseungro.svg";
import kimyungbae from "../components/img/kimyungbae.svg";
import kimnamgeun from "../components/img/kimnamgeun.svg";
import ohsehun from "../components/img/ohsehun.svg";

export default function Minipeople() {
  return (
    <Wrapper>
      <Text>
        <Title>정글 사람들</Title>
        {/*} <Link to="/junglePeople">*/}
        <Plus>{`전체보기 >`}</Plus>
        {/*</Link>*/}
      </Text>
      <MiniPeople className="scroll-container">
        <People>
          {/*} <Link to="/leeseungro">*/}
          <Img src={leeseungro} />
          {/*</Link>*/}
        </People>
        <People>
          {/*} <Link to="/kimyungbae">*/}
          <Img src={kimyungbae} />
          {/*</Link>*/}
        </People>
        <People>
          {/*} <Link to="/kimnamgeun">*/}
          <Img src={kimnamgeun} />
          {/*</Link>*/}
        </People>
        <People>
          {/*} <Link to="/ohsehun">*/}
          <Img src={ohsehun} />
          {/*</Link>*/}
        </People>
      </MiniPeople>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 10px;
`;

const Text = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 15px;
  font-family: Pretendard;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.2px;
`;

const Plus = styled.div`
  color: #959595;
  font-size: 13px;
  cursor: pointer;
`;

const MiniPeople = styled.div`
  display: flex;
  margin: 10px;
  &.scroll-container {
    display: flex;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  &.scroll-container::-webkit-scrollbar {
    height: 0px;
  }
`;

const Img = styled.img`
  cursor: pointer;
`;

const People = styled.div`
  margin: 3px 7px 0px 7px;
`;
