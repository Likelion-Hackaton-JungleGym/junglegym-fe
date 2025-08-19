import styled from "styled-components";
//import { Link } from "react-router-dom";
import dict1 from "../components/img/dict1.svg";
import dict2 from "../components/img/dict2.svg";
import dict3 from "../components/img/dict3.svg";
import dict4 from "../components/img/dict4.svg";
import dict5 from "../components/img/dict5.svg";

export default function JungleDictionary() {
  return (
    <Wrapper>
      <Text>
        <Title>정글 사전</Title>
      </Text>
      <DictCards className="scroll-container">
        <DictCard>
          {/*} <Link to="/Hot1">*/}
          <Img src={dict1} />
          {/*</Link>*/}
        </DictCard>
        <DictCard>
          {/*} <Link to="/Hot2">*/}
          <Img src={dict2} />
          {/*</Link>*/}
        </DictCard>
        <DictCard>
          {/*} <Link to="/Hot3">*/}
          <Img src={dict3} />
          {/*</Link>*/}
        </DictCard>
        <DictCard>
          {/*} <Link to="/Hot4">*/}
          <Img src={dict4} />
          {/*</Link>*/}
        </DictCard>
        <DictCard>
          {/*} <Link to="/Hot5">*/}
          <Img src={dict5} />
          {/*</Link>*/}
        </DictCard>
      </DictCards>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 10px 10px 10px 10px;
`;

const Text = styled.div`
  font-family: Pretendard;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.2px;
`;

const DictCards = styled.div`
  display: flex;
  gap: 3%;
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
  width: 170px;
`;

const DictCard = styled.div`
  padding: 10px 0px;
`;
