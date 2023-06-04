import style from "./Pagination.module.css";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
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

  return <div className={style.Pagination}>{renderPageIndicators()}</div>;
};

export default Pagination;
