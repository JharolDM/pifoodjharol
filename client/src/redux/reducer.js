// Importa los tipos de acción desde el archivo "actions.js"
import {
  GET_DIETS,
  GET_RECIPE,
  GET_RECIPES,
  FIND_RECIPES,
  SORT_AZ_ASC,
  SORT_AZ_DES,
  SORT_HS_ASC,
  SORT_HS_DES,
  FILTER_SOURCE,
  FILTER_BY_DIETS,
  FILTER_SOURCE_CREATE,
  FILTER_SOURCE_API,
  RESET_FILTERS,
  DELETE_RECIPE
} from "./actions";

// Estado inicial de la aplicación
const initialState = {
  recipes: [],        // Almacena las recetas filtradas
  recipe: [],         // Almacena los detalles de una receta específica
  diets: [],          // Almacena las dietas disponibles
  allRecipes: [],     // Almacena todas las recetas sin filtrar
  filters: {}         // Almacena los filtros aplicados
};

// Reductor principal que maneja las acciones y actualiza el estado
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DIETS:
      // Actualiza las dietas disponibles en el estado
      return { ...state, diets: action.payload };
    case GET_RECIPE:
      // Actualiza los detalles de una receta específica en el estado
      return { ...state, recipe: action.payload };
    case GET_RECIPES:
      // Actualiza todas las recetas y las recetas sin filtrar en el estado
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case FIND_RECIPES:
      // Actualiza las recetas filtradas por título en el estado
      return { ...state, recipes: action.payload };
    case SORT_AZ_ASC:
      // Ordena las recetas alfabéticamente ascendente
      const sortedRecipesAZ = [...state.recipes].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      return { ...state, recipes: sortedRecipesAZ };
    case SORT_AZ_DES:
      // Ordena las recetas alfabéticamente descendente
      const sortedRecipesZA = [...state.recipes].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
      return { ...state, recipes: sortedRecipesZA };
    case SORT_HS_ASC:
      // Ordena las recetas por puntuación de salud ascendente
      const sortedRecipesHSAsc = [...state.recipes].sort(
        (a, b) => b.healthScore - a.healthScore
      );
      return { ...state, recipes: sortedRecipesHSAsc };
    case SORT_HS_DES:
      // Ordena las recetas por puntuación de salud descendente
      const sortedRecipesHSDes = [...state.recipes].sort(
        (a, b) => a.healthScore - b.healthScore
      );
      return { ...state, recipes: sortedRecipesHSDes };
    case FILTER_SOURCE:
      // Restablece los filtros y muestra todas las recetas
      return { ...state, recipes: state.allRecipes };
    case FILTER_SOURCE_API:
      // Filtra las recetas por fuente API
      const filteredRecipesApi = state.allRecipes.filter(
        (recipe) => typeof recipe.id === "number"
      );
      return { ...state, recipes: filteredRecipesApi };
    case FILTER_SOURCE_CREATE:
      // Filtra las recetas por fuente Creada
      const filteredRecipesCreate = state.allRecipes.filter(
        (recipe) => typeof recipe.id === "string"
      );
      return { ...state, recipes: filteredRecipesCreate };
    case FILTER_BY_DIETS:
      // Filtra las recetas por tipos de dieta
      if (action.payload === "all") {
        // Si se selecciona "all", muestra todas las recetas sin filtrar
        return { ...state, recipes: state.allRecipes, error: null };
      }
      const filteredByDiets = state.allRecipes.filter((recipe) =>
        recipe.diets.includes(action.payload)
      );
      if (filteredByDiets.length === 0) {
        // Si no se encuentran recetas para las dietas seleccionadas, muestra un mensaje de error
        return {
          ...state,
          recipes: [],
          error: "No se encontraron recetas para las dietas seleccionadas",
        };
      }
      return { ...state, recipes: filteredByDiets, error: null };
    case DELETE_RECIPE:
      // Elimina una receta del estado
      const updatedRecipes = state.recipes.filter((recipe) => {
        if (typeof recipe.id === "string") {
          return recipe.id !== action.payload;
        }
        return true;
      });
      return {
        ...state,
        recipes: updatedRecipes,
        allRecipes: updatedRecipes
      };
    case RESET_FILTERS:
      // Restablece los filtros aplicados y muestra todas las recetas sin filtrar
      return {
        ...state,
        recipes: state.allRecipes,
        filters: {},
      };
    default:
      return state;
  }
};

export default rootReducer;
