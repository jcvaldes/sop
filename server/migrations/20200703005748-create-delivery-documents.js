'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) =>
    await queryInterface.createTable('DeliveryDocuments', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    StatusDeliveryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    dateDocument: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    unityCompany: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    distribution: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    piece: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    timeStreet: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    motiveNotDelivery: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('DeliveryDocuments')
};
