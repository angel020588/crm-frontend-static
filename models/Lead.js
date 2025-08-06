
module.exports = (sequelize, DataTypes) => {
  const { Model } = require('sequelize');

  class Lead extends Model {
    static associate(models) {
      Lead.belongsTo(models.User, { foreignKey: 'assignedTo', as: 'assignedUser' });
      Lead.hasMany(models.Followup, { foreignKey: 'leadId', as: 'followups' });
      Lead.hasMany(models.Quotation, { foreignKey: 'leadId', as: 'quotations' });
    }
  }

  Lead.init({
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
    status: {
      type: DataTypes.ENUM('nuevo', 'contactado', 'calificado', 'convertido', 'perdido'),
      defaultValue: 'nuevo'
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true
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
    modelName: 'Lead',
    tableName: 'leads',
    timestamps: true
  });

  return Lead;
};
