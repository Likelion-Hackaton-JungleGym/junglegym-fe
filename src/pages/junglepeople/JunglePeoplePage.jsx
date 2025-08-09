import styled from "styled-components";
import Title from "./components/Title";
import Profile from "./components/Profile";

export default function JunglePeoplePage() {
  return (
    <Wrapper>
      <Title />
      <Profile />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid yellowgreen;
`;
