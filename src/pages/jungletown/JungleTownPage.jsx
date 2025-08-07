import styled from "styled-components";
import Title from "./components/Title";
//import CardNews from "./components/CardNews";
//import MiniPeople from "./components/MiniPeople";
//import JungleDictionary from "./components/JungleDictionary";

export default function JungleTownPage() {
  return (
    <Wrapper>
      <Title />
      {/*<CardNews />
      <MiniPeople />
      <JungleDictionary /> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid skyblue;
`;
//확인용 임시 컬러. 나중에 바꿀 것
