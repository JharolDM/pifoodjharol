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

const initialState = {
  recipes: [],
  recipe: [],
  diets: [],
  allRecipes: [],
  filters: {}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DIETS:
      return { ...state, diets: action.payload };
    case GET_RECIPE:
      return { ...state, recipe: action.payload };
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case FIND_RECIPES:
      return { ...state, recipes: action.payload };
    case SORT_AZ_ASC:
      const sortedRecipesAZ = [...state.recipes].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      return { ...state, recipes: sortedRecipesAZ };
    case SORT_AZ_DES:
      const sortedRecipesZA = [...state.recipes].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
      return { ...state, recipes: sortedRecipesZA };
    case SORT_HS_ASC:
      const sortedRecipesHSAsc = [...state.recipes].sort(
        (a, b) => b.healthScore - a.healthScore
      );
      return { ...state, recipes: sortedRecipesHSAsc };
    case SORT_HS_DES:
      const sortedRecipesHSDes = [...state.recipes].sort(
        (a, b) => a.healthScore - b.healthScore
      );
      return { ...state, recipes: sortedRecipesHSDes };
    case FILTER_SOURCE:
      return { ...state, recipes: state.allRecipes };
    case FILTER_SOURCE_API:
      const filteredRecipesApi = state.allRecipes.filter(
        (recipe) => typeof recipe.id === "number"
      );
      return { ...state, recipes: filteredRecipesApi };
    case FILTER_SOURCE_CREATE:
      const filteredRecipesCreate = state.allRecipes.filter(
        (recipe) => typeof recipe.id === "string"
      );
      return { ...state, recipes: filteredRecipesCreate };
    case FILTER_BY_DIETS:
      if (action.payload === "all") {
        return { ...state, recipes: state.allRecipes, error: null };
      }
      const filteredByDiets = state.allRecipes.filter((recipe) =>
        recipe.diets.includes(action.payload)
      );
      if (filteredByDiets.length === 0) {
        return {
          ...state,
          recipes: [],
          error: "No se encontraron recetas para las dietas seleccionadas",
        };
      }
      return { ...state, recipes: filteredByDiets, error: null };
    case DELETE_RECIPE:
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
