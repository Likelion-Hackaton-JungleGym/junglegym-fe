import { Logo, Nav, NavItem } from "./HeaderStyles";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <Logo>정글짐 로고</Logo>
      <Nav>
        <NavItem to="/" className={path === "/" ? "active1" : ""}>
          동네 한 바퀴
        </NavItem>
        <NavItem to="/junglepeople" className={path === "/junglepeople" ? "active2" : ""}>
          정글 사람들
        </NavItem>
        <NavItem to="/jungletalk" className={path === "/jungletalk" ? "active3" : ""}>
          정글톡 AI
        </NavItem>
        <NavItem to="/junglesound" className={path === "/junglesound" ? "active4" : ""}>
          정글의 소리
        </NavItem>
      </Nav>
    </>
  );
}
