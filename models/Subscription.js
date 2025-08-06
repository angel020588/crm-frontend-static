
module.exports = (sequelize, DataTypes) => {
  const { Model } = require('sequelize');

  class Subscription extends Model {
    static associate(models) {
      Subscription.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  Subscription.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    plan: {
      type: DataTypes.ENUM('basic', 'pro', 'enterprise'),
      allowNull: false,
      defaultValue: 'basic'
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'cancelled', 'expired'),
      defaultValue: 'active'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    features: {
      type: DataTypes.JSON,
      defaultValue: {}
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
    modelName: 'Subscription',
    tableName: 'subscriptions',
    timestamps: true
  });

  return Subscription;
};
