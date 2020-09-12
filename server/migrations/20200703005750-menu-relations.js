"use strict";


/* eslint-disable indent */
module.exports = {
  up: async(queryInterface) => {
    return await queryInterface.addConstraint(
        'Menu', {
          fields: ['ParentId'],
          type: 'foreign key',
          name: 'fk_Menu_ParentId',
          references: {
            table: 'Menu', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          allowNull: true,
        },
      );
  },
  down: (queryInterface) => {
    return queryInterface.removeConstraint('Menu', 'fk_Menu_ParentId');
  },
};
