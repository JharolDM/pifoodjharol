import axios from "axios";


// action types:
export const GET_DIETS = "GET_DIETS";
export const GET_RECIPE = "GET_RECIPE";
export const GET_RECIPES = "GET_RECIPES";
export const FIND_RECIPES = "FIND_RECIPES";
export const SORT_AZ_ASC = "SORT_AZ_ASC";
export const SORT_AZ_DES = "SORT_AZ_DES";
export const SORT_HS_ASC = "SORT_HS_ASC";
export const SORT_HS_DES = "SORT_HS_DES";
export const FILTER_SOURCE = "FILTER_SOURCE";
export const FILTER_DIETS = "FILTER_DIETS";
export const FILTER_BY_DIETS= "FILTER_BY_DIETS";
export const FILTER_SOURCE_API= "FILTER_SOURCE_API";
export const FILTER_SOURCE_CREATE= "FILTER_SOURCE_CREATE";
export const RESET_FILTERS= "RESET_FILTERS";
export const DELETE_RECIPE = "DELETE_RECIPE";



export const getDiets = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get('http://localhost:3001/diets');
      const diets = apiData.data.diets;
      dispatch({ type: GET_DIETS, payload: diets });
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.message);
    }
  };
};

export const getRecipe = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/recipes/${id}`);
    const recipe = apiData.data;
    dispatch({ type: GET_RECIPE, payload: recipe });
  };
};

export const getRecipes = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get('http://localhost:3001/recipes');
      const recipes = apiData.data.map((recipe) => ({
        ...recipe,
        source: "API"
      }));
      dispatch({ type: GET_RECIPES, payload: recipes });
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.message);
    }
  };
};



export const findRecipes = (title) => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/recipes/?title=${title}`);
    const recipes = apiData.data;
    dispatch({ type: FIND_RECIPES, payload: recipes });
  };
};

export const sortAZAsc = () => {
  return function (dispatch) {
    dispatch({ type: SORT_AZ_ASC });
  };
};

export const sortAZDes = () => {
  return function (dispatch) {
    dispatch({ type: SORT_AZ_DES });
  };
};

export const sortHSAsc = () => {
  return function (dispatch) {
    dispatch({ type: SORT_HS_ASC });
  };
};

export const sortHSDes = () => {
  return function (dispatch) {
    dispatch({ type: SORT_HS_DES });
  };
};

export const filterSource = () => {
  return { type: FILTER_SOURCE };
};

export const filterSourceApi = () => {
  return { type: FILTER_SOURCE_API };
};

export const filterSourceCreate = () => {
  return { type: FILTER_SOURCE_CREATE };
};

export function filterByDiets(payload){ // Va a filtrar por "all, gluten free, ketogenic...". REVISAR
  return{
      type:FILTER_BY_DIETS,
      payload
      }
}

export const resetFilters = () => { // resetea los filtros y actualiza la pagina
  return {
    type: RESET_FILTERS,
  };
};

export const deleteRecipe = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`http://localhost:3001/recipes/${id}`);

      // Despacha la acción para indicar que la receta ha sido eliminada con éxito
      dispatch({ type: DELETE_RECIPE, payload: id });

      // Mostrar el mensaje de éxito proveniente del backend en la alerta
      alert(response.data.message);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // Si hay un error de respuesta del backend, mostrar el mensaje de error en la alerta
        alert(error.response.data.error);
      } else {
        // Si no hay un mensaje de error específico, mostrar un mensaje genérico
        alert('Error al eliminar la receta.');
      }
    }
  };
};






// export const getDiets = () => {
//   return async function (dispatch) {
//     try {
//       const response = await fetch('http://localhost:3001/diets');
//       const data = await response.json();
//       const diets = data.diets;
//       dispatch({ type: GET_DIETS, payload: diets });
//     } catch (error) {
//       console.log(error);
//       alert('Error al obtener las dietas');
//     }
//   };
// };

// export const getRecipe = (id) => {
//   return async function (dispatch) {
//     try {
//       const response = await fetch(`http://localhost:3001/recipes/${id}`);
//       const data = await response.json();
//       const recipe = data;
//       dispatch({ type: GET_RECIPE, payload: recipe });
//     } catch (error) {
//       console.log(error);
//       alert('Error al obtener la receta');
//     }
//   };
// };

// export const getRecipes = () => {
//   return async function (dispatch) {
//     try {
//       const response = await fetch('http://localhost:3001/recipes');
//       const data = await response.json();
//       const recipes = data.map((recipe) => ({
//         ...recipe,
//         source: 'API'
//       }));
//       dispatch({ type: GET_RECIPES, payload: recipes });
//     } catch (error) {
//       console.log(error);
//       alert('Error al obtener las recetas');
//     }
//   };
// };

// export const findRecipes = (title) => {
//   return async function (dispatch) {
//     try {
//       const response = await fetch(`http://localhost:3001/recipes/?title=${title}`);
//       const data = await response.json();
//       const recipes = data;
//       dispatch({ type: FIND_RECIPES, payload: recipes });
//     } catch (error) {
//       console.log(error);
//       alert('Error al buscar las recetas');
//     }
//   };
// };

// export const deleteRecipe = (id) => {
//   return async function (dispatch) {
//     try {
//       await fetch(`http://localhost:3001/recipes/${id}`, { method: 'DELETE' });

//       // Despacha la acción para indicar que la receta ha sido eliminada con éxito
//       dispatch({ type: DELETE_RECIPE, payload: id });

//       // Muestra el alert de éxito
//       alert('¡Receta eliminada exitosamente!');
//     } catch (error) {
//       console.log(error);
//       alert('Error al eliminar la receta');
//     }
//   };
// };








