
module.exports = (sequelize, DataTypes) => {
  const { Model } = require('sequelize');

  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, { foreignKey: 'roleId', as: 'users' });
    }
  }

  Role.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    permissions: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    timestamps: true
  });

  return Role;
};
