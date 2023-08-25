import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { logoutUser } from "../users/userSlice";
import { toast } from "react-toastify";
import { getAllJobsThunk, showStatsThunk } from "./allJobsThunk";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk("allJobs/getJobs", getAllJobsThunk);
export const showStats = createAsyncThunk("allJobs/showStats", showStatsThunk);
const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleFiltersInput: (state, { payload }) => {
      const { name, value } = payload;

      return { ...state, page: 1, [name]: value };
    },
    clearJobFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllJobState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
        state.numOfPages = payload.numOfPages;
        state.totalJobs = payload.totalJobs;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});
export const {
  changePage,
  showLoading,
  hideLoading,
  handleFiltersInput,
  clearJobFilters,
  clearAllJobState,
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
