
module.exports = (sequelize, DataTypes) => {
  const { Model } = require('sequelize');

  class Quotation extends Model {
    static associate(models) {
      Quotation.belongsTo(models.User, { foreignKey: 'assignedTo', as: 'assignedUser' });
      Quotation.belongsTo(models.Client, { foreignKey: 'clientId', as: 'client' });
      Quotation.belongsTo(models.Lead, { foreignKey: 'leadId', as: 'lead' });
    }
  }

  Quotation.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('borrador', 'enviada', 'aceptada', 'rechazada'),
      defaultValue: 'borrador'
    },
    validUntil: {
      type: DataTypes.DATE,
      allowNull: true
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clients',
        key: 'id'
      }
    },
    leadId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'leads',
        key: 'id'
      }
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    items: {
      type: DataTypes.JSON,
      defaultValue: []
    }
  }, {
    sequelize,
    modelName: 'Quotation',
    tableName: 'quotations',
    timestamps: true
  });

  return Quotation;
};
