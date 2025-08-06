import { Outlet } from "react-router-dom";
import Header from "../../pages/header/Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
