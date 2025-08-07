const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Relación con Client
      User.hasMany(models.Client, {
        foreignKey: 'userId',
        as: 'clients'
      });

      // Relación con Lead
      User.hasMany(models.Lead, {
        foreignKey: 'userId',
        as: 'leads'
      });

      // Relación con Followup
      User.hasMany(models.Followup, {
        foreignKey: 'userId',
        as: 'followups'
      });

      // Relación con Quotation
      User.hasMany(models.Quotation, {
        foreignKey: 'userId',
        as: 'quotations'
      });

      // Relación con Subscription
      User.hasOne(models.Subscription, {
        foreignKey: 'userId',
        as: 'subscription'
      });

      // Relación con ApiKey
      User.hasMany(models.ApiKey, {
        foreignKey: 'userId',
        as: 'apiKeys'
      });

      // Relación con Role
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role'
      });

      // Relación con Notification
      User.hasMany(models.Notification, {
        foreignKey: 'userId',
        as: 'notifications'
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
  });

  return User;
};