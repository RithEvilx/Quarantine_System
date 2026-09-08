import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || "http://localhost:168/api/v1",
  timeout: 40000,
  withCredentials: true,
  headers: { Accept: "*/*" },
});

export default axiosInstance;