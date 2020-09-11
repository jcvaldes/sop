/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) =>
    await queryInterface.createTable('UserRoles', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    RoleId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('UserRoles'),
};
