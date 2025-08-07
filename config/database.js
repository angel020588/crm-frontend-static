const { Sequelize, DataTypes } = require("sequelize");

// Fuerza carga explícita desde archivo .env en raíz
require("dotenv").config({ path: "./.env" });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("❌ DATABASE_URL no está definido o es null");
}

const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
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
  DataTypes, // <--- Exporta también DataTypes
  initDatabase,
};
