const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { sequelize, DataTypes } = require('../config/database'); // Asegúrate de que DataTypes esté exportado aquí

const basename = path.basename(__filename);
const db = {};

// Cargar todos los modelos en el directorio actual (excepto index.js)
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js",
  )
  .forEach((file) => {
    // Verificar si el archivo es 'User.js' y omitirlo
    if (file === 'User.js') {
        return;
    }
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