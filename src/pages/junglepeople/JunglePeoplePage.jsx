import styled from "styled-components";
import Title from "./components/Title";
import Profile from "./components/Profile";
import OrgChart from "./components/OrgChart";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function JunglePeoplePage() {
  const { setHeaderMode } = useOutletContext();

  useEffect(() => {
    setHeaderMode("hideOnScroll");
    return () => setHeaderMode("fixed");
  }, [setHeaderMode]);

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
  margin-top: 15px;
`;
