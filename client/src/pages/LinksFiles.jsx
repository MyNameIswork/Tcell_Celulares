import React, { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { FiLink, FiFileText } from "react-icons/fi";
import api from "../api/api";

const listDevices = ["Pc", "Impressora", "Celular"];

export default function LinksFiles() {
  const [selectedOption, setSelectedOption] = useState("Files");
  const [device, setDevice] = useState("");
  const [links, setLinks] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    if (device) fetchFiles();
  }, [device]);

  const fetchLinks = async () => {
    try {
      const response = await api.get("/api/v1/link/list");
      setLinks(response.data.list);
    } catch (error) {
      setLinks([]);
      console.error("Erro ao buscar links", error.message);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await api.get(`/api/v1/file/list?device=${device}`);
      setFiles(response.data.list);
    } catch (error) {
      setFiles([]);
      console.error("Erro ao buscar arquivos", error.message);
    }
  };

  return (
    <div className="w-full px-4 py-8 flex flex-col items-center gap-6">
      {/* Título e descrição */}
      <div className="text-center max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-700">
          Links e Arquivos Úteis
        </h2>
        <p className="text-gray-600 mt-2 text-base">
          Aqui você encontra ferramentas, programas e links essenciais como
          acesso à 2ª via de contas, manuais e utilitários.
        </p>
      </div>

      {/* Tabs de seleção */}
      <div className="flex gap-4 bg-gray-100 rounded-full p-2 shadow-inner">
        {["Files", "Links"].map((option) => (
          <button
            key={option}
            onClick={() => {
              setSelectedOption(option);
              setDevice("");
            }}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedOption === option
                ? "bg-white shadow text-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            {option === "Files" ? "Arquivos" : "Links"}
          </button>
        ))}
      </div>

      {/* Área de conteúdo */}
      <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        {selectedOption === "Links" ? (
          links.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {links.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FiLink className="text-blue-500 text-xl" />
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Acessar agora
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              Nenhum link disponível no momento.
            </p>
          )
        ) : (
          <div className="flex flex-col items-center gap-6">
            <select
              className="px-4 py-2 rounded-md border border-gray-300 shadow-sm bg-white text-gray-700 font-medium w-full max-w-sm"
              value={device}
              onChange={(e) => setDevice(e.target.value)}
            >
              <option value="" disabled>
                Selecione um dispositivo
              </option>
              {listDevices.map((d, idx) => (
                <option key={idx} value={d}>
                  {d}
                </option>
              ))}
            </select>

            {device && files.length > 0 ? (
              <div className="w-full space-y-4">
                {files.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg p-4 shadow hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <FiFileText className="text-gray-500 text-xl" />
                      <span className="text-gray-800 font-medium">
                        {item.name}
                      </span>
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md font-semibold"
                    >
                      <IoMdDownload className="text-lg" />
                      Baixar
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              device && (
                <p className="text-center text-gray-500 text-lg">
                  Nenhum arquivo disponível para este dispositivo.
                </p>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
