import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Interceptor para agregar el token a cada solicitud
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
