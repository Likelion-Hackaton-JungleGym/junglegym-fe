import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../header/Header";
import styled from "styled-components";
import ScrollToTop from "../utils/ScrollToTop";

export default function RootLayout() {
  const [headerMode, setHeaderMode] = useState("fixed"); // 'fixed' | 'hideOnScroll' | 'hidden'

  return (
    <>
      <Header mode={headerMode} />
      <ScrollRoot id="scrollRoot">
        <ScrollToTop /> <Outlet context={{ setHeaderMode }} />
      </ScrollRoot>
    </>
  );
}

const ScrollRoot = styled.div`
  padding-top: 120px;
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
