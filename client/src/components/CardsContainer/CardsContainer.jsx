import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./CardsContainer.module.css";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import Buttons from "../Buttons/Buttons";
import Pagination from "../Pagination/Pagination";

const CardsContainer = () => {
  const recipes = useSelector((state) => state.recipes);
  const error = useSelector((state) => state.error);
  const cardsPerPage = 9;
  const totalPages = Math.ceil(recipes.length / cardsPerPage);

  const [currentPage, setCurrentPage] = useState(0);
  const [reset, setReset] = useState(false);


  useEffect(() => {
    setCurrentPage(0);
    setReset(false);
  }, [recipes, reset]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleFilterChange = () => {
    setCurrentPage(0);
  };

  const renderCards = () => {
    const startIndex = currentPage * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const currentRecipes = recipes.slice(startIndex, endIndex);

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
        <div className={style.Space} /> {/* Espacio vertical */}
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
        <Buttons />
      </div>
      <div className={style.CardsContainer}>
        <h2>Choose your recipe</h2>
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            {renderCards()}
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
        <div className={style.footer}>
          <div className={style.searchBar}>
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsContainer;
