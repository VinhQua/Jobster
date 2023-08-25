import { createAsyncThunk } from "@reduxjs/toolkit";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearValue } from "./jobSlice";
import { logoutUser } from "../users/userSlice";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const { data } = await customFetch.post("jobs", job);
    thunkAPI.dispatch(clearValue());
    return data;
  } catch (error) {
    checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoading());
    const { data } = await customFetch.delete(`jobs/${jobId}`);
    thunkAPI.dispatch(getAllJobs());
    return data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const { data } = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValue());
    return data;
  } catch (error) {
    checkForUnauthorizedResponse(error, thunkAPI);
  }
};
