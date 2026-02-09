import axios from "axios";
import { auth } from "../firebase/config";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api"
});

API.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const token = await user.getIdToken(true);
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error("Token fetch failed:", error);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
