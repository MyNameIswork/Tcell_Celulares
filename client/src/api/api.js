import axios from "axios";

console.log("Route: ", import.meta.env.VITE_API_BASE_URL);
//https://tcellecommerce-production.up.railway.app
const api = axios.create({
  //baseURL: import.meta.env.VITE_API_BASE_URL, // URL base do .env
  baseURL: "http://localhost:8080/",
});

export default api;
