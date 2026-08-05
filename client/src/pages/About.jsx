import videoFile from "../assets/videos/Tcell.mp4";
import { FaFileVideo } from "react-icons/fa";
import Loading from "../components/Loading";

export default function About() {
  return (
    <Loading>
      <section className="w-full bg-white py-10 px-4 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          {/* Bloco "Sobre Nós" */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 space-y-4 animate-fadeInLeft">
              <h2 className="text-4xl font-bold text-blue-700">Sobre Nós</h2>
              <p className="text-zinc-700 leading-relaxed text-lg">
                Tenha a garantia de um excelente serviço que concilia preço e
                qualidade. Com mais de 20 anos de experiência, a Tcell oferece
                confiança, inovação e dedicação a cada atendimento.
              </p>
              <p className="text-zinc-700 leading-relaxed text-lg">
                Fundada no interior do Ceará, hoje atendemos todo o Brasil com
                soluções ágeis, atendimento humano e excelência técnica.
              </p>
            </div>

            {/* Vídeo institucional */}
            <div className="md:w-1/2 w-full rounded-2xl overflow-hidden shadow-xl animate-fadeInRight">
              <video
                className="w-full h-full object-cover rounded-xl"
                src={videoFile}
                autoPlay
                loop
                muted
                controls
              />
            </div>
          </div>

          {/* Linha divisória */}
          <hr className="border-gray-300 my-5" />

          {/* Bloco "Quem Somos" + "Serviços" */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Quem Somos */}
            <div className="space-y-4 animate-zoomInLeft">
              <h3 className="text-3xl font-bold text-blue-700">Quem Somos</h3>
              <p className="text-zinc-700 leading-relaxed text-base">
                A Tcell Celulares e Informática foi fundada no Ceará, na cidade
                de Ipu. Com o objetivo de oferecer o melhor atendimento e os
                produtos de maior qualidade, hoje estamos no Rio de Janeiro e
                atendemos clientes de todo o Brasil através do nosso site.
              </p>
              <p className="text-zinc-700 leading-relaxed text-base">
                Com mais de duas décadas de história, construímos uma reputação
                sólida baseada em ética, confiança e compromisso com a
                excelência.
              </p>
            </div>

            {/* Nossos Serviços */}
            <div className="space-y-4 animate-zoomInRight">
              <h3 className="text-3xl font-bold text-blue-700">
                Nossos Serviços
              </h3>
              <p className="text-zinc-700 leading-relaxed text-base">
                Especialistas em troca de tela, bateria e consertos técnicos,
                usamos peças originais ou de alta compatibilidade. Nosso time
                técnico segue padrões rigorosos de qualidade e atua com
                transparência desde o diagnóstico até a entrega do aparelho.
              </p>
              <p className="text-zinc-700 leading-relaxed text-base">
                Agora com o nosso site, conseguimos estender esse atendimento
                para todo o Brasil, oferecendo praticidade, segurança e
                agilidade para quem busca reparos confiáveis sem sair de casa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Loading>
  );
}
