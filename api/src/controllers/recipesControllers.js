const { Op } = require('sequelize');
const { Recipe, Diet } = require('../db.js');
const axios = require ('axios');
const { KEY, URL } = process.env;

// Controller function para crear una nueva receta
const createRecipe = async (title, image, summary, healthScore, analyzedInstructions, diets) => {
  // Crear una nueva receta en la base de datos
  const newRecipe = await Recipe.create({ title, image, summary, healthScore, analyzedInstructions });

  // Encontrar o crear instancias de los tipos de dietas asociados con la receta
  const dietInstances = await Promise.all(diets.map(diet => Diet.findOrCreate({ where: { diet } })));

  // Asociar los tipos de dietas con la receta
  await newRecipe.setDiets(dietInstances.map(diet => diet[0].id));

  // Obtener los tipos de dietas asociados con la receta
  const recipeDiets = await newRecipe.getDiets();

  // Devolver un objeto que contenga la información de la receta y los tipos de dietas
  const result = [newRecipe, recipeDiets];
  return result;
};

// Función de utilidad para limpiar los datos de la receta
const cleanArray = (arr) => {
  return arr.map((elem) => {
    const diets = elem.diets ? elem.diets.map((diet) => {
      if (typeof diet === 'string') {
        return diet;
      } else {
        return diet.diet;
      }
    }) : [];

    return {
      id: elem.id,
      title: elem.title,
      image: elem.image,
      diets: diets,
      healthScore: elem.healthScore
    };
  });
};

// Función para buscar recetas por título
const getRecipeByTitle = async (title) => {
  // Buscar recetas en la base de datos que coincidan con el título
  const dbRecipesRaw = await Recipe.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`
      }
    },
    limit: 15
  });

  // Buscar recetas en la API externa que coincidan con el título
  const apiRecipesRaw = (await axios.get(`${URL}/complexSearch?apiKey=${KEY}&number=100&query=${title}&addRecipeInformation=true`)).data.results;

  // Limpiar los datos de las recetas obtenidas
  const apiRecipes = cleanArray(apiRecipesRaw);
  const dbRecipes = cleanArray(dbRecipesRaw);

  // Combinar los resultados de la base de datos y la API
  const result = [...dbRecipes, ...apiRecipes];

  if (result.length === 0) {
    // Devolver un mensaje de error si no se encontraron recetas
    return { message: `There's no available recipes for your query: '${title}'.` };
  }

  return result;
};

const getAllRecipes = async () => {
  // Obtener todas las recetas de la API externa
  const apiRecipesRaw = (await axios.get(`${URL}/complexSearch?apiKey=${KEY}&number=100&addRecipeInformation=true`)).data.results;

  // Obtener todas las recetas de la base de datos, incluyendo los tipos de dietas asociados
  const dbRecipesRaw = await Recipe.findAll({
    include: [{
      model: Diet,
      attributes: ['id', 'diet'],
    }],
  });

  // Limpiar los datos de las recetas obtenidas
  const dbRecipes = cleanArray(dbRecipesRaw);
  const apiRecipes = cleanArray(apiRecipesRaw);

  // Combinar los resultados de la base de datos y la API
  return [...dbRecipes, ...apiRecipes];
};

// Función para obtener una receta por ID de la base de datos o la API externa
const getRecipeById = async (id, source) => {
  let response;

  if (source === "api") {
    // Obtener la receta de la API externa
    response = await axios.get(`${URL}/${id}/information?apiKey=${KEY}`);
  } else {
    // Obtener la receta de la base de datos incluyendo los tipos de dietas asociados
    response = await Recipe.findByPk(id, {
      include: [{
        model: Diet,
        attributes: ['id', 'diet'],
      }],
    }).then(recipe => {
      if (!recipe) {
        throw new Error('UUID valid but Recipe not found');
      }

      // Obtener los nombres de los tipos de dietas
      const diets = recipe.diets.map(elem => (elem.diet));

      // Extraer la información relevante de la receta
      const { id, title, image, summary, healthScore, analyzedInstructions } = recipe;

      return { id, title, image, summary, healthScore, diets, analyzedInstructions };
    });
  }

  if (source === "api") {
    // Obtener los datos de la receta de la respuesta de la API externa
    const { id, title, image, summary, healthScore, diets, analyzedInstructions } = response.data;
    return { id, title, image, summary, healthScore, diets, analyzedInstructions };
  } else {
    // Devolver la respuesta obtenida de la base de datos
    return response;
  }
};

// Función para eliminar una receta por su ID
const deleteRecipeById = async (id) => {
  // Eliminar la receta de la base de datos utilizando el ID
  const deletedRecipeCount = await Recipe.destroy({
    where: {
      id: id
    }
  });

  // Devolver la cantidad de recetas eliminadas
  return deletedRecipeCount;
};

module.exports = {
  createRecipe,
  getRecipeById,
  getRecipeByTitle,
  getAllRecipes,
  deleteRecipeById
};


// const { Op } = require('sequelize');
// const { Recipe, Diet } = require('../db.js');
// const { KEY, URL } = process.env;

// // Controller function para crear una nueva receta
// const createRecipe = async (title, image, summary, healthScore, analyzedInstructions, diets) => {
//   // Crear una nueva receta en la base de datos
//   const newRecipe = await Recipe.create({ title, image, summary, healthScore, analyzedInstructions });

//   // Encontrar o crear instancias de los tipos de dietas asociados con la receta
//   const dietInstances = await Promise.all(diets.map(diet => Diet.findOrCreate({ where: { diet } })));

//   // Asociar los tipos de dietas con la receta
//   await newRecipe.setDiets(dietInstances.map(diet => diet[0].id));

//   // Obtener los tipos de dietas asociados con la receta
//   const recipeDiets = await newRecipe.getDiets();

//   // Devolver un objeto que contenga la información de la receta y los tipos de dietas
//   const result = [newRecipe, recipeDiets];
//   return result;
// };

// // Función de utilidad para limpiar los datos de la receta
// const cleanArray = (arr) => {
//   return arr.map((elem) => {
//     const diets = elem.diets ? elem.diets.map((diet) => {
//       if (typeof diet === 'string') {
//         return diet;
//       } else {
//         return diet.diet;
//       }
//     }) : [];

//     return {
//       id: elem.id,
//       title: elem.title,
//       image: elem.image,
//       diets: diets,
//       healthScore: elem.healthScore
//     };
//   });
// };

// // Función para buscar recetas por título
// const getRecipeByTitle = async (title) => {
//   // Buscar recetas en la base de datos que coincidan con el título
//   const dbRecipesRaw = await Recipe.findAll({
//     where: {
//       title: {
//         [Op.iLike]: `%${title}%`
//       }
//     },
//     limit: 15
//   });

//   // Buscar recetas en la API externa que coincidan con el título
//   const apiRecipesRaw = await fetch(`${URL}/complexSearch?apiKey=${KEY}&number=100&query=${title}&addRecipeInformation=true`).then(response => response.json());

//   // Limpiar los datos de las recetas obtenidas
//   const apiRecipes = cleanArray(apiRecipesRaw);
//   const dbRecipes = cleanArray(dbRecipesRaw);

//   // Combinar los resultados de la base de datos y la API
//   const result = [...dbRecipes, ...apiRecipes];

//   if (result.length === 0) {
//     // Devolver un mensaje de error si no se encontraron recetas
//     return { message: `There's no available recipes for your query: '${title}'.` };
//   }

//   return result;
// };

// const getAllRecipes = async () => {
//   // Obtener todas las recetas de la API externa
//   const apiRecipesRaw = await fetch(`${URL}/complexSearch?apiKey=${KEY}&number=100&addRecipeInformation=true`).then(response => response.json());

//   // Obtener todas las recetas de la base de datos, incluyendo los tipos de dietas asociados
//   const dbRecipesRaw = await Recipe.findAll({
//     include: [{
//       model: Diet,
//       attributes: ['id', 'diet'],
//     }],
//   });

//   // Limpiar los datos de las recetas obtenidas
//   const dbRecipes = cleanArray(dbRecipesRaw);
//   const apiRecipes = cleanArray(apiRecipesRaw);

//   // Combinar los resultados de la base de datos y la API
//   return [...dbRecipes, ...apiRecipes];
// };

// // Función para obtener una receta por ID de la base de datos o la API externa
// const getRecipeById = async (id, source) => {
//   let response;

//   if (source === "api") {
//     // Obtener la receta de la API externa
//     response = await fetch(`${URL}/${id}/information?apiKey=${KEY}`);
//     response = await response.json();
//   } else {
//     // Obtener la receta de la base de datos incluyendo los tipos de dietas asociados
//     response = await Recipe.findByPk(id, {
//       include: [{
//         model: Diet,
//         attributes: ['id', 'diet'],
//       }],
//     }).then(recipe => {
//       if (!recipe) {
//         throw new Error('UUID valid but Recipe not found');
//       }

//       // Obtener los nombres de los tipos de dietas
//       const diets = recipe.diets.map(elem => (elem.diet));

//       // Extraer la información relevante de la receta
//       const { id, title, image, summary, healthScore, analyzedInstructions } = recipe;

//       return { id, title, image, summary, healthScore, diets, analyzedInstructions };
//     });
//   }

//   if (source === "api") {
//     // Obtener los datos de la receta de la respuesta de la API externa
//     const { id, title, image, summary, healthScore, diets, analyzedInstructions } = response;
//     return { id, title, image, summary, healthScore, diets, analyzedInstructions };
//   } else {
//     // Devolver la respuesta obtenida de la base de datos
//     return response;
//   }
// };

// // Función para eliminar una receta por su ID
// const deleteRecipeById = async (id) => {
//   // Eliminar la receta de la base de datos utilizando el ID
//   const deletedRecipeCount = await Recipe.destroy({
//     where: {
//       id: id
//     }
//   });

//   // Devolver la cantidad de recetas eliminadas
//   return deletedRecipeCount;
// };

// module.exports = {
//   createRecipe,
//   getRecipeById,
//   getRecipeByTitle,
//   getAllRecipes,
//   deleteRecipeById
// };
