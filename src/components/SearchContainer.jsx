import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/SearchContainer";
import FormRow from "./FormRow";
import FormSelect from "./FormSelect";
import {
  clearJobFilters,
  handleFiltersInput,
} from "../features/allJobs/allJobsSlice";
const SearchContainer = () => {
  const { search, searchType, searchStatus, sort, sortOptions } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleFiltersInput({ name, value }));
  };

  return (
    <Wrapper>
      <div className="form">
        <h4>Search Form</h4>
        <div className="form-center">
          <FormRow
            name="search"
            type="text"
            value={search}
            handleChange={handleChange}
          />
          <FormSelect
            name="searchStatus"
            labelText="status"
            list={["pending", "declined", "interview"]}
            value={searchStatus}
            handleChange={handleChange}
          />
          <FormSelect
            name="searchType"
            labelText="type"
            list={["all", "declined", "interview"]}
            value={searchType}
            handleChange={handleChange}
          />
          <FormSelect
            name="sort"
            list={sortOptions}
            value={sort}
            handleChange={handleChange}
          />
          <button
            type="button"
            className="btn btn-block btn-danger"
            onClick={() => dispatch(clearJobFilters())}
          >
            clear filters
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default SearchContainer;
