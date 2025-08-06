
module.exports = (sequelize, DataTypes) => {
  const { Model } = require('sequelize');

  class Client extends Model {
    static associate(models) {
      Client.belongsTo(models.User, { foreignKey: 'assignedTo', as: 'assignedUser' });
      Client.hasMany(models.Followup, { foreignKey: 'clientId', as: 'followups' });
      Client.hasMany(models.Quotation, { foreignKey: 'clientId', as: 'quotations' });
    }
  }

  Client.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    whatsapp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('activo', 'inactivo', 'potencial'),
      defaultValue: 'activo'
    },
    notes: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    tags: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Client',
    tableName: 'clients',
    timestamps: true
  });

  return Client;
};
