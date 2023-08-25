import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearAllJobState } from "../allJobs/allJobsSlice";
import { clearValue } from "../jobs/jobSlice";
import { logoutUser } from "./userSlice";

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const res = await customFetch.post(url, user);
    return res.data;
  } catch (error) {
    checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const res = await customFetch.post(url, user);
    return res.data;
  } catch (error) {
    checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const { data } = await customFetch.patch(url, user, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearValue());
    thunkAPI.dispatch(clearAllJobState());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
