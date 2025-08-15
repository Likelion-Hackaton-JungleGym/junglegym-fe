// src/utils/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop({
  behavior = "auto",
  preserveOnBack = true,
  targetId = "scrollRoot",
}) {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (preserveOnBack && navType === "POP") return;

    const el = document.getElementById(targetId);
    const node = el instanceof HTMLElement ? el : window;

    const doScroll = () => {
      if (node === window) {
        window.scrollTo({ top: 0, left: 0, behavior });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      } else {
        if (node.scrollTo) node.scrollTo({ top: 0, left: 0, behavior });
        else {
          node.scrollTop = 0;
          node.scrollLeft = 0;
        }
      }
    };

    requestAnimationFrame(() => {
      doScroll();
      setTimeout(doScroll, 0);
    });
  }, [pathname, navType, behavior, preserveOnBack, targetId]);

  return null;
}
