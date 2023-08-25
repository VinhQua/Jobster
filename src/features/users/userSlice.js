import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import {
  clearStoreThunk,
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
} from "./userThunk";

const initialState = {
  isSideBarOpen: false,
  isLoading: false,
  user: getUserFromLocalStorage(),
};
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => registerUserThunk("auth/register", user, thunkAPI)
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => loginUserThunk("auth/login", user, thunkAPI)
);
export const updateUser = createAsyncThunk(
  "user/userUpdate",
  async (user, thunkAPI) => updateUserThunk("auth/updateUser", user, thunkAPI)
);
export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSideBarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello There ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        console.log(payload.user);
        state.isLoading = false;
        state.user = payload.user;
        toast.success("User Updated");
        addUserToLocalStorage(payload.user);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, () => {
        toast.error("There is an error...");
      });
  },
});
export const { toggleSideBar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
