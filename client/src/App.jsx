import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import EmptyPage from "./pages/EmptyPage";
import Nav from "./components/Nav";
import NavAdmin from "./components/admin/NavAdmin";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login";
import Manutence from "./pages/Manutence";
import LinksFiles from "./pages/LinksFiles";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/loja" element={<Store />} />
          <Route path="/programas-links" element={<LinksFiles />} />
          <Route path="/reparo" element={<Manutence />} />
          <Route path="*" element={<EmptyPage />} />
        </Route>
        <Route path="/wandesson" element={<NavAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="/wandesson/acessar" element={<Login />} />
          <Route path="*" element={<EmptyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
