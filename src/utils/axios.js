import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";
import { clearStore } from "../features/users/userSlice";

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

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    return thunkAPI.dispatch(clearStore("Unauthorized! Logging out..."));
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};
export default customFetch;
