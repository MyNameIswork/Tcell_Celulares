import { useState, useEffect } from "react";

// Substitua pelo caminho da sua logo
import logo from "../assets/img/logo.jpg"; // Ajuste o caminho da sua logo aqui

const Loading = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Garante que o loading fique visível por pelo menos 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 3 segundos

    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
  }, []);

  return (
    <>
      {isLoading && (
        <div className="flex-1 flex flex-col justify-center items-center bg-white z-10">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo Tcell Celulares e Informática"
            className="w-48 h-auto mb-6" // Ajuste o tamanho conforme necessário
          />

          {/* Animação das bolinhas saltando */}
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-0"></div>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-200"></div>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-400"></div>
          </div>
        </div>
      )}
      {!isLoading && children}
    </>
  );
};

export default Loading;
