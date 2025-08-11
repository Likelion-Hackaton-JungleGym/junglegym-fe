import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";

export default function RootLayout() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/onboarding"]; //헤더X인 페이지 경로 넣기
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Outlet />
    </>
  );
}
