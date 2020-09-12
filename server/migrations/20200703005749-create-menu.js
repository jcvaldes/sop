'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.createTable('Menu', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      icon: {
        type: Sequelize.STRING(40),
        allowNull: false
      },
      uri: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      ParentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
  down: async (queryInterface, Sequelize) => queryInterface.dropTable('Menu'),
}
