import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEyeSlash, FaEye, FaLongArrowAltLeft } from "react-icons/fa";
import { useSnackbar } from "notistack";
import Whatsapp from "../../components/Whatsapp";
import api from "../../api/api";

export default function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const alterIconPassword = () => {
    setHiddenPassword(!hiddenPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/api/v1/user/login", formData, {
        withCredentials: true,
      });
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        enqueueSnackbar("Login Feita com sucesso!", { variant: "success" });
        setTimeout(() => {
          window.location.href = "/painel";
        }, 3000);
      } else {
        enqueueSnackbar(
          `Não foi possível pegar o token de acesso, tente novamente mais tarde`,
          {
            variant: "error",
          }
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      enqueueSnackbar(`${error.message}`, { variant: "error" });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const handleData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <main className="flex flex-1 justify-center items-center flex-col md:gap-3 gap-2">
      <section>
        <div className="p-3 border border-zinc-200 rounded-md bg-white shadow-sm">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <h1 className="font-bold text-2xl">Acessar Conta</h1>
            <label className="flex flex-col gap-1.5">
              <span className="font-medium">Email:</span>
              <input
                className="px-3 py-1 border border-zinc-200 rounded-sm outline-none font-medium"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleData}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-medium">Senha: </span>
              <div className="flex items-center border border-zinc-200 rounded-sm">
                <input
                  className="px-3 py-1 border-r border-zinc-200 outline-none font-medium"
                  type={hiddenPassword ? "password" : "text"}
                  name="password"
                  placeholder="*****"
                  value={formData.password}
                  onChange={handleData}
                />
                {hiddenPassword ? (
                  <FaEyeSlash
                    className="mx-2 hover:cursor-pointer"
                    onClick={alterIconPassword}
                  />
                ) : (
                  <FaEye
                    className="mx-2 hover:cursor-pointer"
                    onClick={alterIconPassword}
                  />
                )}
              </div>
            </label>
            <Link
              className="hover:underline text-sm text-red-500 transition-all ease-in-out duration-150"
              href="/esqueceu-a-senha"
            >
              Esqueceu a senha ?
            </Link>
            <input
              className="bg-black text-zinc-100 font-bold px-3 py-1 rounded-sm hover:cursor-pointer"
              type="submit"
              value="Acessar"
            />
          </form>
        </div>
      </section>
      <section>
        <Link className="flex items-center gap-1" href="/">
          <FaLongArrowAltLeft />
          <span className="font-medium text-sm">Voltar ao Início</span>
        </Link>
      </section>
      <Whatsapp
        title={"Precisa de ajuda ?"}
        contact={21993737130}
        message={"Estou com problema no site"}
      />
    </main>
  );
}
