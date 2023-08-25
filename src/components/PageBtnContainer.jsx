import React from "react";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../features/allJobs/allJobsSlice";
const PageBtnContainer = () => {
  const { page, numOfPages } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();
  let pages = Array.from({ length: numOfPages }, (_, index) => index + 1);
  const handleNext = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };
  const handlePrev = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      <button type="button" className="prev-btn" onClick={handlePrev}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => (
          <button
            type="button"
            key={pageNumber}
            className={pageNumber === page ? "pageBtn active" : "pageBtn"}
            onClick={() => dispatch(changePage(pageNumber))}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button type="button" className="next-btn" onClick={handleNext}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
