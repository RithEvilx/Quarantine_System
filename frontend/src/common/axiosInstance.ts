import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 40000,
  withCredentials: true,
  headers: {
    Accept: "*/*",
  },
});

export default axiosInstance;