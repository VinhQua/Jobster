import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});

customFetch.interceptors.request.use((config) => {
  try {
    const user = getUserFromLocalStorage() || null;
    if (user) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});
export default customFetch;
