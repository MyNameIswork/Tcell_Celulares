import { Outlet } from "react-router-dom";
import HeaderBar from "../HeaderBar";
import FooterSide from "../FooterSide";

export default function NavAdmin() {
  return (
    <div className="flex flex-col justify-between min-h-dvh md:min-h-screen">
      <HeaderBar />
      <Outlet />
      <FooterSide />
    </div>
  );
}
