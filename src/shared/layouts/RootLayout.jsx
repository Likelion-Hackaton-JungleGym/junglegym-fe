import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../header/Header";
import styled from "styled-components";
import ScrollToTop from "../utils/ScrollToTop";
import FloatingButton from "../utils/FloatingButton";

const HEADER_H = 120;
const EXCLUDE_FLOATING = ["/jungletalk"]; //숨길곳 관리

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

      <FloatingButton
        targetId="scrollRoot" // 창 자체 스크롤이면 이 줄 삭제
        threshold={0} // 0 = 거의 항상 표시
        size={56}
        right={20}
        bottom={30}
        excludePaths={EXCLUDE_FLOATING}
      />
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
