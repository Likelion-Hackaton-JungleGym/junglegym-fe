import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Logo, Nav, NavItem, HeaderWrapper } from "./HeaderStyles";

export default function Header() {
  const location = useLocation();
  const path = location.pathname;

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <HeaderWrapper $visible={showHeader}>
      <Logo>정글짐</Logo>
      <Nav>
        <NavItem to="/" className={path === "/" ? "active" : ""}>
          동네 한 바퀴
        </NavItem>
        <NavItem to="/junglepeople" className={path === "/junglepeople" ? "active" : ""}>
          정글 사람들
        </NavItem>
        <NavItem to="/junglechat" className={path === "/junglechat" ? "active" : ""}>
          정글챗 AI
        </NavItem>
        <NavItem to="/junglesound" className={path === "/junglesound" ? "active" : ""}>
          정글의 소리
        </NavItem>
      </Nav>
    </HeaderWrapper>
  );
}
