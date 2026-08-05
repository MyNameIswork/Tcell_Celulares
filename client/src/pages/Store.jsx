import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import CardProduct from "../components/CardProduct";
import Loading from "../components/Loading";
import api from "../api/api";

import BannerOne from "../assets/img/Banner-servicos.jpg";
import BannerTwo from "../assets/img/Point-Mini-Cupom.jpg";
import BannerThree from "../assets/img/Banner-servicos-1.jpg";

const bannerOne = [
  {
    photo: BannerOne,
    link: "https://images.pexels.com/photos/19165530/pexels-photo-19165530/free-photo-of-panorama-vista-paisagem-verao.jpeg",
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

export default function Store() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("novidades");

  useEffect(() => {
    handleDataProduct();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [products, search, priceMin, priceMax, selectedCategory, sortOrder]);

  const handleDataProduct = async () => {
    try {
      const response = await api.get("/api/v1/product/store/1");
      const data = response.data.list || [];
      setProducts(data);

      const allCategories = [
        ...new Set(data.map((item) => item?.category).filter(Boolean)),
      ];
      setCategories(allCategories);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error.message);
      setProducts([]);
    }
  };

  const handleFilter = () => {
    let temp = [...products];

    // Busca segura com fallback
    if (search) {
      temp = temp.filter((p) => {
        const name = p?.name || p?.title || p?.nome || "";
        return name.toLowerCase().includes(search.toLowerCase());
      });
    }

    if (priceMin) {
      temp = temp.filter(
        (p) => parseFloat(p?.price || 0) >= parseFloat(priceMin)
      );
    }

    if (priceMax) {
      temp = temp.filter(
        (p) => parseFloat(p?.price || 0) <= parseFloat(priceMax)
      );
    }

    if (selectedCategory) {
      temp = temp.filter((p) => p?.category === selectedCategory);
    }

    switch (sortOrder) {
      case "preco_asc":
        temp.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "preco_desc":
        temp.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      default:
        break;
    }

    setFiltered(temp);
  };

  return (
    <Loading>
      <section className="p-2">
        <Banner images={bannerOne} />
      </section>

      <section className="flex flex-col md:flex-row gap-4 p-4">
        {/* Filtro lateral */}
        <aside className="w-full md:w-1/4 border rounded-md p-4 shadow-sm bg-white">
          <h2 className="text-lg font-semibold mb-4">Filtrar</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium">Buscar</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar produto..."
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Preço mínimo</label>
            <input
              type="number"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Preço máximo</label>
            <input
              type="number"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Categoria</label>
            <select
              className="mt-1 w-full p-2 border rounded"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* Lista de produtos */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Produtos</h2>
            <select
              className="p-2 border rounded"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="novidades">Novidades</option>
              <option value="preco_desc">Preço decrescente</option>
              <option value="preco_asc">Preço crescente</option>
            </select>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <CardProduct key={item.id} product={item} />
              ))
            ) : (
              <p>Nenhum produto encontrado.</p>
            )}
          </div>
        </div>
      </section>
    </Loading>
  );
}
