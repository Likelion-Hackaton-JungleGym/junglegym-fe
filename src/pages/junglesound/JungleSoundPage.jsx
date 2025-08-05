import { Outlet } from "react-router";
import Header from "../header/Header";

export default function JungleSoundPage() {
  return (
    <>
      <Header />
      <p>정글의 소리</p>
      <Outlet />
    </>
  );
}
