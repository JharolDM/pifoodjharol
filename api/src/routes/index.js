const { Router } = require('express');
const dietsRouter = require('./dietsRouter');
const recipesRouter = require('./recipesRouter');

const router = Router();

// Configurar routers
router.use('/recipes', recipesRouter);
router.use('/diets', dietsRouter);

module.exports = router;


//ejemplo para probar ruta post recipes crear una receta formato json
// {
//     "title": "Título de la receta",
//     "image": "URL de la imagen",
//     "summary": "Resumen de la receta",
//     "healthScore": 9.5,
//     "analyzedInstructions": ["Paso 1", "Paso 2"],
//     "diets": ["Dieta 1", "Dieta 2"]
//   }
  
