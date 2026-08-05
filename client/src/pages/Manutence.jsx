import React, { useEffect, useState } from "react";
import { GrConfigure } from "react-icons/gr";
import api from "../api/api";

const listBrand = [
  "Nokia",
  "OnePlus",
  "Honor",
  "Realme",
  "Infinix",
  "Apple",
  "Samsung",
  "Motorola",
  "LG",
  "MI",
  "REDMI",
  "NOTE",
];

export default function Manutence() {
  const [brand, setBrand] = useState("");
  const [manutence, setManutence] = useState("");
  const [manutenceOptions, setManutenceOptions] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(null);

  useEffect(() => {
    if (brand) {
      resetFields();
      fetchManutence();
    }
  }, [brand]);

  useEffect(() => {
    if (manutence) {
      setModels([]);
      setSelectedModel("");
      setSelectedPrice(null);
      fetchModels();
    }
  }, [manutence]);

  const resetFields = () => {
    setManutence("");
    setManutenceOptions([]);
    setModels([]);
    setSelectedModel("");
    setSelectedPrice(null);
  };

  const fetchManutence = async () => {
    try {
      const res = await api.get(
        `/api/v1/manutence/list/manutence?brand=${brand}`
      );
      const list = res.data.list || [];
      setManutenceOptions(list);
      setManutence(list.length > 0 ? list[0].manutence : "");
    } catch (err) {
      console.error("Erro ao buscar manutenção:", err.message);
    }
  };

  const fetchModels = async () => {
    try {
      const res = await api.get(
        `/api/v1/manutence/list/models?brand=${brand}&manutence=${manutence}`
      );
      const list = res.data.list || [];
      const modelList = Array.isArray(list[0]?.models) ? list[0].models : [];
      setModels(modelList);
    } catch (err) {
      console.error("Erro ao buscar modelos:", err.message);
    }
  };

  const handleModelChange = (e) => {
    const modelName = e.target.value;
    setSelectedModel(modelName);
    const modelData = models.find((item) => item.model === modelName);
    setSelectedPrice(modelData ? modelData.price : null);
  };

  const handleSendWhatsApp = () => {
    if (!brand || !manutence || !selectedModel) {
      alert("Por favor, selecione todas as opções antes de continuar.");
      return;
    }

    const message = `Olá! Gostaria de solicitar um conserto para:
*Marca:* ${brand}
*Serviço:* ${manutence}
*Modelo:* ${selectedModel}
*Preço:* R$ ${selectedPrice?.toFixed(2).replace(".", ",") || "N/A"}`;

    const whatsappNumber = "5521984940065";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="w-full flex justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            Conserte seu Aparelho
          </h1>
          <p className="text-gray-600 text-base">
            Troque a tela, bateria ou solicite reparos técnicos com facilidade.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Seletor de marca */}
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 font-medium"
          >
            <option value="" disabled>
              Selecione uma marca
            </option>
            {listBrand.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Seletor de manutenção */}
          {manutenceOptions.length > 0 && (
            <select
              value={manutence}
              onChange={(e) => setManutence(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 font-medium"
            >
              <option value="" disabled>
                Selecione o tipo de manutenção
              </option>
              {manutenceOptions.map((item, i) => (
                <option key={i} value={item.manutence}>
                  {item.manutence}
                </option>
              ))}
            </select>
          )}

          {/* Seletor de modelo */}
          {models.length > 0 && (
            <select
              value={selectedModel}
              onChange={handleModelChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 font-medium"
            >
              <option value="" disabled>
                Selecione o modelo
              </option>
              {models.map((item, i) => (
                <option key={i} value={item.model}>
                  {item.model}
                </option>
              ))}
            </select>
          )}

          {/* Preço */}
          {selectedPrice !== null && (
            <div className="text-center">
              <span className="text-xl font-bold text-green-600">
                Preço: R$ {selectedPrice.toFixed(2).replace(".", ",")}
              </span>
            </div>
          )}

          {/* Botão WhatsApp */}
          <button
            onClick={handleSendWhatsApp}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-lg shadow transition-all"
          >
            <GrConfigure className="text-lg" />
            Solicitar Conserto via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
