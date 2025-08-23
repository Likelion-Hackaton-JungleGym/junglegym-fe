import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { LogoWrapper, LogoImg, Nav, NavItem, HeaderWrapper } from "./HeaderStyles";
import TextLogo from "../../assets/icons/TextLogo.svg";

export default function Header({ mode = "fixed" }) {
  const { pathname } = useLocation();

  const [visible, setVisible] = useState(true);
  const lastYRef = useRef(0);

  useEffect(() => {
    if (mode !== "hideOnScroll") {
      setVisible(true);
      return;
    }

    const el = document.getElementById("scrollRoot") || window;

    const getY = () => {
      if (el === window) {
        return (
          window.pageYOffset ?? document.documentElement.scrollTop ?? document.body.scrollTop ?? 0
        );
      }
      return el.scrollTop || 0;
    };

    lastYRef.current = getY(); // 초기값 동기화

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = getY();
        const delta = y - lastYRef.current;

        if (Math.abs(delta) >= 3) {
          setVisible(delta <= 0); // 내리면 숨김(false), 올리면 보임(true)
          lastYRef.current = y;
        }
        ticking = false;
      });
    };

    // 선택된 스크롤 컨테이너에만 리스너 등록
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [mode]);

  const menu = [
    { label: "동네 한 바퀴", path: "/" },
    { label: "정글 사람들", path: "/junglepeople" },
    { label: "정글챗 AI", path: "/jungletalk" },
    { label: "정글의 소리", path: "/junglesound" },
  ];

  const isActive = (cur, target) => (target === "/" ? cur === "/" : cur.startsWith(target));

  if (mode === "hidden") return null;

  return (
    <HeaderWrapper $visible={mode === "hideOnScroll" ? visible : true}>
      <LogoWrapper>
        <LogoImg src={TextLogo} />
      </LogoWrapper>
      <Nav>
        {menu.map((m) => (
          <NavItem key={m.path} to={m.path} className={isActive(pathname, m.path) ? "active" : ""}>
            {m.label}
          </NavItem>
        ))}
      </Nav>
    </HeaderWrapper>
  );
}
