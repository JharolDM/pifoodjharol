import React, { useState } from "react";
import { findRecipes } from "../../redux/actions"; // Importa la acción findRecipes desde el archivo de acciones
import { useDispatch } from "react-redux"; // Importa la función useDispatch del paquete react-redux
import style from "./SearchBar.module.css"; // Importa los estilos CSS específicos para el componente

function SearchBar() {
  const dispatch = useDispatch(); // Obtiene una referencia a la función dispatch para enviar acciones al store de Redux
  const [title, setTitle] = useState(""); // Define un estado local "title" para almacenar el valor del input de búsqueda

  const handleSearch = () => {
    dispatch(findRecipes(title)); // Envía la acción findRecipes al store de Redux con el título como parámetro de búsqueda
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Llama a la función handleSearch cuando se presiona la tecla "Enter" en el input de búsqueda
    }
  };

  const handleInputChange = (event) => {
    setTitle(event.target.value); // Actualiza el estado "title" con el valor ingresado en el input de búsqueda
  };

  return (
    <div className={style.searchBarContainer}> 
      <input
        className={style.searchInput} // Aplica la clase CSS "searchInput" al input de búsqueda
        type="text"
        value={title}
        onChange={handleInputChange} // Asigna la función handleInputChange al evento onChange del input de búsqueda
        onKeyPress={handleKeyPress} // Asigna la función handleKeyPress al evento onKeyPress del input de búsqueda
        placeholder="Buscar..."
      />
      <button className={style.searchButton} onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
