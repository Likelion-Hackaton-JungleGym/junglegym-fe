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
      <MiniPeople />
      <JungleDictionary />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
`;
