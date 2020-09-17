'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) =>
    await queryInterface.createTable('DistributionStatus', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    code: {
      type: Sequelize.STRING(4),
      allowNull: false,
      unique: true
    },
    description: {
      type: Sequelize.STRING(60),
      allowNull: false
    },
    webDescription: {
      type: Sequelize.STRING(60),
      allowNull: true
    },
    deliveryInd: {
      type: Sequelize.STRING(60),
      allowNull: false
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('DistributionStatus')
};
