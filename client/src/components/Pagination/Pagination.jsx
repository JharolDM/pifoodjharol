import React from "react";
import style from "./Pagination.module.css"; // Importa los estilos CSS específicos para el componente de paginación

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1); // Llama a la función onPageChange con el índice de la página anterior como parámetro
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1); // Llama a la función onPageChange con el índice de la página siguiente como parámetro
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
          onClick={() => onPageChange(i)} // Llama a la función onPageChange con el índice de la página seleccionada como parámetro
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
        className={style.PrevButton} // Aplica la clase CSS "PrevButton" al botón de página anterior
        onClick={handlePrevPage}
        disabled={currentPage === 0} // Deshabilita el botón si es la primera página
      >
        Prev
      </button>
      <div className={style.PageIndicators}>{renderPageIndicators()}</div> 
      <button // Renderiza los indicadores de página
        className={style.NextButton} // Aplica la clase CSS "NextButton" al botón de página siguiente
        onClick={handleNextPage}
        disabled={currentPage === totalPages - 1} // Deshabilita el botón si es la última página
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
