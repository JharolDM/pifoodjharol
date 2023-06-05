import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageIndicators = () => {
    const indicators = [];

    for (let i = 0; i < totalPages; i++) {
      const indicator = (
        <span
          key={i}
          className={`${style.PageIndicator} ${
            i === currentPage ? style.Active : ""
          }`}
          onClick={() => onPageChange(i)}
        >
          {i + 1}
        </span>
      );

      indicators.push(indicator);
    }

    return indicators;
  };

  return (
    <div className={style.Pagination}>
      <button
        className={style.PrevButton}
        onClick={handlePrevPage}
        disabled={currentPage === 0}
      >
        Prev
      </button>
      <div className={style.PageIndicators}>{renderPageIndicators()}</div>
      <button
        className={style.NextButton}
        onClick={handleNextPage}
        disabled={currentPage === totalPages - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
