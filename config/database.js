// config/database.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL no está definido en .env");
  console.log("📝 Crea un archivo .env basado en .env.example");
  process.exit(1);
}

const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === "production"
        ? {
            require: true,
            rejectUnauthorized: false,
          }
        : false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión establecida con PostgreSQL");
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error);
  }
};

module.exports = {
  sequelize,
  initDatabase,
};
