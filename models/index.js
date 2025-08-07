const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { sequelize, DataTypes } = require("../config/database"); // Asegúrate que sequelize y DataTypes estén exportados en tu config/database.js

const basename = path.basename(__filename);
const db = {};

// Cargar todos los modelos en este directorio (excepto index.js)
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js",
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Ejecutar asociaciones si están definidas
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
