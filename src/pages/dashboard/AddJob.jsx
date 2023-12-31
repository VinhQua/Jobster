import React, { useEffect } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { FormRow, FormSelect } from "../../components";
import {
  clearValue,
  createJob,
  editJob,
  handleJobInput,
} from "../../features/jobs/jobSlice";
const AddJob = () => {
  const { user } = useSelector((store) => store.user);
  // add default location
  useEffect(() => {
    if (!isEditing) {
      dispatch(handleJobInput({ name: "jobLocation", value: user.location }));
    }
  }, []);
  const dispatch = useDispatch();
  const {
    editJobId,
    isLoading,
    position,
    company,
    jobLocation,
    isEditing,
    statusOptions,
    status,
    jobType,
    jobTypeOptions,
  } = useSelector((store) => store.job);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      console.log("All Fields Required");
    }
    if (!isEditing) {
      return dispatch(
        createJob({ position, company, jobLocation, jobType, status })
      );
    }
    let job = { position, company, jobLocation, jobType, status };
    return dispatch(editJob({ jobId: editJobId, job }));
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleJobInput({ name, value }));
  };

  return (
    <Wrapper>
      <div className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          {/* position */}
          <FormRow
            name="position"
            value={position}
            type="text"
            handleChange={handleChange}
          />
          {/* company */}
          <FormRow
            name="company"
            value={company}
            type="text"
            handleChange={handleChange}
          />
          {/* job location */}
          <FormRow
            name="jobLocation"
            labelText="job location"
            value={jobLocation}
            type="text"
            handleChange={handleChange}
          />

          {/* status */}
          <FormSelect
            name="status"
            list={statusOptions}
            value={status}
            handleChange={handleChange}
          />
          {/* Job Type */}
          <FormSelect
            name="jobType"
            value={jobType}
            list={jobTypeOptions}
            handleChange={handleChange}
            labelText="job type"
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValue())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isEditing ? "save" : "submit"}
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddJob;
