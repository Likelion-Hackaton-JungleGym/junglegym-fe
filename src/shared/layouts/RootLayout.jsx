import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../header/Header";
import styled from "styled-components";
import ScrollToTop from "../utils/ScrollToTop";

const HEADER_H = 120;

export default function RootLayout() {
  const [headerMode, setHeaderMode] = useState("fixed"); // 'fixed' | 'hideOnScroll' | 'hidden'

  const hasHeader = headerMode !== "hidden"; // ← hidden이면 false

  return (
    <>
      {hasHeader && <Header mode={headerMode} />}
      <ScrollRoot id="scrollRoot" $padTop={hasHeader ? HEADER_H : 0}>
        <ScrollToTop />
        <Outlet context={{ setHeaderMode }} />
      </ScrollRoot>
    </>
  );
}

const ScrollRoot = styled.div`
  padding-top: ${({ $padTop }) => `${$padTop}px`};
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
