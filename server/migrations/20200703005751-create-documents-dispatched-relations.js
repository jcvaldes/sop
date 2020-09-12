"use strict";

/* eslint-disable indent */
module.exports = {
  up: async(queryInterface) => {
    return await queryInterface.addConstraint(
        'DocumentsDispatched', {
          fields: ['StatusId'],
          type: 'foreign key',
          name: 'fk_DocumentsDispatchedStatus_StatusId',
          references: {
            table: 'DistributionStatus', // name of Target model
            field: 'id', // key in Target model that we're referencing
          },
          onDelete: 'CASCADE',
          allowNull: false,
        },
      )
  },
  down: (queryInterface) => {
    return queryInterface.removeConstraint('DocumentsDispatched', 'fk_DocumentsDispatchedStatus_StatusId');
  },
};
