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
      setShowHeader(currentScrollY <= lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 메뉴 데이터
  const menuItems = [
    { label: "동네 한 바퀴", path: "/" },
    { label: "정글 사람들", path: "/junglepeople" },
    { label: "정글톡 AI", path: "/jungletalk" },
    { label: "정글의 소리", path: "/junglesound" },
  ];

  // 경로 매칭 함수
  const isActive = (currentPath, targetPath) => {
    if (targetPath === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(targetPath);
  };

  return (
    <HeaderWrapper $visible={showHeader}>
      <Logo>정글짐</Logo>
      <Nav>
        {menuItems.map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
            className={isActive(path, item.path) ? "active" : ""}
          >
            {item.label}
          </NavItem>
        ))}
      </Nav>
    </HeaderWrapper>
  );
}
