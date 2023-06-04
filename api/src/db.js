require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;
//Instantiating Sequelize
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, {
  logging: false, // establecer en console.log para ver las consultas SQL sin procesar
  native: false, // permite que Sequelize sepa que podemos usar pg-native para ~30% más de velocidad
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Al leer todos los archivos de la carpeta Modelos, se requieren y se agregan a la matriz modelDefiners.
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Inyectar Sequelize a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Nombre de modelos en mayúsculas, es decir: producto => Producto
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Sequelize tiene todos los modelos en sequelize.models. podemos usarlo desestructurando.
const { Recipe,Diet } = sequelize.models;
// Entonces puede estar relacionado.
Recipe.belongsToMany(Diet, { through: 'recipe-diet' , timestamps: false });
Diet.belongsToMany(Recipe, { through: 'recipe-diet' , timestamps: false });

module.exports = {
  ...sequelize.models, // Para importar modelos como: const { Producto, Usuario } = require('./db.js');
  conn: sequelize,     // Para importar la conexión { conn } = require('./db.js');
};
