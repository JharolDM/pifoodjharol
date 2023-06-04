const createDiets = require('../controllers/dietsControllers.js');

// Controlador para manejar la solicitud de obtener las dietas
const getDietsHandler = async (req, res) => {
  try {
    // Llamar a la función createDiets para cargar las dietas en la base de datos
    const diets = await createDiets();

    // Responder con un mensaje de éxito y las dietas cargadas
    res.status(201).json({
      diets: diets,
      success: true,
      message: 'Diets loaded successfully',
    });
  } catch (error) {
    // Manejar el error y responder con un código de estado 400 y un mensaje de error

    res.status(error.response.status).json(error.response.data);
  }
};

module.exports = getDietsHandler;
