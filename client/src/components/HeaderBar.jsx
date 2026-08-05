import { Link } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

import Logo from "../assets/img/logo.jpg";

export default function HeaderBar() {
  return (
    <header className="sticky top-0 bg-white z-50">
      <div className="flex md:justify-between justify-center flex-wrap items-center px-5 py-1 border-b border-zinc-200">
        <div className="">
          <Link to="/">
            <img className="w-32" src={Logo} alt="" />
          </Link>
        </div>
        <div className="">
          <ol className="flex justify-center flex-wrap items-center md:gap-3 gap-1.5 font-medium">
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>
              <Link to="/loja">Loja</Link>
            </li>
            <li>
              <Link to="/programas-links">Programas e Links</Link>
            </li>
            <li>
              <Link to="/reparo">Manutenção</Link>
            </li>
            <li>
              <Link to="/sobre">Sobre</Link>
            </li>
          </ol>
        </div>
        {/*<div className="flex justify-center items-center gap-3">
          <IoIosSearch />
          <IoCart />
        </div>*/}
      </div>
    </header>
  );
}
