import Store from "../assets/img/storeBanner.jpeg";
import { Link } from "react-router-dom";
import Digitais from "../assets/img/produtos-digitais.png";
import CategorieManutence from "../assets/img/Manutence.webp";
import Assinatura from "../assets/img/assinatura_de_tv.jpg";
import ArquivosLinks from "../assets/img/files_and_links.webp";
export default function CategoryBanner() {
  return (
    <div className="flex items-center justify-center gap-2 md:p-3 p-0 w-full">
      <div className="md:w-3/4 md:max-w-[1200px] w-full md:h-[450px] h-auto flex justify-center items-center md:flex-row flex-col gap-2">
        <Link
          to="/loja"
          className="h-full w-full rounded-2xl overflow-hidden relative"
        >
          <img
            className="h-full w-full object-cover rounded-2xl"
            src={Store}
            alt=""
          />
          <div className="absolute bottom-0 bg-black/30 backdrop-blur-md flex flex-col gap-1 md:py-3 md:px-5 p-2">
            <h2 className="font-bold md:text-4xl text-xl text-white">Loja</h2>
            <p className="text-pretty leading-4 md:text-sm text-xs text-zinc-300 font-light w-full">
              Aqui na Tcell, você encontrará uma ampla variedade de produtos
              físicos, com mais de 150 opções disponíveis para atender às suas
              necessidades. Trabalhamos com itens de alta qualidade,
              cuidadosamente selecionados para oferecer a melhor experiência de
              compra.
            </p>
          </div>
        </Link>
        <div className="flex flex-col gap-2 h-full md:w-1/2 w-full">
          <div className="flex justify-center items-center md:flex-row flex-col md:h-[600px] h-auto gap-2">
            <Link
              to="/loja"
              className="md:w-[200px] w-full bg-purple-600 md:h-full rounded-2xl overflow-hidden p-3 flex flex-col justify-around items-center gap-3"
            >
              <div className="">
                <img className="w-34" src={Digitais} alt="Produtos Digitais" />
              </div>
              <div className="">
                <h2 className="font-bold text-2xl text-white leading-6 text-pretty">
                  Produtos Digitais
                </h2>
              </div>
            </Link>
            <div className="md:w-[200px] h-full overflow-hidden flex flex-col gap-2">
              <Link
                to="/assinatura-de-tv"
                className="h-1/2 w-full bg-blue-500 rounded-2xl relative flex justify-center items-center"
              >
                <img
                  className="h-full w-full rounded-2xl object-cover"
                  src={Assinatura}
                  alt=""
                />
                <div className="absolute inset-0 flex justify-center items-center bg-black/70 p-3 rounded-2xl flex-col">
                  <h3 className="font-bold text-white md:text-xl text-4xl">
                    <b className="text-red-500">+</b>150 Canais
                  </h3>
                  <span className="font-semibold md:text-white text-zinc-200">
                    Assinatura de Tv
                  </span>
                </div>
              </Link>
              <Link
                to="/programas-links"
                className="h-1/2 w-full bg-blue-500 rounded-2xl flex flex-col gap-1 justify-center items-center p-3"
              >
                <img src={ArquivosLinks} alt="" />
                <h2 className="font-bold text-white md:text-lg text-2xl">
                  Programas e Links
                </h2>
              </Link>
            </div>
          </div>
          <Link
            to="/reparo"
            className="md:w-full md:h-1/2 aspect-video rounded-2xl overflow-hidden flex justify-start items-center border border-zinc-200"
          >
            <img className="h-full" src={CategorieManutence} alt="" />
            <div className="bg-black flex-grow flex h-full justify-center items-center gap-1 flex-col md:py-3 md:px-2 p-2">
              <h2 className="font-bold text-2xl text-white text-center">
                Reparo de Eletrônicos
              </h2>
              <div className="flex flex-col justify-center items-center">
                <span className="font-light text-zinc-300 text-xs leading-4 text-center">
                  Celular/Iphone, Ipap/Tablet e Apple Watch
                </span>
                <span className="font-light text-zinc-300 text-xs leading-4 text-center">
                  Tela Frontal e Bateria
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
