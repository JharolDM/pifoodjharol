const { DataTypes } = require('sequelize');

// Exportamos una función que define el modelo y le inyecta la conexión a sequelize
module.exports = (sequelize) => {
  // Definimos el modelo "recipe"
  sequelize.define('recipe', {
    // Definimos las propiedades del modelo

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    analyzedInstructions: {
      type: DataTypes.JSONB
    }
  },
  {
    // Configuración adicional del modelo
    timestamps: false
  });
};
