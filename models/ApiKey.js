
module.exports = (sequelize, DataTypes) => {
  const { Model } = require('sequelize');

  class ApiKey extends Model {
    static associate(models) {
      ApiKey.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  ApiKey.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    keyValue: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    permissions: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    lastUsed: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'ApiKey',
    tableName: 'api_keys',
    timestamps: true
  });

  return ApiKey;
};
