import { Outlet } from "react-router";
import Header from "../header/Header";

export default function JungleTalkPage() {
  return (
    <>
      <Header />
      <p>정글톡</p>
      <Outlet />
    </>
  );
}
