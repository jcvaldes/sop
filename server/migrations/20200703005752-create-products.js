'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      pgCatCode: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
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
  down: async (queryInterface, Sequelize) => queryInterface.dropTable('Products'),
}
