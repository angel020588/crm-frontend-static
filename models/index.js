const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
require("dotenv").config();

const db = {};

// Validar que DATABASE_URL esté configurada
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL no está configurada en el archivo .env');
  process.exit(1);
}

// Usar DATABASE_URL como en config/database.js
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Cargar todos los modelos del directorio
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    console.log("🕵️ Cargando modelo:", file); // Debug mejorado
    try {
      const modelDefiner = require(path.join(__dirname, file));
      console.log("✅ Archivo cargado:", file, "- Tipo:", typeof modelDefiner);
      const ModelClass = modelDefiner(sequelize, Sequelize.DataTypes);
      console.log("✅ Modelo inicializado:", file, "- Nombre:", ModelClass.name);
      db[ModelClass.name] = ModelClass;
    } catch (error) {
      console.error("❌ ERROR en archivo:", file);
      console.error("❌ Error details:", error.message);
      throw error; // Re-lanzar para que el proceso falle y veamos el culpable
    }
  });

// Asociar modelos si tienen relaciones
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;