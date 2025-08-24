import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  LogoWrapper,
  LogoImg,
  LogoLink,
  MapImg,
  TopWrapper,
  Nav,
  NavItem,
  HeaderWrapper,
} from "./HeaderStyles";
//import TextLogo from "../../assets/icons/TextLogo.svg";
import Map from "../../assets/icons/mapImg.svg";
import TextLogo from "../../assets/icons/해커톤로고-03.jpg";

export default function Header({ mode = "fixed" }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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
    {
      label: "정글 사람들",
      path: "/junglepeople",
      preserveRegion: true, // 지역구 파라미터 유지
    },
    { label: "정글챗 AI", path: "/jungletalk" },
    { label: "정글의 소리", path: "/junglesound" },
  ];

  const isActive = (cur, target) => (target === "/" ? cur === "/" : cur.startsWith(target));

  if (mode === "hidden") return null;

  return (
    <HeaderWrapper $visible={mode === "hideOnScroll" ? visible : true}>
      <TopWrapper>
        <MapImg
          src={Map}
          alt="지도"
          onClick={() => navigate("/Landing")}
          title="다른 정글 탐험하기"
        />
        <LogoWrapper>
          <LogoLink to="/">
            <LogoImg src={TextLogo} alt="로고" />
          </LogoLink>
        </LogoWrapper>
      </TopWrapper>
      <Nav>
        {menu.map((m) => {
          // 지역구 파라미터 유지가 필요한 경우
          let targetPath = m.path;
          if (m.preserveRegion) {
            // 현재 URL에서 지역구 파라미터 읽기 (여러 방법 시도)
            let currentRegion = searchParams.get("region");

            // useSearchParams로 안되면 window.location에서 직접 추출
            if (!currentRegion) {
              const urlParams = new URLSearchParams(window.location.search);
              currentRegion = urlParams.get("region");
            }

            // PersonProfile 페이지에서도 지역구 정보를 찾기 위해 sessionStorage 확인
            if (!currentRegion) {
              currentRegion = sessionStorage.getItem("selectedRegion");
            }

            console.log(
              "Header - 현재 지역구 파라미터:",
              currentRegion,
              "현재 pathname:",
              pathname,
              "전체 URL:",
              window.location.href
            );

            // 지역구 파라미터가 있으면 유지, 없으면 기본값 성북구
            if (currentRegion) {
              targetPath = `${m.path}?region=${encodeURIComponent(currentRegion)}`;
              console.log("Header - 지역구 파라미터 유지됨:", targetPath);
            } else {
              // 기본값 성북구로 설정
              targetPath = `${m.path}?region=${encodeURIComponent("성북구")}`;
              console.log("Header - 기본값 성북구로 설정:", targetPath);
            }
          }

          return (
            <NavItem
              key={m.path}
              to={targetPath}
              className={isActive(pathname, m.path) ? "active" : ""}
            >
              {m.label}
            </NavItem>
          );
        })}
      </Nav>
    </HeaderWrapper>
  );
}
