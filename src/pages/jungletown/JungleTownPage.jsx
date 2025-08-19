import styled from "styled-components";
import Title from "./components/Title";
import CardNews from "./components/CardNews";
import MiniPeople from "./components/MiniPeople";
import JungleDictionary from "./components/JungleDictionary";

export default function JungleTownPage() {
  return (
    <Wrapper>
      <Title />
      <CardNews />
      <MarginBox>
        <MiniPeople />
        <JungleDictionary />{" "}
      </MarginBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
  margin: 5px;
`;

const MarginBox = styled.div`
  padding: -10px;
  margin-right: -15px;
`;
