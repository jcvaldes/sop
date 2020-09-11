"use strict";


/* eslint-disable indent */
module.exports = {
  up: async(queryInterface) => {
    return await queryInterface.addConstraint(
        'UserRoles', {
          fields: ['UserId'],
          type: 'foreign key',
          name: 'fk_UserRoles_UserId',
          references: {
            table: 'Users', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
      ), await queryInterface.addConstraint(
        'UserRoles', {
          fields: ['RoleId'],
          type: 'foreign key',
          name: 'fk_UserRoles_RoleId',
          references: {
            table: 'Roles', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
      );
  },
  down: (queryInterface) => {
    return queryInterface.removeConstraint('UserRoles', 'fk_UserRoles_UserId'),
      queryInterface.removeConstraint('UserRoles', 'fk_UserRoles_RoleId');
  },
};
