import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import { useJungleTalkStore } from "../../store/jungleTalkStore";

export default function RootLayout() {
  const { step } = useJungleTalkStore();

return (
    <>
      {/* step이 3이면 헤더 숨김 */}
      {!(window.location.pathname.includes("/jungletalk") && step === 3) && <Header />}
      <Outlet />
    </>
  );
}