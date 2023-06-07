import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./CardsContainer.module.css"; // Importa los estilos CSS específicos para el componente del contenedor de tarjetas
import Card from "../Card/Card"; // Importa el componente de tarjeta
import SearchBar from "../SearchBar/SearchBar"; // Importa el componente de barra de búsqueda
import Buttons from "../Buttons/Buttons"; // Importa el componente de botones
import Pagination from "../Pagination/Pagination"; // Importa el componente de paginación

const CardsContainer = () => {
  const recipes = useSelector((state) => state.recipes); // Obtiene las recetas del estado global utilizando el hook useSelector de react-redux
  const error = useSelector((state) => state.error); // Obtiene el mensaje de error del estado global utilizando el hook useSelector
  const cardsPerPage = 9; // Número de tarjetas por página
  const totalPages = Math.ceil(recipes.length / cardsPerPage); // Calcula el número total de páginas en función del número de recetas y el número de tarjetas por página

  const [currentPage, setCurrentPage] = useState(0); // Estado local que almacena la página actual
  const [reset, setReset] = useState(false); // Estado local que indica si se ha reiniciado el filtro

  useEffect(() => {
    setCurrentPage(0); // Reinicia la página actual cuando cambia la lista de recetas
    setReset(false); // Reinicia el estado de reinicio del filtro
  }, [recipes, reset]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex); // Maneja el cambio de página estableciendo el índice de página actual
  };

  const renderCards = () => {
    const startIndex = currentPage * cardsPerPage; // Índice de inicio de las tarjetas en la página actual
    const endIndex = startIndex + cardsPerPage; // Índice de fin de las tarjetas en la página actual
    const currentRecipes = Array.isArray(recipes) ? recipes.slice(startIndex, endIndex) : []// Obtiene las recetas para la página actual

    if (currentRecipes.length === 0) {
      return <p>No recipes were found with the specified search term, please check the name and try again.</p>;
    }

    return (
      <>
        <div className={style.CardGroup}>
          {currentRecipes.slice(0, 5).map((recipe) => (
            <Card
              id={recipe.id}
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              diets={recipe.diets}
              healthScore={recipe.healthScore}
            />
          ))}
        </div>
        <div className={style.Space} />
        <div className={style.CardGroup}>
          {currentRecipes.slice(5, 9).map((recipe) => (
            <Card
              id={recipe.id}
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              diets={recipe.diets}
              healthScore={recipe.healthScore}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={style.mainCont}>
      <div className={style.filterContainer}>
        <Buttons /> {/* Renderiza el componente de botones para filtrar */}
      </div>
      <div className={style.CardsContainer}>
        <h2>Choose your recipe</h2>
        {error ? (
          <p>{error}</p> // Si hay un error, muestra el mensaje de error
        ) : (
          <>
            {renderCards()} {/* Renderiza las tarjetas */}
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            /> {/* Renderiza el componente de paginación con el número total de páginas, la página actual y la función de cambio de página */}
          </>
        )}
        <div className={style.footer}>
          <div className={style.searchBar}>
            <SearchBar /> {/* Renderiza el componente de barra de búsqueda */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsContainer;
