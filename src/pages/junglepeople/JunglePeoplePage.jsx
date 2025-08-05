import { Outlet } from "react-router";
import Header from "../header/Header";

export default function JunglePeoplePage() {
  return (
    <>
      <Header />
      <p>정글 사람들</p>
      <Outlet />
    </>
  );
}
