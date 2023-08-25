import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllJobsThunk = async (_, thunkAPI) => {
  const { search, searchStatus, searchType, sort, page } =
    thunkAPI.getState().allJobs;
  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  if (search) {
    url += `&search=${search}`;
  }
  try {
    const { data } = await customFetch.get(url);

    return data;
  } catch (error) {
    checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const { data } = await customFetch.get("/jobs/stats");
    console.log(data);
    return data;
  } catch (error) {
    checkForUnauthorizedResponse(error, thunkAPI);
  }
};
