import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  user: null,
};
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const res = await customFetch.post("/auth/testingRegister", user);
      console.log(res);
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error.response);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    console.log(`Login User:${JSON.stringify(user)}`);
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
});

export default userSlice.reducer;
