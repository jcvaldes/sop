"use strict";

/* eslint-disable indent */
module.exports = {
  up: async(queryInterface) => {
    return await queryInterface.addConstraint(
        'DeliveryDocuments', {
          fields: ['StatusDeliveryId'],
          type: 'foreign key',
          name: 'fk_DeliveryDocumentsStatus_StatusDeliveryId',
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
    return queryInterface.removeConstraint('DeliveryDocuments', 'fk_DeliveryDocumentsStatus_StatusDeliveryId');
  },
};
