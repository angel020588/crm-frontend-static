const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ApiKey extends Model {
    static associate(models) {
      // Asociación: cada ApiKey pertenece a un User
      ApiKey.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }

  ApiKey.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      keyValue: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      permissions: {
        type: DataTypes.JSONB, // Mejor usar JSONB en Postgres
        defaultValue: [],
      },
      lastUsed: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Debe coincidir con el nombre real de la tabla User
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "ApiKey",
      tableName: "ApiKeys", // Cambia a 'api_keys' si esa es tu convención
      timestamps: true,
    },
  );

  return ApiKey;
};
