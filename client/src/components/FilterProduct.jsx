import React from "react";
import { IoIosSearch } from "react-icons/io";

const petShopCategories = [
  "Acessório para Carro",
  "Adaptador",
  "Apple",
  "Balança",
  "Baseus",
  "Basike",
  "Bateria",
  "Bluetooth",
  "Cabo",
  "Caixa de Som",
  "Campainha",
  "Carregador",
  "Celular",
  "Clone",
  "Digital",
  "Exbom",
  "Fone de Ouvido",
  "Idea",
  "Inova",
  "Lâmpada",
  "Led",
  "LG",
  "Manutenção do windows",
  "Microscópio",
  "Microsoft",
  "Motorola",
  "Mouse",
  "MousePad",
  "Multímetro",
  "Office",
  "Pilhas",
  "Power Bank",
  "Relógio Digital",
  "Samsung",
  "Sem Fio",
  "Suporte de Tv",
  "Teclado",
  "Tela",
  "Tela Frontal",
  "Troca de Bateria",
  "TV",
  "Tv Box",
  "USB",
  "Windows",
  "Xiaomi",
  "Zenfone",
  "Camisa",
];

export default function FilterProduct() {
  return (
    <aside className="md:w-[350px] w-full md:flex-grow-0 border border-zinc-200 rounded-2xl p-3 flex flex-col gap-3">
      <div className="flex flex-col gap-3 justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            <IoIosSearch className="text-zinc-500" />
            <input
              className="pr-3 pl-1 py-1 border-b border-zinc-200 font-medium outline-none"
              type="search"
              name=""
              id=""
              placeholder="Buscar Produto..."
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-3">
          <div className="">
            <h3 className="font-semibold text-xl">Produto:</h3>
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="flex items-center gap-1 hover:cursor-pointer"
              htmlFor="fisico"
            >
              <input type="checkbox" name="" id="fisico" />
              <span className="font-medium">Físico</span>
            </label>
            <label
              className="flex items-center gap-1 hover:cursor-pointer"
              htmlFor="digital"
            >
              <input type="checkbox" name="" id="digital" />
              <span className="font-medium">Digital</span>
            </label>
          </div>
        </div>
        <hr className="w-full border-zinc-200" />
        <div className="flex w-full flex-col gap-3">
          <div className="">
            <h3 className="font-semibold text-xl">Categorias:</h3>
          </div>
          <div className="flex flex-col gap-1">
            {petShopCategories.map((item, index) => (
              <label
                key={index}
                className="flex items-center justify-start gap-1 hover:cursor-pointer"
                htmlFor={`${item}_${index}`}
              >
                <input type="checkbox" name="" id={`${item}_${index}`} />
                <span className="font-medium">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
