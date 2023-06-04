const { Router } = require('express');
const recipesRouter = Router();
// Import handlers
const {
    getRecipesHandler,
    getRecipeByIdHandler,
    postRecipesHandler,
    deleteRecipeHandler
} = require('../handlers/recipesHandlers.js');

// GET Routes
recipesRouter.get('/', getRecipesHandler);
recipesRouter.get('/:id', getRecipeByIdHandler);

// POST Route
recipesRouter.post('/', postRecipesHandler);

recipesRouter.delete('/:id', deleteRecipeHandler);

module.exports = recipesRouter;
