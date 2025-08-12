import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../header/Header";
import styled from "styled-components";

export default function RootLayout() {
  const [headerMode, setHeaderMode] = useState("fixed"); // 'fixed' | 'hideOnScroll' | 'hidden'
  const [isStep3, setIsStep3] = useState(false);

  return (
    <>
      <Header mode={headerMode} />
      <ScrollRoot $isStep3={isStep3}>
        <Outlet context={{ setHeaderMode, setIsStep3 }} />
      </ScrollRoot>
    </>
  );
}

const ScrollRoot = styled.div`
  margin-top: ${({ $isStep3 }) => ($isStep3 ? "0" : "120px")};
  height: 100vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    height: 0;
    display: none;
  }
`;
