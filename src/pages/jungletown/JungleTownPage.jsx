import styled from "styled-components";
import Title from "./components/Title";
import CardNews from "./components/CardNews";
import MiniPeople from "./components/MiniPeople";
import JungleDictionary from "./components/JungleDictionary";

export default function JungleTownPage() {
  return (
    <Wrapper>
      <MarginBox1>
        <Title />
      </MarginBox1>
      <CardNews />
      <MarginBox2>
        <MiniPeople />
        <JungleDictionary />
      </MarginBox2>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: -20px;
  padding: 20px;
`;

const MarginBox1 = styled.div`
  padding: 10px;
  margin: 5px;
`;

const MarginBox2 = styled.div`
  padding: -10px;
  margin: 0px -15px 10px 10px;
`;
