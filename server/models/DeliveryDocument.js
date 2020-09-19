'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeliveryDocument extends Model {
    static associate(models) {
    }
  };
  DeliveryDocument.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    StatusDeliveryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateDocument: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    unityCompany: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distribution: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    piece: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeStreet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    motiveNotDelivery: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'DeliveryDocument'
  });
  return DeliveryDocument;
};
