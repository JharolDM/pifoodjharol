const axios = require('axios');
const { Recipe, Diet } = require('../db.js');
const {
  createRecipe,
  getRecipeById,
  getRecipeByTitle,
  getAllRecipes,
  deleteRecipeById
} = require('../controllers/recipesControllers.js');

const deleteRecipeHandler = async (req, res) => {
  const { id } = req.params;

  try {
    // Eliminar la receta utilizando la función deleteRecipeById
    const deletedCount = await deleteRecipeById(id);

    if (deletedCount === 0) {
      // Si no se eliminó ninguna receta, responder con un mensaje de error
      res.status(404).json({ message: 'Recipe not found.' });
    } else {
      // Si se eliminó la receta exitosamente, responder con un mensaje de éxito
      res.status(200).json({ message: 'Recipe deleted successfully.' });
    }
  } catch (error) {
    // Manejar el error y responder con un código de estado 500 y un mensaje de error
    res.status(500).json({ error: error.message });
  }
};


// Controlador para la solicitud POST /recipes
const postRecipesHandler = async (req, res) => {
  const { title, image, summary, healthScore, analyzedInstructions, diets } = req.body;

  try {
    // Verificar si faltan datos obligatorios
    if (!title || !image || !summary || !healthScore || !analyzedInstructions || !diets) {
      throw Error("Missing data");
    }

    // Crear una nueva receta utilizando la función createRecipe
    const newRecipe = await createRecipe(title, image, summary, healthScore, analyzedInstructions, diets);

    // Responder con el objeto JSON de la nueva receta creada
    res.status(201).json(newRecipe);
  } catch (error) {
    // Manejar el error y responder con un código de estado 422 y un mensaje de error
    res.status(422).json({ error: error });
  }
};

// Controlador para la solicitud GET /recipes
const getRecipesHandler = async (req, res) => {
  const { title } = req.query;

  // Obtener los resultados en función de si hay una consulta de título o no
  const results = title ? await getRecipeByTitle(title) : await getAllRecipes();

  try {
    // Responder con los resultados obtenidos
    res.send(await results);
  } catch (error) {
    // Manejar el error y responder con el código de estado y mensaje de error correspondientes
    res.status(error.response.status).json(error.response.data);
  }
};

// Controlador para la solicitud GET /recipes/:id
const getRecipeByIdHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "db" : "api";

  try {
    // Obtener la receta por ID utilizando la función getRecipeById
    const recipe = await getRecipeById(id, source);

    // Responder con el objeto JSON de la receta obtenida
    res.status(200).json(recipe);
  } catch (error) {
    if (source === "db") {
      // Manejar el error relacionado con la base de datos y responder con un código de estado 400 y un mensaje de error
      res.status(400).json(error.message || error.name);
      console.log(error.data, "db");
    } else {
      // Manejar el error relacionado con la API externa y responder con el código de estado y mensaje de error correspondientes
      console.log(error.response.data.message, "api");
      res.status(error.response.data.code).json(error.response.data.message);
    }
  }
};

module.exports = {
  getRecipesHandler,
  getRecipeByIdHandler,
  postRecipesHandler,
  deleteRecipeHandler
};
