const { Router } = require('express');
const dietsRouter = Router();

const getDietsHandler = require('../handlers/getDietsHandler.js');


// Definir el punto final para recuperar dietas
dietsRouter.get('/', getDietsHandler);

module.exports = dietsRouter;
