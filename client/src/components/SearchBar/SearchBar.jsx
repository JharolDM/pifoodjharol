import React, { useState } from "react";
import { findRecipes } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./SearchBar.module.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Agrega un estado local para almacenar el mensaje de error

  const handleSearch = () => {
    if (title === "") {
      setErrorMessage("Ingresa un término de búsqueda"); // Muestra un mensaje de error si no se ingresa ningún término de búsqueda
      return;
    }

    dispatch(findRecipes(title));
    setErrorMessage(""); // Reinicia el mensaje de error a un estado vacío en caso de que haya ocurrido un error anteriormente
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (event) => {
    setTitle(event.target.value);
    setErrorMessage(""); // Reinicia el mensaje de error cuando se realiza un cambio en el input de búsqueda
  };

  return (
    <div className={style.searchBarContainer}>
      <input
        className={style.searchInput}
        type="text"
        value={title}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Buscar..."
      />
      <button className={style.searchButton} onClick={handleSearch}>
        Buscar
      </button>
      {errorMessage && <p className={style.error}>{errorMessage}</p>} {/* Muestra el mensaje de error si existe */}
    </div>
  );
}

export default SearchBar;
