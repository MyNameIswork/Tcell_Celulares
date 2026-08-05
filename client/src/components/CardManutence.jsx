export default function CardManutence() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 flex-1">
      <div className="flex justify-center items-center bg-zinc-100 p-1 rounded-full gap-1 text-2xl">
        <div className="">
          <span className="px-3 py-1 bg-zinc-200 rounded-full font-medium hover:cursor-pointer">
            Celular
          </span>
        </div>
        <div className="">
          <span className="px-3 py-1 bg-zinc-200 rounded-full font-medium hover:cursor-pointer">
            Relógio
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col gap-2 border border-zinc-200 rounded-2xl p-3">
        <div className="flex items-center gap-2">
          <label className="flex flex-col gap-1.5" htmlFor="">
            <span className="font-medium">Marca:</span>
            <select
              className="px-3 py-1 border border-zinc-200 bg-white outline-none hover:cursor-pointer"
              name=""
              id=""
            >
              <option value="" disabled>
                Escolha
              </option>
              <option value="">Motorola</option>
              <option value="">Apple</option>
              <option value="">Samsung</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5" htmlFor="">
            <span className="font-medium">Modelo:</span>
            <select
              className="px-3 py-1 border border-zinc-200 bg-white outline-none hover:cursor-pointer"
              name=""
              id=""
            >
              <option value="" disabled>
                Escolha
              </option>
              <option value="">Motorola</option>
              <option value="">Apple</option>
              <option value="">Samsung</option>
            </select>
          </label>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex flex-col gap-1.5" htmlFor="">
            <span className="font-medium">Defeito:</span>
            <select
              className="px-3 py-1 border border-zinc-200 bg-white outline-none hover:cursor-pointer"
              name=""
              id=""
            >
              <option value="" disabled>
                Escolha
              </option>
              <option value="">Motorola</option>
              <option value="">Apple</option>
              <option value="">Samsung</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5" htmlFor="">
            <span className="font-medium">Peça:</span>
            <select
              className="px-3 py-1 border border-zinc-200 bg-white outline-none hover:cursor-pointer"
              name=""
              id=""
            >
              <option value="" disabled>
                Escolha
              </option>
              <option value="">Motorola</option>
              <option value="">Apple</option>
              <option value="">Samsung</option>
            </select>
          </label>
        </div>
        <div className="flex justify-center items-center gap-2 flex-grow w-full">
          <span className="font-bold">R$ 300</span>
          <button className="px-3 py-1 bg-black text-white font-bold flex-grow rounded-md">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
