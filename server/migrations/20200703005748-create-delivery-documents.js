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
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    distribution: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    piece: {
      type: Sequelize.STRING(15),
      allowNull: false,
    },
    timeStreet: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    motiveNotDelivery: {
      type: Sequelize.STRING(20),
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
