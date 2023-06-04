const { DataTypes } = require('sequelize');

// Exportamos una función que define el modelo y le inyecta la conexión a sequelize
module.exports = (sequelize) => {
  // Definimos el modelo "diet"
  sequelize.define('diet', {
    // Definimos las propiedades del modelo

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    diet: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    // Configuración adicional del modelo
    timestamps: false
  });
};
