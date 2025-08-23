import { useEffect, useMemo, useState } from "react";
import { useLocation, matchPath } from "react-router-dom";
import styled from "styled-components";
import UpIcon from "../../assets/icons/floatingButton.svg";

const toLen = (v) => (typeof v === "number" ? `${v}px` : String(v));

export default function FloatingButton({
  iconSrc = UpIcon,
  targetId, // 스크롤 컨테이너 id (없으면 window)
  threshold = 0, // 0이면 항상 보임
  size = 56,
  right = 16, // 숫자(px) 또는 "vh"/"rem" 문자열 지원
  bottom = 16,
  excludePaths = [], // RootLayout에서만 관리/전달
}) {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(true);

  const isExcluded = useMemo(
    () => excludePaths.some((p) => matchPath({ path: p, end: false }, pathname)),
    [excludePaths, pathname]
  );

  const getContainer = () => (targetId ? document.getElementById(targetId) : window);

  useEffect(() => {
    if (isExcluded) return;

    const container = getContainer();
    const getScrollTop =
      container === window
        ? () => window.scrollY || document.documentElement.scrollTop || 0
        : () => container?.scrollTop ?? 0;

    const onScroll = () => {
      setVisible(threshold <= 0 ? true : getScrollTop() > threshold);
    };

    onScroll();
    container?.addEventListener("scroll", onScroll, { passive: true });

    const needDoc = container === window;
    if (needDoc) document.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      container?.removeEventListener("scroll", onScroll);
      if (needDoc) document.removeEventListener("scroll", onScroll);
    };
  }, [targetId, threshold, isExcluded, getContainer]);

  if (isExcluded) return null;

  const handleClick = () => {
    const container = getContainer();
    const smooth = { top: 0, behavior: "smooth" };

    if (container === window) {
      window.scrollTo(smooth);
      // 일부 브라우저 폴백
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } else if (container) {
      try {
        container.scrollTo(smooth);
      } catch {
        container.scrollTop = 0;
      }
    }
  };

  return (
    <Fab
      type="button"
      aria-label="맨 위로"
      onClick={handleClick}
      $visible={visible}
      $size={size}
      $right={right}
      $bottom={bottom}
    >
      <Icon src={iconSrc} alt="" />
    </Fab>
  );
}

const Fab = styled.button`
  position: fixed;
  right: ${({ $right }) => toLen($right)};
  bottom: calc(${({ $bottom }) => toLen($bottom)} + env(safe-area-inset-bottom));
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border: 0;
  background: none;
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5000;
  transition: transform 0.15s ease, opacity 0.15s ease;
  &:active {
    transform: translateY(1px) scale(0.98);
  }
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  pointer-events: none;
  user-select: none;
`;
