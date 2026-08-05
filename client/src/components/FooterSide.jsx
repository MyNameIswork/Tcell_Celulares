import { Link } from "react-router-dom";
import Logo from "../assets/img/logo.jpg";

export default function FooterSide() {
  return (
    <footer className="z-10">
      <div className="flex justify-center items-center flex-col border-t border-zinc-200 ">
        <div className="md:p-10 p-3 flex md:justify-around justify-center flex-wrap md:flex-row flex-col w-full md:items-start items-center gap-3">
          <div className="flex flex-col gap-1">
            <img className="w-24 object-cover" src={Logo} alt="Tcell Logo" />
            <span className="text-sm text-zinc-700">
              Celulares e Informática
            </span>
          </div>
          <div className="flex justify-center md:items-start md:justify-start items-center flex-col md:gap-2 gap-0">
            <h2 className="font-bold text-xl">Menu</h2>
            <ol className="flex md:flex-col flex-row md:gap-1 gap-1.5 text-sm font-medium md:w-auto w-3/4 flex-wrap md:justify-normal justify-center text-zinc-700">
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
          <div className="w-[300px] flex md:items-start items-center flex-col md:gap-2 gap-0">
            <h2 className="font-bold text-xl">Aonde Estamos ?</h2>
            <p className="text-sm text-zinc-700 md:text-left text-center leading-5">
              Rua barão de Santo Ângelo, 670, Engenho de dentro, Rio de Janeiro
            </p>
          </div>
          <div className="w-[300px] flex md:items-start items-center flex-col md:gap-2 gap-0">
            <h2 className="font-bold text-xl">Contato</h2>
            <ol className="flex md:items-start items-center text-sm text-zinc-700 flex-col">
              <li>Celular/Whatsapp: (21) 98494-0065</li>
              <li>Email: tcell@tcellcelulares.com</li>
            </ol>
          </div>
        </div>
        <div className="border-t border-zinc-200 w-full flex justify-center items-center py-2">
          <span className="font-medium ">
            Todos os direitos reservados &copy; | 2022-2025
          </span>
        </div>
      </div>
    </footer>
  );
}
