import { Outlet } from "react-router";
import Header from "../header/Header";

export default function JungleTownPage() {
  return (
    <>
      <Header />
      <p>동네 한 바퀴</p>
      <Outlet />
    </>
  );
}
