import styled from "styled-components";
import Title from "./components/Title";
import Profile from "./components/Profile";
import OrgChart from "./components/OrgChart";

export default function JunglePeoplePage() {
  return (
    <Wrapper>
      <Title />
      <Profile />
      <OrgChart />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
`;
