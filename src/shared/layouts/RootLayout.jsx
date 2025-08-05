import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function RootLayout() {
  return (
    <>
      <Box>
        <Text>👋 저는 네비게이션 바예요</Text>
      </Box>
      <Outlet />
    </>
  );
}

const Box = styled.nav`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  background: #f1f1f1;
`;

const Text = styled.span`
  color: black;
  font-size: 16px;
  font-weight: 600;
`;
