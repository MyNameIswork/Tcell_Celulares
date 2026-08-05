import React from "react";
import { IoCart } from "react-icons/io5";

export default function CardProduct({ product }) {
  // Criando a mensagem para o WhatsApp
  const message = `Olá! Gostaria de comprar o produto "${
    product.product
  }" por R$ ${product.price.toFixed(2).replace(".", ",")}.`;
  const whatsappNumber = "5521984940065"; // Coloque o número no formato internacional, sem "+" e sem espaços
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div
      key={product._id}
      className="h-auto md:w-auto w-full flex flex-col items-center hover:cursor-pointer hover:shadow-sm transition-all ease-in duration-150 bg-white border border-zinc-200"
    >
      <div className="flex-grow w-full relative flex justify-center items-center">
        <span className="absolute top-0 right-0 m-3 font-semibold text-zinc-100 bg-black/70 px-3 py-0.5 rounded-full">
          R$ {product.price.toFixed(2).replace(".", ",")}
        </span>
        <img
          className="object-cover h-full w-full aspect-square"
          src={product.photos[0]}
          alt="foto"
        />
      </div>
      <div className="w-full p-3 flex flex-col gap-2 rounded-b-2xl border-t border-zinc-200">
        <h2
          className="font-bold text-zinc-800 line-clamp-2 leading-5 text-center"
          title={product.product}
        >
          {product.product}
        </h2>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black flex items-center justify-center gap-1 text-zinc-100 font-bold px-3 py-1 w-full rounded-full"
        >
          <IoCart />
          Comprar
        </a>
      </div>
    </div>
  );
}
