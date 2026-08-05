import Banner from "../components/Banner";
import CardProduct from "../components/CardProduct";
import CategoryBanner from "../components/CategoryBanner";
import Whatsapp from "../components/Whatsapp";
import { useEffect, useState } from "react";

import BannerOne from "../assets/img/Banner-servicos.jpg";
import BannerTwo from "../assets/img/Point-Mini-Cupom.jpg";
import BannerThree from "../assets/img/Banner-servicos-1.jpg";

import ImageBannerOne from "../assets/img/Banner-8.jpg";
import ImageBannerTwo from "../assets/img/banner-16.jpg";
import ImageBannerThree from "../assets/img/Banner-servicos-1.jpg";
import api from "../api/api";
//import axios from "axios";
import Loading from "../components/Loading";

export default function Home() {
  const [products, setProducts] = useState([]);
  console.log("Produtos", products);

  const bannerOne = [
    {
      photo: BannerOne,
      link: "https://images.pexels.com/photos/19165530/pexels-photo-19165530/free-photo-of-panorama-vista-paisagem-verao.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      photo: BannerTwo,
      link: "https://www.mercadopago.com.br/ferramentas-para-vender/maquininhas-point/point-mini",
    },
    {
      photo: BannerThree,
      link: "https://wa.me/5521964424229?text=A%20tela%20do%20meu%20celular%20quebrou.%20Preciso%20trocar!",
    },
  ];

  const bannerTwo = [
    {
      photo: ImageBannerOne,
      link: "https://images.pexels.com/photos/461956/pexels-photo-461956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      photo: ImageBannerTwo,
      link: "https://images.pexels.com/photos/1131407/pexels-photo-1131407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      photo: ImageBannerThree,
      link: "https://images.pexels.com/photos/13370710/pexels-photo-13370710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  useEffect(() => {
    handleDataProduct();
  }, []);

  const handleDataProduct = async () => {
    try {
      const response = await api.get("/api/v1/product/store/1");

      if (!response.data.list || response.data.list.length === 0) {
        console.warn("Nenhum produto encontrado.");
        setProducts([]); // Garante que não haverá erro ao mapear os produtos
        return;
      }

      setProducts(response.data.list);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error.message);
      setProducts([]); // Evita um crash no frontend
    }
  };

  return (
    <Loading>
      <main className="flex flex-1 justify-center items-center flex-col p-2 gap-2">
        <Banner images={bannerOne} />
        <CategoryBanner />
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 md:w-3/4 w-full">
          {products &&
            products.length > 0 &&
            products.map((item) => (
              <CardProduct key={item._id} product={item} />
            ))}
        </div>
        <Banner images={bannerTwo} />
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 md:w-3/4 w-full">
          {products &&
            products.length > 0 &&
            products.map((item) => (
              <CardProduct key={`second-${item._id}`} product={item} />
            ))}
        </div>
        <Whatsapp
          title={"Fale Conosco"}
          contact={"21984940065"}
          message={"Estou com uma dúvida"}
        />
      </main>
    </Loading>
  );
}
