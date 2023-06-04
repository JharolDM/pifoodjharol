import React, { useState } from "react";
import { findRecipes } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./SearchBar.module.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleSearch = () => {
    dispatch(findRecipes(title));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (event) => {
    setTitle(event.target.value);
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
    </div>
  );
}

export default SearchBar;
