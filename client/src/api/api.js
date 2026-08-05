import axios from "axios";

console.log("Route: ", import.meta.env.VITE_API_BASE_URL);
//https://tcellecommerce-production.up.railway.app
const api = axios.create({
  //baseURL: import.meta.env.VITE_API_BASE_URL, // URL base do .env
  baseURL: "https://tcellcelulares-production-03b1.up.railway.app",
});

export default api;
